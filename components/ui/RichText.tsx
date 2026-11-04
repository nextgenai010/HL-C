import Link from 'next/link'
import { Fragment } from 'react'

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

/** Renders plain text with inline [tekst](/sti) links; http(s) targets open in a new tab. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0
    if (i > last) parts.push(text.slice(last, i))
    const cls = 'font-medium underline decoration-gold/60 underline-offset-[3px] transition-colors hover:decoration-gold'
    parts.push(
      /^https?:\/\//.test(m[2]) ? (
        <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className={cls}>
          {m[1]}
        </a>
      ) : (
        <Link key={i} href={m[2]} className={`${cls} text-dark`}>
          {m[1]}
        </Link>
      ),
    )
    last = i + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>
}

/** Strips [tekst](/sti) markup to plain text (for JSON-LD). */
export const plainText = (text: string) => text.replace(LINK, '$1')
