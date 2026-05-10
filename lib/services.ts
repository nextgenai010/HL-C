export type Ydelse = {
  slug: string
  title: string
  short: string
  image: string
  imageWidth: number
  imageHeight: number
  bullets: string[]
  intro: string
}

export const YDELSER: Ydelse[] = [
  {
    slug: 'nybyg-tilbygninger',
    title: 'Nybyg & Tilbygninger',
    short: 'Huse, carporte, udhuse, garager og overdækninger bygget fra bunden.',
    image: '/images/kategorier/nybyg-tilbygninger.jpg',
    imageWidth: 1920,
    imageHeight: 1280,
    intro:
      'Fra fundament til tagryg. Vi håndterer nybyg og tilbygninger med samme omhu som vores egne huse — præcision i hvert samling, korrekt materialevalg og tæt dialog gennem hele forløbet.',
    bullets: [
      'Nybyggeri af helårshuse og sommerhuse',
      'Tilbygninger og udvidelser til eksisterende boliger',
      'Carporte, garager og udhuse',
      'Overdækninger og havestuer',
      'Konstruktionsberegninger og myndighedshåndtering',
    ],
  },
  {
    slug: 'renovering',
    title: 'Renovering & Ombygning',
    short: 'Indvendig renovering, vægflytning, gulve og lofter med karakter.',
    image: '/images/kategorier/renovering.png',
    imageWidth: 1920,
    imageHeight: 1280,
    intro:
      'Gamle huse gemmer på sjæl. Vi renoverer med respekt for den eksisterende bygning og løfter niveauet uden at miste karakter — uanset om det er én væg eller hele boligen.',
    bullets: [
      'Indvendig renovering og ombygning',
      'Fjernelse af bærende og ikke-bærende vægge',
      'Gulve, lofter og paneler',
      'Statisk vurdering ved konstruktionsændringer',
      'Koordinering med el, VVS og maler',
    ],
  },
  {
    slug: 'tag',
    title: 'Tag & Kviste',
    short: 'Tagudskiftning, renovering, kviste og tagterrasser.',
    image: '/images/kategorier/tag.jpeg',
    imageWidth: 1920,
    imageHeight: 1280,
    intro:
      'Taget beskytter alt, der står under det. Vi udfører fuld tagudskiftning, lokale reparationer og tilbygning af kviste — med tegl, tagpap, skifer eller stål efter husets karakter.',
    bullets: [
      'Tagudskiftning og tagrenovering',
      'Kviste og skotrender',
      'Tagterrasser og tagaltaner',
      'Undertag, lægter og isolering',
      'Tagrender, inddækninger og ovenlys',
    ],
  },
  {
    slug: 'vinduer-doere',
    title: 'Vinduer & Døre',
    short: 'Udskiftning og isætning — standard og specialmål.',
    image: '/images/kategorier/vinduer-doere.png',
    imageWidth: 1920,
    imageHeight: 1280,
    intro:
      'Nye vinduer og døre giver bedre varmeøkonomi, mere dagslys og et løft af facaden. Vi rådgiver om materialer og mål, og indsætter med tætte fuger og præcise lysninger.',
    bullets: [
      'Udskiftning af vinduer og terrassedøre',
      'Yderdøre, skydedøre og foldedøre',
      'Specialmål og arkitekttegnede løsninger',
      'Tætning og efterisolering ved karmen',
      'Ind- og udvendige lysninger',
    ],
  },
  {
    slug: 'facader',
    title: 'Facader & Beklædning',
    short: 'Træbeklædning, facaderenovering og efterisolering.',
    image: '/images/kategorier/facader.png',
    imageWidth: 1920,
    imageHeight: 1280,
    intro:
      'En ny facade skifter husets udtryk fuldstændigt. Vi arbejder med træbeklædning i brædder og plader, og tilfører ofte efterisolering i samme arbejdsgang — så energiregnskabet følger med.',
    bullets: [
      'Træbeklædning i lærk, cedertræ og fyr',
      'Facaderenovering og pudsreparation',
      'Efterisolering af ydervægge',
      'Sokkel, sternbrædder og vindskeder',
      'Vedligehold og oliebehandling',
    ],
  },
  {
    slug: 'terrasser',
    title: 'Terrasser & Udendørs',
    short: 'Trædæk, pergolaer, havehuse og overdækninger.',
    image: '/images/kategorier/terrasser.png',
    imageWidth: 1920,
    imageHeight: 1280,
    intro:
      'Udendørs rum der holder. Vi bygger terrasser og anlæg med de rigtige underkonstruktioner, afvanding og fastgørelser — så det stadig står lige når årene går.',
    bullets: [
      'Terrasser i hårdttræ, trykimprægneret og kompositbrædder',
      'Pergolaer og overdækkede terrasser',
      'Havehuse, orangerier og redskabsskure',
      'Plankeværk, hegn og porte',
      'Fundament, bærelag og afvanding',
    ],
  },
]

export const YDELSE_SLUGS = YDELSER.map((y) => y.slug)
