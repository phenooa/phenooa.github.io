import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onNavigate: (route: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-bg-surface text-text-muted px-6 md:px-12 py-8 border-t border-border-panel relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10.5px]">
        {/* Left Side: Short Copyright */}
        <span className="text-center sm:text-left">
          © 2026 PhenoOA AI Software Projects. All rights reserved.
        </span>

        {/* Right Side: Back to top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 hover:text-brand-glow transition-colors cursor-pointer uppercase tracking-widest font-bold"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5 text-brand-glow" />
        </button>
      </div>
    </footer>
  );
}
