import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, Compass, Package, Star, Box, Sparkles } from 'lucide-react';

export type ProjectStatus = 'Active' | 'Shipped' | 'Open Source' | 'Archived';

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  stack: string[];
  status: ProjectStatus;
  icon: LucideIcon;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'minerva',
    title: 'Minerva',
    tagline: 'AI-powered AML screening: backend, search, reporting, platform.',
    description:
      'AI-powered AML screening software where I build backend, search, reporting, and platform workflows for sanctions, PEP, adverse media, and ongoing monitoring.',
    role: 'Senior Engineer',
    year: '2025–present',
    stack: ['Backend', 'Platform', 'Applied-AI', 'Search'],
    status: 'Active',
    icon: ShieldCheck,
  },
  {
    slug: 'discova',
    title: 'Discova',
    tagline: 'A calmer way to read and discover engineering content.',
    description:
      'A technical reading and discovery product I built to turn scattered engineering links into a calmer, more useful learning flow.',
    role: 'Builder',
    year: '2026–present',
    stack: ['Next.js', 'Rust', 'Postgres', 'Vector search', 'RSS'],
    status: 'Active',
    icon: Compass,
  },
  {
    slug: 'trustkarry',
    title: 'TrustKarry',
    tagline: 'Peer-to-peer logistics marketplace connecting senders to trusted travelers.',
    description:
      'A peer-to-peer logistics marketplace connecting senders with trusted travelers through structured trip, package, request, and verification workflows.',
    role: 'Founding Engineer',
    year: '2025–present',
    stack: ['Golang', 'Next.js', 'Postgres', 'Verification', 'Marketplace'],
    status: 'Active',
    icon: Package,
  },
  {
    slug: 'fera',
    title: 'Fera',
    tagline: 'Multi-platform commerce suite for merchants.',
    description:
      'A multi-platform commerce product suite where I built and led work across reviews, Q&A, messaging, verification, widgets, dashboards, and merchant integrations.',
    role: 'Engineer → Lead',
    year: '2020–2026',
    stack: ['Ruby-On-Rails', 'Reviews', 'Q&A', 'Widgets', 'Integrations'],
    status: 'Shipped',
    icon: Star,
  },
  {
    slug: 'heroshe',
    title: 'Heroshe',
    tagline: 'Ship-for-me and Shop-for-me logistics and import infrastructure services.',
    description:
      'A logistics platform modernization effort where I helped move the business from third-party operations tooling toward custom software for shipment, customer, and internal workflows.',
    role: 'Engineer',
    year: '2018–2025',
    stack: ['Rails', 'Postgres', 'Internal tools', 'Ops'],
    status: 'Shipped',
    icon: Box,
  },
  {
    slug: 'ai-experiments',
    title: 'Applied-AI experiments',
    tagline: 'Public-safe builds exploring LLM workflows.',
    description:
      'Public-safe experiments exploring LLM workflows, task routing, evaluation, and grounded product-building patterns.',
    role: 'Solo',
    year: 'Ongoing',
    stack: ['Golang', 'Python', 'TypeScript', 'OpenAI', 'pgvector'],
    status: 'Open Source',
    icon: Sparkles,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
