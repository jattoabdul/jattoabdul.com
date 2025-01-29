import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import localFont from 'next/font/local';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${avantGarde.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
