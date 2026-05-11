'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  duration?: number
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  clip?: boolean
  amount?: number
}

const ease = [0.16, 1, 0.3, 1] as const

const offsets = {
  up:    { y: 24 },
  down:  { y: -24 },
  left:  { x: -24 },
  right: { x: 24 },
  none:  {},
}

export function Reveal({
  delay = 0,
  duration = 0.6,
  from = 'up',
  clip = false,
  amount = 0.08,
  children,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offsets[from],
        ...(clip ? { clipPath: 'inset(0 0 100% 0)' } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        ...(clip ? { clipPath: 'inset(0 0 0% 0)' } : {}),
      }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease, delay }}
      style={{ willChange: 'transform, opacity' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
