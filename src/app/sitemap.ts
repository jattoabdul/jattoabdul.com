import type { MetadataRoute } from 'next';

import { siteConfig } from '@/data/site';
import { getLocalPosts } from '@/data/posts';
import { getPublishedNotes } from '@/data/notes';
import { projects } from '@/data/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = [
    '',
    '/writing',
    '/notes',
    '/projects',
    '/videos',
    '/about',
    '/contact',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.7,
  }));

  const localArticles = await getLocalPosts();
  const articleRoutes = localArticles.map((post) => ({
    url: `${base}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const noteRoutes = getPublishedNotes()
    .filter((n) => n.body?.length)
    .map((n) => ({
      url: `${base}/notes/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }));

  return [...staticRoutes, ...articleRoutes, ...projectRoutes, ...noteRoutes];
}
