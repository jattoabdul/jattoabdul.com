export type PostSource = 'local' | 'medium' | 'external';

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  source: PostSource;
  url?: string;
  canonical?: string;
  published: boolean;
  body?: PostBlock[];
};

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'code'; lang: string; code: string };

export const posts: Post[] = [
  {
    slug: 'pipelines-that-dont-lie',
    category: 'Backend Systems',
    title: "Designing data pipelines that don't lie to you",
    excerpt:
      "Most pipeline failures aren't bugs — they're assumption violations baked in at design time. Here's how I learned to validate at the boundary.",
    date: '2026-04-12',
    readTime: 8,
    tags: ['backend', 'data'],
    source: 'local',
    published: true,
    body: [
      {
        type: 'p',
        text: "Most pipeline failures aren't bugs — they're assumption violations baked in at design time. The schema changed. The upstream vendor didn't tell you. A field that was always populated is now sometimes null. The job didn't crash; it produced wrong numbers, and the dashboard kept going.",
      },
      {
        type: 'quote',
        text: 'The most dangerous pipelines are the ones that succeed silently with wrong data.',
      },
      { type: 'h2', text: 'Validate at the boundary' },
      {
        type: 'p',
        text: "Use a schema contract layer to assert shape at ingestion time — not inside your transforms. Inside transforms is too late: errors there mean you've already promised correctness to someone downstream.",
      },
      {
        type: 'code',
        lang: 'python',
        code: `from pydantic import BaseModel, validator

class Event(BaseModel):
    user_id: str
    event_type: str
    ts: int

    @validator("event_type")
    def check_event(cls, v):
        if v not in VALID_EVENTS:
            raise ValueError(f"unknown event: {v}")
        return v`,
      },
      { type: 'h2', text: 'Design for observability' },
      {
        type: 'p',
        text: "Emit metrics on schema violations. Track null rates per field. Alert when rates deviate from a rolling baseline. The pipeline that tells you when it's confused is worth ten that fail loudly once a year.",
      },
    ],
  },
  {
    slug: 'ai-workflows',
    category: 'Applied AI',
    title: 'Building AI-assisted workflows without the hype',
    excerpt:
      "Field notes from integrating LLMs into production systems — what worked, what didn't, and the tradeoffs nobody warned me about.",
    date: '2026-03-28',
    readTime: 6,
    tags: ['applied-ai', 'llms'],
    source: 'local',
    published: true,
    body: [
      {
        type: 'p',
        text: "There's a version of every applied-AI feature that ships in a week and a version that survives in production. The difference is almost never the model — it's the surrounding system.",
      },
      { type: 'h2', text: 'Treat the LLM as a stochastic dependency' },
      {
        type: 'p',
        text: 'Wrap calls in retries with jitter. Cache aggressively where determinism matters. Validate outputs against a schema before you trust them downstream. None of this is glamorous; all of it is required.',
      },
    ],
  },
  {
    slug: 'staff-judgment',
    category: 'Career',
    title: 'What staff-level judgment actually looks like',
    excerpt:
      "It's less about technical complexity and more about which problems you choose to solve — and which you let slide.",
    date: '2026-03-10',
    readTime: 5,
    tags: ['career'],
    source: 'local',
    published: true,
    body: [
      {
        type: 'p',
        text: "The senior-to-staff jump isn't about being able to solve harder problems. It's about being able to spot which problems are worth solving at all — and which ones you should explicitly decide to leave alone for now.",
      },
    ],
  },
  {
    slug: 'kafka-rebalance',
    category: 'Platform Engineering',
    title: 'Kafka consumer group rebalancing: triggers and mitigations',
    excerpt:
      'A practical guide to diagnosing and reducing rebalance frequency in high-throughput systems.',
    date: '2026-02-18',
    readTime: 9,
    tags: ['kafka', 'platform'],
    source: 'medium',
    url: 'https://medium.com/@jattoade',
    canonical: 'https://medium.com/@jattoade',
    published: true,
  },
  {
    slug: 'structured-outputs',
    category: 'Applied AI',
    title: 'Structuring LLM outputs for downstream reliability',
    excerpt:
      'Why function calling and structured outputs are not the same thing, and when to reach for each.',
    date: '2026-02-05',
    readTime: 7,
    tags: ['applied-ai', 'llms'],
    source: 'medium',
    url: 'https://medium.com/@jattoade',
    canonical: 'https://medium.com/@jattoade',
    published: true,
  },
  {
    slug: 'writing-as-engineer',
    category: 'Communication',
    title: 'Why I write as an engineer (and you probably should too)',
    excerpt:
      'Writing in public sharpens thinking. It also compounds in ways the resume never will.',
    date: '2026-01-22',
    readTime: 4,
    tags: ['communication', 'career'],
    source: 'local',
    published: true,
    body: [
      {
        type: 'p',
        text: "Writing forces you to commit to specific words. The vague intuitions in your head can't survive the page; either they sharpen, or they fall apart. Either outcome is useful.",
      },
    ],
  },
];

export const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getLocalPosts(): Post[] {
  return posts.filter((p) => p.source === 'local' && p.published);
}
