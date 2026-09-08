import {readFile,readdir,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {parseEnv} from 'node:util';
import {spawnSync} from 'node:child_process';

const action=process.argv[2];
if(!['build','deploy','secrets'].includes(action))throw Error('Use build, deploy or secrets');
const local=existsSync('.env.local')?parseEnv(await readFile('.env.local','utf8')):{};
const analytics=parseEnv(await readFile('.env.staging.local','utf8'));
if(!analytics.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN)throw Error('Configure the personal-site PostHog token first');
const env={...process.env,...analytics,SEO_INDEXABLE:'true',SITE_ENV:'production',NEXT_PUBLIC_SITE_ENV:'production',RESEND_API_KEY:'',RESEND_AUDIENCE_ID:'',RESEND_SEGMENT_ID:'',STAGING_CHECK_TOKEN:'',STAGING_SUBSCRIBE_TEST_EMAIL:''};
function run(args,options={}){const result=spawnSync('npx',args,{env,stdio:'inherit',...options});if(result.status!==0)throw Error('Production command failed; deployment stopped')}
async function checkBundle(){
 const privateValues=[local.RESEND_API_KEY,local.STAGING_CHECK_TOKEN].filter(Boolean);
 async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+entry.name;if(entry.isDirectory())await walk(path);else if(entry.isFile()){const bytes=await readFile(path);if(privateValues.some(value=>bytes.includes(Buffer.from(value))))throw Error('A private credential was found in build output; deployment stopped')}}}
 await walk('.open-next');
 const manifest=JSON.parse(await readFile('.open-next/server-functions/default/.next/prerender-manifest.json','utf8'));
 if(!manifest.routes['/'])throw Error('Homepage was not prerendered');
 const html=await readFile('.next/server/app/index.html','utf8');
 if(/<meta name="robots" content="noindex/.test(html))throw Error('Production must allow indexing');
 const config=JSON.parse(await readFile('wrangler.jsonc','utf8'));
 if(config.env.production.name!=='jattoabdul-production'||config.env.production.routes.some(route=>!['jattoabdul.com/*','www.jattoabdul.com/*'].includes(route.pattern)))throw Error('Unexpected production destination');
}
if(action==='build'){
 run(['opennextjs-cloudflare','build','--env','production']);
 await checkBundle();
 await writeFile('.open-next/production-build.json',JSON.stringify({environment:'production',builtAt:new Date().toISOString()}));
 console.log('Production bundle validated; no private credentials found in output.');
}else if(action==='deploy'){
 const stamp=JSON.parse(await readFile('.open-next/production-build.json','utf8'));
 if(stamp.environment!=='production')throw Error('Run build:production first');
 await checkBundle();
 run(['opennextjs-cloudflare','deploy','--env','production']);
}else{
 if(!local.RESEND_API_KEY||!local.RESEND_AUDIENCE_ID&&!local.RESEND_SEGMENT_ID)throw Error('Existing Resend configuration is incomplete');
 const secrets={RESEND_API_KEY:local.RESEND_API_KEY,RESEND_SEGMENT_ID:local.RESEND_SEGMENT_ID||local.RESEND_AUDIENCE_ID};
 run(['wrangler','secret','bulk','--env','production'],{input:JSON.stringify(secrets),stdio:['pipe','inherit','inherit']});
}
