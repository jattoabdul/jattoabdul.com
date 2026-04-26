export type PostSource = 'local' | 'medium' | 'external';

/**
 * Post: a writing entry. `published: false` items act as content ideas /
 * drafts — they stay in this file as scaffolding but never render in the
 * site, the writing index, the RSS feed, the sitemap, or `generateStaticParams`.
 *
 * To publish: flesh out the body, then flip `published: true`.
 */
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
    published: false,
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
    published: false,
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
      {
        type: 'p',
        text: "Most senior engineers I respect can debug almost anything. The staff engineers I respect debug less, because they've designed systems where fewer things break in the first place — and when they do, the failure modes are obvious.",
      },
      { type: 'h2', text: 'Three things staff judgment looks like in practice' },
      {
        type: 'p',
        text: "One: choosing which problems are worth a meeting. Most aren't. Most can be resolved by writing the answer down once where the right people will find it later. Defaulting to async is judgment.",
      },
      {
        type: 'p',
        text: "Two: pushing back on shiny tech. The technology that gets a feature to launch is rarely the technology that should run it for three years. Boring stacks compound; novel stacks expire. Picking boring on purpose is judgment.",
      },
      {
        type: 'p',
        text: "Three: explicit non-goals. Saying 'this thing we're shipping won't handle X, and that's fine' is more useful than any architecture diagram. Most outage retrospectives I've read trace back to an implicit non-goal someone had — they just never said it out loud.",
      },
      {
        type: 'quote',
        text: "Senior engineers solve hard problems. Staff engineers prevent them.",
      },
      { type: 'h2', text: "What it isn't" },
      {
        type: 'p',
        text: "Staff judgment isn't being right more often. It's being honestly uncertain in public — saying 'I'm not sure, here are the two options, here's the one I'd pick and why, but I could be wrong' — in a way that helps the team move without forcing them to either disagree or comply.",
      },
      {
        type: 'p',
        text: "The work is mostly invisible. Nobody points at the migration that didn't happen, the meeting that became a doc, the service that didn't get split. But over a year, the absence of pain is the signal that someone made a lot of small good calls.",
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
    url: 'https://medium.com/@jattoabdul',
    canonical: 'https://medium.com/@jattoabdul',
    published: false,
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
    url: 'https://medium.com/@jattoabdul',
    canonical: 'https://medium.com/@jattoabdul',
    published: false,
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
      {
        type: 'p',
        text: "Most engineering posts I write start as a Slack message I never sent. The act of explaining something to someone, even an imagined someone, exposes the bits I thought I understood and didn't.",
      },
      { type: 'h2', text: 'Why public, not just a private notebook' },
      {
        type: 'p',
        text: "Private notes let you stay vague. You know what you meant — past-you and present-you share enough context that imprecise language still works. Public writing strips that crutch away. Either you say what you mean or someone in the comments will tell you what you actually said.",
      },
      {
        type: 'p',
        text: "It also compounds in ways the resume never will. Posts I wrote two and three years ago still land in my inbox — sometimes from the people I most wanted to be reading them. A resume gets you in the room once; writing keeps the room finding you.",
      },
      { type: 'h2', text: 'How to start without overthinking it' },
      {
        type: 'p',
        text: "Pick the smallest real lesson from this week. Not 'how to think about distributed systems' — 'the one config knob that fixed our rebalance lag'. Three paragraphs. Hit publish. The bar for engineering writing is lower than you think; the bar for honest engineering writing is barely populated.",
      },
      {
        type: 'p',
        text: "The first ten posts will feel rough. They will be rough. Ship them anyway. The compounding starts with post eleven, and it doesn't start at all without the first ten.",
      },
      {
        type: 'quote',
        text: "Most technical problems get easier when the assumptions are visible. Writing makes them visible — first to you, then to everyone else.",
      },
    ],
  },
];

export const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort();

/**
 * Slim list-card shape — exclude `body` so it doesn't get serialised into
 * client component props. Article bodies stay server-side until needed.
 */
export type PostListItem = Omit<Post, 'body'>;

export function toListItem(p: Post): PostListItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body: _body, ...rest } = p;
  return rest;
}

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}

export function getLocalPosts(): Post[] {
  return posts.filter(p => p.source === 'local' && p.published);
}
