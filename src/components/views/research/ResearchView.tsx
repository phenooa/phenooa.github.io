import React from "react";
import { RESEARCH_CARDS } from "../../../data";
import { ShieldAlert, BookOpen, Fingerprint, Layers, CheckCircle } from "lucide-react";
import { ASSETS } from "../../shared/assets";

export default function ResearchView() {
  const iconsList = [
    <Fingerprint className="h-5 w-5 text-brand-glow" />,
    <Layers className="h-5 w-5 text-brand-glow" />,
    <BookOpen className="h-5 w-5 text-brand-glow" />,
    <CheckCircle className="h-5 w-5 text-brand-glow" />
  ];

  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative">
      
      {/* Glow overlays */}
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-brand-electric/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-brand-glow/8 blur-[120px] pointer-events-none" />

      {/* A. Page hero */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto text-left relative z-10 space-y-4">
        <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase">
          [ Scientific Method & Validity ]
        </span>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-tight">
          Research-driven <br />
          <span className="font-serif italic-heavy text-brand-glow">OA phenotyping</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-3xl">
          PhenoOA AI is designed to support phenotype-driven osteoarthritis research, trial stratification, and treatment-response exploration.
        </p>

        <div className="h-[1px] w-full bg-border-panel pt-4" />
      </section>

      {/* Figure 1: Large Prominent View */}
      <section className="px-6 md:px-16 pb-12 max-w-7xl mx-auto relative z-10">
        <div className="rounded-2xl overflow-hidden border border-border-panel bg-bg-panel p-4 md:p-6 flex flex-col items-center justify-center">
          <div className="w-full">
            <p className="font-mono text-[10px] md:text-xs text-text-muted mb-4 text-center uppercase tracking-[0.15em] font-bold">
              Figure 1: Osteoarthritis Phenotypic Structure Mapping
            </p>
            <img 
              src={ASSETS.images.phenotypeStructure} 
              alt="OA Phenotype Structure" 
              className="w-full h-auto object-contain rounded-lg filter brightness-95 contrast-105" 
            />
          </div>
        </div>
      </section>

      {/* B. Key research focus cards */}
      <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {RESEARCH_CARDS.map((item, idx) => (
            <div 
              key={idx}
              className="bg-bg-panel border border-border-panel rounded-2xl p-6 md:p-8 space-y-4 hover:bg-bg-panel-strong hover:border-brand-glow/30 transition-all duration-300 transform hover:-translate-y-1 block text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border-panel">
                <span className="text-[10px] font-mono font-bold tracking-widest text-brand-glow uppercase">{item.tag}</span>
                <div className="h-8 w-8 rounded-lg bg-brand-electric/10 flex items-center justify-center border border-border-panel">
                  {iconsList[idx] || <BookOpen className="h-4.5 w-4.5 text-brand-glow" />}
                </div>
              </div>

              <h3 className="font-display text-lg font-medium text-text-primary">
                {item.title}
              </h3>

              <p className="font-sans text-xs md:text-[13.5px] text-text-secondary leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* C. Publications / Study References */}
      <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto relative z-10 text-left">
        <div className="border-t border-border-panel pt-12 space-y-8">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase block mb-3">
              [ Key Publications & Clinical References ]
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-text-primary">
              Scientific foundation & validation
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ASSETS.content.references.map((ref, idx) => (
              <div 
                key={idx}
                className="bg-bg-panel border border-border-panel rounded-xl p-5 hover:bg-bg-panel-strong hover:border-brand-glow/20 transition-all duration-200 flex gap-4 text-left"
              >
                <span className="font-mono text-xs font-bold text-brand-glow shrink-0 select-none">
                  {(idx + 1).toString().padStart(2, "0")}.
                </span>
                <div className="space-y-1">
                  <p className="font-sans text-xs md:text-[13px] text-text-secondary leading-relaxed font-light">
                    {ref.text}
                  </p>
                  {ref.doi && (
                    <a 
                      href={`https://doi.org/${ref.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-brand-glow hover:underline inline-block pt-1"
                    >
                      doi:{ref.doi}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. Research-use disclaimer component */}
      <section className="px-6 md:px-16 pb-24 max-w-4xl mx-auto relative z-10 text-center">
        <div className="bg-bg-panel border border-border-strong rounded-2xl p-6.5 max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-4 text-left">
          <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-amber-500 mb-1">Research-Use Restriction Notice</h4>
            <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
              PhenoOA AI is intended for research use only and is not a clinical diagnostic tool. The calculations represent deep model probabilities and structural clusters, but do not replace certified physician evaluations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
