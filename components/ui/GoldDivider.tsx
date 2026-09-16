import { cn } from '@/lib/utils'

export function GoldDivider({ className, width = 60, align = 'left', variant = 'gold' }: {
  className?: string; width?: number; align?: 'left' | 'center'; variant?: 'gold' | 'gold-light' | 'dark'
}) {
  return <span aria-hidden className={cn('block h-px', variant === 'dark' ? 'bg-dark' : variant === 'gold-light' ? 'bg-gold-light' : 'bg-gold', align === 'center' && 'mx-auto', className)} style={{ width }} />
}
