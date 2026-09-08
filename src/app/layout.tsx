import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { siteConfig } from '@/data/site';
import '@/styles/globals.css';

const serif = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
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

const fullTitle = `${siteConfig.name} · ${siteConfig.titleSuffix}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: fullTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // The label lives here for search (positioning.md, search visibility), never in the first sentence.
  keywords: [
    'Jatto Abdul',
    'Engineer',
    'Entrepreneur',
    'Mentor',
    'Author',
    'Muslim mentor',
    'Muslim engineer',
    'Muslim entrepreneur',
    'Muslim author',
    'Grow without losing yourself',
    'faith and ambition',
    'career and character',
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
          <div id="top-sentinel" aria-hidden="true" className="absolute left-0 top-0 h-px w-px" />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
