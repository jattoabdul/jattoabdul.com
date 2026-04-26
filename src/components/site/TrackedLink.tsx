'use client';

import type { ReactNode } from 'react';

import { captureEvent } from '@/lib/posthog-client';

type TrackedLinkProps = {
  href: string;
  label: string;
  eventName?: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
  className?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
};

export function TrackedLink({
  href,
  label,
  eventName = 'social_link_clicked',
  properties,
  className,
  target,
  rel,
  children,
}: TrackedLinkProps) {
  function handleClick() {
    captureEvent(eventName, { label, href, ...properties });
  }

  return (
    <a href={href} className={className} target={target} rel={rel} onClick={handleClick}>
      {children}
    </a>
  );
}
