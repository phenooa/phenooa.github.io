import React from "react";

interface CtaSectionProps {
  onNavigate: (route: string) => void;
}

export default function CtaSection({ onNavigate }: CtaSectionProps) {
  return (
    <section className="relative px-6 md:px-16 py-24 text-center bg-gradient-to-b from-bg-surface to-bg-main overflow-hidden border-b border-border-panel">
      
      {/* Soft neon blue bottom overflow accent */}
      <div className="absolute bottom-0 right-[15%] w-[450px] h-[250px] bg-brand-glow/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase">
          [ Start Immediately ]
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-tight">
          Ready to phenotype your <br />
          <span className="font-serif italic-heavy text-brand-glow">OA imaging</span> dataset?
        </h2>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-2xl mx-auto">
          Get instant access to reproducible radiographic evaluation pipelines. Bring absolute structural clarity and cohort stratification directly to your computer terminal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate("/download")}
            className="px-7 py-4.5 rounded-full bg-button-primary-bg text-button-primary-text hover:opacity-90 font-display text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            Download Studio
          </button>
          <button
            onClick={() => onNavigate("/about")}
            className="px-6 py-4.5 rounded-full bg-button-secondary-bg border border-border-panel text-button-secondary-text hover:opacity-90 font-display text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            About Consortium
          </button>
          <button
            onClick={() => onNavigate("/demo")}
            className="px-6 py-4.5 rounded-full bg-button-secondary-bg border border-border-panel text-button-secondary-text hover:opacity-90 font-display text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            Open Live Demo
          </button>
        </div>
      </div>
    </section>
  );
}
