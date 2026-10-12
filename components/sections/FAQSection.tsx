import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { FAQ_HOME } from '@/lib/faq'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { Reveal } from '@/components/ui/Reveal'

export function FAQSection() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white py-24 md:py-36">
      <div className="container-content grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Det får vi spurgt om</p>
          <h2 id="faq-heading" className="section-title mt-3">
            Ofte stillede <span className="text-dark/55">spørgsmål.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-dark/65">
            Vi har samlet de mest stillede spørgsmål om tilbud, proces, områder og garanti. Finder du ikke svar
            her, er du altid velkommen til at ringe eller skrive.
          </p>
          <Link href="/ofte-stillede-spoergsmaal" className="link-more mt-6">
            <span>Se alle spørgsmål</span>
            <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <FAQAccordion items={FAQ_HOME} defaultOpen={0} />
        </Reveal>
      </div>
    </section>
  )
}
