'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { Reveal } from '@/components/ui/Reveal'

const ease = [0.16, 1, 0.3, 1] as const

const CTA_LINES = ['Har du et projekt', 'i tankerne?']

export function CTA() {
  return (
    <section className="bg-dark text-white grain relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(900px 500px at 80% 50%, rgba(184,150,12,0.12), transparent 60%)',
        }}
      />

      <div className="container-content py-24 md:py-32 relative z-10 text-center flex flex-col items-center">
        <Reveal>
          <p className="label-caps text-gold-light mb-6">✦ Kom i gang</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Lad os tale om <span className="italic text-gold-light">dit projekt</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <GoldDivider variant="gold-light" className="mt-6" />
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 text-white/60 leading-relaxed text-lg max-w-xl">
            Ring, skriv eller book et uforpligtende besøg. Vi svarer inden for 24 timer
            — og kigger gerne forbi for at tale løsningen igennem på stedet.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="btn-outline-white">
              Få et tilbud
            </Link>
            <Link
              href="/ydelser"
              className="inline-flex items-center justify-center bg-transparent text-white/60 px-7 py-3 font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold-light"
            >
              Se vores ydelser →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
