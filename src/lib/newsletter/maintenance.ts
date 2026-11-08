import { NewsletterStore } from './store.ts';
import { resendNewsletter } from './provider.ts';
import { syncOptOut } from './unsubscribe.ts';

export async function newsletterMaintenance(
  env: Partial<NewsletterBindings> & Pick<NodeJS.ProcessEnv, 'RESEND_API_KEY' | 'RESEND_SEGMENT_ID'>
) {
  if (
    !env.NEWSLETTER_DB ||
    !env.RESEND_API_KEY ||
    !env.RESEND_SEGMENT_ID ||
    !env.NEWSLETTER_TOPIC_ID ||
    !env.NEWSLETTER_CONFIRMATION_TEMPLATE ||
    !env.NEWSLETTER_WELCOME_TEMPLATE ||
    !env.NEWSLETTER_ORIGIN
  )
    throw new Error('newsletter_maintenance_unconfigured');
  const store = new NewsletterStore(env.NEWSLETTER_DB);
  const provider = resendNewsletter({
    key: env.RESEND_API_KEY,
    segmentId: env.RESEND_SEGMENT_ID,
    topicId: env.NEWSLETTER_TOPIC_ID,
    confirmationTemplate: env.NEWSLETTER_CONFIRMATION_TEMPLATE,
    welcomeTemplate: env.NEWSLETTER_WELCOME_TEMPLATE,
    origin: env.NEWSLETTER_ORIGIN,
  });
  const now = Math.floor(Date.now() / 1000);
  await store.prune(now);
  // Each job makes one idempotent topic-only update. No welcome is sent here.
  for (let count = 0; count < 20; count++) {
    const job = await store.claimSync(now);
    if (!job) break;
    if (!(await syncOptOut(store, provider, job, now))) break;
  }
}
