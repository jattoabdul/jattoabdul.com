import type { LucideIcon } from 'lucide-react';
import { Boxes, Sparkles, Package, FileText, Camera } from 'lucide-react';

export type FocusItem = {
  label: string;
  desc: string;
  icon: LucideIcon;
};

export const focusItems: FocusItem[] = [
  {
    label: 'Backend & platform systems',
    desc: 'Pipelines, queues, schemas, contracts.',
    icon: Boxes,
  },
  {
    label: 'Applied-AI workflows',
    desc: 'LLMs against real data, with grounding.',
    icon: Sparkles,
  },
  {
    label: 'Product building',
    desc: 'Shipping software customers actually use.',
    icon: Package,
  },
  {
    label: 'Engineering communication',
    desc: 'Writing, reviews, async docs.',
    icon: FileText,
  },
  {
    label: 'Content creation',
    desc: 'YouTube, LinkedIn, X, Instagram.',
    icon: Camera,
  },
];
