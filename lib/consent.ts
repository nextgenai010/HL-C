export type ConsentValue = 'accepted' | 'rejected'
export const GA_ID = 'G-XKV4BHJQNT'
const STORAGE_KEY = 'cookie-consent'

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch { return null }
}

export function setConsent(value: ConsentValue) {
  try { localStorage.setItem(STORAGE_KEY, value) } catch { /* Browser may block storage. */ }
  const analyticsWindow = window as unknown as Record<string, unknown>
  analyticsWindow[`ga-disable-${GA_ID}`] = value !== 'accepted'
  const gtag = analyticsWindow.gtag as ((...args: unknown[]) => void) | undefined
  gtag?.('consent', 'update', { analytics_storage: value === 'accepted' ? 'granted' : 'denied' })
  if (value === 'rejected') {
    const parts = location.hostname.split('.')
    const domains = ['', ...parts.map((_, i) => parts.slice(i).join('.'))]
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim()
      if (!name.startsWith('_ga')) continue
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
        if (domain) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`
      }
    }
  }
  window.dispatchEvent(new CustomEvent('consent-changed', { detail: value }))
}
