import React from "react";
import { Users } from "lucide-react";
import { ASSETS } from "../../shared/assets";

const TEAM = [
  {
    name: "Prof. David Hunter",
    role: "Lead Investigator",
    institution: "University of Sydney",
    avatar: ASSETS.images.teamAvatars.profDavidHunter,
    description: "Globally renowned osteoarthritis researcher leading clinical implementation and study design paradigms.",
  },
  {
    name: "Dr. Ben Faber",
    role: "Clinical Lead",
    institution: "University of Bristol",
    avatar: ASSETS.images.teamAvatars.drBenFaber,
    description: "Clinical rheumatologist specialising in the genetic and structural phenotypes of joint degeneration.",
  },
  {
    name: "Tommy Nguyen",
    role: "Lead Systems Engineer",
    institution: "University of Sydney",
    avatar: ASSETS.images.teamAvatars.tommyNguyen,
    description: "Developer overseeing full-stack interface engineering, model integrations, and prototype design.",
  },
];

export default function TeamSection() {
  return (
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
          {TEAM.map((member, i) => (
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
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-brand-glow mt-0.5">{member.role}</p>
                    <p className="font-sans text-[11px] text-text-muted mt-0.5 font-light">{member.institution}</p>
                  </div>
                </div>
                <p className="font-sans text-xs text-text-secondary leading-relaxed font-light mt-2">{member.description}</p>
              </div>
            </div>
          ))}

          {/* Placeholder card */}
          <div className="bg-bg-panel/40 border border-dashed border-border-panel rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-dashed border-border-panel flex items-center justify-center bg-bg-surface text-text-muted text-lg font-light">+</div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-text-secondary">Collaborative Consortium</h3>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-brand-glow">Confirming affiliation</p>
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
  );
}
