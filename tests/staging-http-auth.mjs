// Read-only HTTP migration tests against the exact restricted staging deployment.
import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
const origin = 'https://jattoabdul-staging.jatto-it-solutions-inc.workers.dev';
if (process.env.MIGRATION_URL !== origin) throw Error('Staging QA requires the exact staging origin');
const env = parseEnv(readFileSync(new URL('../.env.newsletter-test', import.meta.url), 'utf8'));
if (!env.NEWSLETTER_TEST_SECRET || env.NEWSLETTER_TEST_SECRET.length < 32) throw Error('Missing staging test credential');
const authorization = 'Basic ' + Buffer.from(`newsletter:${env.NEWSLETTER_TEST_SECRET}`).toString('base64');
const networkFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const url = new URL(input instanceof Request ? input.url : input);
  if (url.origin !== origin) throw Error('Staging QA must not forward credentials to another origin');
  const headers = new Headers(init?.headers);
  headers.set('authorization', authorization);
  return networkFetch(input, { ...init, headers, redirect: init?.redirect || 'manual' });
};
