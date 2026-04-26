'use client';

import { useMemo, useState } from 'react';

import { NoteRow } from '@/components/cards/NoteRow';
import { notes, noteTags } from '@/data/notes';
import { cn } from '@/lib/utils';

const TAGS = ['All', ...noteTags];

export function NotesIndex() {
  const [tag, setTag] = useState<string>('All');

  const visible = useMemo(
    () => (tag === 'All' ? notes : notes.filter((n) => n.tags.includes(tag))),
    [tag],
  );

  return (
    <div>
      <div className="mb-7 flex flex-wrap gap-1.5">
        {TAGS.map((t) => {
          const active = tag === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-3 py-1 text-[12px] font-medium transition-colors',
                active
                  ? 'border-accent bg-accent text-fg-on-accent'
                  : 'border-border bg-bg-raised text-fg-2 hover:border-border-mid hover:text-fg',
                t !== 'All' && 'font-mono',
              )}
            >
              {t === 'All' ? t : `#${t}`}
            </button>
          );
        })}
      </div>
      <div>
        {visible.length === 0 ? (
          <div className="py-12 text-center text-[14px] text-fg-3">No notes match this filter.</div>
        ) : (
          visible.map((n, i) => (
            <NoteRow key={n.slug} note={n} last={i === visible.length - 1} />
          ))
        )}
      </div>
    </div>
  );
}
