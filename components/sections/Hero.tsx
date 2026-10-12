import Link from 'next/link'
import Image from 'next/image'
import { Check, Phone } from 'lucide-react'
import { QuoteForm } from '@/components/ui/QuoteForm'
import { Parallax } from '@/components/ui/Parallax'
import { SITE } from '@/lib/site'

const POINTS = ['Svar inden for 24 timer', 'Gratis og uforpligtende tilbud', 'Svendebrev som tømrer']

const delay = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties

export function Hero() {
  return (
    <section
      id="home-hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-dark text-white lg:h-[100svh] lg:min-h-[660px] lg:max-h-[1080px]"
    >
      {/* Photo: full first screen on phones; on desktop a panel on the left, close to its native width so it stays sharp. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[100svh] overflow-hidden lg:inset-y-0 lg:right-auto lg:h-full lg:w-[54%] xl:w-[58%]">
        <Parallax strength={0.04}>
          <Image
            src="/images/hero-billede.jpg"
            alt="Tømrermester Jonatan Hintze Ladewig Christiansen i arbejde på en træterrasse"
            fill
            priority
            quality={80}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-[50%_35%] lg:object-[60%_30%]"
          />
        </Parallax>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,36,38,0.55)_0%,rgba(35,36,38,0.15)_30%,rgba(35,36,38,0.6)_60%,#232426_94%)] lg:bg-[linear-gradient(180deg,rgba(35,36,38,0.5)_0%,rgba(35,36,38,0.1)_22%,rgba(35,36,38,0.72)_46%,rgba(35,36,38,0.95)_100%)]" />
        {/* Soft seam into the dark form side. */}
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-40 bg-gradient-to-r from-transparent to-dark lg:block" />
      </div>

      <div className="container-content grid gap-10 pb-14 lg:h-full lg:grid-cols-12 lg:gap-12 lg:pb-0 lg:pt-[72px]">
        <div className="flex min-h-[calc(100svh-24px)] flex-col justify-end pb-6 pt-28 lg:col-span-6 lg:min-h-0 xl:col-span-7 lg:pb-[max(40px,7vh)] lg:pr-10 lg:pt-0">
          <p className="rise eyebrow !text-gold-light" style={delay(0.05)}>
            Verificeret tømrermester i {SITE.location}
          </p>
          <h1
            id="hero-heading"
            className="rise-move mt-3 font-display text-[3.1rem] font-semibold leading-[0.98] sm:text-[4.25rem] lg:text-[min(5.25rem,10.5vh)] xl:text-[min(5.75rem,10.5vh)]"
          >
            Håndværk med <span className="text-gold-light">karakter.</span>
          </h1>
          <p className="rise lead mt-5 max-w-[34rem] text-white/80 md:mt-6" style={delay(0.22)}>
            Tømrermester med svendebrev i Herlev og hele Storkøbenhavn. Fra nybyg til renovering — og svar inden for 24 timer.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(0.32)}>
            <a href="#tilbud" className="btn-gold lg:hidden">Få et tilbud</a>
            <a href={`tel:${SITE.phoneHref}`} className="btn-outline-white">
              <Phone size={16} aria-hidden /> {SITE.phone}
            </a>
            <Link href="/projekter" className="hidden px-2 text-[15px] font-semibold text-white/85 transition-colors hover:text-white lg:inline-flex">
              Se vores arbejde ›
            </Link>
          </div>
        </div>

        <div id="tilbud" className="rise scroll-mt-24 lg:col-span-6 lg:self-center xl:col-span-5" style={delay(0.3)}>
          <QuoteForm />
          <ul className="mt-6 flex flex-col gap-2.5 text-[15px] text-white/75 lg:mt-5 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-4 lg:gap-y-1 lg:text-[13px] lg:text-white/65 [@media(min-width:1024px)_and_(max-height:820px)]:hidden">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 lg:gap-1.5">
                <Check size={15} strokeWidth={2.5} className="text-gold-light" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
