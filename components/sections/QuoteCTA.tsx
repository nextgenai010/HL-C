'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ContactForm } from '@/components/ui/ContactForm'

const ease = [0.16, 1, 0.3, 1] as const

const HEADLINE_LINES = [
  { text: 'Få et', italic: false },
  { text: 'uforpligtende', italic: true },
  { text: 'tilbud', italic: false },
]

export function QuoteCTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section ref={ref} className="relative bg-white py-14 md:py-28 overflow-hidden">

      {/* Diagonal gold accent — top left */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 w-[420px] h-[420px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.4, ease, delay: 0.1 }}
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Diagonal gold accent — bottom right */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-0 w-[480px] h-[480px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.4, ease, delay: 0.25 }}
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-content grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">

        {/* Left — headline */}
        <div className="lg:col-span-5">
          <motion.p
            className="label-caps text-gold mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            ✦ Kom i gang
          </motion.p>

          {/* Headline — line by line */}
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
            {HEADLINE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block${line.italic ? ' italic' : ''}`}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.9, ease, delay: 0.08 + i * 0.1 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            className="mt-5 h-px bg-gold/50 origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.38 }}
            style={{ width: 64 }}
          />

          <motion.p
            className="mt-6 text-dark/65 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.44 }}
          >
            Beskriv din opgave — vi vender tilbage inden for 24 timer med et klart og ærligt tilbud.
          </motion.p>

          {/* Trust points */}
          <motion.ul
            className="mt-8 space-y-3"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.54 }}
          >
            {['Gratis og uforpligtende', 'Svar inden 24 timer', 'Verificeret tømrermester'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-dark/60">
                <span className="text-gold text-xs">✦</span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right — form, clips in from right */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 40, clipPath: 'inset(0 0 0 8%)' }}
          animate={inView ? { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0%)' } : {}}
          transition={{ duration: 0.95, ease, delay: 0.2 }}
        >
          <ContactForm />
        </motion.div>

      </div>
    </section>
  )
}
