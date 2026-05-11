import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { SvendebrevBadge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { CTA } from '@/components/sections/CTA'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Om os — Tømrermester med svendebrev i Herlev',
  description: `Tømrerfirmaet H L Christiansen er drevet af tømrermester Jonatan Hintze Ladewig Christiansen i ${SITE.location}. Verificeret svendebrev, klare aftaler og håndværk uden skjulte poster.`,
  alternates: { canonical: '/om-os' },
  openGraph: {
    url: 'https://hlchristiansen.dk/om-os',
    title: 'Om Tømrerfirmaet H L Christiansen — Svendebrev & Håndværk',
    description: `Verificeret tømrermester med svendebrev i ${SITE.location} & Storkøbenhavn. Læs om firmaet, værdier og håndværk.`,
  },
}

const VAERDIER = [
  {
    title: 'Kvalitet',
    desc: 'Vi afleverer ikke, før det står rent. Samlinger er præcise, fuger tætte, og overfladen er til stede som den skal.',
  },
  {
    title: 'Ærlighed',
    desc: 'Klare tilbud, ingen skjulte poster. Hvis noget bliver dyrere eller tager længere tid, taler vi om det — ikke efter regning.',
  },
  {
    title: 'Håndværk',
    desc: 'Fag lært fra bunden, bygget videre hvert år. Svendebrev er fundamentet, men det er tiden bag værktøjet der tæller.',
  },
]

export default function OmOs() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://hlchristiansen.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Om os', item: 'https://hlchristiansen.dk/om-os' },
    ],
  }
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jonatan Hintze Ladewig Christiansen',
    jobTitle: 'Tømrermester',
    worksFor: { '@id': 'https://hlchristiansen.dk/#business' },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Svendebrev',
      name: 'Svendebrev som tømrer',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location,
      addressCountry: 'DK',
    },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <PageHero
        eyebrow="Om firmaet"
        title="En tømrer.<br /><em>Et svendebrev.</em><br />Et ord der holder."
        description={`Tømrerfirmaet H L Christiansen er drevet af Jonatan Hintze Ladewig Christiansen — uddannet tømrer med svendebrev og rod i ${SITE.location}. Vi påtager os både det store nybyg og den lille reparation, og tager samme ansvar uanset omfang.`}
      />

      <section className="bg-white py-14 sm:py-20 md:py-32">
        <div className="container-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] bg-gray-light overflow-hidden">
              <Image
                src="/images/kategorier/nybyg-tilbygninger.jpg"
                alt="Byggeplads — tømrerarbejde"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.1}>
            <p className="label-caps text-gold mb-4">Vores historie</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              Fag lært fra bunden — <span className="italic">bygget videre hver dag.</span>
            </h2>
            <GoldDivider className="mt-6" />
            <p className="mt-8 text-dark/75 leading-relaxed">
              Jonatan tog sit svendebrev som tømrer og har siden bygget Tømrerfirmaet
              H L Christiansen op omkring det enkle princip: hver opgave fortjener
              samme grad af opmærksomhed. Vi har vores rødder i {SITE.location} og
              dækker hele Storkøbenhavn.
            </p>
            <p className="mt-4 text-dark/75 leading-relaxed">
              I dag arbejder vi med alt fra nybyg og tilbygninger til tag, facader og
              mindre renoveringer — altid med udgangspunkt i godt håndværk og klare
              aftaler.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-dark py-14 sm:py-20 md:py-32">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="label-caps text-gold mb-4">✦ Bevis for faget</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-white">
              Svendebrev &amp; <span className="italic text-gold-light">certificering</span>
            </h2>
            <GoldDivider className="mt-6" />
            <p className="mt-8 text-white/60 leading-relaxed">
              Svendebrevet er ikke bare et papir — det er en forpligtelse til at
              udføre faget ordentligt. Hos os står det i centrum, og vi fremlægger
              det gerne ved første møde.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 sm:mt-12 border-2 border-gold bg-white p-6 sm:p-8 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/hero-billede.jpg"
                    alt="Tømrermester Jonatan Hintze Ladewig Christiansen"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </div>
              </div>
              <div className="md:col-span-7">
                <SvendebrevBadge />
                <h3 className="mt-6 font-display text-3xl md:text-4xl leading-tight">
                  Verificeret tømrermester
                </h3>
                <p className="mt-4 text-dark/75 leading-relaxed">
                  Uddannet efter dansk tømrer-faggrundlag og godkendt svend. Det sikrer
                  dig at arbejdet udføres efter faglige standarder, og at vi står inde
                  for det vi afleverer.
                </p>
                <ul className="mt-6 space-y-2 text-dark/75 text-sm">
                  <li className="gold-star">Svendebrev som tømrer</li>
                  <li className="gold-star">CVR-registreret virksomhed i {SITE.location}</li>
                  <li className="gold-star">Ansvarsforsikret og arbejdsgiver-registreret</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 md:py-32">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <p className="label-caps text-gold mb-4">Værdier</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              Tre ord. <span className="italic">Ét udtryk.</span>
            </h2>
            <GoldDivider className="mt-6" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {VAERDIER.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="border-t border-gold pt-6">
                  <p className="label-caps text-gold">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-3xl">{v.title}</h3>
                  <p className="mt-4 text-dark/70 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/kontakt" className="btn-outline">
              Mød os over en kop kaffe
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
