'use client'

import { motion } from 'framer-motion'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function PageHero({ eyebrow, title, description, className }: Props) {
  return (
    <section
      className={cn(
        'bg-dark text-white grain pt-36 md:pt-44 pb-20 md:pb-28 relative overflow-hidden',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(900px 400px at 80% 10%, rgba(184,150,12,0.18), transparent 60%)',
        }}
      />
      <div className="container-content relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label-caps text-gold-light mb-5"
        >
          ✦ {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <GoldDivider className="mt-8" variant="gold-light" />
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-white/75 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
