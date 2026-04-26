import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { getNote, getPublishedNotes } from '@/data/notes';
import { formatDate } from '@/lib/format';

type RouteParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedNotes()
    .filter((n) => n.body?.length)
    .map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.body?.[0]?.slice(0, 160),
  };
}

export default async function NotePage({ params }: RouteParams) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note || note.published === false || !note.body?.length) notFound();

  return (
    <main id="main-content" className="pb-16 pt-12 sm:pt-14">
      <Container width="text">
        <Link
          href="/notes"
          className="mb-9 inline-flex items-center gap-1.5 font-mono text-[13.5px] text-fg-3 transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" /> notes
        </Link>

        <span className="mb-3.5 block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          Field note
        </span>
        <h1 className="mb-4 font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.02em] text-fg [text-wrap:balance]">
          {note.title}
        </h1>
        <div className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[12.5px] text-fg-3">
          <span>{formatDate(note.date)}</span>
          {note.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-bg-raised px-1.5 py-px text-[11px] text-fg-3"
            >
              #{t}
            </span>
          ))}
        </div>

        <hr className="mb-8 border-t border-border" />

        <article className="flex flex-col gap-5">
          {note.body.map((p, i) => (
            <p key={i} className="text-[16.5px] leading-[1.8] text-fg">
              {p}
            </p>
          ))}
        </article>
      </Container>
    </main>
  );
}
