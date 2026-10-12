import Link from 'next/link'
import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Parallax } from '@/components/ui/Parallax'

export function AboutSnippet() {
  return (
    <section aria-labelledby="om-heading" className="overflow-hidden bg-white py-24 md:py-36">
      <div className="container-content grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="card relative mx-auto aspect-[4/5] max-w-[520px] bg-gray-light">
            <Parallax strength={0.06}>
              <Image
                src="/images/hero-billede.jpg"
                alt="Tømrermester Jonatan Hintze Ladewig Christiansen bearbejder en stolpe med overfræser"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[50%_40%]"
              />
            </Parallax>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow">Om firmaet</p>
            <h2 id="om-heading" className="section-title mt-3">
              Håndværk med <span className="text-dark/55">ansvar og rygrad.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead mt-8 text-dark/80">
              Jonatan er uddannet tømrer med svendebrev og har ført Tømrerfirmaet H L Christiansen frem som et
              værksted, der tager hver opgave seriøst — fra det første målebånd til den sidste liste er på plads.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-dark/65">
              Vi tror på klar kommunikation, rene linjer og arbejde, der holder. Ikke hurtige løsninger, men
              ordentlige.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <div data-testid="svendebrev-badge" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-light/15 text-gold">
                  <BadgeCheck size={22} aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-[17px] font-semibold tracking-[-0.02em]">Jonatan Hintze Ladewig Christiansen</span>
                  <span className="block text-[14px] text-dark/55">Verificeret tømrermester · Svendebrev</span>
                </span>
              </div>
              <Link href="/om-os" className="btn-outline">Læs mere om os</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
