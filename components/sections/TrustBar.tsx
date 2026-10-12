import { Reveal } from '@/components/ui/Reveal'

const FACTS = [
  { value: '5+', label: 'års erfaring i faget' },
  { value: '24 t', label: 'svar på hverdage' },
  { value: '6', label: 'fagområder under ét tag' },
  { value: 'Svendebrev', label: 'verificeret tømrermester' },
]

export function TrustBar() {
  return (
    <section aria-label="Fakta om firmaet" className="bg-dark text-white">
      <div className="container-content border-t border-white/10 py-12 md:py-16">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal as="li" key={f.label} delay={i * 0.06}>
              <p className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em] text-gold-light md:text-[44px]">
                {f.value}
              </p>
              <p className="mt-2 text-[15px] text-white/60">{f.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
