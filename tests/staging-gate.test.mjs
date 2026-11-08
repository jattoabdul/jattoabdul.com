import test from 'node:test';
import assert from 'node:assert/strict';
import { stagingRequest, STAGING_ORIGIN } from '../src/lib/newsletter/staging-gate.ts';
const env = {
  SITE_ENV: 'staging',
  NEWSLETTER_TEST_SECRET: 'private-test-fixture-that-is-over-32-characters',
};
const basic = `Basic ${Buffer.from(`newsletter:${env.NEWSLETTER_TEST_SECRET}`).toString('base64')}`;
const request = (path, authorization, method = 'GET') =>
  new Request(STAGING_ORIGIN + path, { method, headers: authorization ? { authorization } : {} });
test('entire staging surface, including static files and confirmation, requires authentication', () => {
  for (const path of [
    '/',
    '/writing',
    '/newsletter/confirm',
    '/api/newsletter/confirm',
    '/newsletter-confirm.js',
    '/_next/static/test.js',
  ]) {
    for (const auth of [undefined, 'Basic garbage', `Bearer ${env.NEWSLETTER_TEST_SECRET}`]) {
      const result = stagingRequest(request(path, auth), env);
      assert.equal(result.status, 401);
      assert.equal(result.headers.get('cache-control'), 'private, no-store');
    }
    const result = stagingRequest(request(path, basic), env);
    assert.ok(result instanceof Request);
    assert.equal(result.headers.get('authorization'), null);
  }
});
test('authenticated browser signup is mapped to the existing private test API gate', () => {
  for (const auth of [basic, `Bearer ${env.NEWSLETTER_TEST_SECRET}`]) {
    const result = stagingRequest(request('/api/subscribe', auth, 'POST'), env);
    assert.ok(result instanceof Request);
    assert.equal(result.headers.get('authorization'), `Bearer ${env.NEWSLETTER_TEST_SECRET}`);
  }
});
test('gate fails closed outside the exact staging origin or with missing credentials', () => {
  for (const vars of [
    {},
    { ...env, SITE_ENV: 'production' },
    { ...env, NEWSLETTER_TEST_SECRET: 'short' },
  ])
    assert.equal(stagingRequest(request('/', basic), vars).status, 503);
  assert.equal(
    stagingRequest(
      new Request('https://jattoabdul.com/', { headers: { authorization: basic } }),
      env
    ).status,
    503
  );
});
