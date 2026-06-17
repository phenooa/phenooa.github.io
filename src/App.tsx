import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import ThemeSwitcher from "./components/shared/ThemeSwitcher";

const HomeView = lazy(() => import("./components/views/home"));
const ResearchView = lazy(() => import("./components/views/research"));
const FeaturesView = lazy(() => import("./components/views/features"));
const AboutView = lazy(() => import("./components/views/about"));
const DownloadView = lazy(() => import("./components/views/download"));
const DemoView = lazy(() => import("./components/views/demo"));
const AtlasView = lazy(() => import("./components/views/atlas"));

interface RouteConfig {
  path: string;
  hash: string;
  component: React.ComponentType<any>;
}

const ROUTES: RouteConfig[] = [
  { path: "/", hash: "", component: HomeView },
  { path: "/research", hash: "research", component: ResearchView },
  { path: "/features", hash: "features", component: FeaturesView },
  { path: "/about", hash: "about", component: AboutView },
  { path: "/download", hash: "download", component: DownloadView },
  { path: "/demo", hash: "demo", component: DemoView },
  { path: "/atlas", hash: "atlas", component: AtlasView },
];

const getRouteFromHash = (hash: string): string => {
  const normalized = hash.replace(/^#\/?/, "");
  if (!normalized) return "/";
  const matched = ROUTES.find(r => r.hash === normalized);
  return matched ? matched.path : "/";
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return getRouteFromHash(window.location.hash);
  });

  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("phenooa-theme") || "light-teal";
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash(window.location.hash));
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

  const ActiveComponent = ROUTES.find(r => r.path === currentRoute)?.component || HomeView;

  return (
    <div className="min-h-screen bg-bg-main text-text-primary flex flex-col font-sans antialiased selection:bg-brand-electric selection:text-white relative overflow-x-hidden">
      
      {/* Decorative top glow border lines */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-glow/30 to-transparent z-40" />

      {/* Main Sticky Header */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Primary Page Stage Mount */}
      <main className="flex-grow flex flex-col w-full">
        <Suspense fallback={
          <div className="flex-grow flex items-center justify-center min-h-[400px]">
            <div className="text-[10px] font-mono tracking-widest text-brand-glow uppercase animate-pulse">
              [ Loading view... ]
            </div>
          </div>
        }>
          <ActiveComponent onNavigate={handleNavigate} />
        </Suspense>
      </main>

      {/* Consolidated Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* FLOATING INTERACTIVE SWATCH SWITCHER IN THE BOTTOM RIGHT */}
      <ThemeSwitcher currentTheme={theme} onChangeTheme={setTheme} />
      
    </div>
  );
}
