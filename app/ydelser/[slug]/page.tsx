import { defaultOpenGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ChevronRight, Phone } from 'lucide-react'
import { YDELSER } from '@/lib/services'
import { PROJEKTER } from '@/lib/projects'
import { SITE } from '@/lib/site'
import { Reveal } from '@/components/ui/Reveal'
import { RichText, plainText } from '@/components/ui/RichText'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
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
  const title = y.seoTitle
  const description = y.seoDescription
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
  { nr: '01', label: 'Besøg & opmåling', text: 'Vi ser opgaven på stedet, måler op og taler løsninger og materialer igennem.' },
  { nr: '02', label: 'Tilbud & tidsplan', text: 'Du får et skriftligt tilbud med klare poster og en realistisk tidsplan.' },
  { nr: '03', label: 'Udførelse', text: 'Vi arbejder rent, holder dig opdateret og rydder op efter os hver dag.' },
  { nr: '04', label: 'Aflevering & garanti', text: 'Vi gennemgår arbejdet sammen med dig, før vi afleverer.' },
]

const OMRAADER = ['Herlev', 'Ballerup', 'Gladsaxe', 'Søborg', 'Bagsværd', 'Lyngby', 'Rødovre', 'Glostrup', 'Værløse', 'Vanløse', 'Frederiksberg', 'København']

export default async function YdelseSide({ params }: { params: Params }) {
  const { slug } = await params
  const y = YDELSER.find((y) => y.slug === slug)
  if (!y) notFound()

  const related = y.related
    .map((s) => YDELSER.find((x) => x.slug === s))
    .filter((x): x is (typeof YDELSER)[number] => Boolean(x))
  const projekter = PROJEKTER.filter((p) => p.kategori === y.slug).slice(0, 3)

  const url = `https://hlchristiansen.dk/ydelser/${y.slug}`

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: y.title,
    serviceType: y.title,
    description: y.seoDescription,
    url,
    image: `https://hlchristiansen.dk${y.image}`,
    provider: { '@id': 'https://hlchristiansen.dk/#business' },
    areaServed: [
      ...OMRAADER.map((name) => ({ '@type': 'City', name })),
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
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: y.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHero eyebrow={y.title} title={y.heading} description={y.intro} image={y.image} imageAlt={y.imageAlt}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/kontakt" className="btn-gold">Få et gratis tilbud</Link>
          <a href={`tel:${SITE.phoneHref}`} className="btn-outline-white">
            <Phone size={16} aria-hidden /> {SITE.phone}
          </a>
        </div>
      </PageHero>

      <nav aria-label="Brødkrumme" className="border-b border-dark/10 bg-white">
        <ol className="container-content flex flex-wrap items-center gap-1.5 py-4 text-[14px] text-dark/60">
          <li><Link href="/" className="hover:text-dark">Forside</Link></li>
          <li aria-hidden><ChevronRight size={14} /></li>
          <li><Link href="/ydelser" className="hover:text-dark">Ydelser</Link></li>
          <li aria-hidden><ChevronRight size={14} /></li>
          <li aria-current="page" className="font-medium text-dark">{y.title}</li>
        </ol>
      </nav>

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

      <section className="bg-white pb-24 md:pb-32">
        <div className="container-content grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="space-y-14 md:space-y-16 lg:col-span-8">
            {y.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[36px]">{s.heading}</h2>
                <div className="mt-5 space-y-4 text-[17px] leading-[1.7] text-dark/75 md:text-[18px]">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}><RichText text={p} /></p>
                  ))}
                </div>
              </Reveal>
            ))}
          </article>

          <aside className="lg:col-span-4">
            <div className="card sticky top-28 bg-gray-light p-7 md:p-8">
              <h2 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.025em]">Hvad påvirker prisen?</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-dark/75">
                {y.priceFactors.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check size={16} strokeWidth={2.75} aria-hidden className="mt-1 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-relaxed text-dark/75">
                Du får altid et skriftligt tilbud, inden vi starter — gratis og uforpligtende.
              </p>
              <Link href="/kontakt" className="btn-gold mt-6 w-full justify-center">Få et tilbud</Link>
              <a href={`tel:${SITE.phoneHref}`} className="mt-4 flex items-center justify-center gap-2 text-[15px] font-semibold text-dark">
                <Phone size={15} aria-hidden /> {SITE.phone}
              </a>
            </div>
          </aside>
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
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 md:gap-5">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.nr} delay={i * 0.07} className="card bg-white p-6 md:p-7">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-dark font-display text-[15px] font-semibold text-gold-light">
                  {i + 1}
                </span>
                <p className="mt-6 font-display text-[20px] font-semibold leading-tight tracking-[-0.025em] md:text-[22px]">{p.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-dark/65">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {projekter.length > 0 && (
        <section className="bg-white py-24 md:py-32">
          <div className="container-content">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Fra vores arbejde</p>
                <h2 className="section-title mt-3">
                  Udvalgte <span className="text-dark/55">projekter.</span>
                </h2>
              </div>
              <Link href="/projekter" className="link-more">
                <span>Se alle projekter</span>
                <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
              </Link>
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
              {projekter.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 0.07}>
                  <Link href="/projekter" className="group card block bg-gray-light">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="zoom-img object-cover" />
                    </div>
                    <p className="p-5 font-display text-[18px] font-semibold tracking-[-0.02em]">{p.title}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="ydelse-faq" className={projekter.length > 0 ? 'bg-gray-light py-24 md:py-32' : 'bg-white py-24 md:py-32'}>
        <div className="container-content grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Spørgsmål & svar</p>
            <h2 id="ydelse-faq" className="section-title mt-3">
              Ofte stillede <span className="text-dark/55">spørgsmål.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-dark/65">
              Svar på det, vi oftest bliver spurgt om inden for {y.title.toLowerCase()}. Find flere svar om tilbud,
              pris og garanti på siden med <Link href="/ofte-stillede-spoergsmaal" className="font-medium text-dark underline decoration-gold/60 underline-offset-[3px]">ofte stillede spørgsmål</Link>.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <FAQAccordion items={y.faq} defaultOpen={0} />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Område</p>
            <h2 className="section-title mt-3">
              Tømrer i Herlev <span className="text-dark/55">og hele Storkøbenhavn.</span>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-dark/75 md:text-[18px]">
              Vi har base i Herlev og udfører {y.title.toLowerCase()} for private, ejerforeninger, andelsboligforeninger
              og mindre erhverv i hele Storkøbenhavn. Bor du lige uden for området, så <Link href="/kontakt" className="font-medium text-dark underline decoration-gold/60 underline-offset-[3px]">kontakt os</Link> — vi tager gerne en snak. Læs mere <Link href="/om-os" className="font-medium text-dark underline decoration-gold/60 underline-offset-[3px]">om os og tømrermester Jonatan</Link>.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {OMRAADER.map((o) => (
                <li key={o} className="rounded-full bg-gray-light px-4 py-2 text-[14px] font-medium text-dark/75">{o}</li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-20">
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.025em] md:text-[28px]">Relaterede ydelser</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/ydelser/${r.slug}`} className="group card flex h-full items-center gap-4 bg-gray-light p-3 pr-5 transition-colors hover:bg-gray-mid">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[12px]">
                      <Image src={r.image} alt="" fill sizes="96px" className="zoom-img object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[19px] font-semibold leading-tight tracking-[-0.02em]">{r.title}</p>
                      <p className="mt-1 line-clamp-2 text-[14px] text-dark/60">{r.short}</p>
                    </div>
                    <ChevronRight size={20} aria-hidden className="shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/ydelser" className="link-more mt-8">
              <span>Se alle ydelser</span>
              <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
