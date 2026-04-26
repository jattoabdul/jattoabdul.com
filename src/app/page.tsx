import { Hero } from '@/components/sections/Hero';
import { CurrentFocus } from '@/components/sections/CurrentFocus';
import { LatestWriting } from '@/components/sections/LatestWriting';
import { LatestVideos } from '@/components/sections/LatestVideos';
import { SelectedProjects } from '@/components/sections/SelectedProjects';
import { NotesPreview } from '@/components/sections/NotesPreview';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { ConnectSection } from '@/components/sections/ConnectSection';
import { getWritingFeed } from '@/lib/posts';

export const revalidate = 3600;

export default async function HomePage() {
  const feed = await getWritingFeed();

  return (
    <main id="main-content">
      <Hero />
      <CurrentFocus />
      <LatestWriting posts={feed.posts} />
      <LatestVideos />
      <SelectedProjects />
      <NotesPreview />
      <AboutPreview />
      <ConnectSection />
    </main>
  );
}
