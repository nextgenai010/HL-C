'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquarePlus, Paperclip, FileText, Image as ImageIcon } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { YDELSER } from '@/lib/services'
import { CustomSelectWidget } from './CustomSelectWidget'

const MAX_FILES = 2
const MAX_FILE_SIZE = 1.5 * 1024 * 1024
const ACCEPT = 'image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,application/pdf'
const ACCEPTED_TYPES = ACCEPT.split(',')

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const schema = z.object({
  name: z.string().min(2, 'Angiv dit navn'),
  phone: z.string().min(6, 'Angiv et telefonnummer'),
  email: z.string().email('Ugyldig email'),
  type: z.string().min(1, 'Vælg en opgavetype'),
  message: z.string().min(5, 'Beskriv kort opgaven'),
})

type FormData = z.infer<typeof schema>

const ease = [0.16, 1, 0.3, 1] as const

export function FloatingQuote() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function addFiles(incoming: FileList | File[]) {
    setFileError(null)
    const arr = Array.from(incoming)
    const next = [...files]
    for (const f of arr) {
      if (next.length >= MAX_FILES) { setFileError(`Maks ${MAX_FILES} filer.`); break }
      if (!ACCEPTED_TYPES.includes(f.type)) { setFileError(`Format ikke understøttet.`); continue }
      if (f.size > MAX_FILE_SIZE) { setFileError(`For stor — maks 1,5 MB.`); continue }
      if (next.some((e) => e.name === f.name && e.size === f.size)) continue
      next.push(f)
    }
    setFiles(next)
  }

  function removeFile(idx: number) {
    setFiles((cur) => cur.filter((_, i) => i !== idx))
    setFileError(null)
  }

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    try {
      const fd = new globalThis.FormData()
      fd.append('name', data.name)
      fd.append('phone', data.phone)
      fd.append('email', data.email)
      fd.append('type', data.type)
      fd.append('message', data.message)
      files.forEach((f) => fd.append('files', f))
      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      reset()
      setFiles([])
      setSubmitted(true)
    } catch {
      // silent fail — user can try full contact page
    } finally {
      setSubmitting(false)
    }
  }

  function close() {
    setOpen(false)
    setTimeout(() => { setSubmitted(false); setFiles([]); setFileError(null) }, 400)
  }

  const input = 'w-full border-0 border-b border-dark/15 bg-transparent py-2.5 text-dark text-sm font-body outline-none transition-colors focus:border-gold placeholder:text-dark/35'

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-2rem)]">

      {/* Widget */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
            className="w-[min(340px,calc(100vw-2rem))] bg-white shadow-2xl border border-dark/8 overflow-hidden"
            style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.18)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-dark/8">
              <div>
                <p className="font-display text-lg leading-tight">Få et tilbud</p>
                <p className="text-[11px] text-dark/40 mt-0.5 font-body">Svar inden for 24 timer</p>
              </div>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center text-dark/40 hover:text-dark transition-colors"
                aria-label="Luk"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              {submitted ? (
                <div className="py-4 text-center">
                  <p className="label-caps text-gold mb-2">✦ Tak!</p>
                  <p className="font-display text-xl mb-1">Vi vender tilbage snarest.</p>
                  <p className="text-sm text-dark/50 mb-4">Tjek din indbakke inden for 24 timer.</p>
                  <button
                    onClick={close}
                    className="label-caps text-dark/50 hover:text-dark transition-colors"
                  >
                    Luk
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      placeholder="Navn"
                      {...register('name')}
                      className={cn(input, errors.name && 'border-gold')}
                    />
                    {errors.name && <p className="mt-1 text-[10px] text-gold">{errors.name.message}</p>}
                  </div>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="tel"
                        placeholder="Telefon"
                        {...register('phone')}
                        className={cn(input, errors.phone && 'border-gold')}
                      />
                      {errors.phone && <p className="mt-1 text-[10px] text-gold">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                        className={cn(input, errors.email && 'border-gold')}
                      />
                      {errors.email && <p className="mt-1 text-[10px] text-gold">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <CustomSelectWidget
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          error={!!errors.type}
                        />
                      )}
                    />
                    {errors.type && <p className="mt-1 text-[10px] text-gold">{errors.type.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Beskriv kort opgaven"
                      {...register('message')}
                      className={cn(input, 'resize-none', errors.message && 'border-gold')}
                    />
                    {errors.message && <p className="mt-1 text-[10px] text-gold">{errors.message.message}</p>}
                  </div>

                  {/* File upload */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={ACCEPT}
                      className="sr-only"
                      onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={files.length >= MAX_FILES}
                      className="flex items-center gap-2 text-dark/50 hover:text-gold text-xs transition-colors disabled:opacity-40"
                    >
                      <Paperclip size={13} className="shrink-0" />
                      <span>
                        {files.length === 0
                          ? 'Vedhæft billeder / PDF'
                          : `Tilføj · ${files.length}/${MAX_FILES} valgt`}
                      </span>
                    </button>

                    {files.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {files.map((f, i) => (
                          <li key={`${f.name}-${i}`} className="flex items-center gap-2 text-[11px] text-dark/60 bg-gray-50 px-2 py-1 border border-dark/8">
                            <span className="text-gold shrink-0">
                              {f.type === 'application/pdf' ? <FileText size={11} /> : <ImageIcon size={11} />}
                            </span>
                            <span className="flex-1 truncate">{f.name}</span>
                            <span className="shrink-0 text-dark/35">{formatBytes(f.size)}</span>
                            <button type="button" onClick={() => removeFile(i)} aria-label={`Fjern ${f.name}`} className="shrink-0 text-dark/35 hover:text-gold transition-colors">
                              <X size={11} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {fileError && <p className="mt-1 text-[10px] text-gold">{fileError}</p>}
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-primary disabled:opacity-60 justify-center"
                    >
                      <span>{submitting ? 'Sender ...' : 'Send forespørgsel'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.4, ease }}
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-2 sm:gap-2.5 bg-gold hover:bg-gold-light text-white px-4 sm:px-5 py-3 sm:py-3.5 shadow-lg transition-colors duration-300"
            style={{ boxShadow: '0 4px 24px rgba(212,175,55,0.35)' }}
            aria-label="Få et tilbud"
          >
            <MessageSquarePlus size={16} />
            <span className="label-caps text-white text-[10px] sm:text-xs">Få et tilbud</span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}
