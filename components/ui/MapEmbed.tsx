'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { getConsent } from '@/lib/consent'

type Props = {
  /** Search query or place for the map, e.g. "2730 Herlev". Swap for the Google Business Profile once it exists. */
  query: string
  title: string
}

/**
 * Google Maps embed. Google sets cookies, so the iframe only loads after cookie consent
 * or when the visitor clicks "Vis kort".
 */
export function MapEmbed({ query, title }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (getConsent() === 'accepted') setShow(true)
    const onChange = (e: Event) => { if ((e as CustomEvent).detail === 'accepted') setShow(true) }
    window.addEventListener('consent-changed', onChange)
    return () => window.removeEventListener('consent-changed', onChange)
  }, [])

  const q = encodeURIComponent(query)
  const embedUrl = `https://www.google.com/maps?q=${q}&hl=da&z=12&output=embed`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`

  return (
    <div className="card relative aspect-[4/3] overflow-hidden bg-gray-mid sm:aspect-[16/9]">
      {show ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gold">
            <MapPin size={22} aria-hidden />
          </span>
          <p className="max-w-sm text-[15px] leading-relaxed text-dark/70">
            Kortet hentes fra Google Maps, som sætter cookies. Klik for at vise det.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setShow(true)} className="btn-primary">Vis kort</button>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">Åbn i Google Maps</a>
          </div>
        </div>
      )}
    </div>
  )
}
