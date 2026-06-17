import React from "react";
import { ShieldCheck } from "lucide-react";
import TeamSection from "./TeamSection";
import TimelineSection from "./TimelineSection";

export default function AboutView() {
  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative pb-24 min-h-screen">
      {/* Glow ambient overlays */}
      <div className="absolute top-20 left-[15%] w-[400px] h-[400px] bg-brand-electric/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[10%] w-[350px] h-[350px] bg-brand-glow/8 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto text-left relative z-10 space-y-4 animate-in fade-in duration-300">
        <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase block">[ Consortium & Roadmap ]</span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-tight">
          About the <br />
          <span className="font-serif italic-heavy text-brand-glow">Initiative</span>
        </h1>
        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-3xl">
          The PhenoOA AI project brings together leading rheumatology researchers, computational scientists, and vision systems developers from world-class research institutions to standardize OA phenotype classification protocols.
        </p>
        <div className="h-[1px] w-full bg-border-panel pt-4" />
      </section>

      <TeamSection />
      <TimelineSection />

      {/* Safety disclaimer */}
      <section className="px-6 md:px-16 pb-12 max-w-4xl mx-auto relative z-10 text-center">
        <div className="bg-bg-panel border border-border-strong rounded-2xl p-6.5 max-w-2xl mx-auto flex items-start gap-4 text-left">
          <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-amber-500 mb-1">Confidential & Proprietary Protocol</h4>
            <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
              This roadmap represents strategic engineering projections for the PhenoOA research consortium. Software completions and releases are subject to ongoing clinical verification protocols and board reviews.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
