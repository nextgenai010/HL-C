'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { SvendebrevBadge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'

const ease = [0.16, 1, 0.3, 1] as const

const BODY_LINES = [
  'Jonatan er uddannet tømrer med svendebrev og har ført Tømrerfirmaet H L Christiansen frem som et værksted der tager hver opgave seriøst — fra det første målebånd til den sidste liste er på plads.',
  'Vi tror på klar kommunikation, rene linjer og arbejde der holder. Ikke hurtige løsninger, men ordentlige dem.',
]

const HEADLINE_LINES = [
  { text: 'Håndværk med', italic: false },
  { text: 'ansvar og rygrad.', italic: true },
]

export function AboutSnippet() {
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-linked parallax for the image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.03, 1.0])

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-32 overflow-hidden">
      <div className="container-content grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

        {/* Image — parallax container */}
        <div className="lg:col-span-5 relative aspect-[4/3] md:aspect-[4/4] lg:aspect-[4/5] bg-gray-light overflow-hidden">
          {/* Image loads normally — parallax via scale+y transform only */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="absolute inset-0 origin-center"
          >
            <Image
              src="/images/hero-billede.jpg"
              alt="Tømrermester H.L. Christiansen i arbejde"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              style={{ objectPosition: 'center 40%' }}
            />
          </motion.div>

          {/* Dark curtain that slides upward to reveal the image */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-gray-light z-10 origin-bottom"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease }}
          />

          {/* Gold corner accent */}
          <motion.div
            className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="absolute bottom-0 left-0 w-[2px] h-10 bg-gold" />
            <div className="absolute bottom-0 left-0 w-10 h-[2px] bg-gold" />
          </motion.div>
        </div>

        {/* Text */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <p className="label-caps text-gold mb-4">✦ Om firmaet</p>
          </Reveal>

          {/* Headline — line by line */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-0">
            {HEADLINE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block${line.italic ? ' italic' : ''}`}
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.95, ease, delay: 0.2 + i * 0.12 }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>

          <Reveal delay={0.3}>
            <h3 className="font-display text-2xl md:text-3xl text-dark mt-5">
              Jonatan Hintze Ladewig Christiansen
            </h3>
          </Reveal>

          <Reveal delay={0.38}>
            <GoldDivider className="mt-5" />
          </Reveal>

          {/* Body — paragraph by paragraph */}
          {BODY_LINES.map((para, i) => (
            <Reveal key={i} delay={0.45 + i * 0.1}>
              <p className={`text-dark/75 leading-relaxed max-w-xl ${i === 0 ? 'mt-8' : 'mt-4'}`}>
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.62}>
            <div className="mt-10">
              <SvendebrevBadge />
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/om-os" className="btn-outline">
                Læs mere om os
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
