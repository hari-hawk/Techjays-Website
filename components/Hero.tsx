'use client'

import { useRef } from 'react'
import { useScrollTrigger } from '@/lib/hooks'
import { gsap, ScrollTrigger, EASE, DURATION, getDuration, prefersReducedMotion } from '@/lib/gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useScrollTrigger(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current
    const bg = bgRef.current

    if (!section || !headline || !subtitle || !cta || !bg) return

    const triggers: ScrollTrigger[] = []
    const reducedMotion = prefersReducedMotion()

    // Initial state
    gsap.set([headline, subtitle, cta], { opacity: 0, y: reducedMotion ? 0 : 20 })

    // Entrance animation timeline
    const tl = gsap.timeline({ delay: 0.2 })

    tl.to(headline, {
      opacity: 1,
      y: 0,
      duration: getDuration(DURATION.reveal),
      ease: EASE.out,
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: getDuration(DURATION.reveal),
      ease: EASE.out,
    }, '-=0.3')
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: getDuration(DURATION.reveal),
      ease: EASE.out,
    }, '-=0.3')

    // Parallax on scroll (headline fades and moves up)
    if (!reducedMotion) {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            gsap.set(headline, {
              y: -progress * 60,
              opacity: 1 - progress * 0.7
            })
            gsap.set(subtitle, {
              y: -progress * 40,
              opacity: 1 - progress * 0.8
            })
            gsap.set(cta, {
              y: -progress * 20,
              opacity: 1 - progress * 0.9
            })
            // Background parallax
            gsap.set(bg, { y: progress * 80 })
          },
        })
      )
    }

    return triggers
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-background"
        aria-hidden="true"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-container text-center">
        <h1
          ref={headlineRef}
          className="font-display text-display-xl text-primary mb-6"
        >
          We build AI systems
          <br />
          <span className="text-secondary">that actually work</span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-body text-body-lg text-secondary max-w-xl mx-auto mb-10"
        >
          Production-grade infrastructure deployed in weeks, not quarters.
          Built by engineers who ship.
        </p>

        <div ref={ctaRef} className="flex items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-medium text-body-sm rounded-lg transition-all duration-300 hover:bg-primary/90"
          >
            Start a Conversation
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#work"
            className="inline-flex items-center px-6 py-3 text-secondary font-medium text-body-sm border border-border rounded-lg transition-all duration-300 hover:border-border-hover hover:text-primary"
          >
            View Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-label uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}
