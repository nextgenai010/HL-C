'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const IMAGES = [
  '/images/projekter/img_0281.jpg',
  '/images/projekter/img_0282.jpg',
  '/images/projekter/img_0283.jpg',
  '/images/projekter/img_0284.jpg',
  '/images/projekter/img_0285.jpg',
  '/images/projekter/img_0286.jpg',
  '/images/projekter/img_0287.jpg',
  '/images/projekter/img_0288.jpg',
  '/images/projekter/img_0289.jpg',
]

export function ProjekterGallery() {
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIdx, setLbIdx] = useState(0)
  const [lbAnimDir, setLbAnimDir] = useState<'out-left' | 'in-right' | 'out-right' | 'in-left' | null>(null)
  const [lbVisible, setLbVisible] = useState(false)
  const isNavAnim = useRef(false)
  const txStart = useRef(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            setTimeout(() => {
              const el = entry.target as HTMLElement
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }, Math.max(idx, 0) * 70)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' },
    )
    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const openLightbox = useCallback((idx: number) => {
    setLbIdx(idx)
    setLbAnimDir(null)
    setLbOpen(true)
    setTimeout(() => setLbVisible(true), 20)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLbOpen(false)
    setLbVisible(false)
    document.body.style.overflow = ''
  }, [])

  const navigate = useCallback((dir: 1 | -1) => {
    if (isNavAnim.current) return
    isNavAnim.current = true
    setLbAnimDir(dir > 0 ? 'out-left' : 'out-right')
    setTimeout(() => {
      setLbIdx((prev) => (prev + dir + IMAGES.length) % IMAGES.length)
      setLbAnimDir(dir > 0 ? 'in-right' : 'in-left')
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setLbAnimDir(null)
          setTimeout(() => { isNavAnim.current = false }, 360)
        }),
      )
    }, 240)
  }, [])

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lbOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lbOpen, closeLightbox, navigate])

  const wrapStyle: React.CSSProperties = (() => {
    if (lbAnimDir === 'out-left')
      return { transform: 'scale(0.96) translateX(-40px)', opacity: 0, transition: 'transform 0.25s ease, opacity 0.25s ease' }
    if (lbAnimDir === 'in-right')
      return { transform: 'scale(0.96) translateX(40px)', opacity: 0, transition: 'none' }
    if (lbAnimDir === 'out-right')
      return { transform: 'scale(0.96) translateX(40px)', opacity: 0, transition: 'transform 0.25s ease, opacity 0.25s ease' }
    if (lbAnimDir === 'in-left')
      return { transform: 'scale(0.96) translateX(-40px)', opacity: 0, transition: 'none' }
    return { transform: 'scale(1) translateX(0)', opacity: 1, transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease' }
  })()

  return (
    <>
      <style suppressHydrationWarning>{`
        .proj-header {
          padding: 120px 64px 80px;
          background: #1a1b1d;
        }
        .proj-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }
        .proj-eyebrow {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: #D4AF37;
          text-transform: uppercase;
          margin-bottom: 14px;
          font-family: 'DM Sans', sans-serif;
          animation: projFadeUp 0.6s ease forwards 0.2s;
          opacity: 0;
        }
        .proj-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 300;
          line-height: 0.95;
          letter-spacing: -0.025em;
          color: #FAFAF8;
          animation: projFadeUp 0.8s ease forwards 0.4s;
          opacity: 0;
        }
        .proj-headline em {
          font-style: italic;
          color: rgba(250,250,248,0.55);
        }
        .proj-gold-accent {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          animation: projFadeUp 0.5s ease forwards 0.8s;
          opacity: 0;
        }
        .proj-ga-line {
          height: 1px;
          background: #D4AF37;
          width: 0;
          animation: projGaGrow 0.8s ease forwards 1s;
        }
        .proj-ga-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #D4AF37;
        }
        .proj-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.3);
          text-align: right;
          animation: projFadeUp 0.6s ease forwards 0.9s;
          opacity: 0;
          flex-shrink: 0;
          padding-bottom: 4px;
        }
        .proj-count strong {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: rgba(212,175,55,0.18);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .proj-divider-wrap {
          background: #1a1b1d;
        }
        .proj-divider {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 64px;
          height: 1px;
          background: linear-gradient(to right, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0.08) 60%, transparent 100%);
          animation: projFadeUp 0.5s ease forwards 1.1s;
          opacity: 0;
        }
        .proj-gallery {
          background: #1a1b1d;
          padding: 56px 48px 120px;
        }
        .proj-grid {
          max-width: 1400px;
          margin: 0 auto;
          columns: 3;
          column-gap: 10px;
        }
        .proj-item {
          break-inside: avoid;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .proj-item::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 0px solid #D4AF37;
          background: rgba(20,20,22,0);
          transition: border-width 0.35s ease, border-color 0.35s ease, background 0.35s ease;
          pointer-events: none;
        }
        .proj-item:hover::after {
          border: 2px solid #D4AF37;
          background: rgba(20,20,22,0.22);
        }
        .proj-crop {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
        }
        .proj-crop img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 45%;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .proj-item:hover .proj-crop img {
          transform: scale(1.04);
        }
        @media (max-width: 900px) { .proj-grid { columns: 2; } }
        @media (max-width: 520px) {
          .proj-grid { columns: 1; }
          .proj-header { padding: 100px 24px 60px; }
          .proj-gallery { padding: 40px 16px 80px; }
        }
        @keyframes projFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes projGaGrow { to { width: 56px; } }

        .proj-lb {
          position: fixed;
          inset: 0;
          background: rgba(10,10,12,0.96);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          transition: opacity 0.35s ease;
        }
        .proj-lb-wrap {
          position: relative;
        }
        .proj-lb-wrap img {
          max-width: 90vw;
          max-height: 88vh;
          object-fit: contain;
          display: block;
          box-shadow: 0 40px 120px rgba(0,0,0,0.85);
        }
        .proj-lb-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          transition: opacity 0.4s ease 0.2s;
          pointer-events: none;
        }
        .proj-lb-corner.tl { top: -7px; left: -7px; }
        .proj-lb-corner.tr { top: -7px; right: -7px; transform: rotate(90deg); }
        .proj-lb-corner.bl { bottom: -7px; left: -7px; transform: rotate(-90deg); }
        .proj-lb-corner.br { bottom: -7px; right: -7px; transform: rotate(180deg); }
        .proj-lb-nav {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 10;
          transition: opacity 0.3s ease 0.2s;
        }
        .proj-lb-btn {
          width: 46px;
          height: 46px;
          border: 1px solid rgba(212,175,55,0.35);
          background: none;
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .proj-lb-btn:hover { border-color: #D4AF37; background: rgba(212,175,55,0.1); }
        .proj-lb-counter {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.3);
          min-width: 48px;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
        }
        .proj-lb-close {
          position: fixed;
          top: 24px;
          right: 32px;
          background: none;
          border: 1px solid rgba(212,175,55,0.3);
          color: #D4AF37;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          transition: border-color 0.2s, background 0.2s;
          z-index: 10;
        }
        .proj-lb-close:hover { border-color: #D4AF37; background: rgba(212,175,55,0.08); }
      `}</style>

      {/* Header */}
      <header className="proj-header">
        <div className="proj-header-inner">
          <div>
            <p className="proj-eyebrow">Tidligere arbejde</p>
            <h1 className="proj-headline">
              Vores<br /><em>projekter</em>
            </h1>
            <div className="proj-gold-accent">
              <div className="proj-ga-line" />
              <div className="proj-ga-dot" />
              <div className="proj-ga-line" />
            </div>
          </div>
          <div className="proj-count">
            <strong>09</strong>
            projekter
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="proj-divider-wrap">
        <div className="proj-divider" />
      </div>

      {/* Gallery */}
      <div className="proj-gallery">
        <div className="proj-grid">
          {IMAGES.map((src, i) => (
            <div
              key={src}
              className="proj-item"
              ref={(el) => { itemRefs.current[i] = el }}
              onClick={() => openLightbox(i)}
            >
              <div className="proj-crop">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Tømrerprojekt ${i + 1} udført af H L Christiansen i Storkøbenhavn`} loading="lazy" width="800" height="600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lbOpen && (
        <div
          className="proj-lb"
          style={{ opacity: lbVisible ? 1 : 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}
          onTouchStart={(e) => { txStart.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - txStart.current
            if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1)
          }}
        >
          <div className="proj-lb-wrap" style={wrapStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES[lbIdx]} alt={`Tømrerprojekt ${lbIdx + 1} af Tømrerfirmaet H L Christiansen — fuld visning`} />
            <div className="proj-lb-corner tl" style={{ opacity: lbVisible ? 1 : 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M0 18 L0 0 L18 0" fill="none" stroke="#D4AF37" strokeWidth="1.5" /></svg>
            </div>
            <div className="proj-lb-corner tr" style={{ opacity: lbVisible ? 1 : 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M0 18 L0 0 L18 0" fill="none" stroke="#D4AF37" strokeWidth="1.5" /></svg>
            </div>
            <div className="proj-lb-corner bl" style={{ opacity: lbVisible ? 1 : 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M0 18 L0 0 L18 0" fill="none" stroke="#D4AF37" strokeWidth="1.5" /></svg>
            </div>
            <div className="proj-lb-corner br" style={{ opacity: lbVisible ? 1 : 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M0 18 L0 0 L18 0" fill="none" stroke="#D4AF37" strokeWidth="1.5" /></svg>
            </div>
          </div>

          <div className="proj-lb-nav" style={{ opacity: lbVisible ? 1 : 0 }}>
            <button className="proj-lb-btn" onClick={() => navigate(-1)}>&#8592;</button>
            <div className="proj-lb-counter">{lbIdx + 1} / {IMAGES.length}</div>
            <button className="proj-lb-btn" onClick={() => navigate(1)}>&#8594;</button>
          </div>

          <button className="proj-lb-close" onClick={closeLightbox}>&#x2715;</button>
        </div>
      )}
    </>
  )
}
