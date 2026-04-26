import { FileText, Headphones, Image as ImageIcon, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { Short, ShortKind } from '@/data/videos';
import { cn } from '@/lib/utils';

const KIND_ICON: Record<ShortKind, LucideIcon> = {
  video: Play,
  image: ImageIcon,
  audio: Headphones,
  text: FileText,
};

type ShortCardProps = {
  short: Short;
  className?: string;
};

export function ShortCard({ short, className }: ShortCardProps) {
  const KindIcon = KIND_ICON[short.kind];
  const href = short.href;
  const Wrapper = href ? 'a' : 'div';
  const linkProps = href
    ? ({
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      } as const)
    : ({} as Record<string, never>);

  return (
    <Wrapper
      {...linkProps}
      className={cn(
        'group flex aspect-[9/12] flex-col gap-2.5 overflow-hidden rounded-md border border-border bg-bg-surface p-4 text-fg no-underline transition-colors',
        href && 'hover:border-border-mid',
        className,
      )}
    >
      {/* Header — platform + duration / kind */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-accent">
          {short.platform}
        </span>
        {short.duration ? (
          <span className="font-mono text-[11px] text-fg-3">{short.duration}</span>
        ) : (
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-fg-3">
            {short.kind}
          </span>
        )}
      </div>

      {/* Body — media preview or text excerpt */}
      <ShortBody short={short} kindIcon={KindIcon} />
    </Wrapper>
  );
}

function ShortBody({ short, kindIcon: KindIcon }: { short: Short; kindIcon: LucideIcon }) {
  if (short.kind === 'image' && short.media) {
    return (
      <>
        <div className="relative -mx-4 flex-1 overflow-hidden border-y border-border bg-bg-sunken">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={short.media}
            alt=""
            className="size-full object-cover"
            loading="lazy"
          />
        </div>
        <p className="line-clamp-3 font-serif text-[14.5px] leading-snug text-fg">
          {short.title}
        </p>
      </>
    );
  }

  if (short.kind === 'video' && short.media) {
    return (
      <>
        <div className="relative -mx-4 flex-1 overflow-hidden border-y border-border bg-bg-sunken">
          <video
            src={short.media}
            poster={undefined}
            preload="metadata"
            playsInline
            muted
            className="size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex size-10 items-center justify-center rounded-full border border-border-mid bg-bg-surface/90 shadow-sm transition-transform group-hover:scale-105">
              <Play className="size-3.5 text-accent" />
            </div>
          </div>
        </div>
        <p className="line-clamp-3 font-serif text-[14.5px] leading-snug text-fg">
          {short.title}
        </p>
      </>
    );
  }

  if (short.kind === 'audio' && short.media) {
    return (
      <>
        <div className="-mx-4 flex flex-1 items-center justify-center border-y border-border bg-bg-sunken">
          <KindIcon className="size-9 text-fg-3" />
        </div>
        <p className="line-clamp-3 font-serif text-[14.5px] leading-snug text-fg">
          {short.title}
        </p>
        <audio src={short.media} controls preload="none" className="w-full" />
      </>
    );
  }

  // Text shorts (or media-less video / image / audio fallbacks): show the
  // title as a serif headline + excerpt body, with a small kind icon footer.
  return (
    <>
      <p className="font-serif text-[16px] font-normal leading-snug text-fg">
        {short.title}
      </p>
      {short.excerpt && (
        <p className="line-clamp-5 flex-1 text-[13px] leading-[1.6] text-fg-2">
          {short.excerpt}
        </p>
      )}
      <KindIcon className="mt-auto size-[18px] text-fg-3" />
    </>
  );
}
