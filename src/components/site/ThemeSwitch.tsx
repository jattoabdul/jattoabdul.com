'use client';

import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

const CHOICES = [
  { value: 'light', label: 'Light theme', Icon: Sun },
  { value: 'system', label: 'Follow the system theme', Icon: Monitor },
  { value: 'dark', label: 'Dark theme', Icon: Moon },
] as const;

/** Three-state icon switch: sun, monitor, moon. Owner ruling 2026-09-04. */
export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? (theme ?? 'light') : 'light';

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn('inline-flex gap-0.5 rounded-lg p-[3px]', className)}
    >
      {CHOICES.map(({ value, label, Icon }) => {
        const pressed = current === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={pressed}
            onClick={() => setTheme(value)}
            className={cn(
              'grid h-8 w-[34px] cursor-pointer place-items-center rounded-md text-[var(--ink,var(--fg))] opacity-60 transition-[opacity,background] duration-200 hover:bg-[var(--hoverwash)] hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]',
              pressed && 'bg-[var(--hoverwash)] opacity-100'
            )}
          >
            <Icon className="size-[17px]" strokeWidth={1.6} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
