# PhenoOA AI Agent Coding Guidelines

This guide details best practices and architectural guardrails for AI coding agents working on the **PhenoOA** codebase.

---

## 1. Directory Structure & File Size Rules

- **Strict File Limit**: No single React component or page component file should exceed **200 lines**.
- **Folder-per-Page Pattern**: Split any new view or complex workspace page into a folder under `src/components/views/[name]/`.
  - Use an orchestrator component (e.g. `HomeView.tsx`) to compose the page.
  - Extract sections and large subcomponents into sibling files inside the folder (e.g., `HeroSection.tsx`).
  - Create a barrel export (`index.ts`) in the folder to export the orchestrator as default.
- **Shared Components**: Put highly reusable, layout-level, or brand elements in `src/components/shared/`.

---

## 2. Type & Data Separation

- **Centralized Types**: Declare all TypeScript types and interfaces in `src/types.ts`. Avoid inline interfaces or multiple definitions in multiple files.
- **Pure Data Constants**: Keep `src/data.ts` dedicated purely to raw static data (text blocks, list items, configurations, etc.). All exports here must be typed using imports from `src/types.ts`.
- **Zero Dead Code**: Delete unused types and imports immediately when refactoring.

---

## 3. Client-Side Hash Routing

- **Config-Driven Router**: Define paths, hashes, and components in the `ROUTES` array in `src/App.tsx`.
- **Navigation Prop**: Avoid using raw browser history; instead, pass and use the `onNavigate` handler prop to control transitions.
- **Auto Scrolling**: When modifying routing, ensure transitions perform an instant reset to scroll `top: 0` to prevent layout jumps.

---

## 4. Coding Style & Clean Code

- **Prop Typing**: Explicitly type all component props. Use `interface` instead of inline types.
- **Tailwind Consistency**: Rely on the Tailwind utility setup defined in `src/index.css` and `tailwind.config` / `@tailwindcss/vite`.
- **Micro-Animations**: Utilize `motion` components (`import { motion } from 'motion/react'`) for interactive states and transitions.
- **Documentation**: Keep comments concise. Update `/skills/` documents when changing directory layouts, APIs, or project dependencies.

---

## 5. Agent Verification Checklist

Before finishing any task:
1. Run `npm run lint` (`tsc --noEmit`) to verify type safety.
2. Run `npm run build` (`vite build`) to confirm compilation succeeds without bundler errors.
3. Review `git diff` to ensure no temporary or residual files are left behind.
