import { Container } from '@/components/site/Container';
import { SectionHeader } from '@/components/site/SectionHeader';
import { PostRow } from '@/components/cards/PostRow';
import type { Post } from '@/data/posts';

type LatestWritingProps = {
  posts: Post[];
};

export function LatestWriting({ posts }: LatestWritingProps) {
  const latest = posts.slice(0, 4);
  return (
    <section className="border-b border-border py-16">
      <Container width="text">
        <SectionHeader
          eyebrow="Latest writing"
          title="Recent posts"
          action={{ label: 'See all writing', href: '/writing' }}
        />
        {latest.map((p, i) => (
          <PostRow key={p.slug} post={p} last={i === latest.length - 1} />
        ))}
      </Container>
    </section>
  );
}
