import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/site/Container';

export function Hero() {
  return (
    <section className="border-b border-border py-20 md:py-24">
      <Container width="text">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent-mid bg-accent-light px-3 py-1 pl-2.5">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.06em] text-accent">
            Senior Software Engineer · open to staff roles
          </span>
        </div>

        <h1 className="mb-5 font-serif text-[clamp(2.4rem,5.4vw,3.5rem)] font-normal leading-[1.06] tracking-[-0.028em] text-fg [text-wrap:balance]">
          Building backend, platform,
          <br />
          <span className="italic text-fg-2">and applied&#8209;AI systems.</span>
        </h1>

        <p className="mb-9 max-w-[54ch] text-[17.5px] leading-[1.75] text-fg-2">
          I&apos;m Jatto. I write about practical engineering, AI-assisted product building, and
          communication for engineers — notes from real builds, not tutorials.
        </p>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-accent px-5 py-2.5 text-[14px] font-semibold text-fg-on-accent transition-colors hover:bg-accent-h"
          >
            Read writing <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 rounded-md border border-border-mid px-5 py-2.5 text-[14px] font-medium text-fg-2 transition-colors hover:bg-bg-raised hover:text-fg"
          >
            Watch videos
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-md border border-border-mid px-5 py-2.5 text-[14px] font-medium text-fg-2 transition-colors hover:bg-bg-raised hover:text-fg"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[14px] font-medium text-fg-3 transition-colors hover:text-fg"
          >
            Resume / contact <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
