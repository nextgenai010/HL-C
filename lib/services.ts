import type { FaqItem } from './faq'

/**
 * Body text supports inline links written as [tekst](/sti).
 * Keep every claim within what the business can stand behind:
 * no invented prices, years, certifications or guarantees.
 */
export type YdelseSektion = {
  heading: string
  paragraphs: string[]
}

export type Ydelse = {
  slug: string
  title: string
  short: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  bullets: string[]
  intro: string
  /** <title> without the site suffix. Keep under ~45 chars. */
  seoTitle: string
  /** Meta description, ~140–160 chars. */
  seoDescription: string
  /** H1 on the page. May contain one <em> for the gold accent. */
  heading: string
  sections: YdelseSektion[]
  priceFactors: string[]
  faq: FaqItem[]
  related: string[]
}

export const YDELSER: Ydelse[] = [
  {
    slug: 'nybyg-tilbygninger',
    title: 'Nybyg & Tilbygninger',
    short: 'Huse, carporte, udhuse, garager og overdækninger bygget fra bunden.',
    image: '/images/kategorier/nybyg-tilbygninger.jpg',
    imageAlt: 'Træskelet til nybyg mod blå himmel',
    imageWidth: 1920,
    imageHeight: 1280,
    seoTitle: 'Tilbygning, carport & nybyg i Herlev',
    seoDescription:
      'Tømrer til tilbygning, nybyg, carport, garage, udhus og havestue i Herlev og Storkøbenhavn. Svendebrev, skriftligt tilbud og hjælp til byggetilladelse.',
    heading: 'Nybyg & tilbygninger <em>i Herlev og omegn</em>',
    intro:
      'Fra fundament til tagryg. Vi håndterer nybyg og tilbygninger med samme omhu som vores egne huse — præcision i hver samling, korrekt materialevalg og tæt dialog gennem hele forløbet.',
    bullets: [
      'Nybyggeri af helårshuse og sommerhuse',
      'Tilbygninger og udvidelser til eksisterende boliger',
      'Carporte, garager og udhuse',
      'Overdækninger og havestuer',
      'Konstruktionsberegninger og myndighedshåndtering',
    ],
    sections: [
      {
        heading: 'Tilbygning til dit hus — mere plads uden at flytte',
        paragraphs: [
          'En tilbygning er ofte den mest direkte vej til et ekstra værelse, et større køkken-alrum eller et bryggers, der faktisk kan rumme familiens ting. Som tømrer i Herlev bygger vi tilbygninger i træ til parcelhuse, rækkehuse og sommerhuse i hele Storkøbenhavn — fra den lille udvidelse på få kvadratmeter til en ny fløj på huset.',
          'Det vigtigste ved en god tilbygning er, at den hænger sammen med det eksisterende hus. Det gælder både konstruktionen, hvor nyt og gammelt skal mødes tæt og korrekt, og udtrykket, så tagform, facade og vinduer passer til resten af boligen. Vi gennemgår huset med dig, før vi giver tilbud, så løsningen er tænkt igennem fra start.',
        ],
      },
      {
        heading: 'Nybyg af helårshus og sommerhus',
        paragraphs: [
          'Ved nybyg står vi for tømrerarbejdet fra træskelet og bjælkelag over tagkonstruktion til beklædning, vinduer og indvendig aptering. Vi arbejder efter tegninger fra din arkitekt eller ingeniør, og vi koordinerer med de øvrige fag — el, VVS og maler — så du har én fast kontakt gennem hele byggeriet.',
          'Træ er et stærkt og fleksibelt byggemateriale, når det bliver bygget rigtigt. Derfor lægger vi vægt på tætte samlinger, korrekt dampspærre og en klimaskærm, der holder vand og fugt ude i mange år.',
        ],
      },
      {
        heading: 'Carport, garage, udhus og overdækning',
        paragraphs: [
          'En carport, en garage eller et udhus i træ er klassisk tømrerarbejde. Vi bygger dem på et ordentligt fundament, med en tagkonstruktion der kan bære sne og vind, og med en beklædning der passer til huset. Mange vælger at kombinere carport og redskabsrum under samme tag.',
          'Overdækninger og havestuer giver ekstra udendørs sæson og er ofte et godt supplement til en [terrasse](/ydelser/terrasser). Skal tag eller facade på den nye bygning matche resten af huset, kan vi også stå for det — læs mere om [tag og kviste](/ydelser/tag) og [facader og træbeklædning](/ydelser/facader).',
        ],
      },
      {
        heading: 'Byggetilladelse, statik og myndigheder',
        paragraphs: [
          'Tilbygninger og nybyg kræver som regel byggetilladelse fra kommunen, og ofte en statisk beregning. Mindre bygninger som carporte og udhuse kan i nogle tilfælde opføres uden tilladelse, men afstands- og højderegler i bygningsreglementet skal stadig overholdes. Reglerne afhænger af den konkrete grund og lokalplan, så vi gennemgår det med dig tidligt i forløbet.',
          'Vi hjælper med myndighedshåndtering og samarbejder med ingeniør om konstruktionsberegninger, når projektet kræver det. Har du spørgsmål om tilladelser, kan du også læse vores [ofte stillede spørgsmål](/ofte-stillede-spoergsmaal).',
        ],
      },
    ],
    priceFactors: [
      'Størrelse og kompleksitet — antal kvadratmeter, tagform og spændvidder',
      'Fundament og terrænforhold på grunden',
      'Materialevalg til beklædning, tag og vinduer',
      'Hvor meget af det indvendige arbejde der skal med',
      'Behov for statiske beregninger, tegninger og byggetilladelse',
      'Adgangsforhold og koordinering med andre fag',
    ],
    faq: [
      {
        q: 'Kræver en tilbygning byggetilladelse?',
        a: 'Som regel ja. Tilbygninger til beboelse kræver typisk byggetilladelse fra kommunen. Reglerne afhænger af den konkrete ejendom og lokalplan, så vi gennemgår det med dig, inden projektet går i gang, og hjælper med myndighedshåndteringen.',
      },
      {
        q: 'Skal jeg have byggetilladelse til en carport eller et udhus?',
        a: 'Ikke altid. Mindre carporte, garager og udhuse kan i nogle tilfælde opføres uden byggetilladelse, men de skal stadig overholde bygningsreglementets regler om bl.a. afstand til skel og højde. Vi tjekker forholdene på din grund sammen med dig.',
      },
      {
        q: 'Hvad koster en tilbygning?',
        a: 'Det afhænger af størrelse, materialer, fundament og hvor meget indvendigt arbejde der skal med. Vi giver et skriftligt tilbud efter et besøg, så du kender prisen, før vi starter. Tilbuddet er gratis og uforpligtende.',
      },
      {
        q: 'Kan I stå for hele byggeriet, også el og VVS?',
        a: 'Vi står for tømrerarbejdet og koordinerer gerne med el, VVS og maler fra vores faste netværk, så du har én kontaktperson gennem hele projektet.',
      },
      {
        q: 'Hvor hurtigt kan I starte på en tilbygning?',
        a: 'Større projekter som nybyg og tilbygninger kræver planlægning — ofte 4-8 uger fra accept til opstart, afhængigt af kalender og eventuel byggetilladelse.',
      },
    ],
    related: ['tag', 'facader', 'terrasser'],
  },
  {
    slug: 'renovering',
    title: 'Renovering & Ombygning',
    short: 'Indvendig renovering, vægflytning, gulve og lofter med karakter.',
    image: '/images/kategorier/renovering.png',
    imageAlt: 'Tømrer lægger nyt trægulv under renovering',
    imageWidth: 1920,
    imageHeight: 1280,
    seoTitle: 'Renovering & ombygning af hus i Herlev',
    seoDescription:
      'Tømrer til renovering og ombygning i Herlev og Storkøbenhavn: fjern bærende væg, nye gulve, lofter og paneler. Fast pris på de fleste opgaver og svar inden 24 timer.',
    heading: 'Renovering & ombygning <em>af hus og lejlighed</em>',
    intro:
      'Gamle huse gemmer på sjæl. Vi renoverer med respekt for den eksisterende bygning og løfter niveauet uden at miste karakter — uanset om det er én væg eller hele boligen.',
    bullets: [
      'Indvendig renovering og ombygning',
      'Fjernelse af bærende og ikke-bærende vægge',
      'Gulve, lofter og paneler',
      'Statisk vurdering ved konstruktionsændringer',
      'Koordinering med el, VVS og maler',
    ],
    sections: [
      {
        heading: 'Indvendig renovering af hus og lejlighed',
        paragraphs: [
          'Mange boliger i Herlev, Gladsaxe, Ballerup og resten af Storkøbenhavn er bygget i en tid, hvor rummene blev indrettet helt anderledes, end vi bor i dag. En renovering kan give en mere åben planløsning, bedre lys og et hjem, der passer til den måde, du bruger det på.',
          'Vi udfører tømrerarbejdet i både mindre og større renoveringer: nye skillevægge, ombygning af rum, lofter, gulve, paneler og lister. Arbejder vi i en bolig, hvor du bor under renoveringen, rydder vi op hver dag, så hjemmet stadig kan bruges.',
        ],
      },
      {
        heading: 'Fjern en væg — bærende eller ikke-bærende',
        paragraphs: [
          'At fjerne en væg er en af de mest populære ombygninger, fordi det kan forvandle køkken og stue til ét samlet rum. En ikke-bærende væg kan som regel fjernes forholdsvis enkelt. En bærende væg kræver derimod, at lasten bliver ført ned på en anden måde — typisk med en bjælke af stål eller limtræ.',
          'Ved fjernelse af bærende vægge sørger vi for en statisk vurdering, inden der bliver skåret i konstruktionen, og vi samarbejder med ingeniør, når der skal laves beregninger. Det er ikke et sted at gætte. Ændringer i bærende konstruktioner kan også kræve, at kommunen bliver involveret — det afklarer vi med dig på forhånd.',
        ],
      },
      {
        heading: 'Nye gulve, lofter og paneler',
        paragraphs: [
          'Et nyt trægulv, et nyt loft eller nye paneler ændrer hele rummets udtryk. Vi lægger trægulve og planker, retter skæve undergulve op og monterer lofter i gips, træ eller listeloft. Er der behov for efterisolering eller lydisolering i den forbindelse, tager vi det med i samme arbejdsgang.',
          'Ved ældre huse finder vi nogle gange noget bag overfladen, som ikke kunne ses ved opmålingen. Så stopper vi og taler med dig om det, før vi går videre — du beslutter, om opgaven skal udvides.',
        ],
      },
      {
        heading: 'Én kontakt gennem hele renoveringen',
        paragraphs: [
          'En renovering involverer ofte flere fag. Vi koordinerer gerne med el, VVS og maler fra vores faste netværk, så du ikke selv skal styre tidsplanen mellem håndværkerne.',
          'Skal der også skiftes [vinduer og døre](/ydelser/vinduer-doere), eller skal huset udvides med en [tilbygning](/ydelser/nybyg-tilbygninger), kan det ofte planlægges sammen med renoveringen. Se eksempler på vores arbejde under [projekter](/projekter).',
        ],
      },
    ],
    priceFactors: [
      'Omfanget af ombygningen og antal rum',
      'Om der skal fjernes bærende vægge, og hvilken bjælke der kræves',
      'Valg af gulve, lofter og paneler',
      'Stand af den eksisterende konstruktion og undergulv',
      'Behov for statiske beregninger og evt. kommunal behandling',
      'Koordinering med el, VVS og maler',
    ],
    faq: [
      {
        q: 'Kan man fjerne en bærende væg?',
        a: 'Ja, i de fleste tilfælde — men lasten skal føres ned på en anden måde, typisk med en bjælke. Det kræver en statisk vurdering og ofte en beregning fra ingeniør, før der bliver skåret i væggen. Vi sørger for, at det sker i den rigtige rækkefølge.',
      },
      {
        q: 'Hvordan ved jeg, om min væg er bærende?',
        a: 'Det kan ikke altid ses med det blotte øje. Vi kigger på konstruktionen, bjælkelag og tag, når vi er ude og se opgaven, og vurderer, om der skal en statisk beregning til.',
      },
      {
        q: 'Kan jeg bo i huset under renoveringen?',
        a: 'Ofte ja. Vi rydder op efter os hver dag og planlægger arbejdet, så de dele af boligen, du har brug for, kan bruges undervejs. Ved større ombygninger taler vi om det på forhånd.',
      },
      {
        q: 'Hvad sker der, hvis I finder skjulte skader?',
        a: 'Så stopper vi og taler med dig, før vi går videre. Du beslutter, om opgaven skal udvides — der kommer aldrig ekstra regninger, uden vi har talt om det.',
      },
    ],
    related: ['vinduer-doere', 'nybyg-tilbygninger', 'facader'],
  },
  {
    slug: 'tag',
    title: 'Tag & Kviste',
    short: 'Tagudskiftning, renovering, kviste og tagterrasser.',
    image: '/images/kategorier/tag.jpeg',
    imageAlt: 'Nyt tegltag på parcelhus',
    imageWidth: 1920,
    imageHeight: 1280,
    seoTitle: 'Nyt tag, tagudskiftning & kviste i Herlev',
    seoDescription:
      'Tømrer til nyt tag, tagudskiftning, tagrenovering og kviste i Herlev og Storkøbenhavn. Tegl, tagpap, skifer og stål. Gratis, uforpligtende tilbud.',
    heading: 'Nyt tag & kviste <em>udført af tømrermester</em>',
    intro:
      'Taget beskytter alt, der står under det. Vi udfører fuld tagudskiftning, lokale reparationer og tilbygning af kviste — med tegl, tagpap, skifer eller stål efter husets karakter.',
    bullets: [
      'Tagudskiftning og tagrenovering',
      'Kviste og skotrender',
      'Tagterrasser og tagaltaner',
      'Undertag, lægter og isolering',
      'Tagrender, inddækninger og ovenlys',
    ],
    sections: [
      {
        heading: 'Tagudskiftning — når det er tid til nyt tag',
        paragraphs: [
          'Et tag har en lang, men begrænset levetid. Tegn på, at det er ved at være tid til en tagudskiftning, kan være knækkede eller løse tagsten, fugt på loftet, et utæt eller mørt undertag og lægter, der er begyndt at give sig. Vi gennemgår taget med dig og vurderer, om en reparation er nok, eller om det bedre kan betale sig at skifte hele taget.',
          'Ved en tagudskiftning fjerner vi det gamle tag, gennemgår spær og konstruktion, og bygger op igen med nyt undertag, lægter og tagdækning. Vi arbejder med tegl, tagpap, skifer og stål og hjælper dig med at vælge det, der passer til husets stil og budget.',
        ],
      },
      {
        heading: 'Tagrenovering og efterisolering af loftet',
        paragraphs: [
          'Ikke alle tage skal skiftes helt. En tagrenovering kan være udskiftning af undertag og lægter, reparation af inddækninger eller nye tagrender. Mens taget alligevel er åbent, er det ofte et godt tidspunkt at efterisolere, så varmen bliver i huset.',
          'Ovenlysvinduer kan også monteres eller udskiftes i forbindelse med tagarbejdet. Det giver mere dagslys på førstesalen eller i et udnyttet tagrum.',
        ],
      },
      {
        heading: 'Kviste og udnyttelse af tagetagen',
        paragraphs: [
          'En kvist kan forvandle et lavt loftsrum til et brugbart værelse med ståhøjde og lys. Vi bygger nye kviste og renoverer eksisterende — med skotrender, inddækninger og beklædning udført, så de holder tæt i mange år.',
          'Kviste ændrer husets udseende og kræver ofte byggetilladelse. Vi hjælper med at afklare, hvad der gælder for dit hus, og kan koordinere med ingeniør, hvis spærene skal ændres.',
        ],
      },
      {
        heading: 'Tagterrasse og tagaltan',
        paragraphs: [
          'En tagterrasse eller tagaltan giver et ekstra udendørs rum med udsigt. Det kræver en korrekt opbygning, så taget under terrassen forbliver tæt, og en konstruktion, der kan bære belastningen.',
          'Skal huset have [ny facade](/ydelser/facader), [nye vinduer](/ydelser/vinduer-doere) eller en [tilbygning](/ydelser/nybyg-tilbygninger) i samme ombæring, kan arbejdet planlægges samlet, så stillads og overdækning kun skal stå én gang. Se billeder fra tagopgaver under [projekter](/projekter).',
        ],
      },
    ],
    priceFactors: [
      'Tagets størrelse, hældning og antal kviste og skotrender',
      'Valg af tagdækning — tegl, tagpap, skifer eller stål',
      'Stand af spær, undertag og lægter',
      'Efterisolering og ovenlysvinduer',
      'Stillads, overdækning og adgangsforhold',
      'Om der kræves byggetilladelse eller statik',
    ],
    faq: [
      {
        q: 'Hvordan ved jeg, om mit tag skal skiftes?',
        a: 'Typiske tegn er fugt på loftet, knækkede eller løse tagsten, et utæt undertag og lægter, der giver sig. Vi kommer gerne ud og vurderer, om en reparation er nok, eller om en tagudskiftning er den bedste løsning.',
      },
      {
        q: 'Hvilken tagtype skal jeg vælge?',
        a: 'Det afhænger af husets stil, tagets hældning og dit budget. Vi arbejder med tegl, tagpap, skifer og stål og gennemgår fordele og ulemper ved hver løsning sammen med dig.',
      },
      {
        q: 'Kræver en kvist byggetilladelse?',
        a: 'Ofte ja, fordi en kvist ændrer husets ydre. Det afhænger af ejendommen og lokalplanen. Vi hjælper dig med at afklare det, inden arbejdet går i gang.',
      },
      {
        q: 'Kan jeg få håndværkerfradrag for tagarbejde?',
        a: 'Visse grønne forbedringer, fx isolering, kan give håndværkerfradrag. Reglerne ændrer sig, så tjek altid de aktuelle regler på skat.dk. Vi udsteder faktura med tydelig angivelse af arbejdsløn.',
      },
    ],
    related: ['facader', 'vinduer-doere', 'nybyg-tilbygninger'],
  },
  {
    slug: 'vinduer-doere',
    title: 'Vinduer & Døre',
    short: 'Udskiftning og isætning — standard og specialmål.',
    image: '/images/kategorier/vinduer-doere.png',
    imageAlt: 'Store glaspartier og skydedøre i moderne bolig',
    imageWidth: 1920,
    imageHeight: 1280,
    seoTitle: 'Udskiftning af vinduer & døre i Herlev',
    seoDescription:
      'Tømrer til udskiftning og montering af vinduer, terrassedøre, hoveddøre og skydedøre i Herlev og Storkøbenhavn. Standard og specialmål. Svar inden 24 timer.',
    heading: 'Udskiftning af vinduer & døre <em>— standard og specialmål</em>',
    intro:
      'Nye vinduer og døre giver bedre varmeøkonomi, mere dagslys og et løft af facaden. Vi rådgiver om materialer og mål, og indsætter med tætte fuger og præcise lysninger.',
    bullets: [
      'Udskiftning af vinduer og terrassedøre',
      'Yderdøre, skydedøre og foldedøre',
      'Specialmål og arkitekttegnede løsninger',
      'Tætning og efterisolering ved karmen',
      'Ind- og udvendige lysninger',
    ],
    sections: [
      {
        heading: 'Udskiftning af vinduer',
        paragraphs: [
          'Gamle vinduer kan trække, dugge mellem ruderne og være svære at åbne og lukke. Nye vinduer kan give en mærkbar forbedring af indeklima og varmeøkonomi — og de løfter samtidig husets udtryk udefra.',
          'Vi udskifter vinduer i parcelhuse, rækkehuse og lejligheder i Herlev og hele Storkøbenhavn. Vi rådgiver om materialer, opdeling og mål, så de nye vinduer passer til husets stil, og vi tager hensyn til facaden, uanset om den er i mursten, træ eller puds.',
        ],
      },
      {
        heading: 'Montering der holder tæt',
        paragraphs: [
          'Et godt vindue kan blive et dårligt vindue, hvis det bliver monteret forkert. Derfor lægger vi vægt på korrekt fastgørelse, tætning og isolering ved karmen, så der hverken trækker luft eller trænger fugt ind.',
          'Bagefter afslutter vi med ind- og udvendige lysninger, så overgangen mellem vindue og væg står pænt og færdig. Det er ofte her, man kan se forskel på et hurtigt og et ordentligt stykke arbejde.',
        ],
      },
      {
        heading: 'Terrassedøre, hoveddøre, skydedøre og foldedøre',
        paragraphs: [
          'En ny hoveddør giver tryghed og et bedre førstehåndsindtryk. En terrassedør, skydedør eller foldedør kan åbne stuen helt op mod haven og gøre overgangen til [terrassen](/ydelser/terrasser) naturlig.',
          'Vi monterer døre i standardmål og specialmål. Skal der laves en ny eller større åbning i en ydervæg, vurderer vi konstruktionen først — er væggen bærende, sørger vi for den rette løsning, ligesom ved en [indvendig ombygning](/ydelser/renovering).',
        ],
      },
      {
        heading: 'Specialmål og arkitekttegnede løsninger',
        paragraphs: [
          'Ikke alle huse passer til standardmål. Ældre huse og arkitekttegnede boliger har ofte særlige åbninger, sprosser eller store glaspartier. Vi arbejder også med specialmål og tilpassede løsninger.',
          'Udskifter du vinduer i forbindelse med [ny facadebeklædning](/ydelser/facader) eller [nyt tag](/ydelser/tag), kan det med fordel planlægges samlet. Se eksempler på vinduesopgaver under [projekter](/projekter).',
        ],
      },
    ],
    priceFactors: [
      'Antal vinduer og døre samt deres størrelse',
      'Materiale, ruder og opdeling',
      'Standardmål eller specialmål',
      'Facadetype og hvor meget der skal tilpasses ved åbningen',
      'Ind- og udvendige lysninger',
      'Om åbninger skal udvides eller flyttes',
    ],
    faq: [
      {
        q: 'Hvornår bør man skifte vinduer?',
        a: 'Typiske tegn er træk, dug mellem ruderne, råd i rammer og karme eller vinduer, der er svære at åbne og lukke. Vi kommer gerne ud og vurderer, om det er tid til nye vinduer.',
      },
      {
        q: 'Kan I levere vinduer i specialmål?',
        a: 'Ja. Vi arbejder både med standardmål og specialmål, fx til ældre huse eller arkitekttegnede boliger.',
      },
      {
        q: 'Kan jeg få håndværkerfradrag for nye vinduer?',
        a: 'Udskiftning af vinduer kan være omfattet af håndværkerfradraget for grønne forbedringer. Reglerne ændrer sig, så tjek altid de aktuelle regler på skat.dk. Vi udsteder faktura med tydelig angivelse af arbejdsløn.',
      },
      {
        q: 'Kan I lave en ny åbning til en terrassedør?',
        a: 'Ja. Vi vurderer først, om væggen er bærende. Er den det, sørger vi for en statisk vurdering og den rette bjælke, før åbningen bliver lavet.',
      },
    ],
    related: ['facader', 'renovering', 'terrasser'],
  },
  {
    slug: 'facader',
    title: 'Facader & Beklædning',
    short: 'Træbeklædning, facaderenovering og efterisolering.',
    image: '/images/kategorier/facader.png',
    imageAlt: 'Lodret træbeklædning på facade',
    imageWidth: 1920,
    imageHeight: 1280,
    seoTitle: 'Træbeklædning & facaderenovering i Herlev',
    seoDescription:
      'Tømrer til træbeklædning, facaderenovering og efterisolering af ydervægge i Herlev og Storkøbenhavn. Lærk, cedertræ og fyr. Gratis og uforpligtende tilbud.',
    heading: 'Facader & træbeklædning <em>der holder</em>',
    intro:
      'En ny facade skifter husets udtryk fuldstændigt. Vi arbejder med træbeklædning i brædder og plader, og tilfører ofte efterisolering i samme arbejdsgang — så energiregnskabet følger med.',
    bullets: [
      'Træbeklædning i lærk, cedertræ og fyr',
      'Facaderenovering og pudsreparation',
      'Efterisolering af ydervægge',
      'Sokkel, sternbrædder og vindskeder',
      'Vedligehold og oliebehandling',
    ],
    sections: [
      {
        heading: 'Ny træbeklædning på facaden',
        paragraphs: [
          'Træbeklædning giver et varmt og naturligt udtryk og kan give et ældre hus et helt nyt look. Vi monterer facadebeklædning i lærk, cedertræ og fyr — lodret eller vandret, som klink, en-på-to eller profilbrædder, alt efter husets stil.',
          'Holdbarheden afhænger i høj grad af opbygningen bag brædderne. Vi sikrer korrekt ventilation bag beklædningen, afstand til terræn og en sokkelafslutning, der leder vandet væk. Det er detaljerne, der afgør, om en facade holder.',
        ],
      },
      {
        heading: 'Efterisolering af ydervægge',
        paragraphs: [
          'Når facaden alligevel skal have ny beklædning, er det et oplagt tidspunkt at efterisolere ydervæggene udvendigt. Det kan give et bedre indeklima og lavere varmeforbrug, uden at du mister plads indenfor.',
          'Vi tilpasser isoleringen til husets eksisterende konstruktion og sørger for, at vinduer og døre bliver afsluttet korrekt i den nye, tykkere væg. Skal der samtidig skiftes [vinduer og døre](/ydelser/vinduer-doere), kan det med fordel gøres i samme forløb.',
        ],
      },
      {
        heading: 'Facaderenovering, sokkel og sternbrædder',
        paragraphs: [
          'Ikke alle facader skal udskiftes. Ofte kan en facaderenovering — udskiftning af enkelte brædder, pudsreparation, nye sternbrædder og vindskeder eller en istandsat sokkel — forlænge facadens levetid betydeligt.',
          'Sternbrædder og vindskeder sidder hvor [tag](/ydelser/tag) og facade mødes, og de er ofte de første til at tage skade. Vi udskifter dem og sørger for, at inddækningerne slutter tæt.',
        ],
      },
      {
        heading: 'Vedligehold og oliebehandling',
        paragraphs: [
          'Træ udendørs har brug for vedligehold. Afhængigt af træsort og ønsket udtryk kan beklædningen enten patinere naturligt eller behandles med olie eller maling. Vi rådgiver om, hvad der passer til din facade, og udfører gerne vedligeholdet.',
          'Den samme omhu gælder alt udendørs træværk — fra facaden til [terrassen](/ydelser/terrasser) og [carporten](/ydelser/nybyg-tilbygninger).',
        ],
      },
    ],
    priceFactors: [
      'Facadens areal og antal vinduer og døre, der skal afsluttes omkring',
      'Træsort og profil — lærk, cedertræ eller fyr',
      'Om der skal efterisoleres i samme arbejdsgang',
      'Stand af den eksisterende væg og underlag',
      'Sokkel, sternbrædder og vindskeder',
      'Stillads og adgangsforhold',
    ],
    faq: [
      {
        q: 'Hvilken træsort er bedst til facadebeklædning?',
        a: 'Lærk, cedertræ og fyr har hver deres udtryk, holdbarhed og pris. Vi gennemgår mulighederne med dig og anbefaler den løsning, der passer til huset og dit ønske om vedligehold.',
      },
      {
        q: 'Kan man efterisolere, når facaden får ny beklædning?',
        a: 'Ja, og det er ofte det bedste tidspunkt. Udvendig efterisolering kan gøres i samme arbejdsgang som den nye beklædning, så du kun skal have stillads op én gang.',
      },
      {
        q: 'Skal træbeklædning behandles?',
        a: 'Det afhænger af træsorten og det udtryk, du ønsker. Nogle træsorter kan patinere naturligt, mens andre har brug for olie eller maling. Vi rådgiver om vedligehold, når vi gennemgår opgaven.',
      },
      {
        q: 'Kræver ny facadebeklædning byggetilladelse?',
        a: 'Det afhænger af ejendommen og lokalplanen — især hvis facadens udseende ændres markant. Vi hjælper dig med at afklare det, inden arbejdet går i gang.',
      },
    ],
    related: ['tag', 'vinduer-doere', 'nybyg-tilbygninger'],
  },
  {
    slug: 'terrasser',
    title: 'Terrasser & Udendørs',
    short: 'Trædæk, pergolaer, havehuse og overdækninger.',
    image: '/images/kategorier/terrasser.png',
    imageAlt: 'Tømrer monterer terrassebrædder i haven',
    imageWidth: 1920,
    imageHeight: 1280,
    seoTitle: 'Terrasse, trædæk & havehus i Herlev',
    seoDescription:
      'Tømrer til terrasse, trædæk, hævet terrasse, pergola, havehus og hegn i Herlev og Storkøbenhavn. Hårdttræ, trykimprægneret og komposit. Gratis tilbud.',
    heading: 'Terrasser & trædæk <em>bygget til at holde</em>',
    intro:
      'Udendørs rum der holder. Vi bygger terrasser og anlæg med de rigtige underkonstruktioner, afvanding og fastgørelser — så det stadig står lige når årene går.',
    bullets: [
      'Terrasser i hårdttræ, trykimprægneret og kompositbrædder',
      'Pergolaer og overdækkede terrasser',
      'Havehuse, orangerier og redskabsskure',
      'Plankeværk, hegn og porte',
      'Fundament, bærelag og afvanding',
    ],
    sections: [
      {
        heading: 'Ny terrasse i træ eller komposit',
        paragraphs: [
          'En terrasse er husets udendørs stue. Vi bygger trædæk og terrasser i hårdttræ, trykimprægneret træ og kompositbrædder — fra den lille terrasse ved køkkendøren til store, hævede terrasser med trapper og trin ned til haven.',
          'Hver træsort har sit udtryk og sit behov for vedligehold. Hårdttræ er tæt og slidstærkt, trykimprægneret træ er et prisvenligt valg, og komposit kræver mindst vedligehold. Vi gennemgår fordele og ulemper, så du vælger det, der passer til din have og din hverdag.',
        ],
      },
      {
        heading: 'Underkonstruktionen afgør, hvor længe terrassen holder',
        paragraphs: [
          'Det, man ikke ser, er det vigtigste. En terrasse holder kun, hvis fundament, bærelag og strøer er udført korrekt, og vandet kan ledes væk. Vi lægger vægt på stabile fundamenter, korrekt afstand mellem strøer, luft under brædderne og fastgørelser, der passer til materialet.',
          'Det er sådan, terrassen stadig står lige og plant, når årene går — og det er her, en tømreropgave adskiller sig fra en hurtig løsning.',
        ],
      },
      {
        heading: 'Pergola, overdækket terrasse og havehus',
        paragraphs: [
          'En pergola eller en overdækket terrasse forlænger udendørssæsonen og giver læ for sol og regn. Vi bygger dem i træ, så de passer til huset og terrassen, og med en konstruktion der kan klare dansk vejr.',
          'Vi bygger også havehuse, orangerier og redskabsskure. Skal der en større bygning til, fx en carport eller garage, kan du læse mere under [nybyg og tilbygninger](/ydelser/nybyg-tilbygninger).',
        ],
      },
      {
        heading: 'Plankeværk, hegn og porte',
        paragraphs: [
          'Et plankeværk eller hegn i træ giver læ og privatliv i haven. Vi sætter stolper korrekt, så hegnet står stabilt i mange år, og bygger porte, der hænger lige og kan åbne og lukke uden at slæbe.',
          'Ønsker du en bred terrassedør eller skydedør ud til den nye terrasse, kan du se mere under [vinduer og døre](/ydelser/vinduer-doere). Se også billeder af terrasser og havehuse under [projekter](/projekter).',
        ],
      },
    ],
    priceFactors: [
      'Terrassens størrelse og om den er hævet eller i terrænniveau',
      'Valg af brædder — hårdttræ, trykimprægneret eller komposit',
      'Fundament, bærelag og afvanding',
      'Trapper, trin, rækværk og indbyggede detaljer',
      'Pergola, overdækning eller hegn som en del af opgaven',
      'Terrænforhold og adgang til haven',
    ],
    faq: [
      {
        q: 'Hvilket træ er bedst til terrasse?',
        a: 'Det afhænger af udtryk, budget og hvor meget vedligehold du ønsker. Hårdttræ er tæt og slidstærkt, trykimprægneret træ er et prisvenligt valg, og komposit kræver mindst vedligehold. Vi rådgiver dig om valget.',
      },
      {
        q: 'Skal en terrasse have fundament?',
        a: 'Ja. En stabil underkonstruktion med fundament, bærelag og strøer er afgørende for, at terrassen holder og står lige. Det er en af de ting, vi lægger mest vægt på.',
      },
      {
        q: 'Kræver en hævet terrasse eller overdækning byggetilladelse?',
        a: 'Det kan den. Det afhænger blandt andet af højde, størrelse og afstand til skel. Vi hjælper dig med at afklare reglerne for din grund, inden vi går i gang.',
      },
      {
        q: 'Hvornår er det bedst at bygge en terrasse?',
        a: 'Terrasser kan bygges det meste af året. Mange ønsker terrassen klar til foråret, så det kan være en fordel at tage kontakt i god tid.',
      },
    ],
    related: ['nybyg-tilbygninger', 'vinduer-doere', 'facader'],
  },
]

export const YDELSE_SLUGS = YDELSER.map((y) => y.slug)
