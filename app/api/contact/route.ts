import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { SITE } from '@/lib/site'

export const runtime = 'nodejs'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  type: z.string().min(1),
  message: z.string().min(10),
})

const FROM = process.env.CONTACT_FROM_EMAIL ?? 'tilbud@hlchristiansen.dk'
const TO = process.env.CONTACT_TO_EMAIL ?? SITE.email

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function ownerHtml(d: z.infer<typeof schema>) {
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
  try {
    const json = await req.json()
    data = schema.parse(json)
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
      html: ownerHtml(data),
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
