# Project Rules and Guidelines (AGENTS.md)

## Tech Stack
- **Framework**: Astro (Static Output mode) with the `@astrojs/react` integration for one interactive island (see Zero-JS Mandate below).
- **Styling**: Tailwind CSS
- **Language**: Astro components (`.astro` files) using vanilla HTML/CSS/JS. TypeScript (`.ts`) is used exclusively for structured data files in `src/data/`. React (`.tsx`) is used exclusively for `src/components/react/` islands.
- **Package Manager**: npm
- **Node.js**: Expected environment is standard LTS.

## Directory Structure
```
AGENTS.md                  # This rules and guidelines file
README.md                  # Setup and execution instructions
astro.config.mjs           # Astro configuration
tailwind.config.mjs        # Tailwind configuration
package.json               # Package manifests and scripts
src/
  layouts/BaseLayout.astro # Base layout containing common head, meta, and wrapper markup
  components/              # Reusable Astro components (one per portfolio section)
    Navbar.astro
    Hero.astro
    Projects.astro
    Education.astro
    Experience.astro
    Certifications.astro
    Contact.astro
    Footer.astro
    react/                  # React islands (only where a static/CSS-only approach can't deliver the interaction)
      ExpandableProjects.tsx
  data/                    # Project content data (kept separate from markup)
    site.ts                # Site metadata (name, title, contact info, social URLs)
    projects.json          # Projects array (title, description, tech[], status)
    education.ts           # Education history details
    experience.ts          # Professional experience (role, company, dates)
    certifications.ts      # Certifications listing
  pages/
    index.astro            # Single-page index file importing all sections
  styles/
    global.css             # Tailwind base, utilities, and components directives
```

## Coding Conventions
1. **Component Filenames**: Use PascalCase for all Astro components (e.g., `ProjectCard.astro`).
2. **One Section Per Component**: Keep HTML structure modular. Each major section of the page must be its own component inside `src/components/`.
3. **Styling**: Use utility-first Tailwind CSS classes only. Do not write custom CSS rules in components unless absolutely necessary (prefer Tailwind utility classes).
4. **Semantic HTML**: Ensure proper use of landmark and structural elements (e.g., `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`-`<h6>`).
5. **Accessibility (a11y)**:
   - Provide clear, descriptive `aria-label` tags for interactive elements (such as the mobile nav toggle).
   - Ensure color contrast complies with accessibility guidelines.
   - For all decorative SVGs or design elements, set `aria-hidden="true"`.
6. **Placeholders and TODOs**: Use standard comments for incomplete assets or placeholders:
   - Astro/HTML: `<!-- TODO: Replace with live link -->`
   - TS/JS: `// TODO: Replace placeholder URL`

## Performance & Icons Policy
- **No Third-Party Icon Packages**: Do not import or install external icon packages (e.g., FontAwesome, React Icons). All icons (GitHub, LinkedIn, contact mail, external links) must be written as clean, responsive, inline `<svg>` elements inside the components.
- **Zero-JS Mandate**: Keep Astro's high-performance zero-JS delivery intact by default. Minimal client-side JS is allowed for the mobile navigation toggle (inside a scoped `<script>` element in `Navbar.astro`), plus exactly one hydrated React island — `src/components/react/ExpandableProjects.tsx` (`client:load`, using `motion/react`) — for the shared-layout expand animation on project cards, since that interaction isn't achievable with CSS alone. Do not add further React islands or animation libraries without a similarly specific interaction need; prefer CSS/Astro for everything else.

## Project Scope
- **Phase 1 Target**: Localhost environment running via `npm run dev`. Fully static output with no server-side features, databases, or form submissions.
- **Phase 2 (Out of Scope for now)**: EC2 deployment, CI/CD pipeline, domain setup, and contact form backends. This document will be updated when Phase 2 begins. (done)

---
*Note: This file serves as the source of truth for code style and scoping. It must be kept in sync as the project evolves.*
