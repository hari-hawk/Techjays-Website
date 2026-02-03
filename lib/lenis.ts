import Lenis from 'lenis'
import { ScrollTrigger } from './gsap'

let lenisInstance: Lenis | null = null

export const initLenis = (): Lenis => {
  if (lenisInstance) return lenisInstance

  lenisInstance = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  })

  // Sync with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update)

  // Animation frame loop
  const raf = (time: number) => {
    lenisInstance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenisInstance
}

export const destroyLenis = (): void => {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export const scrollTo = (target: string | HTMLElement, options?: { offset?: number }): void => {
  lenisInstance?.scrollTo(target, {
    offset: options?.offset ?? -100,
    duration: 1.2,
  })
}

export const getLenis = (): Lenis | null => lenisInstance
