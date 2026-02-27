# Portfolio Project Constitution

## Architecture
Dual-sided portfolio with Next.js 16 App Router.
- **(photography)**: Visual portfolio
- **(personal)**: Developer resume/projects

## Tech Stack
- **Runtime**: Bun (package manager + runtime)
- Next.js 16 (App Router + Turbopack)
- Tailwind CSS 4.0 (CSS-first) + shadcn/ui
- GSAP (transitions) + Framer Motion (micro-interactions)
- React-Three-Fiber + Three.js
- Sanity.io (metadata) + AWS S3 (assets)

## Routes
- / - Landing page with slab selector
- /photography - Photography section
- /photography/gallery - Gallery (ISR, 1h revalidate)
- /personal - Developer section
- /personal/resume - Resume
- /personal/projects - Projects

## Directory
- /src/app/photography/* - Photo routes
- /src/app/personal/* - Dev routes
- /src/components/three/* - 3D components
- /src/components/ui/* - shadcn/ui
- /src/lib/hooks/* - Custom hooks
- /src/services/* - External clients

## Environment
All env vars validated via Zod in src/env.ts.
Import from @/env instead of process.env.

## Conventions
- TypeScript strict mode
- Prefer Server Components
- CSS custom properties for theming

## Animation Guidelines (Framer Motion vs GSAP)

### Default
- Use Framer Motion for state-driven UI motion (hover/tap, enter/exit, layout transitions)
- Prefer CSS keyframes for constant ambient drift

### Use GSAP Only When Needed
- Use GSAP for complex timeline choreography (sequenced/overlapping animations, reversals)
- Use GSAP for scroll-linked motion (ScrollTrigger)
- Don't add GSAP without a clear requirement

### Avoid Conflicts
- Never animate the same element + same property with both Framer and GSAP
- Both commonly control transform/opacity; competing writes cause jitter/snaps/overrides

### Safe Integration Pattern
- Split responsibilities with wrappers:
  - Outer wrapper: GSAP controls x/y (or timeline-driven transforms)
  - Inner wrapper: Framer controls hover scale/opacity
- If GSAP owns a property on a node, don't set that property via Framer on the same node

### React/Next Lifecycle Safety
- GSAP is imperative; components mount/unmount
- Always clean up GSAP on unmount (use `gsap.context()` and revert/kill tweens)
- Prevents memory leaks and stale-node animation
