'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { YDELSER } from '@/lib/services'

const schema = z.object({
  name: z.string().min(2, 'Angiv venligst dit navn'),
  phone: z.string().min(6, 'Angiv venligst et telefonnummer'),
  email: z.string().email('Angiv en gyldig email'),
  type: z.string().min(1, 'Vælg en opgavetype'),
  message: z.string().min(10, 'Uddyb gerne din forespørgsel'),
})

type FormData = z.infer<typeof schema>

const OPTIONS = [
  ...YDELSER.map((y) => y.title),
  'Andet / jeg er ikke sikker',
]

function CustomSelect({
  value,
  onChange,
  error,
  dark,
}: {
  value: string
  onChange: (v: string) => void
  error?: string
  dark: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selected = value || null

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'w-full flex items-center justify-between py-3 font-body text-base outline-none border-0 border-b transition-colors',
          dark
            ? 'bg-transparent text-white border-white/20 hover:border-white/40 focus:border-gold'
            : 'bg-transparent text-dark border-dark/20 hover:border-dark/40 focus:border-gold',
          open && 'border-gold',
          !selected && (dark ? 'text-white/30' : 'text-dark/40'),
          error && 'border-gold',
        )}
      >
        <span>{selected ?? 'Vælg opgavetype'}</span>
        <ChevronDown
          size={16}
          className={cn(
            'shrink-0 transition-transform duration-200',
            dark ? 'text-white/40' : 'text-dark/40',
            open && 'rotate-180 text-gold',
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            'absolute left-0 right-0 top-full mt-1 z-50 overflow-hidden',
            'border border-gold/30',
            dark ? 'bg-[#1a1b1d]' : 'bg-white',
          )}
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.35)' }}
        >
          {OPTIONS.map((opt) => {
            const active = opt === selected
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => { onChange(opt); setOpen(false) }}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 text-left font-body text-sm transition-colors',
                  dark
                    ? 'text-white/80 hover:bg-white/5 hover:text-white'
                    : 'text-dark/80 hover:bg-gray-50 hover:text-dark',
                  active && (dark ? 'text-gold bg-white/5' : 'text-gold bg-gold/5'),
                )}
              >
                <span>{opt}</span>
                {active && <Check size={13} className="text-gold shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request-failed')
      reset()
      setSubmitted(true)
    } catch {
      setSubmitError(
        'Beskeden kunne ikke sendes lige nu. Prøv igen, eller ring direkte.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={`border-2 border-gold p-10 md:p-14 ${dark ? 'bg-white/5' : 'bg-white'}`}>
        <p className="label-caps text-gold">✦ Tak for din besked</p>
        <h3 className={`mt-4 font-display text-3xl md:text-4xl leading-tight ${dark ? 'text-white' : ''}`}>
          Vi <span className="italic">vender tilbage</span> hurtigst muligt.
        </h3>
        <p className={`mt-4 leading-relaxed ${dark ? 'text-white/60' : 'text-dark/70'}`}>
          Vi svarer inden for 24 timer. Har det hast, er du velkommen til at ringe direkte.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className={`mt-8 label-caps link-underline ${dark ? 'text-white/70' : 'text-dark'}`}
        >
          Send en ny besked
        </button>
      </div>
    )
  }

  const inputBase = dark
    ? 'w-full border-0 border-b border-white/20 bg-transparent py-3 text-white font-body outline-none transition-colors focus:border-gold placeholder:text-white/30'
    : 'w-full border-0 border-b border-dark/20 bg-transparent py-3 text-dark font-body outline-none transition-colors focus:border-gold placeholder:text-dark/40'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field label="Navn" error={errors.name?.message} dark={dark}>
        <input
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register('name')}
          className={cn(inputBase)}
          placeholder="Dit fulde navn"
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <Field label="Telefon" error={errors.phone?.message} dark={dark}>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!errors.phone}
            {...register('phone')}
            className={cn(inputBase)}
            placeholder="+45 ..."
          />
        </Field>
        <Field label="Email" error={errors.email?.message} dark={dark}>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
            {...register('email')}
            className={cn(inputBase)}
            placeholder="dig@email.dk"
          />
        </Field>
      </div>

      <Field label="Type opgave" error={errors.type?.message} dark={dark}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <CustomSelect
              value={field.value ?? ''}
              onChange={field.onChange}
              error={errors.type?.message}
              dark={dark}
            />
          )}
        />
      </Field>

      <Field label="Besked" error={errors.message?.message} dark={dark}>
        <textarea
          rows={3}
          aria-invalid={!!errors.message}
          {...register('message')}
          className={cn(inputBase, 'resize-none')}
          placeholder="Beskriv gerne opgaven, omfang og tidshorisont"
        />
      </Field>

      {submitError && (
        <p
          role="alert"
          className={`border-l-2 border-gold px-4 py-3 text-sm ${dark ? 'bg-white/5 text-white/80' : 'bg-gray-light/60 text-dark'}`}
        >
          {submitError}
        </p>
      )}

      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className={`label-caps flex items-center gap-2 ${dark ? 'text-white/50' : 'text-dark/60'}`}>
          <span aria-hidden className="text-gold">✦</span>
          Svar inden for 24 timer
        </p>
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting ? 'Sender ...' : 'Send besked'}
        </button>
      </div>

      <p className={`text-xs leading-relaxed ${dark ? 'text-white/40' : 'text-dark/55'}`}>
        Når du sender beskeden, behandler vi dine oplysninger som beskrevet i vores{' '}
        <Link
          href="/privatliv"
          className={`underline underline-offset-2 hover:text-gold ${dark ? 'text-white/55' : 'text-dark/75'}`}
        >
          privatlivspolitik
        </Link>
        . Vi bruger dem kun til at besvare din henvendelse.
      </p>
    </form>
  )
}

function Field({
  label,
  error,
  dark = false,
  children,
}: {
  label: string
  error?: string
  dark?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="block">
      <span className={`label-caps ${dark ? 'text-white/50' : 'text-dark/70'}`}>{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-xs text-gold">{error}</p>}
    </div>
  )
}
