import Link from 'next/link';

import { Icon, IconProps } from '@components/ui/Icons';

const sideNavItems = [
  { icon: 'User', href: '/about' },
  { icon: 'BriefcaseBusiness', href: '/work' },
  { icon: 'Play', href: '/contents' },
  { icon: 'Contact', href: '/contact' },
];

export function SideNav() {
  return (
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
  );
}
