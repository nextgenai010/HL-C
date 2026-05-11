'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const ease = [0.16, 1, 0.3, 1] as const

const META = [
  { label: 'Kategori', value: 'Terrasse' },
  { label: 'Lokation', value: 'Herlev' },
  { label: 'År', value: '2024' },
]

const LINES = [
  { text: 'Terrasse med', italic: false },
  { text: 'haveudsigt', italic: true },
]

export function FeaturedProject() {
  return (
    <section className="bg-dark overflow-hidden">

      {/* Top label bar */}
      <div className="container-content pt-14 md:pt-20 pb-8 flex items-center justify-between">
        <Reveal>
          <p className="label-caps text-gold">✦ Udvalgt arbejde</p>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-white/[0.04] select-none">
            01
          </span>
        </Reveal>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Image — curtain wipe reveal (curtain slides right, image loads normally) */}
        <div className="relative h-[42vw] max-h-[520px] min-h-[280px] overflow-hidden">
          {/* Image loads immediately — no clip on the img container */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 2.0, ease }}
          >
            <Image
              src="/images/teresse-projekt.jpg"
              alt="Terrasse projekt — Herlev 2024"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: 'center 60%' }}
            />
          </motion.div>

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark/60 hidden lg:block pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent pointer-events-none" />

          {/* Dark curtain that slides away to the right — reveals image */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-dark z-10 origin-left"
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease, delay: 0.1 }}
          />

          {/* Year stamp */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="absolute bottom-5 left-5 flex items-center gap-3 z-20"
          >
            <span className="w-5 h-px bg-gold" />
            <span className="font-label text-[10px] uppercase tracking-[0.25em] text-white/60">2024 · Herlev</span>
          </motion.div>
        </div>

        {/* Text — right column */}
        <div className="flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-14 py-10 sm:py-12 lg:py-0">

          {/* Headline — line by line clip-path reveal */}
          <h2 className="font-display text-[clamp(2rem,3.2vw,3rem)] leading-[1.05] text-white mb-5">
            {LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block${line.italic ? ' italic text-gold-light' : ''}`}
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease, delay: i * 0.12 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>

          <Reveal delay={0.25}>
            <h3 className="font-display text-white text-[clamp(1.4rem,2.2vw,2rem)] leading-snug mb-5">Skabt til haven</h3>
          </Reveal>

          {/* Gold line sweep */}
          <motion.div
            className="h-px bg-gold/50 origin-left mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            style={{ width: 40 }}
          />

          <Reveal delay={0.3}>
            <p className="font-label text-[10px] uppercase tracking-[0.22em] text-gold mb-2">Om projektet</p>
          </Reveal>

          <Reveal delay={0.42}>
            <p className="text-white/55 leading-relaxed mb-8 max-w-sm text-sm">
              Rummeligt trædæk i hardwood opført i forbindelse med eksisterende
              vinterhave. Naturlig integration i haven — præcise mål og rene
              afslutninger hele vejen rundt.
            </p>
          </Reveal>

          {/* Meta grid */}
          <Reveal delay={0.52}>
            <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-white/10">
              {META.map(m => (
                <div key={m.label}>
                  <p className="font-label text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">{m.label}</p>
                  <p className="font-label text-[11px] uppercase tracking-[0.1em] text-white/80">{m.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.62}>
            <Link
              href="/projekter"
              className="group inline-flex items-center gap-3 self-start border border-white/20 hover:border-gold/60 px-5 py-3 transition-all duration-300 hover:bg-gold/5"
            >
              <span className="font-label text-[11px] uppercase tracking-[0.2em] text-white/70 group-hover:text-gold-light transition-colors duration-300">
                Se alle projekter
              </span>
              <ArrowUpRight
                size={13}
                className="text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="pb-14 md:pb-20" />
    </section>
  )
}
