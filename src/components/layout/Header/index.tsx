'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@components/ui/Button';
import { Icon } from '@components/ui/Icons';
import { SideNav } from '@components/layout/Navigation/SideNav';
import { CommandMenu } from '@components/layout/Navigation/CommandMenu';

export function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/0 px-4 md:px-6">
        {/* Left Side Navigation Menu */}
        <SideNav />

        {/* Header Content */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-lg">JAT</span>
          </Link>

          {/* App Command Icon (Command+K Keybinding) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:inline-flex"
            onClick={() => setOpenMenu(true)}
          >
            <Icon name="Command" size="32" />
            <span className="sr-only">Command Menu</span>
          </Button>
        </div>
      </header>
      <CommandMenu open={openMenu} onOpenChangeAction={setOpenMenu} />
    </>
  );
}
