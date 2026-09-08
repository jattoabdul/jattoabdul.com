import type {Metadata} from 'next';
import {SiteShell} from '@/cinematic/SiteShell';
import '@/cinematic/reference.css';
import '@/cinematic/reconstruction.css';
import '@/cinematic/personal.css';
import '@/cinematic/writing.css';
import '@/cinematic/next.css';
export const metadata:Metadata={metadataBase:new URL('https://jattoabdul.com'),robots:{index:process.env.SEO_INDEXABLE==='true',follow:process.env.SEO_INDEXABLE==='true'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><SiteShell>{children}</SiteShell><noscript><style>{`.loader-container,.p-canvas{display:none!important}.p-portrait{opacity:1!important}main,.p-header{visibility:visible!important;opacity:1!important}`}</style></noscript></body></html>}
