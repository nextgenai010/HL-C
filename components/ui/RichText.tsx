import Link from 'next/link'
import { Fragment } from 'react'

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

/** Renders plain text with inline [tekst](/sti) links as Next.js links. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0
    if (i > last) parts.push(text.slice(last, i))
    parts.push(
      <Link key={i} href={m[2]} className="font-medium text-dark underline decoration-gold/60 underline-offset-[3px] transition-colors hover:decoration-gold">
        {m[1]}
      </Link>,
    )
    last = i + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>
}

/** Strips [tekst](/sti) markup to plain text (for JSON-LD). */
export const plainText = (text: string) => text.replace(LINK, '$1')
