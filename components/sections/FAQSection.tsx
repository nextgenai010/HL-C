'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FAQ_HOME } from '@/lib/faq'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { GoldDivider } from '@/components/ui/GoldDivider'

const ease = [0.16, 1, 0.3, 1] as const

const HEADLINE_LINES = [
  { text: 'Ofte stillede', italic: false },
  { text: 'spørgsmål', italic: true, gold: true },
]

export function FAQSection() {
  const ref = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-white py-14 md:py-28 border-t border-gray-mid">
      <div className="container-content grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

        {/* Left — header */}
        <div ref={headerRef} className="lg:col-span-5">
          <motion.p
            className="label-caps text-gold mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            ✦ Det får vi spurgt om
          </motion.p>

          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block${line.italic ? ' italic' : ''}${line.gold ? ' text-gold' : ''}`}
                  initial={{ y: '110%' }}
                  animate={headerInView ? { y: '0%' } : {}}
                  transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>

          <GoldDivider className="mt-6" />

          <motion.p
            className="mt-6 text-dark/65 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
          >
            Vi har samlet de mest stillede spørgsmål om tilbud, proces, områder og garanti.
            Finder du ikke svar her, er du altid velkommen til at ringe eller skrive.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
          >
            <Link
              href="/ofte-stillede-spoergsmaal"
              className="group inline-flex items-center gap-2 label-caps text-dark"
            >
              <span className="link-underline">Se alle spørgsmål</span>
              <ArrowUpRight
                size={14}
                className="text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>

        {/* Right — accordion */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <FAQAccordion items={FAQ_HOME} defaultOpen={0} />
        </motion.div>

      </div>
    </section>
  )
}
