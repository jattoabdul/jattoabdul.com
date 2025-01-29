import Link from 'next/link';
import { Icon, IconProps } from '@components/ui/Icons';

const socialLinks = [
  { icon: 'Mail', href: 'mailto:jattoabdul@gmail.com' },
  { icon: 'SiGithub', href: 'https://github.com/jattoabdul' },
  { icon: 'Play', href: 'https://youtube.com/jattoabdul' },
  { icon: 'SiInstagram', href: 'https://instagram.com/jattoabdul' },
  { icon: 'Linkedin', href: 'https://linkedin.com/in/jattoabdul' },
  { icon: 'SiX', href: 'https://x.com/jatto_abdul' },
];

export function Footer() {
  return (
    <footer className="relative bg-background/0 px-4 md:px-6">
      {/* Main Footer Content */}
      <div className="flex flex-col items-center justify-center">
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
      </div>

      {/* Right Side Social Links */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
        {socialLinks.map(({ icon, href }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={icon as IconProps['name']} className="size-5" />
            <span className="sr-only">{icon}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
