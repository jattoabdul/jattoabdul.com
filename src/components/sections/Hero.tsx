import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/site/Container';

export type HeroVariant = 'terminal' | 'editorial';

const TERMINAL_HEADLINE = ['A working engineer’s', 'public workshop.'];
const TERMINAL_SUB =
  'Backend, platform, and applied-AI builds — written down so the lessons survive the work.';

type HeroProps = {
  variant?: HeroVariant;
};

export function Hero({ variant }: HeroProps) {
  const envDefault =
    (process.env.NEXT_PUBLIC_HERO_VARIANT as HeroVariant | undefined) ?? 'terminal';
  const resolved: HeroVariant = variant ?? envDefault;

  return resolved === 'editorial' ? <HeroEditorial /> : <HeroTerminal />;
}

function HeroActions() {
  return (
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
  );
}

function HeroTerminal() {
  return (
    <section className="border-b border-border py-16 md:py-20">
      <Container width="text">
        <div className="mb-9 overflow-hidden rounded-md border border-border bg-bg-code">
          <div
            className="flex items-center gap-1.5 border-b border-border px-3.5 py-2"
            style={{ background: 'color-mix(in srgb, var(--bg-code) 60%, var(--border))' }}
          >
            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2.5 font-mono text-[11.5px] text-fg-3">
              ~/jattoabdul.com — whoami
            </span>
          </div>
          <div className="px-5 py-5 font-mono text-[13.5px] leading-[1.75]">
            <div>
              <span className="text-accent">jatto</span>
              <span className="text-fg-3">@laptop</span>{' '}
              <span className="text-fg-3">~ %</span> whoami
            </div>
            <div className="mb-2.5 text-fg">jatto-abdul · senior software engineer</div>
            <div>
              <span className="text-accent">jatto</span>
              <span className="text-fg-3">@laptop</span>{' '}
              <span className="text-fg-3">~ %</span> cat focus.txt
            </div>
            <div className="mb-2.5 text-fg">
              backend · platform · applied-ai · product · communication
            </div>
            <div>
              <span className="text-accent">jatto</span>
              <span className="text-fg-3">@laptop</span>{' '}
              <span className="text-fg-3">~ %</span> ls public/
            </div>
            <div className="text-fg-2">
              writing/ &nbsp;notes/ &nbsp;projects/ &nbsp;videos/ &nbsp;about/ &nbsp;contact/
            </div>
          </div>
        </div>

        <h1 className="mb-4 font-serif text-[clamp(2rem,4.6vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg [text-wrap:balance]">
          {TERMINAL_HEADLINE[0]}{' '}
          <span className="italic text-fg-2">{TERMINAL_HEADLINE[1]}</span>
        </h1>
        <p className="mb-8 max-w-[54ch] text-[16.5px] leading-[1.75] text-fg-2">
          {TERMINAL_SUB}
        </p>

        <HeroActions />
      </Container>
    </section>
  );
}

function HeroEditorial() {
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

        <HeroActions />
      </Container>
    </section>
  );
}
