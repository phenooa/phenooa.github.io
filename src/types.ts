export interface BenchmarkBar {
  name: string;
  value: number;
}

export interface BenchmarkGroup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bars: BenchmarkBar[];
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ProductItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  gradientFrom: string;
  gradientTo: string;
}

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

