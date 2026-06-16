// atlasData.ts — Anatomical landmark and osteophyte region data for the Knee Atlas Explorer
// Redesigned from AP knee radiograph reference images

export interface LandmarkPoint {
  index: number;
  x: number;
  y: number;
  region: "femur" | "tibia" | "fibula" | "patella";
  label: string;
}

export interface OsteophyteRegion {
  id: string;
  name: string;
  color: string;
  description: string;
  svgPath: string;
}

export interface NotableLandmark {
  index: number;
  title: string;
  description: string;
}

// Region color mapping
export const REGION_COLORS: Record<string, string> = {
  femur: "#38BDF8",     // sky blue
  tibia: "#F59E0B",     // amber
  fibula: "#FB7185",    // rose
  patella: "#2DD4BF",   // teal/brand-glow
};

export const REGION_LABELS: Record<string, string> = {
  femur: "Femur (0–44)",
  tibia: "Tibia (45–95)",
  fibula: "Fibula (96–119)",
  patella: "Patella (120–128)",
};

// ──────────────────────────────────────────────
// 128-Point Landmark Model
// Placed on a ~400×500 SVG canvas (AP knee view)
// Femur outline: 0 = top-right shaft, clockwise around condyles, 44 = top-left shaft
// Tibia: 45–95 = plateau surface, 96–119 = fibula, 120–128 = patella
// ──────────────────────────────────────────────

function generateFemurPoints(): LandmarkPoint[] {
  // Femur outline: starting top-right (point 0), going clockwise
  // Down right shaft → lateral condyle → intercondylar notch (22) → medial condyle → up left shaft (44)
  const coords: [number, number, string][] = [
    [259.5, 68.9, "Femoral shaft, right superior"],
    [259.9, 88.6, "Femoral shaft point 1"],
    [260.8, 108.2, "Femoral shaft point 2"],
    [262.6, 128.4, "Femoral shaft point 3"],
    [265.5, 139.8, "Femoral shaft point 4"],
    [269.4, 150.4, "Femoral shaft, right mid"],
    [275, 160.6, "Femoral metaphysis point 6"],
    [282.6, 169.5, "Femoral metaphysis point 7"],
    [291.1, 176.6, "Femoral metaphysis point 8"],
    [294.5, 186.2, "Femoral metaphysis point 9"],
    [296.5, 196.8, "Lateral supracondylar ridge"],
    [296.7, 206.4, "Lateral condyle, superior margin"],
    [295.6, 216.8, "Lateral condyle, posterolateral"],
    [293, 226.8, "Lateral condyle, lateral apex"],
    [291, 236.4, "Lateral condyle, mid-lateral"],
    [289.8, 246.4, "Lateral condyle, inferolateral"],
    [286.8, 255.9, "Lateral condyle, inferior margin"],
    [280.8, 259.8, "Lateral condyle, articular surface"],
    [263.8, 263.1, "Lateral condylar ridge"],
    [247.4, 261.8, "Lateral intercondylar margin"],
    [230.6, 257.2, "Intercondylar notch, lateral wall"],
    [214.8, 250.9, "Intercondylar notch, lateral slope"],
    [198.5, 245.5, "Intercondylar notch, deepest point"],
    [183.3, 252.8, "Intercondylar notch, medial slope"],
    [169.3, 261.6, "Intercondylar notch, medial wall"],
    [153.7, 267.6, "Medial intercondylar margin"],
    [136.7, 268.6, "Medial condylar ridge"],
    [120.8, 265.9, "Medial condyle, articular surface"],
    [116.9, 260.8, "Medial condyle, inferior margin"],
    [112.6, 249.3, "Medial condyle, inferomedial"],
    [109.2, 236.8, "Medial condyle, medial apex"],
    [105.4, 224.9, "Medial condyle, posteromedial"],
    [103, 212.5, "Medial condyle, superomedial"],
    [102.4, 200.6, "Medial condyle, superior margin"],
    [101.3, 188.2, "Medial supracondylar ridge"],
    [103.9, 175.5, "Femoral metaphysis point 35"],
    [109.7, 164.7, "Femoral metaphysis point 36"],
    [117.6, 159.4, "Femoral metaphysis point 37"],
    [125, 153.2, "Femoral metaphysis point 38"],
    [131.1, 146.5, "Femoral shaft, left mid"],
    [136.3, 138.9, "Femoral shaft point 40"],
    [141.1, 130.8, "Femoral shaft point 41"],
    [148.4, 111.4, "Femoral shaft point 42"],
    [154, 91.4, "Femoral shaft point 43"],
    [158.6, 71.4, "Femoral shaft, left superior"],
  ];

  return coords.map(([x, y, label], i) => ({
    index: i,
    x, y,
    region: "femur" as const,
    label,
  }));
}

function generateTibiaPoints(): LandmarkPoint[] {
  const pts: LandmarkPoint[] = [];

  const tibiaCoords: [number, number, string][] = [
    [246, 443.4, "Lateral tibial shaft, distal superior"],
    [249.6, 425.6, "Lateral tibial shaft point 46"],
    [253.7, 407.5, "Lateral tibial shaft point 47"],
    [258.3, 388.9, "Lateral tibial shaft point 48"],
    [264.6, 375.8, "Lateral tibial shaft point 49"],
    [272.2, 363.2, "Lateral tibial shaft point 50"],
    [282, 352.9, "Lateral tibial shaft point 51"],
    [293.2, 343.2, "Lateral tibial shaft point 52"],
    [296.7, 333.7, "Lateral tibial shaft point 53"],
    [298.7, 323.2, "Lateral tibial shaft point 54"],
    [299, 312.3, "Lateral tibial shaft, proximal margin"],
    [296.3, 300, "Lateral tibial plateau outer border"],
    [291.9, 288.7, "Lateral tibial plateau, outer edge"],
    [284.1, 289.1, "Lateral plateau articular point 58"],
    [272.6, 290.2, "Lateral plateau articular point 59"],
    [260.3, 292.1, "Lateral plateau articular point 60"],
    [248.4, 291.8, "Lateral plateau articular point 61"],
    [236.6, 288.8, "Lateral tibial spine, base"],
    [213.7, 271.8, "Lateral tibial spine, peak"],
    [209.1, 276.7, "Intercondylar eminence, lateral slope"],
    [204, 279.3, "Intercondylar spine valley center"],
    [196.8, 275.5, "Medial tibial spine, slope"],
    [190, 270.8, "Medial tibial spine, base"],
    [180.1, 285.1, "Medial plateau articular point 68"],
    [164.8, 294.3, "Medial plateau articular point 69"],
    [147.4, 293.1, "Medial plateau articular point 70"],
    [129.6, 294.8, "Medial plateau articular point 71"],
    [120.7, 295.8, "Medial plateau articular point 72"],
    [114.5, 294, "Medial tibial plateau, outer edge"],
    [115.9, 306.3, "Medial tibial shaft point 74"],
    [117.9, 317.7, "Medial tibial shaft point 75"],
    [120.6, 327, "Medial tibial shaft point 76"],
    [124, 336.7, "Medial tibial shaft point 77"],
    [127.4, 346.8, "Medial tibial shaft point 78"],
    [135.4, 356.6, "Medial tibial shaft point 79"],
    [143.3, 366.8, "Medial tibial shaft point 80"],
    [149, 377.9, "Medial tibial shaft point 81"],
    [152.8, 389.4, "Medial tibial shaft point 82"],
    [156.5, 407.3, "Medial tibial shaft point 83"],
    [159.2, 425.7, "Medial tibial shaft point 84"],
    [162.4, 444, "Medial tibial shaft, distal superior"],
    [233.9, 274, "Lateral subchondral margin 86"],
    [245.3, 277.9, "Lateral subchondral margin 87"],
    [258.5, 278.7, "Lateral subchondral margin 88"],
    [270.8, 277.2, "Lateral subchondral margin 89"],
    [283.6, 276.6, "Lateral subchondral margin 90"],
    [178.7, 273.1, "Medial subchondral margin 91"],
    [162.2, 275.9, "Medial subchondral margin 92"],
    [145.7, 277.7, "Medial subchondral margin 93"],
    [128.8, 280.5, "Medial subchondral margin 94"],
    [120.3, 282.2, "Medial subchondral margin 95"],
  ];

  tibiaCoords.forEach(([x, y, label], i) => {
    pts.push({ index: 45 + i, x, y, region: "tibia", label });
  });

  return pts;
}

function generateFibulaPoints(): LandmarkPoint[] {
  const pts: LandmarkPoint[] = [];

  const fibCoords: [number, number, string][] = [
    [292.3, 430, "Fibular shaft lateral boundary, inferior"],
    [294.3, 414.2, "Fibular shaft point 97"],
    [297.2, 398.1, "Fibular shaft point 98"],
    [300.9, 382.4, "Fibular shaft point 99"],
    [305.7, 374.2, "Fibular neck lateral boundary"],
    [311.7, 366.4, "Fibular neck point 101"],
    [318.6, 358.7, "Fibular head, lateral margin apex"],
    [316.3, 348.2, "Fibular head superior margin 103"],
    [311.6, 339.4, "Fibular head superior margin 104"],
    [306, 330.1, "Fibular head superior margin 105"],
    [300.4, 320.8, "Fibular head superior apex"],
    [296.7, 318.6, "Fibular head medial slope"],
    [292.1, 317.7, "Fibular head medial margin peak"],
    [287.2, 317.5, "Fibular neck medial boundary 109"],
    [272.5, 323.4, "Fibular neck medial boundary 110"],
    [260.2, 331.8, "Fibular shaft medial boundary 111"],
    [252, 344.5, "Fibular shaft medial boundary 112"],
    [248.7, 359.8, "Fibular shaft medial boundary 113"],
    [255.1, 369.6, "Fibular shaft point 114"],
    [261.5, 378.9, "Fibular shaft point 115"],
    [265, 389.4, "Fibular shaft point 116"],
    [266.7, 402.7, "Fibular shaft point 117"],
    [267.7, 415.2, "Fibular shaft point 118"],
    [267.3, 428.9, "Fibular shaft medial boundary, inferior"],
  ];

  fibCoords.forEach(([x, y, label], i) => {
    pts.push({ index: 96 + i, x, y, region: "fibula", label });
  });

  return pts;
}

function generatePatellaPoints(): LandmarkPoint[] {
  const coords: [number, number, string][] = [
    [129.7, 186.2, "Patella, medial pole"],
    [135.7, 165.8, "Patella, medial superior border"],
    [149.7, 152, "Patella, medial superior facet"],
    [168.2, 142, "Patella, mid-superior dome"],
    [188, 136.1, "Patella, superior pole"],
    [208.6, 135.7, "Patella, lateral superior dome"],
    [228, 143.5, "Patella, lateral superior facet"],
    [238.5, 160.2, "Patella, lateral superior border"],
    [241.2, 180.8, "Patella, lateral pole"],
  ];

  return coords.map(([x, y, label], i) => ({
    index: 120 + i,
    x, y,
    region: "patella" as const,
    label,
  }));
}

export const LANDMARK_POINTS: LandmarkPoint[] = [
  ...generateFemurPoints(),
  ...generateTibiaPoints(),
  ...generateFibulaPoints(),
  ...generatePatellaPoints(),
];

// ──────────────────────────────────────────────
// Four Major Osteophyte Regions
// Positioned based on reference osteophyte atlas diagram:
//   Red = medial (left) femoral condyle margin
//   Green = lateral (right) femoral condyle margin
//   Yellow = medial (left) tibial plateau edge
//   Blue = lateral (right) tibial plateau edge
// ──────────────────────────────────────────────

export const OSTEOPHYTE_REGIONS: OsteophyteRegion[] = [
  {
    id: "medial-femoral",
    name: "Medial Femoral Osteophyte",
    color: "#EF4444",
    description: "Located along the medial margin of the femoral condyle. This region is commonly associated with medial compartment osteoarthritis and may contribute to progressive narrowing of the medial joint space.",
    svgPath: "M103.1,215.3 L100.8,218.5 L100.9,231.6 L102.2,243.4 L105.7,256.5 L104,259 L101.4,260.3 L98.1,267.3 L99.5,273.5 L105.6,279.6 L118.3,284.3 L133.3,285.2 L133.1,283.9 L128.8,281.5 L125.8,278.5 L122,269.2 L117.2,262.4 L116.9,259.3 L114,257.5 L112.5,238.8 L111,236.9 L112.1,235 L108.4,226.4 L106.7,216.4 L105.8,215.2Z",
  },
  {
    id: "lateral-femoral",
    name: "Lateral Femoral Osteophyte",
    color: "#22C55E",
    description: "Located along the lateral margin of the femoral condyle. These osteophytes are typically observed in lateral compartment disease and may accompany alterations in femoral condylar shape.",
    svgPath: "M291,236.4 L305.8,242.4 L308.8,259.9 L294.8,273.8 L263.8,263.1 L280.8,259.8 L286.8,255.9 L289.8,246.4Z",
  },
  {
    id: "medial-tibial",
    name: "Medial Tibial Osteophyte",
    color: "#EAB308",
    description: "Located at the medial edge of the tibial plateau. This is one of the most clinically important osteophyte locations because the medial compartment is frequently affected in knee osteoarthritis.",
    svgPath: "M126.3,265.4 L122,268.2 L121.2,271.4 L124.5,285 L127.3,289.7 L128.5,295.5 L131,297.5 L136.1,297.4 L136.2,292.6 L135,292.1 L134.4,286.8 L132.9,283.7 L131.5,271.1 L132.7,266.8 L128.6,265.3Z",
  },
  {
    id: "lateral-tibial",
    name: "Lateral Tibial Osteophyte",
    color: "#3B82F6",
    description: "Located at the lateral edge of the tibial plateau. These osteophytes often occur alongside lateral compartment degeneration and changes in tibial plateau morphology.",
    svgPath: "M289.9,252.4 L282.2,255.3 L278.7,259.6 L279.6,262.7 L277.2,266.5 L278.9,282.3 L285.8,292.7 L292.7,297.8 L299.5,297.6 L302.6,294.3 L302.5,293.3 L305.5,289.5 L308.2,283.6 L307.5,271.5 L306,268.9 L300.9,264.3 L296.1,256.5Z",
  },
];

// ──────────────────────────────────────────────
// Notable Landmarks (richer descriptions for key points)
// ──────────────────────────────────────────────

export const NOTABLE_LANDMARKS: NotableLandmark[] = [
  { index: 0, title: "Femoral Shaft Right", description: "The superior-most point of the femoral shaft on the lateral (right) side." },
  { index: 3, title: "Femoral Shaft Lateral Mid", description: "Mid-shaft point on the lateral side of the femur." },
  { index: 8, title: "Femoral Metaphysis Lateral", description: "Lateral metaphyseal transition point of the femur." },
  { index: 16, title: "Lateral Condyle Inferior", description: "The inferior-most point of the lateral femoral condyle curve." },
  { index: 17, title: "Lateral Condyle Articular", description: "Articular surface of the lateral femoral condyle." },
  { index: 22, title: "Intercondylar Notch Center", description: "Deepest point of the femoral intercondylar notch." },
  { index: 27, title: "Medial Condyle Articular", description: "Articular surface of the medial femoral condyle." },
  { index: 28, title: "Medial Condyle Inferior", description: "The inferior-most point of the medial femoral condyle curve." },
  { index: 36, title: "Femoral Metaphysis Medial", description: "Medial metaphyseal transition point of the femur." },
  { index: 41, title: "Femoral Shaft Medial Mid", description: "Mid-shaft point on the medial side of the femur." },
  { index: 44, title: "Femoral Shaft Left", description: "The superior-most point of the femoral shaft on the medial (left) side." },
  
  { index: 45, title: "Lateral Tibial Shaft Bottom", description: "Distal boundary point of the lateral tibial shaft outline." },
  { index: 48, title: "Lateral Tibial Shaft Mid", description: "Mid-shaft boundary point of the lateral tibia." },
  { index: 52, title: "Lateral Tibial Shaft Top", description: "Proximal boundary point of the lateral tibial shaft." },
  { index: 57, title: "Lateral Tibial Plateau Edge", description: "Lateral-most corner of the tibial plateau articular surface." },
  { index: 60, title: "Lateral Plateau Articular Center", description: "Central articular region of the lateral tibial plateau." },
  { index: 62, title: "Lateral Tibial Spine Base", description: "The base of the lateral intercondylar eminence (spine) of the tibia." },
  { index: 65, title: "Intercondylar Eminence Center", description: "Central valley between the medial and lateral tibial spines." },
  { index: 67, title: "Medial Tibial Spine Base", description: "The base of the medial intercondylar eminence (spine) of the tibia." },
  { index: 70, title: "Medial Plateau Articular Center", description: "Central articular region of the medial tibial plateau." },
  { index: 73, title: "Medial Tibial Plateau Edge", description: "Medial-most corner of the tibial plateau articular surface." },
  { index: 78, title: "Medial Tibial Shaft Top", description: "Proximal boundary point of the medial tibial shaft." },
  { index: 82, title: "Medial Tibial Shaft Mid", description: "Mid-shaft boundary point of the medial tibia." },
  { index: 85, title: "Medial Tibial Shaft Bottom", description: "Distal boundary point of the medial tibial shaft outline." },
  
  { index: 96, title: "Fibular Shaft Lateral Bottom", description: "Distal lateral boundary point of the fibula outline." },
  { index: 99, title: "Fibular Shaft Lateral Top", description: "Proximal lateral boundary point of the fibular shaft." },
  { index: 102, title: "Fibular Head Lateral Apex", description: "The most lateral and proximal margin of the fibular head." },
  { index: 108, title: "Fibular Head Medial Peak", description: "Medial-most margin peak of the fibular head articulation." },
  { index: 113, title: "Fibular Shaft Medial Top", description: "Proximal medial boundary point of the fibular shaft." },
  { index: 116, title: "Fibular Shaft Medial Mid", description: "Mid-shaft medial boundary point of the fibula." },
  { index: 119, title: "Fibular Shaft Medial Bottom", description: "Distal medial boundary point of the fibula outline." },
  
  { index: 120, title: "Patella Medial Pole", description: "The medial pole of the patellar upper contour." },
  { index: 124, title: "Patella Superior Pole", description: "The highest superior dome point of the patella." },
  { index: 128, title: "Patella Lateral Pole", description: "The lateral pole of the patellar upper contour." }
];

// ──────────────────────────────────────────────
// SVG outline paths for the base knee anatomy
// Based on AP knee radiograph reference
// Femur: large bulbous condyles with deep intercondylar notch
// Tibia: flat plateau with prominent tibial spines
// ──────────────────────────────────────────────

export const KNEE_OUTLINES = {
  // Femur - right shaft descending
  femurShaftRight: "M279.9,25.3 L279.5,50.2 L279.7,75.2 L280.4,100.2 L282.8,115.2 L285.1,130.2",
  // Femur - right widening into lateral condyle
  femurWidenRight: "M285.1,130.2 L289.2,145.3 L295.7,158.5 L304.5,171.3 L307.7,183.6 L309.7,197.4",
  // Lateral condyle - large rounded curve
  lateralCondyle: "M309.7,197.4 L309.5,209.8 L306.3,223.1 L302.2,235.1 L308.9,246.2 L308.5,259.8 L300.6,267.4",
  // Lateral condyle bottom
  lateralCondyleBottom: "M300.6,267.4 L285.9,276.4 L265.4,277.1 L244.9,273.2",
  // Intercondylar notch - deep U shape
  intercondylarNotch: "M244.9,273.2 L226.9,266.2 L208,257.3 L188.4,250.7 L171.4,255.7 L156.7,265.4 L141.1,274",
  // Medial condyle bottom
  medialCondyleBottom: "M141.1,274 L123.9,276.1 L106,273.6 L93.8,265.5",
  // Medial condyle - large rounded curve
  medialCondyle: "M93.8,265.5 L89.7,251.5 L88.4,237.1 L87,223.4 L85.1,209.6 L83.8,194.7 L83.6,181.1",
  // Femur - left widening
  femurWidenLeft: "M83.6,181.1 L86.3,166.7 L91.6,153.6 L100.8,142.1 L109,129.4 L117.2,116.1",
  // Femur - left shaft ascending
  femurShaftLeft: "M117.2,116.1 L123.8,102.1 L129.3,88 L137,63.8 L144.7,39.2 L151.8,15",

  // Tibia - medial plateau
  medialPlateau: "M169.1,261.1 L155.9,290.1 L141,294.8 L126.3,293.7 L112.1,290.3 L97.8,286.2 L88.6,280.6",
  // Tibia - spines
  tibialSpines: "M226.1,279.1 L203.3,259.7 L196.9,266.3 L189.1,270 L179.3,266.7 L169.1,261.1",
  // Tibia - lateral plateau
  lateralPlateau: "M306.4,278.7 L292.6,287.9 L276.3,286.8 L258.7,287.1 L241.9,285.3 L226.1,279.1",

  // Tibia - medial shaft (going down)
  medialTibialShaft: "M88.6,280.6 L89.1,299.4 L92.3,312.1 L91.4,325.3 L92.9,337.4 L95,349.5 L100.5,361.4 L106.6,374 L111,385.2 L115.3,398.7 L117.5,419.9 L120.3,441.7 L122.5,463.5",
  // Tibia - lateral shaft (going down)
  lateralTibialShaft: "M222.4,472 L227.5,451.5 L234.3,430.2 L240.4,409.8 L248.5,392.6 L258.8,376.1 L271.7,361.6 L284.6,346.6 L289.1,336.3 L293.6,326 L300.9,307.9 L305,295.1 L306.4,278.7",

  // Tibia - subchondral plate lines
  medialSubchondral: "M152.4,270.1 L141.8,268.5 L123.1,271.3 L110.6,273.7 L97.5,275.8",
  lateralSubchondral: "M227.4,272.7 L238.9,274.6 L258.1,277 L274.5,277.9 L293.5,276.8",

  // Fibula - closed outline loop
  fibula: "M297.5,480 L302,459.5 L305.8,439.5 L310.8,419.7 L318.2,402.9 L327.3,387.4 L335,378.2 L333.3,364.4 L328.4,353.2 L320.9,342.4 L312.9,335 L305.9,327.9 L295.5,321.6 L285.3,326.3 L277.7,331.7 L263.1,340.9 L253,355.7 L246.8,372 L251.7,389.5 L256.7,405.9 L259.9,423.8 L260.3,440.9 L260.1,459 L260,476Z",

  // Patella - closed outline loop
  patella: "M142.1,116.5 L148.9,95.2 L164.7,79.9 L186.2,74.8 L208.9,74.4 L229.6,77.2 L249.6,86.7 L263.6,103.5 L267.5,125.4 Q204.8,170 142.1,116.5Z",
};
