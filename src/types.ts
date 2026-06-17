// ──────────────────────────────────────────────
// Domain types used by workspace components
// ──────────────────────────────────────────────

export interface Feature {
  name: string;
  result: string;
  confidence: number;
}

export interface Phenotype {
  name: string;
  probability: number;
  color: string;
}

export type TabType = 'images' | 'analysis' | 'phenotype' | 'export';

// ──────────────────────────────────────────────
// Static content data types (used by data.ts)
// ──────────────────────────────────────────────

export interface ValueCard {
  title: string;
  description: string;
  iconName: string;
}

export interface ScienceCard {
  title: string;
  description: string;
  tag: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  badge: string;
}

export interface DownloadOption {
  os: string;
  subtitle: string;
  pkgType: string;
  btnText: string;
  filename: string;
  size: string;
  version: string;
}

export interface HighlightBadge {
  os: string;
  subtitle: string;
  suffix: string;
  size: string;
}

export interface DemoSubject {
  id: string;
  age: number;
  gender: string;
  klGrade: number;
  assignedPhenotype: string;
  confidence: number;
  lowConfidence: boolean;
  notes: string;
  probabilities: { name: string; value: number }[];
  visualPoints: { x: number; y: number; label: string }[];
}
