'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDoorStore } from '@/lib/door-store';
import { clamp, timeline } from './timeline';
import './prototype.css';

export function CinematicPrototype() {
  const rail = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const meter = useRef<HTMLInputElement>(null);
  const settings = useRef({ duration: 1.5, travel: 1, restart: 0 });
  const [duration, setDuration] = useState(1.5);
  const [travel, setTravel] = useState(1);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [still, setStill] = useState(false);
  const [failed, setFailed] = useState(false);
  const open = useDoorStore(s => s.open);
  const enabled = !reduced && !still;

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const jump = useCallback(
    (progress: number) => {
      if (!rail.current) return;
      if (!ready) {
        document
          .getElementById(
            progress < 0.3 ? 'still-arrival' : progress < 0.7 ? 'still-writing' : 'still-foundation'
          )
          ?.scrollIntoView();
        return;
      }
      const top = rail.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + progress * (rail.current.offsetHeight - window.innerHeight),
        behavior: 'instant',
      });
    },
    [ready]
  );

  useEffect(() => {
    if (!enabled || !canvas.current || !rail.current) {
      setReady(false);
      return;
    }
    let disposed = false;
    let cleanup: (() => void) | undefined;
    setFailed(false);
    import('./scene')
      .then(async ({ createScene }) => {
        const control = await createScene(canvas.current!, settings.current);
        if (disposed) {
          control.dispose();
          return;
        }
        let raf = 0;
        let previous = 0;
        let lastProgress = -1;
        const render = (time: number) => {
          if (disposed || !rail.current) return;
          const rect = rail.current.getBoundingClientRect();
          const p = clamp(-rect.top / Math.max(1, rail.current.offsetHeight - innerHeight));
          const visible = rect.bottom > 0 && rect.top < innerHeight && !document.hidden;
          if (visible && (p !== lastProgress || control.needsFrame(time))) {
            const state = timeline(p);
            const alphas = [state.arrival, state.writing, state.foundation];
            blocks.current.forEach((el, i) => {
              if (!el) return;
              el.style.opacity = String(alphas[i]);
              el.style.transform = `translateY(${(1 - alphas[i]) * 28}px)`;
              el.style.visibility = alphas[i] < 0.03 ? 'hidden' : 'visible';
              el.inert = alphas[i] < 0.5;
              el.setAttribute('aria-hidden', String(alphas[i] < 0.5));
            });
            if (meter.current) meter.current.value = String(Math.round(p * 100));
            control.render(p, time);
            lastProgress = p;
          }
          // Rendering stops at rest; this lightweight loop only reads scroll position.
          if (time - previous > 250 && stage.current) {
            stage.current.dataset.beat = p < 0.3 ? 'arrival' : p < 0.73 ? 'writing' : 'foundation';
            previous = time;
          }
          raf = requestAnimationFrame(render);
        };
        const resize = () => {
          control.resize();
          lastProgress = -1;
        };
        const lost = (e: Event) => {
          e.preventDefault();
          setFailed(true);
          setReady(false);
          setStill(true);
        };
        const element = canvas.current!;
        element.addEventListener('webglcontextlost', lost);
        window.addEventListener('resize', resize);
        resize();
        setReady(true);
        raf = requestAnimationFrame(render);
        cleanup = () => {
          cancelAnimationFrame(raf);
          element.removeEventListener('webglcontextlost', lost);
          window.removeEventListener('resize', resize);
          control.dispose();
        };
      })
      .catch(() => {
        if (!disposed) {
          setFailed(true);
          setReady(false);
          setStill(true);
        }
      });
    return () => {
      disposed = true;
      cleanup?.();
      setReady(false);
    };
  }, [enabled]);

  function replay() {
    settings.current.restart += 1;
    jump(0);
  }

  const copy = (index: number) =>
    index === 0 ? (
      <>
        <h1>
          Grow without
          <br />
          losing yourself.
        </h1>
        <p>
          An engineer and entrepreneur writing, speaking, and making videos for young people
          carrying ambition and faith at the same time.
        </p>
        <div className="cin-actions">
          <button className="cin-primary" onClick={open}>
            Come on in ↗
          </button>
          <button onClick={() => jump(0.5)}>Enter the Writing room ↓</button>
        </div>
        <p className="cin-identity">Engineer. Entrepreneur. Mentor. Author.</p>
      </>
    ) : index === 1 ? (
      <>
        <Link className="cin-room-label" href="/writing">
          Writing
        </Link>
        <h2>
          For the person
          <br />
          you’ll become.
        </h2>
        <blockquote>
          “The most important reader is the version of someone who picks up this code in nine months
          with no context and a deadline.”
        </blockquote>
        <Link className="cin-essay" href="/writing/audience-of-one">
          Why your best engineering writing is for an audience of one ↗
        </Link>
        <div className="cin-actions">
          <Link href="/writing">All writing ↗</Link>
          <button onClick={() => jump(0.95)}>See the connection ↓</button>
        </div>
      </>
    ) : (
      <>
        <h2>
          Room to grow.
          <br />
          Ground to stand on.
        </h2>
        <p>
          As my life grows, I want my faith, my character,
          <br className="cin-desktop-break" /> and the people I love to grow with it.
        </p>
        <nav className="cin-rooms" aria-label="Explore the rooms">
          {['About', 'Writing', 'Speaking', 'Building', 'Mentoring'].map(room => (
            <Link key={room} href={`/${room.toLowerCase()}`}>
              {room} ↗
            </Link>
          ))}
        </nav>
      </>
    );

  return (
    <main id="main-content" className="cinematic-prototype" data-enhanced={ready && enabled}>
      <details className="cin-controls" id="prototype-controls">
        <summary>Motion controls</summary>
        <p>Local motion study. Scroll naturally or jump to a reading pose.</p>
        <div className="cin-control-buttons">
          <button onClick={() => jump(0)}>Arrival</button>
          <button onClick={() => jump(0.5)}>Writing</button>
          <button onClick={() => jump(0.95)}>Foundation</button>
        </div>
        <label>
          Opening: {duration.toFixed(1)}s
          <input
            aria-label="Opening duration"
            type="range"
            min="0.7"
            max="3"
            step="0.1"
            value={duration}
            onChange={e => {
              const value = Number(e.target.value);
              setDuration(value);
              settings.current.duration = value;
            }}
          />
        </label>
        <label>
          Camera travel: {travel.toFixed(1)}×
          <input
            aria-label="Camera travel"
            type="range"
            min="0.6"
            max="1.2"
            step="0.1"
            value={travel}
            onChange={e => {
              const value = Number(e.target.value);
              setTravel(value);
              settings.current.travel = value;
            }}
          />
        </label>
        <label>
          Story position
          <input
            ref={meter}
            aria-label="Story position"
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            disabled={!ready}
            onChange={e => jump(Number(e.target.value) / 100)}
          />
        </label>
        <label className="cin-check">
          <input type="checkbox" checked={still} onChange={e => setStill(e.target.checked)} /> Still
          / reduced-motion preview
        </label>
        <button onClick={replay}>Replay opening</button>
        <p>
          {reduced
            ? 'Your reduced-motion preference is active.'
            : failed
              ? 'The 3D scene is unavailable. The complete still version remains usable.'
              : still
                ? 'Still preview active. All three scenes are available below.'
                : ready
                  ? '3D doorway active. Reverse scroll retraces the story.'
                  : 'Preparing the scene. All content is available below.'}
        </p>
      </details>
      <div className="cin-rail" ref={rail} aria-label="The Open Door story">
        <div className="cin-stage" ref={stage}>
          <canvas ref={canvas} aria-hidden="true" />
          {[0, 1, 2].map(i => (
            <div
              key={i}
              ref={el => {
                blocks.current[i] = el;
              }}
              className={`cin-copy cin-copy-${i}`}
            >
              {copy(i)}
            </div>
          ))}
          <span className="cin-scroll-hint" aria-hidden="true">
            Scroll to explore ↓
          </span>
        </div>
      </div>
      <div className="cin-static">
        {['arrival', 'writing', 'foundation'].map((name, i) => (
          <section key={name} id={`still-${name}`} className={`cin-still cin-still-${name}`}>
            <div className="cin-still-art">
              <Image
                src={`/images/cinematic/${name}.png`}
                alt={i === 2 ? 'Five rooms sharing one foundation' : ''}
                fill
                sizes="100vw"
                priority={i === 0}
              />
              {i === 0 && (
                <Image
                  className="cin-still-portrait"
                  src="/images/portrait-interim.png"
                  alt="Jatto Abdul"
                  width={800}
                  height={800}
                />
              )}
            </div>
            <div className="cin-still-copy">{copy(i)}</div>
          </section>
        ))}
      </div>
      <section className="cin-end">
        <p>The door stays open.</p>
        <h2>Come on in.</h2>
        <button className="cin-primary" onClick={open}>
          Let’s talk ↗
        </button>
        <button onClick={replay}>Return to the beginning ↑</button>
        <Link href="/">Compare the earlier homepage ↗</Link>
      </section>
    </main>
  );
}
