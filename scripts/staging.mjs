import {readFile,readdir,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {parseEnv} from 'node:util';
import {randomBytes} from 'node:crypto';
import {spawnSync} from 'node:child_process';

const action=process.argv[2];
if(!['build','deploy','secrets'].includes(action))throw Error('Use build, deploy or secrets');
const local=existsSync('.env.local')?parseEnv(await readFile('.env.local','utf8')):{};
const staging=parseEnv(await readFile('.env.staging.local','utf8'));
if(!staging.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN)throw Error('Configure the staging PostHog token first');
const env={...process.env,...staging,SEO_INDEXABLE:'false',SITE_ENV:'staging',NEXT_PUBLIC_SITE_ENV:'staging',RESEND_API_KEY:'',RESEND_AUDIENCE_ID:'',RESEND_SEGMENT_ID:'',STAGING_CHECK_TOKEN:'',STAGING_SUBSCRIBE_TEST_EMAIL:''};
function run(args,options={}){const result=spawnSync('npx',args,{env,stdio:'inherit',...options});if(result.status!==0)throw Error('Staging command failed; deployment stopped')}
async function checkBundle(){
 const privateValues=[local.RESEND_API_KEY,local.STAGING_CHECK_TOKEN].filter(Boolean);
 async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+entry.name;if(entry.isDirectory())await walk(path);else if(entry.isFile()){const bytes=await readFile(path);if(privateValues.some(value=>bytes.includes(Buffer.from(value))))throw Error('A private credential was found in build output; deployment stopped')}}}
 await walk('.open-next');
 const manifest=JSON.parse(await readFile('.open-next/server-functions/default/.next/prerender-manifest.json','utf8'));
 if(!manifest.routes['/'])throw Error('Homepage was not prerendered');
 const html=await readFile('.next/server/app/index.html','utf8');
 if(!/<meta name="robots" content="noindex/.test(html))throw Error('Staging must be noindex');
 const config=JSON.parse(await readFile('wrangler.jsonc','utf8'));
 if(config.env.staging.name!=='jattoabdul-staging'||config.env.staging.routes.length!==0)throw Error('Unexpected staging destination');
}
if(action==='build'){
 run(['opennextjs-cloudflare','build','--env','staging']);
 const headersPath='.open-next/assets/_headers';
 await writeFile(headersPath,(await readFile(headersPath,'utf8'))+'\n/*\n  X-Robots-Tag: noindex, nofollow\n');
 await checkBundle();
 await writeFile('.open-next/staging-build.json',JSON.stringify({environment:'staging',builtAt:new Date().toISOString()}));
 console.log('Staging bundle validated; no private credentials found in output.');
}else if(action==='deploy'){
 const stamp=JSON.parse(await readFile('.open-next/staging-build.json','utf8'));
 if(stamp.environment!=='staging')throw Error('Run build:staging first');
 await checkBundle();
 run(['opennextjs-cloudflare','deploy','--env','staging']);
}else{
 if(!local.RESEND_API_KEY||!local.RESEND_AUDIENCE_ID&&!local.RESEND_SEGMENT_ID)throw Error('Existing Resend configuration is incomplete');
 const secretFile='.staging-check-token';
 const checkToken=existsSync(secretFile)?(await readFile(secretFile,'utf8')).trim():randomBytes(32).toString('hex');
 if(!existsSync(secretFile))await writeFile(secretFile,checkToken+'\n',{mode:0o600});
 // Pass secrets over stdin, never command arguments or terminal output.
 const secrets={RESEND_API_KEY:local.RESEND_API_KEY,RESEND_SEGMENT_ID:local.RESEND_SEGMENT_ID||local.RESEND_AUDIENCE_ID,STAGING_CHECK_TOKEN:checkToken,STAGING_SUBSCRIBE_TEST_EMAIL:'me+staging-test@jattoabdul.com'};
 run(['wrangler','secret','bulk','--env','staging'],{input:JSON.stringify(secrets),stdio:['pipe','inherit','inherit']});
}
