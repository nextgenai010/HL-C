'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Moves its child slightly slower than the page while it is on screen.
 * Transform only, one rAF per frame, and switched off for reduced motion.
 */
export function Parallax({
  children,
  className,
  strength = 0.12,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const parent = el.parentElement ?? el
    let raf = 0
    let visible = false

    const update = () => {
      raf = 0
      const rect = parent.getBoundingClientRect()
      // -1 when the frame enters at the bottom, 1 when it leaves at the top.
      const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - (rect.top + rect.height / 2)) / ((innerHeight + rect.height) / 2)))
      // Scaling by 1 + 2s leaves s × height of spare image above and below, so the shift never shows an edge.
      const shift = progress * strength * rect.height * 0.95
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(${1 + 2 * strength})`
    }
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(update) }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) onScroll()
    })
    io.observe(parent)
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      io.disconnect()
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <div ref={ref} data-parallax className={cn('absolute inset-0 will-change-transform', className)}>
      {children}
    </div>
  )
}
