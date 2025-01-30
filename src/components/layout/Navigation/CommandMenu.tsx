import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command';
import { Icon } from '@/components/ui/Icons';

const navItems = [
  { label: 'About', href: '/about', icon: 'User' },
  { label: 'Work', href: '/work', icon: 'BriefcaseBusiness' },
  { label: 'Contents', href: '/contents', icon: 'Play' },
  { label: 'Contact', href: '/contact', icon: 'Contact' },
] as const;

const socialItems = [
  { label: 'Email', href: 'mailto:jattoabdul@gmail.com', icon: 'Mail' },
  { label: 'GitHub', href: 'https://github.com/jattoabdul', icon: 'SiGithub' },
  { label: 'YouTube', href: 'https://youtube.com/jattoabdul', icon: 'Play' },
  { label: 'Instagram', href: 'https://instagram.com/jattoabdul', icon: 'SiInstagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jattoabdul', icon: 'Linkedin' },
  { label: 'X (Twitter)', href: 'https://x.com/jatto_abdul', icon: 'SiX' },
] as const;

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map(({ label, href, icon }) => (
            <CommandItem
              key={href}
              onSelect={() => runCommand(() => router.push(href))}
            >
              <Icon name={icon} className="mr-2 size-4" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Social">
          {socialItems.map(({ label, href, icon }) => (
            <CommandItem
              key={href}
              onSelect={() =>
                runCommand(() => window.open(href, '_blank', 'noopener,noreferrer'))
              }
            >
              <Icon name={icon} className="mr-2 size-4" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
