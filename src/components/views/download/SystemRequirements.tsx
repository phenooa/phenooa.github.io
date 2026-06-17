import React from "react";
import { Apple, Monitor, Cpu, Database, HardDrive, Layers } from "lucide-react";

export default function SystemRequirements() {
  return (
    <section className="px-6 md:px-16 pb-20 max-w-4xl mx-auto relative z-10 text-left">
      <h2 className="font-mono text-[10px] font-bold tracking-[0.25em] text-brand-glow uppercase mb-6 block text-center">
        [ System Requirements ]
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* macOS Specs */}
        <div className="bg-bg-panel/40 backdrop-blur-md border border-border-panel rounded-2xl p-6 hover:border-brand-glow/30 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 border-b border-border-panel pb-4 mb-4">
              <div className="p-2.5 rounded-xl bg-brand-glow/10 border border-brand-glow/20 flex items-center justify-center">
                <Apple className="h-4 w-4 text-brand-glow" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[13.5px] text-text-primary tracking-tight">macOS Client</h3>
                <p className="font-mono text-[9px] text-text-muted uppercase tracking-wider">Universal Binary</p>
              </div>
            </div>
            <SpecList specs={MAC_SPECS} />
          </div>
        </div>

        {/* Windows Specs */}
        <div className="bg-bg-panel/40 backdrop-blur-md border border-border-panel rounded-2xl p-6 hover:border-brand-glow/30 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 border-b border-border-panel pb-4 mb-4">
              <div className="p-2.5 rounded-xl bg-brand-glow/10 border border-brand-glow/20 flex items-center justify-center">
                <Monitor className="h-4 w-4 text-brand-glow" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[13.5px] text-text-primary tracking-tight">Windows Client</h3>
                <p className="font-mono text-[9px] text-text-muted uppercase tracking-wider">x64 Architecture</p>
              </div>
            </div>
            <SpecList specs={WIN_SPECS} />
          </div>
        </div>
      </div>

      {/* Storage footnote */}
      <div className="mt-3.5 text-[11px] text-text-muted font-light flex items-start gap-2 px-1">
        <span className="text-brand-glow font-bold text-xs leading-none mt-0.5">*</span>
        <span>
          <strong className="text-text-secondary font-medium">Storage Workspace:</strong> Recommended free space scales with your data. Ensure you have at least <strong className="text-text-primary font-semibold">2x the size of your raw datasets</strong> available as free space to act as a temporary processing buffer and workspace cache.
        </span>
      </div>

      {/* Local vs Cloud AI comparison */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-bg-panel/35 border border-border-panel/80 rounded-xl p-4 flex gap-3.5 items-start hover:border-brand-glow/20 transition-all duration-300">
          <div className="p-1.5 rounded-lg bg-brand-glow/5 border border-brand-glow/10 shrink-0">
            <Cpu className="h-4 w-4 text-brand-glow" />
          </div>
          <div>
            <h4 className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-text-primary mb-1">Local AI (Offline Mode)</h4>
            <p className="font-sans text-[11px] text-text-secondary leading-relaxed font-light">
              Runs completely on <strong className="text-text-primary font-medium">CPU</strong> (no dedicated GPU needed). Bundles 4 ONNX models (~598.5 MB total), requiring <strong className="text-text-primary font-medium">1.5 GB – 2.5 GB</strong> runtime RAM footprint.
            </p>
          </div>
        </div>
        <div className="bg-bg-panel/35 border border-border-panel/80 rounded-xl p-4 flex gap-3.5 items-start hover:border-brand-glow/20 transition-all duration-300">
          <div className="p-1.5 rounded-lg bg-brand-glow/5 border border-brand-glow/10 shrink-0">
            <Database className="h-4 w-4 text-brand-glow" />
          </div>
          <div>
            <h4 className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-text-primary mb-1">Cloud AI (API Mode)</h4>
            <p className="font-sans text-[11px] text-text-secondary leading-relaxed font-light">
              Lightweight build (~500 MB disk). Offloads model calculations remotely. Requires a stable broadband link with <strong className="text-text-primary font-medium">upload speeds &gt; 15-20 Mbps</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Internal helpers
// ──────────────────────────────────────────────

interface SpecRow {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  isLast?: boolean;
}

function SpecList({ specs }: { specs: SpecRow[] }) {
  return (
    <div className="space-y-3">
      {specs.map((s, i) => (
        <div key={i} className={`flex items-center justify-between text-xs py-1.5 ${s.isLast ? "" : "border-b border-border-panel/30"}`}>
          <span className="text-text-muted font-light flex items-center gap-2">
            {s.icon}
            <span>{s.label}</span>
          </span>
          <span className="text-text-secondary text-right font-light">{s.value}</span>
        </div>
      ))}
    </div>
  );
}

const MAC_SPECS: SpecRow[] = [
  {
    icon: <Cpu className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Processor",
    value: <>Apple <span className="text-text-primary font-medium">M1/M2/M3/M4</span> <span className="text-text-muted text-[10px]">(or Core i5+)</span></>,
  },
  {
    icon: <Database className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Memory",
    value: <><span className="text-text-primary font-medium">8 GB</span> <span className="text-text-muted text-[10px]">(16 GB recommended)</span></>,
  },
  {
    icon: <HardDrive className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Storage",
    value: <><span className="text-text-primary font-medium">2 GB SSD</span> <span className="text-text-muted text-[10px]">(500 MB for Cloud)</span></>,
  },
  {
    icon: <Layers className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Operating System",
    value: <>macOS 10.15+ <span className="text-text-muted text-[10px]">(Catalina+)</span></>,
    isLast: true,
  },
];

const WIN_SPECS: SpecRow[] = [
  {
    icon: <Cpu className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Processor",
    value: <>Intel i5 / Ryzen 5 <span className="text-text-muted text-[10px]">(4+ Cores)</span></>,
  },
  {
    icon: <Database className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Memory",
    value: <><span className="text-text-primary font-medium">8 GB</span> <span className="text-text-muted text-[10px]">(16 GB recommended)</span></>,
  },
  {
    icon: <HardDrive className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Storage",
    value: <><span className="text-text-primary font-medium">2 GB SSD</span> <span className="text-text-muted text-[10px]">(10 GB NVMe rec.)</span></>,
  },
  {
    icon: <Layers className="h-3.5 w-3.5 text-brand-glow/65" />,
    label: "Operating System",
    value: <>Windows 10 / 11 <span className="text-text-muted text-[10px]">(64-bit)</span></>,
    isLast: true,
  },
];
