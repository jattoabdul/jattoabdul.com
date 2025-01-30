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

export function SocialLinks() {
  return (
    <nav className="fixed right-8 bottom-8 -translate-y-1/2 flex flex-col gap-6 z-50">
      {socialLinks.map(({ icon, href }) => (
        <Link
          key={href}
          href={href}
          className="text-muted-foreground hover:text-foreground transition-colors"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <Icon name={icon as IconProps['name']} className="size-5" />
          <span className="sr-only">{icon.replace('Si', '')}</span>
        </Link>
      ))}
    </nav>
  );
}
