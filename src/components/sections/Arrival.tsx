'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';

import { arrival } from '@/data/site';
import { useDoorStore } from '@/lib/door-store';
import { usePrototypeStore } from '@/lib/prototype-store';
import { cn } from '@/lib/utils';

/**
 * The arrival (website.md, v2.0). Two treatments while the owner decides:
 * dark, full bleed on navy deep with the portrait large on one side, feathered into the page;
 * light, the same copy with the portrait on a lamp-tint disc. The photo slot behind the
 * dark hero carries a light study until the shoot.
 */
export function Arrival() {
  const treatment = usePrototypeStore(s => s.treatment);
  const side = usePrototypeStore(s => s.side);
  const photo = usePrototypeStore(s => s.photo);
  const openDoor = useDoorStore(s => s.open);
  const dark = treatment === 'dark';

  return (
    <section
      className={cn('hero', dark && 'on-dark')}
      data-treatment={treatment}
      data-side={side}
      data-photo={photo}
      aria-labelledby="hero-title"
    >
      {dark && (
        <>
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-scrim" aria-hidden="true" />
        </>
      )}
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="identity text-[15px] font-semibold tracking-[0.05em] text-[var(--accent)]">
            <span className="sr-only">{arrival.identityPlain}</span>
            <span aria-hidden="true">{arrival.identity}</span>
          </p>
          <h1
            id="hero-title"
            className="mt-[22px] font-serif text-[clamp(44px,5.2vw,76px)] font-normal leading-[1.04] tracking-tight [text-wrap:pretty]"
          >
            {arrival.headlineLead}
            <br className="hidden md:inline" /> <em>{arrival.headlineEmphasis}</em>
          </h1>
          <p className="mt-[26px] max-w-[48ch] text-[clamp(17px,1.3vw,20px)] leading-[1.6] text-[var(--ink-2,var(--fg-2))]">
            {arrival.supporting}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href={arrival.startHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-[var(--accent)] text-[var(--on-accent,var(--fg-on-accent))] hover:bg-[var(--accent-h)]"
            >
              <Play className="size-3.5 fill-current" strokeWidth={0} aria-hidden />
              {arrival.startLabel}
            </a>
            <button
              type="button"
              onClick={openDoor}
              className="btn-pill border-[1.5px] border-[var(--ink,var(--fg))] bg-transparent text-[var(--ink,var(--fg))] hover:bg-[var(--hoverwash)]"
            >
              {arrival.comeInLabel}
            </button>
            <noscript>
              <a href="/contact" className="font-semibold text-[var(--accent)]">
                Contact
              </a>
            </noscript>
          </div>
        </div>
        <figure className="hero-portrait">
          <span className="hero-disc" aria-hidden="true" />
          <Image
            src="/images/portrait-interim.png"
            alt="Jatto Abdul in a maroon sweater, looking at the camera."
            width={800}
            height={800}
            priority
            sizes="(min-width: 900px) 44vw, 100vw"
          />
        </figure>
      </div>
      {dark && <div className="hero-fade" aria-hidden="true" />}
      <div data-hero-end aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
