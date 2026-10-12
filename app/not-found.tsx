import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Siden findes ikke — 404',
  description: 'Den side du leder efter er flyttet eller findes ikke længere. Vend tilbage til forsiden eller kig ind i vores ydelser.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="flex min-h-[85svh] items-center bg-dark text-white">
      <div className="container-content py-32 text-center">
        <p className="eyebrow !text-gold-light">Fejl 404</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-[2.75rem] font-semibold leading-[1.02] md:text-[4.5rem]">
          Siden er <span className="text-gold-light">ikke bygget færdig.</span>
        </h1>
        <p className="lead mx-auto mt-6 max-w-md text-white/70">
          Det du ledte efter er enten flyttet eller findes ikke længere. Vend tilbage til forsiden eller kig ind i
          vores ydelser.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">Til forsiden</Link>
          <Link href="/ydelser" className="btn-outline-white">Se ydelser</Link>
        </div>
      </div>
    </section>
  )
}
