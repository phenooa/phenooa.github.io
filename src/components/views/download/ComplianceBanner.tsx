import React from "react";
import { ShieldCheck } from "lucide-react";

export default function ComplianceBanner() {
  return (
    <section className="px-6 md:px-16 pb-16 max-w-4xl mx-auto relative z-10 text-center">
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
  );
}
