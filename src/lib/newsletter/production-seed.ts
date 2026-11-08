import { createHash, timingSafeEqual } from 'node:crypto';
import { CONSENT_TEXT } from './consent.ts';
const digest = (s: string) => createHash('sha256').update(s).digest();
const equal = (a: string, b: string) => timingSafeEqual(digest(a), digest(b));
interface SeedEnvironment {
  SITE_ENV?: string;
  NEWSLETTER_MODE?: string;
  NEWSLETTER_TEST_SECRET?: string;
}
export function productionSeedRequest(request: Request, env: SeedEnvironment): Request | Response {
  const url = new URL(request.url),
    testPage = url.pathname === '/newsletter/test';
  const headers = {
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
    'Referrer-Policy': 'no-referrer',
  };
  if (testPage && env.NEWSLETTER_MODE !== 'test')
    return new Response('Not found', { status: 404, headers });
  if (env.NEWSLETTER_MODE !== 'test' || (!testPage && url.pathname !== '/api/subscribe'))
    return request;
  if (
    env.SITE_ENV !== 'production' ||
    !['https://jattoabdul.com', 'https://www.jattoabdul.com'].includes(url.origin) ||
    !env.NEWSLETTER_TEST_SECRET ||
    env.NEWSLETTER_TEST_SECRET.length < 32
  )
    return new Response('Unavailable', { status: 503, headers });
  const secret = env.NEWSLETTER_TEST_SECRET,
    auth = request.headers.get('authorization') || '';
  if (
    !equal(auth, `Basic ${Buffer.from(`newsletter:${secret}`).toString('base64')}`) &&
    !equal(auth, `Bearer ${secret}`)
  )
    return new Response('Private newsletter test', {
      status: 401,
      headers: { ...headers, 'WWW-Authenticate': 'Basic realm="Newsletter seed", charset="UTF-8"' },
    });
  if (testPage) {
    if (request.method !== 'GET') return new Response(null, { status: 405, headers });
    return new Response(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Private newsletter test | Jatto Abdul</title><link rel="stylesheet" href="/newsletter-confirm.css"><script src="/newsletter-test.js" defer></script><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer></script></head><body><header><a href="/">Jatto Abdul</a></header><main><h1>A note from me,<br><span>now and then.</span></h1><p>Private release check. Only the approved inbox can receive email.</p><form id="seed"><p><label>Email address <input name="email" type="email" required maxlength="254" autocomplete="email"></label></p><p>${CONSENT_TEXT} <a href="/newsletter/privacy">Newsletter privacy</a></p><div class="cf-turnstile" data-sitekey="0x4AAAAAAEyqJp23yy3ZD5mF" data-action="newsletter"></div><p><button type="submit">Subscribe</button></p></form><p id="status" role="status"></p></main></body></html>`,
      {
        headers: {
          ...headers,
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Security-Policy':
            "default-src 'self'; script-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; style-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
        },
      }
    );
  }
  const forward = new Headers(request.headers);
  forward.set('authorization', `Bearer ${secret}`);
  return new Request(request, { headers: forward });
}
