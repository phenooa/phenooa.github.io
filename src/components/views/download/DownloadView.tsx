import React, { useState } from "react";
import DownloadHeader from "./DownloadHeader";
import AvailableDownloads from "./AvailableDownloads";
import UpcomingPlatforms from "./UpcomingPlatforms";
import SystemRequirements from "./SystemRequirements";
import ComplianceBanner from "./ComplianceBanner";

const DOWNLOAD_URLS: Record<"macos" | "samples", string> = {
  macos: "https://github.com/tommyngx/release/releases/download/pheno_v0.1.0/PhenoOA.zip",
  samples: "https://github.com/tommyngx/release/releases/download/pheno_v0.1.0/Samples.zip",
};

export default function DownloadView() {
  const [downloadStates, setDownloadStates] = useState<Record<"macos" | "samples", "idle" | "complete">>({
    macos: "idle",
    samples: "idle",
  });

  const handleDownload = (target: "macos" | "samples") => {
    window.location.href = DOWNLOAD_URLS[target];
    setDownloadStates((prev) => ({ ...prev, [target]: "complete" }));
  };

  const handleReset = (target: "macos" | "samples") => {
    setDownloadStates((prev) => ({ ...prev, [target]: "idle" }));
  };

  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative pb-24 min-h-screen font-sans">
      {/* Background radial glow */}
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-brand-electric/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-brand-glow/8 blur-[120px] pointer-events-none" />

      <DownloadHeader />
      <AvailableDownloads downloadStates={downloadStates} onDownload={handleDownload} onReset={handleReset} />
      <UpcomingPlatforms />
      <SystemRequirements />
      <ComplianceBanner />
    </div>
  );
}
