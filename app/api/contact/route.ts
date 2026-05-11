import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { SITE } from '@/lib/site'

export const runtime = 'nodejs'
export const maxDuration = 30

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  type: z.string().min(1),
  message: z.string().min(10),
})

const FROM = process.env.CONTACT_FROM_EMAIL ?? 'tilbud@hlchristiansen.dk'
const TO = process.env.CONTACT_TO_EMAIL ?? SITE.email

const MAX_FILES = 3
const MAX_FILE_SIZE = 1.5 * 1024 * 1024 // 1.5MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/pdf',
]

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function ownerHtml(d: z.infer<typeof schema>, files: { name: string; size: number }[]) {
  const filesRow = files.length
    ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Vedhæftninger</td><td style="padding:8px 0">${files
        .map((f) => `${escapeHtml(f.name)} <span style="color:#999">(${formatBytes(f.size)})</span>`)
        .join('<br>')}</td></tr>`
    : ''
  return `
<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f7f6f3;color:#1a1b1d">
  <div style="border-top:3px solid #c8a96a;background:#fff;padding:28px">
    <p style="letter-spacing:.18em;text-transform:uppercase;font-size:12px;color:#c8a96a;margin:0 0 8px">Ny forespørgsel</p>
    <h1 style="font-family:Georgia,serif;font-size:24px;line-height:1.25;margin:0 0 16px">${escapeHtml(d.type)}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:8px 0;color:#666;width:120px">Navn</td><td style="padding:8px 0">${escapeHtml(d.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#666">Telefon</td><td style="padding:8px 0"><a href="tel:${escapeHtml(d.phone)}" style="color:#1a1b1d">${escapeHtml(d.phone)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(d.email)}" style="color:#1a1b1d">${escapeHtml(d.email)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#666;vertical-align:top">Besked</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(d.message)}</td></tr>
      ${filesRow}
    </table>
  </div>
  <p style="font-size:11px;color:#999;margin:16px 0 0;text-align:center">Sendt fra kontaktformularen på ${SITE.name}</p>
</div>`
}

function customerHtml(d: z.infer<typeof schema>) {
  return `
<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f7f6f3;color:#1a1b1d">
  <div style="border-top:3px solid #c8a96a;background:#fff;padding:28px">
    <p style="letter-spacing:.18em;text-transform:uppercase;font-size:12px;color:#c8a96a;margin:0 0 8px">✦ Tak for din besked</p>
    <h1 style="font-family:Georgia,serif;font-size:24px;line-height:1.3;margin:0 0 12px">Vi vender tilbage hurtigst muligt</h1>
    <p style="font-size:15px;line-height:1.6;color:#444;margin:0 0 16px">
      Hej ${escapeHtml(d.name.split(' ')[0])},<br><br>
      Tak fordi du skrev til os om <strong>${escapeHtml(d.type.toLowerCase())}</strong>. Vi har modtaget din forespørgsel og vender tilbage inden for 24 timer.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#444;margin:0 0 24px">
      Har det hast, er du velkommen til at ringe direkte på <a href="tel:${SITE.phoneHref}" style="color:#1a1b1d">${SITE.phone}</a>.
    </p>
    <div style="border-top:1px solid #eee;padding-top:16px;font-size:13px;color:#666">
      <p style="margin:0 0 4px"><strong style="color:#1a1b1d">${SITE.name}</strong></p>
      <p style="margin:0">${SITE.location} · CVR ${SITE.cvr}</p>
    </div>
  </div>
</div>`
}

export async function POST(req: Request) {
  let data: z.infer<typeof schema>
  let attachments: { filename: string; content: Buffer }[] = []
  let fileMeta: { name: string; size: number }[] = []

  try {
    const contentType = req.headers.get('content-type') ?? ''

    if (contentType.includes('application/json')) {
      // Backwards-compatible: pure JSON without files
      const json = await req.json()
      data = schema.parse(json)
    } else {
      // multipart/form-data with optional files
      const formData = await req.formData()
      data = schema.parse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        type: formData.get('type'),
        message: formData.get('message'),
      })

      const raw = formData.getAll('files').filter((f): f is File => f instanceof File)
      if (raw.length > MAX_FILES) {
        return NextResponse.json({ ok: false, error: 'too-many-files' }, { status: 400 })
      }
      for (const f of raw) {
        if (f.size === 0) continue
        if (f.size > MAX_FILE_SIZE) {
          return NextResponse.json({ ok: false, error: 'file-too-large' }, { status: 400 })
        }
        if (!ALLOWED_TYPES.includes(f.type)) {
          return NextResponse.json({ ok: false, error: 'file-type-not-allowed' }, { status: 400 })
        }
        const buf = Buffer.from(await f.arrayBuffer())
        attachments.push({ filename: f.name, content: buf })
        fileMeta.push({ name: f.name, size: f.size })
      }
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY mangler')
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  try {
    const ownerRes = await resend.emails.send({
      from: `${SITE.name} <${FROM}>`,
      to: [TO],
      replyTo: data.email,
      subject: `Ny forespørgsel: ${data.type} — ${data.name}`,
      html: ownerHtml(data, fileMeta),
      attachments: attachments.length ? attachments : undefined,
    })

    if (ownerRes.error) {
      console.error('[contact] owner-mail fejlede', ownerRes.error)
      return NextResponse.json({ ok: false, error: 'send-failed' }, { status: 502 })
    }

    await resend.emails.send({
      from: `${SITE.name} <${FROM}>`,
      to: [data.email],
      replyTo: TO,
      subject: 'Tak for din besked — vi vender tilbage',
      html: customerHtml(data),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 })
  }
}
