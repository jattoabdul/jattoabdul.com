import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { getLocalPosts, getPost } from '@/data/posts';
import { formatDate } from '@/lib/format';

type RouteParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLocalPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default async function ArticlePage({ params }: RouteParams) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.source !== 'local' || !post.body) notFound();

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
          {post.category}
        </span>
        <h1 className="mb-4 font-serif text-[clamp(2rem,4.6vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.024em] text-fg [text-wrap:balance]">
          {post.title}
        </h1>
        <div className="mb-9 flex flex-wrap items-center gap-3 font-mono text-[13px] text-fg-3">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span>{post.readTime} min read</span>
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-bg-raised px-1.5 py-px text-[11px] text-fg-3"
            >
              #{t}
            </span>
          ))}
        </div>

        <hr className="mb-9 border-t border-border" />

        <article className="flex flex-col gap-5">
          {post.body.map((block, i) => {
            if (block.type === 'p') {
              return (
                <p key={i} className="text-[17px] leading-[1.85] text-fg">
                  {block.text}
                </p>
              );
            }
            if (block.type === 'h2') {
              return (
                <h2
                  key={i}
                  className="mt-4 font-serif text-[24px] font-normal leading-[1.25] tracking-[-0.012em] text-fg"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote
                  key={i}
                  className="my-1 border-l-[3px] border-accent pl-5 font-serif text-[19px] font-light italic leading-[1.55] text-fg-2"
                >
                  {block.text}
                </blockquote>
              );
            }
            if (block.type === 'code') {
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-md border border-border bg-bg-code"
                >
                  <div className="flex items-center justify-between border-b border-border bg-bg-raised px-4 py-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-3">
                      {block.lang}
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-[1.75] text-fg">
                    {block.code}
                  </pre>
                </div>
              );
            }
            return null;
          })}
        </article>

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
