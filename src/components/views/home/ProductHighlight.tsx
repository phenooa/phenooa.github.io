import React from "react";
import { ArrowRight, Monitor } from "lucide-react";
import { HIGHLIGHT_BADGES } from "../../../data";

interface ProductHighlightProps {
  onNavigate: (route: string) => void;
}

export default function ProductHighlight({ onNavigate }: ProductHighlightProps) {
  return (
    <section className="relative overflow-hidden bg-bg-main px-6 md:px-16 py-20 border-b border-border-panel text-text-primary">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-glow/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text columns */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase">
            [ Desktop Solution ]
          </span>
          
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-text-primary leading-tight">
            Built as a <br />
            <span className="font-serif italic-heavy text-brand-glow">desktop research</span> studio
          </h2>

          <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-lg">
            PhenoOA Studio packages the PhenoOA AI pipeline into a clean desktop interface for image preprocessing, phenotype analysis, and research export.
          </p>

          <button
            onClick={() => onNavigate("/download")}
            className="px-5 py-2.5 rounded-full bg-button-primary-bg text-button-primary-text hover:opacity-90 font-display text-xs font-semibold hover:bg-brand-glow transition-all uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <span>Download Studio</span> <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Platform badges */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIGHLIGHT_BADGES.map((badge, idx) => (
            <div 
              key={idx}
              onClick={() => onNavigate("/download")}
              className="bg-bg-panel border border-border-panel rounded-xl p-5 hover:bg-bg-panel-strong hover:border-brand-glow/40 transition-all cursor-pointer text-left space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <Monitor className="h-6 w-6 text-brand-glow group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-mono text-text-muted">{badge.size}</span>
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-text-primary tracking-widest uppercase">{badge.os} Platform</h4>
                <p className="text-[11px] text-text-secondary mt-1">{badge.subtitle}</p>
              </div>
              <div className="text-[10px] font-mono text-text-muted flex items-center gap-1">
                <span>Package: {badge.suffix} file extension</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
