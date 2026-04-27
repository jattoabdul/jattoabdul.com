export type PostSource = 'local' | 'medium' | 'external';

/**
 * Post: a writing entry (metadata only — bodies live elsewhere).
 *
 * Two sources:
 * - `source: 'local'`  — body is an MDX file under `src/content/writing/<slug>.mdx`,
 *                         frontmatter mirrors this shape, loaded by `src/lib/mdx.ts`.
 * - `source: 'medium'` — external link, no body. Listed in this file.
 *
 * `published: false` items act as drafts and are excluded from everywhere.
 *
 * To add a new local post: drop a new .mdx file in `src/content/writing/`.
 * To add a new Medium-syndicated post: append to `mediumPosts` below until
 * the Medium feed picks it up automatically.
 */
export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  source: PostSource;
  url?: string;
  canonical?: string;
  published: boolean;
};

/**
 * Slim list-card shape — same as Post (no body field exists at this layer
 * anymore). Kept as a distinct alias so callers continue to compile and
 * future fields can be excluded here without touching every consumer.
 */
export type PostListItem = Post;

export function toListItem(p: Post): PostListItem {
  return p;
}

/**
 * Manually curated Medium-link entries. Use these for posts you want
 * surfaced on the site even when the live Medium RSS feed is off, or when
 * you want a stable tagline / category instead of whatever the feed gives.
 *
 * If you set `published: true` here, the entry shows in the writing index
 * with a "Via Medium" badge that links out to `url`.
 */
export const mediumPosts: Post[] = [
  {
    slug: 'why-i-built-infergo',
    category: 'Applied AI',
    title: 'Why I built Infergo (and what it does today)',
    excerpt:
      'A Go-native inference toolkit for backend services. Pre-alpha, narrow on purpose, and the thing I wished existed the last three times I had to run model traffic through a Python sidecar.',
    date: '2026-04-29',
    readTime: 9,
    tags: ['applied-ai', 'go', 'backend'],
    source: 'medium',
    // Replace url + canonical with the live Medium URL once the post is published.
    url: 'https://medium.com/@jattoabdul',
    canonical: 'https://medium.com/@jattoabdul',
    published: false,
  },
  {
    slug: 'most-engineering-writing-is-for-the-wrong-reader',
    category: 'Communication',
    title: 'Most engineering writing is for the wrong reader',
    excerpt:
      "The reviewer reads it once. The merge bot doesn't read it at all. Future-you reads it forever. Pick the longer-running reader.",
    date: '2026-04-27',
    readTime: 8,
    tags: ['communication', 'product'],
    source: 'medium',
    url: 'https://medium.com/@jattoabdul/most-engineering-writing-is-for-the-wrong-reader-56261b5a10ca',
    canonical:
      'https://medium.com/@jattoabdul/most-engineering-writing-is-for-the-wrong-reader-56261b5a10ca',
    published: true,
  },
  {
    slug: 'kafka-rebalance',
    category: 'Platform Engineering',
    title: 'Kafka consumer group rebalancing: triggers and mitigations',
    excerpt:
      'A practical guide to diagnosing and reducing rebalance frequency in high-throughput systems.',
    date: '2026-02-18',
    readTime: 9,
    tags: ['kafka', 'platform'],
    source: 'medium',
    url: 'https://medium.com/@jattoabdul',
    canonical: 'https://medium.com/@jattoabdul',
    published: false,
  },
  {
    slug: 'structured-outputs',
    category: 'Applied AI',
    title: 'Structuring LLM outputs for downstream reliability',
    excerpt:
      'Why function calling and structured outputs are not the same thing, and when to reach for each.',
    date: '2026-02-05',
    readTime: 7,
    tags: ['applied-ai', 'llms'],
    source: 'medium',
    url: 'https://medium.com/@jattoabdul',
    canonical: 'https://medium.com/@jattoabdul',
    published: false,
  },
];

// Re-export under the historical `posts` name so the only place that has to
// know about the split is this module + the writing feed.
export const posts = mediumPosts;

export const allTags = Array.from(new Set(mediumPosts.flatMap(p => p.tags))).sort();

/**
 * @deprecated Use `getMediumLinkPost` (sync, for the medium-link entries)
 *   or `readMdxPost` (async, for local .mdx posts) instead.
 *
 * Kept as a sync convenience that searches only the medium-link entries —
 * local posts now live in MDX and need an async filesystem read.
 */
export function getPost(slug: string): Post | undefined {
  return mediumPosts.find(p => p.slug === slug);
}

export function getMediumLinkPost(slug: string): Post | undefined {
  return mediumPosts.find(p => p.slug === slug);
}

/**
 * Local published posts. Now backed by MDX files; this is async because it
 * reads the filesystem. Used by the writing feed, sitemap, and the article
 * route's `generateStaticParams`.
 */
export async function getLocalPosts(): Promise<Post[]> {
  const { getAllMdxPostMeta } = await import('@/lib/mdx');
  const all = await getAllMdxPostMeta();
  return all.filter(p => p.published);
}

/**
 * Slim shape for the command menu writing list — both local + curated Medium
 * posts, stripped to what the menu actually needs. Server-fetched, passed
 * through Layout → Header → CommandMenu as a prop so the client component
 * doesn't need filesystem access.
 */
export type CommandMenuPost = {
  slug: string;
  title: string;
  category: string;
  source: PostSource;
  url?: string;
};

export async function getCommandMenuPosts(): Promise<CommandMenuPost[]> {
  const local = await getLocalPosts();
  const curated = mediumPosts.filter(p => p.published);
  return [...local, ...curated].map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    source: p.source,
    url: p.url,
  }));
}
