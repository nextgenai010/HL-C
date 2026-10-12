import { defaultOpenGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ChevronRight, Phone } from 'lucide-react'
import { YDELSER } from '@/lib/services'
import { SITE } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'
import { CTA } from '@/components/sections/CTA'
import { PageHero } from '@/components/sections/PageHero'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return YDELSER.map((y) => ({ slug: y.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const y = YDELSER.find((y) => y.slug === slug)
  if (!y) return {}
  const title = `${y.title} – Tømrer i ${SITE.location}`
  const description = `${y.short} Udført af verificeret tømrermester med svendebrev — i ${SITE.location} og hele Storkøbenhavn.`
  const url = `https://hlchristiansen.dk/ydelser/${y.slug}`
  return {
    title,
    description,
    alternates: { canonical: `/ydelser/${y.slug}` },
    openGraph: {
    ...defaultOpenGraph,
      url,
      title,
      description,
      images: [
        {
          url: y.image,
          width: y.imageWidth,
          height: y.imageHeight,
          alt: y.imageAlt,
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

export default async function YdelseSide({ params }: { params: Params }) {
  const { slug } = await params
  const y = YDELSER.find((y) => y.slug === slug)
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

      <PageHero eyebrow="Ydelse" title={y.title} description={y.intro} image={y.image} imageAlt={y.imageAlt}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/kontakt" className="btn-gold">Få et tilbud</Link>
          <a href={`tel:${SITE.phoneHref}`} className="btn-outline-white">
            <Phone size={16} aria-hidden /> {SITE.phone}
          </a>
        </div>
      </PageHero>

      <section className="bg-white py-24 md:py-32">
        <div className="container-content grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Hvad vi laver</p>
            <h2 className="section-title mt-3">
              Opgaver inden for <span className="text-dark/55">{y.title.toLowerCase()}.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <ul className="divide-y divide-dark/10 border-y border-dark/10">
              {y.bullets.map((b) => (
                <li key={b} className="flex items-center gap-4 py-5 text-[17px] md:text-[19px]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-light/15 text-gold">
                    <Check size={15} strokeWidth={2.75} aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-gray-light py-24 md:py-32">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Proces</p>
            <h2 className="section-title mt-3">
              Fire trin. <span className="text-dark/55">Klar rytme.</span>
            </h2>
          </Reveal>
          <ol className="mt-12 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-5">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.nr} delay={i * 0.07} className="card bg-white p-6 md:p-7">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-dark font-display text-[15px] font-semibold text-gold-light">
                  {i + 1}
                </span>
                <p className="mt-6 font-display text-[20px] font-semibold leading-tight tracking-[-0.025em] md:text-[22px]">{p.label}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-content">
          <Link href={`/ydelser/${next.slug}`} className="group card flex items-center gap-5 bg-gray-light p-4 pr-6 transition-colors hover:bg-gray-mid md:gap-8 md:p-5 md:pr-10">
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-[14px] md:h-32 md:w-48">
              <Image src={next.image} alt="" fill sizes="192px" className="zoom-img object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-dark/65">Næste ydelse</p>
              <p className="mt-1 font-display text-[24px] font-semibold leading-tight tracking-[-0.03em] md:text-[36px]">{next.title}</p>
            </div>
            <ChevronRight size={28} aria-hidden className="shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <CTA />
    </>
  )
}
