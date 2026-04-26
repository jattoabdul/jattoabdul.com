import { videos as localVideos, type Video } from '@/data/videos';

/**
 * YouTube channel feed (Atom RSS, no API key required).
 *
 * When NEXT_PUBLIC_ENABLE_YOUTUBE_FEED=true AND YOUTUBE_CHANNEL_ID is set,
 * fetches the channel's last ~15 videos from
 *   https://www.youtube.com/feeds/videos.xml?channel_id=UC...
 * Otherwise returns local fallback data.
 *
 * The Atom feed gives title, link, published, thumbnail, and video ID — but
 * NOT duration or view count. Those require the YouTube Data API (paid above
 * a free quota). Duration is rendered as "—" when missing.
 *
 * To find your channel ID:
 *   1. Visit your channel page (youtube.com/@your-handle)
 *   2. Open page source and search for "channelId" — it looks like UC…22 chars
 *   3. Or use https://commentpicker.com/youtube-channel-id.php
 */

type FeedState = 'success' | 'empty' | 'error';

export type VideoFeed = {
  videos: Video[];
  state: FeedState;
};

const FEED_ENABLED = process.env.NEXT_PUBLIC_ENABLE_YOUTUBE_FEED === 'true';
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function getVideoFeed(): Promise<VideoFeed> {
  if (!FEED_ENABLED || !CHANNEL_ID) {
    return { videos: localVideos, state: 'success' };
  }

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(CHANNEL_ID)}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`youtube feed status ${res.status}`);
    const xml = await res.text();
    const parsed = parseAtom(xml);
    if (!parsed.length) return { videos: localVideos, state: 'empty' };
    return { videos: parsed, state: 'success' };
  } catch {
    return { videos: localVideos, state: 'error' };
  }
}

function parseAtom(xml: string): Video[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries.map((entry, i) => {
    const id = match(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/) ?? `yt-${i}`;
    const title = decode(match(entry, /<title>([\s\S]*?)<\/title>/) ?? 'Untitled');
    const link =
      match(entry, /<link[^>]*rel="alternate"[^>]*href="([^"]+)"/) ??
      `https://www.youtube.com/watch?v=${id}`;
    const published = match(entry, /<published>([^<]+)<\/published>/) ?? '';
    const thumbnail = match(entry, /<media:thumbnail[^>]*url="([^"]+)"/) ?? undefined;
    return {
      id,
      title,
      date: published.slice(0, 10),
      kind: 'Long-form',
      platform: 'YouTube',
      href: link,
      thumbnail,
    } satisfies Video;
  });
}

function match(input: string, re: RegExp): string | null {
  const m = input.match(re);
  return m?.[1] ?? null;
}

function decode(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}
