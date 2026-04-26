import { Hero } from '@/components/sections/Hero';
import { CurrentFocus } from '@/components/sections/CurrentFocus';
import { LatestWriting } from '@/components/sections/LatestWriting';
import { LatestVideos } from '@/components/sections/LatestVideos';
import { SelectedProjects } from '@/components/sections/SelectedProjects';
import { NotesPreview } from '@/components/sections/NotesPreview';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { ConnectSection } from '@/components/sections/ConnectSection';
import { getWritingFeed } from '@/lib/posts';
import { getVideoFeed } from '@/lib/videos';

export const revalidate = 3600;

export default async function HomePage() {
  const [writing, videoFeed] = await Promise.all([getWritingFeed(), getVideoFeed()]);

  return (
    <main id="main-content">
      <Hero />
      <CurrentFocus />
      <LatestWriting posts={writing.posts} />
      <LatestVideos videos={videoFeed.videos} />
      <SelectedProjects />
      <NotesPreview />
      <AboutPreview />
      <ConnectSection />
    </main>
  );
}
