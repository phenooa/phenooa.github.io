import React from "react";
import { Monitor, Terminal, Cpu, ShieldCheck } from "lucide-react";

export default function UpcomingPlatforms() {
  return (
    <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto relative z-10">
      <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-text-muted uppercase mb-6 block text-left">
        [ Upcoming Platforms ]
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Windows x64 */}
        <div className="bg-bg-panel/40 border border-border-panel rounded-2xl p-6.5 flex flex-col justify-between relative overflow-hidden text-left opacity-65 group">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-border-panel flex items-center justify-center">
                <Monitor className="h-5 w-5 text-text-muted" />
              </div>
              <span className="bg-border-panel text-text-muted font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                In Development
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-text-muted group-hover:text-text-secondary transition-colors">Windows Desktop</h3>
              <p className="font-mono text-[10.5px] text-text-muted uppercase mt-1 tracking-wider">v1.1.0 • Windows x64</p>
              <p className="font-sans text-xs text-text-muted mt-2 font-light leading-relaxed">
                Standalone Win64 builds targeting CUDA graphic stacks and DirectML pipeline structures. Currently compiling framework references.
              </p>
            </div>
            <div className="border-t border-border-panel pt-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <Cpu className="h-3.5 w-3.5" />
                <span>Architecture: x64 Intel / AMD</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Scheduled release: Late 2026</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button disabled className="w-full rounded-xl bg-border-panel text-text-muted py-3.5 text-xs font-semibold uppercase tracking-wider cursor-not-allowed border border-transparent">
              Framework Preparing
            </button>
          </div>
        </div>

        {/* Linux x64 */}
        <div className="bg-bg-panel/40 border border-border-panel rounded-2xl p-6.5 flex flex-col justify-between relative overflow-hidden text-left opacity-65 group">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-border-panel flex items-center justify-center">
                <Terminal className="h-5 w-5 text-text-muted" />
              </div>
              <span className="bg-border-panel text-text-muted font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                In Development
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-text-muted group-hover:text-text-secondary transition-colors">Linux standalones</h3>
              <p className="font-mono text-[10.5px] text-text-muted uppercase mt-1 tracking-wider">v1.1.0 • AppImage / .deb</p>
              <p className="font-sans text-xs text-text-muted mt-2 font-light leading-relaxed">
                Dynamic shared libs and glibc targets for containerized workstation rigs and open clinical research structures.
              </p>
            </div>
            <div className="border-t border-border-panel pt-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <Cpu className="h-3.5 w-3.5" />
                <span>Architecture: x86_64 Glibc-2.31+</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Scheduled release: Late 2026</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button disabled className="w-full rounded-xl bg-border-panel text-text-muted py-3.5 text-xs font-semibold uppercase tracking-wider cursor-not-allowed border border-transparent">
              Build Pipeline Staged
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
