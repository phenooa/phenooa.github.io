import React, { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import OALogo from "./OALogo";

interface HeaderProps {
  currentRoute: string; // "/", "/research", "/features", "/download", "/demo"
  onNavigate: (route: string) => void;
}

export default function Header({ currentRoute, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Research", route: "/research" },
    { label: "Features", route: "/features" },
    { label: "About", route: "/about" },
    { label: "Demo", route: "/demo" },
    { label: "Atlas", route: "/atlas" },
  ];

  const handleItemClick = (route: string) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-surface/85 backdrop-blur-md border-b border-border-panel" id="header">
      <div className="max-w-7xl mx-auto flex h-16 md:h-20 items-center justify-between px-6 md:px-12">
        
        {/* Brand Logo - Left (PhenoOA AI) with high-fidelity visual rendering */}
        <div 
          className="flex items-center gap-3 cursor-pointer selection:bg-transparent" 
          onClick={() => handleItemClick("/")}
        >
          <OALogo size={38} className="hover:scale-[1.03] transition-transform" />
          <span className="font-display text-sm font-semibold tracking-wider text-text-primary uppercase select-none">
            PhenoOA <span className="text-brand-glow font-bold">AI</span>
          </span>
        </div>

        {/* Center Nav - Desktop */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleItemClick(item.route)}
                className={`relative py-1 text-[11px] font-bold uppercase tracking-[0.16em] transition-all cursor-pointer ${
                  isActive ? "text-text-primary opacity-100 font-extrabold" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-brand-glow" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button - Desktop (Download Studio) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleItemClick("/download")}
            className="group flex items-center gap-2 rounded-full border border-border-panel bg-bg-panel hover:bg-button-primary-bg hover:text-button-primary-text hover:border-transparent px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-text-primary transition-all duration-300 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-brand-glow group-hover:text-current transition-transform" />
            Download Studio
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-text-primary/80 hover:text-text-primary transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-bg-surface border-b border-border-panel p-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleItemClick(item.route)}
                className={`text-left text-xs uppercase font-bold tracking-[0.15em] py-1 cursor-pointer ${
                  isActive ? "text-brand-glow font-extrabold" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="h-[1px] w-full bg-border-panel my-1" />
          <button
            onClick={() => handleItemClick("/download")}
            className="flex items-center justify-center gap-2 rounded-full bg-button-primary-bg text-button-primary-text px-4 py-3 text-xs uppercase tracking-[0.15em] font-bold hover:opacity-95 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download Studio</span>
          </button>
        </div>
      )}
    </header>
  );
}
