import { gsap, ScrollTrigger, EASE, DURATION, getDuration, prefersReducedMotion } from './gsap'

interface FadeInOptions {
  y?: number
  delay?: number
  duration?: number
}

interface ParallaxOptions {
  speed?: number
  scrub?: number | boolean
}

interface CountUpOptions {
  duration?: number
  suffix?: string
}

/**
 * Simple fade-in with subtle upward motion
 * Used for: section headers, cards, text blocks
 */
export const createFadeIn = (
  element: HTMLElement,
  options: FadeInOptions = {}
): ScrollTrigger => {
  const { y = 20, delay = 0, duration = DURATION.reveal } = options
  const actualY = prefersReducedMotion() ? 0 : y

  gsap.set(element, { opacity: 0, y: actualY })

  return ScrollTrigger.create({
    trigger: element,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: getDuration(duration),
        delay,
        ease: EASE.out,
      })
    },
    once: true,
  })
}

/**
 * Staggered fade-in for multiple elements
 * Used for: card grids, list items
 */
export const createStaggerFadeIn = (
  elements: HTMLElement[],
  stagger: number = 0.08
): ScrollTrigger => {
  const y = prefersReducedMotion() ? 0 : 30

  gsap.set(elements, { opacity: 0, y })

  return ScrollTrigger.create({
    trigger: elements[0],
    start: 'top 85%',
    onEnter: () => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: getDuration(DURATION.reveal),
        stagger: prefersReducedMotion() ? 0 : stagger,
        ease: EASE.out,
      })
    },
    once: true,
  })
}

/**
 * Parallax effect for background elements
 * Used for: hero backgrounds, decorative elements
 */
export const createParallax = (
  element: HTMLElement,
  options: ParallaxOptions = {}
): ScrollTrigger => {
  const { speed = 0.3, scrub = 1 } = options

  if (prefersReducedMotion()) {
    return ScrollTrigger.create({ trigger: element })
  }

  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub,
    onUpdate: (self) => {
      const yPercent = self.progress * 100 * speed - 50 * speed
      gsap.set(element, { yPercent })
    },
  })
}

/**
 * Count-up animation for metrics
 * Used for: impact numbers, statistics
 */
export const createCountUp = (
  element: HTMLElement,
  target: number,
  options: CountUpOptions = {}
): ScrollTrigger => {
  const { duration = DURATION.slow, suffix = '' } = options
  const counter = { value: 0 }

  return ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(counter, {
        value: target,
        duration: getDuration(duration),
        ease: EASE.out,
        onUpdate: () => {
          element.textContent = Math.round(counter.value) + suffix
        },
      })
    },
    once: true,
  })
}

/**
 * Horizontal scroll section
 * Used for: capabilities section
 */
export const createHorizontalScroll = (
  container: HTMLElement,
  track: HTMLElement,
  panels: HTMLElement[]
): ScrollTrigger => {
  if (prefersReducedMotion()) {
    return ScrollTrigger.create({ trigger: container })
  }

  const totalWidth = track.scrollWidth - window.innerWidth

  // Animate panels as they come into view
  panels.forEach((panel, i) => {
    gsap.set(panel, { opacity: 0.5 })
  })

  return ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: () => `+=${totalWidth}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    onUpdate: (self) => {
      gsap.set(track, { x: -self.progress * totalWidth })

      // Fade in panels based on position
      panels.forEach((panel, i) => {
        const panelStart = i / panels.length
        const panelEnd = (i + 1) / panels.length
        const panelProgress = gsap.utils.clamp(
          0,
          1,
          (self.progress - panelStart) / (panelEnd - panelStart)
        )
        gsap.set(panel, { opacity: 0.5 + panelProgress * 0.5 })
      })
    },
  })
}

/**
 * Text reveal with mask
 * Used for: narrative sections, headlines
 */
export const createTextReveal = (
  element: HTMLElement,
  options: { delay?: number } = {}
): ScrollTrigger => {
  const { delay = 0 } = options

  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 })
    return ScrollTrigger.create({ trigger: element })
  }

  gsap.set(element, { opacity: 0, y: 15 })

  return ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: getDuration(DURATION.reveal),
        delay,
        ease: EASE.out,
      })
    },
    once: true,
  })
}

/**
 * Opacity-only fade (minimal motion)
 * Used for: philosophy section, subtle reveals
 */
export const createOpacityReveal = (
  element: HTMLElement,
  options: { delay?: number; duration?: number } = {}
): ScrollTrigger => {
  const { delay = 0, duration = DURATION.slow } = options

  gsap.set(element, { opacity: 0 })

  return ScrollTrigger.create({
    trigger: element,
    start: 'top 75%',
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        duration: getDuration(duration),
        delay,
        ease: EASE.out,
      })
    },
    once: true,
  })
}
