import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 116,
          background: '#0C0A09',
          color: '#FAFAF9',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          borderRadius: 36,
        }}
      >
        j
      </div>
    ),
    size,
  );
}
