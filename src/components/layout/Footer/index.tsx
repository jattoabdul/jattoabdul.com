import Link from 'next/link';
import { Icon, IconProps } from '@/components/ui/Icons';

const socialLinks = [
  { name: 'Github', iconName: 'SiGithub', href: 'https://github.com/jattoabdul' },
  { name: 'Twitter', iconName: 'SiX', href: 'https://twitter.com/jatto_abdul' },
  { name: 'LinkedIn', iconName: 'Linkedin', href: 'https://linkedin.com/in/jattoabdul' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
          {/* Copyright */}
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with ❤️ by{' '}
            <Link href="/" className="font-medium underline underline-offset-4">
              Jatto Abdul
            </Link>
            . The source code is available on{' '}
            <Link
              href="https://github.com/jattoabdul/jattoabdul.com"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map(({ name, iconName, href }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={iconName as IconProps['name']} className="size-4" />
                <span className="sr-only">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
