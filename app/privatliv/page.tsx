import type { Metadata } from 'next'
import Link from 'next/link'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privatlivspolitik',
  description: `Sådan behandler ${SITE.name} dine personoplysninger, når du sender en forespørgsel via vores kontaktformular eller besøger hlchristiansen.dk.`,
  alternates: { canonical: '/privatliv' },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = '10. maj 2026'

export default function PrivatlivSide() {
  return (
    <section className="bg-dark text-white min-h-screen pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-content max-w-3xl">
        <p className="label-caps text-gold mb-4">Privatliv</p>
        <h1 className="font-display text-3xl md:text-5xl leading-tight">
          Privatlivspolitik
        </h1>
        <GoldDivider className="mt-4" />
        <p className="mt-6 text-sm text-white/55">
          Senest opdateret: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-10 font-body text-white/75 leading-relaxed">
          <Section title="1 · Dataansvarlig">
            <p>
              {SITE.name} er dataansvarlig for behandlingen af de personoplysninger, vi modtager
              via vores hjemmeside og kontaktformular.
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              <li><span className="text-white/55">Virksomhed: </span>{SITE.name}</li>
              <li><span className="text-white/55">CVR: </span>{SITE.cvr}</li>
              <li><span className="text-white/55">Adresse: </span>{SITE.location}, {SITE.address.zip}</li>
              <li>
                <span className="text-white/55">Email: </span>
                <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light underline underline-offset-4">
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="text-white/55">Telefon: </span>
                <a href={`tel:${SITE.phoneHref}`} className="text-gold hover:text-gold-light underline underline-offset-4">
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </Section>

          <Section title="2 · Hvilke oplysninger indsamler vi?">
            <p>
              Når du sender en forespørgsel via kontaktformularen på <strong>hlchristiansen.dk</strong>,
              indsamler vi følgende oplysninger om dig:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="text-white/85">Navn</p>
                <p className="text-sm text-white/55">For at vi ved, hvem vi taler med.</p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="text-white/85">Telefonnummer</p>
                <p className="text-sm text-white/55">For at vi kan ringe tilbage og aftale et besøg eller opmåling.</p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="text-white/85">Emailadresse</p>
                <p className="text-sm text-white/55">For at sende dig en bekræftelse og tilbud.</p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="text-white/85">Type opgave</p>
                <p className="text-sm text-white/55">Fx tag, terrasse, renovering — så vi kan vurdere opgaven på forhånd.</p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="text-white/85">Beskrivelse af projektet</p>
                <p className="text-sm text-white/55">Den fritekst, du selv vælger at sende.</p>
              </li>
            </ul>
            <p className="mt-4 text-sm">
              Vi indsamler kun det, du selv aktivt skriver. Vi beder ikke om CPR-nummer,
              betalingsoplysninger eller andre følsomme data via formularen.
            </p>
          </Section>

          <Section title="3 · Hvad bruger vi oplysningerne til?">
            <p>
              Dine oplysninger bruges udelukkende til at:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="gold-star">Besvare din henvendelse og udarbejde et tilbud</li>
              <li className="gold-star">Aftale tid for besøg, opmåling eller udførelse af arbejdet</li>
              <li className="gold-star">Sende dig en bekræftelse på, at vi har modtaget din besked</li>
              <li className="gold-star">Føre kunderegnskab, hvis vi indgår en aftale (jf. bogføringsloven)</li>
            </ul>
            <p className="mt-4 text-sm">
              Vi bruger <strong>ikke</strong> dine oplysninger til markedsføring, nyhedsbreve eller
              videregivelse til tredjepart i salgsøjemed.
            </p>
          </Section>

          <Section title="4 · Retsgrundlag">
            <p>
              Behandlingen sker på baggrund af:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="gold-star">
                <strong>Samtykke</strong> (GDPR art. 6, stk. 1, litra a) — når du frivilligt udfylder
                kontaktformularen.
              </li>
              <li className="gold-star">
                <strong>Aftaleopfyldelse</strong> (GDPR art. 6, stk. 1, litra b) — hvis vi indgår en
                aftale om udførelse af tømrerarbejde.
              </li>
              <li className="gold-star">
                <strong>Retlig forpligtelse</strong> (GDPR art. 6, stk. 1, litra c) — bogføringsloven
                kræver, at vi opbevarer faktura- og regnskabsmateriale i 5 år.
              </li>
            </ul>
          </Section>

          <Section title="5 · Hvor længe gemmer vi dine oplysninger?">
            <ul className="mt-3 space-y-2 text-sm">
              <li className="gold-star">
                <strong>Forespørgsler uden videre kontakt:</strong> slettes senest efter 12 måneder.
              </li>
              <li className="gold-star">
                <strong>Forespørgsler der fører til tilbud:</strong> opbevares i op til 24 måneder
                efter sidste kontakt.
              </li>
              <li className="gold-star">
                <strong>Indgåede aftaler og fakturaer:</strong> opbevares i 5 år som krævet af
                bogføringsloven.
              </li>
            </ul>
          </Section>

          <Section title="6 · Hvem modtager oplysningerne?">
            <p>
              Vi videregiver ikke dine oplysninger til tredjepart i salgsøjemed. For at kunne drive
              hjemmesiden og håndtere din henvendelse benytter vi følgende databehandlere:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="label-caps text-gold">Vercel Inc. (USA)</p>
                <p className="mt-1 text-sm">
                  Hoster hjemmesiden og kører serversiden, der modtager formular-data. Data behandles i EU-regionen
                  (Stockholm, ARN1). Vercel er omfattet af EU-U.S. Data Privacy Framework.
                </p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="label-caps text-gold">Resend (USA)</p>
                <p className="mt-1 text-sm">
                  Sender den email, du modtager som bekræftelse, samt vores interne notifikation. Resend opbevarer
                  email-historik i op til 30 dage med henblik på fejlsøgning.
                </p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="label-caps text-gold">Google Analytics 4 (Google Ireland Ltd.)</p>
                <p className="mt-1 text-sm">
                  Anonymiserede besøgs-statistikker. <strong>Aktiveres kun hvis du accepterer cookies.</strong>{' '}
                  Læs mere i vores{' '}
                  <Link href="/cookies" className="text-gold hover:text-gold-light underline underline-offset-4">
                    cookiepolitik
                  </Link>.
                </p>
              </li>
              <li className="border-l-2 border-gold/40 pl-4">
                <p className="label-caps text-gold">Google Workspace (Gmail)</p>
                <p className="mt-1 text-sm">
                  Vores indbakke modtager dine forespørgsler. Underlagt Googles databehandleraftale.
                </p>
              </li>
            </ul>
            <p className="mt-4 text-sm">
              Vi har indgået databehandleraftaler med disse leverandører i overensstemmelse med GDPR art. 28.
            </p>
          </Section>

          <Section title="7 · Overførsel til lande uden for EU/EØS">
            <p>
              Visse af vores leverandører (Vercel og Resend) har hovedsæde i USA. Overførsel sker på baggrund
              af EU-Kommissionens standardkontraktbestemmelser og/eller EU-U.S. Data Privacy Framework.
            </p>
          </Section>

          <Section title="8 · Sikkerhed">
            <p>
              Vi tager sikkerheden af dine oplysninger alvorligt. Hjemmesiden bruger HTTPS-kryptering,
              vi har implementeret tekniske og organisatoriske foranstaltninger mod uautoriseret adgang,
              og kun den ansvarlige tømrermester har adgang til indbakken med forespørgsler.
            </p>
          </Section>

          <Section title="9 · Dine rettigheder">
            <p>
              Du har efter databeskyttelsesforordningen ret til at:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="gold-star">Få indsigt i, hvilke oplysninger vi behandler om dig (art. 15)</li>
              <li className="gold-star">Få rettet urigtige oplysninger (art. 16)</li>
              <li className="gold-star">Få slettet dine oplysninger, når de ikke længere er nødvendige (art. 17)</li>
              <li className="gold-star">Begrænse behandlingen af dine oplysninger (art. 18)</li>
              <li className="gold-star">Få oplysningerne udleveret i et struktureret format (dataportabilitet, art. 20)</li>
              <li className="gold-star">Trække dit samtykke tilbage på et hvilket som helst tidspunkt (art. 7, stk. 3)</li>
            </ul>
            <p className="mt-4 text-sm">
              Skriv til{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light underline underline-offset-4">
                {SITE.email}
              </a>{' '}
              for at gøre brug af dine rettigheder. Vi svarer inden for 30 dage.
            </p>
          </Section>

          <Section title="10 · Klage til Datatilsynet">
            <p>
              Hvis du er utilfreds med vores behandling af dine personoplysninger, kan du klage til:
            </p>
            <div className="mt-3 border-l-2 border-gold/40 pl-4 text-sm">
              <p className="text-white/85">Datatilsynet</p>
              <p className="text-white/55">Carl Jacobsens Vej 35, 2500 Valby</p>
              <p className="text-white/55">Telefon: 33 19 32 00</p>
              <p>
                <a
                  href="https://www.datatilsynet.dk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light underline underline-offset-4"
                >
                  datatilsynet.dk
                </a>
              </p>
            </div>
          </Section>

          <Section title="11 · Ændringer i privatlivspolitikken">
            <p>
              Vi forbeholder os ret til at opdatere denne privatlivspolitik. Den til enhver tid gældende
              version findes altid på denne side med dato for seneste opdatering øverst.
            </p>
          </Section>

          <Section title="12 · Kontakt">
            <p>
              Har du spørgsmål til vores behandling af dine personoplysninger, er du velkommen til at
              kontakte os:
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <span className="text-white/55">Email: </span>
                <a href={`mailto:${SITE.email}`} className="text-gold hover:text-gold-light underline underline-offset-4">
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="text-white/55">Telefon: </span>
                <a href={`tel:${SITE.phoneHref}`} className="text-gold hover:text-gold-light underline underline-offset-4">
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </section>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl text-white mb-4">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
