'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const ITEMS = [
  { label: 'Verificeret Tømrermester', icon: '✦' },
  { label: 'Svendebrev', icon: '✦' },
  { label: '+5 års erfaring', icon: '✦' },
  { label: 'Tømrer af fag · Herlev', icon: '✦' },
]

const ease = [0.16, 1, 0.3, 1] as const

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: i * 0.08 },
  }),
}

export function TrustBar() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.section
      ref={ref}
      className="bg-white border-b border-gray-mid overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container-content py-5 md:py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12 text-center">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex items-center gap-2.5 label-caps text-dark/70 text-[10px] md:text-[11px]"
            >
              <span aria-hidden className="text-gold text-[10px]">{item.icon}</span>
              <span>{item.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}
