export type VideoKind = 'Long-form' | 'Talk' | 'Tutorial';

export type Video = {
  id: string;
  title: string;
  duration: string;
  date: string;
  kind: VideoKind;
  platform: 'YouTube';
  href?: string;
};

export type Short = {
  id: string;
  title: string;
  platform: 'Shorts' | 'LinkedIn' | 'X' | 'Instagram';
  duration: string;
  href?: string;
};

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'Designing for partial connectivity: an African engineering perspective',
    duration: '18:24',
    date: '2026-04',
    kind: 'Long-form',
    platform: 'YouTube',
  },
  {
    id: 'v2',
    title: 'How I structure prompts for production LLM features',
    duration: '11:02',
    date: '2026-03',
    kind: 'Long-form',
    platform: 'YouTube',
  },
  {
    id: 'v3',
    title: 'Reading a senior-engineer job description like a staff engineer',
    duration: '07:48',
    date: '2026-02',
    kind: 'Long-form',
    platform: 'YouTube',
  },
];

export const shorts: Short[] = [
  {
    id: 's1',
    title: 'One question that filters bad architecture decisions',
    platform: 'Shorts',
    duration: '0:48',
  },
  {
    id: 's2',
    title: 'The invariant rule I write at the top of every service',
    platform: 'LinkedIn',
    duration: '1:12',
  },
  {
    id: 's3',
    title: 'Why I review my own PRs before requesting reviews',
    platform: 'X',
    duration: '0:55',
  },
  {
    id: 's4',
    title: 'A small habit that makes pairing 2× more useful',
    platform: 'Instagram',
    duration: '0:38',
  },
];
