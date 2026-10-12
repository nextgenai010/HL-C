'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getConsent, setConsent, type ConsentValue } from '@/lib/consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => setVisible(false)
    window.addEventListener('consent-changed', update)
    if (getConsent() === null) {
      const t = setTimeout(() => setVisible(true), 600)
      return () => { clearTimeout(t); window.removeEventListener('consent-changed', update) }
    }
    return () => window.removeEventListener('consent-changed', update)
  }, [])

  if (!mounted || !visible) return null

  function choose(value: ConsentValue) {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie-samtykke"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-6"
    >
      <div className="float-panel pointer-events-auto mx-auto grid max-w-3xl items-center gap-4 rounded-[22px] bg-[rgba(35,36,38,0.92)] p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl glass-dark sm:grid-cols-[1fr_auto] sm:gap-6 sm:p-6">
        <div className="min-w-0">
          <p className="font-display text-[17px] font-semibold tracking-[-0.02em]">Cookies</p>
          <p className="mt-1 text-[14px] leading-relaxed text-white/70">
            Vi bruger cookies til at måle besøg og forbedre siden. Du vælger selv. Læs mere i vores{' '}
            <Link href="/cookies" className="text-gold-light underline underline-offset-4 hover:text-white">
              cookiepolitik
            </Link>
            .
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <button type="button" onClick={() => choose('rejected')} className="btn-outline-white !min-h-[42px] !px-5">
            Afvis
          </button>
          <button type="button" onClick={() => choose('accepted')} className="btn-gold !min-h-[42px] !px-5">
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
