'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Previous/next buttons for a horizontal `.rail`, for people without a trackpad. */
export function RailNav({ targetId, dark = false, className }: { targetId: string; dark?: boolean; className?: string }) {
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    const update = () => setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [targetId])

  const scroll = (dir: 1 | -1) => {
    const el = document.getElementById(targetId)
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const btn = cn('icon-btn', dark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-dark/[0.06] text-dark hover:bg-dark/10')

  return (
    <div className={cn('flex gap-2', className)}>
      <button type="button" className={btn} onClick={() => scroll(-1)} disabled={edge.start} aria-controls={targetId} aria-label="Forrige">
        <ChevronLeft size={20} aria-hidden />
      </button>
      <button type="button" className={btn} onClick={() => scroll(1)} disabled={edge.end} aria-controls={targetId} aria-label="Næste">
        <ChevronRight size={20} aria-hidden />
      </button>
    </div>
  )
}
