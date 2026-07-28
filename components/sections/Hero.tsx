'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageY         = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const imageScale     = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const cueOpacity     = useTransform(scrollYProgress, [0, 0.15], [1, 0])

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
        {/* Horizontal: deep #232426 on the left → eases off to the right so the working carpenter shows clearly */}
        <div aria-hidden className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(35,36,38,0.88) 0%, rgba(35,36,38,0.66) 28%, rgba(35,36,38,0.4) 52%, rgba(35,36,38,0.16) 74%, rgba(35,36,38,0.06) 100%)',
          }}
        />
        {/* Vertical scrim: deep at top (navbar) and bottom (scroll cue + smooth transition into next section) */}
        <div aria-hidden className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(35,36,38,0.8) 0%, rgba(35,36,38,0.22) 34%, rgba(35,36,38,0.22) 58%, rgba(18,19,20,0.92) 100%)',
          }}
        />
        {/* Deep radial behind the centred text so it sits on the rich dark tone and stays legible */}
        <div aria-hidden className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 62% at 50% 46%, rgba(20,21,22,0.6) 0%, rgba(20,21,22,0.28) 58%, transparent 82%)',
          }}
        />
        {/* Mobile: extra darkening so centred text is readable on the narrow crop */}
        <div aria-hidden className="md:hidden absolute inset-0 z-[3] pointer-events-none bg-dark/45" />

        {/* ── GRAIN TEXTURE ── */}
        <div aria-hidden className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }}
        />

        {/* ── CONTENT ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-20 pb-24"
        >
          {/* Eyebrow — symmetric line · text · line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="block w-7 h-px bg-gold-light/70 origin-right flex-shrink-0"
            />
            <span className="font-label text-[10px] uppercase tracking-[0.22em] text-gold-light">
              Verificeret Tømrermester · Svendebrev
            </span>
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="block w-7 h-px bg-gold-light/70 origin-left flex-shrink-0"
            />
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
            className="block h-px bg-gold-light/50 mb-7 mx-auto"
            style={{ width: 0 }}
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.72 }}
            className="font-body text-[15px] font-light leading-[1.8] text-white/65 max-w-[440px] mx-auto mb-10"
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
            className="flex flex-wrap justify-center gap-3"
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

        {/* ── SCROLL CUE — floats over hero bottom, fades on scroll ── */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
        >
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.15 }}
            className="font-label text-[9px] uppercase tracking-[0.28em] text-white/45"
          >
            Scroll
          </motion.span>
          <span aria-hidden className="relative block h-9 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 block h-3 bg-gradient-to-b from-gold-light to-transparent"
              initial={{ y: '-100%' }}
              animate={{ y: '340%' }}
              transition={{ duration: 1.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4, delay: 1.4 }}
            />
          </span>
        </motion.div>
      </section>
    </>
  )
}
