'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE } from '@/lib/site'

const NAV = [
  { href: '/', label: 'Forside' },
  { href: '/om-os', label: 'Om os' },
  { href: '/ydelser', label: 'Ydelser' },
  { href: '/projekter', label: 'Projekter' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setScrolled(false)
  }, [pathname])

  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        solid
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-mid shadow-soft'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="container-content flex items-center justify-between h-[72px] md:h-[84px]">
        <Link href="/" className="flex items-center">
          {/* Logo content bounds in 1024px canvas: x=75–919, y=296–646 (measured via canvas) */}
          <div className="relative overflow-hidden" style={{ width: 148, height: 60 }}>
            <Image
              src="/images/logo/logo-trans.png"
              alt="H.L. Christiansen Tømrerfirma"
              width={1024}
              height={1024}
              className={cn('absolute transition-all duration-300', solid && 'brightness-0')}
              style={{ width: 176, height: 176, top: -51, left: -13 }}
              priority
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'label-caps transition-colors relative pl-3',
                  solid ? 'text-dark hover:text-gold' : 'text-white hover:text-gold-light',
                )}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-gold"
                  />
                )}
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${SITE.phoneHref}`}
            className={cn(
              'flex items-center gap-2 label-caps transition-colors',
              solid ? 'text-dark hover:text-gold' : 'text-white hover:text-gold-light',
            )}
          >
            <Phone size={14} />
            {SITE.phone}
          </a>
          <Link
            href="/kontakt"
            className={solid ? 'btn-outline' : 'btn-outline-white'}
          >
            Få et tilbud
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={open}
          className={cn(
            'lg:hidden p-2 -mr-2 transition-colors',
            solid ? 'text-dark' : 'text-white',
          )}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden bg-white border-t border-gray-mid transition-[max-height,opacity] duration-500',
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="container-content py-6 flex flex-col gap-5">
          {NAV.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'label-caps py-1 relative pl-4',
                  active ? 'text-gold' : 'text-dark',
                )}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-gold"
                  />
                )}
                {item.label}
              </Link>
            )
          })}
          <div className="pt-4 border-t border-gray-mid flex flex-col gap-4">
            <a
              href={`tel:${SITE.phoneHref}`}
              className="flex items-center gap-2 label-caps text-dark"
            >
              <Phone size={14} />
              {SITE.phone}
            </a>
            <Link href="/kontakt" className="btn-outline w-fit">
              Få et tilbud
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
