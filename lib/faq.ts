export type FaqItem = {
  q: string
  a: string
}

export type FaqCategory = {
  id: string
  title: string
  intro?: string
  items: FaqItem[]
}

// 8 vigtigste — vises på forsiden (kondenseret udgave)
export const FAQ_HOME: FaqItem[] = [
  {
    q: 'Hvor hurtigt vender I tilbage på en forespørgsel?',
    a: 'Vi svarer alle henvendelser inden for 24 timer på hverdage — som regel hurtigere. Sender du på telefonen i åbningstiden, ringer vi tilbage samme dag.',
  },
  {
    q: 'Er tilbud gratis og uforpligtende?',
    a: 'Ja. Vi kommer ud, ser på opgaven og giver dig et skriftligt tilbud med klare poster — uden bindinger og uden gebyr. Du beslutter helt selv, om du vil gå videre.',
  },
  {
    q: 'Hvilke områder dækker I?',
    a: 'Vi har base i Herlev og dækker hele Storkøbenhavn — bl.a. Ballerup, Gladsaxe, København, Frederiksberg, Rødovre, Glostrup, Lyngby og Bagsværd. Skriv endelig, hvis du bor lige uden for — vi tager gerne en snak.',
  },
  {
    q: 'Har I svendebrev — og er I forsikret?',
    a: 'Ja. Tømrerfirmaet H L Christiansen er drevet af Jonatan Hintze Ladewig Christiansen, uddannet tømrer med dansk svendebrev. Firmaet er CVR-registreret, ansvarsforsikret og arbejdsgiver-registreret. Vi viser gerne dokumentation ved første møde.',
  },
  {
    q: 'Hvordan forløber et typisk projekt fra start til slut?',
    a: 'Vi følger fire trin: 1) Besøg og opmåling, hvor vi taler opgaven igennem. 2) Skriftligt tilbud med klare poster og tidsplan. 3) Udførelse, hvor vi arbejder rent, holder dig opdateret og overholder aftalen. 4) Aflevering med gennemgang og garanti.',
  },
  {
    q: 'Hvilken garanti giver I på arbejdet?',
    a: 'Vi giver dig som minimum den lovbestemte 5-årige reklamationsret. Står du med en konkret problemstilling efter aflevering, kommer vi tilbage og kigger på det — det er for os en del af at aflevere ordentligt arbejde.',
  },
  {
    q: 'Hvad sker der, efter jeg har sendt en forespørgsel?',
    a: 'Du får automatisk en bekræftelse på mail. Inden for 24 timer kontakter vi dig — typisk på telefonen — for at høre nærmere om opgaven og aftale et besøg, hvis det giver mening. Derfra følger vi de fire trin ovenfor.',
  },
  {
    q: 'Kan jeg trække noget fra i skat for arbejdet?',
    a: 'Dele af tømrerarbejde i din private bolig kan falde under håndværkerfradraget (servicefradraget). Vi udsteder faktura med tydelig angivelse af arbejdsløn, så du kan indberette korrekt til SKAT. Konkrete regler ændrer sig — tjek altid de aktuelle satser på skat.dk.',
  },
]

// Dedikeret /ofte-stillede-spoergsmaal side — fuld udgave med kategorier
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'tilbud-og-proces',
    title: 'Tilbud & proces',
    intro: 'Hvordan vi arbejder fra første kontakt til færdigt arbejde.',
    items: [
      {
        q: 'Hvor hurtigt vender I tilbage på en forespørgsel?',
        a: 'Vi svarer alle henvendelser inden for 24 timer på hverdage. Ringer du i åbningstiden, vender vi typisk tilbage samme dag.',
      },
      {
        q: 'Er tilbud gratis og uforpligtende?',
        a: 'Ja. Vi tager gerne ud at se på opgaven og giver dig et skriftligt tilbud med klare poster — uden bindinger og uden beregning.',
      },
      {
        q: 'Hvordan forløber et typisk projekt?',
        a: 'Vi følger fire trin: Besøg og opmåling — skriftligt tilbud — udførelse — aflevering med gennemgang og garanti. Hvert trin er noget, vi taler om sammen, så du ved, hvad der sker.',
      },
      {
        q: 'Kan vi mødes, inden jeg beslutter mig?',
        a: 'Ja — og det anbefaler vi. Et besøg på 20-30 minutter giver os mulighed for at se opgaven på stedet, måle op og snakke materialer. Det gør tilbuddet mere præcist, og du får en fornemmelse af, hvem du arbejder sammen med.',
      },
      {
        q: 'Skal jeg selv stå for noget, før I starter?',
        a: 'Som regel ikke. Vi medbringer eget værktøj og rydder op efter os. Hvis opgaven kræver, at noget skal være tømt eller dækket til på forhånd, aftaler vi det i god tid.',
      },
      {
        q: 'Hvor hurtigt kan I starte?',
        a: 'Det afhænger af opgavens omfang og vores kalender. Mindre opgaver kan typisk klares inden for 1-3 uger. Større projekter (nybyg, tag, større renoveringer) kræver længere planlægning — ofte 4-8 uger fra accept til opstart.',
      },
    ],
  },
  {
    id: 'pris-og-betaling',
    title: 'Pris & betaling',
    intro: 'Hvordan vi sætter pris, og hvordan vi afregner.',
    items: [
      {
        q: 'Hvad koster en typisk opgave?',
        a: 'Prisen afhænger af opgavens omfang, materialevalg og adgangsforhold. Vi giver altid et skriftligt tilbud, så du kender prisen, inden vi starter. På den måde slipper du for skjulte poster og uforudsete regninger.',
      },
      {
        q: 'Giver I fast pris eller arbejder I efter regning?',
        a: 'Vi giver fast pris på de fleste opgaver, så du ved, hvad det koster, inden vi starter. Mindre reparationer og opgaver, hvor omfanget er svært at fastslå på forhånd, kan udføres efter regning — men også der får du en realistisk forventning på forhånd.',
      },
      {
        q: 'Hvordan afregner vi?',
        a: 'På større projekter aftaler vi typisk en betaling delt over forløbet — opstart, undervejs og ved aflevering. Mindre opgaver afregnes ved aflevering. Du modtager altid en specificeret faktura med moms og tydelig arbejdsløn.',
      },
      {
        q: 'Kan jeg bruge håndværkerfradrag?',
        a: 'Dele af tømrerarbejde i din private bolig kan falde under servicefradraget. Vi udsteder faktura med tydelig angivelse af arbejdsløn, så du kan indberette korrekt. De konkrete regler og beløb ændrer sig — tjek altid de aktuelle satser på skat.dk.',
      },
      {
        q: 'Hvad sker der, hvis der dukker noget uventet op undervejs?',
        a: 'På ældre huse støder vi nogle gange på noget bag overfladen, som ikke kunne ses ved opmåling. Vi stopper og taler med dig om det først — du beslutter, om vi skal udvide opgaven. Aldrig ekstra regninger uden, vi har talt om det.',
      },
    ],
  },
  {
    id: 'kvalitet-og-garanti',
    title: 'Håndværk & garanti',
    intro: 'Hvad du kan forvente af arbejdet, og hvad der sker bagefter.',
    items: [
      {
        q: 'Har I svendebrev?',
        a: 'Ja. Jonatan Hintze Ladewig Christiansen er uddannet tømrer med dansk svendebrev. Vi fremlægger gerne dokumentation ved første møde.',
      },
      {
        q: 'Er I forsikret?',
        a: 'Ja — vi er fuldt ansvarsforsikret og arbejdsgiver-registreret. Skulle der ske skader på din ejendom eller tredjepart i forbindelse med vores arbejde, er det dækket.',
      },
      {
        q: 'Hvilken garanti giver I?',
        a: 'Som minimum den lovbestemte 5-årige reklamationsret efter aflevering. På større projekter kan der være producent-garanti på materialer (fx tag, vinduer), som vi videregiver til dig.',
      },
      {
        q: 'Hvad sker der, hvis jeg ikke er tilfreds med arbejdet?',
        a: 'Vi afleverer ikke, før det står rent. Skulle der efter aflevering vise sig noget, vi har overset, kommer vi tilbage og retter det — det er en del af aftalen og ikke et tillæg.',
      },
      {
        q: 'Hvilke materialer bruger I?',
        a: 'Vi vælger materialer ud fra det enkelte projekt — kvalitet, holdbarhed og udseende skal passe sammen. Vi rådgiver dig om mulighederne, men du bestemmer i sidste ende. Vi snyder ikke med billige alternativer for at presse prisen.',
      },
    ],
  },
  {
    id: 'omraader-og-byggeri',
    title: 'Områder & praktisk',
    intro: 'Hvor vi kører, og hvad du skal vide praktisk.',
    items: [
      {
        q: 'Hvilke områder dækker I?',
        a: 'Vi har base i Herlev og dækker hele Storkøbenhavn — bl.a. Ballerup, Gladsaxe, København, Frederiksberg, Rødovre, Glostrup, Lyngby, Bagsværd, Søborg, Værløse og Vanløse. Bor du lige uden for, så ring — vi tager gerne en snak.',
      },
      {
        q: 'Kører I langt for små opgaver?',
        a: 'Vi forsøger at lægge mindre opgaver i samme område på samme dag, så transporten ikke fylder i prisen. Mindre opgaver længere væk kan blive svære at få til at hænge sammen prismæssigt, men spørg endelig.',
      },
      {
        q: 'Skal jeg søge byggetilladelse selv?',
        a: 'Det afhænger af projektet. Mindre renoveringer kræver typisk ingen tilladelse. Nybyg, tilbygninger, kviste og facadeændringer kræver ofte byggetilladelse fra kommunen. Vi hjælper med myndighedshåndtering og kan også gøre det for dig, hvis det er en del af aftalen.',
      },
      {
        q: 'Koordinerer I med andre håndværkere?',
        a: 'Ja. På større projekter er vi vant til at stå for koordineringen med el, VVS, maler og blikkenslager, så du har én at tale med. Vi har et fast netværk af håndværkere, vi har arbejdet sammen med over flere år.',
      },
      {
        q: 'Hvad med affald og oprydning?',
        a: 'Vi rydder op efter os hver dag. Byggeaffald bortskaffes ansvarligt — typisk via container eller direkte til genbrugsplads. Vi efterlader pladsen, så du kan bo i den, hvis det er nødvendigt undervejs.',
      },
      {
        q: 'Arbejder I også for erhverv og udlejere?',
        a: 'Ja. Vi udfører tømrerarbejde for private boligejere, andelsboligforeninger, ejerforeninger, udlejere og mindre erhverv. Fakturering og dokumentation tilpasses jeres behov.',
      },
    ],
  },
]

// Flad liste — bruges til JSON-LD schema
export const FAQ_ALL: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items)
