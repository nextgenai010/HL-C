'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  width?: number
  align?: 'left' | 'center'
  variant?: 'gold' | 'gold-light' | 'dark'
}

export function GoldDivider({
  className,
  width = 60,
  align = 'left',
  variant = 'gold',
}: Props) {
  const color =
    variant === 'gold'
      ? 'bg-gold'
      : variant === 'gold-light'
        ? 'bg-gold-light'
        : 'bg-dark'

  return (
    <motion.span
      aria-hidden
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'block h-px',
        color,
        align === 'center' ? 'mx-auto' : 'mx-0',
        className,
      )}
      style={{ width: 0 }}
    />
  )
}
