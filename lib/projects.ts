import { YDELSE_SLUGS } from './services'

export type Projekt = {
  slug: string
  title: string
  kategori: typeof YDELSE_SLUGS[number]
  kategoriLabel: string
  location: string
  year: number
  description: string
  image: string
}

export const PROJEKTER: Projekt[] = [
  {
    slug: 'terrasse-herlev-01',
    title: 'Stor trædæk med haveudsigt',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    location: 'Herlev',
    year: 2024,
    description: 'Rummeligt trædæk i hardwood opført i forbindelse med eksisterende vinterhave. Naturlig integration i haven.',
    image: '/images/projekter/img_0281.jpg',
  },
  {
    slug: 'terrasse-ballerup-01',
    title: 'Hardwood terrasse med kant',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    location: 'Ballerup',
    year: 2024,
    description: 'Præcist udført terrasse med rene afslutninger og solid konstruktion under plankebelægningen.',
    image: '/images/projekter/img_0282.jpg',
  },
  {
    slug: 'terrasse-gladsaxe-01',
    title: 'Udendørs arbejde i detaljen',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    location: 'Gladsaxe',
    year: 2024,
    description: 'Fokus på præcision i hvert enkelt samling og afslutning — håndværk der holder.',
    image: '/images/projekter/img_0283.jpg',
  },
  {
    slug: 'projekt-04',
    title: 'Tømrerarbejde på stedet',
    kategori: 'nybyg-tilbygninger',
    kategoriLabel: 'Nybyg',
    location: 'Herlev',
    year: 2025,
    description: 'Professionelt tømrerarbejde udført på byggeplads med svendebrev bag hvert led.',
    image: '/images/projekter/img_0284.jpg',
  },
  {
    slug: 'projekt-05',
    title: 'Konstruktion i detaljen',
    kategori: 'nybyg-tilbygninger',
    kategoriLabel: 'Nybyg',
    location: 'Herlev',
    year: 2025,
    description: 'Solid konstruktion bygget fra bunden med fokus på holdbarte materialer og korrekt udførelse.',
    image: '/images/projekter/img_0285.jpg',
  },
  {
    slug: 'projekt-06',
    title: 'Udendørs tømrerværk',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    location: 'Ballerup',
    year: 2025,
    description: 'Omhyggeligt udført udendørs projekt med præcise mål og rene linjer hele vejen rundt.',
    image: '/images/projekter/img_0286.jpg',
  },
  {
    slug: 'projekt-07',
    title: 'Håndværk i praksis',
    kategori: 'renovering',
    kategoriLabel: 'Renovering',
    location: 'Gladsaxe',
    year: 2025,
    description: 'Renoveringsopgave udført med blik for detaljen og respekt for det eksisterende.',
    image: '/images/projekter/img_0287.jpg',
  },
  {
    slug: 'projekt-08',
    title: 'Professionel udførelse',
    kategori: 'renovering',
    kategoriLabel: 'Renovering',
    location: 'Herlev',
    year: 2025,
    description: 'Tømrerarbejde leveret til tiden og inden for budgettet — med kvalitet der taler for sig selv.',
    image: '/images/projekter/img_0288.jpg',
  },
  {
    slug: 'projekt-09',
    title: 'Afsluttet med omhu',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    location: 'Herlev',
    year: 2025,
    description: 'Hvert projekt afsluttes med en grundig gennemgang — så afleveringen er uden åbne punkter.',
    image: '/images/projekter/img_0289.jpg',
  },
]
