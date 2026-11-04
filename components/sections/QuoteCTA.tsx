import Image from 'next/image'
import { Phone } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Parallax } from '@/components/ui/Parallax'
import { SITE } from '@/lib/site'

/** Closing call-to-action on the home page. Points back up to the hero quote form instead of repeating it. */
export function QuoteCTA() {
  return (
    <section aria-labelledby="kom-i-gang-heading" className="relative isolate overflow-hidden bg-dark text-white">
      <div className="absolute inset-0 -z-10">
        <Parallax strength={0.08}>
          <Image
            src="/images/teresse-projekt.jpg"
            alt="Tømrer fra H L Christiansen på opgave – nyt trædæk med trapper ved et parcelhus"
            fill
            sizes="100vw"
            className="object-cover object-[50%_55%] opacity-35"
          />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,36,38,0.55)_0%,rgba(35,36,38,0.92)_75%)]" />
      </div>

      <Reveal className="container-content flex flex-col items-center py-28 text-center md:py-40">
        <p className="eyebrow !text-gold-light">Kom i gang</p>
        <h2 id="kom-i-gang-heading" className="section-title mt-3 max-w-3xl">
          Klar til at komme <span className="text-gold-light">i gang?</span>
        </h2>
        <p className="lead mt-6 max-w-xl text-white/75">
          Ring{' '}
          <a href={`tel:${SITE.phoneHref}`} className="font-semibold text-white underline decoration-gold-light/60 underline-offset-4 hover:decoration-gold-light">
            {SITE.phone}
          </a>{' '}
          eller få et gratis tilbud. Vi svarer inden for 24 timer.
        </p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a href="#tilbud" className="btn-gold">Få et gratis tilbud</a>
          <a href={`tel:${SITE.phoneHref}`} className="btn-outline-white">
            <Phone size={16} aria-hidden /> Ring {SITE.phone}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
