import Link from 'next/link';
import { Button } from '@components/ui/Button';
import { Icon, IconProps } from '@components/ui/Icons';

// To be used with the command k keybinding for the app command icon in the header.
// const navItems = [
//   { label: 'About', href: '/about' },
//   { label: 'Work', href: '/work' },
//   { label: 'Contents', href: '/contents' },
//   { label: 'Contact', href: '/contact' },
// ];

const sideNavItems = [
  { icon: 'User', href: '/about' },
  { icon: 'BriefcaseBusiness', href: '/work' },
  { icon: 'Play', href: '/contents' },
  { icon: 'Contact', href: '/contact' },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/0 px-4 md:px-6">
      {/* Left Side Navigation Menu */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
        {sideNavItems.map(({ icon, href }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={icon as IconProps['name']} className="size-6" />
            <span className="sr-only">{icon}</span>
          </Link>
        ))}
      </nav>

      {/* Header Content */}
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-lg">JAT</span>
        </Link>

        {/* App Command Icon (Command+K Keybinding) That Handles Main Navigation Menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:inline-flex">
            <Icon name="Command" size="32" />
          </Button>
        </div>
      </div>
    </header>
  );
}
