'use client'

import { useEffect, useRef, useLayoutEffect } from 'react'
import { ScrollTrigger } from './gsap'

// Use useLayoutEffect on client, useEffect on server
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Hook for managing ScrollTrigger instances
export const useScrollTrigger = (
  callback: () => ScrollTrigger | ScrollTrigger[] | void,
  deps: React.DependencyList = []
): void => {
  const triggers = useRef<ScrollTrigger[]>([])

  useIsomorphicLayoutEffect(() => {
    // Wait for DOM to be ready
    const ctx = setTimeout(() => {
      const result = callback()
      if (result) {
        triggers.current = Array.isArray(result) ? result : [result]
      }
    }, 100)

    return () => {
      clearTimeout(ctx)
      triggers.current.forEach((t) => t.kill())
      triggers.current = []
    }
  }, deps)
}

// Hook for refs that need to be passed to animations
export const useAnimationRef = <T extends HTMLElement>() => {
  return useRef<T>(null)
}
