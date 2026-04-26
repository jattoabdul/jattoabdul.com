import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import type { ReactElement } from 'react';

import type { Post, PostListItem } from '@/data/posts';
import { mdxComponents } from '@/components/site/MdxComponents';

/**
 * MDX-driven first-party posts.
 *
 * Files live under `src/content/writing/<slug>.mdx`. Frontmatter follows the
 * `MdxFrontmatter` shape below. `published: false` posts are excluded from
 * everything (writing index, RSS, sitemap, generateStaticParams) — they stay
 * as drafts until you flip the flag.
 *
 * Add a new post: drop a new .mdx file in the dir. The slug is the filename
 * without extension.
 */

const CONTENT_DIR = path.join(process.cwd(), 'src/content/writing');

export type MdxFrontmatter = {
  title: string;
  category: string;
  excerpt: string;
  date: string; // ISO YYYY-MM-DD
  readTime: number;
  tags: string[];
  published: boolean;
  canonical?: string;
};

export type MdxPost = {
  meta: PostListItem; // same shape as the rest of the writing system
  content: ReactElement; // already-rendered React tree
};

const REHYPE_PRETTY_CODE_OPTIONS = {
  // Dual themes — auto-switches with the design system's data-theme attr.
  // Picked for warmth and contrast; both align with the site palette.
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  defaultLang: 'plaintext',
  keepBackground: false,
} as const;

function validateFrontmatter(slug: string, data: Record<string, unknown>): MdxFrontmatter {
  const required = ['title', 'category', 'excerpt', 'date', 'readTime', 'tags', 'published'];
  for (const key of required) {
    if (!(key in data)) {
      throw new Error(`MDX post "${slug}.mdx" is missing required frontmatter field: ${key}`);
    }
  }
  return data as MdxFrontmatter;
}

function frontmatterToPostMeta(slug: string, fm: MdxFrontmatter): PostListItem {
  return {
    slug,
    category: fm.category,
    title: fm.title,
    excerpt: fm.excerpt,
    date: fm.date,
    readTime: fm.readTime,
    tags: fm.tags,
    source: 'local',
    canonical: fm.canonical,
    published: fm.published,
  };
}

async function listMdxFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((f) => f.endsWith('.mdx'));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

/**
 * Read all MDX frontmatter (no body parse) — fast enough to call from index
 * pages, the writing feed, the sitemap, and `generateStaticParams`.
 */
export async function getAllMdxPostMeta(): Promise<PostListItem[]> {
  const files = await listMdxFiles();
  const out: PostListItem[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    const fm = validateFrontmatter(slug, data);
    out.push(frontmatterToPostMeta(slug, fm));
  }
  return out;
}

/**
 * Read + compile a single MDX post. Returns null if the file is missing or
 * the post is unpublished. Use this in the article route.
 */
export async function readMdxPost(slug: string): Promise<MdxPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
  const { data, content: source } = matter(raw);
  const fm = validateFrontmatter(slug, data);
  if (!fm.published) return null;

  const { content } = await compileMDX<MdxFrontmatter>({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, REHYPE_PRETTY_CODE_OPTIONS]],
      },
    },
    components: mdxComponents,
  });

  return { meta: frontmatterToPostMeta(slug, fm), content };
}

/** Bridge for legacy callers expecting the full Post shape. */
export function mdxMetaToPost(meta: PostListItem): Post {
  return { ...meta };
}
