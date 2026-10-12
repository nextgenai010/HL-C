import { defaultOpenGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Paperclip } from 'lucide-react'
import { QuoteForm } from '@/components/ui/QuoteForm'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Kontakt – Få et gratis tilbud på tømrerarbejde',
  description: `Ring ${SITE.phone} eller skriv til tømrermester H L Christiansen i ${SITE.location}. Gratis og uforpligtende tilbud — svar inden for 24 timer.`,
  alternates: { canonical: '/kontakt' },
  openGraph: {
    ...defaultOpenGraph,
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

      <section className="bg-dark pb-20 pt-28 text-white md:pb-28 md:pt-40">
        <div className="container-content grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="rise eyebrow !text-gold-light" style={delay(0.05)}>Kontakt</p>
            <h1
              className="rise-move mt-3 font-display text-[2.75rem] font-semibold leading-[1.02] sm:text-[3.5rem] lg:text-[4.25rem]"
              style={delay(0.12)}
            >
              Fortæl om <span className="text-gold-light">dit projekt.</span>
            </h1>
            <p className="rise lead mt-6 max-w-md text-white/70" style={delay(0.2)}>
              Du behøver ikke have alle detaljer på plads. Skriv hvad du ved, så tager vi den videre snak på
              telefonen.
            </p>

            <ul className="rise mt-10 space-y-5" style={delay(0.28)}>
              <ContactItem icon={<Phone size={18} aria-hidden />} label="Telefon">
                <a href={`tel:${SITE.phoneHref}`} className="transition-colors hover:text-gold-light">{SITE.phone}</a>
              </ContactItem>
              <ContactItem icon={<Mail size={18} aria-hidden />} label="Email">
                <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-gold-light">{SITE.email}</a>
              </ContactItem>
              <ContactItem icon={<MapPin size={18} aria-hidden />} label="Adresse">
                {SITE.address.zip} {SITE.location}
              </ContactItem>
              <ContactItem icon={<Clock size={18} aria-hidden />} label="Åbningstider">
                <span className="block">{SITE.hours.weekday}</span>
                <span className="block text-white/60">{SITE.hours.weekend}</span>
              </ContactItem>
            </ul>

            <div className="rise mt-10 grid grid-cols-2 gap-3" style={delay(0.34)}>
              <div className="rounded-[18px] bg-white/[0.06] p-5">
                <p className="text-[13px] text-white/50">Svartid</p>
                <p className="mt-1 text-[15px] leading-snug text-white/85">
                  Inden for 24 timer på hverdage — som regel hurtigere.
                </p>
              </div>
              <div className="rounded-[18px] bg-white/[0.06] p-5">
                <p className="text-[13px] text-white/50">CVR</p>
                <p className="mt-1 font-display text-[19px] font-semibold tracking-[-0.02em]">{SITE.cvr}</p>
              </div>
            </div>
          </div>

          <div id="tilbud" className="rise scroll-mt-24 lg:col-span-7" style={delay(0.2)}>
            <QuoteForm
              idPrefix="contact"
              title="Send en besked"
              intro="Vi svarer inden for 24 timer på hverdage."
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="kom-i-gang-heading" className="bg-gray-light py-24 md:py-36">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Sådan kommer du i gang</p>
            <h2 id="kom-i-gang-heading" className="section-title mt-3">
              Fire skridt. <span className="text-dark/55">Ingen overraskelser.</span>
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-dark/65">
              Vi gør det så enkelt som muligt at få en pris. Ingen formularer du skal udfylde fra A til Z, før vi
              taler sammen — bare det vigtigste, og så vender vi tilbage.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.nr} delay={i * 0.07} className="card flex flex-col bg-white p-7">
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-dark font-display text-[17px] font-semibold text-gold-light">
                  {i + 1}
                </span>
                <h3 className="mt-8 font-display text-[22px] font-semibold leading-tight tracking-[-0.025em]">
                  <span className="sr-only">Trin {i + 1}: </span>{s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-dark/65">{s.desc}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="mt-10 flex max-w-3xl gap-4 rounded-[18px] bg-white p-6 md:mt-12 md:p-7">
              <Paperclip size={20} aria-hidden className="mt-0.5 shrink-0 text-gold" />
              <div>
                <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em]">Hvad du selv kan gøre klar</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-dark/65">
                  Du kan vedhæfte billeder af opgaven, skitser eller PDF&apos;er direkte i formularen — det gør den
                  første snak hurtigere. Men det er ikke et krav. Vi finder ud af det sammen.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const delay = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties

function ContactItem({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-gold-light">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[13px] text-white/50">{label}</p>
        <div className="text-[16px] text-white/90">{children}</div>
      </div>
    </li>
  )
}
