import Image from 'next/image'
import { Check, Phone } from 'lucide-react'
import { QuoteForm } from '@/components/ui/QuoteForm'
import { Reveal } from '@/components/ui/Reveal'
import { Parallax } from '@/components/ui/Parallax'
import { SITE } from '@/lib/site'

const POINTS = ['Gratis og uforpligtende', 'Svar inden 24 timer', 'Verificeret tømrermester']

export function QuoteCTA() {
  return (
    <section aria-labelledby="kom-i-gang-heading" className="relative isolate overflow-hidden bg-dark py-24 text-white md:py-36">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Parallax strength={0.08}>
          <Image
            src="/images/teresse-projekt.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_55%] opacity-40"
          />
        </Parallax>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#232426_0%,rgba(35,36,38,0.7)_30%,rgba(35,36,38,0.85)_100%)]" />
      </div>

      <div className="container-content grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow !text-gold-light">Kom i gang</p>
          <h2 id="kom-i-gang-heading" className="section-title mt-3">
            Få et <span className="text-gold-light">uforpligtende</span> tilbud.
          </h2>
          <p className="lead mt-6 max-w-lg text-white/70">
            Beskriv din opgave — vi vender tilbage inden for 24 timer med et klart og ærligt tilbud.
          </p>
          <ul className="mt-8 flex flex-col gap-3 text-[16px] text-white/80">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-light/15 text-gold-light">
                  <Check size={13} strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a href={`tel:${SITE.phoneHref}`} className="btn-outline-white mt-10">
            <Phone size={16} aria-hidden /> Ring {SITE.phone}
          </a>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6">
          <QuoteForm
            idPrefix="cta"
            title="Fortæl os om opgaven"
            intro="Udfyld formularen — det tager under et minut."
          />
        </Reveal>
      </div>
    </section>
  )
}
