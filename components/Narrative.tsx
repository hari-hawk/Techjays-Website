'use client'

import { useRef } from 'react'
import { useScrollTrigger } from '@/lib/hooks'
import { gsap, ScrollTrigger, EASE, getDuration, prefersReducedMotion } from '@/lib/gsap'

const narrativeItems = [
  {
    label: '01',
    title: 'Learn',
    description:
      'We start by understanding your operations, data landscape, and team dynamics. No assumptions—just deep discovery.',
  },
  {
    label: '02',
    title: 'Proof',
    description:
      'Build a working prototype with your real data. Validate assumptions, measure impact, and refine the approach.',
  },
  {
    label: '03',
    title: 'Ship',
    description:
      'Deploy production-grade systems with monitoring and failovers. Built for scale from day one.',
  },
  {
    label: '04',
    title: 'Evolve',
    description:
      'Continuous optimization based on real-world performance. Systems that improve with every iteration.',
  },
]

export default function Narrative() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useScrollTrigger(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !sticky || items.length === 0) return

    const triggers: ScrollTrigger[] = []
    const reducedMotion = prefersReducedMotion()

    // Set initial states
    items.forEach((item) => {
      gsap.set(item, { opacity: 0.3, y: reducedMotion ? 0 : 15 })
    })

    // Create scroll-triggered reveals for each item
    items.forEach((item, index) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: item,
          start: 'top 70%',
          end: 'top 30%',
          scrub: reducedMotion ? false : 0.5,
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: getDuration(0.5),
              ease: EASE.out,
            })
          },
          onLeaveBack: () => {
            if (!reducedMotion) {
              gsap.to(item, {
                opacity: 0.3,
                y: 15,
                duration: getDuration(0.3),
                ease: EASE.out,
              })
            }
          },
        })
      )
    })

    return triggers
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-section bg-background"
    >
      <div className="max-w-container mx-auto px-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Sticky header column */}
          <div className="lg:col-span-4">
            <div
              ref={stickyRef}
              className="lg:sticky lg:top-32"
            >
              <span className="text-label text-accent uppercase mb-4 block">
                How We Work
              </span>
              <h2 className="font-display text-display-md text-primary mb-6">
                A methodology built for outcomes
              </h2>
              <p className="text-body-md text-secondary">
                Four phases. Eight weeks. Real systems in production.
              </p>
            </div>
          </div>

          {/* Scrolling content column */}
          <div className="lg:col-span-8 space-y-24 lg:space-y-32">
            {narrativeItems.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => { itemsRef.current[index] = el }}
                className="group"
              >
                <span className="text-label text-muted mb-4 block">
                  {item.label}
                </span>
                <h3 className="font-display text-display-md text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-body-lg text-secondary max-w-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
