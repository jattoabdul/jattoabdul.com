/**
 * Field notes — short-form, less polished than essays.
 *
 * Each note has a slug + date + title + tags. `body` is optional: when
 * present, the note gets its own page at /notes/[slug]. When absent, the
 * note still shows in the index (use this for ideas you want to surface but
 * haven't written up yet).
 *
 * `published: false` hides the note everywhere — same draft pattern as posts.
 *
 * Timeline ordering: keep newest first; the index sorts by date descending.
 */

export type Note = {
  slug: string;
  date: string;
  title: string;
  tags: string[];
  /** Each string is rendered as a paragraph. Keep notes short — 1–4 paragraphs. */
  body?: string[];
  published?: boolean; // defaults to true
};

export const notes: Note[] = [
  // ── 2026 ────────────────────────────────────────────────────────────────
  {
    slug: 'agents-move-the-bottleneck-up',
    date: '2026-05-01',
    title: 'Agents move the bottleneck up the stack',
    tags: ['applied-ai', 'career'],
    body: [
      'InferGo is public and in alpha now: a Go-native inference toolkit for backend services. The promise is deliberately narrow — export a supported model once, load it in Go, and run predictions without Python in production.',
      'A lot of the work moved faster with Codex, Claude Code, and Claude Design in the loop. But the speed only held when the contract was clear: bundle versions, parity checks, supported model families, and what should fail loudly instead of pretending to work.',
      'That is the lesson I keep relearning with agents. They reduce typing, searching, and first-pass implementation time. They do not remove engineering judgment. The bottleneck moves up the stack: naming the API, drawing the boundary, choosing the non-goals, and deciding which promises survive the next release.',
    ],
  },
  {
    slug: 'staging-is-not-production-shaped',
    date: '2026-04-29',
    title: 'Staging is not production-shaped',
    tags: ['platform', 'backend'],
    body: [
      'A framework upgrade can pass review, pass staging, and still fail in production. The code may be correct in isolation, but production adds the parts staging rarely carries: real traffic, background workers, connection pressure, failover paths, and configuration drift.',
      'That is the trap. A green staging run proves the app works against a smaller copy of the world. It does not prove the system will hold when traffic, concurrency, and operational history arrive at the same time.',
      'For high-risk framework or infrastructure changes, the useful test is production-shaped: realistic load, realistic failure paths, clear rollback criteria, and the right owners online. Anything less is not useless, but it should be treated as confidence-building, not proof.',
    ],
  },
  {
    slug: 'acknowledgements-are-not-settlements',
    date: '2026-04-25',
    title: 'Acknowledgements are not settlements',
    tags: ['platform', 'product'],
    body: [
      'TrustKarry can let senders and travelers acknowledge that a payment hand-off happened without becoming the system that moves the money. That sounds like a small wording choice. It is not.',
      'Settlement means rails, disputes, compliance scope, payout operations, and a very different risk profile. Acknowledgement means the product records what both parties say happened, while the MVP stays a coordination marketplace.',
      "The data model decides what business you're in. Sometimes the most important product decision is refusing the larger business until you have the legal, operational, and technical runway to support it.",
    ],
  },
  {
    slug: 'idempotency-distributed',
    date: '2026-04-20',
    title: 'On idempotency in distributed systems',
    tags: ['backend', 'platform'],
    body: [
      'Idempotency is the cheapest insurance you can buy for a distributed system. Every external write — payment, email, webhook — should accept an idempotency key. Every retry should reuse it.',
      "When clients can't generate a stable key, generate one server-side from the request shape and a short window. Worse than a duplicate is a duplicate you can't explain.",
    ],
  },
  {
    slug: 'orms-reporting',
    date: '2026-04-15',
    title: 'Why I stopped using ORMs for reporting queries',
    tags: ['backend', 'sql'],
    body: [
      "ORMs are great for the 80% of CRUD that looks like CRUD. Reporting isn't CRUD.",
      "Once a query touches three joins, a window function, and a CTE, the ORM expression is harder to read than the SQL it generates — and harder to optimise. I write the SQL by hand, version it like code, and let the ORM stay in its lane.",
    ],
  },
  {
    slug: 'prompt-caching-prod',
    date: '2026-04-08',
    title: 'Prompt caching in production: what actually matters',
    tags: ['applied-ai'],
    body: [
      'Prompt caching is the lowest-effort, highest-impact optimisation in applied AI right now. The trick is putting the stable parts at the front: system prompt, tool definitions, retrieved context that rarely changes.',
      "Variable user input goes last. Cache hit rate becomes a metric you watch the way you watch p99 latency. Mine sits above 80% on the hot paths — that's not a tuning win, that's just structure.",
    ],
  },
  {
    slug: 'structured-outputs-vs-tools',
    date: '2026-03-30',
    title: 'Structured outputs vs function calling',
    tags: ['applied-ai'],
    body: [
      "These get conflated, but they answer different questions. Function calling is the model deciding what to do — pick a tool, fill its arguments. Structured outputs is the model deciding how to shape an answer you've already decided you want.",
      "Use function calling when there's branching: search vs respond, fetch vs compute, escalate vs resolve. Use structured outputs when the path is fixed and you need parseable JSON downstream.",
      "Most teams I see reach for tools when they actually wanted a schema. The result is a bag of one-tool 'pseudo-functions' that always get called — which is just a clumsier way to ask for JSON.",
    ],
  },
  {
    slug: 'boring-architecture',
    date: '2026-03-22',
    title: 'The underrated value of boring architecture',
    tags: ['platform'],
    body: [
      "Postgres, a queue, and a stateless web server will get you embarrassingly far. Most of the times I've reached for something more interesting, I was solving a problem I didn't actually have.",
      "Reach for novelty when the boring option genuinely doesn't fit — not when it feels insufficiently impressive.",
    ],
  },
  {
    slug: 'async-standups',
    date: '2026-03-14',
    title: 'How I run async standups for distributed teams',
    tags: ['communication'],
    body: [
      "Daily standup as a meeting is a tax on focus time. The information is rarely worth the synchronisation cost, especially across time zones.",
      "We post three lines in a thread instead: what I shipped yesterday, what I'm doing today, what I'm blocked on. Anyone reading at any time gets the state of the team. Blockers turn into sub-threads with the right person, not a 30-minute group meeting.",
      "Two rules make it work: post by a specific local time (mine: end of working day), and treat blockers as the only mandatory line.",
    ],
  },
  {
    slug: 'kafka-rebalance-notes',
    date: '2026-03-06',
    title: 'Notes on Kafka consumer rebalancing in the wild',
    tags: ['platform', 'kafka'],
    body: [
      "Rebalances are usually fine. The bad ones are the ones nobody notices until lag spikes — caused by silent consumer death, slow message processing exceeding `max.poll.interval.ms`, or a deploy that thrashes group membership.",
      "Three knobs that bought us most of the wins: cooperative-sticky assignor (no full stop-the-world), tuning `session.timeout.ms` and `heartbeat.interval.ms` for our actual processing time, and shipping a metric for partition-revoked count so a 'normal' deploy doesn't hide a leaking pod.",
      "Static membership helps for stable consumer pools — at the cost of slower failover. Pick deliberately.",
    ],
  },
  {
    slug: 'senior-candidates',
    date: '2026-02-27',
    title: 'What I look for in senior engineering candidates',
    tags: ['career'],
    body: [
      "Three things, in order. One: can they explain a tradeoff without flinching? Two: do they reach for the boring solution first? Three: when something broke, do they tell you what they actually did, or what the postmortem said they did?",
      "Pattern-matching to titles or company names is a shortcut that works exactly often enough to be dangerous.",
    ],
  },
  {
    slug: 'backpressure',
    date: '2026-02-14',
    title: 'A small note on backpressure',
    tags: ['backend'],
    body: [
      "If you don't reject load when the system is stressed, the system rejects load for you — usually by falling over. Backpressure is the polite version of saying no.",
      "Surface it everywhere there's a queue. A bounded channel that drops or rejects beats an unbounded one that quietly fills memory until OOM. Same for HTTP — return 429 with a useful Retry-After before the latency tail eats everyone.",
    ],
  },
  {
    slug: 'minerva-week-one',
    date: '2026-01-15',
    title: 'Joining Minerva — first impressions from week one',
    tags: ['career', 'platform'],
    body: [
      "First week at a new company is mostly listening. The questions I ask aren't 'how does X work?' — those are in the docs. They're 'what was the hardest tradeoff this team made in the last six months, and would they make it again?'",
      "The answers tell you where the real complexity lives, where the team has scar tissue, and where you should probably not start refactoring on day three.",
    ],
  },

  // ── 2025 ────────────────────────────────────────────────────────────────
  {
    slug: 'observability-first',
    date: '2025-11-04',
    title: "If you can't see it, you haven't built it",
    tags: ['platform', 'backend'],
    body: [
      'I add metrics and structured logs before I add the next feature. Not after the bug, not when the dashboard request lands — before.',
      "Future-me always thanks past-me. The cost of instrumenting up front is hours; the cost of debugging blind in production is days, and someone else's weekend.",
    ],
  },
  {
    slug: 'review-own-prs',
    date: '2025-09-17',
    title: 'Review your own PRs first',
    tags: ['communication', 'career'],
    body: [
      "Open the PR, walk away for ten minutes, then read it like a stranger. Half the comments your reviewer would have left, you'll catch yourself. The half that remain are the ones worth their time.",
      "It also speeds reviews up. Reviewers learn to trust that your PRs come pre-thought-through.",
    ],
  },
  {
    slug: 'code-review-etiquette',
    date: '2025-07-21',
    title: 'Code review etiquette I wish I learned sooner',
    tags: ['communication'],
    body: [
      "Lead with intent before mechanics. 'I think we're solving the wrong problem here, here's why' lands differently than fifteen line-comments about variable names attached to a fundamentally wrong design.",
      "Mark which comments are blocking and which are taste. Reviewers conflating the two is a top reason juniors over-rotate on stylistic feedback.",
      "And: praise the non-obvious good calls. Nobody mentions the small refactor that made the diff readable, but those are the ones worth noticing.",
    ],
  },
  {
    slug: 'first-outage',
    date: '2025-05-12',
    title: 'The first outage I owned end-to-end',
    tags: ['career', 'platform'],
    body: [
      "Pager went off at 2am. By 3am the system was back up; by noon I had a postmortem draft. The technical fix was small. The hard part was writing the postmortem honestly — not 'we had an issue with our caching layer' but 'I shipped a config change without testing the cold-start path'.",
      'The team was kinder about the postmortem than I expected. Honest writing earns trust faster than careful framing ever has.',
    ],
  },
  {
    slug: 'when-to-stop-refactoring',
    date: '2025-03-08',
    title: 'When to stop refactoring',
    tags: ['career', 'backend'],
    body: [
      "When the next change feels easy. Not when the code is beautiful — that's a moving target and the goal is shipping.",
      "I keep a 'refactor budget' for any feature: if I blow through it without making the next step obviously easier, I revert and try a smaller cut.",
    ],
  },

  // ── 2024 ────────────────────────────────────────────────────────────────
  {
    slug: 'why-i-write',
    date: '2024-09-18',
    title: 'Why I started writing publicly',
    tags: ['communication', 'career'],
    body: [
      'I started writing because the same lessons were being relearned by everyone around me — and by me, again, six months later. Writing them down forces me to commit to a position; publishing forces me to defend it.',
      "The compounding is real. Posts I wrote two years ago still land in my inbox, sometimes from the people I most wanted to be reading them.",
    ],
  },
  {
    slug: 'first-year-senior',
    date: '2024-06-04',
    title: 'What I learned my first year as a senior engineer',
    tags: ['career'],
    body: [
      "The title is mostly a permission slip. People expected my opinion to carry more weight — which mattered more than any technical change. The work was already familiar; the new skill was knowing when to step back and let someone else figure it out.",
      "Three things I underestimated: how much of the role is writing (PR descriptions, design docs, async updates), how much it's about creating context for other people, and how often the right answer is 'let's not build that yet'.",
    ],
  },
];

export const noteTags = Array.from(new Set(notes.flatMap((n) => n.tags))).sort();

export function getPublishedNotes(): Note[] {
  return notes.filter((n) => n.published !== false);
}

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
