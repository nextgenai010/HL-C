import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { Reveal } from '@/components/ui/Reveal'
import { CTA } from '@/components/sections/CTA'
import { FAQ_CATEGORIES, FAQ_ALL } from '@/lib/faq'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Ofte stillede spørgsmål — Tømrermester H L Christiansen',
  description:
    'Svar på de oftest stillede spørgsmål om tilbud, proces, pris, garanti, områder og praktisk i forbindelse med tømrerarbejde i Herlev og Storkøbenhavn.',
  alternates: { canonical: '/ofte-stillede-spoergsmaal' },
  openGraph: {
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

      {/* Quick category nav */}
      <section className="bg-white border-b border-gray-mid">
        <div className="container-content py-6 md:py-8">
          <nav aria-label="Kategorier" className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            <span className="label-caps text-dark/40">Spring til</span>
            {FAQ_CATEGORIES.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="label-caps text-dark hover:text-gold transition-colors link-underline"
              >
                {String(i + 1).padStart(2, '0')} · {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* FAQ categories */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-content max-w-4xl">
          {FAQ_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              id={cat.id}
              className={idx > 0 ? 'mt-20 md:mt-28 pt-16 md:pt-20 border-t border-gray-mid scroll-mt-28' : 'scroll-mt-28'}
            >
              <Reveal>
                <p className="label-caps text-gold mb-4">
                  Del {String(idx + 1).padStart(2, '0')}
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.05]">
                  {cat.title}
                </h2>
                <GoldDivider className="mt-5" />
                {cat.intro && (
                  <p className="mt-5 text-dark/60 leading-relaxed max-w-2xl">{cat.intro}</p>
                )}
              </Reveal>

              <div className="mt-10">
                <FAQAccordion items={cat.items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still got questions */}
      <section className="bg-gray-light py-16 md:py-24 border-t border-gray-mid">
        <div className="container-content max-w-3xl text-center">
          <Reveal>
            <p className="label-caps text-gold mb-4">✦ Fandt du ikke svar?</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05]">
              Ring eller skriv —<br />
              <span className="italic">vi tager den derfra.</span>
            </h2>
            <p className="mt-6 text-dark/65 leading-relaxed max-w-xl mx-auto">
              Ingen spørgsmål er for små. Du kan ringe direkte til Jonatan på telefonen
              eller sende en kort besked — vi vender tilbage inden for 24 timer.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={`tel:${SITE.phoneHref}`} className="btn-outline">
                Ring {SITE.phone}
              </a>
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2 label-caps text-dark"
              >
                <span className="link-underline">Send en besked</span>
                <ArrowUpRight
                  size={14}
                  className="text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  )
}
