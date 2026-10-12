import Image from 'next/image'
import { Parallax } from '@/components/ui/Parallax'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  /** May contain <br /> and an <em> for the gold accent half. */
  title: string
  description?: string
  image?: string
  imageAlt?: string
  className?: string
  children?: React.ReactNode
}

const delay = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties

export function PageHero({ eyebrow, title, description, image, imageAlt = '', className, children }: Props) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden bg-dark text-white',
        image ? 'flex min-h-[78svh] items-end pb-16 pt-32 md:min-h-[72vh] md:pb-24' : 'pb-16 pt-32 md:pb-24 md:pt-44',
        className,
      )}
    >
      {image && (
        <div className="absolute inset-0 -z-10">
          <Parallax strength={0.05}>
            <Image src={image} alt={imageAlt} fill priority quality={80} sizes="100vw" className="object-cover" />
          </Parallax>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,36,38,0.6)_0%,rgba(35,36,38,0.45)_25%,rgba(35,36,38,0.88)_55%,rgba(35,36,38,0.96)_100%)] md:bg-[linear-gradient(180deg,rgba(35,36,38,0.55)_0%,rgba(35,36,38,0.3)_35%,rgba(35,36,38,0.92)_100%)]" />
        </div>
      )}
      <div className="container-content w-full">
        <p className="rise eyebrow !text-gold-light" style={delay(0.05)}>{eyebrow}</p>
        <h1
          className="rise-move accent-em mt-3 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.02] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5rem]"
          style={delay(0.12)}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <p className="rise lead mt-6 max-w-2xl text-white/75" style={delay(0.22)}>
            {description}
          </p>
        )}
        {children && <div className="rise mt-8" style={delay(0.3)}>{children}</div>}
      </div>
    </section>
  )
}
