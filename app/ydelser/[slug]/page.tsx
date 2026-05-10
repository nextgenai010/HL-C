import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { YDELSER } from '@/lib/services'
import { SITE } from '@/lib/site'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { Reveal } from '@/components/ui/Reveal'
import { CTA } from '@/components/sections/CTA'
import { PageHero } from '@/components/sections/PageHero'

type Params = { slug: string }

export function generateStaticParams() {
  return YDELSER.map((y) => ({ slug: y.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const y = YDELSER.find((y) => y.slug === params.slug)
  if (!y) return {}
  const title = `${y.title} — Tømrermester i ${SITE.location} & Storkøbenhavn`
  const description = `${y.short} Udført af verificeret tømrermester med svendebrev — i ${SITE.location} og hele Storkøbenhavn.`
  const url = `https://hlchristiansen.dk/ydelser/${y.slug}`
  return {
    title,
    description,
    alternates: { canonical: `/ydelser/${y.slug}` },
    openGraph: {
      url,
      title,
      description,
      images: [
        {
          url: y.image,
          width: y.imageWidth,
          height: y.imageHeight,
          alt: y.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [y.image],
    },
  }
}

const PROCESS = [
  { nr: '01', label: 'Besøg & opmåling' },
  { nr: '02', label: 'Tilbud & tidsplan' },
  { nr: '03', label: 'Udførelse' },
  { nr: '04', label: 'Aflevering & garanti' },
]

export default function YdelseSide({ params }: { params: Params }) {
  const y = YDELSER.find((y) => y.slug === params.slug)
  if (!y) notFound()

  const nextIdx = (YDELSER.findIndex((x) => x.slug === y.slug) + 1) % YDELSER.length
  const next = YDELSER[nextIdx]

  const url = `https://hlchristiansen.dk/ydelser/${y.slug}`

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: y.title,
    serviceType: y.title,
    description: y.intro,
    url,
    image: `https://hlchristiansen.dk${y.image}`,
    provider: { '@id': 'https://hlchristiansen.dk/#business' },
    areaServed: [
      { '@type': 'City', name: 'Herlev' },
      { '@type': 'City', name: 'Ballerup' },
      { '@type': 'City', name: 'Gladsaxe' },
      { '@type': 'City', name: 'København' },
      { '@type': 'AdministrativeArea', name: 'Storkøbenhavn' },
    ],
    audience: { '@type': 'Audience', audienceType: 'Private og erhverv' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: y.title,
      itemListElement: y.bullets.map((b) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: b },
      })),
    },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://hlchristiansen.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Ydelser', item: 'https://hlchristiansen.dk/ydelser' },
      { '@type': 'ListItem', position: 3, name: y.title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageHero eyebrow={`Ydelse · ${y.title}`} title={y.title} description={y.intro} />

      <section className="bg-white py-20 md:py-28">
        <div className="container-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[16/10] bg-gray-light overflow-hidden">
                <Image
                  src={y.image}
                  alt={`${y.title} udført af tømrermester H L Christiansen`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="label-caps text-gold mb-4">Hvad vi laver</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Opgaver inden for <span className="italic">{y.title}</span>
            </h2>
            <GoldDivider className="mt-6" />
            <ul className="mt-8 space-y-3 text-dark/80">
              {y.bullets.map((b) => (
                <li key={b} className="gold-star leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-gray-light py-20 md:py-28">
        <div className="container-content">
          <Reveal className="max-w-xl">
            <p className="label-caps text-gold mb-4">Proces</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05]">
              Fire trin. <span className="italic">Klar rytme.</span>
            </h2>
            <GoldDivider className="mt-6" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <Reveal key={p.nr} delay={i * 0.1}>
                <div className="border-t border-gold pt-5">
                  <p className="label-caps text-gold">{p.nr}</p>
                  <p className="mt-2 font-display text-2xl">{p.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 border-b border-gray-mid">
        <div className="container-content flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="label-caps text-gold mb-2">Næste ydelse</p>
            <h3 className="font-display text-3xl md:text-4xl">
              {next.title}
            </h3>
          </div>
          <Link
            href={`/ydelser/${next.slug}`}
            className="inline-flex items-center gap-2 label-caps text-dark group"
          >
            <span className="link-underline">Udforsk</span>
            <ArrowUpRight
              size={16}
              className="text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>

      <CTA />
    </>
  )
}
