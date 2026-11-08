import { readFile, readdir, writeFile, realpath, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const action = process.argv[2];
const newsletterMode = process.argv[3] || 'off';
if (!['off', 'test', 'live'].includes(newsletterMode))
  throw Error('Expected explicit newsletter mode off, test or live');
const newsletterEnabled = newsletterMode === 'live';
if (!['build', 'deploy', 'check'].includes(action))
  throw Error(
    'Use build, deploy or check. Provision secrets separately through approved isolated Wrangler.'
  );
const wrangler =
  '/Users/jatto/.local/share/jatto-newsletter-tools/node_modules/wrangler/bin/wrangler.js';
const files = [
  '.env',
  '.env.local',
  '.env.production',
  '.env.production.local',
  '.env.staging.local',
  '.env.newsletter-test',
];
const configs = await Promise.all(
  files.map(async file => (existsSync(file) ? parseEnv(await readFile(file, 'utf8')) : {}))
);
const production = configs[3],
  analytics = configs[4];
const privateKey = key =>
  !key.startsWith('NEXT_PUBLIC_') &&
  /SECRET|TOKEN|API_KEY|RESEND_|NEWSLETTER_|STAGING_|YOUTUBE_CHANNEL_ID/.test(key);
const privateValues = [
  ...new Set(
    [...configs, process.env].flatMap(config =>
      Object.entries(config)
        .filter(
          ([key, value]) =>
            privateKey(key) && value && value.length >= 20 && /SECRET|TOKEN|API_KEY/.test(key)
        )
        .map(([, value]) => value)
    )
  ),
];
// Only the two historical public analytics fields are shared with staging.
// Never copy staging's full env or newsletter/sitekey settings into production.
const env = {
  ...process.env,
  NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN:
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
    analytics.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
    '',
  NEXT_PUBLIC_POSTHOG_HOST:
    process.env.NEXT_PUBLIC_POSTHOG_HOST ||
    analytics.NEXT_PUBLIC_POSTHOG_HOST ||
    'https://us.i.posthog.com',
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: production.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
  NEXT_PUBLIC_NEWSLETTER_ENABLED: String(newsletterEnabled),
  NEXT_PUBLIC_SITE_ENV: 'production',
  SITE_ENV: 'production',
  SEO_INDEXABLE: 'true',
};
if (!env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN)
  throw Error('Configure the personal-site public PostHog token first');
if (env.NEXT_PUBLIC_TURNSTILE_SITE_KEY !== '0x4AAAAAAEyqJp23yy3ZD5mF')
  throw Error('Production Turnstile sitekey does not match the approved manifest');
for (const config of [...configs, process.env])
  for (const key of Object.keys(config)) if (privateKey(key)) env[key] = '';
env.NEWSLETTER_MODE = 'off';
env.NEWSLETTER_LOCAL_BINDINGS = '';
env.CLOUDFLARE_API_TOKEN = '';
env.WRANGLER_WRITE_LOGS = 'false';
env.WRANGLER_LOG_SANITIZE = 'true';
const hash = value => createHash('sha256').update(value).digest('hex');
function run(command, args, options = {}) {
  const result = spawnSync(command, args, { env, stdio: 'inherit', ...options });
  if (result.status !== 0) throw Error('Production command failed; deployment stopped');
}
async function targetConfig() {
  const raw = await readFile('wrangler.jsonc', 'utf8'),
    config = JSON.parse(raw),
    target = config.env.production;
  const routes = target.routes.map(route => route.pattern).sort();
  if (
    target.name !== 'jattoabdul-production' ||
    target.main !== 'newsletter-worker.mjs' ||
    JSON.stringify(routes) !== JSON.stringify(['jattoabdul.com/*', 'www.jattoabdul.com/*']) ||
    target.routes.some(route => route.zone_id !== 'ad3961ea9aeffc0b75f9aa0fa8baf189') ||
    target.services.length !== 1 ||
    target.services[0].service !== 'jattoabdul-production' ||
    target.vars.SITE_ENV !== 'production' ||
    target.vars.SEO_INDEXABLE !== 'true' ||
    target.vars.NEWSLETTER_MODE !== newsletterMode ||
    target.d1_databases.length !== 1 ||
    target.d1_databases[0].binding !== 'NEWSLETTER_DB' ||
    target.d1_databases[0].database_id !== 'ec2e0e20-45f4-4db9-92ac-86523278eb3f'
  )
    throw Error(
      'Unexpected production destination or newsletter activation before release gates pass'
    );
  return hash(raw);
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
    throw Error('Production packaging requires the existing static-only OpenNext cache');
}
async function checkCacheAssets() {
  await validateStaticCacheConfig();
  let count = 0;
  async function compare(relative = '') {
    for (const entry of await readdir('.open-next/cache' + relative, { withFileTypes: true })) {
      const path = relative + '/' + entry.name;
      if (entry.isDirectory()) await compare(path);
      else if (entry.isFile()) {
        if (!(await readFile('.open-next/cache' + path)).equals(await readFile(cacheAssets + path)))
          throw Error('Stale OpenNext static cache asset');
        count++;
      } else throw Error('Unexpected non-file cache asset');
    }
  }
  await compare();
  if (!count) throw Error('OpenNext prerendered cache is empty');
}
async function checkBundle() {
  await targetConfig();
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
  if (/<meta name="robots" content="noindex/.test(html))
    throw Error('Production must allow indexing');
  const writing = await readFile('.next/server/app/writing.html', 'utf8');
  if (
    /<section[^>]+id="newsletter"/.test(writing) !== newsletterEnabled ||
    /href="\/writing#newsletter"/.test(writing) !== newsletterEnabled
  )
    throw Error('Newsletter form/CTA does not match the explicit build mode');
}
await targetConfig();
if (action === 'build') {
  run(process.execPath, [
    'node_modules/@opennextjs/cloudflare/dist/cli/index.js',
    'build',
    '--env',
    'production',
  ]);
  await validateStaticCacheConfig();
  await cp('.open-next/cache', cacheAssets, { recursive: true });
  await checkBundle();
  await writeFile(
    '.open-next/production-build.json',
    JSON.stringify({
      environment: 'production',
      newsletterEnabled,
      newsletterMode,
      configHash: await targetConfig(),
      builtAt: new Date().toISOString(),
    })
  );
  console.log(`Production ${newsletterMode} bundle validated; private-value scan passed.`);
} else {
  const stamp = JSON.parse(await readFile('.open-next/production-build.json', 'utf8'));
  if (
    stamp.environment !== 'production' ||
    stamp.newsletterEnabled !== newsletterEnabled ||
    stamp.newsletterMode !== newsletterMode ||
    stamp.configHash !== (await targetConfig())
  )
    throw Error('Run the guarded production build for this exact configuration first');
  await checkBundle();
  if (action === 'deploy') {
    if ((await realpath(wrangler)) !== wrangler) throw Error('Unexpected Wrangler path');
    const deployEnv = {
      ...env,
      OPEN_NEXT_DEPLOY: 'true',
      CLOUDFLARE_ACCOUNT_ID: 'a14d42c54e515a9303bf97c69053a20b',
    };
    delete deployEnv.CLOUDFLARE_API_TOKEN;
    const version = spawnSync(wrangler, ['--version'], { env: deployEnv, encoding: 'utf8' });
    if (version.status !== 0 || version.stdout.trim() !== '4.125.0')
      throw Error('Unexpected Wrangler version');
    run(
      wrangler,
      ['deploy', '--config', 'wrangler.jsonc', '--env', 'production', '--env-file', '/dev/null'],
      { env: deployEnv }
    );
  } else console.log(`Production ${newsletterMode} bundle and exact target checks passed.`);
}
