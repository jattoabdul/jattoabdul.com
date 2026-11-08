import type { NewsletterProvider, NewsletterConfig } from './flow.ts';
import type { NewsletterStore, SuppressionRecord } from './store.ts';
import { verifyUnsubscribeToken } from './tokens.ts';

const response = (code: string, status = 200) =>
  Response.json(
    { code },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'Referrer-Policy': 'no-referrer',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    }
  );
export async function syncOptOut(
  store: NewsletterStore,
  provider: NewsletterProvider,
  job: SuppressionRecord,
  now: number
) {
  try {
    const receipt = await store.receipt(job.request_id);
    if (!receipt) throw new Error('receipt_missing');
    await provider.optOut(receipt.email);
    await store.synced(job.email_key, now);
    return true;
  } catch {
    await store.syncFailed(job, now);
    // Deliberately exclude email, tokens, provider response and query-string URLs.
    console.error(
      JSON.stringify({
        event: 'newsletter_opt_out_sync_pending',
        requestId: job.request_id,
        attempt: job.attempts,
      })
    );
    return false;
  }
}
export async function unsubscribeRequest(
  request: Request,
  config: NewsletterConfig,
  store: NewsletterStore,
  provider: NewsletterProvider,
  now = Math.floor(Date.now() / 1000)
) {
  if (request.method !== 'POST') return response('method_not_allowed', 405);
  const url = new URL(request.url);
  if (!(config.allowedOrigins || [config.origin]).includes(url.origin))
    return response('forbidden', 403);
  // A valid signature is the authorization. RFC 8058 clients do not send Origin.
  const token = url.searchParams.get('token') || '';
  const id = verifyUnsubscribeToken(token, config.hashSecret);
  if (!id) return response('invalid_link', 400);
  // No body is needed or parsed: normal form POST and RFC 8058 POST are both safe.
  const record = await store.receipt(id);
  if (!record || !record.confirmed_at) return response('invalid_link', 400);
  if (config.mode === 'test' && record.email !== config.testEmail)
    return response('test_only', 403);
  await store.optOut(record, now);
  const job = await store.claimSync(now, record.email_key);
  if (job) await syncOptOut(store, provider, job, now);
  return response('unsubscribed');
}
