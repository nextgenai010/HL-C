import { defaultOpenGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ChevronRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { CTA } from '@/components/sections/CTA'
import { Reveal } from '@/components/ui/Reveal'
import { YDELSER } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Ydelser – Tømrerarbejde i Herlev & Storkøbenhavn',
  description:
    'Nybyg, renovering, tag, vinduer & døre, facader og terrasser i Herlev og Storkøbenhavn. Udført af verificeret tømrermester med svendebrev.',
  alternates: { canonical: '/ydelser' },
  openGraph: {
    ...defaultOpenGraph,
    url: 'https://hlchristiansen.dk/ydelser',
    title: 'Ydelser — Tømrermester H L Christiansen',
    description:
      'Seks fagområder samlet ét sted: nybyg, renovering, tag, vinduer & døre, facader og terrasser. Verificeret tømrermester med svendebrev.',
  },
}

export default function YdelserOversigt() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://hlchristiansen.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Ydelser', item: 'https://hlchristiansen.dk/ydelser' },
    ],
  }
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tømrer-ydelser',
    itemListElement: YDELSER.map((y, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://hlchristiansen.dk/ydelser/${y.slug}`,
      name: y.title,
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <PageHero
        eyebrow="Ydelser"
        title="Seks fagområder.<br /><em>Samme håndværk.</em>"
        description="Vi tager os af hele spektret fra nybyg til tag, facader og terrasser. Hvert område har sin egen disciplin, men udgangspunktet er det samme: rent arbejde, tætte samlinger og et hold der forstår at bygge med tid."
      />

      <section className="bg-white py-20 md:py-32">
        <div className="container-content space-y-5 md:space-y-6">
          {YDELSER.map((y, i) => (
            <Reveal key={y.slug}>
              <Link
                href={`/ydelser/${y.slug}`}
                className="group card grid bg-gray-light transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(35,36,38,0.35)] md:grid-cols-2"
              >
                <div className={`relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[400px] ${i % 2 ? 'md:order-2' : ''}`}>
                  <Image
                    src={y.image}
                    alt={y.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="zoom-img object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.03em] md:text-[40px]">
                    {y.title}
                  </h2>
                  <p className="mt-3 text-[17px] leading-relaxed text-dark/65">{y.short}</p>
                  <ul className="mt-6 space-y-2 text-[15px] text-dark/75">
                    {y.bullets.slice(0, 4).map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check size={16} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="link-more mt-8">
                    <span>Læs om {y.title.toLowerCase()}</span>
                    <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  )
}
