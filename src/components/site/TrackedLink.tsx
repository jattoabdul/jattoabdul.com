'use client';

import posthog from 'posthog-js';

type TrackedLinkProps = {
  href: string;
  label: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
};

export function TrackedLink({ href, label, className, target, rel, children }: TrackedLinkProps) {
  function handleClick() {
    posthog.capture('social_link_clicked', { label, href });
  }

  return (
    <a href={href} className={className} target={target} rel={rel} onClick={handleClick}>
      {children}
    </a>
  );
}
