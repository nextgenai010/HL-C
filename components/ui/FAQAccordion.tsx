'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/lib/faq'

const ease = [0.16, 1, 0.3, 1] as const

export function FAQAccordion({
  items,
  dark = false,
  defaultOpen = -1,
}: {
  items: FaqItem[]
  dark?: boolean
  defaultOpen?: number
}) {
  const [openIdx, setOpenIdx] = useState<number>(defaultOpen)

  return (
    <ul className="divide-y" style={{ borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(35,36,38,0.10)' }}>
      {items.map((item, i) => {
        const isOpen = openIdx === i
        return (
          <li
            key={item.q}
            style={{ borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(35,36,38,0.10)' }}
            className={cn('border-t first:border-t-0', isOpen && (dark ? 'bg-white/[0.02]' : 'bg-gray-light/40'))}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className={cn(
                'group flex w-full items-start justify-between gap-6 py-6 sm:py-7 px-1 text-left transition-colors',
                dark ? 'text-white' : 'text-dark',
              )}
            >
              <span className="font-display text-xl sm:text-2xl leading-tight pr-2">
                {item.q}
              </span>
              <span
                className={cn(
                  'flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center border transition-all duration-300',
                  isOpen
                    ? 'border-gold bg-gold text-white rotate-45'
                    : dark
                      ? 'border-white/25 text-gold-light group-hover:border-gold-light'
                      : 'border-dark/15 text-gold group-hover:border-gold',
                )}
                aria-hidden
              >
                <Plus size={16} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <div className={cn('pb-7 sm:pb-8 pr-12 sm:pr-14 pl-1 leading-relaxed', dark ? 'text-white/70' : 'text-dark/75')}>
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
