import { cn } from '@/lib/utils'

type RevealProps = {
  children?: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  clip?: boolean
  amount?: number
}

export function Reveal({ children, className }: RevealProps) {
  return <div className={cn(className)}>{children}</div>
}
