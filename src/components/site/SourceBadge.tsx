import { cn } from '@/lib/utils';

function MediumGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn('size-[9px]', className)}
    >
      <ellipse cx="6.5" cy="12" rx="5.5" ry="5.5" />
      <ellipse cx="16.5" cy="12" rx="2.5" ry="5.5" />
      <ellipse cx="22" cy="12" rx="1" ry="5" />
    </svg>
  );
}

export function SourceBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-bg-raised font-medium tracking-wide text-fg-3',
        small ? 'px-1.5 py-px text-[10px]' : 'px-2 py-0.5 text-[11px]',
      )}
    >
      <MediumGlyph />
      Via Medium
    </span>
  );
}
