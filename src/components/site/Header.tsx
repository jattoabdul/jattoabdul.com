'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { rooms } from '@/data/site';
import { useDoorStore } from '@/lib/door-store';
import { usePrototypeStore } from '@/lib/prototype-store';
import { cn } from '@/lib/utils';
import { Door } from './Door';
import { DoorRoom } from './DoorRoom';
import { ThemeSwitch } from './ThemeSwitch';
import { Wordmark } from './Wordmark';

const HEADER_PX = 72;

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Header, locked 2026-09-05: wordmark left, rooms centred, theme switch and the door right.
 * Over the dark arrival it reads the dark-surface tokens; once scrolled it takes a blurred
 * ground; past the hero it returns to the page's own tokens.
 */
export function Header() {
  const pathname = usePathname() ?? '/';
  const isHome = pathname === '/';
  const treatment = usePrototypeStore(s => s.treatment);
  const openDoor = useDoorStore(s => s.open);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const top = document.getElementById('top-sentinel');
    if (top) {
      const o = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
      o.observe(top);
      observers.push(o);
    }
    const heroEnd = document.querySelector('[data-hero-end]');
    if (heroEnd) {
      const o = new IntersectionObserver(
        ([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < HEADER_PX),
        { rootMargin: `-${HEADER_PX}px 0px 0px 0px` }
      );
      o.observe(heroEnd);
      observers.push(o);
    } else {
      setPastHero(true);
    }
    return () => observers.forEach(o => o.disconnect());
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const onDark = isHome && treatment === 'dark' && !pastHero && !menuOpen;

  return (
    <>
      <header
        id="site-header"
        className={cn(
          'sticky top-0 z-30 transition-[background] duration-300',
          onDark && 'on-dark',
          scrolled && !menuOpen && 'header-scrolled',
          menuOpen && 'bg-bg'
        )}
      >
        <div className="mx-auto grid h-[72px] max-w-site grid-cols-[1fr_auto] items-center gap-4 px-6 md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:px-11">
          <Wordmark />

          <nav className="hidden justify-self-center gap-1.5 md:flex" aria-label="Rooms">
            {rooms.map(room => (
              <Link
                key={room.href}
                href={room.href}
                aria-current={isActive(pathname, room.href) ? 'page' : undefined}
                className="rounded-full px-3.5 py-2 text-[16px] font-medium text-[var(--ink,var(--fg))] no-underline opacity-80 transition-[opacity,background] duration-200 hover:bg-[var(--hoverwash)] hover:opacity-100 aria-[current=page]:opacity-100"
              >
                {room.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <ThemeSwitch className="hidden md:inline-flex" />
            <Door />
            <button
              ref={menuBtnRef}
              type="button"
              className="cursor-pointer rounded-full bg-[var(--hoverwash)] px-3.5 py-2 text-[14px] font-semibold text-[var(--ink,var(--fg))] md:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      <nav
        id="site-menu"
        aria-label="Rooms"
        hidden={!menuOpen}
        className={cn(
          'fixed inset-x-0 bottom-0 top-[72px] z-[25] flex-col gap-1 overflow-auto bg-bg px-6 pb-10 pt-5 text-fg md:!hidden',
          menuOpen ? 'flex' : 'hidden'
        )}
      >
        {rooms.map(room => (
          <Link
            key={room.href}
            href={room.href}
            className="py-3 font-serif text-[34px] leading-[1.2] text-fg no-underline hover:text-accent"
          >
            {room.label}
          </Link>
        ))}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
          <button
            type="button"
            className="cursor-pointer py-2.5 text-[16px] font-semibold text-accent"
            onClick={() => {
              setMenuOpen(false);
              openDoor();
            }}
          >
            Contact, come on in
          </button>
          <ThemeSwitch className="bg-[var(--hoverwash)]" />
        </div>
      </nav>

      <DoorRoom />
    </>
  );
}
