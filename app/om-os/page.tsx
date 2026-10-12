import { defaultOpenGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { BadgeCheck, Check } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { CTA } from '@/components/sections/CTA'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Om os – Tømrermester med svendebrev i Herlev',
  description: `Mød tømrermester Jonatan Hintze Ladewig Christiansen i ${SITE.location}. Svendebrev, klare aftaler og håndværk uden skjulte poster.`,
  alternates: { canonical: '/om-os' },
  openGraph: {
    ...defaultOpenGraph,
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

const ARBEJDSGANG = [
  {
    title: 'Vi mødes inden vi giver tilbud',
    desc: 'Vi tager altid ud at se på opgaven, hvor det giver mening. Et besøg på 20-30 minutter gør tilbuddet langt mere præcist — og giver dig en fornemmelse af, hvem du arbejder sammen med.',
  },
  {
    title: 'Skriftligt tilbud uden skjulte poster',
    desc: 'Du får et klart tilbud, hvor du kan se, hvad du betaler for. Ingen vage formuleringer, ingen "vi tager den derfra" på pris. Hvis vi finder noget undervejs, taler vi om det først.',
  },
  {
    title: 'Vi rydder op hver dag',
    desc: 'Pladsen efterlades, så du kan bo i den, hvis det er nødvendigt. Affald kommer i container eller direkte til genbrugsplads — vi efterlader ikke noget bag os.',
  },
  {
    title: 'Aflevering er ikke afsluttet',
    desc: 'Når vi siger, det er færdigt, betyder det også, at vi står ved det. Dukker der noget op senere, kommer vi tilbage og kigger. Det er for os en del af at lave ordentligt arbejde.',
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

      <section className="bg-white py-24 md:py-36">
        <div className="container-content grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="card relative aspect-[4/5] bg-gray-light">
              <Image
                src="/images/kategorier/nybyg-tilbygninger.jpg"
                alt="Træskelet til nybyg rejst af tømrere på byggepladsen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.08}>
            <p className="eyebrow">Vores historie</p>
            <h2 className="section-title mt-3">
              Fag lært fra bunden — <span className="text-dark/55">bygget videre hver dag.</span>
            </h2>
            <p className="lead mt-8 text-dark/80">
              Jonatan tog sit svendebrev som tømrer og har siden bygget Tømrerfirmaet H L Christiansen op omkring
              et enkelt princip: hver opgave fortjener samme grad af opmærksomhed — uanset om det er en hel
              tagudskiftning eller en enkelt dør, der skal sidde rigtigt.
            </p>
            <p className="mt-5 leading-relaxed text-dark/65">
              Vi har vores rødder i {SITE.location} og kører dagligt ud til opgaver i hele Storkøbenhavn. I dag
              arbejder vi med alt fra nybyg og tilbygninger til tag, facader, vinduer, døre og terrasser — altid
              med udgangspunkt i godt håndværk og klare aftaler.
            </p>
            <p className="mt-4 leading-relaxed text-dark/65">
              Vi er ikke det største tømrerfirma i området. Men vi er det, vi tror på: et hold der står inde for
              hvert led, taler ærligt om pris og tidsplan, og afleverer arbejde der holder.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="svendebrev-heading" className="bg-dark py-24 text-white md:py-36">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow !text-gold-light">Bevis for faget</p>
            <h2 id="svendebrev-heading" className="section-title mt-3">
              Svendebrev &amp; <span className="text-gold-light">certificering.</span>
            </h2>
            <p className="lead mt-6 text-white/70">
              Svendebrevet er ikke bare et papir — det er en forpligtelse til at udføre faget ordentligt. Hos os
              står det i centrum, og vi fremlægger det gerne ved første møde.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card mt-12 grid items-center gap-8 bg-white p-5 text-dark sm:p-8 md:mt-16 md:grid-cols-12 md:gap-12 md:p-10">
              <div className="md:col-span-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-gray-light">
                  <Image
                    src="/images/hero-billede.jpg"
                    alt="Tømrermester Jonatan Hintze Ladewig Christiansen i arbejde"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
              </div>
              <div className="md:col-span-7 md:pr-4">
                <div data-testid="svendebrev-badge" className="inline-flex items-center gap-3 rounded-full bg-gold-light/15 py-2 pl-2 pr-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-light text-dark">
                    <BadgeCheck size={18} aria-hidden />
                  </span>
                  <span className="text-[14px] font-semibold">Svendebrev</span>
                </div>
                <h3 className="mt-6 font-display text-[32px] font-semibold leading-tight tracking-[-0.03em] md:text-[40px]">
                  Verificeret tømrermester
                </h3>
                <p className="mt-4 leading-relaxed text-dark/70">
                  Uddannet efter dansk tømrer-faggrundlag og godkendt svend. Det sikrer dig at arbejdet udføres
                  efter faglige standarder, og at vi står inde for det vi afleverer.
                </p>
                <ul className="mt-6 space-y-3 text-[15px] text-dark/80">
                  {['Svendebrev som tømrer', `CVR-registreret virksomhed i ${SITE.location}`, 'Ansvarsforsikret og arbejdsgiver-registreret'].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <Check size={16} strokeWidth={2.5} aria-hidden className="shrink-0 text-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gray-light py-24 md:py-36">
        <div className="container-content grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Sådan arbejder vi</p>
            <h2 className="section-title mt-3">
              Tæt dialog. <span className="text-dark/55">Ren proces.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-dark/65">
              Vi tror på, at det bedste håndværk kommer ud af en god dialog. Du skal vide, hvad der sker — også når
              der er noget vi finder bag overfladen, der ikke var planlagt.
            </p>
          </Reveal>

          <ol className="space-y-4 lg:col-span-7">
            {ARBEJDSGANG.map((point, i) => (
              <Reveal as="li" key={point.title} delay={i * 0.06} className="card flex gap-5 bg-white p-6 md:p-8">
                <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dark font-display text-[15px] font-semibold text-gold-light">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.025em] md:text-[24px]">{point.title}</h3>
                  <p className="mt-2 leading-relaxed text-dark/65">{point.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-24 md:py-36">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Værdier</p>
            <h2 className="section-title mt-3">
              Tre ord. <span className="text-dark/55">Ét udtryk.</span>
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-dark/65">
              Værdier er nemme at skrive på en hjemmeside. Det er noget andet at stå ved dem, når en opgave bliver
              svær. For os er der tre ting, vi ikke fraviger — uanset hvad.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
            {VAERDIER.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07} className="card bg-gray-light p-7 md:p-9">
                <h3 className="font-display text-[30px] font-semibold tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-dark/65">{v.desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link href="/kontakt" className="btn-outline">Mød os over en kop kaffe</Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
