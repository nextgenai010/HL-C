import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { ContactForm } from '@/components/ui/ContactForm'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kontakt — Få et tilbud fra tømrermester H L Christiansen',
  description: `Få fat i Tømrerfirmaet H L Christiansen i ${SITE.location}. Ring ${SITE.phone} eller skriv til ${SITE.email} — vi svarer inden for 24 timer. Gratis og uforpligtende tilbud.`,
  alternates: { canonical: '/kontakt' },
  openGraph: {
    url: 'https://hlchristiansen.dk/kontakt',
    title: 'Kontakt — Tømrermester H L Christiansen',
    description: `Ring ${SITE.phone} eller skriv. Vi svarer inden for 24 timer på hverdage.`,
  },
}

export default function KontaktSide() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://hlchristiansen.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Kontakt', item: 'https://hlchristiansen.dk/kontakt' },
    ],
  }
  const contactLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Kontakt ${SITE.name}`,
    url: 'https://hlchristiansen.dk/kontakt',
    mainEntity: { '@id': 'https://hlchristiansen.dk/#business' },
  }
  return (
    <section className="bg-dark min-h-screen pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }} />
      <div className="container-content grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-8 lg:gap-12">

        {/* Left — contact info */}
        <Reveal className="lg:col-span-5">
          <p className="label-caps text-gold mb-4">Direkte kontakt</p>
          <h2 className="font-display text-2xl md:text-3xl leading-tight text-white">
            Find os her
          </h2>
          <GoldDivider className="mt-4" />

          <ul className="mt-6 space-y-4">
            <ContactItem icon={<Phone size={18} />} label="Telefon">
              <a href={`tel:${SITE.phoneHref}`} className="text-white/80 hover:text-gold-light transition-colors">
                {SITE.phone}
              </a>
            </ContactItem>
            <ContactItem icon={<Mail size={18} />} label="Email">
              <a href={`mailto:${SITE.email}`} className="text-white/80 hover:text-gold-light transition-colors">
                {SITE.email}
              </a>
            </ContactItem>
            <ContactItem icon={<MapPin size={18} />} label="Adresse">
              {SITE.location}, {SITE.address.zip}
            </ContactItem>
            <ContactItem icon={<Clock size={18} />} label="Åbningstider">
              <div className="space-y-1 text-white/70">
                <p>{SITE.hours.weekday}</p>
                <p>{SITE.hours.weekend}</p>
              </div>
            </ContactItem>
          </ul>

          <div className="mt-6 border border-gold/30 bg-white/5 p-4">
            <p className="label-caps text-gold">CVR</p>
            <p className="mt-1 font-body text-base text-white/80">{SITE.cvr}</p>
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal className="lg:col-span-7" delay={0.1}>
          <p className="label-caps text-gold mb-4">Send en besked</p>
          <h2 className="font-display text-2xl md:text-3xl leading-tight text-white">
            Fortæl om <span className="italic">dit projekt</span>
          </h2>
          <GoldDivider className="mt-4" />
          <div className="mt-6">
            <ContactForm dark />
          </div>
        </Reveal>

      </div>
    </section>
  )
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <li className="flex gap-5">
      <span className="flex items-center justify-center w-10 h-10 border border-gold text-gold shrink-0">
        {icon}
      </span>
      <div>
        <p className="label-caps text-white/40">{label}</p>
        <div className="mt-1 font-body text-base text-white/80">{children}</div>
      </div>
    </li>
  )
}
