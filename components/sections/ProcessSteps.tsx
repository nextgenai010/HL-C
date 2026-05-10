'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const STEPS = [
  {
    nr: '01',
    title: 'Rådgivning',
    desc: 'Vi mødes, ser på opgaven og taler materialer, muligheder og ønsker grundigt igennem.',
  },
  {
    nr: '02',
    title: 'Tilbud',
    desc: 'Du får et skriftligt tilbud med klare poster — ingen skjulte afgifter eller uventede regninger.',
  },
  {
    nr: '03',
    title: 'Udførelse',
    desc: 'Vi arbejder planlagt og rent, og holder dig opdateret løbende gennem forløbet.',
  },
  {
    nr: '04',
    title: 'Aflevering',
    desc: 'Endelig gennemgang og garanti. Vi følger op, så du er tryg efter aflevering.',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

const HEADLINE_LINES = [
  { text: 'Fire trin.', italic: false },
  { text: 'Ét forløb.', italic: true, gold: true },
]

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 48, clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.85, ease, delay: i * 0.13 + 0.4 },
  }),
}

export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  const sectionInView = useInView(sectionRef, { once: true, amount: 0.06 })
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 })
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.08 })

  return (
    <motion.section
      ref={sectionRef}
      className="bg-dark overflow-hidden"
      initial={{ clipPath: 'inset(4% 0 0 0)', opacity: 0 }}
      animate={sectionInView ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 } : {}}
      transition={{ duration: 1.0, ease }}
    >
      <div className="container-content py-16 md:py-24">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.p
              className="label-caps text-gold mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              ✦ Sådan arbejder vi
            </motion.p>

            {/* Headline — line by line */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] text-white">
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`block${line.italic ? ' italic' : ''}${line.gold ? ' text-gold-light' : ''}`}
                    initial={{ y: '110%' }}
                    animate={headerInView ? { y: '0%' } : {}}
                    transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          {/* Animated gold line */}
          <motion.div
            className="hidden md:block h-px bg-gold/50 origin-right self-center"
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
            style={{ width: 120 }}
          />
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 md:gap-x-10">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.nr}
              className="relative group pb-10 md:pb-0"
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate={stepsInView ? 'visible' : 'hidden'}
            >
              {/* Top gold sweep — desktop */}
              <motion.div
                className="hidden md:block h-px bg-gold/40 origin-left mb-7 group-hover:bg-gold transition-colors duration-500"
                initial={{ scaleX: 0 }}
                animate={stepsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.65, ease, delay: i * 0.13 + 0.55 }}
              />

              {/* Mobile accent line */}
              <motion.div
                className="md:hidden absolute left-0 top-0 w-px bg-gold/40 origin-top"
                style={{ height: '100%' }}
                initial={{ scaleY: 0 }}
                animate={stepsInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.6, ease, delay: i * 0.13 + 0.4 }}
              />

              {/* Content */}
              <div className="pl-6 md:pl-0 relative overflow-hidden">
                <span
                  aria-hidden
                  className="absolute top-0 right-0 font-display leading-none select-none pointer-events-none text-white/[0.055]"
                  style={{ fontSize: 'clamp(44px, 4vw, 62px)', lineHeight: 1 }}
                >
                  {s.nr}
                </span>

                <p className="label-caps text-gold/60 mb-4 group-hover:text-gold transition-colors duration-300">
                  Trin {s.nr}
                </p>

                <h3 className="font-display text-[1.65rem] md:text-3xl text-white leading-tight mb-4 group-hover:text-gold-light transition-colors duration-300">
                  {s.title}
                </h3>

                <div className="h-[2px] w-7 bg-gold/50 mb-4 group-hover:w-12 group-hover:bg-gold transition-all duration-500 ease-out" />

                <p className="text-white/50 text-[13px] leading-relaxed group-hover:text-white/70 transition-colors duration-300 pr-2">
                  {s.desc}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="md:hidden absolute bottom-0 left-6 right-0 h-px bg-white/[0.08]" />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  )
}
