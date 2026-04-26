'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { siteConfig } from '@/data/site';

export type HeroVariant = 'terminal' | 'editorial';

const VARIANTS: HeroVariant[] = ['terminal', 'editorial'];
const STORAGE_KEY = 'hero';

const ENV_DEFAULT: HeroVariant =
  ((process.env.NEXT_PUBLIC_HERO_VARIANT as HeroVariant | undefined) ?? 'terminal') ===
  'editorial'
    ? 'editorial'
    : 'terminal';

/**
 * Five terminal-hero copy variants from the original prototype. The hero
 * cycles through them on an interval and picks a random starting variant on
 * mount, so each refresh shows a fresh one.
 *
 * Tweak rhythm: 8 seconds per variant. Disable rotation respects
 * `prefers-reduced-motion: reduce` and shows whatever was picked at mount.
 *
 * To pin one for testing:
 *   localStorage.setItem('terminalCopy', 'workshop'); location.reload();
 *   localStorage.removeItem('terminalCopy'); location.reload();
 *
 * Or via query string: /?terminal=field
 */
type TerminalCopyKey = 'blueprint' | 'workshop' | 'field' | 'staff' | 'build';

type TerminalCopy = {
  key: TerminalCopyKey;
  headline: [string, string]; // first half (regular) + second half (italic)
  sub: string;
};

const TERMINAL_COPIES: TerminalCopy[] = [
  {
    key: 'blueprint',
    headline: ['A systems blueprint,', 'in long form.'],
    sub: 'Practical engineering essays, field notes, and the projects behind them. Pick a thread.',
  },
  {
    key: 'workshop',
    headline: ['A working engineer’s', 'public workshop.'],
    sub: 'Backend, platform, and applied-AI builds — written down so the lessons survive the work.',
  },
  {
    key: 'field',
    headline: ['Field notes from', 'real software.'],
    sub: 'Senior engineering, told plainly: what I tried, what broke, what worked, and what I’d do differently.',
  },
  {
    key: 'staff',
    headline: ['Engineering thought,', 'written clearly.'],
    sub: 'Backend, platform, and applied-AI systems — plus the communication that holds them together.',
  },
  {
    key: 'build',
    headline: ['Build, write,', 'review, repeat.'],
    sub: 'I ship backend and platform systems, then write the parts that were actually hard.',
  },
];

const TERMINAL_ROTATION_MS = 8000;
const TERMINAL_STORAGE_KEY = 'terminalCopy';

function findTerminalCopy(key: string | null | undefined): TerminalCopy | null {
  if (!key) return null;
  return TERMINAL_COPIES.find((c) => c.key === key) ?? null;
}

type HeroProps = {
  variant?: HeroVariant;
};

/**
 * Override priority: explicit `variant` prop > `?hero=` query > localStorage `hero` > env default.
 *
 * From the browser console:
 *   localStorage.setItem('hero', 'editorial'); location.reload();
 *   localStorage.removeItem('hero'); location.reload();
 */
export function Hero({ variant }: HeroProps) {
  const [resolved, setResolved] = useState<HeroVariant>(variant ?? ENV_DEFAULT);

  useEffect(() => {
    if (variant) return;
    const queryVariant = readVariant(
      new URLSearchParams(window.location.search).get('hero'),
    );
    if (queryVariant) {
      setResolved(queryVariant);
      try {
        localStorage.setItem(STORAGE_KEY, queryVariant);
      } catch {
        // ignore — private mode / disabled storage
      }
      return;
    }
    try {
      const stored = readVariant(localStorage.getItem(STORAGE_KEY));
      if (stored) setResolved(stored);
    } catch {
      // ignore
    }
  }, [variant]);

  return resolved === 'editorial' ? <HeroEditorial /> : <HeroTerminal />;
}

function readVariant(value: string | null | undefined): HeroVariant | null {
  if (!value) return null;
  return (VARIANTS as string[]).includes(value) ? (value as HeroVariant) : null;
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
      {siteConfig.resumeUrl && (
        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border-mid px-5 py-2.5 text-[14px] font-medium text-fg-2 transition-colors hover:bg-bg-raised hover:text-fg"
        >
          Resume <ArrowUpRight className="size-3.5" />
        </a>
      )}
      <Link
        href="/contact"
        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[14px] font-medium text-fg-3 transition-colors hover:text-fg"
      >
        Contact <ArrowUpRight className="size-3.5" />
      </Link>
    </div>
  );
}

function HeroTerminal() {
  // SSR + first paint always show index 0 (blueprint) — no flash of empty.
  // Mount-time effect picks a random starting variant + starts rotation.
  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    // Override priority: ?terminal=<key> (URL) > localStorage > random rotation.
    let initial = -1;
    let pin = false;
    try {
      const queryKey = new URLSearchParams(window.location.search).get('terminal');
      const queryMatch = findTerminalCopy(queryKey);
      if (queryMatch) {
        initial = TERMINAL_COPIES.indexOf(queryMatch);
        pin = true;
        try {
          localStorage.setItem(TERMINAL_STORAGE_KEY, queryMatch.key);
        } catch {
          /* storage disabled */
        }
      } else {
        const storedKey = localStorage.getItem(TERMINAL_STORAGE_KEY);
        const storedMatch = findTerminalCopy(storedKey);
        if (storedMatch) {
          initial = TERMINAL_COPIES.indexOf(storedMatch);
          pin = true;
        }
      }
    } catch {
      /* storage disabled */
    }

    if (initial < 0) initial = Math.floor(Math.random() * TERMINAL_COPIES.length);
    setIndex(initial);
    setPinned(pin);
  }, []);

  useEffect(() => {
    if (pinned) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TERMINAL_COPIES.length);
    }, TERMINAL_ROTATION_MS);
    return () => window.clearInterval(id);
  }, [pinned]);

  const copy = TERMINAL_COPIES[index];

  return (
    <section className="border-b border-border py-16 md:py-20">
      <Container width="hero">
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

        {/*
          aria-live="polite" tells screen readers the headline can change so
          they can announce it without interrupting other speech.
          The fade key reuses the variant key so React swaps the node
          cleanly and CSS animates the new copy in.
        */}
        <div aria-live="polite" aria-atomic="true">
          <h1
            key={`${copy.key}-h`}
            className="mb-4 animate-fade-in font-serif text-[clamp(2rem,4.6vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg [text-wrap:balance]"
          >
            {copy.headline[0]}{' '}
            <span className="italic text-fg-2">{copy.headline[1]}</span>
          </h1>
          <p
            key={`${copy.key}-p`}
            className="mb-8 max-w-[54ch] animate-fade-in text-[16.5px] leading-[1.75] text-fg-2"
          >
            {copy.sub}
          </p>
        </div>

        <HeroActions />
      </Container>
    </section>
  );
}

function HeroEditorial() {
  return (
    <section className="border-b border-border py-20 md:py-24">
      <Container width="hero">
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
