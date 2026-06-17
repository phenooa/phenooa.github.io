import React from "react";

interface OALogoProps {
  className?: string;
  size?: number;
}

export default function OALogo({ className = "", size = 38 }: OALogoProps) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{ 
        width: size, 
        height: size,
      }}
    >
      <img
        src="/assets/logo.png"
        alt="PhenoOA Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
