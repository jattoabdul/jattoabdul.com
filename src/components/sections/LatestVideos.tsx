import { Container } from '@/components/site/Container';
import { SectionHeader, SectionLabel } from '@/components/site/SectionHeader';
import { VideoCard } from '@/components/cards/VideoCard';
import { shorts } from '@/data/videos';
import type { Video } from '@/data/videos';
import { cn } from '@/lib/utils';

type LatestVideosProps = {
  videos: Video[];
};

export function LatestVideos({ videos }: LatestVideosProps) {
  const latest = videos.slice(0, 3);
  return (
    <section className="border-b border-border py-16">
      <Container width="wide">
        <SectionHeader
          eyebrow="Creator work"
          title="Latest videos"
          action={{ label: 'All videos', href: '/videos' }}
        />
        {latest.length === 0 ? (
          <p className="text-[14px] text-fg-3">No videos yet — coming soon.</p>
        ) : (
          <div className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {latest.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
        <div className="mt-9 border-t border-border pt-6">
          <SectionLabel className="mb-3.5 block">Short-form themes</SectionLabel>
          {shorts.map((s, i) => (
            <a
              key={s.id}
              href="https://www.youtube.com/@jatto_abdul"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'grid grid-cols-[90px_1fr_auto] items-center gap-4 py-3 transition-opacity hover:opacity-70',
                i !== shorts.length - 1 && 'border-b border-border',
              )}
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-3">
                {s.platform}
              </span>
              <span className="text-[14px] text-fg">{s.title}</span>
              <span className="font-mono text-[11.5px] text-fg-3">{s.duration}</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
