import { Play } from 'lucide-react';

import type { Video } from '@/data/videos';
import { cn } from '@/lib/utils';

type VideoCardProps = {
  video: Video;
  large?: boolean;
};

export function VideoCard({ video, large = false }: VideoCardProps) {
  const href = video.href ?? 'https://www.youtube.com/@jatto_abdul';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block text-fg no-underline"
    >
      <div className="relative mb-3 aspect-video overflow-hidden rounded-md border border-border bg-gradient-to-br from-bg-raised to-bg-sunken transition-colors group-hover:border-border-mid">
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail}
            alt=""
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, var(--accent-light), transparent 50%), radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 55%)',
            }}
          />
        )}
        <div className="absolute left-3 top-3 rounded border border-border bg-bg-surface px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-fg">
          {video.platform}
        </div>
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 rounded bg-black/65 px-2 py-0.5 font-mono text-[11px] font-medium text-white">
            {video.duration}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-border-mid bg-bg-surface shadow-sm transition-transform group-hover:scale-110">
            <Play className="size-[18px] text-accent" />
          </div>
        </div>
      </div>
      <div className="mb-1 flex items-center gap-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-3">
          {video.kind}
        </span>
        <span className="font-mono text-[11.5px] text-fg-3">· {video.date}</span>
      </div>
      <h3
        className={cn(
          'font-serif font-normal leading-snug tracking-tight text-fg',
          large ? 'text-[19px]' : 'text-[15.5px]',
        )}
      >
        {video.title}
      </h3>
    </a>
  );
}
