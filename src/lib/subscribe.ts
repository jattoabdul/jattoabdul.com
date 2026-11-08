import { getCloudflareContext } from '@opennextjs/cloudflare';
import { newsletterFlow } from './newsletter/flow.ts';
import { resendNewsletter } from './newsletter/provider.ts';
import { NewsletterStore } from './newsletter/store.ts';
import { unsubscribeRequest } from './newsletter/unsubscribe.ts';
export async function newsletterRequest(
  request: Request,
  action: 'subscribe' | 'confirm' | 'unsubscribe'
) {
  const env = process.env;
  const unavailable = () =>
    Response.json(
      { code: 'unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  // Default off. No legacy direct-to-segment fallback.
  if (action !== 'unsubscribe' && !['test', 'live'].includes(env.NEWSLETTER_MODE || ''))
    return unavailable();
  const {
    RESEND_API_KEY: key,
    RESEND_SEGMENT_ID: segmentId,
    NEWSLETTER_TOPIC_ID: topicId,
    NEWSLETTER_CONFIRMATION_TEMPLATE: confirmationTemplate,
    NEWSLETTER_WELCOME_TEMPLATE: welcomeTemplate,
    NEWSLETTER_ORIGIN: origin,
    NEWSLETTER_HASH_SECRET: hashSecret,
  } = env;
  if (
    !key ||
    !segmentId ||
    !topicId ||
    !confirmationTemplate ||
    !welcomeTemplate ||
    !origin ||
    !hashSecret
  )
    return unavailable();
  const staging = env.SITE_ENV === 'staging';
  if (
    staging &&
    (env.NEWSLETTER_MODE !== 'test' ||
      origin !== 'https://jattoabdul-staging.jatto-it-solutions-inc.workers.dev' ||
      !env.TURNSTILE_SECRET_KEY)
  )
    return unavailable();
  if (env.NEWSLETTER_MODE === 'test' && (!env.NEWSLETTER_TEST_EMAIL || !env.NEWSLETTER_TEST_SECRET))
    return unavailable();
  if (
    env.NEWSLETTER_MODE === 'live' &&
    (!origin.startsWith('https://') || !env.TURNSTILE_SECRET_KEY)
  )
    return unavailable();
  try {
    const { env: bindings } = await getCloudflareContext({ async: true });
    const db = (bindings as Partial<NewsletterBindings>).NEWSLETTER_DB;
    if (!db) return unavailable();
    const config = {
      mode:
        env.NEWSLETTER_MODE === 'live'
          ? ('live' as const)
          : env.NEWSLETTER_MODE === 'test'
            ? ('test' as const)
            : ('off' as const),
      origin,
      allowedOrigins:
        env.SITE_ENV === 'production' && origin === 'https://jattoabdul.com'
          ? ['https://jattoabdul.com', 'https://www.jattoabdul.com']
          : [origin],
      hashSecret,
      testEmail: env.NEWSLETTER_TEST_EMAIL,
      testSecret: env.NEWSLETTER_TEST_SECRET,
      requireChallenge: staging || Boolean(env.TURNSTILE_SECRET_KEY),
      requireCloudflareIdentity: staging || env.SITE_ENV === 'production',
    };
    const store = new NewsletterStore(db);
    const provider = resendNewsletter({
      key,
      segmentId,
      topicId,
      confirmationTemplate,
      welcomeTemplate,
      origin,
      allowedOrigins: config.allowedOrigins,
      turnstileSecret: env.TURNSTILE_SECRET_KEY,
    });
    if (action === 'unsubscribe') return await unsubscribeRequest(request, config, store, provider);
    const flow = newsletterFlow(config, store, provider);
    return await flow[action](request);
  } catch {
    console.error(JSON.stringify({ event: 'newsletter_request_failed', action }));
    return unavailable();
  }
}
export const subscribe = (request: Request) => newsletterRequest(request, 'subscribe');
