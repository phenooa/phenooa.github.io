import React from "react";
import { FEATURE_GRID_ITEMS } from "../../data";
import { ArrowRight, FolderDown, ScanLine, Sun, Heart, Cpu, FileSpreadsheet } from "lucide-react";

export default function FeaturesView() {
  const steps = [
    { num: "01", name: "Ingestion", desc: "DICOM image ingestion" },
    { num: "02", name: "Localization", desc: "Joint space cropping" },
    { num: "03", name: "Landmarks", desc: "129-point localization" },
    { num: "04", name: "Segmentation", desc: "Osteophyte profiling" },
    { num: "05", name: "Phenotype", desc: "Phenotype prediction" },
    { num: "06", name: "Review", desc: "Interactive review" }
  ];

  const iconsList = [
    <FolderDown className="h-5 w-5 text-brand-glow" />,
    <ScanLine className="h-5 w-5 text-brand-glow" />,
    <Sun className="h-5 w-5 text-brand-glow" />,
    <Heart className="h-5 w-5 text-brand-glow" />,
    <Cpu className="h-5 w-5 text-brand-glow" />,
    <FileSpreadsheet className="h-5 w-5 text-brand-glow" />
  ];

  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative">
      
      {/* Glow overlays */}
      <div className="absolute top-1/4 right-[8%] w-[400px] h-[400px] bg-brand-electric/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] bg-brand-glow/8 blur-[110px] pointer-events-none" />

      {/* A. Page hero */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto text-left relative z-10 space-y-4">
        <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase">
          [ Software Features ]
        </span>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-tight">
          Everything needed for <br />
          <span className="font-serif italic-heavy text-brand-glow">phenotype analysis</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-3xl">
          From raw knee radiographs to structured research outputs in one workflow. No extra academic setup or coding required.
        </p>

        <div className="h-[1px] w-full bg-border-panel pt-4" />
      </section>

      {/* B. Feature grid */}
      <section className="px-6 md:px-16 pb-16 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURE_GRID_ITEMS.map((item, idx) => (
            <div 
              key={idx}
              className="bg-bg-panel border border-border-panel rounded-2xl p-6 text-left space-y-4 hover:border-brand-glow/40 hover:bg-bg-panel-strong transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border-panel">
                <span className="text-[9px] font-mono font-bold tracking-widest text-brand-glow px-2.5 py-0.5 rounded bg-brand-electric/15 uppercase">
                  {item.badge}
                </span>
                
                <div className="text-brand-glow p-1 bg-bg-panel-strong rounded-lg border border-border-panel shrink-0">
                  {iconsList[idx] || <Cpu className="h-5 w-5" />}
                </div>
              </div>

              <h3 className="font-display text-base md:text-md font-semibold text-text-primary">
                {item.title}
              </h3>

              <p className="font-sans text-xs md:text-[13px] text-text-secondary leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* C. Workflow strip - horizontal steps list */}
      <section className="px-6 md:px-16 pb-24 max-w-7xl mx-auto relative z-10">
        <div className="bg-bg-panel border border-border-panel rounded-2xl p-6 md:p-8 space-y-8">
          <div className="text-left">
            <h3 className="font-display text-sm uppercase tracking-[0.15em] text-brand-glow font-bold">Recommended Inference Pipeline</h3>
            <p className="font-sans text-[13px] text-text-muted font-light mt-1">Structured stream pattern calculated automatically during image batch executions</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className="relative bg-bg-panel-strong border border-border-panel rounded-xl p-4 text-left space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-text-secondary">
                  <span className="font-bold text-brand-glow">{s.num}</span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-text-muted opacity-40 hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">{s.name}</h4>
                  <p 
                    className="text-[9.5px] text-text-muted leading-snug font-sans font-light mt-1 whitespace-nowrap overflow-hidden text-ellipsis"
                    title={s.desc}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
