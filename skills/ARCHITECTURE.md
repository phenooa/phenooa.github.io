# PhenoOA Architectural Directory & Design Systems

This document describes the high-level code layout, theme architecture, and routing mechanics of the **PhenoOA Studio** codebase. It acts as an engineering manual for maintaining structural alignment and ensuring professional UI fidelity.

---

## 1. Directory Blueprint

The project follows a modular, role-based directory structure inside `src/`. All components have been structured into folders to maximize reusability, modular scaling, and debugging simplicity:

```text
/src
├── App.tsx                        # Main App container & Hash router mount
├── main.tsx                       # Framework entry point
├── types.ts                       # Common TypeScript domain types
├── constants.ts                   # Clinical standards, phenotypes, and datasets constants
├── data.ts                        # Curated scientific texts, research outputs, and feature lists
├── index.css                      # Tailwind imports & Custom multi-theme token declarations
└── components/
    ├── shared/                    # Layout and global shared modules
    │   ├── Header.tsx             # Interactive navigation bar & download trigger
    │   ├── Footer.tsx             # Standard localized institutional alignment footer
    │   ├── OALogo.tsx             # Responsive high-fidelity SVG brand identity
    │   ├── ThemeSwitcher.tsx      # Hover-triggered theme variant matrix controller
    │   ├── UI.tsx                 # Micro-animation primitives (e.g. CountUp, Custom cards)
    │   └── assets.ts              # CDN/GitHub hosted image references and clinical publications
    │
    ├── views/                     # Top-level standalone full-screen page content
    │   ├── HomeView.tsx           # Product landing, core values, search-simulation portal
    │   ├── ResearchView.tsx       # Peer-reviewed references, cohort statistics, scientific methods
    │   ├── FeaturesView.tsx       # Multimodal toolchain walkthrough and pipeline steps
    │   ├── AboutView.tsx          # Leading clinical investigators and consortium placeholder
    │   ├── DownloadView.tsx       # Cross-platform client download layout (with simulated mac download)
    │   └── DemoView.tsx           # Multi-modal clinical workbench stage
    │
    └── workspace/                 # Sandbox features specific to the Live clinical workbench
        ├── ImageViewer.tsx        # High-resolution canvas with togglable segmented overlay nodes
        ├── ParticipantSidebar.tsx # Patient list indexer grouped by international clinical cohorts
        ├── ResultsPanel.tsx       # Live status manager and statistical model outputs panel
        └── ReportModal.tsx        # Standalone clinical PDF-ready summary format generator
```

---

## 2. Global State & Client-Side Routing

To maintain high load speeds and full stability across hosting sandboxes, routing is handled on-client via a lightweight **Hash Hash-Change Router** in `App.tsx`:

- **Path State Matching**: Listening directly to standard `#` hashes (e.g., `#features`, `#download`).
- **Scroll Alignment**: Triggers dynamic native scrolling resets to `top: 0` using a browser-safe `instant` or `smooth` behavior to preserve clean transitioning animations between screens.
- **Theme Injection**: Read/write from local storage `phenooa-theme` persists between clinical research sessions, mounting theme descriptors safely on the custom HTML tags dynamically.

---

## 3. Dynamic Styling & Multi-Theme Tokens

Tailwind is wired natively in the stylesheet `/src/index.css` via custom theme injection brackets:

- **Teal Matrix Theme**: Designed with custom off-whites and rich, high-contrast surgical teals.
- **Light/Dark modes**: Fluid dynamic colors defined via `--bg-main` and `--text-primary` attributes.
- **Typography Pairings**: Pairings of heavy display headings styled inline against lightweight monospaced statuses (`font-mono tracking-wider`) reinforce an architectural grid.
