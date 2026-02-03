'use client'

import { useRef } from 'react'
import { useScrollTrigger } from '@/lib/hooks'
import { createHorizontalScroll } from '@/lib/animations'
import { ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { createFadeIn } from '@/lib/animations'

const capabilities = [
  {
    title: 'Machine Learning Systems',
    description:
      'Production-grade ML pipelines that scale. From data engineering to model serving, built for reliability.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'LLM Integration',
    description:
      'Custom language model applications with RAG, fine-tuning, and enterprise security. Not demos—real systems.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Predictive Analytics',
    description:
      'Forecasting systems that turn historical data into actionable intelligence. Demand, risk, capacity—automated.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    title: 'Data Engineering',
    description:
      'Robust infrastructure that powers AI at scale. ETL pipelines, warehousing, and real-time streaming.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
  },
  {
    title: 'MLOps & Automation',
    description:
      'Automated pipelines for model training, testing, and deployment. CI/CD for AI that actually works.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])

  useScrollTrigger(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const container = containerRef.current
    const track = trackRef.current
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !header || !container || !track) return

    const triggers: ScrollTrigger[] = []
    const reducedMotion = prefersReducedMotion()

    // Header fade in
    triggers.push(createFadeIn(header))

    // Horizontal scroll (only on desktop and if motion is allowed)
    if (!reducedMotion && window.innerWidth >= 1024) {
      triggers.push(createHorizontalScroll(container, track, panels))
    } else {
      // Fallback: staggered fade in for each panel
      panels.forEach((panel, i) => {
        triggers.push(createFadeIn(panel, { delay: i * 0.1 }))
      })
    }

    return triggers
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="py-section bg-background"
    >
      {/* Header */}
      <div className="max-w-container mx-auto px-container mb-12">
        <div ref={headerRef}>
          <span className="text-label text-accent uppercase mb-4 block">
            Capabilities
          </span>
          <h2 className="font-display text-display-lg text-primary">
            What we build
          </h2>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="relative lg:h-screen lg:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 px-container lg:px-0 lg:pl-container"
        >
          {capabilities.map((cap, index) => (
            <div
              key={cap.title}
              ref={(el) => { panelsRef.current[index] = el }}
              className="flex-shrink-0 w-full lg:w-[400px] p-8 bg-surface border border-border rounded-xl"
            >
              <div className="text-accent mb-6">
                {cap.icon}
              </div>
              <h3 className="font-display text-display-md text-primary mb-4">
                {cap.title}
              </h3>
              <p className="text-body-md text-secondary">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
