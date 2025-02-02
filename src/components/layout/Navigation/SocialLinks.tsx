'use client';

import Link from 'next/link';
import { Icon, IconProps } from '@components/ui/Icons';
import { MagneticContainer } from '@/components/ui/MagneticContainer';

const socialLinks = [
  { icon: 'Mail', href: 'mailto:jattoabdul@gmail.com' },
  { icon: 'SiGithub', href: 'https://github.com/jattoabdul' },
  { icon: 'Play', href: 'https://www.youtube.com/@jatto_abdul' },
  { icon: 'SiInstagram', href: 'https://instagram.com/jatto_abdul' },
  { icon: 'Linkedin', href: 'https://www.linkedin.com/in/jattoade/' },
  { icon: 'SiX', href: 'https://x.com/Jattorize' },
];

export function SocialLinks() {
  return (
    <nav className="fixed right-8 bottom-8 -translate-y-8 flex flex-col gap-6 z-50">
      {socialLinks.map(({ icon, href }) => (
        <MagneticContainer key={href} padding={40} magneticStrength={3} variant="social">
          <Link
            href={href}
            className="text-muted-foreground hover:text-foreground transition-colors"
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <Icon name={icon as IconProps['name']} className="size-5" />
            <span className="sr-only">{icon.replace('Si', '')}</span>
          </Link>
        </MagneticContainer>
      ))}
    </nav>
  );
}
