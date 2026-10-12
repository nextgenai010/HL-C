'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { PROJEKTER } from '@/lib/projects'

export function ProjekterGallery() {
  const [index, setIndex] = useState<number | null>(null)
  const touchStart = useRef(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const open = index !== null

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i === null ? i : (i + dir + PROJEKTER.length) % PROJEKTER.length))
  }, [])

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLButtonElement>('[data-close]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'Tab' && dialogRef.current) {
        const buttons = Array.from(dialogRef.current.querySelectorAll<HTMLButtonElement>('button'))
        const first = buttons[0], last = buttons[buttons.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      opener?.focus()
    }
  }, [open, close, step])

  const current = index !== null ? PROJEKTER[index] : null

  return (
    <>
      <section className="bg-dark pb-14 pt-32 text-white md:pb-20 md:pt-44">
        <div className="container-content flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="rise eyebrow !text-gold-light">Tidligere arbejde</p>
            <h1 className="rise-move mt-3 font-display text-[2.75rem] font-semibold leading-[1.02] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem]" style={{ '--d': '0.08s' } as React.CSSProperties}>
              Vores <span className="text-gold-light">projekter.</span>
            </h1>
          </div>
          <p className="rise max-w-sm text-[17px] leading-relaxed text-white/60" style={{ '--d': '0.16s' } as React.CSSProperties}>
            Terrasser, tag, vinduer og nybyg — et udpluk af opgaver fra byggepladsen. Tryk på et billede for at se
            det i fuld størrelse.
          </p>
        </div>
      </section>

      <section aria-label="Projektbilleder" className="bg-dark pb-24 text-white md:pb-36">
        <ul className="container-content grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {PROJEKTER.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Se billede i fuld størrelse: ${p.title}`}
                className="group block w-full text-left"
              >
                <span className="card relative block aspect-[3/4] bg-white/5">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 400px"
                    className="zoom-img object-cover"
                  />
                </span>
                <span className="mt-3 block text-[15px] font-semibold tracking-[-0.01em] text-white/90 md:text-[17px]">{p.title}</span>
                <span className="block text-[13px] text-white/60 md:text-[14px]">{p.kategoriLabel}</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </section>

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="lightbox fixed inset-0 z-[500] flex flex-col items-center justify-center bg-[rgba(12,12,13,0.94)] px-4 py-20 backdrop-blur-xl"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStart.current
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
          }}
        >
          <figure key={current.slug} className="lightbox-img flex max-h-full flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.alt}
              className="max-h-[calc(100dvh-12rem)] w-auto max-w-full rounded-[18px] object-contain shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            />
            <figcaption className="mt-4 text-center text-[15px] text-white/75">{current.title}</figcaption>
          </figure>

          <div className="fixed inset-x-0 bottom-6 flex items-center justify-center gap-4">
            <button type="button" className="icon-btn bg-white/10 text-white hover:bg-white/20" aria-label="Forrige billede" onClick={() => step(-1)}>
              <ChevronLeft size={20} aria-hidden />
            </button>
            <span className="min-w-[56px] text-center text-[14px] tabular-nums text-white/55">
              {(index ?? 0) + 1} / {PROJEKTER.length}
            </span>
            <button type="button" className="icon-btn bg-white/10 text-white hover:bg-white/20" aria-label="Næste billede" onClick={() => step(1)}>
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>

          <button
            type="button"
            data-close
            className="icon-btn fixed right-4 top-4 bg-white/10 text-white hover:bg-white/20 md:right-6 md:top-6"
            aria-label="Luk billede"
            onClick={close}
          >
            <X size={20} aria-hidden />
          </button>
        </div>
      )}
    </>
  )
}
