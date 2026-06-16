import React, { useState } from "react";
import { 
  ArrowRight, Maximize2, Cpu, TrendingUp, Sparkles, FolderUp, 
  Terminal, ShieldAlert, Monitor, CheckCircle, Database, HelpCircle 
} from "lucide-react";
import { VALUE_CARDS, HIGHLIGHT_BADGES } from "../../data";

interface HomeViewProps {
  onNavigate: (route: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [promptText, setPromptText] = useState("");
  const [isDemoSimulated, setIsDemoSimulated] = useState(false);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    localStorage.setItem("phenooa_s_query", promptText.trim());
    onNavigate("/demo");
  };

  return (
    <div className="w-full text-text-primary">
      {/* SECTION A. HERO SECTION */}
      <section className="relative min-h-[640px] md:min-h-[760px] flex flex-col justify-center bg-gradient-to-b from-bg-main via-bg-surface to-bg-main px-6 md:px-16 py-16 md:py-24 border-b border-border-panel overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute -bottom-48 -left-12 w-[550px] h-[350px] bg-brand-electric rounded-full blur-[120px] opacity-15 pointer-events-none animate-glow-slow" />
        <div className="absolute top-12 right-0 w-[450px] h-[450px] bg-brand-glow rounded-full blur-[140px] opacity-15 pointer-events-none" />
 
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            
            {/* Status Indicator Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-electric/10 border border-brand-electric/25 px-3.5 py-1.5 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-brand-glow shadow-inner">
              <Sparkles className="h-3 w-3 text-brand-glow animate-pulse" />
              <span>Research Release: PhenoOA Studio v0.1.0 Beta</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-[1.1]">
              Turn knee X-rays into <br />
              <span className="font-serif italic-heavy text-brand-glow">actionable</span> OA phenotypes
            </h1>

            <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-2xl">
              PhenoOA AI helps researchers transform knee radiographs into reproducible structural phenotypes, treatment-response insights, and research-ready outputs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate("/about")}
                className="px-6 py-3.5 rounded-full bg-button-primary-bg text-button-primary-text hover:opacity-90 font-display text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>About the Initiative</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate("/demo")}
                className="px-6 py-3.5 rounded-full bg-button-secondary-bg border border-border-panel text-button-secondary-text hover:opacity-90 font-display text-xs font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>View Live Demo</span>
              </button>
            </div>

            {/* Professional Clinical Query Selector Console */}
            <div className="pt-4 max-w-xl space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-glow animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                  Active Clinical Workspace Selector
                </span>
              </div>
              <form
                onSubmit={handlePromptSubmit}
                className="flex items-center bg-bg-panel border border-border-panel p-1.5 rounded-xl shadow-md focus-within:border-brand-glow/40 transition-colors"
              >
                <div className="flex-1 flex items-center gap-2.5 px-3">
                  <span className="text-xs font-mono font-bold text-brand-glow">SUBJECT ID:</span>
                  <input
                    type="text"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="Enter Patient ID (e.g., KL2KAA, KL3GLO, KL3INC)..."
                    className="w-full bg-transparent text-xs text-text-primary placeholder-text-muted/50 outline-hidden font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-electric text-white px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-brand-glow transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Database className="h-4 w-4" />
                  <span>Open Active Patient</span>
                </button>
              </form>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">
                  Quick Select Cohorts:
                </span>
                {[
                  { label: "OAI Patient KL2KAA", val: "KL2KAA" },
                  { label: "OAI Patient KL3GLO", val: "KL3GLO" },
                  { label: "OAI Patient KL3INC", val: "KL3INC" }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPromptText(preset.val);
                      localStorage.setItem("phenooa_s_query", preset.val);
                      onNavigate("/demo");
                    }}
                    className="text-[10.5px] px-2.5 py-1 rounded-full border border-border-panel bg-bg-panel hover:border-brand-glow/30 hover:bg-bg-panel-strong text-text-secondary hover:text-text-primary font-mono transition-all cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Hero Visual Mockup: X-ray -> preprocess -> phenotype -> report */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-border-panel bg-bg-surface p-5 md:p-6 backdrop-blur-md shadow-soft overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-glow/10 rounded-full blur-3xl" />
              
              <div className="flex items-center justify-between pb-4 border-b border-border-panel mb-4">
                <span className="text-[10px] uppercase tracking-wider text-text-secondary opacity-75 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-glow animate-ping" />
                  Visual Inference Pipe
                </span>
                <span className="text-[9px] bg-brand-electric/15 text-brand-glow font-mono px-2 py-0.5 rounded">V3-Active</span>
              </div>

              {/* Step 1: Input Radiograph */}
              <div className="space-y-4">
                <div className="bg-bg-panel border border-border-panel p-3 rounded-xl flex items-center gap-3 animate-pulse-thin">
                  <div className="w-10 h-10 rounded-lg bg-bg-panel-strong flex items-center justify-center border border-border-panel shrink-0">
                    <FolderUp className="h-5 w-5 text-brand-glow" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-mono text-text-primary font-bold">DICOM_081_RAW.dcm</p>
                    <p className="text-[10px] text-text-secondary opacity-80 font-mono">16-bit HDR Matrix</p>
                  </div>
                  <span className="text-[10px] text-brand-glow ml-auto font-mono">Imported</span>
                </div>

                {/* Arrow */}
                <div className="h-5 flex justify-center items-center">
                  <div className="w-[1px] h-full bg-gradient-to-b from-brand-glow to-transparent" />
                </div>

                {/* Step 2: Auto-Preprocessed & Crop area */}
                <div className="bg-bg-panel border border-border-panel p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-bg-panel-strong flex items-center justify-center border border-border-panel shrink-0 relative overflow-hidden">
                    {/* Tiny styled skeleton knee */}
                    <svg className="w-8 h-8 opacity-45 text-text-primary" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 15 C35 30 35 48 35 50 C35 51 65 51 65 50 C65 48 65 30 50 15 Z" />
                      <path d="M50 85 C35 70 35 54 35 52 L65 52 C65 54 65 70 50 85 Z" fill="currentColor" className="text-brand-glow" />
                    </svg>
                    <div className="absolute inset-1 border border-dashed border-brand-glow opacity-60 rounded" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-mono text-text-primary font-bold">Detect knee shape</p>
                    <p className="text-[10px] text-brand-glow font-mono">Detect landmarks & osteophytes</p>
                  </div>
                  <span className="text-[10px] text-brand-glow ml-auto font-mono">24ms</span>
                </div>

                {/* Arrow */}
                <div className="h-5 flex justify-center items-center">
                  <div className="w-[1px] h-full bg-gradient-to-b from-brand-glow to-transparent" />
                </div>

                {/* Step 3: Probabilities & Structural Phenotypes */}
                <div className="bg-bg-panel border border-border-strong p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-brand-glow">Phenotype Probability distribution</span>
                    <span className="text-brand-glow font-semibold">91.4% Conf</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                        <span>Global Atrophy</span>
                        <span>88%</span>
                      </div>
                      <div className="h-1 bg-bg-panel-strong rounded-full overflow-hidden">
                        <div className="h-full bg-brand-glow rounded-full" style={{ width: "88%" }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                        <span>Knee Hypertrophic</span>
                        <span>79%</span>
                      </div>
                      <div className="h-1 bg-bg-panel-strong rounded-full overflow-hidden">
                        <div className="h-full bg-brand-electric rounded-full" style={{ width: "79%" }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION B. SIMPLE VALUE SECTION */}
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
            {VALUE_CARDS.map((card, idx) => {
              return (
                <div 
                  key={idx}
                  className="bg-bg-panel border border-border-panel rounded-2xl p-6.5 text-left space-y-4 hover:shadow-lg hover:border-brand-glow/30 transition-all duration-300 group"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-electric/10 flex items-center justify-center border border-border-panel text-brand-glow group-hover:bg-brand-electric group-hover:text-white transition-all">
                    {idx === 0 && <Maximize2 className="h-5 w-5" />}
                    {idx === 1 && <Cpu className="h-5 w-5" />}
                    {idx === 2 && <TrendingUp className="h-5 w-5" />}
                  </div>
                  
                  <h3 className="font-display text-lg font-medium text-text-primary group-hover:text-brand-glow transition-colors">
                    {card.title}
                  </h3>

                  <p className="font-sans text-xs md:text-[13.5px] text-text-secondary leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION C. PRODUCT HIGHLIGHT SECTION */}
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

          {/* Windows / Mac OS Badges widgets */}
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

      {/* SECTION D. FINAL CTA */}
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
    </div>
  );
}
