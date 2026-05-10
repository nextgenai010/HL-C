import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { CTA } from '@/components/sections/CTA'
import { Reveal } from '@/components/ui/Reveal'
import { YDELSER } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Ydelser — Tømrerarbejde i Herlev & Storkøbenhavn',
  description:
    'Seks tømrer-fagområder i Storkøbenhavn: nybyg & tilbygninger, renovering, tag & kviste, vinduer & døre, facader og terrasser. Udført af verificeret tømrermester med svendebrev.',
  alternates: { canonical: '/ydelser' },
  openGraph: {
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
        title="Seks fagområder —<br /><em>samme håndværk.</em>"
        description="Vi tager os af hele spektret fra nybyg til tag, facader og terrasser. Hvert område har sin egen disciplin, men udgangspunktet er det samme: rent arbejde, tætte samlinger og et hold der forstår at bygge med tid."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-content space-y-8">
          {YDELSER.map((y, i) => (
            <Reveal key={y.slug} delay={i * 0.05}>
              <Link
                href={`/ydelser/${y.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 border border-gray-mid hover:border-gold transition-colors duration-500 relative overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-[2px] w-0 bg-gold transition-[width] duration-500 group-hover:w-full z-10"
                />
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[320px] bg-gray-light overflow-hidden">
                  <Image
                    src={y.image}
                    alt={y.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                  <p className="label-caps text-gold mb-3">
                    Ydelse {String(i + 1).padStart(2, '0')}
                  </p>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-3xl md:text-4xl leading-tight">
                      {y.title}
                    </h2>
                    <ArrowUpRight
                      size={26}
                      className="text-dark/40 group-hover:text-gold transition-colors mt-1 shrink-0"
                    />
                  </div>
                  <p className="mt-4 text-dark/70 leading-relaxed max-w-xl">{y.short}</p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-dark/75 max-w-xl">
                    {y.bullets.slice(0, 4).map((b) => (
                      <li key={b} className="gold-star">
                        {b}
                      </li>
                    ))}
                  </ul>
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
