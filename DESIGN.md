# H L Christiansen — designramme

Redesign efter Apple-principper (oktober 2026, efter udtrykkelig anmodning):
roligt, luftigt, stærk typografi, store billeder og én idé ad gangen — men
stadig et solidt, jordnært tømrerfirma, ikke et tech-site.

## Identitet
- Farver: antracit `#232426`, guld `#B8960C` / `#D4AF37`, sten-grå `#F5F4F2`.
  Små tekster på lys baggrund bruger `--gold-text` `#8B6E00` af hensyn til kontrast.
- Logo vises altid i originale farver på mørk baggrund (navigation og footer er mørke).
- Typografi: Outfit (overskrifter, semibold, negativ tracking) og Manrope (brødtekst, 17px).
- Ingen falsk kursiv, ingen ✦-dekoration. Tofarvede overskrifter: anden halvdel i
  `text-dark/55` (lys baggrund) eller guld (mørk baggrund).

## Komponenter
- Knapper er piller (`btn-primary`, `btn-gold`, `btn-outline`, `btn-outline-white`) med tryk-feedback.
- Kort: `.card` (radius 22px). Felter: `.field` (fyldte, afrundede).
- Én formular-komponent: `QuoteForm` (hero, bunden af forsiden, kontakt, svævende knap).
- Bevægelse: `.reveal` (scroll-fade), `.rise` (indgang), `.rise-move` til H1 (kun bevægelse,
  aldrig opacity — ellers forsinkes LCP), `Parallax` (diskret, klampet). Alt slås fra ved
  reduceret bevægelse.

## Indhold
- Opfind ikke anmeldelser, priser, projekter, steder eller årstal.
- Projektbilleder beskrives ud fra det, billederne viser (`lib/projects.ts`).
- URL'er bevares.
