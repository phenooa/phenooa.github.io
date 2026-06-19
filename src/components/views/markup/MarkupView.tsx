import React from "react";
import { BookOpen, Layers, MapPin, Search, Activity, Brain, FileText, Microscope, Target, Eye } from "lucide-react";
import KneeAtlasExplorer from "./KneeAtlasExplorer";
import { OSTEOPHYTE_REGIONS } from "./atlasData";

export default function AtlasView() {
  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative pb-24 min-h-screen font-sans">

      {/* Background radial glow */}
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-brand-electric/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-brand-glow/8 blur-[120px] pointer-events-none" />

      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto text-left relative z-10 space-y-4 animate-in fade-in duration-300">
        <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase block">
          [ Digital Anatomical Reference ]
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-tight">
          Osteophyte <br />
          <span className="font-serif italic-heavy text-brand-glow">Atlas</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-3xl">
          Understanding knee osteophytes through anatomical landmarks and AI-assisted visualisation. An interactive anatomical reference for clinicians, researchers, and students.
        </p>

        <div className="h-[1px] w-full bg-border-panel pt-4" />
      </section>

      {/* ═══════════════════════════════════════════════
          OVERVIEW
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <BookOpen className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">Overview</h2>
          </div>

          <div className="bg-bg-panel border border-border-panel rounded-2xl p-6 md:p-8 space-y-4">
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              The Osteophyte Atlas is an interactive anatomical reference designed to help clinicians, researchers, and students understand the location and morphology of osteophytes on knee radiographs.
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              The atlas combines a detailed <strong className="text-text-primary font-medium">129-point knee landmark model</strong> with AI-based osteophyte segmentation to provide a consistent and interpretable framework for evaluating structural osteoarthritis (OA).
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              Unlike traditional grading systems that describe osteophytes using qualitative terms such as "small", "moderate", or "large", the Osteophyte Atlas links every osteophyte to specific anatomical regions of the knee, allowing users to understand exactly where bony outgrowths occur and how they relate to surrounding structures.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY AN OSTEOPHYTE ATLAS?
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <Search className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">Why an Osteophyte Atlas?</h2>
          </div>

          <div className="bg-bg-panel border border-border-panel rounded-2xl p-6 md:p-8 space-y-4">
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              Osteophytes are one of the hallmark structural features of osteoarthritis. They represent abnormal bony outgrowths that develop around joint margins as the joint adapts to long-term mechanical stress and degeneration.
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              However, osteophytes vary considerably between individuals:
            </p>
            <ul className="space-y-2 pl-1">
              {[
                "They can occur at multiple anatomical locations.",
                "Their shape and size vary widely.",
                "Their boundaries are often irregular.",
                "The same radiographic grade may represent very different morphologies.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-glow mt-1.5 shrink-0" />
                  <span className="font-sans text-sm text-text-secondary font-light">{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              For these reasons, visual interpretation alone can be subjective and inconsistent.
            </p>
            <div className="border-t border-border-panel pt-4">
              <p className="font-sans text-sm text-text-primary leading-relaxed font-medium">
                The Osteophyte Atlas provides a standardized anatomical framework that enables consistent identification, visualization, and interpretation of osteophytes across different patients and datasets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          INTERACTIVE KNEE ATLAS EXPLORER
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-6xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <MapPin className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">Interactive Anatomy Explorer</h2>
              <p className="font-mono text-[10px] text-brand-glow uppercase tracking-wider mt-0.5">Click or hover to explore</p>
            </div>
          </div>

          <KneeAtlasExplorer />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          129-POINT LANDMARK MODEL
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <Layers className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">The 129-Point Knee Landmark Model</h2>
          </div>

          <p className="font-sans text-sm text-text-secondary leading-relaxed font-light max-w-3xl">
            The atlas is built upon a 129-point anatomical landmark model that captures the shape of the major knee structures visible on an anteroposterior knee radiograph.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Femur */}
            <div className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                <h3 className="font-display text-sm font-bold text-text-primary">Femur (Points 0–44)</h3>
              </div>
              <ul className="space-y-1.5 pl-1">
                {["Femoral shaft", "Medial femoral condyle", "Lateral femoral condyle", "Intercondylar notch"].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-text-muted mt-1.5 shrink-0" />
                    <span className="font-sans text-xs text-text-secondary font-light">{s}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[11px] text-text-muted leading-relaxed font-light">
                Key landmarks identify transitions between the shaft and condyles, condylar corners, and important anatomical reference points used in shape analysis.
              </p>
            </div>

            {/* Tibia */}
            <div className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <h3 className="font-display text-sm font-bold text-text-primary">Tibia (Points 45–95)</h3>
              </div>
              <ul className="space-y-1.5 pl-1">
                {["Tibial shaft", "Medial tibial plateau", "Lateral tibial plateau", "Tibial spines", "Tibial condyles"].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-text-muted mt-1.5 shrink-0" />
                    <span className="font-sans text-xs text-text-secondary font-light">{s}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[11px] text-text-muted leading-relaxed font-light">
                These landmarks are particularly important for evaluating joint space narrowing and osteophyte formation along the tibial margins.
              </p>
            </div>

            {/* Fibula */}
            <div className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185]" />
                <h3 className="font-display text-sm font-bold text-text-primary">Fibula (Points 96–119)</h3>
              </div>
              <ul className="space-y-1.5 pl-1">
                {["Fibular shaft", "Fibular neck", "Fibular head"].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-text-muted mt-1.5 shrink-0" />
                    <span className="font-sans text-xs text-text-secondary font-light">{s}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[11px] text-text-muted leading-relaxed font-light">
                Although the fibula is not a primary site for osteophyte assessment, it provides important anatomical context and assists with image alignment and quality control.
              </p>
            </div>

            {/* Patella */}
            <div className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF]" />
                <h3 className="font-display text-sm font-bold text-text-primary">Patella (Points 120–128)</h3>
              </div>
              <p className="font-sans text-xs text-text-secondary font-light leading-relaxed">
                The patellar landmarks describe the superior contour of the patella and provide additional anatomical reference points within the knee joint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LANDMARK POINTS VS OSTEOPHYTES
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <Target className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">Landmark Points versus Osteophytes</h2>
          </div>

          <div className="bg-bg-panel border border-border-panel rounded-2xl p-6 md:p-8 space-y-4">
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              The 129 landmark points are used to describe the <strong className="text-text-primary font-medium">normal anatomical shape</strong> of the knee.
            </p>
            <p className="font-sans text-sm text-text-primary leading-relaxed font-medium">
              Osteophytes, however, are not represented using landmark points.
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              This is an important distinction. Because osteophytes vary greatly in size and shape, a small number of points cannot adequately describe their morphology.
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              Instead, osteophytes are represented using <strong className="text-text-primary font-medium">segmentation masks</strong> that capture the complete outline of the bony outgrowth. This approach allows the atlas to accurately represent:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {[
                "Small marginal osteophytes",
                "Large protruding osteophytes",
                "Irregular osteophyte morphology",
                "Complex osteophyte shapes",
              ].map((item, i) => (
                <div key={i} className="bg-bg-panel-strong border border-border-panel rounded-xl px-3 py-2.5 text-center">
                  <span className="font-sans text-[11px] text-text-secondary font-light">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-sans text-xs text-text-muted leading-relaxed font-light pt-2">
              …while maintaining anatomical consistency through the underlying landmark framework.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LANDMARK CONFIGURATION & PHENOTYPES
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <Activity className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">Landmark Configuration & Phenotypes</h2>
          </div>

          <div className="bg-bg-panel border border-border-panel rounded-2xl p-6 md:p-8 space-y-6">
            <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
              Rather than presenting a static geometry, the 129 landmark coordinate framework serves as a dynamic system. The <strong className="text-text-primary font-medium">relative spatial configuration</strong> of these landmarks is mathematically evaluated to define localized joint characteristics and overall knee osteoarthritis phenotypes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold text-text-primary">1. Joint Space Width (JSW) & Narrowing</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
                  Localized JSW is quantified by tracking the relative vertical distance between paired femoral and tibial articular surfaces:
                </p>
                <ul className="space-y-2 text-xs text-text-secondary font-light">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-glow mt-1.5 shrink-0" />
                    <span><strong>Medial Compartment JSW:</strong> Distance between medial condyle bottom points (25–28) and medial plateau margin (67–73).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-glow mt-1.5 shrink-0" />
                    <span><strong>Lateral Compartment JSW:</strong> Distance between lateral condyle bottom points (16–19) and lateral plateau margin (57–62).</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-sm font-semibold text-text-primary">2. Bony Remodelling & Spine Height</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
                  Lateral bony expansion and spine elevation parameters are calculated to track structural changes:
                </p>
                <ul className="space-y-2 text-xs text-text-secondary font-light">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-glow mt-1.5 shrink-0" />
                    <span><strong>Condylar Apex Expansion:</strong> The horizontal offset between lateral epicondyle/condyle apex (13) and medial apex (30).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-glow mt-1.5 shrink-0" />
                    <span><strong>Tibial Spine Hypertrophy:</strong> Height of the lateral peak (63) and medial peak (66) relative to the plateau baseline.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border-panel pt-6">
              <h3 className="font-display text-sm font-semibold text-text-primary mb-3">Phenotype Mapping: Patient Example KL3HYK</h3>
              <div className="bg-bg-panel-strong border border-border-panel rounded-xl p-4 md:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-electric/15 text-brand-glow border border-brand-electric/25">
                      Case Study
                    </span>
                    <span className="font-mono text-xs text-text-primary font-bold">KL3HYK (Real Patient Data)</span>
                  </div>
                  <span className="font-sans text-xs text-brand-glow font-medium">Phenotype: Hypertrophic Knee (KL Grade 3)</span>
                </div>
                
                <p className="font-sans text-xs text-text-secondary leading-relaxed font-light">
                  Analyzing the relative landmark coordinates of patient <strong>KL3HYK</strong> highlights the key features of the <strong className="text-text-primary font-medium">Hypertrophic Phenotype</strong>:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-light">
                  <div className="p-3 bg-bg-main border border-border-panel rounded-lg">
                    <span className="block font-semibold text-text-primary mb-1">Medial & Lateral Expansion</span>
                    <span className="text-[11px] text-text-secondary">Pronounced lateral epicondyle margin at point 13 and medial margin expansion at point 30, coupled with significant osteophyte development.</span>
                  </div>
                  <div className="p-3 bg-bg-main border border-border-panel rounded-lg">
                    <span className="block font-semibold text-text-primary mb-1">Joint Space Narrowing</span>
                    <span className="text-[11px] text-text-secondary">Marked narrowing of both compartments (JSN Grade 3 lateral, Grade 2 medial) indicated by reduced vertical distance between femur condyles and tibia plateau.</span>
                  </div>
                  <div className="p-3 bg-bg-main border border-border-panel rounded-lg">
                    <span className="block font-semibold text-text-primary mb-1">Subchondral Bone Margin</span>
                    <span className="text-[11px] text-text-secondary">Perfect alignment of the lateral (86–90) and medial (91–95) subchondral plates, highlighting localized sclerosis areas.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOUR MAJOR OSTEOPHYTE REGIONS
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <Microscope className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">Four Major Osteophyte Regions</h2>
          </div>

          <p className="font-sans text-sm text-text-secondary leading-relaxed font-light max-w-3xl">
            The atlas identifies four primary osteophyte regions around the tibiofemoral joint.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OSTEOPHYTE_REGIONS.map((region) => (
              <div
                key={region.id}
                className="bg-bg-panel border rounded-2xl p-5 space-y-3 hover:shadow-lg transition-all duration-300 group"
                style={{ borderColor: `${region.color}30` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                    <h3 className="font-display text-sm font-bold text-text-primary">{region.name}</h3>
                  </div>
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold border"
                    style={{ color: region.color, borderColor: `${region.color}40`, backgroundColor: `${region.color}10` }}
                  >
                    {region.color}
                  </span>
                </div>
                <p className="font-sans text-xs text-text-secondary font-light leading-relaxed">
                  {region.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW TO INTERPRET THE ATLAS
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <Eye className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">How to Interpret the Atlas</h2>
          </div>

          <p className="font-sans text-sm text-text-secondary leading-relaxed font-light max-w-3xl">
            The atlas is designed to be used in three simple steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: 1,
                title: "Identify Anatomical Structures",
                description: "The landmark model outlines the femur, tibia, fibula, and patella. These landmarks provide a standardized anatomical coordinate system for every knee radiograph.",
                icon: <Layers className="h-5 w-5" />,
              },
              {
                step: 2,
                title: "Visualize Osteophyte Segmentation",
                description: "AI-generated segmentation masks highlight osteophytes detected around the joint margins. Each osteophyte region is colour-coded according to its anatomical location.",
                icon: <Activity className="h-5 w-5" />,
              },
              {
                step: 3,
                title: "Relate Osteophytes to Anatomy",
                description: "The segmented osteophyte can then be interpreted in relation to surrounding anatomical landmarks, helping users understand the origin, compartment, and structural pattern of osteoarthritis.",
                icon: <Brain className="h-5 w-5" />,
              },
            ].map((item) => (
              <div key={item.step} className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-4 group hover:border-brand-glow/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center text-brand-glow group-hover:bg-brand-electric group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-glow uppercase tracking-widest font-bold">Step {item.step}</span>
                    <h3 className="font-display text-sm font-bold text-text-primary">{item.title}</h3>
                  </div>
                </div>
                <p className="font-sans text-xs text-text-secondary font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* What Step 3 reveals */}
          <div className="bg-bg-panel border border-border-panel rounded-xl p-4 mt-2">
            <p className="font-mono text-[10px] text-brand-glow uppercase tracking-wider font-bold mb-2">Step 3 enables users to understand:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "Where the osteophyte originated",
                "Which compartment is affected",
                "Relation to surrounding structures",
                "Overall structural OA pattern",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-glow mt-1 shrink-0" />
                  <span className="font-sans text-[11px] text-text-secondary font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          APPLICATIONS
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <FileText className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-2xl font-light text-text-primary tracking-tight">Applications</h2>
          </div>

          <p className="font-sans text-sm text-text-secondary leading-relaxed font-light max-w-3xl">
            The Osteophyte Atlas supports multiple use cases across research and clinical practice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Research */}
            <div className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-3 group hover:border-brand-glow/30 transition-all">
              <h3 className="font-display text-sm font-bold text-text-primary group-hover:text-brand-glow transition-colors">Research</h3>
              <ul className="space-y-1.5">
                {[
                  "Large-scale osteoarthritis phenotyping",
                  "Shape analysis studies",
                  "Osteophyte burden quantification",
                  "Longitudinal disease progression analysis",
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-glow mt-1.5 shrink-0" />
                    <span className="font-sans text-xs text-text-secondary font-light">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinical Interpretation */}
            <div className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-3 group hover:border-brand-glow/30 transition-all">
              <h3 className="font-display text-sm font-bold text-text-primary group-hover:text-brand-glow transition-colors">Clinical Interpretation</h3>
              <ul className="space-y-1.5">
                {[
                  "Standardized osteophyte assessment",
                  "Visual quality control",
                  "Improved consistency between readers",
                  "Enhanced reporting and communication",
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-glow mt-1.5 shrink-0" />
                    <span className="font-sans text-xs text-text-secondary font-light">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explainable AI */}
            <div className="bg-bg-panel border border-border-panel rounded-2xl p-5 space-y-3 group hover:border-brand-glow/30 transition-all">
              <h3 className="font-display text-sm font-bold text-text-primary group-hover:text-brand-glow transition-colors">Explainable AI</h3>
              <p className="font-sans text-xs text-text-secondary font-light leading-relaxed">
                The atlas provides an interpretable bridge between deep learning outputs and recognizable anatomical structures.
              </p>
              <p className="font-sans text-xs text-text-secondary font-light leading-relaxed">
                Instead of producing a prediction without explanation, the atlas allows users to see precisely where structural abnormalities occur and how they contribute to the model's assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OSTEOPHYTE ATLAS WITHIN PHENOOA
      ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-8 max-w-5xl mx-auto relative z-10">
        <div className="bg-bg-panel border border-brand-glow/20 rounded-2xl p-6 md:p-8 space-y-4 shadow-[0_0_30px_rgba(45,212,191,0.05)]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
              <Brain className="h-4.5 w-4.5 text-brand-glow" />
            </div>
            <h2 className="font-display text-xl font-light text-text-primary tracking-tight">Osteophyte Atlas within PhenoOA</h2>
          </div>

          <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
            The Osteophyte Atlas forms part of the PhenoOA platform, an AI-powered framework for structural osteoarthritis phenotyping.
          </p>
          <p className="font-sans text-sm text-text-secondary leading-relaxed font-light">
            By combining anatomical landmarks, shape analysis, and osteophyte segmentation, the atlas enables transparent and explainable evaluation of knee osteoarthritis from standard radiographs.
          </p>
          <div className="border-t border-border-panel pt-4">
            <p className="font-sans text-sm text-text-primary leading-relaxed font-medium">
              The result is a visual reference system that helps transform complex AI outputs into clinically meaningful anatomical insights.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
