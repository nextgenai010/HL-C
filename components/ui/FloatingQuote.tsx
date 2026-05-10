'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquarePlus } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { YDELSER } from '@/lib/services'
import { CustomSelectWidget } from './CustomSelectWidget'

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

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      reset()
      setSubmitted(true)
    } catch {
      // silent fail — user can try full contact page
    } finally {
      setSubmitting(false)
    }
  }

  function close() {
    setOpen(false)
    setTimeout(() => setSubmitted(false), 400)
  }

  const input = 'w-full border-0 border-b border-dark/15 bg-transparent py-2.5 text-dark text-sm font-body outline-none transition-colors focus:border-gold placeholder:text-dark/35'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Widget */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
            className="w-[340px] bg-white shadow-2xl border border-dark/8 overflow-hidden"
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
            className="flex items-center gap-2.5 bg-gold hover:bg-gold-light text-white px-5 py-3.5 shadow-lg transition-colors duration-300"
            style={{ boxShadow: '0 4px 24px rgba(212,175,55,0.35)' }}
            aria-label="Få et tilbud"
          >
            <MessageSquarePlus size={17} />
            <span className="label-caps text-white">Få et tilbud</span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}
