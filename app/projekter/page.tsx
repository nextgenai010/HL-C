import type { Metadata } from 'next'
import { ProjekterGallery } from '@/components/sections/ProjekterGallery'
import { PROJEKTER } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projekter — Udvalgt tømrerarbejde i Storkøbenhavn',
  description:
    'Se udvalgte projekter fra Tømrerfirmaet H L Christiansen: nybyg, renovering, tag, vinduer, facader og terrasser udført i Herlev, Ballerup, Gladsaxe og det øvrige Storkøbenhavn.',
  alternates: { canonical: '/projekter' },
  openGraph: {
    url: 'https://hlchristiansen.dk/projekter',
    title: 'Projekter — Tømrermester H L Christiansen',
    description:
      'Udvalgte projekter — nybyg, renovering, tag, vinduer, facader og terrasser i Herlev og omegn.',
  },
}

export default function ProjekterSide() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: 'https://hlchristiansen.dk/' },
      { '@type': 'ListItem', position: 2, name: 'Projekter', item: 'https://hlchristiansen.dk/projekter' },
    ],
  }
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tømrerprojekter',
    itemListElement: PROJEKTER.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.description,
        image: `https://hlchristiansen.dk${p.image}`,
        contentLocation: { '@type': 'Place', name: p.location },
        dateCreated: String(p.year),
      },
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <ProjekterGallery />
    </>
  )
}
