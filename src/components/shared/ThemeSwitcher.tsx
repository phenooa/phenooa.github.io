import React, { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";

interface ThemeSwitcherProps {
  currentTheme: string;
  onChangeTheme: (theme: string) => void;
}

export default function ThemeSwitcher({ currentTheme, onChangeTheme }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const themes = [
    { 
      id: "dark", 
      name: "Futuristic Dark", 
      desc: "The original dark cosmic theme",
      colorCircle: "bg-[#2F46FF] border border-[#5367FF]/30",
      accent: "#5367FF" 
    },
    { 
      id: "clinical-light", 
      name: "Clinical Light", 
      desc: "Clean & professional medical theme",
      colorCircle: "bg-[#0F766E] border border-[#14B8A6]/30",
      accent: "#0F766E" 
    },
    { 
      id: "dark-teal", 
      name: "Dark Teal", 
      desc: "Calm, research-focused deep teal",
      colorCircle: "bg-[#14B8A6] border border-[#2DD4BF]/30",
      accent: "#2DD4BF" 
    },
    { 
      id: "light-teal", 
      name: "Light Teal", 
      desc: "Premium, calm, medical research light teal theme",
      colorCircle: "bg-[#0F766E] border border-[#0D9488]/30",
      accent: "#0D9488" 
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" ref={containerRef}>
      {/* Trigger Button with exquisite floating shadow glow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy border border-brand-dark-border text-current shadow-lg hover:shadow-brand-glow/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: `0 8px 30px -4px rgba(0,0,0,0.3)`
        }}
        aria-label="Switch visual style"
        title="Switch color theme"
      >
        {/* Swirling glow inside the button */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Palette className="h-5 w-5 text-brand-glow group-hover:rotate-12 transition-transform" />
        
        {/* Miniature Dot indicator for current setting */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-glow opacity-60"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-glow"></span>
        </span>
      </button>

      {/* Exquisite Popup Selector */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-80 rounded-2xl bg-brand-navy border border-brand-dark-border p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{
            backdropFilter: "blur(16px)",
            backgroundColor: "var(--bg-panel)",
            borderColor: "var(--border-panel)"
          }}
        >
          {/* Title line */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-current opacity-90 flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-brand-glow" /> Workspaces & Themes
            </span>
            <span className="font-mono text-[9px] text-brand-glow bg-brand-glow/5 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest">
              Live switcher
            </span>
          </div>

          {/* Theme List */}
          <div className="flex flex-col gap-2.5">
            {themes.map((t) => {
              const isSelected = currentTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onChangeTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`group flex items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? "bg-brand-electric/10 border border-brand-glow/30" 
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Miniature swatch indicator */}
                  <span className={`mt-1 flex h-4 w-4 shrink-0 rounded-full ${t.colorCircle}`} />
                  
                  {/* Metadata labels */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-[12px] font-semibold tracking-wide ${isSelected ? "text-brand-glow" : "text-current"}`}>
                        {t.name}
                      </span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-brand-glow shrink-0 animate-pulse" />
                      )}
                    </div>
                    <p className="text-[10px] text-current/50 leading-normal mt-0.5 group-hover:text-current/75 transition-colors line-clamp-1">
                      {t.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Micro Footer descriptor */}
          <div className="mt-3 pt-3 border-t border-white/5 text-center">
            <p className="text-[8.5px] font-mono text-current/30 uppercase tracking-widest">
              Tailored high-fidelity visualization matrix
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
