import type { Metadata } from 'next';
import '@/styles/globals.css';

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
    <html lang="en" className={`dark`}>
      <body>{children}</body>
    </html>
  );
}
