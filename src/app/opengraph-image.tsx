import { ImageResponse } from 'next/og';

import { siteConfig } from '@/data/site';

export const alt = `${siteConfig.name} — ${siteConfig.titleSuffix}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0C0A09',
          color: '#FAFAF9',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#A8A29E',
            fontSize: 24,
            fontFamily: 'monospace',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#FAFAF9',
              color: '#0C0A09',
              fontSize: 24,
              fontFamily: 'serif',
              fontWeight: 500,
            }}
          >
            j
          </div>
          <span style={{ display: 'flex' }}>jattoabdul.com</span>
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 76,
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              maxWidth: 1040,
            }}
          >
            <span style={{ display: 'flex', marginRight: 18 }}>
              {siteConfig.name} — building backend, platform,
            </span>
            <span style={{ display: 'flex', color: '#A8A29E', fontStyle: 'italic' }}>
              and applied-AI systems.
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              fontFamily: 'monospace',
              fontSize: 22,
              letterSpacing: '0.04em',
            }}
          >
            {/* CTA chip — primary accent button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#34D399',
                color: '#0C0A09',
                padding: '12px 22px',
                borderRadius: 10,
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontFamily: 'sans-serif',
                fontSize: 22,
              }}
            >
              <span style={{ display: 'flex' }}>Read the writing</span>
              <span style={{ display: 'flex' }}>→</span>
            </div>

            {/* Secondary nav chips, muted */}
            <div
              style={{
                display: 'flex',
                gap: 14,
                color: '#78716C',
              }}
            >
              <span style={{ display: 'flex' }}>projects</span>
              <span style={{ display: 'flex', color: '#3C3834' }}>·</span>
              <span style={{ display: 'flex' }}>videos</span>
              <span style={{ display: 'flex', color: '#3C3834' }}>·</span>
              <span style={{ display: 'flex' }}>notes</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
