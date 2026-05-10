'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie-consent'

export type ConsentValue = 'accepted' | 'rejected'

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === 'accepted' || v === 'rejected' ? v : null
}

function setConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value)
  window.dispatchEvent(new CustomEvent('consent-changed', { detail: value }))
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (getConsent() === null) {
      const t = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(t)
    }
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
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none"
    >
      <div
        className="container-content pointer-events-auto"
        style={{ animation: 'cookie-rise 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <div className="bg-dark border border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)] p-6 md:p-7 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-5 md:gap-8">
          <div className="min-w-0">
            <p className="label-caps text-gold">✦ Cookies</p>
            <p className="mt-2 font-body text-sm text-white/75 leading-relaxed">
              Vi bruger cookies til at måle besøg og forbedre siden. Du vælger selv. Læs mere i vores{' '}
              <Link href="/cookies" className="text-gold hover:text-gold-light underline underline-offset-4">
                cookiepolitik
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={() => choose('rejected')}
              className="label-caps text-white/60 hover:text-white transition-colors px-4 py-3 sm:py-2"
            >
              Afvis
            </button>
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="btn-outline-white"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes cookie-rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
