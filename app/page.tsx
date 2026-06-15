import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { FeaturedProject } from '@/components/sections/FeaturedProject'
import { AboutSnippet } from '@/components/sections/AboutSnippet'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FAQSection } from '@/components/sections/FAQSection'
import { QuoteCTA } from '@/components/sections/QuoteCTA'
import { SITE } from '@/lib/site'
import { FAQ_HOME } from '@/lib/faq'

export const metadata: Metadata = {
  title: { absolute: `Tømrermester i ${SITE.location} – Svendebrev & 24 timers svar` },
  description: `Verificeret tømrermester med svendebrev i ${SITE.location}. Nybyg, renovering, tag, vinduer & terrasser i hele Storkøbenhavn. Gratis tilbud – svar inden 24 timer.`,
  alternates: { canonical: '/' },
  openGraph: {
    url: 'https://hlchristiansen.dk/',
    title: `${SITE.name} — Tømrermester i ${SITE.location}`,
    description: `Verificeret tømrermester med svendebrev i ${SITE.location} & Storkøbenhavn. Nybyg, renovering, tag, vinduer, facader og terrasser.`,
  },
}

export default function Home() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_HOME.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <ScrollProgress />
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <FeaturedProject />
      <AboutSnippet />
      <ProcessSteps />
      <FAQSection />
      <QuoteCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  )
}
