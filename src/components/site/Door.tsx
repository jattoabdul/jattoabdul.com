'use client';

import { useEffect, useRef } from 'react';

import { useDoorStore } from '@/lib/door-store';

/**
 * The door: closed at rest with a line of light breathing underneath, ajar on hover,
 * open on click (the leaf swings, the figure steps in and waves). The room itself is
 * <DoorRoom />. Markup and motion ported from the Claude Design reference
 * (Media-Work prototype/open-door-contact/door-contact.html, 2026-09-05).
 */
export function Door({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const isOpen = useDoorStore(s => s.isOpen);
  const open = useDoorStore(s => s.open);
  const close = useDoorStore(s => s.close);
  const setAnchor = useDoorStore(s => s.setAnchor);

  useEffect(() => {
    setAnchor(ref.current);
    return () => setAnchor(null);
  }, [setAnchor]);

  return (
    <button
      ref={ref}
      type="button"
      className={`door-btn ${className ?? ''}`}
      aria-label="Contact, come on in"
      title="Come on in"
      aria-expanded={isOpen}
      aria-controls="door-room"
      onClick={() => (isOpen ? close() : open())}
    >
      <span className="door" aria-hidden="true">
        <span className="door-glow" />
        <svg className="door-figure" viewBox="0 0 24 34">
          <circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 14 L12 26 M12 17 L6.5 21 M6 32 L12 26 L18 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g className="door-hand">
            <path
              d="M12 17 L18.5 12.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <span className="door-frame">
          <span className="door-leaf">
            <span className="door-knob" />
          </span>
        </span>
        <span className="door-sill" />
        <span className="door-seep" />
      </span>
    </button>
  );
}
