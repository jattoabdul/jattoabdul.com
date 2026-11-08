import { readFile, readdir, writeFile, realpath, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { spawnSync } from 'node:child_process';

const action = process.argv[2];
if (!['build', 'deploy', 'check'].includes(action))
  throw Error(
    'Use build, deploy or check. Provision secrets separately through approved isolated Wrangler.'
  );
const wrangler =
  '/Users/jatto/.local/share/jatto-newsletter-tools/node_modules/wrangler/bin/wrangler.js';
const files = ['.env.local', '.env.staging.local', '.env.newsletter-test'];
const configs = await Promise.all(
  files.map(async file => (existsSync(file) ? parseEnv(await readFile(file, 'utf8')) : {}))
);
const staging = configs[1];
if (!staging.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  throw Error('Missing public staging Turnstile sitekey');
const secretKey = key =>
  !key.startsWith('NEXT_PUBLIC_') &&
  /SECRET|TOKEN|API_KEY|RESEND_|NEWSLETTER_|STAGING_|YOUTUBE_CHANNEL_ID/.test(key);
const env = {
  ...process.env,
  ...staging,
  SEO_INDEXABLE: 'false',
  SITE_ENV: 'staging',
  NEXT_PUBLIC_SITE_ENV: 'staging',
  NEXT_PUBLIC_NEWSLETTER_ENABLED: 'true',
  NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: '',
};
// Next may load .env.local. Explicit empty values prevent private data from entering bundles.
for (const config of [...configs, process.env])
  for (const key of Object.keys(config)) if (secretKey(key)) env[key] = '';
env.NEWSLETTER_MODE = 'off';
env.NEWSLETTER_LOCAL_BINDINGS = '';
env.CLOUDFLARE_API_TOKEN = '';
env.WRANGLER_WRITE_LOGS = 'false';
env.WRANGLER_LOG_SANITIZE = 'true';
const privateValues = [
  ...new Set(
    configs.flatMap(config =>
      Object.entries(config)
        .filter(
          ([key, value]) => secretKey(key) && value.length >= 20 && /SECRET|TOKEN|API_KEY/.test(key)
        )
        .map(([, value]) => value)
    )
  ),
];
function run(command, args, options = {}) {
  const result = spawnSync(command, args, { env, stdio: 'inherit', ...options });
  if (result.status !== 0) throw Error('Staging command failed; deployment stopped');
}
const cacheAssets = '.open-next/assets/cdn-cgi/_next_cache';
async function validateStaticCacheConfig() {
  const { default: config } = await import('../.open-next/.build/open-next.config.mjs');
  const overrides = config.default.override;
  const name = async value => (typeof value === 'function' ? (await value()).name : value);
  if (
    (await name(overrides.incrementalCache)) !== 'cf-static-assets-incremental-cache' ||
    (await name(overrides.tagCache)) !== 'dummy' ||
    config.dangerous?.disableIncrementalCache
  )
    throw Error('Staging packaging requires the existing static-only OpenNext cache');
}
async function checkCacheAssets() {
  await validateStaticCacheConfig();
  let count = 0;
  async function compare(relative = '') {
    for (const entry of await readdir('.open-next/cache' + relative, { withFileTypes: true })) {
      const path = relative + '/' + entry.name;
      if (entry.isDirectory()) await compare(path);
      else if (entry.isFile()) {
        const source = await readFile('.open-next/cache' + path);
        const packaged = await readFile(cacheAssets + path);
        if (!source.equals(packaged)) throw Error('Stale OpenNext static cache asset');
        count++;
      } else throw Error('Unexpected non-file cache asset');
    }
  }
  await compare();
  if (!count) throw Error('OpenNext prerendered cache is empty');
}
async function checkBundle() {
  await checkCacheAssets();
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = dir + '/' + entry.name;
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) {
        const bytes = await readFile(path);
        if (privateValues.some(value => bytes.includes(Buffer.from(value))))
          throw Error('A private credential was found in build output; deployment stopped');
      }
    }
  }
  await walk('.open-next');
  const manifest = JSON.parse(
    await readFile('.open-next/server-functions/default/.next/prerender-manifest.json', 'utf8')
  );
  if (!manifest.routes['/']) throw Error('Homepage was not prerendered');
  const html = await readFile('.next/server/app/index.html', 'utf8');
  if (!/<meta name="robots" content="noindex/.test(html)) throw Error('Staging must be noindex');
  const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
  const target = config.env.staging;
  if (
    target.name !== 'jattoabdul-staging' ||
    target.routes.length !== 0 ||
    target.main !== 'staging-worker.mjs' ||
    target.assets.run_worker_first !== true ||
    target.vars.NEWSLETTER_MODE !== 'test' ||
    target.d1_databases[0].database_id !== '66f56375-735f-40fd-8429-760e735ba454'
  )
    throw Error('Unexpected staging destination or missing access restriction');
}
if (action === 'build') {
  run(process.execPath, [
    'node_modules/@opennextjs/cloudflare/dist/cli/index.js',
    'build',
    '--env',
    'staging',
  ]);
  await validateStaticCacheConfig();
  // OpenNext 1.20.6 populateStaticAssetsIncrementalCache performs this local copy
  // before deploy. Keep it when using isolated Wrangler; no remote cache service.
  await cp('.open-next/cache', cacheAssets, { recursive: true });
  const headersPath = '.open-next/assets/_headers';
  await writeFile(
    headersPath,
    (await readFile(headersPath, 'utf8')) + '\n/*\n  X-Robots-Tag: noindex, nofollow\n'
  );
  await checkBundle();
  await writeFile(
    '.open-next/staging-build.json',
    JSON.stringify({ environment: 'staging', builtAt: new Date().toISOString() })
  );
  console.log('Staging bundle validated; no private credentials found in output.');
} else if (action === 'deploy') {
  const stamp = JSON.parse(await readFile('.open-next/staging-build.json', 'utf8'));
  if (stamp.environment !== 'staging') throw Error('Run build:staging first');
  await checkBundle();
  if ((await realpath(wrangler)) !== wrangler) throw Error('Unexpected Wrangler path');
  const deployEnv = { ...env, OPEN_NEXT_DEPLOY: 'true', CLOUDFLARE_ACCOUNT_ID: 'a14d42c54e515a9303bf97c69053a20b' };
  delete deployEnv.CLOUDFLARE_API_TOKEN;
  const version = spawnSync(wrangler, ['--version'], { env: deployEnv, encoding: 'utf8' });
  if (version.status !== 0 || version.stdout.trim() !== '4.125.0')
    throw Error('Unexpected Wrangler version');
  run(
    wrangler,
    ['deploy', '--config', 'wrangler.jsonc', '--env', 'staging', '--env-file', '/dev/null'],
    { env: deployEnv }
  );
} else {
  await checkBundle();
  console.log('Staging bundle and target checks passed.');
}
