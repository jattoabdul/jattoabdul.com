import test from 'node:test';
import assert from 'node:assert/strict';
import { productionSeedRequest } from '../src/lib/newsletter/production-seed.ts';
import { CONSENT_TEXT } from '../src/lib/newsletter/flow.ts';

const env = {
  SITE_ENV: 'production',
  NEWSLETTER_MODE: 'test',
  NEWSLETTER_TEST_SECRET: 'isolated-seed-fixture-at-least-32-characters',
};
const basic = `Basic ${Buffer.from(`newsletter:${env.NEWSLETTER_TEST_SECRET}`).toString('base64')}`;
const request = (path, authorization, origin = 'https://jattoabdul.com') =>
  new Request(origin + path, { headers: authorization ? { authorization } : {} });

test('production seed gate restricts signup and the test page without hiding the website', () => {
  for (const origin of ['https://jattoabdul.com', 'https://www.jattoabdul.com']) {
    for (const path of ['/newsletter/test', '/api/subscribe']) {
      const response = productionSeedRequest(request(path, undefined, origin), env);
      assert.equal(response.status, 401);
      assert.equal(response.headers.get('cache-control'), 'private, no-store');
    }
    const original = request('/writing', undefined, origin);
    assert.equal(productionSeedRequest(original, env), original);
    const forwarded = productionSeedRequest(request('/api/subscribe', basic, origin), env);
    assert.ok(forwarded instanceof Request);
    assert.equal(forwarded.headers.get('authorization'), `Bearer ${env.NEWSLETTER_TEST_SECRET}`);
  }
});
test('seed-only page disappears in off/live mode and rejects incorrect target or secret', () => {
  for (const mode of ['off', 'live', undefined]) {
    assert.equal(
      productionSeedRequest(request('/newsletter/test', basic), { ...env, NEWSLETTER_MODE: mode })
        .status,
      404
    );
  }
  for (const vars of [
    { ...env, SITE_ENV: 'staging' },
    { ...env, NEWSLETTER_TEST_SECRET: 'short' },
  ]) {
    assert.equal(productionSeedRequest(request('/newsletter/test', basic), vars).status, 503);
  }
  assert.equal(
    productionSeedRequest(request('/newsletter/test', basic, 'https://evil.example'), env).status,
    503
  );
  assert.equal(
    productionSeedRequest(request('/newsletter/test', 'Bearer invalid'), env).status,
    401
  );
});
test('private page has the exact versioned consent, real challenge and no embedded credential', async () => {
  const response = productionSeedRequest(request('/newsletter/test', basic), env);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  const html = await response.text();
  assert.ok(html.includes(CONSENT_TEXT));
  assert.ok(html.includes('data-action="newsletter"'));
  assert.ok(!html.includes(env.NEWSLETTER_TEST_SECRET));
  assert.ok(!html.includes('posthog'));
});
