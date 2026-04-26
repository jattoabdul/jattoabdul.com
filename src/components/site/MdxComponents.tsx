import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Element-level styles for MDX-rendered article bodies. Mirrors what the old
 * PostBlock-based renderer produced, plus richer support for lists, inline
 * code, links, and images that the array shape didn't have.
 *
 * Code blocks come pre-tokenised by rehype-pretty-code (build-time, server-
 * side, zero client JS). The CSS in globals.css styles the resulting spans.
 */
export const mdxComponents: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      {...props}
      className="mt-10 font-serif text-[24px] font-normal leading-[1.25] tracking-[-0.012em] text-fg"
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 {...props} className="mt-8 font-sans text-[18px] font-semibold leading-snug text-fg" />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p {...props} className="text-[17px] leading-[1.85] text-fg" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      {...props}
      className="my-2 border-l-[3px] border-accent pl-5 font-serif text-[19px] font-light italic leading-[1.55] text-fg-2"
    />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul {...props} className="ml-5 list-disc space-y-2 text-[17px] leading-[1.75] text-fg" />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol {...props} className="ml-5 list-decimal space-y-2 text-[17px] leading-[1.75] text-fg" />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li {...props} className="pl-1" />,
  a: (props: ComponentPropsWithoutRef<'a'>) => {
    const isExternal = !!props.href?.startsWith('http');
    return (
      <a
        {...props}
        target={isExternal ? '_blank' : props.target}
        rel={isExternal ? 'noopener noreferrer' : props.rel}
        className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-h hover:decoration-accent-h"
      />
    );
  },
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong {...props} className="font-semibold text-fg" />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => <em {...props} className="italic" />,
  hr: () => <hr className="my-10 border-t border-border" />,
  // Inline `code` (rehype-pretty-code wraps block-level <pre> separately so
  // these styles only apply to inline.)
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      {...props}
      className="rounded border border-border bg-bg-sunken px-1.5 py-0.5 font-mono text-[0.875em] text-fg"
    />
  ),
  // Block code — rehype-pretty-code emits `<pre data-language="..." data-theme="...">`.
  // The styles in globals.css target those data attrs.
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      {...props}
      className="overflow-x-auto rounded-md border border-border bg-bg-code p-5 font-mono text-[13.5px] leading-[1.75] text-fg"
    />
  ),
  // Images: keep alt text required at the type level (MDXComponents allows
  // any HTML attrs; we just style + lazy-load).
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      {...props}
      loading="lazy"
      decoding="async"
      className="my-6 w-full rounded-md border border-border"
    />
  ),
};
