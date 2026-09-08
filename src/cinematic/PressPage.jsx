'use client';
export const pressBio = 'Jatto Abdul is an engineer and entrepreneur who builds software, shares ideas, and mentors young people navigating career, character, and faith. A Muslim mentor and lifelong learner, he writes, speaks, and makes videos to help people pursue their ambitions without leaving their foundations behind.';
export const hostIntro = 'Jatto Abdul is an engineer, entrepreneur, mentor, and author. He builds software and shares what he learns through writing, speaking, and mentoring, helping young people grow in career, character, and faith without losing themselves.';

export function PressPage(){
  return <article className="p-press-page">
    <div className="p-press-arrival">
      <div><h1>Press &amp; brand.</h1><p className="p-press-lead">Introducing me, inviting me to speak, or creating something together? Here’s a place to start.</p><a className="p-button" href="/downloads/jatto-abdul-press-kit-v2.3.pdf" download>Download press kit <span aria-hidden="true">↓</span></a><p className="p-download-detail">PDF · One page</p></div>
      <img src="/assets/personal/jatto-portrait.webp" alt="Jatto Abdul wearing a maroon top" width="800" height="800"/>
    </div>
    <section aria-labelledby="press-bio"><h2 id="press-bio">A short introduction.</h2><p>{pressBio}</p></section>
    <section aria-labelledby="press-host"><h2 id="press-host">For hosts and organizers.</h2><blockquote>{hostIntro}</blockquote><a className="p-text-link" href="mailto:me@jattoabdul.com">Ask for an event-specific bio <span aria-hidden="true">↗</span></a></section>
    <section aria-labelledby="press-topics"><h2 id="press-topics">Conversations I can contribute to.</h2><ul><li>Career, character, faith and ambition</li><li>Starting before you feel ready</li><li>Making engineering impact visible</li><li>Building products from real problems</li></ul><a className="p-text-link" href="https://youtu.be/pu-IHuL--hg">Watch: Why the Best Engineers Get Overlooked <span aria-hidden="true">↗</span></a></section>
    <section aria-labelledby="press-brand"><h2 id="press-brand">Working with my identity.</h2><p>The website brand guide covers colour, typography, imagery, copy and motion. Use it when designing or building something for Jatto Abdul.</p><a className="p-button p-button-secondary" href="/downloads/jatto-abdul-website-brand-guide-v2.3-external.pdf" download>Download website brand guide <span aria-hidden="true">↓</span></a><p className="p-download-detail">PDF · Eight pages · v2.3</p></section>
    <section aria-labelledby="press-contact"><h2 id="press-contact">Let’s make it personal.</h2><p>For interviews, talks, high-resolution photography or the right assets for your project, email me with a little context.</p><a className="p-button" href="mailto:me@jattoabdul.com">me@jattoabdul.com <span aria-hidden="true">↗</span></a><div className="p-press-profiles"><a href="https://www.linkedin.com/in/jattoade/">LinkedIn</a><a href="https://www.youtube.com/@jatto_abdul">YouTube</a><a href="https://www.instagram.com/jatto_abdul/">Instagram</a></div></section>
  </article>;
}
