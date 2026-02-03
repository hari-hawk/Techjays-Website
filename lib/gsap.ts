import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Restrained easing - no overshoot
export const EASE = {
  out: 'power2.out',
  inOut: 'power2.inOut',
  linear: 'none',
} as const

// Short, purposeful durations
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  reveal: 0.6,
} as const

// Check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get duration respecting reduced motion
export const getDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0.01 : duration
}

// Clean up all ScrollTriggers for a specific scope
export const cleanupScrollTriggers = (triggers: ScrollTrigger[]): void => {
  triggers.forEach((trigger) => trigger.kill())
}

// Refresh ScrollTrigger on resize (debounced)
let resizeTimeout: NodeJS.Timeout
export const setupResizeRefresh = (): (() => void) => {
  const handleResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}

export { gsap, ScrollTrigger }
