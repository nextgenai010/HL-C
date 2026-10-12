import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'
import { SITE } from '@/lib/site'
import { YDELSER } from '@/lib/services'

const INFO = [
  { href: '/om-os', label: 'Om firmaet' },
  { href: '/projekter', label: 'Vores projekter' },
  { href: '/ofte-stillede-spoergsmaal', label: 'Spørgsmål & svar' },
  { href: '/kontakt', label: 'Skriv til os' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const heading = 'text-[13px] font-semibold text-white/60'
  const link = 'text-[15px] text-white/75 transition-colors hover:text-white'

  return (
    <footer className="border-t border-white/10 bg-dark text-white">
      <div className="container-content py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label={`${SITE.name} — forside`} className="inline-block">
              <span className="relative block overflow-hidden" style={{ width: 148, height: 60 }}>
                <Image
                  src="/images/logo/logo-trans.png"
                  alt={SITE.name}
                  width={1024}
                  height={1024}
                  sizes="176px"
                  className="absolute max-w-none"
                  style={{ width: 176, height: 176, top: -51, left: -13 }}
                />
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/60">
              Verificeret tømrermester med svendebrev. Håndværk med omhu i {SITE.location} og omegn.
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 text-[15px] text-white/75 transition-colors hover:text-white"
            >
              <Instagram size={18} aria-hidden className="text-gold-light" />
              Følg os på Instagram
            </a>
          </div>

          <nav aria-label="Ydelser" className="md:col-span-3">
            <p className={heading}>Ydelser</p>
            <ul className="mt-4 space-y-2.5">
              {YDELSER.map((y) => (
                <li key={y.slug}><Link href={`/ydelser/${y.slug}`} className={link}>{y.title}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Information" className="md:col-span-2">
            <p className={heading}>Information</p>
            <ul className="mt-4 space-y-2.5">
              {INFO.map((i) => (
                <li key={i.href}><Link href={i.href} className={link}>{i.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className={heading}>Kontakt</p>
            <address className="mt-4 space-y-3 not-italic">
              <a href={`tel:${SITE.phoneHref}`} className={`flex items-center gap-3 ${link}`}>
                <Phone size={16} aria-hidden className="shrink-0 text-gold-light" /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className={`flex items-center gap-3 break-all ${link}`}>
                <Mail size={16} aria-hidden className="shrink-0 text-gold-light" /> {SITE.email}
              </a>
              <p className="flex items-center gap-3 text-[15px] text-white/75">
                <MapPin size={16} aria-hidden className="shrink-0 text-gold-light" /> {SITE.address.zip} {SITE.location}
              </p>
            </address>
            <div className="mt-6 space-y-1 text-[14px] text-white/65">
              <p>{SITE.hours.weekday}</p>
              <p>{SITE.hours.weekend}</p>
              <p className="pt-2 text-white/55">CVR {SITE.cvr}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} {SITE.name}. Alle rettigheder forbeholdes.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privatliv" className="transition-colors hover:text-white/80">Privatlivspolitik</Link>
            <Link href="/cookies" className="transition-colors hover:text-white/80">Cookiepolitik</Link>
            <a href="https://nextgen-ai.dk" target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-white/75">
              Designet af NextgenAI
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
