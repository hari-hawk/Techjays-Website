'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollTrigger } from '@/lib/hooks'
import { createCountUp, createFadeIn } from '@/lib/animations'
import { ScrollTrigger } from '@/lib/gsap'

const metrics = [
  { value: 47, suffix: '', label: 'AI Systems Deployed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '', label: 'Industry Verticals' },
  { value: 6, suffix: ' weeks', label: 'Average Deployment' },
]

const caseStudies = [
  {
    industry: 'Healthcare',
    title: 'Patient Flow Prediction',
    result: '34% reduced wait times',
    description: 'ML-powered capacity planning for a 12-hospital network.',
  },
  {
    industry: 'Logistics',
    title: 'Route Optimization',
    result: '23% fuel savings',
    description: 'Real-time routing for 50K+ daily deliveries.',
  },
  {
    industry: 'Finance',
    title: 'Fraud Detection',
    result: '47% faster detection',
    description: 'Real-time monitoring with 62% fewer false positives.',
  },
]

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<(HTMLDivElement | null)[]>([])
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useScrollTrigger(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const metricEls = metricsRef.current.filter(Boolean) as HTMLDivElement[]
    const valueEls = valueRefs.current.filter(Boolean) as HTMLSpanElement[]
    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !header) return

    const triggers: ScrollTrigger[] = []

    // Header fade in
    triggers.push(createFadeIn(header))

    // Metrics fade in with stagger
    metricEls.forEach((el, i) => {
      triggers.push(createFadeIn(el, { delay: i * 0.1 }))
    })

    // Count up animations
    valueEls.forEach((el, i) => {
      const metric = metrics[i]
      triggers.push(createCountUp(el, metric.value, { suffix: metric.suffix }))
    })

    // Case study cards
    cardEls.forEach((el, i) => {
      triggers.push(createFadeIn(el, { delay: i * 0.1, y: 30 }))
    })

    return triggers
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-section bg-surface"
    >
      <div className="max-w-container mx-auto px-container">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-label text-accent uppercase mb-4 block">
            Impact
          </span>
          <h2 className="font-display text-display-lg text-primary">
            Results that matter
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 pb-20 border-b border-border">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              ref={(el) => { metricsRef.current[index] = el }}
              className="text-center lg:text-left"
            >
              <span
                ref={(el) => { valueRefs.current[index] = el }}
                className="font-display text-display-lg text-accent block mb-2"
              >
                0
              </span>
              <span className="text-body-sm text-muted">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className="group p-8 bg-background border border-border rounded-xl transition-colors duration-300 hover:border-border-hover"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <span className="text-label text-muted uppercase mb-4 block">
                {study.industry}
              </span>
              <h3 className="font-display text-display-md text-primary mb-2">
                {study.title}
              </h3>
              <p className="text-body-lg text-accent mb-4">
                {study.result}
              </p>
              <p className="text-body-sm text-secondary">
                {study.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
