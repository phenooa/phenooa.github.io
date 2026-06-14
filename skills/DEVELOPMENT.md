# PhenoOA Development Standards & Coding Guidelines

This guide establishes the coding conventions, performance safeguards, and build protocols required to maintain the stability of the **PhenoOA** workspace.

---

## 1. Technical Stack Constraints

- **Language**: TypeScript (with strict interfaces).
- **Core Framework**: React 18+ (bundled with Vite).
- **Styling Method**: Tailwind CSS utility classes exclusively. Avoid compiling separate styling blocks.
- **Animations**: Fluid, clean transitions provided by `motion` via the React port (`import { motion } from 'motion/react'`).

---

## 2. Component Best Practices

### A. Modularity & Clean Files
Never bundle multiple unrelated layouts into a single file. Large source files risk hitting token bounds and make troubleshooting difficult.
- Always move reusable features into `/src/components/shared/` (e.g. custom inputs, logos, interactive wrappers).
- Keep pages cleanly structured in `/src/components/views/`.
- Ensure workspace modules stay in `/src/components/workspace/` to prevent clutter.

### B. High Performance & Render Management
- Do not compute heavy UI matrices directly in render loops. Use `useMemo` for derived states or stats.
- Keep dependencies arrays inside `useEffect` stable — lean towards primitive types to prevent expensive infinite refetching cycles.

---

## 3. Maintenance Protocols

### A. Code Lints & Quality Gates
Always double-check safety using our localized verification suite:
- Run `npm run lint` regularly to inspect for type mismatches, missing handlers, or orphaned imports.
- Validate production build capability by executing `npm run build`.

### B. Adding Environment Variables safely
If third-party clinical or deep analytics model backends are connected in the future:
1. Always register all variables inside `.env.example` first to document key targets.
2. Maintain sever-side API proxy routing (such as Express) for all credential-verified systems. Never leak sensitive API strings or key details into the client-facing browser bundles.
