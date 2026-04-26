import { mediumPosts, getLocalPosts, type Post } from '@/data/posts';

/**
 * Server-side Medium RSS fetch.
 *
 * Set NEXT_PUBLIC_ENABLE_MEDIUM_FEED=true to merge Medium-syndicated posts
 * with local posts. Returns local-only when disabled or on any failure.
 *
 * ─── Allow-list filter ───────────────────────────────────────────────────
 * `MEDIUM_FILTER` lets you keep older / off-brand Medium posts out of the
 * site without unsubscribing from them on Medium itself. Edit the constant
 * below as your published catalog grows.
 *
 *   - `minDate`   : ISO date. Drop Medium posts published before this.
 *                   Set to null to allow all dates.
 *   - `requireAnyTag`: only keep posts whose categories include at least
 *                   one of these tags. Empty array = no tag requirement.
 *   - `denyTitles`: case-insensitive substrings; matching posts are dropped.
 *   - `allowTitles`: when non-empty, ONLY posts whose title matches one of
 *                   these substrings are kept. Highest-trust filter.
 *
 * Default is "allow everything" — you mentioned wanting to keep all current
 * Medium posts visible until newer brand-aligned posts push them down.
 */

type FeedState = 'success' | 'empty' | 'error';

export type WritingFeed = {
  posts: Post[];
  state: FeedState;
};

const MEDIUM_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jattoabdul';

const MEDIUM_FEED_ENABLED = process.env.NEXT_PUBLIC_ENABLE_MEDIUM_FEED === 'true';

const MEDIUM_FILTER: {
  minDate: string | null;
  requireAnyTag: string[];
  denyTitles: string[];
  allowTitles: string[];
} = {
  minDate: null,
  requireAnyTag: [],
  denyTitles: [],
  allowTitles: [],
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateReadTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function passesMediumFilter(post: Post): boolean {
  const f = MEDIUM_FILTER;
  if (f.minDate && new Date(post.date) < new Date(f.minDate)) return false;
  if (f.requireAnyTag.length && !post.tags.some((t) => f.requireAnyTag.includes(t))) {
    return false;
  }
  const titleLower = post.title.toLowerCase();
  if (f.denyTitles.some((t) => titleLower.includes(t.toLowerCase()))) return false;
  if (
    f.allowTitles.length &&
    !f.allowTitles.some((t) => titleLower.includes(t.toLowerCase()))
  ) {
    return false;
  }
  return true;
}

type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories?: string[];
};

export async function getWritingFeed(): Promise<WritingFeed> {
  // Local published posts come from MDX files now; manually-curated Medium
  // entries live in `mediumPosts`. Both go through the same filter pipeline.
  const local = await getLocalPosts();
  const curatedMedium = mediumPosts.filter((p) => p.published);

  const baseline = [...local, ...curatedMedium];

  if (!MEDIUM_FEED_ENABLED) {
    return { posts: sortByDate(baseline), state: 'success' };
  }

  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`feed status ${res.status}`);
    const data = (await res.json()) as { items?: RssItem[] };
    const remote: Post[] = (data.items ?? [])
      .map((item) => ({
        slug: slugify(item.title),
        category: item.categories?.[0] ?? 'Medium',
        title: item.title,
        excerpt: stripHtml(item.description).slice(0, 220),
        date: item.pubDate,
        readTime: estimateReadTime(item.description),
        tags: item.categories ?? [],
        source: 'medium' as const,
        url: item.link,
        canonical: item.link,
        published: true,
      }))
      .filter(passesMediumFilter);

    const merged = dedupe([...baseline, ...remote]);
    return { posts: sortByDate(merged), state: merged.length ? 'success' : 'empty' };
  } catch {
    return { posts: sortByDate(baseline), state: 'error' };
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
