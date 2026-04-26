import { posts as localPosts, type Post } from '@/data/posts';

/**
 * Server-side Medium RSS fetch — disabled by default.
 * Set NEXT_PUBLIC_ENABLE_MEDIUM_FEED=true to opt in once the feed shape is verified.
 *
 * Returns local posts only when disabled or on any failure.
 */

type FeedState = 'success' | 'empty' | 'error';

export type WritingFeed = {
  posts: Post[];
  state: FeedState;
};

const MEDIUM_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jattoade';

const MEDIUM_FEED_ENABLED = process.env.NEXT_PUBLIC_ENABLE_MEDIUM_FEED === 'true';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function estimateReadTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories?: string[];
};

export async function getWritingFeed(): Promise<WritingFeed> {
  const local = localPosts.filter((p) => p.published);

  if (!MEDIUM_FEED_ENABLED) {
    return { posts: sortByDate(local), state: 'success' };
  }

  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`feed status ${res.status}`);
    const data = (await res.json()) as { items?: RssItem[] };
    const remote: Post[] = (data.items ?? []).map((item) => ({
      slug: slugify(item.title),
      category: item.categories?.[0] ?? 'Medium',
      title: item.title,
      excerpt: stripHtml(item.description).slice(0, 220),
      date: item.pubDate,
      readTime: estimateReadTime(item.description),
      tags: item.categories ?? [],
      source: 'medium',
      url: item.link,
      canonical: item.link,
      published: true,
    }));

    const merged = dedupe([...local, ...remote]);
    return { posts: sortByDate(merged), state: merged.length ? 'success' : 'empty' };
  } catch {
    return { posts: sortByDate(local), state: 'error' };
  }
}

function sortByDate(list: Post[]): Post[] {
  return [...list].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function dedupe(list: Post[]): Post[] {
  const seen = new Set<string>();
  const out: Post[] = [];
  for (const p of list) {
    const key = p.slug + '|' + p.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}
