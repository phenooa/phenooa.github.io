import React from "react";
import { Maximize2, Cpu, TrendingUp } from "lucide-react";
import { VALUE_CARDS } from "../../../data";

export default function ValueSection() {
  const icons = [
    <Maximize2 className="h-5 w-5" />,
    <Cpu className="h-5 w-5" />,
    <TrendingUp className="h-5 w-5" />,
  ];

  return (
    <section className="relative bg-bg-surface text-text-primary px-6 md:px-16 py-20 overflow-hidden border-b border-border-panel">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--brand-glow)_0.015,transparent_1px),linear-gradient(to_bottom,var(--brand-glow)_0.015,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase">
            [ Standard Workflows ]
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-text-primary">
            Automate OA imaging research simply
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-bg-panel border border-border-panel rounded-2xl p-6.5 text-left space-y-4 hover:shadow-lg hover:border-brand-glow/30 transition-all duration-300 group"
            >
              <div className="h-10 w-10 rounded-xl bg-brand-electric/10 flex items-center justify-center border border-border-panel text-brand-glow group-hover:bg-brand-electric group-hover:text-white transition-all">
                {icons[idx]}
              </div>
              <h3 className="font-display text-lg font-medium text-text-primary group-hover:text-brand-glow transition-colors">
                {card.title}
              </h3>
              <p className="font-sans text-xs md:text-[13.5px] text-text-secondary leading-relaxed font-light">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
