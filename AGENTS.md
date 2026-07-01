# Project Rules and Guidelines (AGENTS.md)

## Tech Stack
- **Framework**: Astro (Static Output mode)
- **Styling**: Tailwind CSS
- **Language**: Astro components (`.astro` files) using vanilla HTML/CSS/JS. TypeScript (`.ts`) is used exclusively for structured data files in `src/data/`.
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
    About.astro
    Skills.astro
    Projects.astro
    ProjectCard.astro
    Education.astro
    Experience.astro
    Certifications.astro
    Contact.astro
    Footer.astro
  data/                    # Project content data (kept separate from markup)
    site.ts                # Site metadata (name, title, contact info, TODO social URLs)
    projects.json          # Projects array (title, description, tech[], links, status)
    skills.ts              # Categorized technical skills
    education.ts           # Education history details
    experience.ts          # Professional and extracurricular experiences
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
- **Zero-JS Mandate**: Keep Astro's high-performance zero-JS delivery intact. Minimal client-side JS is allowed only for the mobile navigation toggle (inside a scoped `<script>` element in `Navbar.astro`).

## Project Scope
- **Phase 1 Target**: Localhost environment running via `npm run dev`. Fully static output with no server-side features, databases, or form submissions.
- **Phase 2 (Out of Scope for now)**: EC2 deployment, CI/CD pipeline, domain setup, and contact form backends. This document will be updated when Phase 2 begins.

---
*Note: This file serves as the source of truth for code style and scoping. It must be kept in sync as the project evolves.*
