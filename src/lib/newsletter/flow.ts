import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import type { NewsletterStore, SignupRecord } from './store.ts';
import { unsubscribeToken } from './tokens.ts';
import { CONSENT_VERSION } from './consent.ts';
export { CONSENT_VERSION, CONSENT_TEXT } from './consent.ts';
export interface NewsletterConfig {
  mode: 'off' | 'test' | 'live';
  origin: string;
  allowedOrigins?: string[];
  hashSecret: string;
  testEmail?: string;
  testSecret?: string;
  requireChallenge?: boolean;
  requireCloudflareIdentity?: boolean;
}
export interface NewsletterProvider {
  confirmation(email: string, url: string, requestId: string): Promise<void>;
  activate(record: SignupRecord): Promise<'suppressed' | 'ready'>;
  welcome(
    record: SignupRecord,
    links: { human: string; oneClick: string },
    authorized: () => Promise<boolean>
  ): Promise<string | null>;
  optOut(email: string): Promise<void>;
  challenge(token: string, ip: string, origin?: string): Promise<boolean>;
}
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const secretMatches = (a: string, b: string) =>
  timingSafeEqual(Buffer.from(digest(a)), Buffer.from(digest(b)));
const reply = (code: string, status = 200) =>
  Response.json(
    { code },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
        'Referrer-Policy': 'no-referrer',
      },
    }
  );
async function jsonBody(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.headers.get('content-type')?.startsWith('application/json') || !request.body)
    return null;
  const reader = request.body.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}
export function newsletterFlow(
  config: NewsletterConfig,
  store: NewsletterStore,
  provider: NewsletterProvider,
  now = () => Math.floor(Date.now() / 1000)
) {
  const key = (value: string) =>
    createHmac('sha256', config.hashSecret).update(value).digest('hex');
  function gate(request: Request) {
    if (config.mode === 'off' || config.hashSecret.length < 32) return reply('unavailable', 503);
    const origins = config.allowedOrigins || [config.origin];
    if (
      !origins.includes(request.headers.get('origin') || '') ||
      !origins.includes(new URL(request.url).origin)
    )
      return reply('forbidden', 403);
    return null;
  }
  return {
    async subscribe(request: Request) {
      const blocked = gate(request);
      if (blocked) return blocked;
      const body = await jsonBody(request);
      if (!body || typeof body.email !== 'string') return reply('invalid_email', 400);
      const email = body.email.trim().toLowerCase();
      if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return reply('invalid_email', 400);
      if (body.consentVersion !== CONSENT_VERSION || body.consent !== true)
        return reply('consent_required', 400);
      if (
        config.mode === 'test' &&
        (!config.testEmail ||
          !config.testSecret ||
          email !== config.testEmail ||
          !secretMatches(request.headers.get('authorization') || '', `Bearer ${config.testSecret}`))
      )
        return reply('test_only', 403);
      if (body.website) return reply('check_inbox', 202);
      const time = now(),
        ip = request.headers.get('cf-connecting-ip') || 'local';
      // CF sets this header on Workers. Never trust arbitrary X-Forwarded-For.
      if (
        (config.mode === 'live' || config.requireChallenge) &&
        (((config.mode === 'live' || config.requireCloudflareIdentity) &&
          !request.headers.get('cf-connecting-ip')) ||
          typeof body.challenge !== 'string' ||
          !body.challenge.trim() ||
          body.challenge.length > 2048 ||
          !(await provider.challenge(
            body.challenge,
            ip,
            request.headers.get('origin') || config.origin
          )))
      )
        return reply('challenge_required', 400);
      await store.prune(time);
      const hour = Math.floor(time / 3600);
      if (
        !(await store.limit(`ip:${key(ip)}:${hour}`, 10, (hour + 1) * 3600)) ||
        !(await store.limit(`email:${key(email)}:${hour}`, 2, (hour + 1) * 3600))
      )
        return reply('rate_limited', 429);
      const token = randomBytes(32).toString('hex');
      const record = {
        email_key: key(email),
        email,
        token_hash: digest(token),
        request_id: randomUUID(),
        requested_at: time,
        expires_at: time + 86400,
        consent_version: CONSENT_VERSION,
      };
      if (!(await store.issue(record))) return reply('check_inbox', 202);
      try {
        // Fragment keeps the bearer token out of HTTP request logs and referrers.
        await provider.confirmation(
          email,
          `${config.origin}/newsletter/confirm#${token}`,
          record.request_id
        );
        return reply('check_inbox', 202);
      } catch {
        // Ambiguous send stays valid; never automatically send another email.
        console.error(
          JSON.stringify({
            event: 'newsletter_confirmation_send_failed',
            requestId: record.request_id,
          })
        );
        return reply('try_again', 503);
      }
    },
    async confirm(request: Request) {
      const blocked = gate(request);
      if (blocked) return blocked;
      const body = await jsonBody(request);
      if (!body || typeof body.token !== 'string' || !/^[a-f0-9]{64}$/.test(body.token))
        return reply('invalid_link', 400);
      const hash = digest(body.token),
        time = now(),
        ip = request.headers.get('cf-connecting-ip') || 'local';
      if (!(await store.limit(`confirm:${key(ip)}:${Math.floor(time / 3600)}`, 30, time + 3600)))
        return reply('rate_limited', 429);
      const record = await store.claim(hash, time);
      if (!record) {
        const prior = await store.find(hash);
        return prior && prior.state !== 'pending'
          ? reply('already_used', 409)
          : reply('expired_link', 410);
      }
      if (config.mode === 'test' && record.email !== config.testEmail) {
        await store.finish(hash, 'suppressed');
        return reply('test_only', 403);
      }
      try {
        if (
          (await store.suppressed(record.email_key)) ||
          (await provider.activate(record)) === 'suppressed'
        ) {
          await store.finish(hash, 'suppressed');
          return reply('preferences_preserved', 409);
        }
        if (!(await store.reserveWelcome(record, time))) {
          await store.finish(hash, 'suppressed');
          return reply('preferences_preserved', 409);
        }
        const token = unsubscribeToken(record.request_id, config.hashSecret);
        const emailId = await provider.welcome(
          record,
          {
            human: `${config.origin}/newsletter/unsubscribe#${token}`,
            oneClick: `${config.origin}/api/newsletter/unsubscribe?token=${token}`,
          },
          () => store.welcomeAllowed(record.request_id)
        );
        if (!emailId) {
          await store.finishWelcome(record.request_id, 'suppressed');
          await store.finish(hash, 'suppressed');
          return reply('preferences_preserved', 409);
        }
        await store.finishWelcome(record.request_id, 'accepted', emailId);
        await store.finish(hash, 'confirmed', emailId);
        return reply('confirmed');
      } catch {
        await store.finishWelcome(record.request_id, 'needs_review');
        await store.finish(hash, 'needs_review');
        console.error(
          JSON.stringify({
            event: 'newsletter_confirmation_needs_review',
            requestId: record.request_id,
          })
        );
        return reply('finishing_confirmation', 202);
      }
    },
  };
}
