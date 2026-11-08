import { createHash, timingSafeEqual } from 'node:crypto';

export const STAGING_ORIGIN = 'https://jattoabdul-staging.jatto-it-solutions-inc.workers.dev';
interface GateEnvironment {
  SITE_ENV?: string;
  NEWSLETTER_TEST_SECRET?: string;
}
const hash = (text: string) => createHash('sha256').update(text).digest();
const equal = (a: string, b: string) => timingSafeEqual(hash(a), hash(b));
export function stagingRequest(request: Request, env: GateEnvironment): Request | Response {
  const url = new URL(request.url);
  const secret = env.NEWSLETTER_TEST_SECRET;
  const headers = {
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow',
    'Referrer-Policy': 'no-referrer',
  };
  if (env.SITE_ENV !== 'staging' || url.origin !== STAGING_ORIGIN || !secret || secret.length < 32)
    return new Response('Unavailable', { status: 503, headers });
  const auth = request.headers.get('authorization') || '';
  const basic = `Basic ${Buffer.from(`newsletter:${secret}`).toString('base64')}`;
  const isBasic = equal(auth, basic);
  const isSubscribe = url.pathname === '/api/subscribe' && request.method === 'POST';
  const isBearer = isSubscribe && equal(auth, `Bearer ${secret}`);
  if (!isBasic && !isBearer)
    return new Response('Private staging', {
      status: 401,
      headers: {
        ...headers,
        'WWW-Authenticate': 'Basic realm="Newsletter staging", charset="UTF-8"',
      },
    });
  const forwarded = new Headers(request.headers);
  // The browser supplies HTTP authentication. No test credential enters client JS or HTML.
  forwarded.delete('authorization');
  if (isSubscribe) forwarded.set('authorization', `Bearer ${secret}`);
  return new Request(request, { headers: forwarded });
}
