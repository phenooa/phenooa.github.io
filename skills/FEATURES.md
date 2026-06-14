# PhenoOA Feature Specifications & Clinical Datasets

This specification outlines the functional features implemented in **PhenoOA Studio**, detailing clinical capabilities, pipeline workflows, and integrated benchmarks.

---

## 1. Deep Shape Matching & Auto-Phenotyping

The core scientific purpose of PhenoOA is translating raw pixel densities into standardized osteoarthritic subtyping models:

1. **Automated Landmark Initialization**:
   - Plots precise coordinate vectors on both the femoral condyles and tibial plateau boundary lines (80+ joint points).
   - Resolves anatomic rotational variation automatically to ensure uniform scoring indices.

2. **Osteophyte Severity Profiling**:
   - Outlines localized calcifications on margins.
   - Highlights osteophytes using dynamic active contours to calculate severity percentages.

3. **Joint Space Narrowing (JSN)**:
   - Measures vertical joint width across both medial and lateral divisions.
   - Converts pixels into millimeter-scale distances, outputting clear cartilage indicators.

---

## 2. Interactive Study Datasets

The Workspace links directly to famous clinical osteoarthritis research repositories, each populated with distinct patient profiles to demonstrate scale stability:

- **RESTORE**: Standalone localized clinical cohort. High-fidelity baseline data.
- **MESKO (Multicenter Evaluation)**: Larger demographic variation demonstrating robust shape-matching accuracy in crowded bone profiles.
- **SCULPTURE**: Special intervention study targeting fast joint space mapping.
- **OAI (Osteoarthritis Initiative)**: Complete validation cohort representing standard gold-standard clinical research datasets.

---

## 3. Sandboxed Active Workspace UI

The Workspace interface (`/src/components/workspace/*`) operates as a cohesive, full-bleed medical simulator:

- **Dual State Comparison**: Allows immediate comparison toggles (`before` and `after` analytics overlays). This allows clinical researchers to instantly inspect the accuracy of joint boundary detections.
- **Statistical Results Panel**: Dynamically displays neural network confidence indicators, subtyping probability distributions (e.g. hypertrophic knee, global atrophy), and structural metrics.
- **Report Generator**: Combines current metadata and analysis results into a structured, printable local clinic report.
