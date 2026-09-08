import Link from 'next/link';

import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  size?: 'sm' | 'md';
};

/** The wordmark is the name in Fraunces. No monogram (owner ruling 2026-09-03). */
export function Wordmark({ className, size = 'md' }: WordmarkProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, home`}
      className={cn(
        'justify-self-start whitespace-nowrap font-serif font-medium tracking-[0.005em] text-[var(--ink,var(--fg))] no-underline transition-opacity hover:opacity-80',
        size === 'sm' ? 'text-[20px]' : 'text-[24px]',
        className
      )}
    >
      {siteConfig.name}
    </Link>
  );
}
