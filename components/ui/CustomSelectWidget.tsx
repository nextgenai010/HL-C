'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { YDELSER } from '@/lib/services'

const OPTIONS = [...YDELSER.map(y => y.title), 'Andet / jeg er ikke sikker']

export function CustomSelectWidget({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (v: string) => void
  error?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          'w-full flex items-center justify-between border-0 border-b py-2.5 text-sm font-body bg-transparent outline-none transition-colors',
          value ? 'text-dark' : 'text-dark/35',
          open || error ? 'border-gold' : 'border-dark/15',
        )}
      >
        <span>{value || 'Type opgave'}</span>
        <ChevronDown size={14} className={cn('text-dark/30 transition-transform duration-200', open && 'rotate-180 text-gold')} />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-dark/10 z-50 overflow-y-auto dropdown-scroll"
          style={{ boxShadow: '0 -8px 24px rgba(0,0,0,0.12)', maxHeight: '220px' }}
        >
          {OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 text-left text-sm font-body transition-colors',
                opt === value ? 'text-gold bg-gold/5' : 'text-dark/70 hover:bg-gray-50 hover:text-dark',
              )}
            >
              <span>{opt}</span>
              {opt === value && <Check size={12} className="text-gold" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
