'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, FileText, Image as ImageIcon, Paperclip, X } from 'lucide-react'
import {
  ALLOWED_TYPES, CONTACT_ERRORS, CONTACT_OPTIONS, MAX_FILES, MAX_FILE_SIZE, MAX_TOTAL_FILE_SIZE,
  contactSchema, type ContactData,
} from '@/lib/contact'

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type Props = {
  /** Prefix for field ids, so several forms can share a page. */
  idPrefix?: string
  title?: string
  intro?: string
  headingAs?: 'h2' | 'h3'
  /** 'card' sits on dark/photo backgrounds; 'plain' renders without its own card. */
  variant?: 'card' | 'plain'
  autoFocus?: boolean
}

export function QuoteForm({
  idPrefix = 'hero',
  title = 'Lad os give dig et tilbud',
  intro = 'Fortæl os om din idé. Vi svarer inden for 24 timer på hverdage.',
  headingAs: Heading = 'h2',
  variant = 'card',
  autoFocus = false,
}: Props) {
  const id = (name: string) => `${idPrefix}-${name}`
  // The card sits in a wide column: pair email with the job type to keep the form short.
  const wide = variant === 'card'
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  useEffect(() => { if (sent) statusRef.current?.focus() }, [sent])
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: '' },
  })

  function addFiles(incoming: FileList) {
    setFileError(null)
    const next = [...files]
    for (const f of Array.from(incoming)) {
      if (next.length >= MAX_FILES) { setFileError(CONTACT_ERRORS['too-many-files']); break }
      if (!ALLOWED_TYPES.includes(f.type)) { setFileError(CONTACT_ERRORS['file-type-not-allowed']); continue }
      if (f.size > MAX_FILE_SIZE) { setFileError(CONTACT_ERRORS['file-too-large']); continue }
      if (next.some(e => e.name === f.name && e.size === f.size)) continue
      if (next.reduce((sum, e) => sum + e.size, 0) + f.size > MAX_TOTAL_FILE_SIZE) {
        setFileError(CONTACT_ERRORS['files-too-large'])
        continue
      }
      next.push(f)
    }
    setFiles(next)
  }

  function removeFile(idx: number) {
    setFiles(cur => cur.filter((_, i) => i !== idx))
    setFileError(null)
  }

  async function submit(data: ContactData) {
    setError(null)
    try {
      const fd = new FormData()
      fd.append('name', data.name)
      fd.append('phone', data.phone)
      fd.append('email', data.email)
      fd.append('type', data.type)
      fd.append('message', data.message)
      files.forEach(f => fd.append('files', f))
      const response = await fetch('/api/contact', { method: 'POST', body: fd })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        throw new Error(body?.error ?? 'send-failed')
      }
      reset()
      setFiles([])
      setSent(true)
    } catch (e) {
      const code = e instanceof Error ? e.message : ''
      setError(CONTACT_ERRORS[code] ?? 'send-failed')
    }
  }

  return (
    <div className={variant === 'card' ? 'quote-card' : undefined}>
      <Heading id={id('quote-heading')} className="font-display text-[26px] font-semibold leading-tight tracking-[-0.03em] text-dark sm:text-[30px]">{title}</Heading>
      <p className="mt-1.5 mb-5 text-[15px] leading-relaxed text-dark/65">{intro}</p>
      {sent ? (
        <div role="status" ref={statusRef} tabIndex={-1} className="py-10 text-center outline-none">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-light/15 text-gold"><Check aria-hidden size={26} strokeWidth={2.5} /></span>
          <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-dark">Tak for din forespørgsel</p>
          <p className="mt-3 text-sm text-dark/65">Vi har modtaget din besked og vender tilbage hurtigst muligt.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} noValidate aria-labelledby={id('quote-heading')} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3.5">
            {([
              ['name', 'Navn', 'text', 'name', 100],
              ['phone', 'Telefon', 'tel', 'tel', 30],
              ['email', 'Email', 'email', 'email', 254],
            ] as const).map(([name, label, type, autoComplete, maxLength]) => (
              <div key={name} className={name === 'email' && !wide ? 'sm:col-span-2' : ''}>
                <label htmlFor={id(name)} className="field-label">{label}</label>
                <input id={id(name)} autoFocus={autoFocus && name === 'name'} type={type} autoComplete={autoComplete} maxLength={maxLength} required
                  {...register(name)} className="field" aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? id(`${name}-error`) : undefined} />
                {errors[name] && <p id={id(`${name}-error`)} className="field-error">{errors[name]?.message}</p>}
              </div>
            ))}
            <div className={wide ? undefined : 'sm:col-span-2'}>
              <label htmlFor={id('type')} className="field-label">Hvad skal vi hjælpe med?</label>
              <select id={id('type')} {...register('type')} className="field" required aria-invalid={!!errors.type}
                aria-describedby={errors.type ? id('type-error') : undefined}>
                <option value="" disabled>Vælg opgavetype</option>
                {CONTACT_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
              {errors.type && <p id={id('type-error')} className="field-error">{errors.type.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor={id('message')} className="field-label">Kort om dit projekt</label>
            <textarea id={id('message')} {...register('message')} rows={wide ? 2 : 3} maxLength={10000} required
              placeholder="Hvad drømmer du om at få lavet?" className="field resize-none" aria-invalid={!!errors.message}
              aria-describedby={errors.message ? id('message-error') : undefined} />
            {errors.message && <p id={id('message-error')} className="field-error">{errors.message.message}</p>}
          </div>
          <div>
            <input ref={fileInputRef} id={id('files')} type="file" multiple accept={ALLOWED_TYPES.join(',')} className="sr-only"
              tabIndex={-1} aria-hidden onChange={e => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={files.length >= MAX_FILES}
              className="flex w-full items-center gap-2.5 rounded-xl border border-dashed border-dark/20 bg-white px-3.5 py-2.5 text-left text-[14px] text-dark/70 transition-colors hover:border-gold hover:text-dark disabled:opacity-50">
              <Paperclip size={15} aria-hidden className="shrink-0 text-gold" />
              <span className="flex-1">{files.length === 0 ? 'Vedhæft billeder' : `Tilføj flere (${files.length}/${MAX_FILES})`}</span>
              <span className="shrink-0 text-[11px] text-dark/65">Valgfrit · maks. 1,5 MB</span>
            </button>
            {files.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} title={`${f.name} (${formatBytes(f.size)})`}
                    className="flex max-w-full items-center gap-1.5 rounded-full bg-gray-light py-1 pl-2.5 pr-1 text-xs text-dark/70">
                    <span className="shrink-0 text-gold" aria-hidden>
                      {f.type === 'application/pdf' ? <FileText size={12} /> : <ImageIcon size={12} />}
                    </span>
                    <span className="max-w-[6.5rem] truncate">{f.name}</span>
                    <button type="button" onClick={() => removeFile(i)} aria-label={`Fjern ${f.name}`}
                      className="shrink-0 p-0.5 text-dark/45 transition-colors hover:text-gold">
                      <X size={12} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {fileError && <p role="alert" className="field-error">{fileError}</p>}
          </div>
          {error && (
            <p role="alert" className="text-sm text-dark">
              {error === 'send-failed'
                ? <>Beskeden kunne ikke sendes. Prøv igen, eller <Link href="/kontakt" className="underline">kontakt os her</Link>.</>
                : error}
            </p>
          )}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full !min-h-[52px] !text-[16px] disabled:opacity-60">
            <span>{isSubmitting ? 'Sender …' : 'Få et uforpligtende tilbud'}</span>
            <ArrowRight size={17} aria-hidden />
          </button>
          <p className="text-center text-[12px] leading-snug text-dark/65">Vi bruger kun dine oplysninger til at besvare din henvendelse. <Link href="/privatliv" className="underline underline-offset-2">Privatlivspolitik</Link>.</p>
        </form>
      )}
    </div>
  )
}
