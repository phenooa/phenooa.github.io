import React, { useState, useEffect } from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import HomeView from "./components/views/HomeView";
import ResearchView from "./components/views/ResearchView";
import FeaturesView from "./components/views/FeaturesView";
import AboutView from "./components/views/AboutView";
import DownloadView from "./components/views/DownloadView";
import DemoView from "./components/views/DemoView";
import ThemeSwitcher from "./components/shared/ThemeSwitcher";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash;
    if (hash === "#/research" || hash === "#research") return "/research";
    if (hash === "#/features" || hash === "#features") return "/features";
    if (hash === "#/about" || hash === "#about") return "/about";
    if (hash === "#/download" || hash === "#download") return "/download";
    if (hash === "#/demo" || hash === "#demo") return "/demo";
    return "/";
  });

  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("phenooa-theme") || "light-teal";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      let computedRoute = "/";
      if (hash === "#/research" || hash === "#research") computedRoute = "/research";
      else if (hash === "#/features" || hash === "#features") computedRoute = "/features";
      else if (hash === "#/about" || hash === "#about") computedRoute = "/about";
      else if (hash === "#/download" || hash === "#download") computedRoute = "/download";
      else if (hash === "#/demo" || hash === "#demo") computedRoute = "/demo";
      
      setCurrentRoute(computedRoute);
      window.scrollTo({ top: 0, behavior: "instant" as any });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("phenooa-theme", theme);
  }, [theme]);

  const handleNavigate = (route: string) => {
    if (route === "/") {
      window.location.hash = "";
    } else {
      window.location.hash = `#${route.replace(/^\//, "")}`;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-primary flex flex-col font-sans antialiased selection:bg-brand-electric selection:text-white relative overflow-x-hidden">
      
      {/* Decorative top glow border lines */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-glow/30 to-transparent z-40" />

      {/* Main Sticky Header */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Primary Page Stage Mount */}
      <main className="flex-grow flex flex-col w-full">
        {currentRoute === "/" && <HomeView onNavigate={handleNavigate} />}
        {currentRoute === "/research" && <ResearchView />}
        {currentRoute === "/features" && <FeaturesView />}
        {currentRoute === "/about" && <AboutView />}
        {currentRoute === "/download" && <DownloadView />}
        {currentRoute === "/demo" && <DemoView onNavigate={handleNavigate} />}
      </main>

      {/* Consolidated Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* FLOATING INTERACTIVE SWATCH SWITCHER IN THE BOTTOM RIGHT */}
      <ThemeSwitcher currentTheme={theme} onChangeTheme={setTheme} />
      
    </div>
  );
}
