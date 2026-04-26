import Link from 'next/link';

import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

type WordmarkProps = {
  className?: string;
  size?: 'sm' | 'md';
};

export function Wordmark({ className, size = 'md' }: WordmarkProps) {
  const dim = size === 'sm' ? 'size-[22px] text-[13px]' : 'size-6 text-[14px]';
  const label = size === 'sm' ? 'text-[16px]' : 'text-[17px]';
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-2.5 text-fg no-underline transition-opacity hover:opacity-80',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-md bg-fg font-serif font-medium leading-none tracking-tight text-bg',
          dim,
        )}
      >
        j
      </span>
      <span className={cn('whitespace-nowrap font-serif font-normal tracking-tight', label)}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
