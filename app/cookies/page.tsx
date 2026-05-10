import type { Metadata } from 'next'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { CookieControls } from './CookieControls'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cookiepolitik',
  description: `Sådan bruger ${SITE.name} cookies på hjemmesiden — kun statistik via Google Analytics, og kun hvis du accepterer.`,
  alternates: { canonical: '/cookies' },
  robots: { index: true, follow: true },
}

export default function CookiesSide() {
  return (
    <section className="bg-dark text-white min-h-screen pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-content max-w-3xl">
        <p className="label-caps text-gold mb-4">Privatliv</p>
        <h1 className="font-display text-3xl md:text-5xl leading-tight">
          Cookiepolitik
        </h1>
        <GoldDivider className="mt-4" />

        <div className="mt-10 space-y-8 font-body text-white/75 leading-relaxed">
          <div>
            <h2 className="font-display text-2xl text-white mb-3">Hvad er cookies?</h2>
            <p>
              Cookies er små tekstfiler, der gemmes i din browser, når du besøger en hjemmeside.
              De bruges til at huske dine valg og til at måle, hvordan siden bliver brugt.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">Hvilke cookies bruger vi?</h2>
            <p className="mb-4">
              På denne side bruger vi udelukkende statistik-cookies via Google Analytics 4 til at
              forstå, hvordan vores besøgende finder og navigerer på sitet. Vi sælger eller deler
              ikke data med tredjeparter til markedsføring.
            </p>
            <ul className="space-y-3">
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="label-caps text-gold">Google Analytics</p>
                <p className="mt-1 text-sm">
                  Måler besøg, sidevisninger og generel adfærd. Cookies: <code className="text-gold-light">_ga</code>, <code className="text-gold-light">_ga_*</code>. Sættes kun, hvis du accepterer.
                </p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="label-caps text-gold">Samtykke</p>
                <p className="mt-1 text-sm">
                  Vi gemmer dit valg lokalt i din browser, så banneret ikke vises igen. Ingen data sendes til os.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">Dit valg</h2>
            <p className="mb-5">
              Du kan til enhver tid ændre eller tilbagekalde dit samtykke. Klik nedenfor.
            </p>
            <CookieControls />
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">Kontakt</h2>
            <p>
              Har du spørgsmål til vores brug af cookies, er du velkommen til at skrive til{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light underline underline-offset-4">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
