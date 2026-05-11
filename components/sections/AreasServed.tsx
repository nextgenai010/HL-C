'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GoldDivider } from '@/components/ui/GoldDivider'

const ease = [0.16, 1, 0.3, 1] as const

const AREAS = [
  { name: 'Herlev', note: 'Vores base — hjemmebane' },
  { name: 'Ballerup', note: 'Daglige opgaver' },
  { name: 'Gladsaxe', note: 'Daglige opgaver' },
  { name: 'København', note: 'Indre og brokvarterer' },
  { name: 'Frederiksberg', note: 'Lejligheder & villaer' },
  { name: 'Rødovre', note: 'Daglige opgaver' },
  { name: 'Glostrup', note: 'Daglige opgaver' },
  { name: 'Lyngby-Taarbæk', note: 'Daglige opgaver' },
  { name: 'Bagsværd', note: 'Daglige opgaver' },
  { name: 'Søborg', note: 'Daglige opgaver' },
  { name: 'Værløse', note: 'Efter aftale' },
  { name: 'Vanløse', note: 'Daglige opgaver' },
]

const HEADLINE_LINES = [
  { text: 'Hjemme i', italic: false },
  { text: 'Storkøbenhavn', italic: true, gold: true },
]

export function AreasServed() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section ref={ref} className="bg-gray-light py-20 md:py-28">
      <div className="container-content">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <motion.p
              className="label-caps text-gold mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              ✦ Områder vi dækker
            </motion.p>

            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`block${line.italic ? ' italic' : ''}${line.gold ? ' text-gold' : ''}`}
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h2>

            <GoldDivider className="mt-6" />
          </div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
          >
            <p className="text-dark/65 leading-relaxed">
              Vi har base i Herlev og kører dagligt ud til opgaver i hele Storkøbenhavn.
              Bor du lige uden for listen, så ring eller skriv — vi tager gerne en snak om,
              hvad der kan lade sig gøre.
            </p>
          </motion.div>
        </div>

        {/* Areas grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-mid border border-gray-mid">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.name}
              className="bg-white p-5 sm:p-6 group hover:bg-dark transition-colors duration-500"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease, delay: 0.08 * (i % 4) + Math.floor(i / 4) * 0.1 + 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="block w-3 h-px bg-gold transition-all duration-500 group-hover:w-5 group-hover:bg-gold-light" />
                <span className="label-caps text-gold/70 group-hover:text-gold-light transition-colors duration-300 text-[10px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="font-display text-xl sm:text-2xl text-dark group-hover:text-white transition-colors duration-300 leading-tight">
                {area.name}
              </p>
              <p className="mt-1 text-xs text-dark/45 group-hover:text-white/45 transition-colors duration-300">
                {area.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="mt-8 text-sm text-dark/55 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.8 }}
        >
          Vi udfører også opgaver i Albertslund, Brøndby, Hvidovre, Vallensbæk, Tårnby, Dragør, Gentofte og
          Hørsholm efter aftale.
        </motion.p>

      </div>
    </section>
  )
}
