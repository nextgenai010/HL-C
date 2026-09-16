'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight, Check, FileText, Image as ImageIcon, Paperclip, X } from 'lucide-react'
import {
  ALLOWED_TYPES, CONTACT_ERRORS, CONTACT_OPTIONS, MAX_FILES, MAX_FILE_SIZE, MAX_TOTAL_FILE_SIZE,
  contactSchema, type ContactData,
} from '@/lib/contact'

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function HeroQuoteForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    <div className="hero-quote-card">
      <p className="label-caps text-gold mb-3">Dit næste projekt</p>
      <h2 id="hero-quote-heading" className="font-display text-[32px] leading-tight text-dark">Lad os give dig et tilbud</h2>
      <p className="mt-2 mb-6 text-sm leading-relaxed text-dark/65">Fortæl os om din idé. Vi svarer inden for 24 timer på hverdage.</p>
      {sent ? (
        <div role="status" className="py-10 text-center">
          <Check aria-hidden className="mx-auto mb-4 text-gold" size={32} />
          <p className="font-display text-2xl text-dark">Tak for din forespørgsel</p>
          <p className="mt-3 text-sm text-dark/65">Vi har modtaget din besked og vender tilbage hurtigst muligt.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} noValidate aria-labelledby="hero-quote-heading" className="hero-quote-form space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3.5">
            {([
              ['name', 'Navn', 'text', 'name', 100],
              ['phone', 'Telefon', 'tel', 'tel', 30],
              ['email', 'Email', 'email', 'email', 254],
            ] as const).map(([name, label, type, autoComplete, maxLength]) => (
              <div key={name} className={name === 'email' ? 'sm:col-span-2' : ''}>
                <label htmlFor={`hero-${name}`} className="hero-field-label">{label}</label>
                <input id={`hero-${name}`} type={type} autoComplete={autoComplete} maxLength={maxLength} required
                  {...register(name)} className="hero-field" aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `hero-${name}-error` : undefined} />
                {errors[name] && <p id={`hero-${name}-error`} className="hero-field-error">{errors[name]?.message}</p>}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="hero-type" className="hero-field-label">Hvad skal vi hjælpe med?</label>
              <select id="hero-type" {...register('type')} className="hero-field" required aria-invalid={!!errors.type}
                aria-describedby={errors.type ? 'hero-type-error' : undefined}>
                <option value="" disabled>Vælg opgavetype</option>
                {CONTACT_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
              {errors.type && <p id="hero-type-error" className="hero-field-error">{errors.type.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="hero-message" className="hero-field-label">Kort om dit projekt</label>
            <textarea id="hero-message" {...register('message')} rows={2} maxLength={10000} required
              placeholder="Hvad drømmer du om at få lavet?" className="hero-field resize-none" aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'hero-message-error' : undefined} />
            {errors.message && <p id="hero-message-error" className="hero-field-error">{errors.message.message}</p>}
          </div>
          <div>
            <input ref={fileInputRef} id="hero-files" type="file" multiple accept={ALLOWED_TYPES.join(',')} className="sr-only"
              tabIndex={-1} aria-hidden onChange={e => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={files.length >= MAX_FILES}
              className="flex w-full items-center gap-2 rounded-md border border-dashed border-dark/25 bg-white px-3 py-2 text-left text-sm text-dark/70 transition-colors hover:border-gold hover:text-dark disabled:opacity-50">
              <Paperclip size={15} aria-hidden className="shrink-0 text-gold" />
              <span className="flex-1">{files.length === 0 ? 'Vedhæft billeder' : `Tilføj flere (${files.length}/${MAX_FILES})`}</span>
              <span className="shrink-0 text-[11px] text-dark/50">Valgfrit · maks. 1,5 MB</span>
            </button>
            {files.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} title={`${f.name} (${formatBytes(f.size)})`}
                    className="flex max-w-full items-center gap-1.5 rounded border border-dark/10 bg-white py-1 pl-2 pr-1 text-xs text-dark/70">
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
            {fileError && <p role="alert" className="hero-field-error">{fileError}</p>}
          </div>
          {error && (
            <p role="alert" className="text-sm text-dark">
              {error === 'send-failed'
                ? <>Beskeden kunne ikke sendes. Prøv igen, eller <Link href="/kontakt" className="underline">kontakt os her</Link>.</>
                : error}
            </p>
          )}
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full gap-3 disabled:opacity-60">
            <span>{isSubmitting ? 'Sender …' : 'Få et uforpligtende tilbud'}</span>
            <ArrowUpRight size={17} aria-hidden />
          </button>
          <p className="text-[11px] leading-snug text-dark/60">Vi bruger kun dine oplysninger til at besvare din henvendelse. <Link href="/privatliv" className="underline underline-offset-2">Privatlivspolitik</Link>.</p>
        </form>
      )}
    </div>
  )
}
