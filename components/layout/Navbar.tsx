'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site'

const NAV = [
  { href: '/', label: 'Forside' },
  { href: '/ydelser', label: 'Ydelser' },
  { href: '/projekter', label: 'Projekter' },
  { href: '/om-os', label: 'Om os' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [open])

  // Pages with a quote form on them (#tilbud) scroll to it; every other page goes to /kontakt.
  const hasQuoteForm = pathname === '/' || pathname === '/kontakt'
  const quoteHref = hasQuoteForm ? '#tilbud' : '/kontakt'

  const goToQuote = (event: React.MouseEvent) => {
    const target = document.getElementById('tilbud')
    if (!target) return
    event.preventDefault()
    setOpen(false)
    // Wait a frame so the closed mobile menu has released the scroll lock.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
      history.replaceState(null, '', '#tilbud')
      const card = target.querySelector<HTMLElement>('.quote-card') ?? target
      card.classList.remove('quote-flash')
      void card.offsetWidth
      card.classList.add('quote-flash')
      // Only place the cursor on devices with a mouse; on phones it would pop the keyboard over the form.
      if (matchMedia('(pointer: fine)').matches) {
        setTimeout(() => target.querySelector<HTMLInputElement>('input:not([type="file"])')?.focus({ preventScroll: true }), 450)
      }
    })
  }

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'glass-dark transition-[background-color,box-shadow] duration-500',
          scrolled || open
            ? 'bg-[rgba(35,36,38,0.78)] shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl backdrop-saturate-150'
            : 'bg-transparent',
        )}
      >
        <div className="container-content flex h-[64px] items-center justify-between md:h-[72px]">
          <Link href="/" aria-label={`${SITE.name} — forside`} className="flex items-center">
            {/* The logo canvas is square with generous padding; crop to the wordmark. */}
            <span className="relative block overflow-hidden" style={{ width: 128, height: 52 }}>
              <Image
                src="/images/logo/logo-trans.png"
                alt={SITE.name}
                width={1024}
                height={1024}
                priority
                sizes="152px"
                className="absolute max-w-none"
                style={{ width: 152, height: 152, top: -44, left: -11 }}
              />
            </span>
          </Link>

          <nav aria-label="Hovednavigation" className="hidden items-center gap-1 lg:flex">
            {NAV.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300',
                  isActive(item.href) ? 'text-white' : 'text-white/70 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-2 text-[14px] font-medium text-white/80 transition-colors hover:text-white">
              <Phone size={14} aria-hidden />
              {SITE.phone}
            </a>
            <Link href={quoteHref} onClick={goToQuote} className="btn-gold !min-h-[38px] !px-5 !py-2 !text-[14px]">
              Få et tilbud
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={`tel:${SITE.phoneHref}`}
              aria-label={`Ring ${SITE.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors active:bg-white/10"
            >
              <Phone size={19} aria-hidden />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Luk menu' : 'Åbn menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors active:bg-white/10"
            >
              <span aria-hidden className={cn('absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300', open ? 'rotate-45' : '-translate-y-[4px]')} />
              <span aria-hidden className={cn('absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300', open ? '-rotate-45' : 'translate-y-[4px]')} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        role="navigation"
        aria-label="Mobilnavigation"
        hidden={!open}
        className="glass-dark h-[calc(100dvh-64px)] overflow-y-auto bg-[rgba(35,36,38,0.92)] backdrop-blur-xl lg:hidden"
      >
        <div className="container-content flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {NAV.map((item, i) => (
              <li key={item.href} className="rise" style={{ '--d': `${i * 0.04}s` } as React.CSSProperties}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block py-3 font-display text-[30px] font-semibold tracking-[-0.03em] transition-colors',
                    isActive(item.href) ? 'text-gold-light' : 'text-white active:text-white/70',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link href={quoteHref} onClick={(e) => { setOpen(false); goToQuote(e) }} className="btn-gold w-full">
              Få et uforpligtende tilbud
            </Link>
            <a href={`tel:${SITE.phoneHref}`} className="btn-outline-white w-full">
              <Phone size={16} aria-hidden /> Ring {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
