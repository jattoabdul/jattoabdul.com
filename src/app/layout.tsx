import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import localFont from 'next/font/local';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Cursor } from '@/components/ui/Cursor';

import '@/styles/globals.css';

// Fonts made by <a href="http://www.webfontfree.com" target="_blank">Web Free Fonts</a> is licensed by <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">CC 4.0 BY</a>
const avantGarde = localFont({
  src: [
    {
      path: '../../public/fonts/avant-garde/AvantGardeBook.woff2',
      style: 'regular',
    },
  ],
  variable: '--font-avant-garde',
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jatto Abdul | Building Digital Experiences',
  description:
    'Fullstack Engineer building digital experiences and simplifying complex systems since 2017. Specializing in Ruby, Go, and JavaScript.',
  keywords: [
    'Jatto Abdul',
    'Software Engineer',
    'Full Stack Developer',
    'Web Developer',
    'Ruby Developer',
    'JavaScript Developer',
    'Go Developer',
  ],
  authors: [{ name: 'Jatto Abdul', url: 'https://jattoabdul.com' }],
  creator: 'Jatto Abdul',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jattoabdul.com',
    title: 'Jatto Abdul | Building Digital Experiences',
    description:
      'Fullstack Engineer building digital experiences and simplifying complex systems since 2017. Specializing in Ruby, Go, and JavaScript.',
    siteName: 'Jatto Abdul',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jatto Abdul | Building Digital Experiences',
    description:
      'Fullstack Engineer building digital experiences and simplifying complex systems since 2017. Specializing in Ruby, Go, and JavaScript.',
    creator: '@jatto_abdul',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${avantGarde.variable} ${nunitoSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-avant-garde antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="relative flex min-h-screen flex-col">
            <Cursor />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
