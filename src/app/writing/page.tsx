import type { Metadata } from 'next';

import { Container } from '@/components/site/Container';
import { PageHeader } from '@/components/site/PageHeader';
import { WritingIndex } from '@/components/site/WritingIndex';
import { toListItem } from '@/data/posts';
import { getWritingFeed } from '@/lib/posts';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Practical engineering essays from Jatto Abdul: backend systems, platform engineering, applied AI, and engineering communication.',
};

export default async function WritingPage() {
  const feed = await getWritingFeed();

  return (
    <main id="main-content" className="pb-16">
      <PageHeader
        eyebrow="Writing"
        title={
          <>
            Practical notes <span className="italic text-fg-2">from real builds.</span>
          </>
        }
        intro="Some posts live here as first-party essays; others are syndicated from Medium. Filter by topic or source. Canonical links always point to the source."
      />
      <Container width="text">
        <WritingIndex posts={feed.posts.map(toListItem)} feedState={feed.state} />
      </Container>
    </main>
  );
}
