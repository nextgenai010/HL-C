import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingQuoteWrapper } from '@/components/ui/FloatingQuoteWrapper'
import { CookieConsent } from '@/components/ui/CookieConsent'
import { Analytics } from '@/components/analytics/Analytics'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SITE } from '@/lib/site'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
  preload: false,
})

const label = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-label',
  display: 'swap',
  preload: false,
})

export const viewport: Viewport = {
  themeColor: '#232426',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hlchristiansen.dk'),
  title: {
    default: `${SITE.name} — Tømrermester i ${SITE.location} & Storkøbenhavn`,
    template: `%s · ${SITE.name}`,
  },
  description: `Verificeret tømrermester med svendebrev i ${SITE.location}. Nybyg, renovering, tag, vinduer & terrasser i hele Storkøbenhavn. Svar inden 24 timer.`,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: 'https://hlchristiansen.dk' }],
  creator: SITE.name,
  publisher: SITE.name,
  generator: 'Next.js',
  category: 'Construction',
  keywords: [
    'tømrer',
    'tømrermester',
    'tømrer Herlev',
    'tømrer Storkøbenhavn',
    'tømrer København',
    'tømrer Ballerup',
    'tømrer Gladsaxe',
    'svendebrev',
    'verificeret tømrer',
    'nybyg',
    'tilbygning',
    'renovering',
    'tagudskiftning',
    'tagrenovering',
    'kviste',
    'vinduer',
    'døre',
    'facader',
    'træbeklædning',
    'terrasser',
    'trædæk',
    'carport',
    'H L Christiansen',
    'HL Christiansen',
    'Tømrerfirmaet H L Christiansen',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'da-DK': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    url: 'https://hlchristiansen.dk',
    siteName: SITE.name,
    title: `${SITE.name} — Tømrermester i ${SITE.location} & Storkøbenhavn`,
    description: `Verificeret tømrermester med svendebrev. Nybyg, renovering, tag, vinduer, facader og terrasser i ${SITE.location} og omegn.`,
    images: [
      {
        url: '/images/kategorier/renovering.png',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — håndværk med svendebrev`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Tømrermester i ${SITE.location}`,
    description: SITE.tagline,
    images: ['/images/kategorier/renovering.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: '/icon.png',
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  verification: {
    // Add Google Search Console verification token via env when available.
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const SITE_URL = 'https://hlchristiansen.dk'

  const businessLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: SITE.name,
    alternateName: [SITE.shortName, 'HL Christiansen Tømrer', 'Tømrer HL Christiansen'],
    legalName: SITE.name,
    description:
      'Verificeret tømrermester med svendebrev. Vi udfører nybyg, tilbygninger, renovering, tag, vinduer, døre, facader og terrasser i Herlev og hele Storkøbenhavn.',
    slogan: SITE.tagline,
    email: SITE.email,
    telephone: SITE.phoneHref,
    image: `${SITE_URL}/images/kategorier/renovering.png`,
    logo: `${SITE_URL}/images/logo/logo-trans.png`,
    url: SITE_URL,
    priceRange: '$$',
    currenciesAccepted: 'DKK',
    paymentAccepted: 'Bankoverførsel, Faktura, MobilePay',
    foundingDate: '2018',
    founder: {
      '@type': 'Person',
      name: 'Jonatan Hintze Ladewig Christiansen',
      jobTitle: 'Tømrermester',
    },
    vatID: `DK${SITE.cvr}`,
    taxID: SITE.cvr,
    identifier: { '@type': 'PropertyValue', name: 'CVR', value: SITE.cvr },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.location,
      postalCode: SITE.address.zip,
      addressRegion: SITE.region,
      addressCountry: 'DK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.7311,
      longitude: 12.4392,
    },
    areaServed: [
      { '@type': 'City', name: 'Herlev' },
      { '@type': 'City', name: 'Ballerup' },
      { '@type': 'City', name: 'Gladsaxe' },
      { '@type': 'City', name: 'København' },
      { '@type': 'City', name: 'Frederiksberg' },
      { '@type': 'City', name: 'Rødovre' },
      { '@type': 'City', name: 'Glostrup' },
      { '@type': 'City', name: 'Lyngby' },
      { '@type': 'AdministrativeArea', name: 'Storkøbenhavn' },
      { '@type': 'AdministrativeArea', name: 'Region Hovedstaden' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
    knowsAbout: [
      'Tømrerarbejde',
      'Nybyg',
      'Tilbygninger',
      'Renovering',
      'Tagarbejde',
      'Tagudskiftning',
      'Kviste',
      'Vinduer og døre',
      'Facadearbejde',
      'Træbeklædning',
      'Terrasser',
      'Carporte',
      'Efterisolering',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tømrer-ydelser',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Nybyg & Tilbygninger' },
        { '@type': 'OfferCatalog', name: 'Renovering & Ombygning' },
        { '@type': 'OfferCatalog', name: 'Tag & Kviste' },
        { '@type': 'OfferCatalog', name: 'Vinduer & Døre' },
        { '@type': 'OfferCatalog', name: 'Facader & Beklædning' },
        { '@type': 'OfferCatalog', name: 'Terrasser & Udendørs' },
      ],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneHref,
        contactType: 'customer service',
        areaServed: 'DK',
        availableLanguage: ['Danish', 'da'],
        email: SITE.email,
      },
    ],
    sameAs: [SITE.instagram],
  }

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: 'da-DK',
    publisher: { '@id': `${SITE_URL}/#business` },
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo-trans.png`,
    sameAs: [SITE.instagram],
  }

  return (
    <html lang="da" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="geo.region" content="DK-84" />
        <meta name="geo.placename" content="Herlev" />
        <meta name="geo.position" content="55.7311;12.4392" />
        <meta name="ICBM" content="55.7311, 12.4392" />
      </head>
      <body className="antialiased bg-white text-dark">
        <a href="#main" className="skip-link">Spring til indhold</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingQuoteWrapper />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <CookieConsent />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  )
}
