import { YDELSE_SLUGS } from './services'

export type Projekt = {
  slug: string
  /** Short caption describing what the photo shows. */
  title: string
  alt: string
  kategori: typeof YDELSE_SLUGS[number]
  kategoriLabel: string
  /** Only set where it is confirmed on the site; never guessed. */
  location?: string
  year?: number
  image: string
}

// Captions describe what each photo shows. Locations and years are left out
// unless they are stated elsewhere on the site.
export const PROJEKTER: Projekt[] = [
  {
    slug: 'terrasse-herlev-01',
    title: 'Trædæk ved vinterhaven',
    alt: 'Stort trædæk i træ bygget op ad en vinterhave med udsigt over haven',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    location: 'Herlev',
    year: 2024,
    image: '/images/projekter/img_0281.jpg',
  },
  {
    slug: 'traeskelet-01',
    title: 'Rejsning af træskelet',
    alt: 'Nyt træskelet med stolper og skråbånd rejst på støbt fundament',
    kategori: 'nybyg-tilbygninger',
    kategoriLabel: 'Nybyg & Tilbygninger',
    image: '/images/projekter/img_0282.jpg',
  },
  {
    slug: 'overdaekket-byggeplads-01',
    title: 'Byggeplads under overdækning',
    alt: 'Hus under stillads og teltoverdækning, mens taget bygges om',
    kategori: 'tag',
    kategoriLabel: 'Tag & Kviste',
    image: '/images/projekter/img_0283.jpg',
  },
  {
    slug: 'nye-spaer-01',
    title: 'Ny tagkonstruktion',
    alt: 'Nye spær i træ monteret under overdækning på byggepladsen',
    kategori: 'tag',
    kategoriLabel: 'Tag & Kviste',
    image: '/images/projekter/img_0284.jpg',
  },
  {
    slug: 'vinduer-murstenshus-01',
    title: 'Vinduer i murstensfacade',
    alt: 'Rødt murstenshus med sorte vinduer og indgangsparti',
    kategori: 'vinduer-doere',
    kategoriLabel: 'Vinduer & Døre',
    image: '/images/projekter/img_0285.jpg',
  },
  {
    slug: 'havehus-01',
    title: 'Havehus i træ',
    alt: 'Nyt havehus i lyst træ med dobbeltdør og ensidigt tag',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser & Udendørs',
    image: '/images/projekter/img_0286.jpg',
  },
  {
    slug: 'vinduer-murstenshus-02',
    title: 'Sorte vinduer, røde sten',
    alt: 'Facade i røde mursten med sorte sprossevinduer under tagudhænget',
    kategori: 'vinduer-doere',
    kategoriLabel: 'Vinduer & Døre',
    image: '/images/projekter/img_0287.jpg',
  },
  {
    slug: 'terrasse-trappe-01',
    title: 'Terrasse med brede trin',
    alt: 'Ny terrasse i trykimprægneret træ med brede trin ned til plænen',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    image: '/images/projekter/img_0288.jpg',
  },
  {
    slug: 'terrasse-trappe-02',
    title: 'Terrasse under tagudhæng',
    alt: 'Terrasse i træ i flere niveauer under husets overdækkede tagudhæng',
    kategori: 'terrasser',
    kategoriLabel: 'Terrasser',
    image: '/images/projekter/img_0289.jpg',
  },
]
