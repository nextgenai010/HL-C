# Tømrerfirmaet H L Christiansen — Hjemmeside

Officiel hjemmeside for **Tømrerfirmaet H L Christiansen** — verificeret tømrermester med svendebrev i Herlev og Storkøbenhavn.

Domæne: [hlchristiansen.dk](https://hlchristiansen.dk)

## Tech stack

- **Framework:** Next.js 14 (App Router) · React 18 · TypeScript
- **Styling:** Tailwind CSS · Cormorant Garamond · DM Sans · Barlow Condensed
- **Animation:** Framer Motion
- **Formular:** React Hook Form + Zod + Resend (transaktionel mail)
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4 (samtykkebaseret)

## Kom i gang

```bash
npm install
cp .env.example .env.local   # udfyld nøgler
npm run dev                  # http://localhost:3000
```

## Scripts

| Kommando | Formål |
| --- | --- |
| `npm run dev` | Lokal udviklingsserver |
| `npm run build` | Produktionsbuild |
| `npm run start` | Start produktionsbuild |
| `npm run lint` | ESLint |
| `npm run test:visual` | Playwright visuelle tests |

## Miljøvariabler

Se `.env.example`. Kort version:

- `RESEND_API_KEY` — kræves for at kontaktformularen kan sende mail.
- `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` — kontaktformular afsender / modtager.

## Deploy til Vercel

1. Importér repoet på [vercel.com/new](https://vercel.com/new).
2. Tilføj env-variabler under **Project → Settings → Environment Variables**.
3. Bind domænet `hlchristiansen.dk` (og `www.hlchristiansen.dk`) under **Domains**.
4. Sæt en 308-redirect fra `www → apex` (eller omvendt — vælg én kanonisk).

## SEO / AI SEO

- **Metadata** og **Open Graph** sættes per route via `generateMetadata` / `metadata`.
- **Strukturerede data:** `LocalBusiness`, `Organization`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, `ItemList`, `ContactPage`, `Person`.
- **Sitemap** og **robots.txt** genereres automatisk via Next.js metadata-routes.
- **AI SEO:** `public/llms.txt` indeholder en let-citerbar opsummering for ChatGPT, Claude, Perplexity m.fl. Robots.txt tillader eksplicit GPTBot, ClaudeBot, PerplexityBot, Google-Extended m.fl.

## Licens

© Tømrerfirmaet H L Christiansen. Alle rettigheder forbeholdes.

Designet og bygget af [NextgenAI](https://nextgen-ai.dk).
