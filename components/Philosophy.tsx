'use client'

import { useRef } from 'react'
import { useScrollTrigger } from '@/lib/hooks'
import { createOpacityReveal } from '@/lib/animations'
import { ScrollTrigger } from '@/lib/gsap'

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLBlockquoteElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)

  useScrollTrigger(() => {
    const quote = quoteRef.current
    const author = authorRef.current

    if (!quote || !author) return

    const triggers: ScrollTrigger[] = []

    // Pure opacity reveal - minimal motion
    triggers.push(createOpacityReveal(quote, { duration: 0.8 }))
    triggers.push(createOpacityReveal(author, { delay: 0.2, duration: 0.6 }))

    return triggers
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-section bg-background"
    >
      <div className="max-w-container mx-auto px-container">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote
            ref={quoteRef}
            className="font-display text-display-lg text-primary mb-12"
          >
            "The difference between a demo and a system is the difference
            between a pitch deck and a P&L. We build systems."
          </blockquote>

          <div ref={authorRef} className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="font-display text-accent font-semibold">TJ</span>
            </div>
            <div className="text-left">
              <p className="text-body-md text-primary font-medium">
                Engineering Team
              </p>
              <p className="text-body-sm text-muted">
                Techjays
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
