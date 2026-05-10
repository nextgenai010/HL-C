'use client'

import { usePathname } from 'next/navigation'
import { FloatingQuote } from './FloatingQuote'

export function FloatingQuoteWrapper() {
  const pathname = usePathname()
  if (pathname === '/kontakt') return null
  return <FloatingQuote />
}
