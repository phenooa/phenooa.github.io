import { Phenotype } from './types';

export const PHENOTYPES: Phenotype[] = [
  { name: "Body Size", probability: 82, color: "#10b981" },
  { name: "Global Atrophy", probability: 91, color: "#3b82f6" },
  { name: "Increased Cartilage", probability: 92, color: "#f59e0b" },
  { name: "Hypertrophic Knee", probability: 88, color: "#ef4444" },
  { name: "Knee Shape and Atrophy", probability: 85, color: "#8b5cf6" },
  { name: "End-stage Knee", probability: 87, color: "#6366f1" },
];

export const FEATURE_NAMES = [
  "Medial Osteophyte",
  "Lateral Osteophyte",
  "Medial JSN",
  "Lateral JSN",
  "Sclerosis",
  "Effusion",
  "Synovitis"
];

export const FEATURE_RESULTS = ["None", "Mild", "Moderate", "Severe", "Present", "Absent"];

export const STUDY_DATASETS = ["RESTORE", "MESKO", "SCULPTURE", "OAI"];
export const PATIENT_IDS = ["RST-00124", "RST-00125", "RST-00201", "RST-00342", "RST-00411"];
export const VISIT_TYPES = ["Baseline", "6 Month", "12 Month", "24 Month"];
export const LATERALITY_OPTIONS = ["Right Knee", "Left Knee"];
