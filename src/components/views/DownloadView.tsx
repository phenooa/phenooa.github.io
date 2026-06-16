import React, { useState } from "react";
import { Download, Apple, Monitor, Terminal, CheckCircle2, ShieldCheck, Cpu, Lock, Database } from "lucide-react";

export default function DownloadView() {
  const [downloadStates, setDownloadStates] = useState<Record<"macos" | "samples", "idle" | "complete">>({
    macos: "idle",
    samples: "idle"
  });

  const handleDownloadClick = (target: "macos" | "samples") => {
    if (target === "macos") {
      window.location.href = "https://github.com/tommyngx/release/releases/download/pheno_v0.1.0/PhenoOA.zip";
    } else if (target === "samples") {
      window.location.href = "https://github.com/tommyngx/release/releases/download/pheno_v0.1.0/Samples.zip";
    }

    setDownloadStates((prev) => ({
      ...prev,
      [target]: "complete"
    }));
  };

  const resetDownload = (target: "macos" | "samples") => {
    setDownloadStates((prev) => ({
      ...prev,
      [target]: "idle"
    }));
  };

  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative pb-24 min-h-screen font-sans">

      {/* Background radial glow */}
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-brand-electric/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-brand-glow/8 blur-[120px] pointer-events-none" />

      {/* Header section */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto text-left relative z-10 space-y-4 animate-in fade-in duration-300">
        <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase block">
          [ Standalone Clinical Workspace ]
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-tight">
          Download <br />
          <span className="font-serif italic-heavy text-brand-glow">PhenoOA Studio</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-3xl">
          Deploy high-speed shape matching networks and automated osteoarthritic phenotyping layers directly on your local workstation. Offline-first, secure, and private.
        </p>

        <div className="h-[1px] w-full bg-border-panel pt-4" />
      </section>

      {/* Main Download Grid */}
      <section className="px-6 md:px-16 pb-12 max-w-7xl mx-auto relative z-10">
        <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-brand-glow uppercase mb-6 block text-left">
          [ Available Downloads ]
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. macOS (Universal) [ACTIVE] */}
          <div className="bg-bg-panel border border-brand-glow/30 shadow-[0_0_20px_rgba(45,212,191,0.06)] rounded-2xl p-6.5 hover:border-brand-glow transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-glow/5 blur-2xl pointer-events-none" />
            <div className="space-y-6 text-left">
              {/* Badge & OS Spec */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-full bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
                  <Apple className="h-5 w-5 text-brand-glow" />
                </div>
                <span className="bg-brand-electric/10 border border-brand-glow/20 text-brand-glow font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                  Recommended
                </span>
              </div>

              {/* Title & Stats */}
              <div>
                <h3 className="font-display text-lg font-bold text-text-primary">macOS Desktop Client</h3>
                <p className="font-mono text-[10.5px] text-brand-glow uppercase mt-1 tracking-wider">v0.1.0-beta • macOS Apple Silicon</p>
                <p className="font-sans text-xs text-text-muted mt-2 font-light leading-relaxed">
                  Optimized for Apple Silicon (M1/M2/M3/M4) devices running macOS. Built natively to accelerate automated deep learning segmentation and phenotyping pipelines off-grid.
                </p>
              </div>

              {/* Details and security tags */}
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

            {/* Premium Download Buttons & States */}
            <div className="mt-8">
              {downloadStates.macos === "idle" && (
                <button
                  onClick={() => handleDownloadClick("macos")}
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
                    onClick={() => resetDownload("macos")}
                    className="w-full text-center font-mono text-[10px] text-brand-glow hover:underline cursor-pointer uppercase tracking-wider"
                  >
                    Reset & Download Again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 2. Clinical Sample Data [ACTIVE] */}
          <div className="bg-bg-panel border border-brand-glow/30 shadow-[0_0_20px_rgba(45,212,191,0.06)] rounded-2xl p-6.5 hover:border-brand-glow transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-glow/5 blur-2xl pointer-events-none" />
            <div className="space-y-6 text-left">
              {/* Badge & OS Spec */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-full bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-brand-glow" />
                </div>
                <span className="bg-brand-electric/10 border border-brand-glow/20 text-brand-glow font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                  Dataset
                </span>
              </div>

              {/* Title & Stats */}
              <div>
                <h3 className="font-display text-lg font-bold text-text-primary">Clinical Sample Data</h3>
                <p className="font-mono text-[10.5px] text-brand-glow uppercase mt-1 tracking-wider">v0.1.0-beta • ZIP Archive</p>
                <p className="font-sans text-xs text-text-muted mt-2 font-light leading-relaxed">
                  Contains anonymized osteoarthritic knee sequences. Provided to verify workspace diagnostic layers, test automated segmentation, and validate local inference results.
                </p>
              </div>

              {/* Details and security tags */}
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

            {/* Premium Download Buttons & States */}
            <div className="mt-8">
              {downloadStates.samples === "idle" && (
                <button
                  onClick={() => handleDownloadClick("samples")}
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
                    onClick={() => resetDownload("samples")}
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

      {/* Upcoming Platforms */}
      <section className="px-6 md:px-16 pb-20 max-w-7xl mx-auto relative z-10">
        <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-text-muted uppercase mb-6 block text-left">
          [ Upcoming Platforms ]
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Windows x64 [DISABLED / BLURRED] */}
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
              <button
                disabled
                className="w-full rounded-xl bg-border-panel text-text-muted py-3.5 text-xs font-semibold uppercase tracking-wider cursor-not-allowed border border-transparent"
              >
                Framework Preparing
              </button>
            </div>
          </div>

          {/* Linux x64 [DISABLED / BLURRED] */}
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
              <button
                disabled
                className="w-full rounded-xl bg-border-panel text-text-muted py-3.5 text-xs font-semibold uppercase tracking-wider cursor-not-allowed border border-transparent"
              >
                Build Pipeline Staged
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security compliance strip */}
      <section className="px-6 md:px-16 max-w-4xl mx-auto relative z-10 text-center">
        <div className="bg-bg-panel border border-border-strong rounded-2xl p-6.5 max-w-2xl mx-auto flex items-start gap-4 text-left">
          <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-amber-500 mb-1">Local HIPAA Compliant Execution</h4>
            <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
              This desktop installer runs deep shape analytics fully offline. Patient identifiers, PACS metadata, and image metrics never leave your workstation, safeguarding healthcare confidentiality standards.
            </p>
          </div>
        </div>
      </section>



    </div>
  );
}
