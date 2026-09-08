'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { door, socials } from '@/data/site';
import { useDoorStore } from '@/lib/door-store';
import { usePrototypeStore } from '@/lib/prototype-store';

const SWING_MS = 1350; // the door swings, the figure waves, then the room grows
const CLOSE_MS = 900;

/**
 * The room behind the door. A modal dialog that grows from the doorway, traps focus,
 * closes on Escape or "Close the door", and returns focus to the door. Reduced motion
 * reveals it instantly. /contact carries the same content without JavaScript.
 */
export function DoorRoom() {
  const isOpen = useDoorStore(s => s.isOpen);
  const close = useDoorStore(s => s.close);
  const anchor = useDoorStore(s => s.anchor);
  const door2 = usePrototypeStore(s => s.door2);
  const roomRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = useState(false); // in the DOM
  const [revealed, setRevealed] = useState(false); // grown open

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const room = roomRef.current;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isOpen && room) {
      const rect = anchor?.getBoundingClientRect() ?? {
        left: window.innerWidth - 80,
        top: 36,
        width: 40,
        height: 40,
      };
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const radius =
        Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) *
          1.06 +
        48;
      room.style.setProperty('--cx', `${cx}px`);
      room.style.setProperty('--cy', `${cy}px`);
      room.style.setProperty('--r', `${radius}px`);
      setMounted(true);
      timer = setTimeout(
        () => {
          setRevealed(true);
          setInert(true);
          primaryRef.current?.focus();
        },
        reduced ? 0 : SWING_MS
      );
    } else if (!isOpen && mounted) {
      setRevealed(false);
      setInert(false);
      timer = setTimeout(() => setMounted(false), reduced ? 0 : CLOSE_MS);
      anchor?.focus();
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key === 'Tab' && revealed && roomRef.current) {
        const f = roomRef.current.querySelectorAll<HTMLElement>('a[href],button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, revealed, close]);

  const second = door2 === 'instagram' ? door.secondInstagram : door.secondYouTube;

  return (
    <div
      ref={roomRef}
      id="door-room"
      role="dialog"
      aria-modal="true"
      aria-labelledby="door-room-title"
      className="door-room"
      data-open={revealed}
      hidden={!mounted}
    >
      <div className="door-room-inner">
        <Image
          src="/images/portrait-interim.png"
          alt="Jatto Abdul in a maroon sweater, looking at the camera."
          width={300}
          height={300}
          className="door-room-portrait"
          priority={false}
        />
        <h2
          id="door-room-title"
          className="font-serif text-[clamp(40px,6vw,72px)] font-normal leading-[1.08] tracking-tight"
        >
          Come on in,
          <br />
          <em>I&apos;m Jatto.</em>
        </h2>
        <p className="mx-auto mb-[38px] mt-[26px] max-w-[46ch] text-[18px] leading-[1.65]">
          {door.body}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a ref={primaryRef} className="door-room-primary" href={socials.email.href}>
            {socials.email.handle}
          </a>
          <a
            className="door-room-secondary"
            href={second.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {second.label}
          </a>
        </div>
        <div className="mt-[26px] flex flex-wrap justify-center gap-[22px] text-[15px] font-medium">
          {door2 === 'instagram' ? (
            <a href={socials.youtube.href} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          ) : (
            <a href={socials.instagram.href} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          <a href={socials.x.href} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a href={socials.linkedin.href} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={socials.tiktok.href} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
        </div>
        <p className="mt-10 font-serif text-[17px] italic opacity-75">Ma&rsquo;a salaam.</p>
        <button type="button" className="door-room-close" onClick={close}>
          Close the door
        </button>
      </div>
    </div>
  );
}

function setInert(on: boolean) {
  for (const id of ['site-header', 'main-content', 'prototype-controls']) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (on) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.removeAttribute('inert');
      el.removeAttribute('aria-hidden');
    }
  }
}
