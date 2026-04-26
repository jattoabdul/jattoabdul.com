import type { Metadata } from 'next';

import { Container } from '@/components/site/Container';
import { PageHeader } from '@/components/site/PageHeader';
import { SectionLabel } from '@/components/site/SectionHeader';
import { VideoCard } from '@/components/cards/VideoCard';
import { ShortCard } from '@/components/cards/ShortCard';
import { shorts } from '@/data/videos';
import { getVideoFeed } from '@/lib/videos';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Long-form videos and short-form themes by Jatto Abdul on engineering, applied AI, and senior engineering practice.',
};

export default async function VideosPage() {
  const { videos, state } = await getVideoFeed();
  const [feature, ...rest] = videos;

  return (
    <main id="main-content" className="pb-16">
      <PageHeader
        width="wide"
        eyebrow="Videos & creator work"
        title={
          <>
            Engineering, <span className="italic text-fg-2">on camera.</span>
          </>
        }
        intro="Long-form videos on YouTube and short-form themes across LinkedIn, X, and Instagram. Same ideas, different shapes."
      />
      <Container width="wide">
        {state === 'error' && (
          <div className="mb-8 rounded-md border border-border bg-bg-raised p-4 text-[13.5px] text-fg-2">
            Couldn&apos;t load the YouTube feed right now. Showing fallback list below.
          </div>
        )}

        {videos.length === 0 ? (
          <p className="mb-12 text-[14px] text-fg-3">No videos yet — coming soon.</p>
        ) : feature ? (
          <div className="mb-12 grid gap-6 md:grid-cols-[2fr_1fr]">
            <VideoCard video={feature} large />
            <div className="flex flex-col gap-5">
              {rest.slice(0, 4).map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        ) : null}

        <SectionLabel className="mb-4 block">Short-form themes</SectionLabel>
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {shorts.map((s) => (
            <ShortCard key={s.id} short={s} />
          ))}
        </div>
      </Container>
    </main>
  );
}
