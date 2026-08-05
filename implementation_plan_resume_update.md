# Plan: Update portfolio content (new resume), maroon/hunter-green theme, resume-order sections, link TODO checklist

## Architecture Context
- Astro static site, one component per section, all content externalized into `src/data/*.ts` / `.json` — followed from `AGENTS.md` and `src/pages/index.astro`.
- Section order on the page is controlled purely by import/JSX order in `src/pages/index.astro:15-26` — no routing or CMS involved.
- Styling is Tailwind utility classes only, no custom CSS except keyframes/scoped `<style>` blocks — followed from `AGENTS.md` "Coding Conventions #3" and confirmed in `src/components/Hero.astro:48-70`.
- Tailwind v4 is configured via CSS-first `@theme` block in `src/styles/global.css:3-5` (no `tailwind.config.mjs` present, despite AGENTS.md mentioning one) — new brand colors must be added as `@theme` tokens here so components can use them as utility classes (e.g. `bg-maroon-600`), consistent with how `--font-sans` is already declared.
- Current accent colors are teal/blue/slate, hardcoded per-component as Tailwind palette classes (`teal-400`, `teal-600`, `blue-600`, `slate-*`) — found via grep across all 12 components. These are the exact classes that must be swapped for maroon/hunter-green equivalents.
- Placeholder convention for missing links is `// TODO: ...` in `.ts`/`.json` data files and `<!-- TODO: ... -->` in markup — followed from `AGENTS.md` "Placeholders and TODOs" and already used in `src/data/site.ts:7-9` and every `githubUrl`/`liveUrl` in `src/data/projects.json`.
- No third-party icon packages; all icons are inline SVG — followed from `AGENTS.md` "Performance & Icons Policy", confirmed no icon-package dependency in `package.json`.

## Resume vs. current site — content diff (source: mifrah_zia.pdf, read 2026-08-04)

| Section | Current site content | New resume content | Action |
|---|---|---|---|
| Contact | email, phone, LinkedIn(TODO), GitHub(TODO) | email `mifrahtmz@gmail.com`, phone `+923318071888`, LinkedIn (label only, no URL text) — **no GitHub mentioned in new resume** | Keep email/phone; keep LinkedIn as TODO; GitHub link is no longer resume-sourced — flag in Open Questions, don't invent |
| About/Summary | generic bio paragraph | New "Professional Summary" paragraph (CS graduate, AI-powered apps, cloud-native/containerized services, CI/CD, DevOps foundation) | Rewrite `About.astro` copy to match new summary verbatim/near-verbatim |
| Experience | Event Coordinator (Univ. Event Mgmt Club); Digital Marketing Manager (Etsy) | **Software Engineer Intern — Cinnova Technologies (Jun 2026–Present)** with 3 bullets; Digital Marketing Manager — Etsy (Jul 2024–Dec 2024), 1 bullet | Replace `experience.ts`: drop Event Coordinator (not in new resume), add Cinnova internship with bullets + dates, add dates to Etsy role |
| Projects | 4 projects, older bullet wording, facial-recognition project stated "~95% accuracy" | Same 4 projects, reworded bullets; C.L.A.R.A. bullets now mention Mediapipe BlazeFace + Vision Transformer (not OpenCV), "production FastAPI service"; facial recognition bullet drops the "~95% accuracy" figure; Gladius Knives bullet drops MERN/TypeScript/SSR/"40% faster" specifics, adds "inventory management" and "SEO" | Update `projects.json` descriptions/tech arrays to match new resume wording exactly; do not keep old unstated metrics |
| Skills | Languages / Frameworks & Libraries / Tools & Platforms (old categories: SQL, Java, C, C++, Assembly, Linux, React.js, Node.js, Express.js, Mongoose, Stripe, Postman, etc.) | New categories: **Languages & Frameworks** (Python, TensorFlow, scikit-learn, NumPy, Flask, FastAPI, Socket.IO, JWT), **Cloud & DevOps** (AWS, Docker, Kubernetes, Terraform, GitHub Actions CI/CD), **AI/ML** (Transfer learning, ONNX optimization, Whisper & Wav2Vec2, LLM-based feedback generation, CNN), **Data & Tools** (MongoDB, PostgreSQL, Cloudinary, Git) | Replace `skills.ts` entirely with new 4-category structure |
| Education | COMSATS BS CS 2022-2026 CGPA 3.50; Kinnaird Intermediate 2020-2022, 85% | Same schools/dates, **CGPA is now 3.52** | Update CGPA in `education.ts` |
| Certifications | Cisco Networking Badge; ML Specialization (Stanford/Coursera) | Same two, **plus** "Anthropic Academy — AI Fluency: Framework & Foundations; Introduction to Model Context Protocol" | Add third certification entry to `certifications.ts` |
| Section order | Hero → About → Skills → Projects → Education → Experience → Certifications → Contact → Footer | Resume order: Summary → Experience → Projects → Technical Skills → Education → Certifications | Reorder `index.astro` imports/JSX to: Hero → About → Experience → Projects → Skills → Education → Certifications → Contact → Footer |
| Theme colors | teal/blue accents on slate-950 background | N/A (user request, not resume) | Add maroon + hunter-green `@theme` tokens to `global.css`; replace teal-*/blue-* utility classes across all components |

## Files To Touch
| Path | Action | Reason | Pattern / analog file it follows |
|---|---|---|---|
| `src/data/site.ts` | edit | No content change needed unless GitHub URL question resolved (see Open Questions) | existing file |
| `src/data/experience.ts` | edit | Replace with Cinnova internship + dated Etsy role from new resume | existing array-of-objects shape |
| `src/data/projects.json` | edit | Update descriptions/tech to match new resume wording | existing shape, keep `githubUrl`/`liveUrl` TODOs |
| `src/data/skills.ts` | edit | Replace 3 old categories with 4 new resume categories | existing `{category, items[]}` shape |
| `src/data/education.ts` | edit | CGPA 3.50 → 3.52 | existing shape |
| `src/data/certifications.ts` | edit | Add Anthropic Academy entry | existing `{name, issuer}` shape |
| `src/components/About.astro` | edit | Rewrite bio to match new Professional Summary | existing component, no structural change |
| `src/pages/index.astro` | edit | Reorder sections to match resume flow | existing import/JSX list |
| `src/styles/global.css` | edit | Add maroon + hunter-green `@theme` color tokens | existing `@theme` block pattern (`--font-sans`) |
| `src/components/Hero.astro` | edit | Swap `teal-*`/`blue-*` classes for new brand tokens | — |
| `src/components/Navbar.astro` | edit | Swap accent color classes | — |
| `src/components/About.astro` | edit | Swap accent color classes (in addition to copy change above) | — |
| `src/components/Skills.astro` | edit | Swap accent color classes | — |
| `src/components/Projects.astro` | edit | Swap accent color classes | — |
| `src/components/ProjectCard.astro` | edit | Swap accent color classes | — |
| `src/components/Education.astro` | edit | Swap accent color classes | — |
| `src/components/Experience.astro` | edit | Swap accent color classes | — |
| `src/components/Certifications.astro` | edit | Swap accent color classes | — |
| `src/components/Contact.astro` | edit | Swap accent color classes | — |
| `src/components/Footer.astro` | edit | Swap accent color classes | — |
| `src/components/Contact.astro` | edit | Add TODO list of required links (see below) rendered or commented per convention | `AGENTS.md` TODO convention |

## Out of Scope / Do Not Touch
- `AGENTS.md` scope section (Phase 1 = localhost only) — do not add deployment/CI/CD/domain work.
- `implementation_plan.md` (original plan) — leave as historical record; this is a separate follow-up plan file.
- No profile photo/avatar — confirmed decision in original plan, resume has none either, do not add one.
- Do not invent metrics/numbers dropped from the new resume (e.g. old "~95% accuracy", "40% faster load") — the new resume removed them, so the site should stop claiming them too.
- Do not fabricate LinkedIn/GitHub/project repo URLs — they must stay as explicit TODOs (see below).

## Steps
1. Add `--color-maroon-*` and `--color-hunter-*` (or similarly named) tokens to the `@theme` block in `src/styles/global.css`, picking a maroon (~`#7a1f2b`/`#5c1a24` range) and hunter green (~`#355e3b`/`#2c4a30` range) scale (e.g. 400/500/600/700 shades) so components can reference them exactly like existing `teal-*` classes.
2. Update `body` background/text in `global.css` if needed so the dark base still contrasts with the new accents (keep `slate-950` base, just swap accent glows/buttons/links).
3. Sweep all 11 components and replace every `teal-*`, `blue-*` accent class with the new maroon/hunter-green tokens — alternate or combine the two per element (e.g. primary CTA = maroon, secondary highlights/glows = hunter green) for a deliberate mixture rather than one color dominating.
4. Update `src/data/experience.ts`: remove "Event Coordinator" entry, add Cinnova Technologies Software Engineer Intern entry (role, company, dates "Jun 2026 – Present", 3 bullets verbatim from resume), add dates "Jul 2024 – Dec 2024" to the Etsy entry. Check `Experience.astro` to see if it already renders a `bullets`/`dates` field or needs new fields added to the data shape.
5. Update `src/data/projects.json` descriptions/tech arrays for all 4 projects per the diff table above; keep `githubUrl`/`liveUrl` as `"TODO: Add repo link"` / `"TODO: Add live link"`; keep `status` field logic (resume no longer marks C.L.A.R.A. as an ongoing "final-year project" — check whether "In Progress" status is still accurate or should become "Completed"; flag as open question rather than guessing).
6. Replace `src/data/skills.ts` contents with the 4 new categories and their items, verbatim from the resume's Technical Skills section.
7. Update `src/data/education.ts`: change CGPA from `3.50` to `3.52`.
8. Add a third entry to `src/data/certifications.ts`: `{ name: "Anthropic Academy — AI Fluency: Framework & Foundations; Introduction to Model Context Protocol", issuer: "Anthropic Academy" }` (or split into two entries if `Certifications.astro` renders one bullet per line item — check the component before deciding one vs. two entries).
9. Rewrite `About.astro`'s bio paragraph(s) to reflect the new Professional Summary content (AI-powered applications, cloud-native/containerized services, CI/CD pipelines, production issue diagnosis, DevOps foundation) instead of the old generic bio.
10. Reorder `src/pages/index.astro` JSX so the section sequence is: `Hero → About → Experience → Projects → Skills → Education → Certifications → Contact` (Footer stays outside `<main>` as-is). Update `Navbar.astro`'s nav-link order to match, since nav order should follow page order.
11. Add the link TODO checklist (below) as clear `<!-- TODO -->` comments in `Contact.astro`/`Footer.astro` next to each missing link, and/or leave the existing `site.ts` TODOs as-is if that's the single source of truth — confirm with user which surface they want the checklist visible in (code comments vs. a written list handed back to them).

## Links Required — TODO checklist to hand back to the user
These are referenced by the site's Contact/Footer/Projects sections but have **no URL present anywhere in the new resume** (only text labels like "LinkedIn"), so they cannot be sourced from the PDF and must come from the user directly:
- [x] **LinkedIn profile URL** — `https://www.linkedin.com/in/mifrah-zia/`
- [x] **GitHub profile URL** — `https://github.com/mifrahzia-cinnova`
- [x] **C.L.A.R.A. project** — `https://github.com/abdullahahmadarslan/C.L.A.R.A`
- [x] **Spring PetClinic DevOps Pipeline** — `https://github.com/Mifrahzia/devops-labmid`
- [x] **AI-Powered Facial Recognition Attendance System** — `https://github.com/Mifrahzia/Facial-Recognition-Attendance`
- [x] **Gladius Knives E-commerce Platform** — `https://github.com/Mifrahzia/gladius-mern`
- [ ] **Cinnova Technologies** — optional: company website link if the user wants the employer name linked (not required by AGENTS.md scope, just flagging as an option).

## Assumptions & Open Questions
- New resume drops the "Event Coordinator" role entirely — assuming it should be removed from the site rather than kept as extra content not in the resume (site is meant to mirror the resume per this task's instruction #3/#4). Confirm with user if they want it kept anyway.
- C.L.A.R.A.'s resume wording no longer says "final-year project" or "ongoing" — unclear if it should now be marked `"status": "Completed"` in `projects.json`. Left as an explicit open question rather than guessed (Step 5).
- New resume removes GitHub as a stated link entirely (old resume/plan had it as a TODO placeholder) — need user decision on whether to keep a GitHub CTA in Contact/Footer at all.
- Cinnova Technologies experience is dated "Jun 2026 – Present" in the resume — this is a future-looking/current date relative to today (2026-08-04), so it's plausible as-is; no correction needed, just flagging that it's an unusual date to double check against the source PDF isn't a typo (e.g. meant "Jun 2025").
- Exact maroon/hunter-green hex values aren't specified by the user — plan picks a representative dark-mode-friendly pair; user should confirm/adjust exact shades once applied, since "mixture of maroon and hunter green" is a stylistic ask without precise codes.
- `AGENTS.md` references a `tailwind.config.mjs` that doesn't exist in the repo (Tailwind v4 CSS-first config is actually used) — not part of this task, but noted as a stale doc line worth fixing separately.

## Verification Plan
- `npm run dev` → visually confirm: section order now matches Hero → About → Experience → Projects → Skills → Education → Certifications → Contact → Footer; nav links match and scroll correctly.
- Visually confirm maroon + hunter-green accents appear consistently across Hero glow/CTAs, Navbar active/hover states, section headings/underlines, Skills tags, ProjectCard borders/badges, Contact/Footer icon links — no leftover `teal-*`/`blue-*` classes (`grep -rn "teal-\|blue-" src/` should return no matches).
- Spot-check each data file against the resume PDF text captured in this plan for exact wording/number accuracy (Experience bullets, Project bullets, Skills items, CGPA, Certifications).
- Confirm color contrast of new maroon/hunter-green text-on-background combinations meets accessibility guidelines per `AGENTS.md` a11y rule (check button text vs. maroon/hunter background, and any colored text vs. `slate-950`).
- `npm run build` succeeds with no errors (static output, phase-1 constraint unchanged).
- Confirm every unresolved link (LinkedIn, GitHub, 4x project links) still renders as a visible/commented TODO, not a broken or dead `#` link.
