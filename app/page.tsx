import type { Metadata } from 'next'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { FeaturedProject } from '@/components/sections/FeaturedProject'
import { AboutSnippet } from '@/components/sections/AboutSnippet'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { QuoteCTA } from '@/components/sections/QuoteCTA'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: `Tømrermester i ${SITE.location} & Storkøbenhavn — Svendebrev & 24-timers svar`,
  description: `Tømrerfirmaet H L Christiansen er en verificeret tømrermester med svendebrev i ${SITE.location}. Vi udfører nybyg, renovering, tag, vinduer, facader og terrasser i hele Storkøbenhavn. Få et uforpligtende tilbud — svar inden for 24 timer.`,
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hvor hurtigt vender I tilbage på en forespørgsel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vi svarer alle henvendelser inden for 24 timer på hverdage — som regel hurtigere. Du kan ringe direkte på 93 98 27 30 eller skrive via vores kontaktformular.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hvilke områder dækker I?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vi har base i Herlev og dækker hele Storkøbenhavn — bl.a. Ballerup, Gladsaxe, København, Frederiksberg, Rødovre, Glostrup og Lyngby.',
        },
      },
      {
        '@type': 'Question',
        name: 'Har I svendebrev?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Tømrerfirmaet H L Christiansen er drevet af Jonatan Hintze Ladewig Christiansen — uddannet tømrer med svendebrev. Vi fremlægger gerne dokumentation ved første møde.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hvilke ydelser tilbyder I?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vi udfører seks fagområder: nybyg & tilbygninger, renovering & ombygning, tag & kviste, vinduer & døre, facader & beklædning samt terrasser & udendørs anlæg.',
        },
      },
      {
        '@type': 'Question',
        name: 'Er tilbud uforpligtende?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Tilbud er gratis og helt uforpligtende. Vi kommer ud, måler op og leverer et klart tilbud uden skjulte poster.',
        },
      },
      {
        '@type': 'Question',
        name: 'Er I CVR-registreret og forsikret?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Ja — Tømrerfirmaet H L Christiansen er CVR-registreret (CVR ${SITE.cvr}), ansvarsforsikret og arbejdsgiver-registreret.`,
        },
      },
    ],
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
      <QuoteCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  )
}
