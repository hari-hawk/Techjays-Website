'use client'

import { useEffect } from 'react'
import { initLenis, destroyLenis } from '@/lib/lenis'
import { setupResizeRefresh } from '@/lib/gsap'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    initLenis()

    // Setup resize handler for ScrollTrigger
    const cleanup = setupResizeRefresh()

    return () => {
      cleanup()
      destroyLenis()
    }
  }, [])

  return <>{children}</>
}
