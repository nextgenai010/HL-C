import { Reveal } from '@/components/ui/Reveal'

const STEPS = [
  { nr: '1', title: 'Rådgivning', desc: 'Vi mødes, ser på opgaven og taler materialer, muligheder og ønsker grundigt igennem.' },
  { nr: '2', title: 'Tilbud', desc: 'Du får et skriftligt tilbud med klare poster — ingen skjulte afgifter eller uventede regninger.' },
  { nr: '3', title: 'Udførelse', desc: 'Vi arbejder planlagt og rent, og holder dig opdateret løbende gennem forløbet.' },
  { nr: '4', title: 'Aflevering', desc: 'Endelig gennemgang og garanti. Vi følger op, så du er tryg efter aflevering.' },
]

export function ProcessSteps() {
  return (
    <section aria-labelledby="proces-heading" className="bg-gray-light py-24 md:py-36">
      <div className="container-content">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Sådan arbejder vi</p>
          <h2 id="proces-heading" className="section-title mt-3">
            Fire trin. <span className="text-dark/55">Ét forløb.</span>
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-5">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.nr} delay={i * 0.07} className="card flex flex-col bg-white p-7 md:p-8">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-dark font-display text-[17px] font-semibold text-gold-light"
              >
                {s.nr}
              </span>
              <h3 className="mt-8 font-display text-[24px] font-semibold leading-tight tracking-[-0.025em]">
                <span className="sr-only">Trin {s.nr}: </span>{s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-dark/65">{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
