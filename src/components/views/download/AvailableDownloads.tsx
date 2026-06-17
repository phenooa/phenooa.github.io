import React from "react";
import { Download, Apple, Database, Cpu, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

interface AvailableDownloadsProps {
  downloadStates: Record<"macos" | "samples", "idle" | "complete">;
  onDownload: (target: "macos" | "samples") => void;
  onReset: (target: "macos" | "samples") => void;
}

export default function AvailableDownloads({ downloadStates, onDownload, onReset }: AvailableDownloadsProps) {
  return (
    <section className="px-6 md:px-16 pb-12 max-w-7xl mx-auto relative z-10">
      <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-brand-glow uppercase mb-6 block text-left">
        [ Available Downloads ]
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* macOS (Universal) */}
        <div className="bg-bg-panel border border-brand-glow/30 shadow-[0_0_20px_rgba(45,212,191,0.06)] rounded-2xl p-6.5 hover:border-brand-glow transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-glow/5 blur-2xl pointer-events-none" />
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
                <Apple className="h-5 w-5 text-brand-glow" />
              </div>
              <span className="bg-brand-electric/10 border border-brand-glow/20 text-brand-glow font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                Recommended
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-text-primary">macOS Desktop Client</h3>
              <p className="font-mono text-[10.5px] text-brand-glow uppercase mt-1 tracking-wider">v0.1.0-beta • macOS Apple Silicon</p>
              <p className="font-sans text-xs text-text-muted mt-2 font-light leading-relaxed">
                Optimized for Apple Silicon (M1/M2/M3/M4) devices running macOS. Built natively to accelerate automated deep learning segmentation and phenotyping pipelines off-grid.
              </p>
            </div>
            <div className="border-t border-border-panel pt-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <Cpu className="h-3.5 w-3.5 text-brand-glow" />
                <span>Architecture: Apple Silicon (ARM64)</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-glow" />
                <span>Verified SHA-256 Signatures</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            {downloadStates.macos === "idle" && (
              <button
                onClick={() => onDownload("macos")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-button-primary-bg text-button-primary-text hover:bg-brand-glow p-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                <Download className="h-4 w-4" />
                <span>Download macOS Installer</span>
              </button>
            )}
            {downloadStates.macos === "complete" && (
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-xl">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-sans text-xs text-emerald-400 font-medium">Download initialized!</span>
                </div>
                <button
                  onClick={() => onReset("macos")}
                  className="w-full text-center font-mono text-[10px] text-brand-glow hover:underline cursor-pointer uppercase tracking-wider"
                >
                  Reset & Download Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Clinical Sample Data */}
        <div className="bg-bg-panel border border-brand-glow/30 shadow-[0_0_20px_rgba(45,212,191,0.06)] rounded-2xl p-6.5 hover:border-brand-glow transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-glow/5 blur-2xl pointer-events-none" />
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
                <Database className="h-5 w-5 text-brand-glow" />
              </div>
              <span className="bg-brand-electric/10 border border-brand-glow/20 text-brand-glow font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                Dataset
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-text-primary">Clinical Sample Data</h3>
              <p className="font-mono text-[10.5px] text-brand-glow uppercase mt-1 tracking-wider">v0.1.0-beta • ZIP Archive</p>
              <p className="font-sans text-xs text-text-muted mt-2 font-light leading-relaxed">
                Contains anonymized osteoarthritic knee sequences. Provided to verify workspace diagnostic layers, test automated segmentation, and validate local inference results.
              </p>
            </div>
            <div className="border-t border-border-panel pt-4 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <Lock className="h-3.5 w-3.5 text-brand-glow" />
                <span>Format: Password Protected ZIP Archive</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-glow" />
                <span>Anonymized Patient Identifiers (HIPAA compliant)</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            {downloadStates.samples === "idle" && (
              <button
                onClick={() => onDownload("samples")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-button-primary-bg text-button-primary-text hover:bg-brand-glow p-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                <Download className="h-4 w-4" />
                <span>Download Sample Dataset</span>
              </button>
            )}
            {downloadStates.samples === "complete" && (
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-xl">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-sans text-xs text-emerald-400 font-medium">Download initialized!</span>
                </div>
                <button
                  onClick={() => onReset("samples")}
                  className="w-full text-center font-mono text-[10px] text-brand-glow hover:underline cursor-pointer uppercase tracking-wider"
                >
                  Reset & Download Again
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
