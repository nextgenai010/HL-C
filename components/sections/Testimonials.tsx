'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { GoldDivider } from '@/components/ui/GoldDivider'

const QUOTES = [
  {
    quote:
      'Jonatan tog sig tid til at forklare mulighederne, og resultatet blev langt bedre end vi havde turdet håbe på. Ærligt, præcist arbejde.',
    name: 'Lotte & Mads',
    role: 'Villa, Herlev',
    initial: 'L',
  },
  {
    quote:
      'De ryddede op hver eneste dag og holdt hvad de lovede. Lille detalje, men det siger meget om dem der arbejder hos HLC.',
    name: 'Anders K.',
    role: 'Tagrenovering, Ballerup',
    initial: 'A',
  },
  {
    quote:
      'Vi havde tidligere fået et tømrerarbejde udført af andre — forskellen er tydelig. Her står det rent og lige, år efter.',
    name: 'Marianne',
    role: 'Terrasse, Gladsaxe',
    initial: 'M',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.9, ease, delay: i * 0.14 },
  }),
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.1 })

  return (
    <section ref={sectionRef} className="relative bg-gray-light/40 py-24 md:py-32 overflow-hidden">

      {/* Subtle grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="container-content relative z-10">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.p
            className="label-caps text-gold mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            ✦ Kunder siger
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
              initial={{ y: '110%' }}
              animate={headerInView ? { y: '0%' } : {}}
              transition={{ duration: 0.95, ease, delay: 0.08 }}
            >
              <span className="italic">Ord</span> fra de hjem<br />vi har bygget i.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <GoldDivider className="mt-6" />
          </motion.div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={cardsInView ? 'visible' : 'hidden'}
              className="group flex flex-col h-full bg-white p-8 md:p-10 border-l-2 border-gold/40 hover:border-gold transition-colors duration-500 shadow-sm hover:shadow-md"
            >
              <motion.span
                aria-hidden
                initial={{ opacity: 0, scale: 0.5 }}
                animate={cardsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, ease, delay: i * 0.14 + 0.4 }}
                className="text-gold text-4xl font-display leading-none"
              >
                &ldquo;
              </motion.span>

              <blockquote className="mt-4 font-display text-xl md:text-[1.35rem] leading-relaxed text-dark italic flex-1">
                {q.quote}
              </blockquote>

              <figcaption className="mt-8 pt-6 border-t border-dark/10 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="label-caps text-gold text-[11px]">{q.initial}</span>
                </div>
                <div>
                  <p className="font-body font-medium text-dark text-sm">{q.name}</p>
                  <p className="label-caps text-dark/50 mt-0.5 text-[10px]">{q.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
