import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { Note } from '@/data/notes';
import { formatShortDate } from '@/lib/format';
import { cn } from '@/lib/utils';

type NoteRowProps = {
  note: Note;
  last?: boolean;
};

export function NoteRow({ note, last = false }: NoteRowProps) {
  const hasBody = !!note.body?.length;
  const className = cn(
    'grid grid-cols-[64px_1fr_auto] items-center gap-4 py-3.5 transition-opacity',
    hasBody && 'hover:opacity-65',
    !last && 'border-b border-border',
  );

  const inner = (
    <>
      <span className="whitespace-nowrap font-mono text-[11.5px] text-fg-3">
        {formatShortDate(note.date)}
      </span>
      <div>
        <span className="mb-1 block text-[14.5px] font-medium leading-snug text-fg">
          {note.title}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {note.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-bg-raised px-1.5 py-px font-mono text-[10px] text-fg-3"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
      {hasBody ? (
        <ArrowRight className="size-3.5 text-fg-3" />
      ) : (
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-fg-3">
          idea
        </span>
      )}
    </>
  );

  if (hasBody) {
    return (
      <Link href={`/notes/${note.slug}`} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}
