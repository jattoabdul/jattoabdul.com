import { ArrowRight } from 'lucide-react';

import type { Note } from '@/data/notes';
import { formatShortDate } from '@/lib/format';
import { cn } from '@/lib/utils';

type NoteRowProps = {
  note: Note;
  last?: boolean;
};

export function NoteRow({ note, last = false }: NoteRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[64px_1fr_auto] items-center gap-4 py-3.5 transition-opacity hover:opacity-65',
        !last && 'border-b border-border',
      )}
    >
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
      <ArrowRight className="size-3.5 text-fg-3" />
    </div>
  );
}
