'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { CONSENT_TEXT, CONSENT_VERSION } from '@/lib/newsletter/consent';
import './newsletter.css';

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
export function NewsletterForm() {
  const [email, setEmail] = useState(''),
    [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false),
    [pending, setPending] = useState(false);
  const [challenge, setChallenge] = useState(''),
    [challengeReady, setChallengeReady] = useState(false);
  const widget = useRef<HTMLDivElement>(null),
    widgetId = useRef<string | undefined>(undefined),
    status = useRef<HTMLDivElement>(null);
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!sitekey || !challengeReady || !widget.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widget.current, {
      sitekey,
      action: 'newsletter',
      callback: setChallenge,
      'expired-callback': () => setChallenge(''),
      'error-callback': () => {
        setChallenge('');
        setMessage('Please reload the page to try the security check again.');
      },
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
  }, [sitekey, challengeReady]);
  useEffect(() => {
    if (pending) status.current?.focus();
  }, [pending]);
  if (process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED !== 'true') return null;
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          consent: true,
          consentVersion: CONSENT_VERSION,
          website: form.get('website'),
          challenge,
        }),
      });
      if (response.status === 202) {
        setPending(true);
        setEmail('');
        return;
      }
      const result = (await response.json()) as { code?: string };
      setMessage(
        result.code === 'rate_limited'
          ? 'Please wait an hour before requesting another email.'
          : result.code === 'test_only'
            ? 'This preview is open only for the approved inbox test.'
            : result.code === 'invalid_email'
              ? 'Please enter a valid email address.'
              : result.code === 'challenge_required'
                ? 'Please complete the security check.'
                : 'I couldn’t send the confirmation right now. Please try again later.'
      );
    } catch {
      setMessage('I couldn’t send the confirmation right now. Please try again later.');
    } finally {
      setBusy(false);
      setChallenge('');
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }
  return (
    <section className="newsletter-section" id="newsletter" aria-labelledby="newsletter-title">
      <div>
        <h2 id="newsletter-title">
          A note from me,
          <br />
          <em>now and then.</em>
        </h2>
        <p>
          I share what I’m learning about work, faith, and life, along with new writing and things
          I’m building.
        </p>
      </div>
      <div>
        {pending ? (
          <div role="status" tabIndex={-1} ref={status}>
            <h3>Check your inbox.</h3>
            <p>Confirm your email address to receive my notes.</p>
            <p>
              If an email doesn’t arrive, check spam or{' '}
              <a href="mailto:me@jattoabdul.com">get in touch</a>. This request won’t override an
              existing unsubscribe.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} aria-busy={busy}>
            <label htmlFor="newsletter-email">Email address</label>
            <div className="newsletter-input-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-describedby="newsletter-consent newsletter-message"
              />
              <button type="submit" disabled={busy || (!!sitekey && !challenge)}>
                {busy ? 'Sending…' : 'Subscribe'} <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="newsletter-honey" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <p className="newsletter-small" id="newsletter-consent">
              {CONSENT_TEXT} <a href="/newsletter/privacy">How your email is used</a>.
            </p>
            {sitekey && (
              <>
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  onReady={() => setChallengeReady(true)}
                />
                <div ref={widget} />
              </>
            )}
            <p id="newsletter-message" role="alert">
              {message}
            </p>
            <noscript>
              <p>
                Please enable JavaScript to request a confirmation email, or{' '}
                <a href="mailto:me@jattoabdul.com">email me</a>.
              </p>
            </noscript>
          </form>
        )}
      </div>
    </section>
  );
}
