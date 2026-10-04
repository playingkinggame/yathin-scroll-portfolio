# Yathin Kumar — Horizon Portfolio

An immersive developer portfolio for **Yathin Kumar** (B.Tech CSE, AI & ML — VIT Chennai, batch 2026–2030).
It opens with a scroll-driven 3D **Horizon → Cosmos** WebGL hero (Three.js + GSAP), then flows into a
smooth-scrolling portfolio: identity, skills, projects, academic timeline and contact.

## Features

- **3D hero** — Three.js scene with custom GLSL shaders, bloom post-processing and a scroll-linked camera (HORIZON → COSMOS → YATHIN KUMAR).
- **Identity** — profile card with three tabs: focus pillars, an interactive terminal (`help`, `whoami`, `edu`, `skills`, `goals`, `contact`) and an academic roadmap.
- **AI Matrix** — skills grouped by AI/ML, 3D & web, systems and maths.
- **Labs** — filterable project cards with a detail modal.
- **Academia** — four-year trajectory timeline.
- **Connect** — copy-to-clipboard email, social links and a contact form.
- **Mission-control drawer**, live nav highlighting, ambient audio toggle and a standalone **Demo** view of the hero.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Three.js · GSAP · Lenis · lucide-react

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
npm install            # if you hit a peer-dependency error: npm install --legacy-peer-deps
npm run dev            # http://localhost:3000
```

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the dev server on port 3000     |
| `npm run build`   | Production build into `dist/`         |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | Type-check with `tsc --noEmit`        |
| `npm run clean`   | Remove `dist/`                        |

No API keys are required. The `.env.example` file and `@google/genai` dependency are AI Studio
scaffolding and are not used by the current code.

## Project structure

```
├── components/ui/
│   ├── horizon-hero-section.tsx   # 3D hero (do not modify — see below)
│   └── demo.tsx                   # Hero-only demo view
├── src/
│   ├── App.tsx                    # Portfolio / demo view switch, page layout
│   ├── index.css                  # Theme, hero styles, motion system
│   ├── components/
│   │   ├── Navbar.tsx, NavigationDrawer.tsx
│   │   ├── AboutSection.tsx, SkillsSection.tsx, ProjectsSection.tsx, ProjectModal.tsx
│   │   ├── EducationTimeline.tsx, ContactSection.tsx
│   │   ├── CosmicAudio.tsx        # Web Audio ambient drone
│   │   └── Reveal.tsx             # Scroll-reveal wrapper
│   ├── hooks/
│   │   ├── useActiveSection.ts    # Nav highlight
│   │   └── useOverlay.ts          # Exit animations, Escape, focus return
│   └── lib/
│       ├── SmoothScroll.tsx       # Lenis provider, scroll lock, section navigation
│       └── heroBridge.ts          # Only link between the page and the hero
```

## How the smoothness works

- **Inertial scrolling** — Lenis eases mouse-wheel scrolling, but only once the hero has fully dissolved. Inside the hero the browser scrolls natively, so the opening experience is exactly as designed.
- **Hero GPU pause** — the hero canvas is fixed and renders forever, even when invisible behind the portfolio. `heroBridge.ts` skips its render while it is fully hidden and resumes as you scroll back, without editing the hero file.
- **Targeted transitions** — the `transition-ui` utility animates only colour, shadow, transform and opacity instead of `transition-all`.
- **Real overlay animations** — the drawer and project modal have enter and exit animations, scroll lock, Escape to close and focus handling.
- **Content swaps and reveals** — tabs, category and filter changes animate, and sections reveal once on scroll using transform and opacity only.
- **Accessibility** — `prefers-reduced-motion` disables smoothing and animations; keyboard focus is visible.

## Customising

- **Content** — edit the data arrays in each section component (`ProjectsSection.tsx`, `SkillsSection.tsx`, `EducationTimeline.tsx`) and the contact details in `ContactSection.tsx`.
- **Hero text** — change the props passed to `HorizonHero` in `src/App.tsx`.
- **Theme** — colours and fonts (Space Grotesk, Inter) live in `src/index.css` and `index.html`.
- **Smoothness** — tweak `lerp` in `src/lib/SmoothScroll.tsx` (lower = floatier) and the keyframes in `src/index.css`.

> **Note:** keep `components/ui/horizon-hero-section.tsx` unchanged to preserve the opening animation.
> The page only touches it through `heroBridge.ts`.

## Deployment

`npm run build` produces a static site in `dist/` that works on Vercel, Netlify, GitHub Pages or any static host.

## License

Source files carry an Apache-2.0 SPDX header. © Yathin Kumar.