import React from "react";

export default function DownloadHeader() {
  return (
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
  );
}
