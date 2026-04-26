import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { getLocalPosts } from '@/data/posts';
import { readMdxPost } from '@/lib/mdx';
import { formatDate } from '@/lib/format';

type RouteParams = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const local = await getLocalPosts();
  return local.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await readMdxPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
  };
}

export default async function ArticlePage({ params }: RouteParams) {
  const { slug } = await params;
  const post = await readMdxPost(slug);
  if (!post) notFound();

  const { meta, content } = post;

  return (
    <main id="main-content" className="pb-16 pt-12 sm:pt-14">
      <Container width="text">
        <Link
          href="/writing"
          className="mb-9 inline-flex items-center gap-1.5 font-mono text-[13.5px] text-fg-3 transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" /> writing
        </Link>

        <span className="mb-3.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          {meta.category}
        </span>
        <h1 className="mb-4 font-serif text-[clamp(2rem,4.6vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.024em] text-fg [text-wrap:balance]">
          {meta.title}
        </h1>
        <div className="mb-9 flex flex-wrap items-center gap-3 font-mono text-[13px] text-fg-3">
          <span>{formatDate(meta.date)}</span>
          <span aria-hidden>·</span>
          <span>{meta.readTime} min read</span>
          {meta.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-bg-raised px-1.5 py-px text-[11px] text-fg-3"
            >
              #{t}
            </span>
          ))}
        </div>

        <hr className="mb-9 border-t border-border" />

        <article className="article-prose flex flex-col gap-5">{content}</article>

        <hr className="my-10 border-t border-border" />

        <div className="flex flex-wrap items-center justify-between gap-5 rounded-md border border-accent-mid bg-bg-accent p-6">
          <div>
            <h3 className="mb-1 font-serif text-[17px] font-normal text-fg">
              Enjoyed this? There&apos;s more.
            </h3>
            <p className="text-[13.5px] text-fg-2">
              Notes on backend systems, applied AI, and engineering judgment.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-accent px-4 py-2.5 text-[13.5px] font-semibold text-fg-on-accent transition-colors hover:bg-accent-h"
          >
            Get in touch →
          </Link>
        </div>
      </Container>
    </main>
  );
}
