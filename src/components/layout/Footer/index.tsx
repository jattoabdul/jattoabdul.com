import Link from 'next/link';

import { SocialLinks } from '@components/layout/Navigation/SocialLinks';

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
      <SocialLinks />
    </footer>
  );
}
