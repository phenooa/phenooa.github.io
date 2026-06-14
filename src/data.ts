export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface ValueCard {
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  badge: string;
}

export interface ScienceCard {
  title: string;
  description: string;
  tag: string;
}

export interface DownloadOption {
  os: string;
  subtitle: string;
  pkgType: string;
  btnText: string;
  filename: string;
  size: string;
  version: string;
}

export const VALUE_CARDS: ValueCard[] = [
  {
    title: "Preprocess X-rays",
    description: "Convert, normalize, auto-detect joint space lines, crop knee regions, and prepare radiography vectors for analysis.",
    iconName: "Maximize2"
  },
  {
    title: "Predict phenotypes",
    description: "Estimate structural osteoarthritis (OA) phenotype probabilities and flag confidence signals using MoE deep regression.",
    iconName: "Cpu"
  },
  {
    title: "Explore response",
    description: "Map patient structural subgroups with clinical outcome histories and longitudinal drug treatment trials.",
    iconName: "TrendingUp"
  }
];

export const HIGHLIGHT_BADGES = [
  { os: "macOS", subtitle: "For Apple Silicon and Intel Macs", suffix: ".dmg", size: "182 MB" },
  { os: "Windows", subtitle: "For Windows 10 and 11 64-bit", suffix: ".exe", size: "210 MB" }
];

export const RESEARCH_CARDS: ScienceCard[] = [
  {
    tag: "Aetiology",
    title: "OA heterogeneity",
    description: "Osteoarthritis presents markedly distinct bone and joint structural patterns under radiographic review, proving it is not a singular uniform disease but rather a combination of multiple diverse aetiological pathways."
  },
  {
    tag: "Deep Modeling",
    title: "Structural phenotypes",
    description: "Knee radiographs are mapped directly into phenotypic sub-groups by assessing joint spacing widths, osteophyte growth volumes, and subchondral bone density distribution patterns."
  },
  {
    tag: "Targeted Stratification",
    title: "Treatment response",
    description: "Our machine learning frameworks identify underlying clusters to understand why selective phenotypes respond radically differently to trial therapeutics or pain management interventions."
  },
  {
    tag: "Open Science",
    title: "Reproducible outputs",
    description: "By deploying standardized DICOM normalizations and deterministic crop ratios, we guarantee repeatable research outputs across diverse scanner manufacturers."
  }
];

export const FEATURE_GRID_ITEMS: FeatureCard[] = [
  {
    title: "DICOM & Image Import",
    description: "Supports automatic metadata parsing for lossless standard clinical DICOM slices, plus standard PNG, JPG, and JPEG radiographs.",
    badge: "Input"
  },
  {
    title: "Knee Detection & Cropping",
    description: "Built-in anchor model locates precise bounding dimensions for tibia, femur, and joint space coordinates without manual annotations.",
    badge: "Automation"
  },
  {
    title: "Image Normalization",
    description: "Aligns radiographic brightness distributions and pixel sizes dynamically to standardize visual evaluations.",
    badge: "Quality"
  },
  {
    title: "Phenotype Prediction",
    description: "Extracts deep latent parameters to deliver probabilities, class confidence flags, and statistical model uncertainties.",
    badge: "Inference"
  },
  {
    title: "Batch Processing Streams",
    description: "Process massive cohort directories containing thousands of subjects in parallel with high-velocity desktop performance.",
    badge: "Scale"
  },
  {
    title: "Rich Research Exports",
    description: "Generate structured tabular CSV/JSON databases, annotated inspection images, and customized PDF summary reports.",
    badge: "Output"
  }
];

export const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    os: "macOS",
    subtitle: "Recommended for Apple Silicon (M1/M2/M3/M4) & Intel Macs",
    pkgType: ".dmg package bundle",
    btnText: "Download for macOS",
    filename: "PhenoOA_Studio_v0.1.0_mac_arm64.dmg",
    size: "182 MB",
    version: "v0.1.0-beta"
  },
  {
    os: "Windows",
    subtitle: "Recommended for standard Windows 10 & 11 (64-bit systems)",
    pkgType: ".exe installer package",
    btnText: "Download for Windows",
    filename: "PhenoOA_Studio_v0.1.0_win_x64.exe",
    size: "210 MB",
    version: "v0.1.0-beta"
  },
  {
    os: "Offline Source Cluster",
    subtitle: "Python core engine & weights for absolute offline secure terminal execution",
    pkgType: ".zip source archive",
    btnText: "Download Offline Bundle",
    filename: "PhenoAO_Engine_Offline_v1.0.0.zip",
    size: "1.45 GB",
    version: "v1.0.0-release"
  }
];

export interface DemoSubject {
  id: string;
  age: number;
  gender: string;
  klGrade: number;
  assignedPhenotype: string;
  confidence: number;
  lowConfidence: boolean;
  notes: string;
  probabilities: { name: string; value: number }[];
  visualPoints: { x: number; y: number; label: string }[];
}

export const SAMPLE_SUBJECTS: DemoSubject[] = [
  {
    id: "Subject_081_Baseline",
    age: 62,
    gender: "Female",
    klGrade: 3,
    assignedPhenotype: "Severe Medial Narrowing (Phenotype A)",
    confidence: 0.88,
    lowConfidence: false,
    notes: "Pronounced medial joint space narrowing with prominent osteophyte formation on the femur margin. Low structural variation overall.",
    probabilities: [
      { name: "Medial Narrowing", value: 88 },
      { name: "Lateral Narrowing", value: 4 },
      { name: "Symmetric Sclerosis", value: 5 },
      { name: "Hypertrophic Osteophytes", value: 3 }
    ],
    visualPoints: [
      { x: 28, y: 48, label: "Femur Osteophyte (2.4mm)" },
      { x: 38, y: 56, label: "Medial Joint Space (1.1mm)" },
      { x: 72, y: 58, label: "Lateral Joint Space (4.2mm)" }
    ]
  },
  {
    id: "Subject_104_FollowUp",
    age: 58,
    gender: "Male",
    klGrade: 2,
    assignedPhenotype: "Lateral Narrowing / Osteophytic (Phenotype B)",
    confidence: 0.74,
    lowConfidence: false,
    notes: "Early-stage lateral joint space reduction. Joint space parameters on the medial side remain normal, bone alignment is satisfactory.",
    probabilities: [
      { name: "Medial Narrowing", value: 12 },
      { name: "Lateral Narrowing", value: 74 },
      { name: "Symmetric Sclerosis", value: 6 },
      { name: "Hypertrophic Osteophytes", value: 8 }
    ],
    visualPoints: [
      { x: 76, y: 46, label: "Lateral Osteophyte (1.2mm)" },
      { x: 70, y: 57, label: "Lateral Joint Space (1.9mm)" },
      { x: 34, y: 55, label: "Medial Joint Space (3.8mm)" }
    ]
  },
  {
    id: "Subject_223_Variant",
    age: 69,
    gender: "Female",
    klGrade: 4,
    assignedPhenotype: "Symmetric Hypertrophic (Phenotype C)",
    confidence: 0.91,
    lowConfidence: false,
    notes: "Near complete bone-on-bone abrasion symmetrically. Extreme subchondral sclerosis noted bilaterally, massive tibial spines ostephyte overload.",
    probabilities: [
      { name: "Medial Narrowing", value: 46 },
      { name: "Lateral Narrowing", value: 41 },
      { name: "Symmetric Sclerosis", value: 91 },
      { name: "Hypertrophic Osteophytes", value: 89 }
    ],
    visualPoints: [
      { x: 24, y: 50, label: "Bone Attrition" },
      { x: 50, y: 51, label: "Tibial Spine Hypertrophy" },
      { x: 76, y: 52, label: "Lateral Collapse" }
    ]
  }
];
