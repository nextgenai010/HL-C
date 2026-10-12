import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const SERVICES = [
  {
    name: 'Nybyg & Tilbygninger',
    description: 'Fra fundament til rejsegilde — nye boliger og tilbygninger med solidt håndværk og præcise detaljer.',
    image: '/images/ydelser/nybyg.jpg',
    alt: 'Træskelet til nybyg mod blå himmel',
    href: '/ydelser/nybyg-tilbygninger',
  },
  {
    name: 'Renovering & Ombygning',
    description: 'Vi omdanner eksisterende rum med respekt for det originale og øje for det nye.',
    image: '/images/ydelser/renovering.png',
    alt: 'Tømrer lægger nyt trægulv under renovering',
    href: '/ydelser/renovering',
  },
  {
    name: 'Tag & Kviste',
    description: 'Nyt tag, kvistudvidelse eller tagudskiftning — dit hjem sikret mod vejr og vind.',
    image: '/images/ydelser/tag.jpeg',
    alt: 'Nyt tegltag på parcelhus',
    href: '/ydelser/tag',
  },
  {
    name: 'Vinduer & Døre',
    description: 'Montering og udskiftning med tæt pasform, energioptimering og flot finish.',
    image: '/images/ydelser/vinduer.png',
    alt: 'Store glaspartier og skydedøre i moderne bolig',
    href: '/ydelser/vinduer-doere',
  },
  {
    name: 'Facader & Beklædning',
    description: 'Ny beklædning i træ, der beskytter og fornyer husets udtryk.',
    image: '/images/ydelser/facader.png',
    alt: 'Lodret træbeklædning på facade',
    href: '/ydelser/facader',
  },
  {
    name: 'Terrasser & Udendørs',
    description: 'Træterrasser og udendørs konstruktioner bygget til det danske klima.',
    image: '/images/ydelser/terrasser.png',
    alt: 'Tømrer monterer terrassebrædder i haven',
    href: '/ydelser/terrasser',
  },
]

export function ServicesPreview() {
  return (
    <section aria-labelledby="ydelser-heading" className="overflow-hidden bg-gray-light py-24 md:py-36">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Hvad vi laver</p>
          <h2 id="ydelser-heading" className="section-title mt-3">
            Seks fagområder.<br /><span className="text-dark/55">Samme håndværk.</span>
          </h2>
        </Reveal>
      </div>

      <ul className="rail mt-12 md:mx-auto md:mt-16 md:grid md:max-w-content md:grid-flow-row md:grid-cols-2 md:gap-5 md:overflow-visible md:px-10 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal as="li" key={s.href} delay={(i % 3) * 0.08}>
            <Link href={s.href} className="group card flex h-full flex-col bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(35,36,38,0.35)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-mid">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 768px) 82vw, (max-width: 1024px) 50vw, 400px"
                  className="zoom-img object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="font-display text-[22px] font-semibold leading-tight tracking-[-0.025em] md:text-[24px]">{s.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-dark/65">{s.description}</p>
                <span className="link-more mt-5 !text-[15px]">
                  <span>Læs mere</span>
                  <ChevronRight size={16} strokeWidth={2.5} aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="container-content mt-12 md:mt-16">
        <Reveal>
          <Link href="/ydelser" className="btn-primary">Se alle ydelser</Link>
        </Reveal>
      </div>
    </section>
  )
}
