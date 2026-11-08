'use client';
import {CopyEmail} from './CopyEmail';

// Verified main-brand surfaces plus the sibling channel (Command Center brand/public-surfaces.md).
const channels=[
  ['YouTube','https://www.youtube.com/@jatto_abdul'],
  ['LinkedIn','https://www.linkedin.com/in/jattoade/'],
  ['Instagram','https://www.instagram.com/jatto_abdul/'],
  ['X','https://x.com/Jattorize'],
  ['Threads','https://www.threads.com/@jatto_abdul'],
  ['TikTok','https://www.tiktok.com/@jatto_abdul'],
  ['Facebook','https://www.facebook.com/jattoabdulq'],
  ['GitHub','https://github.com/jattoabdul'],
  ['Medium','https://medium.com/@jattoabdul'],
];

export function ContactPage(){return <article className="p-press-page"><div className="p-press-arrival"><div><h1>My door<br/>is open.</h1><p className="p-press-lead">Whether it’s faith, career, building, or a question you’ve been sitting on, write to me. I’ll reply myself.</p><a className="p-button" href="mailto:me@jattoabdul.com">Say hello <span aria-hidden="true">↗</span></a><CopyEmail/></div><img src="/assets/personal/jatto-portrait.webp" alt="Jatto Abdul" width="800" height="800"/></div><section><h2>A little more of my world.</h2><div className="p-press-profiles">{channels.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div><p className="p-contact-sibling">Learning a language in public: <a href="https://www.youtube.com/@LearnArabicWithJattoAbdul">Learn Arabic With Jatto Abdul <span aria-hidden="true">↗</span></a></p><a className="p-text-link" href="/press">Press kit and brand guide <span aria-hidden="true">↗</span></a></section></article>}
