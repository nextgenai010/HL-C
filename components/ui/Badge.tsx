import { cn } from '@/lib/utils'

type Props = {
  label?: string
  sub?: string
  className?: string
}

export function SvendebrevBadge({
  label = 'Verificeret Tømrermester',
  sub = 'Svendebrev',
  className,
}: Props) {
  return (
    <div
      data-testid="svendebrev-badge"
      className={cn(
        'inline-flex items-center gap-4 border border-gold bg-white/80 backdrop-blur-sm px-5 py-3',
        className,
      )}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className="shrink-0"
        aria-hidden
      >
        <path
          d="M14 2.5l3.4 6.9 7.6 1.1-5.5 5.4 1.3 7.6L14 19.9l-6.8 3.6 1.3-7.6L3 10.5l7.6-1.1L14 2.5z"
          stroke="#B8960C"
          strokeWidth="1.2"
          fill="rgba(184,150,12,0.08)"
        />
      </svg>
      <div className="text-left">
        <p className="label-caps text-gold">{label}</p>
        <p className="font-display text-lg leading-tight text-dark">{sub}</p>
      </div>
    </div>
  )
}
