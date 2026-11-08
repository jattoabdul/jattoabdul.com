import { Resend } from 'resend';
import type { NewsletterProvider } from './flow.ts';
export interface ProviderConfig {
  key: string;
  segmentId: string;
  topicId: string;
  confirmationTemplate: string;
  welcomeTemplate: string;
  origin: string;
  allowedOrigins?: string[];
  turnstileSecret?: string;
}
export function resendNewsletter(config: ProviderConfig): NewsletterProvider {
  const resend = new Resend(config.key, { baseUrl: 'https://api.resend.com' });
  const fetchRequest = resend.fetchRequest.bind(resend);
  // Bound every SDK call without changing global fetch or retrying uncertain sends.
  resend.fetchRequest = <T>(path: string, options: RequestInit = {}) =>
    fetchRequest<T>(path, { ...options, signal: AbortSignal.timeout(10000) });
  async function contactState(email: string) {
    const response = await resend.contacts.get({ email: encodeURIComponent(email) });
    if (response.error) {
      if (response.error.statusCode === 404 || response.error.name === 'not_found') return null;
      throw new Error('contact_lookup_failed');
    }
    if (!response.data) throw new Error('contact_lookup_empty');
    if (response.data.unsubscribed) return 'suppressed';
    const topics = await resend.contacts.topics.list({
      email: encodeURIComponent(email),
      limit: 100,
    });
    if (topics.error || !topics.data || topics.data.has_more)
      throw new Error('topic_lookup_failed');
    if (!topics.data.data.some(t => t.id === config.topicId && t.subscription === 'opt_in'))
      return 'suppressed';
    return response.data;
  }
  return {
    async confirmation(email, url, requestId) {
      // Transactional: a required unique URL, never the marketing unsubscribe token.
      const result = await resend.emails.send(
        {
          from: 'Jatto Abdul <notes@letters.jattoabdul.com>',
          to: [email],
          replyTo: 'me@jattoabdul.com',
          subject: "Confirm you'd like to hear from me",
          template: { id: config.confirmationTemplate, variables: { CONFIRM_URL: url } },
        },
        { idempotencyKey: `newsletter-confirm/${requestId}` }
      );
      if (result.error || !result.data) throw new Error('confirmation_send_failed');
    },
    async activate(record) {
      const current = await contactState(record.email);
      if (current === 'suppressed') return 'suppressed';
      if (!current) {
        const topics = await resend.topics.list();
        if (topics.error || !topics.data || !topics.data.data.some(t => t.id === config.topicId))
          throw new Error('topic_inventory_failed');
        const created = await resend.contacts.create({
          email: record.email,
          unsubscribed: false,
          segments: [{ id: config.segmentId }],
          topics: topics.data.data.map(t => ({
            id: t.id,
            subscription: t.id === config.topicId ? ('opt_in' as const) : ('opt_out' as const),
          })),
        });
        if (created.error || !created.data) throw new Error('contact_create_failed');
      } else {
        // Do not reset global suppression or modify another brand's preferences.
        const segment = await resend.contacts.segments.add({
          email: encodeURIComponent(record.email),
          segmentId: config.segmentId,
        });
        if (segment.error) throw new Error('segment_add_failed');
      }
      return 'ready';
    },
    async welcome(record, links, authorized) {
      const state = await contactState(record.email);
      if (!state || state === 'suppressed' || !(await authorized())) return null;
      const result = await resend.emails.send(
        {
          from: 'Jatto Abdul <notes@letters.jattoabdul.com>',
          to: [record.email],
          replyTo: 'me@jattoabdul.com',
          subject: "Glad you're here",
          template: { id: config.welcomeTemplate, variables: { UNSUBSCRIBE_URL: links.human } },
          headers: {
            'List-Unsubscribe': `<${links.oneClick}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        },
        { idempotencyKey: `newsletter-welcome/${record.request_id}` }
      );
      if (result.error || !result.data) throw new Error('welcome_send_failed');
      return result.data.id;
    },
    async optOut(email) {
      const result = await resend.contacts.topics.update({
        email: encodeURIComponent(email),
        topics: [{ id: config.topicId, subscription: 'opt_out' }],
      });
      // A deleted contact has no delivery membership to suppress.
      if (result.error && result.error.statusCode !== 404) throw new Error('opt_out_sync_failed');
    },
    async challenge(token, ip, requestOrigin = config.origin) {
      if (!config.turnstileSecret || !token.trim() || token.length > 2048) return false;
      try {
        if (!(config.allowedOrigins || [config.origin]).includes(requestOrigin)) return false;
        const hostname = new URL(requestOrigin).hostname;
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          signal: AbortSignal.timeout(8000),
          body: JSON.stringify({
            secret: config.turnstileSecret,
            response: token,
            ...(ip && ip !== 'local' ? { remoteip: ip } : {}),
          }),
        });
        if (!response.ok) return false;
        const data: unknown = await response.json();
        if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
        const result = data as Record<string, unknown>;
        return (
          result.success === true && result.hostname === hostname && result.action === 'newsletter'
        );
      } catch {
        // No transport/parser failure may authorize signup; never log tokens or responses.
        return false;
      }
    },
  };
}
