'use client'

import { useEffect, useState } from 'react'
import { getConsent, setConsent, type ConsentValue } from '@/lib/consent'

export function CookieControls() {
  const [consent, setCurrent] = useState<ConsentValue | null>(null)
  useEffect(() => {
    setCurrent(getConsent())
    const update = (event: Event) => setCurrent((event as CustomEvent).detail)
    window.addEventListener('consent-changed', update)
    return () => window.removeEventListener('consent-changed', update)
  }, [])
  function update(value: ConsentValue) {
    const previous = getConsent()
    setConsent(value)
    // Unload previously accepted third-party scripts after withdrawal.
    if (value === 'rejected' && previous === 'accepted') window.location.reload()
  }
  return <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
    <p className="label-caps text-white/60">Nuværende valg</p>
    <p className="mt-2 text-white" role="status">{consent === 'accepted' ? 'Statistik er accepteret.' : consent === 'rejected' ? 'Statistik er afvist.' : 'Du har endnu ikke truffet et valg.'}</p>
    <div className="mt-5 flex flex-wrap gap-3"><button onClick={() => update('accepted')} disabled={consent === 'accepted'} className="btn-outline-white">Accepter statistik</button><button onClick={() => update('rejected')} disabled={consent === 'rejected'} className="btn-outline-white">Afvis / tilbagekald</button></div>
  </div>
}
