import type { Metadata } from 'next'
import Link from 'next/link'
import { GoldDivider } from '@/components/ui/GoldDivider'

export const metadata: Metadata = {
  title: 'Siden findes ikke — 404',
  description: 'Den side du leder efter er flyttet eller findes ikke længere. Vend tilbage til forsiden eller kig ind i vores ydelser.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="bg-dark text-white grain min-h-[80svh] flex items-center">
      <div className="container-content py-32 text-center">
        <p className="label-caps text-gold-light">✦ 404</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.0]">
          Siden er <span className="italic">ikke bygget færdig.</span>
        </h1>
        <div className="mt-8 flex justify-center">
          <GoldDivider variant="gold-light" align="center" />
        </div>
        <p className="mt-8 text-white/70 max-w-md mx-auto">
          Det du ledte efter er enten flyttet eller findes ikke længere. Vend tilbage
          til forsiden eller kig ind i vores ydelser.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-outline-white">Til forsiden</Link>
          <Link href="/ydelser" className="text-white/70 hover:text-gold-light label-caps self-center">
            Se ydelser →
          </Link>
        </div>
      </div>
    </section>
  )
}
