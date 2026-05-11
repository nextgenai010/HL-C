import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { SITE } from '@/lib/site'
import { YDELSER } from '@/lib/services'
import { GoldDivider } from '@/components/ui/GoldDivider'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-dark text-white grain">
      <div className="container-content py-14 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 font-display text-2xl">
              <span aria-hidden className="text-gold">✦</span>
              <span>
                Tømrerfirmaet <span className="italic">H L Christiansen</span>
              </span>
            </div>
            <GoldDivider className="mt-6" />
            <p className="mt-6 font-display text-xl italic text-white/75 max-w-md leading-relaxed">
              Verificeret tømrermester med svendebrev.
              <br />
              Håndværk med omhu i {SITE.location} og omegn.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label-caps text-gold mb-5">Ydelser</p>
            <ul className="space-y-3 text-sm text-white/80">
              {YDELSER.map((y) => (
                <li key={y.slug}>
                  <Link href={`/ydelser/${y.slug}`} className="link-underline hover:text-white">
                    {y.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label-caps text-gold mb-5">Kontakt</p>
            <ul className="space-y-4 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-gold shrink-0" />
                <a href={`tel:${SITE.phoneHref}`} className="link-underline">{SITE.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-gold shrink-0" />
                <a href={`mailto:${SITE.email}`} className="link-underline">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
                <span>{SITE.location}, {SITE.address.zip}</span>
              </li>
            </ul>
            <div className="mt-6 text-sm text-white/70 space-y-1">
              <p>{SITE.hours.weekday}</p>
              <p>{SITE.hours.weekend}</p>
            </div>
            <p className="mt-5 text-xs text-white/35 label-caps">CVR · {SITE.cvr}</p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50">
          <p>© {year} {SITE.name}. Alle rettigheder forbeholdes.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privatliv" className="text-white/50 hover:text-white/80 transition-colors">
              Privatlivspolitik
            </Link>
            <Link href="/cookies" className="text-white/50 hover:text-white/80 transition-colors">
              Cookiepolitik
            </Link>
            <a
              href="https://nextgen-ai.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/50 transition-colors duration-300"
            >
              Designet af NextgenAI
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
