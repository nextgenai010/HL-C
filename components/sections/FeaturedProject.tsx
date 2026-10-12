import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Parallax } from '@/components/ui/Parallax'
import { RailNav } from '@/components/ui/RailNav'
import { PROJEKTER } from '@/lib/projects'

const META = [
  { label: 'Kategori', value: 'Terrasse' },
  { label: 'Lokation', value: 'Herlev' },
  { label: 'År', value: '2024' },
]

export function FeaturedProject() {
  return (
    <section aria-labelledby="udvalgt-heading" className="overflow-hidden bg-dark py-24 text-white md:py-36">
      <div className="container-content grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6 lg:col-start-1">
          <div className="card relative aspect-[4/5] bg-white/5 sm:aspect-[5/6]">
            <Parallax strength={0.06}>
              <Image
                src="/images/projekter/img_0281.jpg"
                alt="Stort trædæk i træ bygget op ad en vinterhave i Herlev"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[50%_60%]"
              />
            </Parallax>
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow !text-gold-light">Udvalgt arbejde</p>
            <h2 id="udvalgt-heading" className="section-title mt-3">
              Terrasse med <span className="text-gold-light">haveudsigt.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead mt-6 text-white/70">
              Skabt til haven. Rummeligt trædæk opført i forbindelse med eksisterende vinterhave — naturlig
              integration i haven, præcise mål og rene afslutninger hele vejen rundt.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {META.map((m) => (
                <div key={m.label}>
                  <dt className="text-[13px] text-white/60">{m.label}</dt>
                  <dd className="mt-1 font-display text-[19px] font-semibold tracking-[-0.02em]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Every project photo, as a swipeable strip on phones and a grid-like rail on desktop. */}
      <div className="container-content mt-24 flex items-end justify-between gap-6 md:mt-32">
        <Reveal>
          <h3 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] md:text-[36px]">
            Fra byggepladsen.
          </h3>
          <p className="mt-2 text-[15px] text-white/55 md:text-[17px]">Et udpluk af opgaver, vi har løst.</p>
        </Reveal>
        <Reveal className="hidden shrink-0 items-center gap-6 sm:flex">
          <Link href="/projekter" className="link-more !text-gold-light">
            <span>Se alle projekter</span>
            <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
          </Link>
          <RailNav targetId="projekt-rail" dark className="hidden lg:flex" />
        </Reveal>
      </div>

      <ul id="projekt-rail" aria-label="Projektbilleder" className="rail project-rail mt-8 md:mt-10">
        {PROJEKTER.map((p) => (
          <li key={p.slug}>
            <Link href="/projekter" className="group block">
              <div className="card relative aspect-[3/4] bg-white/5">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 300px"
                  className="zoom-img object-cover"
                />
              </div>
              <p className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-white/90">{p.title}</p>
              <p className="text-[13px] text-white/60">{p.kategoriLabel}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="container-content mt-10 sm:hidden">
        <Link href="/projekter" className="btn-outline-white w-full">Se alle projekter</Link>
      </div>
    </section>
  )
}
