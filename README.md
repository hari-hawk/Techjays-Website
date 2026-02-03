# Techjays Website - Next.js

Production-quality CXO-focused website with restrained scroll-based interactions.

## Setup

```bash
cd techjays-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
techjays-nextjs/
├── app/
│   ├── layout.tsx        # Global layout with fonts
│   ├── page.tsx          # Homepage assembly
│   ├── providers.tsx     # Lenis & GSAP initialization
│   └── globals.css       # Tailwind & global styles
├── components/
│   ├── Hero.tsx          # Full-viewport hero with parallax
│   ├── Narrative.tsx     # Sticky text with scroll reveals
│   ├── Impact.tsx        # Metrics with count-up
│   ├── Capabilities.tsx  # Horizontal scroll section
│   ├── Philosophy.tsx    # Large typography, opacity only
│   ├── CTA.tsx           # Closing statement
│   ├── Navigation.tsx    # Fixed nav with scroll state
│   └── Footer.tsx        # Site footer
└── lib/
    ├── gsap.ts           # GSAP registration & utilities
    ├── animations.ts     # Reusable animation factories
    ├── lenis.ts          # Smooth scroll setup
    └── hooks.ts          # React hooks for animations
```

## Animation Intent

### Hero
- Fade/translate on entrance (0.6s, power2.out)
- Parallax on scroll: headline moves up with opacity fade
- No auto-play video, no flashy effects

### Narrative
- Sticky left column (CSS sticky)
- Right column items reveal on scroll (opacity + subtle y)
- Items fade back out when scrolling up

### Impact
- Metrics count up on enter (0.8s, power2.out)
- Cards fade in with stagger (0.08s apart)
- Hover: subtle y translation via Framer Motion

### Capabilities
- Desktop: Horizontal scroll with ScrollTrigger pinning
- Mobile: Vertical stack with stagger fade
- Panels fade to full opacity as they enter view

### Philosophy
- Opacity-only reveal (0.8s) - minimal motion
- Reinforces editorial, restrained aesthetic

### CTA
- Simple fade-in (0.6s, y: 30px)
- Hover states via Framer Motion (scale 1.02)

## Animation Constraints

1. **Restrained durations**: 0.3s-0.8s max
2. **No overshoot easing**: power2.out, never elastic
3. **Respects prefers-reduced-motion**: All animations check and disable
4. **Clean unmount**: ScrollTriggers killed in useEffect cleanup
5. **Mobile simplification**: Horizontal scroll → vertical stack

## Key Files

### lib/gsap.ts
- Registers GSAP plugins once
- Exports `EASE` and `DURATION` constants
- `prefersReducedMotion()` utility
- `getDuration()` respects reduced motion

### lib/animations.ts
- `createFadeIn()` - Standard reveal
- `createStaggerFadeIn()` - Multiple elements
- `createParallax()` - Background movement
- `createCountUp()` - Number animation
- `createHorizontalScroll()` - Pinned horizontal
- `createTextReveal()` - Text with mask
- `createOpacityReveal()` - Minimal motion

### lib/hooks.ts
- `useScrollTrigger()` - Manages ScrollTrigger lifecycle
- `useIsomorphicLayoutEffect` - SSR-safe layout effect
