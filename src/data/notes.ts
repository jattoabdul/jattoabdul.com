export type Note = {
  slug: string;
  date: string;
  title: string;
  tags: string[];
};

export const notes: Note[] = [
  {
    slug: 'idempotency-distributed',
    date: '2026-04-20',
    title: 'On idempotency in distributed systems',
    tags: ['backend'],
  },
  {
    slug: 'orms-reporting',
    date: '2026-04-15',
    title: 'Why I stopped using ORMs for reporting queries',
    tags: ['backend', 'sql'],
  },
  {
    slug: 'prompt-caching-prod',
    date: '2026-04-08',
    title: 'Prompt caching in production: what actually matters',
    tags: ['applied-ai'],
  },
  {
    slug: 'structured-outputs-vs-tools',
    date: '2026-03-30',
    title: 'Structured outputs vs function calling',
    tags: ['applied-ai'],
  },
  {
    slug: 'boring-architecture',
    date: '2026-03-22',
    title: 'The underrated value of boring architecture',
    tags: ['platform'],
  },
  {
    slug: 'async-standups',
    date: '2026-03-14',
    title: 'How I run async standups for distributed teams',
    tags: ['communication'],
  },
  {
    slug: 'kafka-rebalance-notes',
    date: '2026-03-06',
    title: 'Notes on Kafka consumer rebalancing in the wild',
    tags: ['platform', 'kafka'],
  },
  {
    slug: 'senior-candidates',
    date: '2026-02-27',
    title: 'What I look for in senior engineering candidates',
    tags: ['career'],
  },
  {
    slug: 'backpressure',
    date: '2026-02-14',
    title: 'A small note on backpressure',
    tags: ['backend'],
  },
];

export const noteTags = Array.from(new Set(notes.flatMap((n) => n.tags))).sort();
