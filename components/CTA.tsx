'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollTrigger } from '@/lib/hooks'
import { createFadeIn } from '@/lib/animations'
import { ScrollTrigger } from '@/lib/gsap'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useScrollTrigger(() => {
    const content = contentRef.current
    if (!content) return

    const triggers: ScrollTrigger[] = []
    triggers.push(createFadeIn(content, { y: 30 }))

    return triggers
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-section bg-surface"
    >
      <div className="max-w-container mx-auto px-container">
        <div
          ref={contentRef}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-display-lg text-primary mb-6">
            Ready to ship?
          </h2>
          <p className="text-body-lg text-secondary mb-10">
            Let's talk about your AI challenges. No sales pitch—just a
            technical conversation about what's possible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="mailto:hello@techjays.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-medium text-body-md rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              Start a Conversation
              <svg
                className="w-5 h-5"
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
            </motion.a>

            <motion.a
              href="#"
              className="inline-flex items-center px-8 py-4 text-secondary font-medium text-body-md border border-border rounded-lg"
              whileHover={{ borderColor: 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.15 }}
            >
              Schedule a Call
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
