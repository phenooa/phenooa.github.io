import React, { useState, useMemo } from "react";
import {
  LANDMARK_POINTS,
  OSTEOPHYTE_REGIONS,
  NOTABLE_LANDMARKS,
  REGION_COLORS,
  REGION_LABELS,
  KNEE_OUTLINES,
  type LandmarkPoint,
  type OsteophyteRegion,
  type NotableLandmark,
} from "./atlasData";

type TabMode = "landmarks" | "osteophytes";

// ─────────────────────────────────────────────────
// Smooth SVG Path Generation from Landmarks
// ─────────────────────────────────────────────────
function controlPoint(
  current: LandmarkPoint,
  previous?: LandmarkPoint,
  next?: LandmarkPoint,
  reverse?: boolean,
  smoothing = 0.15
) {
  const p = previous || current;
  const n = next || current;

  const lengthX = n.x - p.x;
  const lengthY = n.y - p.y;

  const length = Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)) * smoothing;
  const angle = Math.atan2(lengthY, lengthX) + (reverse ? Math.PI : 0);

  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;

  return [x, y];
}

function getSmoothSvgPath(points: LandmarkPoint[], closed = false, smoothing = 0.15) {
  if (points.length === 0) return "";

  let d = `M${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const cp1 = controlPoint(points[i], points[i - 1], points[i + 1], false, smoothing);
    const cp2 = controlPoint(points[i + 1], points[i], points[i + 2], true, smoothing);
    d += ` C${cp1[0].toFixed(1)},${cp1[1].toFixed(1)} ${cp2[0].toFixed(1)},${cp2[1].toFixed(1)} ${points[i + 1].x},${points[i + 1].y}`;
  }

  if (closed && points.length > 2) {
    const cp1 = controlPoint(points[points.length - 1], points[points.length - 2], points[0], false, smoothing);
    const cp2 = controlPoint(points[0], points[points.length - 1], points[1], true, smoothing);
    d += ` C${cp1[0].toFixed(1)},${cp1[1].toFixed(1)} ${cp2[0].toFixed(1)},${cp2[1].toFixed(1)} ${points[0].x},${points[0].y}Z`;
  }

  return d;
}

// ─────────────────────────────────────────────────
// Base Knee SVG Outline (shared between both tabs)
// ─────────────────────────────────────────────────
function KneeOutlineSVG() {
  const strokeColor = "var(--text-muted)";
  const strokeWidth = 1.4;

  const femurPoints = useMemo(() => LANDMARK_POINTS.filter((p) => p.region === "femur"), []);
  const tibiaPoints = useMemo(() => LANDMARK_POINTS.filter((p) => p.region === "tibia"), []);
  const fibulaPoints = useMemo(() => LANDMARK_POINTS.filter((p) => p.region === "fibula"), []);
  const patellaPoints = useMemo(() => LANDMARK_POINTS.filter((p) => p.region === "patella"), []);

  // Filter specific ranges
  const tibiaOutlinePoints = useMemo(() => tibiaPoints.filter((p) => p.index >= 45 && p.index <= 85), [tibiaPoints]);
  const medialSubchondralPoints = useMemo(() => tibiaPoints.filter((p) => p.index >= 91 && p.index <= 95), [tibiaPoints]);
  const lateralSubchondralPoints = useMemo(() => tibiaPoints.filter((p) => p.index >= 86 && p.index <= 90), [tibiaPoints]);

  const femurPath = useMemo(() => getSmoothSvgPath(femurPoints, false, 0.14), [femurPoints]);
  const tibiaPath = useMemo(() => getSmoothSvgPath(tibiaOutlinePoints, false, 0.12), [tibiaOutlinePoints]);
  const medialSubchondralPath = useMemo(() => getSmoothSvgPath(medialSubchondralPoints, false, 0.08), [medialSubchondralPoints]);
  const lateralSubchondralPath = useMemo(() => getSmoothSvgPath(lateralSubchondralPoints, false, 0.08), [lateralSubchondralPoints]);
  const fibulaPath = useMemo(() => getSmoothSvgPath(fibulaPoints, false, 0.15), [fibulaPoints]);
  const patellaPath = useMemo(() => getSmoothSvgPath(patellaPoints, true, 0.18), [patellaPoints]);

  // Find specific points for connection lines
  const p57 = useMemo(() => LANDMARK_POINTS.find((p) => p.index === 57), []);
  const p90 = useMemo(() => LANDMARK_POINTS.find((p) => p.index === 90), []);
  const p73 = useMemo(() => LANDMARK_POINTS.find((p) => p.index === 73), []);
  const p95 = useMemo(() => LANDMARK_POINTS.find((p) => p.index === 95), []);

  return (
    <g className="knee-outline" opacity={0.6}>
      {/* Femur */}
      <path d={femurPath} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Tibia */}
      <path d={tibiaPath} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Subchondral bone plates */}
      <path d={medialSubchondralPath} fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.75} opacity={0.6} strokeDasharray="2 1" />
      <path d={lateralSubchondralPath} fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.75} opacity={0.6} strokeDasharray="2 1" />
      {/* Connection dashed lines */}
      {p57 && p90 && (
        <line
          x1={p57.x}
          y1={p57.y}
          x2={p90.x}
          y2={p90.y}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.75}
          strokeDasharray="2 2"
          opacity={0.6}
        />
      )}
      {p73 && p95 && (
        <line
          x1={p73.x}
          y1={p73.y}
          x2={p95.x}
          y2={p95.y}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.75}
          strokeDasharray="2 2"
          opacity={0.6}
        />
      )}
      {/* Fibula */}
      <path d={fibulaPath} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Patella */}
      <path d={patellaPath} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray="4 2" strokeLinecap="round" />
      {/* Joint space reference line */}
      <line x1="114" y1="277.7" x2="294" y2="272.7" stroke={strokeColor} strokeWidth={0.5} strokeDasharray="3 3" opacity={0.35} />
    </g>
  );

}

// ─────────────────────────────────────────────────
// Landmark Point Overlay
// ─────────────────────────────────────────────────
function LandmarkOverlay({
  selectedPoint,
  onSelectPoint,
  hoveredPoint,
  onHoverPoint,
}: {
  selectedPoint: number | null;
  onSelectPoint: (idx: number | null) => void;
  hoveredPoint: number | null;
  onHoverPoint: (idx: number | null) => void;
}) {
  const notableMap = useMemo(() => {
    const m = new Map<number, NotableLandmark>();
    NOTABLE_LANDMARKS.forEach((nl) => m.set(nl.index, nl));
    return m;
  }, []);

  return (
    <g className="landmark-points">
      {LANDMARK_POINTS.map((pt) => {
        const isNotable = notableMap.has(pt.index);
        const isActive = selectedPoint === pt.index || hoveredPoint === pt.index;
        const color = REGION_COLORS[pt.region];
        const r = isNotable ? 4.5 : 2.8;

        return (
          <g key={pt.index}>
            {/* Glow ring for active point */}
            {isActive && (
              <circle
                cx={pt.x}
                cy={pt.y}
                r={r + 6}
                fill={color}
                opacity={0.15}
              />
            )}
            {/* Notable point ring */}
            {isNotable && (
              <circle
                cx={pt.x}
                cy={pt.y}
                r={r + 2}
                fill="none"
                stroke={color}
                strokeWidth={1}
                opacity={isActive ? 0.8 : 0.4}
              />
            )}
            {/* Main dot */}
            <circle
              cx={pt.x}
              cy={pt.y}
              r={r}
              fill={color}
              opacity={isActive ? 1 : 0.7}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => onHoverPoint(pt.index)}
              onMouseLeave={() => onHoverPoint(null)}
              onClick={() => onSelectPoint(selectedPoint === pt.index ? null : pt.index)}
            />
            {/* Index label for notable points */}
            {isNotable && (
              <text
                x={pt.x}
                y={pt.y - r - 5}
                textAnchor="middle"
                fontSize="7"
                fill="currentColor"
                fontFamily="var(--font-mono)"
                opacity={isActive ? 1 : 0.6}
              >
                {pt.index}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

// ─────────────────────────────────────────────────
// Osteophyte Region Overlay
// ─────────────────────────────────────────────────
function OsteophyteOverlay({
  selectedRegion,
  onSelectRegion,
  hoveredRegion,
  onHoverRegion,
}: {
  selectedRegion: string | null;
  onSelectRegion: (id: string | null) => void;
  hoveredRegion: string | null;
  onHoverRegion: (id: string | null) => void;
}) {
  const osteophytePaths = useMemo(() => {
    const getPt = (idx: number) => LANDMARK_POINTS.find((p) => p.index === idx) || { x: 0, y: 0 };

    const getSmoothPath = (pts: { x: number; y: number }[], smoothing = 0.25) => {
      if (pts.length === 0) return "";
      let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < pts.length; i++) {
        const curr = pts[i];
        const next = pts[(i + 1) % pts.length];
        const prev = pts[(i - 1 + pts.length) % pts.length];
        const nextNext = pts[(i + 2) % pts.length];

        const cp1x = curr.x + (next.x - prev.x) * smoothing;
        const cp1y = curr.y + (next.y - prev.y) * smoothing;

        const cp2x = next.x - (nextNext.x - curr.x) * smoothing;
        const cp2y = next.y - (nextNext.y - curr.y) * smoothing;

        d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${next.x.toFixed(1)},${next.y.toFixed(1)}`;
      }
      d += "Z";
      return d;
    };

    const p15 = getPt(15);
    const p16 = getPt(16);
    const p17 = getPt(17);

    const p27 = getPt(27);
    const p28 = getPt(28);
    const p29 = getPt(29);

    const p56 = getPt(56);
    const p57 = getPt(57);
    const p58 = getPt(58);

    const p72 = getPt(72);
    const p73 = getPt(73);
    const p74 = getPt(74);

    return {
      "medial-femoral": getSmoothPath([p29, { x: p29.x - 16, y: p29.y }, { x: p28.x - 22, y: p28.y + 6 }, { x: p27.x - 12, y: p27.y + 12 }, p27, p28]),
      "lateral-femoral": getSmoothPath([p15, { x: p15.x + 16, y: p15.y }, { x: p16.x + 22, y: p16.y + 6 }, { x: p17.x + 12, y: p17.y + 12 }, p17, p16]),
      "medial-tibial": getSmoothPath([p72, { x: p72.x - 16, y: p72.y - 4 }, { x: p73.x - 24, y: p73.y + 8 }, { x: p74.x - 12, y: p74.y + 14 }, p74, p73]),
      "lateral-tibial": getSmoothPath([p58, { x: p58.x + 16, y: p58.y - 4 }, { x: p57.x + 24, y: p57.y + 8 }, { x: p56.x + 12, y: p56.y + 14 }, p56, p57]),
    };
  }, []);

  return (
    <g className="osteophyte-regions">
      {OSTEOPHYTE_REGIONS.map((region) => {
        const isActive = selectedRegion === region.id || hoveredRegion === region.id;
        const d = osteophytePaths[region.id as keyof typeof osteophytePaths] || region.svgPath;
        return (
          <path
            key={region.id}
            d={d}
            fill={region.color}
            fillOpacity={isActive ? 0.55 : 0.3}
            stroke={region.color}
            strokeWidth={isActive ? 2 : 1.2}
            strokeOpacity={isActive ? 1 : 0.6}
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => onHoverRegion(region.id)}
            onMouseLeave={() => onHoverRegion(null)}
            onClick={() => onSelectRegion(selectedRegion === region.id ? null : region.id)}
          />
        );
      })}
    </g>
  );
}

// ─────────────────────────────────────────────────
// Info Panel (sidebar details)
// ─────────────────────────────────────────────────
function LandmarkInfoPanel({ pointIdx }: { pointIdx: number | null }) {
  if (pointIdx === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 opacity-60">
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
          Hover or click a landmark point
        </p>
        <p className="font-sans text-xs text-text-muted mt-2 font-light">
          Select any point on the knee diagram to view its anatomical description
        </p>
      </div>
    );
  }

  const pt = LANDMARK_POINTS.find((p) => p.index === pointIdx);
  const notable = NOTABLE_LANDMARKS.find((n) => n.index === pointIdx);

  if (!pt) return null;

  const color = REGION_COLORS[pt.region];

  return (
    <div className="p-4 space-y-3 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
          {REGION_LABELS[pt.region]}
        </span>
      </div>
      <div>
        <h4 className="font-display text-sm font-bold text-text-primary">
          Point {pt.index}
          {notable ? `: ${notable.title}` : ""}
        </h4>
        <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed font-light">
          {notable ? notable.description : pt.label}
        </p>
      </div>
      <div className="border-t border-border-panel pt-2 space-y-1">
        <div className="flex justify-between font-mono text-[9px] text-text-muted">
          <span>Region</span>
          <span className="capitalize">{pt.region}</span>
        </div>
        <div className="flex justify-between font-mono text-[9px] text-text-muted">
          <span>Coordinates</span>
          <span>({pt.x}, {pt.y})</span>
        </div>
      </div>
    </div>
  );
}

function OsteophyteInfoPanel({ regionId }: { regionId: string | null }) {
  if (!regionId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 opacity-60">
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
          Hover or click a region
        </p>
        <p className="font-sans text-xs text-text-muted mt-2 font-light">
          Select any highlighted region to view the osteophyte description
        </p>
      </div>
    );
  }

  const region = OSTEOPHYTE_REGIONS.find((r) => r.id === regionId);
  if (!region) return null;

  return (
    <div className="p-4 space-y-3 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: region.color }}
        />
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: region.color }}>
          Atlas Region
        </span>
      </div>
      <div>
        <h4 className="font-display text-sm font-bold text-text-primary">
          {region.name}
        </h4>
        <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed font-light">
          {region.description}
        </p>
      </div>
      <div className="border-t border-border-panel pt-2">
        <div className="flex items-center gap-2 font-mono text-[9px] text-text-muted">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: region.color }}
          />
          <span>Atlas colour: {region.color}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Legend Components
// ─────────────────────────────────────────────────
function LandmarkLegend() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {Object.entries(REGION_LABELS).map(([key, label]) => (
        <div key={key} className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: REGION_COLORS[key] }}
          />
          <span className="font-mono text-[9px] text-text-muted tracking-wider">{label}</span>
        </div>
      ))}
    </div>
  );
}

function OsteophyteLegend({
  selectedRegion,
  onSelectRegion,
}: {
  selectedRegion: string | null;
  onSelectRegion: (id: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {OSTEOPHYTE_REGIONS.map((region) => (
        <button
          key={region.id}
          onClick={() => onSelectRegion(selectedRegion === region.id ? null : region.id)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer text-left ${
            selectedRegion === region.id
              ? "border-current bg-bg-panel-strong"
              : "border-border-panel hover:border-current"
          }`}
          style={{ color: region.color }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: region.color }}
          />
          <span className="font-mono text-[9px] tracking-wider">{region.name.replace(" Osteophyte", "")}</span>
        </button>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════
// Main KneeAtlasExplorer Component
// ═════════════════════════════════════════════════
export default function KneeAtlasExplorer() {
  const [activeTab, setActiveTab] = useState<TabMode>("landmarks");

  // Landmark state
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Osteophyte state
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const activePoint = hoveredPoint ?? selectedPoint;
  const activeRegion = hoveredRegion ?? selectedRegion;

  return (
    <div className="bg-bg-panel border border-border-strong rounded-2xl overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b border-border-panel">
        <button
          onClick={() => setActiveTab("landmarks")}
          className={`flex-1 py-3.5 px-4 font-mono text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
            activeTab === "landmarks"
              ? "text-brand-glow bg-brand-electric/5 border-b-2 border-brand-glow"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          128-Point Landmark Atlas
        </button>
        <button
          onClick={() => setActiveTab("osteophytes")}
          className={`flex-1 py-3.5 px-4 font-mono text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
            activeTab === "osteophytes"
              ? "text-brand-glow bg-brand-electric/5 border-b-2 border-brand-glow"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          Osteophyte Region Atlas
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* SVG Diagram */}
        <div className="lg:col-span-8 p-4 md:p-6 flex flex-col items-center justify-center">
          <svg
            viewBox="70 0 290 500"
            className="w-full max-w-[400px] h-auto"
            style={{ aspectRatio: "290/500" }}
          >
            {/* Grid lines for reference feel */}
            <defs>
              <pattern id="atlas-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--text-muted)" strokeWidth="0.15" opacity="0.3" />
              </pattern>
            </defs>
            <rect x="70" y="0" width="290" height="500" fill="url(#atlas-grid)" />

            <KneeOutlineSVG />

            {activeTab === "landmarks" && (
              <LandmarkOverlay
                selectedPoint={selectedPoint}
                onSelectPoint={setSelectedPoint}
                hoveredPoint={hoveredPoint}
                onHoverPoint={setHoveredPoint}
              />
            )}

            {activeTab === "osteophytes" && (
              <OsteophyteOverlay
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
                hoveredRegion={hoveredRegion}
                onHoverRegion={setHoveredRegion}
              />
            )}
          </svg>

          {/* Legend */}
          <div className="mt-4 w-full">
            {activeTab === "landmarks" ? (
              <LandmarkLegend />
            ) : (
              <OsteophyteLegend
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
              />
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border-panel min-h-[200px] flex flex-col justify-center">
          {activeTab === "landmarks" ? (
            <LandmarkInfoPanel pointIdx={activePoint} />
          ) : (
            <OsteophyteInfoPanel regionId={activeRegion} />
          )}
        </div>
      </div>
    </div>
  );
}
