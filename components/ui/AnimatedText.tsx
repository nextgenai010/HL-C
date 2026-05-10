'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  stagger?: number
  delay?: number
}

export function AnimatedText({
  text,
  className,
  as = 'h1',
  stagger = 0.08,
  delay = 0,
}: Props) {
  const words = text.split(' ')
  const Tag = motion[as]

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] last:mr-0"
          variants={{
            hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
