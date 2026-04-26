/* Shared data for Jatto Abdul's personal site */

window.SITE_DATA = (() => {
  const POSTS = [
    {
      slug: 'pipelines-that-dont-lie',
      cat: 'Backend Systems',
      title: "Designing data pipelines that don't lie to you",
      excerpt:
        "Most pipeline failures aren't bugs — they're assumption violations baked in at design time. Here's how I learned to validate at the boundary.",
      date: '2026-04-12',
      mins: 8,
      tags: ['backend', 'data'],
      source: 'local',
    },
    {
      slug: 'ai-workflows',
      cat: 'Applied AI',
      title: 'Building AI-assisted workflows without the hype',
      excerpt:
        "Field notes from integrating LLMs into production systems — what worked, what didn't, and the tradeoffs nobody warned me about.",
      date: '2026-03-28',
      mins: 6,
      tags: ['applied-ai', 'llms'],
      source: 'local',
    },
    {
      slug: 'staff-judgment',
      cat: 'Career',
      title: 'What staff-level judgment actually looks like',
      excerpt:
        "It's less about technical complexity and more about which problems you choose to solve — and which you let slide.",
      date: '2026-03-10',
      mins: 5,
      tags: ['career'],
      source: 'local',
    },
    {
      slug: 'kafka-rebalance',
      cat: 'Platform Engineering',
      title: 'Kafka consumer group rebalancing: triggers and mitigations',
      excerpt:
        'A practical guide to diagnosing and reducing rebalance frequency in high-throughput systems.',
      date: '2026-02-18',
      mins: 9,
      tags: ['kafka', 'platform'],
      source: 'medium',
      mediumUrl: 'https://medium.com/@jattoabdul',
    },
    {
      slug: 'structured-outputs',
      cat: 'Applied AI',
      title: 'Structuring LLM outputs for downstream reliability',
      excerpt:
        'Why function calling and structured outputs are not the same thing, and when to reach for each.',
      date: '2026-02-05',
      mins: 7,
      tags: ['applied-ai', 'llms'],
      source: 'medium',
      mediumUrl: 'https://medium.com/@jattoabdul',
    },
    {
      slug: 'writing-as-engineer',
      cat: 'Communication',
      title: 'Why I write as an engineer (and you probably should too)',
      excerpt:
        'Writing in public sharpens thinking. It also compounds in ways the resume never will.',
      date: '2026-01-22',
      mins: 4,
      tags: ['communication', 'career'],
      source: 'local',
    },
  ];

  const NOTES = [
    {
      date: 'Apr 20',
      dateFull: '2026-04-20',
      title: 'On idempotency in distributed systems',
      tags: ['backend'],
    },
    {
      date: 'Apr 15',
      dateFull: '2026-04-15',
      title: 'Why I stopped using ORMs for reporting queries',
      tags: ['backend', 'sql'],
    },
    {
      date: 'Apr 08',
      dateFull: '2026-04-08',
      title: 'Prompt caching in production: what actually matters',
      tags: ['applied-ai'],
    },
    {
      date: 'Mar 30',
      dateFull: '2026-03-30',
      title: 'Structured outputs vs function calling',
      tags: ['applied-ai'],
    },
    {
      date: 'Mar 22',
      dateFull: '2026-03-22',
      title: 'The underrated value of boring architecture',
      tags: ['platform'],
    },
    {
      date: 'Mar 14',
      dateFull: '2026-03-14',
      title: 'How I run async standups for distributed teams',
      tags: ['communication'],
    },
    {
      date: 'Mar 06',
      dateFull: '2026-03-06',
      title: 'Notes on Kafka consumer rebalancing in the wild',
      tags: ['platform', 'kafka'],
    },
    {
      date: 'Feb 27',
      dateFull: '2026-02-27',
      title: 'What I look for in senior engineering candidates',
      tags: ['career'],
    },
    {
      date: 'Feb 14',
      dateFull: '2026-02-14',
      title: 'A small note on backpressure',
      tags: ['backend'],
    },
  ];

  const PROJECTS = [
    {
      slug: 'minerva',
      title: 'Minerva',
      tagline: 'Backend & platform for AI-powered AML screening.',
      desc: 'My current engineering home. Building backend and platform systems for AI-powered AML screening, search, reporting, and risk-monitoring workflows.',
      role: 'Senior Engineer',
      year: '2025–present',
      stack: ['Backend', 'Platform', 'Applied-AI', 'Search'],
      status: 'Active',
      icon: 'shieldCheck',
    },
    {
      slug: 'discova',
      title: 'Discova',
      tagline: 'A calmer way to read and discover engineering content.',
      desc: 'A technical reading and discovery product I built to turn scattered engineering content into a calmer, more useful learning flow and discovery experience.',
      role: 'Builder',
      year: '2024–present',
      stack: ['Next.js', 'Postgres', 'Vector search', 'RSS'],
      status: 'Active',
      icon: 'compass',
    },
    {
      slug: 'trustkarry',
      title: 'TrustKarry',
      tagline: 'Peer-to-peer logistics through trusted travelers.',
      desc: 'A peer-to-peer logistics marketplace connecting senders with trusted travelers through structured trip, package, request, and verification workflows.',
      role: 'Founding Engineer',
      year: '2024–2025',
      stack: ['Node.js', 'Postgres', 'Verification', 'Marketplace'],
      status: 'Active',
      icon: 'package',
    },
    {
      slug: 'fera',
      title: 'Fera',
      tagline: 'Multi-platform commerce suite for merchants.',
      desc: 'A multi-platform commerce product suite where I built and led work across reviews, Q&A, messaging, verification, widgets, dashboards, and merchant integrations.',
      role: 'Engineer → Lead',
      year: '2020–2024',
      stack: ['Reviews', 'Q&A', 'Widgets', 'Integrations'],
      status: 'Shipped',
      icon: 'star',
    },
    {
      slug: 'heroshe',
      title: 'Heroshe',
      tagline: 'Logistics platform modernization, in-house.',
      desc: 'A logistics platform modernization effort where I helped move the business from third-party operations tooling toward custom software for shipment, customer, and internal workflows.',
      role: 'Engineer',
      year: '2018–2020',
      stack: ['Rails', 'Postgres', 'Internal tools', 'Ops'],
      status: 'Shipped',
      icon: 'box',
    },
    {
      slug: 'ai-experiments',
      title: 'Applied-AI experiments',
      tagline: 'Public-safe builds exploring LLM workflows.',
      desc: 'Small, public-safe systems for evaluating prompts, routing tasks, and grounding outputs against real data. Where I prove ideas before they enter production.',
      role: 'Solo',
      year: 'Ongoing',
      stack: ['Python', 'TypeScript', 'OpenAI', 'pgvector'],
      status: 'Open Source',
      icon: 'sparkle',
    },
  ];

  const VIDEOS = [
    {
      id: 'v1',
      title: 'Designing for partial connectivity: an African engineering perspective',
      dur: '18:24',
      date: '2026-04',
      kind: 'Long-form',
      platform: 'YouTube',
      views: '12.4k',
    },
    {
      id: 'v2',
      title: 'How I structure prompts for production LLM features',
      dur: '11:02',
      date: '2026-03',
      kind: 'Long-form',
      platform: 'YouTube',
      views: '8.7k',
    },
    {
      id: 'v3',
      title: 'Reading a senior-engineer job description like a staff engineer',
      dur: '07:48',
      date: '2026-02',
      kind: 'Long-form',
      platform: 'YouTube',
      views: '21.3k',
    },
  ];

  const SHORTS = [
    {
      id: 's1',
      title: 'One question that filters bad architecture decisions',
      platform: 'Shorts',
      dur: '0:48',
    },
    {
      id: 's2',
      title: 'The invariant rule I write at the top of every service',
      platform: 'LinkedIn',
      dur: '1:12',
    },
    {
      id: 's3',
      title: 'Why I review my own PRs before requesting reviews',
      platform: 'X',
      dur: '0:55',
    },
    {
      id: 's4',
      title: 'A small habit that makes pairing 2× more useful',
      platform: 'Instagram',
      dur: '0:38',
    },
  ];

  const FOCUS = [
    {
      label: 'Backend & platform systems',
      desc: 'Pipelines, queues, schemas, contracts.',
      icon: 'layers',
    },
    {
      label: 'Applied-AI workflows',
      desc: 'LLMs against real data, with grounding.',
      icon: 'sparkle',
    },
    { label: 'Product building', desc: 'Shipping software customers actually use.', icon: 'box' },
    { label: 'Engineering communication', desc: 'Writing, reviews, async docs.', icon: 'fileText' },
    { label: 'Content creation', desc: 'YouTube, LinkedIn, X, Instagram.', icon: 'camera' },
  ];

  const SOCIAL = {
    linkedin: 'https://linkedin.com/in/jattoade',
    medium: 'https://medium.com/@jattoabdul',
    github: 'https://github.com/jattoabdul',
    x: 'https://x.com/Jattorize',
    youtube: 'https://www.youtube.com/@jatto_abdul',
    instagram: 'https://www.instagram.com/jatto_abdul/',
    email: 'me@jattoabdul.com',
    emailAlt: 'jattoade@gmail.com',
  };

  const fmtDate = iso => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return { POSTS, NOTES, PROJECTS, VIDEOS, SHORTS, FOCUS, SOCIAL, fmtDate };
})();
