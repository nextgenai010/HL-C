'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { GA_ID, getConsent } from '@/lib/consent'

export function Analytics() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    setEnabled(getConsent() === 'accepted')
    const update = (event: Event) => setEnabled((event as CustomEvent).detail === 'accepted')
    window.addEventListener('consent-changed', update)
    return () => window.removeEventListener('consent-changed', update)
  }, [])
  if (!enabled) return null
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="ga-init" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      if (localStorage.getItem('cookie-consent') === 'accepted') {
        window['ga-disable-${GA_ID}'] = false;
        gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      }
    `}</Script>
    <VercelAnalytics beforeSend={event => getConsent() === 'accepted' ? event : null} />
  </>
}
