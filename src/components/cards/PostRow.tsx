import Link from 'next/link';

import type { Post } from '@/data/posts';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { SourceBadge } from '@/components/site/SourceBadge';

type PostRowProps = {
  post: Post;
  last?: boolean;
};

export function PostRow({ post, last = false }: PostRowProps) {
  const isExternal = post.source === 'medium' && !!post.url;
  const href = isExternal ? (post.url as string) : `/writing/${post.slug}`;

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'group grid grid-cols-[1fr_auto] items-start gap-6 py-5 transition-opacity hover:opacity-70',
        !last && 'border-b border-border',
      )}
    >
      <div>
        <div className="mb-2 flex items-center gap-2.5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
            {post.category}
          </span>
          {post.source === 'medium' && <SourceBadge />}
        </div>
        <h3 className="mb-1.5 font-serif text-[18px] font-normal leading-tight tracking-[-0.005em] text-fg">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="max-w-[62ch] text-[14px] leading-[1.65] text-fg-2">{post.excerpt}</p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 pt-6">
        <span className="whitespace-nowrap font-mono text-[12px] text-fg-3">
          {formatDate(post.date)}
        </span>
        <span className="whitespace-nowrap font-mono text-[12px] text-fg-3">
          {post.readTime} min
        </span>
      </div>
    </Link>
  );
}
