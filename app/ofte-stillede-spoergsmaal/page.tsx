import { defaultOpenGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { Reveal } from '@/components/ui/Reveal'
import { CTA } from '@/components/sections/CTA'
import { FAQ_CATEGORIES, FAQ_ALL } from '@/lib/faq'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Ofte stillede spørgsmål om tømrerarbejde',
  description:
    'Svar på de oftest stillede spørgsmål om tilbud, proces, pris, garanti, områder og praktisk i forbindelse med tømrerarbejde i Herlev og Storkøbenhavn.',
  alternates: { canonical: '/ofte-stillede-spoergsmaal' },
  openGraph: {
    ...defaultOpenGraph,
    url: 'https://hlchristiansen.dk/ofte-stillede-spoergsmaal',
    title: 'Ofte stillede spørgsmål — Tømrermester H L Christiansen',
    description:
      'Tilbud, proces, pris, garanti, områder og praktisk — samlet ét sted. Tømrerarbejde i Herlev og hele Storkøbenhavn.',
  },
}

export default function FAQPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ALL.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://hlchristiansen.dk/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ofte stillede spørgsmål',
        item: 'https://hlchristiansen.dk/ofte-stillede-spoergsmaal',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageHero
        eyebrow="Ofte stillede spørgsmål"
        title="Spørgsmål.<br /><em>Klare svar.</em>"
        description="Vi har samlet de spørgsmål, vi oftest får — om tilbud, pris, proces, garanti og områder. Finder du ikke svar her, så ring eller skriv. Vi vender tilbage inden for 24 timer."
      />

      <nav aria-label="Kategorier" className="sticky top-[64px] z-30 border-b border-gray-mid bg-white/85 backdrop-blur-xl md:top-[72px]">
        <ul className="rail !grid-flow-col !auto-cols-max gap-2 py-3 md:!flex md:flex-wrap md:justify-center">
          {FAQ_CATEGORIES.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-flex min-h-[38px] items-center rounded-full bg-gray-light px-4 text-[14px] font-semibold text-dark/75 transition-colors hover:bg-gray-mid hover:text-dark"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="bg-white py-20 md:py-28">
        <div className="container-content max-w-4xl">
          {FAQ_CATEGORIES.map((cat, idx) => (
            <div key={cat.id} id={cat.id} className={idx > 0 ? 'mt-20 scroll-mt-36 md:mt-28' : 'scroll-mt-36'}>
              <Reveal>
                <h2 className="font-display text-[32px] font-semibold leading-tight tracking-[-0.03em] md:text-[44px]">
                  {cat.title}
                </h2>
                {cat.intro && <p className="mt-4 max-w-2xl leading-relaxed text-dark/65">{cat.intro}</p>}
              </Reveal>
              <div className="mt-8">
                <FAQAccordion items={cat.items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-light py-24 md:py-32">
        <Reveal className="container-content max-w-3xl text-center">
          <p className="eyebrow">Fandt du ikke svar?</p>
          <h2 className="section-title mt-3">
            Ring eller skriv — <span className="text-dark/55">vi tager den derfra.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-dark/65">
            Ingen spørgsmål er for små. Du kan ringe direkte til Jonatan på telefonen eller sende en kort besked
            — vi vender tilbage inden for 24 timer.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`tel:${SITE.phoneHref}`} className="btn-primary">Ring {SITE.phone}</a>
            <Link href="/kontakt" className="btn-outline">Send en besked</Link>
          </div>
        </Reveal>
      </section>

      <CTA />
    </>
  )
}
