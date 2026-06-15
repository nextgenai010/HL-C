'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

const TRUST_ITEMS = [
  {
    title: 'Svendebrev',
    sub: 'Verificeret tømrermester',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
      </svg>
    ),
  },
  {
    title: '+5 års erfaring',
    sub: 'Lokalt forankret i Herlev',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3.5 3.5"/>
      </svg>
    ),
  },
  {
    title: 'Svar inden 24 timer',
    sub: 'Gratis og uforpligtende',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageY         = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const imageScale     = useTransform(scrollYProgress, [0, 1], [1, 1.04])

  // Custom gold cursor
  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -200, my = -200, rx = -200, ry = -200
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onOver = (e: MouseEvent) => {
      document.body.classList.toggle('cursor-hovering', !!(e.target as HTMLElement).closest('a, button'))
    }
    const tick = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      dot.style.transform  = `translate(${mx - 3}px, ${my - 3}px)`
      ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`
      raf = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Custom cursor — desktop only */}
      <div ref={dotRef} aria-hidden className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold-light pointer-events-none z-[9999] hidden md:block" />
      <div ref={ringRef} aria-hidden className="cursor-ring fixed top-0 left-0 w-[38px] h-[38px] rounded-full border border-gold-light/40 pointer-events-none z-[9999] hidden md:block" />

      <section
        ref={ref}
        className="relative w-full h-[100svh] bg-dark text-white overflow-hidden"
      >

        {/* ── PHOTO — full bleed, gradient does all the work ── */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 origin-center"
        >
          <Image
            src="/images/hero-billede.jpg"
            alt="Tømrermester H.L. Christiansen i arbejde"
            fill
            priority
            quality={75}
            className="object-cover"
            style={{ objectPosition: 'center 58%' }}
            sizes="100vw"
          />
        </motion.div>

        {/* ── GRADIENTS ── */}
        {/* Primary: left solid → transparent — creates the smooth split */}
        <div aria-hidden className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #232426 0%, #232426 28%, rgba(35,36,38,0.97) 36%, rgba(35,36,38,0.82) 48%, rgba(35,36,38,0.45) 62%, rgba(35,36,38,0.12) 78%, transparent 100%)',
          }}
        />
        {/* Top vignette — darkens top edge so navbar reads cleanly */}
        <div aria-hidden className="absolute top-0 left-0 right-0 h-40 z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(35,36,38,0.7) 0%, transparent 100%)' }}
        />
        {/* Bottom vignette — trust bar legibility */}
        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-52 z-[2] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(20,21,22,0.85) 0%, transparent 100%)' }}
        />
        {/* Mobile: darken whole image so text is readable */}
        <div aria-hidden className="md:hidden absolute inset-0 z-[3] pointer-events-none bg-dark/65" />

        {/* ── GRAIN TEXTURE ── */}
        <div aria-hidden className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }}
        />

        {/* ── CONTENT ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="absolute inset-0 z-10 flex flex-col justify-center px-5 sm:px-6 md:pl-16 lg:pl-20 xl:pl-24 pb-24 sm:pb-32 pt-20 sm:pt-24 max-w-[580px] md:max-w-[640px]"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="block w-7 h-px bg-gold-light origin-left flex-shrink-0"
            />
            <span className="font-label text-[10px] uppercase tracking-[0.22em] text-gold-light">
              Verificeret Tømrermester · Svendebrev
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-light text-[clamp(2.4rem,4.6vw,4.75rem)] leading-[1.05] sm:leading-[1.04] tracking-[-0.015em] mb-5 sm:mb-6">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.95, ease, delay: 0.15 }}
              >
                Håndværk med
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block italic text-gold-light"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.95, ease, delay: 0.28 }}
              >
                karakter
              </motion.span>
            </span>
          </h1>

          {/* Divider */}
          <motion.span
            aria-hidden
            initial={{ width: 0 }}
            animate={{ width: 52 }}
            transition={{ duration: 1.0, ease, delay: 0.5 }}
            className="block h-px bg-gold-light/50 mb-7"
            style={{ width: 0 }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.72 }}
            className="font-body text-[15px] font-light leading-[1.8] text-white/60 max-w-[400px] mb-10"
          >
            Verificeret tømrermester med svendebrev i Herlev og hele
            Storkøbenhavn. Fra nybyg til renovering leverer vi håndværk med
            karakter — og svar inden 24 timer.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.88 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/projekter"
              className="group inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-8 py-3 sm:py-3.5 font-label text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] bg-gold-light text-dark transition-all duration-300 hover:bg-white hover:text-dark"
            >
              Se vores arbejde
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M2 7h10M7 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-5 sm:px-8 py-3 sm:py-3.5 font-label text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white border border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/12 hover:border-white/55"
            >
              Kontakt os
            </Link>
          </motion.div>
        </motion.div>

        {/* ── TRUST BAR — floats over hero bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
          className="absolute bottom-0 left-0 right-0 z-20 flex"
        >
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-6 md:px-10 py-3 sm:py-4 md:py-5 group transition-all duration-300"
              style={{
                background: i === 0
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(18,19,20,0.55) 100%)'
                  : 'rgba(18,19,20,0.45)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: `1px solid ${i === 0 ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.08)'}`,
                borderRight: i < TRUST_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : undefined,
              }}
            >
              <span className="flex-shrink-0 text-gold-light opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="font-label text-[10px] sm:text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] sm:tracking-[0.12em] text-white/90 leading-tight sm:leading-none mb-0 sm:mb-[5px]">
                  {item.title}
                </p>
                <p className="hidden sm:block font-body text-[10px] md:text-[11px] text-white/40 leading-none group-hover:text-white/55 transition-colors duration-300 truncate">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  )
}
