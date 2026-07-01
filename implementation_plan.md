# Phase 1 Implementation Plan — Mifrah Zia Portfolio Website (Astro + Tailwind, localhost only)

## Context

Mifrah Zia needs a static personal/professional portfolio site built from her resume content. This is phase 1 only: a fully static, zero-backend site that runs on `localhost` via `npm run dev`, built with Astro + Tailwind CSS, scaffolded/authored with Claude Code. Deployment (EC2, CI/CD, domain/HTTPS) is explicitly out of scope and will be defined in a phase 2 doc. Per the user's conditions, this plan has been revised to incorporate specific technical preferences before implementation.

Confirmed decisions from user (via clarifying questions):
- Add **Education, Experience, and Certifications** as new dedicated sections (beyond the base Hero/About/Projects/Skills/Contact/Footer list), with nav links to each.
- Hero title: **"AI & Full-Stack Developer"**; tagline: **"Computer Science student building real-time AI and full-stack applications."**
- Contact/footer will display: **email, phone, LinkedIn, and GitHub**.
- LinkedIn URL, GitHub URL, and all project repo/live-demo links are **not present as visible text in the resume PDF** (only link labels) — these will be added as clearly marked `TODO` placeholders rather than guessed.

## Technical Preferences & Optimization
- **Icons & Performance**: Clean, inline SVGs will be used for all social, contact, and external link icons instead of importing heavy icon packages (like FontAwesome or react-icons) to keep the site fast and preserve Astro's zero-JS runtime.
- **No Profile Picture**: No profile photo/avatar placeholder will be used or created. The Hero layout will be designed to look clean, balanced, and centered without requiring a profile image.

## Content Mapping (source: resume PDF, no invented facts)

- **Name / Hero**: Mifrah Zia — Title: "AI & Full-Stack Developer" — Tagline as above. CTA buttons: "View Projects" → `#projects`, "Contact Me" → `#contact`. No profile photo or placeholder.
- **About**: bio expanded from the resume's Professional Summary ("Driven Computer Science student with a robust technical foundation in programming languages, machine learning, and software development...") into 2–4 paragraphs, noting COMSATS enrollment and project focus areas (AI/ML, full-stack, DevOps). Marked so the user can personalize tone later.
- **Skills** (from Technical Skills): grouped as
  - Languages: Python, SQL, Java, CSS, HTML, JavaScript, TypeScript, C, C++, Assembly, Linux
  - Frameworks & Libraries: React.js, Node.js, Express.js, MongoDB, Mongoose, TensorFlow, scikit-learn, NumPy, Flask, Socket.IO
  - Tools & Platforms: Cloudinary, Stripe, JWT, Git, Postman, Docker, Kubernetes, AWS
- **Projects** (all 4 from resume, exceeds the minimum of 3):
  1. AI-Powered Facial Recognition Attendance System — SSD + ResNet-50 (~95% accuracy), Flask-SocketIO, PostgreSQL. Links: TODO.
  2. C.L.A.R.A. — AI-Powered Articulation Therapy Assistant (ongoing final-year project) — Wav2Vec2, ONNX, transfer learning, FastAPI serving Whisper/Wav2Vec2/LLM + vector DB, py-feat/OpenCV/WebSocket for emotion detection. Marked "In Progress". Links: TODO.
  3. Gladius Knives E-commerce Platform — MERN + TypeScript, JWT auth, Cloudinary, SSR, admin dashboard, 40% faster load. Links: TODO.
  4. Spring PetClinic – DevOps Pipeline Implementation — DevOps Pipeline Implementation — Docker, Kubernetes, Terraform-provisioned AWS, 6-stage GitHub Actions CI/CD. Links: TODO.
- **Education**: COMSATS University Islamabad, BS Computer Science, 2022–2026, CGPA 3.50; Kinnaird College for Women University, Intermediate (FSc Pre-Engineering), 2020–2022, 85%.
- **Experience**: Event Coordinator – University Event Management Club; Digital Marketing Manager – Etsy Seller Shop Marketplace (descriptions verbatim from resume).
- **Certifications**: Cisco Networking Badge (Verified) – Cisco; Machine Learning Specialization – Stanford University (Coursera).
- **Contact / Footer**: email `mifrahtmz@gmail.com` (mailto), phone `+923318071888` (tel), LinkedIn (TODO placeholder URL), GitHub (TODO placeholder URL). Footer repeats these as inline SVG icon links plus a copyright line.

## Site Structure & Navigation

Single scrollable page (`src/pages/index.astro`), section order matching resume flow:
`Hero → About → Skills → Projects → Education → Experience → Certifications → Contact → Footer`

Nav bar links to every section by anchor id. Because there are 7 in-page links, the nav needs a **mobile hamburger toggle** (small vanilla-JS `<script>` scoped to `Navbar.astro`, no framework/runtime added) plus `sticky top-0` positioning. Smooth scrolling via CSS `scroll-behavior: smooth`, no JS library needed.

## Project Structure

```
AGENTS.md                  (created first, before any code)
README.md
astro.config.mjs
tailwind.config.mjs
package.json
src/
  layouts/BaseLayout.astro
  components/
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
  data/
    site.ts            (name, title, tagline, email, phone, social URLs — TODOs marked)
    projects.json       (title, description, tech[], githubUrl, liveUrl, status)
    skills.ts
    education.ts
    experience.ts
    certifications.ts
  pages/index.astro
  styles/global.css     (Tailwind directives)
```

Content/data is separated from markup (`src/data/*`) so future edits don't require touching component code, per the functional requirement.

## AGENTS.md Contents (created before any component code)

- **Stack**: Astro (static output), Tailwind CSS, npm, plain `.astro` components (no TypeScript in components; `.ts` used only for typed data files), Node version requirement.
- **Folder structure**: the tree above, explained briefly.
- **Coding conventions**: PascalCase component filenames, one section per component, Tailwind utility classes only (no custom CSS framework), semantic HTML (`header`/`nav`/`main`/`section`/`footer`), accessibility requirements (aria-labels on nav toggle, decorative icons aria-hidden), placeholder convention (`<!-- TODO: ... -->` / `// TODO:`).
- **Icons**: Inline SVG elements for all icons to optimize loading speeds.
- **Deployment target**: phase 1 = localhost via `npm run dev` only; explicitly notes phase 2 (EC2/CI-CD/domain) is out of scope and will update this doc when that phase starts.
- Note in the doc that it must be kept in sync as the project evolves.

## Incremental Commit Plan (deliverable: clear, incremental commits)

1. `chore: scaffold Astro project with Tailwind`
2. `docs: add AGENTS.md`
3. `feat: add base layout, global styles, sticky nav with smooth scroll + mobile menu`
4. `feat: add Hero section`
5. `feat: add About section`
6. `feat: add Skills section`
7. `feat: add Projects section (projects.json + ProjectCard)`
8. `feat: add Education section`
9. `feat: add Experience section`
10. `feat: add Certifications section`
11. `feat: add Contact section`
12. `feat: add Footer`
13. `chore: responsive + accessibility pass`
14. `docs: write README.md`

## Verification

- `npm run dev` → confirm site loads at `localhost:4321`, all 9 sections render with resume-derived content and visible `TODO` markers for links (with no profile photo placeholder).
- Resize/DevTools device toolbar to check mobile, tablet, desktop breakpoints; confirm mobile nav toggle works.
- Click every nav link and CTA button; confirm smooth in-page scrolling to the right section.
- Check semantic landmarks; spot-check color contrast.
- `npm run build` succeeds and outputs static files only (no server/backend dependency), confirming the phase-1 constraint.
- Manual cross-browser check by the user (Chrome/Firefox/Safari/Edge) since this environment only has Chromium available for automated checks.
