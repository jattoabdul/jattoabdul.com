'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@components/ui/Button';
import { Icon } from '@components/ui/Icons';
import { SideNav } from '@components/layout/Navigation/SideNav';
import { CommandMenu } from '@components/layout/Navigation/CommandMenu';
import { MagneticContainer } from '@components/ui/MagneticContainer';

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-40 bg-background/0 px-4 md:px-6">
        {/* Left Side Navigation Menu */}
        <SideNav />

        {/* Header Content */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <MagneticContainer
            magneticStrength={4}
            padding={50}
            activeTransitionDuration={0.3}
            inactiveTransitionDuration={0.5}
            innerClassName="relative"
          >
            <Link
              href="/"
              className="group relative flex items-center gap-2 p-2"
              data-cursor-interactive
            >
              <div className="relative z-50">
                <Image
                  src="/images/JAlogoOption1.svg"
                  alt="JA Logo"
                  width={72}
                  height={72}
                  className="transition-all duration-300 group-hover:invert"
                />
              </div>
            </Link>
          </MagneticContainer>

          {/* App Command Icon (Command+K Keybinding) */}
          <MagneticContainer
            magneticStrength={4}
            padding={50}
            activeTransitionDuration={0.3}
            inactiveTransitionDuration={0.5}
            innerClassName="relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative z-50 md:inline-flex [&_svg]:size-8 group"
              onClick={() => setOpenMenu(true)}
              data-cursor-interactive
            >
              <Icon
                name="Command"
                size="32"
                className="transition-all duration-300 group-hover:invert"
              />
              <span className="sr-only">Command Menu</span>
            </Button>
          </MagneticContainer>
        </div>
      </header>

      {/* Command Menu */}
      <CommandMenu open={openMenu} onOpenChangeAction={setOpenMenu} />
    </>
  );
}
