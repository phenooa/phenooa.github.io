import React from "react";
import { ASSETS } from "../shared/assets";
import { Users, Calendar, ShieldCheck, Milestone } from "lucide-react";

export default function AboutView() {
  const team = [
    {
      name: "Prof. David Hunter",
      role: "Lead Investigator",
      institution: "University of Sydney",
      avatar: ASSETS.images.teamAvatars.profDavidHunter,
      description: "Globally renowned osteoarthritis researcher leading clinical implementation and study design paradigms."
    },
    {
      name: "Dr. Ben Faber",
      role: "Clinical Lead",
      institution: "University of Bristol",
      avatar: ASSETS.images.teamAvatars.drBenFaber,
      description: "Clinical rheumatologist specialising in the genetic and structural phenotypes of joint degeneration."
    },
    {
      name: "Tommy Nguyen",
      role: "Lead Systems Engineer",
      institution: "University of Sydney",
      avatar: ASSETS.images.teamAvatars.tommyNguyen,
      description: "Developer overseeing full-stack interface engineering, model integrations, and prototype design."
    }
  ];

  const milestones = [
    {
      year: "2026",
      period: "Q1 - Q2",
      title: "Project Initiation & Synthesis",
      description: "Consolidation of multi-cohort study databases including RESTORE, MESKO, and OAI records to construct high-fidelity deep learning targets."
    },
    {
      year: "2026",
      period: "Q3 - Q4",
      title: "Biomarker Model Development",
      description: "Building automated landmark annotation networks and joint space narrowing (JSN) estimation weights using shape-modeling."
    },
    {
      year: "2027",
      period: "Q1 - Q2",
      title: "Interactive Studio Release",
      description: "Launching the real-time AI prototype and clinical browser workspace to facilitate multi-center exploratory research."
    },
    {
      year: "2027",
      period: "Q3 - Q4",
      title: "Validation & Genotyping Study",
      description: "Running phenotypic correlation pipelines against genetic markers to validate clinical efficacy across cohorts."
    },
    {
      year: "2028",
      period: "Q1 - Q2",
      title: "Production Framework & Completion",
      description: "Completing software refinement, compiling native desktop wrappers, and deploying the finalized PhenoOA platform for clinical trials."
    }
  ];

  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative pb-24 min-h-screen">
      
      {/* Glow ambient overlays */}
      <div className="absolute top-20 left-[15%] w-[400px] h-[400px] bg-brand-electric/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[10%] w-[350px] h-[350px] bg-brand-glow/8 blur-[120px] pointer-events-none" />

      {/* Hero section */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto text-left relative z-10 space-y-4 animate-in fade-in duration-300">
        <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase block">
          [ Consortium & Roadmap ]
        </span>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-tight">
          About the <br />
          <span className="font-serif italic-heavy text-brand-glow">Initiative</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-3xl">
          The PhenoOA AI project brings together leading rheumatology researchers, computational scientists, and vision systems developers from world-class research institutions to standardize OA phenotype classification protocols.
        </p>

        <div className="h-[1px] w-full bg-border-panel pt-4" />
      </section>

      {/* Development Team Grid */}
      <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto relative z-10 text-left">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-brand-electric/10 border border-brand-electric/25 flex items-center justify-center">
              <Users className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-glow uppercase block">Development Team</span>
              <h2 className="font-display text-xl md:text-2xl font-light text-text-primary">Medical Investigators & AI Engineers</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div 
                key={i}
                className="bg-bg-panel border border-border-panel rounded-2xl p-6 hover:bg-bg-panel-strong hover:border-brand-glow/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-14 h-14 rounded-full object-cover border border-border-strong group-hover:scale-105 transition-transform duration-300 filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-display text-base font-semibold text-text-primary group-hover:text-brand-glow transition-colors">
                        {member.name}
                      </h3>
                      <p className="font-mono text-[10.5px] uppercase tracking-wider text-brand-glow mt-0.5">
                        {member.role}
                      </p>
                      <p className="font-sans text-[11px] text-text-muted mt-0.5 font-light">
                        {member.institution}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed font-light mt-2">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Confirming Researchers Placeholder */}
            <div className="bg-bg-panel/40 border border-dashed border-border-panel rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-dashed border-border-panel flex items-center justify-center bg-bg-surface text-text-muted text-lg font-light">
                    +
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-text-secondary">
                      Collaborative Consortium
                    </h3>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-brand-glow">
                      Confirming affiliation
                    </p>
                  </div>
                </div>
                <p className="font-sans text-xs text-text-muted leading-relaxed font-light">
                  A select group of international clinical rheumatologists, vision AI pioneers, and orthopaedic surgeons are currently confirming their participations. Institutional updates and credential highlights will be detailed in future releases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Timeline & Milestones (2026 - 2028 Completion) */}
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
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Visual marker dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-bg-surface border-2 border-brand-glow flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-glow" />
                </div>

                <div className="bg-bg-panel border border-border-panel rounded-xl p-5 md:p-6 hover:bg-bg-panel-strong hover:border-brand-glow/10 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-glow bg-brand-electric/10 px-2 py-0.5 rounded">
                        {milestone.year}
                      </span>
                      <span className="font-mono text-[10.5px] text-text-muted">
                        {milestone.period}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-text-primary mb-1.5">
                    {milestone.title}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety clinical disclaimer strip */}
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
