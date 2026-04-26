'use client';

import { useMemo, useState } from 'react';
import { Rss } from 'lucide-react';

import type { PostListItem } from '@/data/posts';
import { PostRow } from '@/components/cards/PostRow';
import { cn } from '@/lib/utils';

type FeedState = 'success' | 'empty' | 'error';
type SourceFilter = 'All' | 'First-party' | 'Via Medium';

type WritingIndexProps = {
  posts: PostListItem[];
  feedState: FeedState;
};

const TAGS = [
  'All',
  'backend',
  'applied-ai',
  'platform',
  'career',
  'communication',
  'kafka',
  'data',
  'llms',
  'sql',
];

export function WritingIndex({ posts, feedState }: WritingIndexProps) {
  const [tag, setTag] = useState<string>('All');
  const [source, setSource] = useState<SourceFilter>('All');

  const visible = useMemo(() => {
    let list = posts;
    if (tag !== 'All') list = list.filter(p => p.tags.includes(tag));
    if (source === 'First-party') list = list.filter(p => p.source === 'local');
    if (source === 'Via Medium') list = list.filter(p => p.source === 'medium');
    return list;
  }, [posts, tag, source]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by tag">
        {TAGS.map(t => {
          const active = tag === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTag(t)}
              className={cn(
                'rounded-full border px-3 py-1 text-[12px] font-medium transition-colors',
                active
                  ? 'border-accent bg-accent text-fg-on-accent'
                  : 'border-border bg-bg-raised text-fg-2 hover:border-border-mid hover:text-fg',
                t !== 'All' && 'font-mono'
              )}
            >
              {t === 'All' ? t : `#${t}`}
            </button>
          );
        })}
      </div>

      <div className="mb-7 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-mono text-[11.5px] text-fg-3">source:</span>
        {(['All', 'First-party', 'Via Medium'] as SourceFilter[]).map(s => {
          const active = source === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSource(s)}
              className={cn(
                'rounded-sm border px-2.5 py-0.5 font-mono text-[11.5px] font-medium transition-colors',
                active
                  ? 'border-border-mid bg-bg-sunken text-fg'
                  : 'border-border text-fg-3 hover:text-fg'
              )}
            >
              {s}
            </button>
          );
        })}
      </div>

      {feedState === 'error' && (
        <div className="mb-6 flex flex-wrap items-center gap-3.5 rounded-md border border-border bg-bg-raised p-4">
          <Rss className="size-3.5 text-fg-3" />
          <span className="flex-1 text-[13.5px] text-fg-2">
            Couldn&apos;t load Medium posts right now. First-party posts shown below.
          </span>
          <a
            href="https://medium.com/@jattoabdul"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-[13px] font-medium text-accent hover:text-accent-h"
          >
            View on Medium →
          </a>
        </div>
      )}

      {visible.length === 0 ? (
        <div className="py-12 text-center text-[14px] text-fg-3">
          {feedState === 'empty'
            ? 'Nothing here yet. Check back soon.'
            : 'No posts match this filter.'}
        </div>
      ) : (
        <div>
          {visible.map((p, i) => (
            <PostRow key={`${p.source}-${p.slug}`} post={p} last={i === visible.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}
