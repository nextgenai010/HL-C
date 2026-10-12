'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageSquarePlus, X } from 'lucide-react'
import { QuoteForm } from './QuoteForm'
import { cn } from '@/lib/utils'

export function FloatingQuote() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Appears once the page has scrolled past the hero (which has its own form).
  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById('home-hero')
      setVisible(window.scrollY > 400 && (!hero || hero.getBoundingClientRect().bottom < 100))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); trigger?.focus() }
  }, [open])

  return (
    <>
      {open && (
        <div aria-hidden className="fixed inset-0 z-[60] bg-black/40 sm:hidden" onClick={() => setOpen(false)} />
      )}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="float-quote-heading"
          className="float-panel fixed inset-x-0 bottom-0 z-[61] max-h-[92dvh] overflow-y-auto rounded-t-[26px] bg-white p-6 pb-[max(24px,env(safe-area-inset-bottom))] text-dark shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.35)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:max-h-[calc(100dvh-8rem)] sm:rounded-[26px] sm:p-7"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Luk"
            className="icon-btn absolute right-4 top-4 bg-dark/[0.06] text-dark hover:bg-dark/10"
          >
            <X size={18} aria-hidden />
          </button>
          <QuoteForm idPrefix="float" title="Få et tilbud" intro="Svar inden for 24 timer på hverdage." variant="plain" autoFocus />
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'fixed bottom-4 right-4 z-50 inline-flex min-h-[50px] items-center gap-2 rounded-full bg-gold-light px-5 text-[15px] font-semibold text-dark shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)] transition-[opacity,transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#e2bf4c] active:scale-[0.97] sm:bottom-6 sm:right-6',
          visible && !open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
        tabIndex={visible && !open ? 0 : -1}
        aria-hidden={!(visible && !open)}
      >
        <MessageSquarePlus size={18} aria-hidden />
        Få et tilbud
      </button>
    </>
  )
}
