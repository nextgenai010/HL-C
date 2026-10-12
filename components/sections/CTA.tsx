import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Parallax } from '@/components/ui/Parallax'
import { SITE } from '@/lib/site'

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-dark text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Parallax strength={0.08}>
          <Image src="/images/teresse-projekt.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_55%] opacity-35" />
        </Parallax>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,36,38,0.55)_0%,rgba(35,36,38,0.92)_75%)]" />
      </div>

      <Reveal className="container-content flex flex-col items-center py-28 text-center md:py-40">
        <p className="eyebrow !text-gold-light">Kom i gang</p>
        <h2 id="cta-heading" className="section-title mt-3 max-w-3xl">
          Lad os tale om <span className="text-gold-light">dit projekt.</span>
        </h2>
        <p className="lead mt-6 max-w-xl text-white/70">
          Ring, skriv eller book et uforpligtende besøg. Vi svarer inden for 24 timer — og kigger gerne forbi for
          at tale løsningen igennem på stedet.
        </p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="/kontakt" className="btn-gold">Få et tilbud</Link>
          <a href={`tel:${SITE.phoneHref}`} className="btn-outline-white">
            <Phone size={16} aria-hidden /> {SITE.phone}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
