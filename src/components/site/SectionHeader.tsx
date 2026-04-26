import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-3',
        className,
      )}
    >
      {children}
    </span>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
  className?: string;
};

export function SectionHeader({ eyebrow, title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-7', className)}>
      {eyebrow && <SectionLabel className="mb-2 block">{eyebrow}</SectionLabel>}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-serif text-[26px] font-normal leading-tight tracking-[-0.015em] text-fg">
          {title}
        </h2>
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-accent transition-colors hover:text-accent-h"
          >
            {action.label} <ArrowRight className="size-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
