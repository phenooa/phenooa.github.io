import React from "react";
import HeroSection from "./HeroSection";
import ValueSection from "./ValueSection";
import ProductHighlight from "./ProductHighlight";
import CtaSection from "./CtaSection";

interface HomeViewProps {
  onNavigate: (route: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="w-full text-text-primary">
      <HeroSection onNavigate={onNavigate} />
      <ValueSection />
      <ProductHighlight onNavigate={onNavigate} />
      <CtaSection onNavigate={onNavigate} />
    </div>
  );
}
