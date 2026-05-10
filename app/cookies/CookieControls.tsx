'use client'

import { useEffect, useState } from 'react'
import { getConsent, type ConsentValue } from '@/components/ui/CookieConsent'

export function CookieControls() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null)

  useEffect(() => {
    setConsentState(getConsent())
    function onChange(e: Event) {
      setConsentState((e as CustomEvent).detail as ConsentValue)
    }
    window.addEventListener('consent-changed', onChange)
    return () => window.removeEventListener('consent-changed', onChange)
  }, [])

  function update(value: ConsentValue) {
    window.localStorage.setItem('cookie-consent', value)
    window.dispatchEvent(new CustomEvent('consent-changed', { detail: value }))
    if (value === 'rejected') {
      // Best-effort cleanup of GA cookies on this domain
      document.cookie.split(';').forEach((c) => {
        const name = c.split('=')[0].trim()
        if (name.startsWith('_ga')) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        }
      })
    }
  }

  return (
    <div className="border border-gold/30 bg-white/5 p-5">
      <p className="label-caps text-white/50">Nuværende valg</p>
      <p className="mt-1 font-body text-white">
        {consent === 'accepted' && 'Statistik-cookies er accepteret.'}
        {consent === 'rejected' && 'Statistik-cookies er afvist.'}
        {consent === null && 'Du har endnu ikke truffet et valg.'}
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => update('accepted')}
          disabled={consent === 'accepted'}
          className="btn-outline-white disabled:opacity-40 disabled:pointer-events-none"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={() => update('rejected')}
          disabled={consent === 'rejected'}
          className="label-caps text-white/60 hover:text-white transition-colors px-4 py-3 disabled:opacity-40 disabled:pointer-events-none"
        >
          Afvis / tilbagekald
        </button>
      </div>
    </div>
  )
}
