'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, type Variants } from 'framer-motion'

const SERVICES = [
  {
    id: 'nybyg',
    name: 'Nybyg og Tilbygninger',
    description: 'Fra fundament til rejsegilde – vi opfører nye boliger og tilbygninger med fokus på solid håndværk og præcise detaljer.',
    image: '/images/ydelser/nybyg.jpg',
    href: '/ydelser/nybyg-tilbygninger',
    grid: { gridColumn: '1 / 8', gridRow: '1' },
    fontSize: '30px',
  },
  {
    id: 'tag',
    name: 'Tag og Kviste',
    description: 'Nyt tag, kvistudvidelse eller tagudskiftning – vi sikrer dit hjem mod vejr og vind med kvalitetsmaterialer.',
    image: '/images/ydelser/tag.jpeg',
    href: '/ydelser/tag',
    grid: { gridColumn: '8 / 13', gridRow: '1' },
    fontSize: '22px',
  },
  {
    id: 'renovering',
    name: 'Renovering og Ombygning',
    description: 'Vi omdanner eksisterende rum og bygninger med respekt for det originale og øje for det nye.',
    image: '/images/ydelser/renovering.png',
    href: '/ydelser/renovering',
    grid: { gridColumn: '1 / 5', gridRow: '2' },
    fontSize: '22px',
  },
  {
    id: 'facader',
    name: 'Facader og Beklædning',
    description: 'Facaderenovering og ny beklædning i træ og komposit – der beskytter og fornyer husets udtryk.',
    image: '/images/ydelser/facader.png',
    href: '/ydelser/facader',
    grid: { gridColumn: '5 / 9', gridRow: '2' },
    fontSize: '22px',
  },
  {
    id: 'terrasser',
    name: 'Terrasser og Udendørs',
    description: 'Smukke træterrasser og udendørs træstrukturer, bygget til det danske klima med kvalitetstræ.',
    image: '/images/ydelser/terrasser.png',
    href: '/ydelser/terrasser',
    grid: { gridColumn: '9 / 13', gridRow: '2' },
    fontSize: '22px',
  },
  {
    id: 'vinduer',
    name: 'Vinduer og Døre',
    description: 'Montering og udskiftning af vinduer og døre med tæt pasform, energioptimering og æstetisk finish.',
    image: '/images/ydelser/vinduer.png',
    href: '/ydelser/vinduer-doere',
    grid: { gridColumn: '1 / 13', gridRow: '3', height: '240px' },
    fontSize: '22px',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.95, ease, delay: i * 0.09 },
  }),
}

function GoldLine() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', height: '1px', overflow: 'visible' }}>
      <div style={{
        height: '1px',
        background: '#D4AF37',
        width: inView ? '120px' : '0',
        transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
      }} />
    </div>
  )
}

export function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.04 })
  const gridInView = useInView(gridRef, { once: true, amount: 0.06 })

  return (
    <>
      <style suppressHydrationWarning>{`
        .yds-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: brightness(0.82);
        }
        .yds-card:hover .yds-img { transform: scale(1.05); filter: brightness(0.65); }

        .yds-arrow {
          position: absolute; top: 24px; right: 24px;
          width: 36px; height: 36px;
          border: 1px solid rgba(212,175,55,0.5);
          display: flex; align-items: center; justify-content: center;
          color: #D4AF37;
          opacity: 0; transform: scale(0.8);
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s;
        }
        .yds-card:hover .yds-arrow { opacity: 1; transform: scale(1); border-color: #D4AF37; }

        .yds-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 28px 28px 24px;
          transform: translateY(4px);
          transition: transform 0.4s ease;
        }
        .yds-card:hover .yds-content { transform: translateY(0); }

        .yds-eyebrow {
          font-size: 10px; letter-spacing: 0.3em; color: #D4AF37;
          text-transform: uppercase; margin-bottom: 6px; opacity: 0;
          transition: opacity 0.4s ease;
          font-family: var(--font-label), 'Barlow Condensed', sans-serif;
        }
        .yds-card:hover .yds-eyebrow { opacity: 1; }

        .yds-gold-line {
          width: 28px; height: 1px; background: #D4AF37;
          margin: 10px 0 0; transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease 0.1s;
        }
        .yds-card:hover .yds-gold-line { transform: scaleX(1); }

        .yds-desc {
          font-size: 12.5px; font-weight: 300; color: rgba(255,255,255,0.72);
          line-height: 1.6; margin-top: 8px; max-width: 340px;
          max-height: 0; overflow: hidden;
          transition: max-height 0.4s ease, margin-top 0.3s ease;
          font-family: var(--font-body), 'DM Sans', sans-serif;
        }
        .yds-card:hover .yds-desc { max-height: 60px; }

        @media (max-width: 900px) {
          .yds-card { grid-column: auto !important; grid-row: auto !important; aspect-ratio: 4/3; height: auto !important; }
          .yds-card:first-child { grid-column: 1 / -1 !important; aspect-ratio: 16/7; }
        }
        @media (max-width: 560px) {
          .yds-card { aspect-ratio: 4/3 !important; }
          .yds-card:first-child { aspect-ratio: 4/3 !important; }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0, y: 32 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        style={{ background: '#FFFFFF', padding: '100px 0 80px', overflow: 'hidden' }}
      >
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-label, "Barlow Condensed", sans-serif)',
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.35em',
              color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px',
            }}
          >
            Hvad vi laver
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '110%' }}
              animate={sectionInView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, ease, delay: 0.18 }}
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond", serif)',
                fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 300,
                color: '#232426', lineHeight: 1.05, marginBottom: '24px',
              }}
            >
              Vores ydelser
            </motion.h2>
          </div>
          <GoldLine />
        </div>

        {/* Photo grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '360px 260px auto',
            gap: '3px',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 40px',
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              style={{ ...s.grid, position: 'relative', overflow: 'hidden', background: '#232426' }}
            >
              <Link href={s.href} className="yds-card" style={{ position: 'absolute', inset: 0, display: 'block' }}>
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 840px"
                  className="yds-img"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15,12,10,0.85) 0%, rgba(15,12,10,0.1) 55%, transparent 100%)',
                  pointerEvents: 'none',
                }} />
                <div className="yds-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="yds-content">
                  <p className="yds-eyebrow">Ydelse 0{i + 1}</p>
                  <h3 style={{
                    fontFamily: 'var(--font-display, "Cormorant Garamond", serif)',
                    fontSize: s.fontSize, fontWeight: 400,
                    color: '#fff', lineHeight: 1.15, letterSpacing: '0.01em',
                  }}>
                    {s.name}
                  </h3>
                  <div className="yds-gold-line" />
                  <p className="yds-desc">{s.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: '56px' }}
        >
          <Link
            href="/ydelser"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-label, "Barlow Condensed", sans-serif)',
              fontSize: '12px', fontWeight: 500, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: '#D4AF37',
              border: '1px solid #D4AF37', padding: '14px 38px',
              textDecoration: 'none', transition: 'background 0.25s, color 0.25s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D4AF37'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#D4AF37' }}
          >
            Se alle ydelser
          </Link>
        </motion.div>
      </motion.section>
    </>
  )
}
