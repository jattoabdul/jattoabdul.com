import { ImageResponse } from 'next/og';

import { getLocalPosts, getPost } from '@/data/posts';
import { siteConfig } from '@/data/site';
import { formatDate } from '@/lib/format';

export const alt = 'Article on jattoabdul.com';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export function generateImageMetadata() {
  return getLocalPosts().map((p) => ({
    id: p.slug,
    alt: p.title,
    contentType,
    size,
  }));
}

type Params = { params: Promise<{ slug: string }> };

export default async function ArticleOgImage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.title ?? siteConfig.name;
  const category = post?.category ?? 'Writing';
  const date = post?.date ? formatDate(post.date) : '';
  const readTime = post?.readTime ? `${post.readTime} min read` : '';

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
          justifyContent: 'space-between',
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
            fontSize: 22,
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
          <span style={{ display: 'flex', color: '#3C3834' }}>/</span>
          <span style={{ display: 'flex', color: '#34D399' }}>writing</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'monospace',
              fontSize: 20,
              color: '#34D399',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            {/* CTA chip — primary */}
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
              <span style={{ display: 'flex' }}>Read the article</span>
              <span style={{ display: 'flex' }}>→</span>
            </div>

            {(date || readTime) && (
              <div
                style={{
                  display: 'flex',
                  gap: 14,
                  fontSize: 20,
                  fontFamily: 'monospace',
                  color: '#A8A29E',
                }}
              >
                {date && <span style={{ display: 'flex' }}>{date}</span>}
                {date && readTime && <span style={{ display: 'flex' }}>·</span>}
                {readTime && <span style={{ display: 'flex' }}>{readTime}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
