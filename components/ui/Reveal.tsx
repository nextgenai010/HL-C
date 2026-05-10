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
  up:    { y: 48 },
  down:  { y: -48 },
  left:  { x: -48 },
  right: { x: 48 },
  none:  {},
}

export function Reveal({
  delay = 0,
  duration = 0.85,
  from = 'up',
  clip = false,
  amount = 0.15,
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
      {...rest}
    >
      {children}
    </motion.div>
  )
}
