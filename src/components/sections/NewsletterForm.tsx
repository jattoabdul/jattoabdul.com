'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'done' | 'error';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <p className="mb-7 text-[15px] font-medium text-accent" role="status">
        You&apos;re in. Talk soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mb-7 flex max-w-[420px] flex-wrap justify-center gap-2"
      noValidate
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="min-w-[200px] flex-1 rounded-md border border-border-mid bg-bg-surface px-3.5 py-2.5 text-[14px] text-fg outline-none placeholder:text-fg-3 focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="whitespace-nowrap rounded-md bg-accent px-5 py-2.5 text-[14px] font-semibold text-fg-on-accent transition-colors hover:bg-accent-h disabled:opacity-60"
      >
        {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="w-full text-center text-[13px] text-fg-3" role="alert">
          Couldn&apos;t subscribe right now. Try again, or email me directly.
        </p>
      )}
    </form>
  );
}
