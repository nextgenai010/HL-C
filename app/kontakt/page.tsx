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

const STEPS = [
  {
    nr: '01',
    title: 'Du skriver eller ringer',
    desc: 'Fortæl kort om opgaven — fx hvad du gerne vil have lavet, hvor du bor, og om der er en tidsramme. Bare det vigtigste til at starte med.',
  },
  {
    nr: '02',
    title: 'Vi vender tilbage',
    desc: 'Inden for 24 timer på hverdage kontakter vi dig — som regel på telefonen. Vi stiller de spørgsmål, der skal til, og aftaler et besøg, hvis det giver mening.',
  },
  {
    nr: '03',
    title: 'Besøg og opmåling',
    desc: 'Vi kommer ud at se på opgaven, måler op og snakker materialer og muligheder. Det er gratis og uforpligtende — du beslutter selv, om vi går videre.',
  },
  {
    nr: '04',
    title: 'Skriftligt tilbud',
    desc: 'Du modtager et tilbud med klare poster og en tidsplan. Du har god tid til at læse det igennem og stille spørgsmål, før du beslutter dig.',
  },
]

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }} />

      <section className="bg-dark pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-16">
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

            <div className="mt-6 border border-gold/30 bg-white/5 p-4">
              <p className="label-caps text-gold">✦ Svartid</p>
              <p className="mt-1 font-body text-sm text-white/75 leading-relaxed">
                Vi svarer alle henvendelser inden for 24 timer på hverdage —
                som regel hurtigere.
              </p>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="label-caps text-gold mb-4">Send en besked</p>
            <h2 className="font-display text-2xl md:text-3xl leading-tight text-white">
              Fortæl om <span className="italic">dit projekt</span>
            </h2>
            <GoldDivider className="mt-4" />
            <p className="mt-4 text-white/65 text-sm leading-relaxed max-w-xl">
              Du behøver ikke have alle detaljer på plads. Skriv hvad du ved, så tager
              vi den videre snak på telefonen.
            </p>
            <div className="mt-6">
              <ContactForm dark />
            </div>
          </Reveal>

        </div>
      </section>

      {/* Sådan kommer du i gang */}
      <section className="bg-gray-light py-16 md:py-24 border-t border-gray-mid">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="label-caps text-gold mb-4">✦ Sådan kommer du i gang</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
              Fire skridt.<br />
              <span className="italic">Ingen overraskelser.</span>
            </h2>
            <GoldDivider className="mt-6" />
            <p className="mt-6 text-dark/65 leading-relaxed">
              Vi gør det så enkelt som muligt at få en pris. Ingen formularer du skal
              udfylde fra A til Z, før vi taler sammen — bare det vigtigste, og så
              vender vi tilbage.
            </p>
          </Reveal>

          <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.nr} delay={i * 0.08}>
                <div className="border-t border-gold pt-5 h-full">
                  <p className="label-caps text-gold">Trin {s.nr}</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-4 text-dark/65 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-12 md:mt-16 border-l-2 border-gold pl-6 max-w-2xl">
              <p className="label-caps text-gold mb-2">Hvad du selv kan gøre klar</p>
              <p className="text-dark/70 leading-relaxed text-sm">
                Hvis du har billeder af opgaven, mål eller skitser, må du meget gerne
                sende dem med. Det gør den første snak hurtigere — men det er ikke et
                krav. Vi finder ud af det sammen.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
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
