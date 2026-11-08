import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import { newsletterFlow, CONSENT_VERSION } from '../src/lib/newsletter/flow.ts';
import { NewsletterStore } from '../src/lib/newsletter/store.ts';
import { resendNewsletter } from '../src/lib/newsletter/provider.ts';
import { GET } from '../src/app/newsletter/confirm/route.ts';
import { GET as unsubscribeGET } from '../src/app/newsletter/unsubscribe/route.ts';
import { unsubscribeRequest, syncOptOut } from '../src/lib/newsletter/unsubscribe.ts';
import { unsubscribeToken, verifyUnsubscribeToken } from '../src/lib/newsletter/tokens.ts';

const origin = 'https://newsletter.example';
const config = {
  mode: 'test',
  origin,
  hashSecret: 'unit-test-only-secret-at-least-32-bytes',
  testEmail: 'seed@example.com',
  testSecret: 'test-secret',
};
const body = { email: config.testEmail, consent: true, consentVersion: CONSENT_VERSION };
const request = (data, headers = {}) =>
  new Request(origin + '/api/subscribe', {
    method: 'POST',
    headers: {
      origin,
      'content-type': 'application/json',
      authorization: 'Bearer test-secret',
      ...headers,
    },
    body: JSON.stringify(data),
  });
let mf, db, store, flow, mails, events, activations, clock, provider;
test.beforeEach(async () => {
  mf = new Miniflare(
    convertV4MiniflareOptions({
      name: 'newsletter-unit',
      modules: true,
      script: 'export default {fetch(){return new Response("test")}}',
      compatibilityDate: '2026-09-07',
      d1Databases: ['DB'],
    })
  );
  db = await mf.getD1Database('DB');
  let sql = await readFile(
    new URL('../migrations/newsletter/0001_confirmation.sql', import.meta.url),
    'utf8'
  );
  sql += await readFile(
    new URL('../migrations/newsletter/0002_welcome_unsubscribe.sql', import.meta.url),
    'utf8'
  );
  await db.batch(
    sql
      .split(';')
      .filter(s => s.trim())
      .map(s => db.prepare(s))
  );
  store = new NewsletterStore(db);
  mails = [];
  events = [];
  activations = [];
  clock = 1800000000;
  provider = {
    confirmation: async (...args) => {
      mails.push(args);
    },
    activate: async r => {
      activations.push(r);
      return 'ready';
    },
    welcome: async r => {
      events.push(r);
      return 'event-accepted';
    },
    challenge: async () => true,
    optOut: async () => {},
  };
  flow = newsletterFlow(config, store, provider, () => clock);
});
test.afterEach(async () => {
  await mf.dispose();
});
async function signup() {
  assert.equal((await flow.subscribe(request(body))).status, 202);
  return new URL(mails.at(-1)[1]).hash.slice(1);
}
test('default-off, cross-origin and test-recipient gates do not send', async () => {
  const off = newsletterFlow({ ...config, mode: 'off' }, store, provider);
  assert.equal((await off.subscribe(request(body))).status, 503);
  assert.equal(
    (await flow.subscribe(request(body, { origin: 'https://attacker.example' }))).status,
    403
  );
  assert.equal((await flow.subscribe(request(body, { authorization: '' }))).status, 403);
  assert.equal(
    (await flow.subscribe(request({ ...body, email: 'other@example.com' }))).status,
    403
  );
  assert.equal(mails.length, 0);
});
test('rejects malformed email, missing consent, stale consent, oversized and non-JSON bodies', async () => {
  for (const email of [null, {}, 42, 'invalid'])
    assert.equal((await flow.subscribe(request({ ...body, email }))).status, 400);
  for (const value of [
    { ...body, consent: false },
    { ...body, consentVersion: 'old' },
    { ...body, padding: 'x'.repeat(5000) },
  ])
    assert.equal((await flow.subscribe(request(value))).status, 400);
  assert.equal((await flow.subscribe(request(body, { 'content-type': 'text/plain' }))).status, 400);
  assert.equal(mails.length, 0);
});
test('honeypot returns generic result without storing or sending', async () => {
  assert.equal((await flow.subscribe(request({ ...body, website: 'spam' }))).status, 202);
  assert.equal(mails.length, 0);
  assert.equal(await db.prepare('SELECT count(*) AS n FROM newsletter_requests').first('n'), 0);
});
test('signup sends unique fragment URL, stores only token hash and does not activate a contact', async () => {
  const token = await signup();
  assert.match(token, /^[a-f0-9]{64}$/);
  assert.equal(activations.length, 0);
  assert.equal(events.length, 0);
  const row = await db.prepare('SELECT * FROM newsletter_requests').first();
  assert.equal(row.token_hash, createHash('sha256').update(token).digest('hex'));
  assert.equal(row.state, 'pending');
  assert.equal(row.expires_at - clock, 86400);
  assert.equal(row.consent_version, CONSENT_VERSION);
  assert.equal(row.confirmed_at, null);
  assert.ok(!JSON.stringify(row).includes(token));
});
test('GET landing page is safe for link scanners, private and contains no token or analytics', async () => {
  await signup();
  const response = GET(),
    html = await response.text();
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.match(html, /Confirm my subscription/);
  assert.doesNotMatch(html, /posthog|google-analytics|RESEND_UNSUBSCRIBE_URL/);
  assert.equal(activations.length, 0);
  assert.equal(events.length, 0);
});
test('one atomic confirmation wins concurrent requests; replay never dispatches again', async () => {
  const token = await signup();
  const responses = await Promise.all(
    Array.from({ length: 6 }, () => flow.confirm(request({ token })))
  );
  assert.equal(responses.filter(r => r.status === 200).length, 1);
  assert.equal(events.length, 1);
  assert.equal(activations.length, 1);
  assert.equal((await flow.confirm(request({ token }))).status, 409);
  assert.equal(events.length, 1);
  assert.equal((await db.prepare('SELECT * FROM newsletter_requests').first()).state, 'confirmed');
});
test('invalid, cross-origin and expired confirmations never activate', async () => {
  const token = await signup();
  assert.equal(
    (await flow.confirm(request({ token }, { origin: 'https://bad.example' }))).status,
    403
  );
  assert.equal((await flow.confirm(request({ token: 'bad' }))).status, 400);
  clock += 86401;
  assert.equal((await flow.confirm(request({ token }))).status, 410);
  assert.equal(events.length, 0);
});
test('preserves an opt-out and repeated confirmation cannot reset it', async () => {
  const token = await signup();
  provider.activate = async () => 'suppressed';
  assert.equal((await flow.confirm(request({ token }))).status, 409);
  assert.equal(events.length, 0);
  assert.equal(
    (await db.prepare('SELECT state FROM newsletter_requests').first()).state,
    'suppressed'
  );
  assert.equal((await flow.confirm(request({ token }))).status, 409);
});
test('ambiguous event result is held for review; no unsafe retry or duplicate welcome', async () => {
  const token = await signup();
  provider.welcome = async r => {
    events.push(r);
    throw new Error('timeout');
  };
  assert.equal((await flow.confirm(request({ token }))).status, 202);
  assert.equal(
    (await db.prepare('SELECT state FROM newsletter_requests').first()).state,
    'needs_review'
  );
  assert.equal((await flow.confirm(request({ token }))).status, 409);
  assert.equal(events.length, 1);
});
test('cooldown and email rate limit avoid sending repeated confirmation messages', async () => {
  await signup();
  assert.equal((await flow.subscribe(request(body))).status, 202);
  assert.equal(mails.length, 1);
  assert.equal((await flow.subscribe(request(body))).status, 429);
  assert.equal(mails.length, 1);
});
test('rotating an old pending request invalidates its first token', async () => {
  const first = await signup();
  clock += 601;
  const second = await signup();
  assert.notEqual(first, second);
  assert.equal((await flow.confirm(request({ token: first }))).status, 410);
  assert.equal((await flow.confirm(request({ token: second }))).status, 200);
});
test('live signup requires a verified challenge and Cloudflare network identity', async () => {
  const live = newsletterFlow({ ...config, mode: 'live' }, store, provider, () => clock);
  assert.equal((await live.subscribe(request(body))).status, 400);
  provider.challenge = async () => false;
  assert.equal(
    (
      await live.subscribe(
        request({ ...body, challenge: 'bad' }, { 'cf-connecting-ip': '192.0.2.1' })
      )
    ).status,
    400
  );
  assert.equal(mails.length, 0);
});
test('provider sends confirmation as transactional template with URL and idempotency key', async () => {
  const original = globalThis.fetch,
    calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push({ url: String(url), ...opts });
    return Response.json({ id: 'test-email' });
  };
  try {
    await resendNewsletter({
      key: 'test',
      segmentId: 'jatto',
      topicId: 'notes',
      confirmationTemplate: 'confirm',
      welcomeTemplate: 'welcome',
      origin,
    }).confirmation(config.testEmail, origin + '/newsletter/confirm#abc', 'receipt');
    const sent = JSON.parse(calls[0].body);
    assert.equal(sent.template.variables.CONFIRM_URL, origin + '/newsletter/confirm#abc');
    assert.equal(sent.template.id, 'confirm');
    assert.equal(sent.reply_to, 'me@jattoabdul.com');
    assert.doesNotMatch(calls[0].body, /RESEND_UNSUBSCRIBE_URL/);
    assert.equal(
      new Headers(calls[0].headers).get('Idempotency-Key'),
      'newsletter-confirm/receipt'
    );
  } finally {
    globalThis.fetch = original;
  }
});
test('deployed test mode requires a bounded challenge and CF identity before storing or sending', async () => {
  let challenges = 0;
  provider.challenge = async () => {
    challenges++;
    return false;
  };
  const staged = newsletterFlow(
    { ...config, requireChallenge: true, requireCloudflareIdentity: true },
    store,
    provider
  );
  for (const challenge of [undefined, '', ' ', 'x'.repeat(2049), 1, null]) {
    assert.equal(
      (await staged.subscribe(request({ ...body, challenge }, { 'cf-connecting-ip': '192.0.2.1' })))
        .status,
      400
    );
  }
  assert.equal(
    (
      await staged.subscribe(
        request({ ...body, challenge: 'fresh' }, { 'x-forwarded-for': '192.0.2.1' })
      )
    ).status,
    400
  );
  assert.equal(challenges, 0);
  assert.equal(
    (
      await staged.subscribe(
        request({ ...body, challenge: 'rejected' }, { 'cf-connecting-ip': '192.0.2.1' })
      )
    ).status,
    400
  );
  assert.equal(challenges, 1);
  assert.equal(mails.length, 0);
  assert.equal(await db.prepare('SELECT count(*) AS n FROM newsletter_requests').first('n'), 0);
  provider.challenge = async () => true;
  assert.equal(
    (
      await staged.subscribe(
        request({ ...body, challenge: 'verified' }, { 'cf-connecting-ip': '192.0.2.1' })
      )
    ).status,
    202
  );
  assert.equal(mails.length, 1);
});
test('Siteverify fails closed across malformed, HTTP, network, host and action failures', async () => {
  const original = globalThis.fetch;
  const p = resendNewsletter({
    key: 'test',
    segmentId: 'jatto',
    topicId: 'notes',
    confirmationTemplate: 'confirm',
    welcomeTemplate: 'welcome',
    origin,
    turnstileSecret: 'test-secret-only',
  });
  const valid = { success: true, hostname: new URL(origin).hostname, action: 'newsletter' };
  try {
    for (const data of [
      null,
      [],
      'true',
      {},
      { ...valid, success: 'true' },
      { ...valid, hostname: 'localhost' },
      { ...valid, action: 'login' },
      { ...valid, success: false },
    ]) {
      globalThis.fetch = async () => Response.json(data);
      assert.equal(await p.challenge('fresh', 'local'), false);
    }
    for (const response of [new Response('not json'), Response.json(valid, { status: 500 })]) {
      globalThis.fetch = async () => response;
      assert.equal(await p.challenge('fresh', 'local'), false);
    }
    globalThis.fetch = async () => {
      throw new Error('network failure');
    };
    assert.equal(await p.challenge('fresh', 'local'), false);
    let calls = 0;
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(String(url), 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
      assert.equal(JSON.parse(options.body).remoteip, undefined);
      assert.ok(options.signal);
      return Response.json(valid);
    };
    for (const token of ['', ' ', 'x'.repeat(2049)])
      assert.equal(await p.challenge(token, 'local'), false);
    assert.equal(calls, 0);
    assert.equal(await p.challenge('fresh', 'local'), true);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
  }
});
test('new Resend contact gets only Jatto segment and other topics explicitly opt-out', async () => {
  const original = globalThis.fetch,
    calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push({ url: String(url), ...opts });
    if (String(url).endsWith('/topics'))
      return Response.json({ data: [{ id: 'notes' }, { id: 'other-brand' }] });
    if (opts?.method === 'POST') return Response.json({ id: 'contact' });
    return Response.json({ name: 'not_found', message: 'missing' }, { status: 404 });
  };
  try {
    const p = resendNewsletter({
      key: 'test',
      segmentId: 'jatto',
      topicId: 'notes',
      confirmationTemplate: 'confirm',
      welcomeTemplate: 'welcome',
      origin,
    });
    assert.equal(await p.activate({ email: config.testEmail }), 'ready');
    const sent = JSON.parse(calls.find(c => c.method === 'POST').body);
    assert.deepEqual(sent.segments, [{ id: 'jatto' }]);
    assert.deepEqual(sent.topics, [
      { id: 'notes', subscription: 'opt_in' },
      { id: 'other-brand', subscription: 'opt_out' },
    ]);
  } finally {
    globalThis.fetch = original;
  }
});
test('provider respects global and topic opt-out without mutation', async () => {
  const original = globalThis.fetch,
    calls = [];
  try {
    const p = resendNewsletter({
      key: 'test',
      segmentId: 'jatto',
      topicId: 'notes',
      confirmationTemplate: 'confirm',
      welcomeTemplate: 'welcome',
      origin,
    });
    for (const global of [true, false]) {
      globalThis.fetch = async (url, opts) => {
        calls.push(opts?.method || 'GET');
        return Response.json(
          String(url).endsWith('/topics?limit=100')
            ? { data: [{ id: 'notes', subscription: 'opt_out' }], has_more: false }
            : { id: 'existing', unsubscribed: global }
        );
      };
      assert.equal(await p.activate({ email: config.testEmail }), 'suppressed');
      assert.equal(await p.welcome({ email: config.testEmail }, {}, async () => true), null);
    }
    assert.ok(calls.every(method => method === 'GET'));
  } finally {
    globalThis.fetch = original;
  }
});

test('welcome sends exactly one transactional-template request with stable key and unsubscribe headers', async () => {
  const original = globalThis.fetch,
    calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), ...options });
    return Response.json(
      String(url).includes('/contacts/')
        ? String(url).includes('/topics')
          ? {
              data: [
                { id: 'notes', subscription: 'opt_in' },
                { id: 'other', subscription: 'opt_in' },
              ],
              has_more: false,
            }
          : { id: 'existing', unsubscribed: false }
        : { id: 'welcome-id' }
    );
  };
  try {
    const p = resendNewsletter({
      key: 'test',
      segmentId: 'jatto',
      topicId: 'notes',
      confirmationTemplate: 'confirm',
      welcomeTemplate: 'welcome',
      origin,
    });
    const links = {
      human: origin + '/newsletter/unsubscribe#signed',
      oneClick: origin + '/api/newsletter/unsubscribe?token=signed',
    };
    assert.equal(
      await p.welcome({ email: config.testEmail, request_id: 'receipt' }, links, async () => true),
      'welcome-id'
    );
    const sent = calls.find(c => c.method === 'POST'),
      email = JSON.parse(sent.body);
    assert.equal(email.template.id, 'welcome');
    assert.equal(email.template.variables.UNSUBSCRIBE_URL, links.human);
    assert.equal(email.headers['List-Unsubscribe'], `<${links.oneClick}>`);
    assert.equal(email.headers['List-Unsubscribe-Post'], 'List-Unsubscribe=One-Click');
    assert.equal(new Headers(sent.headers).get('Idempotency-Key'), 'newsletter-welcome/receipt');
    assert.ok(calls.every(c => !c.url.includes('/events')));
    const n = calls.length;
    assert.equal(await p.welcome({ email: config.testEmail }, links, async () => false), null);
    assert.ok(calls.slice(n).every(c => c.method === 'GET'));
  } finally {
    globalThis.fetch = original;
  }
});
async function confirmedRecord() {
  const token = await signup();
  assert.equal((await flow.confirm(request({ token }))).status, 200);
  return db.prepare('SELECT * FROM newsletter_requests').first();
}
const optRequest = token =>
  new Request(origin + '/api/newsletter/unsubscribe?token=' + token, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'List-Unsubscribe=One-Click',
  });
test('signed unsubscribe is scanner-safe, works without Origin/auth and survives off mode', async () => {
  const r = await confirmedRecord(),
    token = unsubscribeToken(r.request_id, config.hashSecret);
  let updates = 0;
  provider.optOut = async email => {
    assert.equal(email, config.testEmail);
    updates++;
  };
  assert.equal(verifyUnsubscribeToken(token, config.hashSecret), r.request_id);
  assert.equal(verifyUnsubscribeToken(token, config.hashSecret + 'wrong'), null);
  assert.equal(verifyUnsubscribeToken('v1.bad', config.hashSecret), null);
  const page = unsubscribeGET();
  assert.equal(page.headers.get('cache-control'), 'no-store');
  assert.doesNotMatch(await page.text(), /posthog|google-analytics/);
  assert.equal(
    (await unsubscribeRequest(new Request(optRequest(token).url), config, store, provider, clock))
      .status,
    405
  );
  assert.equal(await store.suppressed(r.email_key), false);
  assert.equal(
    (
      await unsubscribeRequest(
        optRequest(token),
        { ...config, mode: 'off' },
        store,
        provider,
        clock
      )
    ).status,
    200
  );
  assert.equal(await store.suppressed(r.email_key), true);
  assert.equal(updates, 1);
  assert.equal(
    (await unsubscribeRequest(optRequest(token), config, store, provider, clock)).status,
    200
  );
  assert.equal(updates, 1);
  clock += 3600;
  assert.equal((await flow.subscribe(request(body))).status, 202);
  assert.equal(mails.length, 1);
  assert.equal(events.length, 1);
});
test('unsubscribe rejects forged links and unconfirmed receipts with no mutation', async () => {
  await signup();
  const r = await db.prepare('SELECT * FROM newsletter_requests').first();
  for (const token of [
    'bad',
    unsubscribeToken(r.request_id, config.hashSecret),
    unsubscribeToken(r.request_id, config.hashSecret + 'wrong'),
  ])
    assert.equal(
      (await unsubscribeRequest(optRequest(token), config, store, provider, clock)).status,
      400
    );
  assert.equal(await store.suppressed(r.email_key), false);
});
test('opt-out is durable during provider outage and retries with a lease without resending welcome', async () => {
  const r = await confirmedRecord(),
    token = unsubscribeToken(r.request_id, config.hashSecret);
  provider.optOut = async () => {
    throw new Error('offline');
  };
  assert.equal(
    (await unsubscribeRequest(optRequest(token), config, store, provider, clock)).status,
    200
  );
  assert.equal(await store.suppressed(r.email_key), true);
  assert.equal(await store.claimSync(clock), null);
  clock += 301;
  const jobs = await Promise.all([store.claimSync(clock), store.claimSync(clock)]);
  assert.equal(jobs.filter(Boolean).length, 1);
  provider.optOut = async () => {};
  assert.equal(await syncOptOut(store, provider, jobs.find(Boolean), clock), true);
  assert.equal(await store.claimSync(clock + 3600), null);
  assert.equal(events.length, 1);
});
test('opt-out between provider check and dispatch prevents welcome and never gets overwritten', async () => {
  const token = await signup();
  provider.welcome = async (r, _links, authorized) => {
    await store.optOut(r, clock);
    assert.equal(await authorized(), false);
    return null;
  };
  assert.equal((await flow.confirm(request({ token }))).status, 409);
  assert.equal(
    (await db.prepare('SELECT state FROM newsletter_requests').first()).state,
    'suppressed'
  );
  assert.equal(
    (await db.prepare('SELECT state FROM newsletter_welcomes').first()).state,
    'suppressed'
  );
});
test('provider opt-out changes only Notes topic, never global state or another brand', async () => {
  const original = globalThis.fetch,
    calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push({ url: String(url), ...opts });
    return Response.json({ id: 'existing' });
  };
  try {
    const p = resendNewsletter({
      key: 'test',
      segmentId: 'jatto',
      topicId: 'notes',
      confirmationTemplate: 'confirm',
      welcomeTemplate: 'welcome',
      origin,
    });
    await p.optOut(config.testEmail);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, 'PATCH');
    assert.deepEqual(JSON.parse(calls[0].body), [{ id: 'notes', subscription: 'opt_out' }]);
  } finally {
    globalThis.fetch = original;
  }
});
test('explicit apex/www allowlist accepts both and rejects lookalikes and worker aliases', async () => {
  const dual = newsletterFlow(
    { ...config, allowedOrigins: [origin, 'https://www.newsletter.example'] },
    store,
    provider,
    () => clock
  );
  const www = new Request('https://www.newsletter.example/api/subscribe', {
    method: 'POST',
    headers: {
      origin: 'https://www.newsletter.example',
      'content-type': 'application/json',
      authorization: 'Bearer test-secret',
    },
    body: JSON.stringify(body),
  });
  assert.equal((await dual.subscribe(www)).status, 202);
  assert.equal(
    (await dual.subscribe(request(body, { origin: 'https://www.newsletter.example.evil' }))).status,
    403
  );
  const alias = new Request('https://alias.workers.dev/api/subscribe', request(body));
  assert.equal((await dual.subscribe(alias)).status, 403);
});
