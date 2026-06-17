import React from "react";
import { Milestone } from "lucide-react";

const MILESTONES = [
  { year: "2026", period: "Q1 - Q2", title: "Project Initiation & Synthesis", description: "Consolidation of multi-cohort study databases including RESTORE, MESKO, and OAI records to construct high-fidelity deep learning targets." },
  { year: "2026", period: "Q3 - Q4", title: "Biomarker Model Development", description: "Building automated landmark annotation networks and joint space narrowing (JSN) estimation weights using shape-modeling." },
  { year: "2027", period: "Q1 - Q2", title: "Interactive Studio Release", description: "Launching the real-time AI prototype and clinical browser workspace to facilitate multi-center exploratory research." },
  { year: "2027", period: "Q3 - Q4", title: "Validation & Genotyping Study", description: "Running phenotypic correlation pipelines against genetic markers to validate clinical efficacy across cohorts." },
  { year: "2028", period: "Q1 - Q2", title: "Production Framework & Completion", description: "Completing software refinement, compiling native desktop wrappers, and deploying the finalized PhenoOA platform for clinical trials." },
];

export default function TimelineSection() {
  return (
    <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto relative z-10 text-left">
      <div className="border-t border-border-panel pt-16 space-y-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-brand-electric/10 border border-brand-electric/25 flex items-center justify-center">
            <Milestone className="h-4.5 w-4.5 text-brand-glow" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-brand-glow uppercase block">Release Milestones</span>
            <h2 className="font-display text-xl md:text-2xl font-light text-text-primary">Development Roadmap (2026 – 2028)</h2>
          </div>
        </div>

        <div className="relative border-l border-border-panel ml-4 md:ml-6 pl-6 md:pl-10 space-y-8 max-w-4xl">
          {MILESTONES.map((milestone, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-bg-surface border-2 border-brand-glow flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-glow" />
              </div>
              <div className="bg-bg-panel border border-border-panel rounded-xl p-5 md:p-6 hover:bg-bg-panel-strong hover:border-brand-glow/10 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-glow bg-brand-electric/10 px-2 py-0.5 rounded">{milestone.year}</span>
                    <span className="font-mono text-[10.5px] text-text-muted">{milestone.period}</span>
                  </div>
                </div>
                <h3 className="font-display text-sm font-semibold text-text-primary mb-1.5">{milestone.title}</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
