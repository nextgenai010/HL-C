import type { FaqItem } from '@/lib/faq'
import { Plus } from 'lucide-react'

export function FAQAccordion({ items, dark = false, defaultOpen = -1 }: { items: FaqItem[]; dark?: boolean; defaultOpen?: number }) {
  return <div className={`faq-list ${dark ? 'faq-dark' : ''}`}>
    {items.map((item, i) => <details key={item.q} open={i === defaultOpen || undefined} className="faq-item">
      <summary><span>{item.q}</span><Plus size={19} aria-hidden /></summary>
      <p>{item.a}</p>
    </details>)}
  </div>
}
