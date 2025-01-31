'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@components/ui/Button';
import { Icon } from '@components/ui/Icons';
import { SideNav } from '@components/layout/Navigation/SideNav';
import { CommandMenu } from '@components/layout/Navigation/CommandMenu';
import { cn } from '@/lib/utils';

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isCommandHovered, setIsCommandHovered] = useState(false);

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-50 bg-background/0 px-4 md:px-6">
        {/* Left Side Navigation Menu */}
        <SideNav />

        {/* Header Content */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative flex items-center gap-2 p-2"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/JAlogoOption1.svg"
                alt="JA Logo"
                width={72}
                height={72}
                className={cn('transition-all duration-300', isLogoHovered ? 'invert' : '')}
              />
            </div>
            {/* Hover Effect Circle */}
            <div
              className={cn(
                'absolute inset-0 -z-0 rounded-full bg-cinnabar transition-all duration-300',
                isLogoHovered ? 'scale-[2] opacity-100' : 'scale-0 opacity-0'
              )}
            />
          </Link>

          {/* App Command Icon (Command+K Keybinding) */}
          <div
            className="relative"
            onMouseEnter={() => setIsCommandHovered(true)}
            onMouseLeave={() => setIsCommandHovered(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'relative z-10 md:inline-flex [&_svg]:size-8 transition-all duration-300',
                isCommandHovered ? 'text-smoky-primary' : ''
              )}
              onClick={() => setOpenMenu(true)}
            >
              <Icon name="Command" size="32" />
              <span className="sr-only">Command Menu</span>
            </Button>
            {/* Hover Effect Circle */}
            <div
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 rounded-full bg-cinnabar transition-all duration-300',
                isCommandHovered ? 'w-20 h-20 opacity-100' : 'w-0 h-0 opacity-0'
              )}
            />
          </div>
        </div>
      </header>
      <CommandMenu open={openMenu} onOpenChangeAction={setOpenMenu} />
    </>
  );
}
