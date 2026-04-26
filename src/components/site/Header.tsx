'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { primaryNav } from '@/data/site';
import { cn } from '@/lib/utils';
import { CommandMenuTrigger } from './CommandMenu';
import { ThemeToggle } from './ThemeToggle';
import { Wordmark } from './Wordmark';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-nav items-center justify-between px-5 sm:px-6 lg:px-8">
        <Wordmark />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-[13.5px] font-medium transition-colors',
                  active
                    ? 'text-accent'
                    : 'text-fg-2 hover:bg-bg-raised hover:text-fg',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span aria-hidden className="mx-2 h-4 w-px bg-border" />
          <CommandMenuTrigger />
          <ThemeToggle className="ml-1" />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <CommandMenuTrigger variant="icon" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-md text-fg hover:bg-bg-raised"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg px-5 pb-4 pt-2 md:hidden">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block border-b border-border py-3 text-[15px] font-medium',
                  active ? 'text-accent' : 'text-fg',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
