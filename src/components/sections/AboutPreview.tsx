import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { SectionLabel } from '@/components/site/SectionHeader';

export function AboutPreview() {
  return (
    <section className="border-b border-border py-16">
      <Container width="text">
        <div className="grid items-start gap-8 md:grid-cols-[180px_1fr] md:gap-12">
          <SectionLabel>About / Operating style</SectionLabel>
          <div>
            <p className="mb-4 font-serif text-[22px] font-normal leading-[1.45] tracking-tight text-fg [text-wrap:balance]">
              I&apos;m Jatto Abdul, a senior software engineer building backend, platform, product,
              and applied-AI systems.
            </p>
            <p className="mb-3.5 text-[15.5px] leading-[1.75] text-fg-2">
              My work sits in the messy middle where product ideas become real software: APIs,
              data flows, search and reporting workflows, integrations, caching, deployment, and
              the judgment calls that keep systems understandable as they grow.
            </p>
            <p className="mb-5 text-[15.5px] leading-[1.75] text-fg-2">
              I think in systems: boundaries, contracts, observability, blast radius, and the
              people who have to operate the thing after it ships. I write because thinking in
              public makes me better.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-colors hover:text-accent-h"
            >
              More about how I work <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
