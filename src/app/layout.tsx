import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { getCommandMenuPosts } from '@/data/posts';
import { siteConfig } from '@/data/site';
import '@/styles/globals.css';

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const fullTitle = `${siteConfig.name} — ${siteConfig.titleSuffix}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: fullTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Jatto Abdul',
    'Senior Software Engineer',
    'Backend Engineer',
    'Platform Engineer',
    'Applied AI',
    'Engineering writing',
    'Engineering blog',
    'Practical engineering',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: fullTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: fullTitle,
    description: siteConfig.description,
    creator: '@Jattorize',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Server-fetch the writing list for the command menu so the client
  // component doesn't need filesystem access. Cheap (4 small MDX reads),
  // cached by Next for static routes.
  const commandMenuPosts = await getCommandMenuPosts();

  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Header commandMenuPosts={commandMenuPosts} />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
