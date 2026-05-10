'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { getConsent } from '@/components/ui/CookieConsent'

const GA_ID = 'G-XKV4BHJQNT'

export function Analytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(getConsent() === 'accepted')
    function onChange(e: Event) {
      setEnabled((e as CustomEvent).detail === 'accepted')
    }
    window.addEventListener('consent-changed', onChange)
    return () => window.removeEventListener('consent-changed', onChange)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
