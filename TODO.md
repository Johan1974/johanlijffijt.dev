# Todo — dagelijks bij te werken

## 🔧 Koerswijziging naar Tools Hub (14 september 2026) — leidraad voor nu

Browsergames zijn definitief stopgezet, zie `CLAUDE.md` § Fundamentele Koerswijziging en
`ROADMAP.md` § Koerswijziging voor de volledige achtergrond. Dit bestand begint hieronder opnieuw
vanaf de nieuwe scope — de volledige gamedev-todo-geschiedenis (Meteor Survivor, Neon Drift,
Gravity Flip, Marble Jam, dagelijkse optimization loop, SEO-loop voor games) staat nog in de
git-historie van dit bestand vóór 14 september 2026, maar stuurt het werk niet meer aan.

## 📋 Dagelijkse Routine: Tools Hub Optimalisatie & SEO Loop (vastgelegd 14 september 2026)

Zie `CLAUDE.md` § Dagelijkse Routine + § PROTOCOL: SEO-Eerst & Analytics Groeilus voor de
bindende volledige tekst. Autonoom, geen verzoek van Johan nodig — dit hier is de actuele stand
per punt, dagelijks bij te werken.

**3-Punten Check — laatste run: 14 september 2026**
- SEO & structuur: materiaalcalculator-title/H1/meta front-loaded op "Bouw- & Tuinmateriaal
  Calculator — Kuub (m³) ... berekenen"; JSON-LD aangevuld met `operatingSystem: "All"` en
  `inLanguage: "nl"` — voldoet nu aan het PROTOCOL. Geen andere actieve tools om te toetsen.
- E-E-A-T: uitlegsectie (inklinking + vuistgewicht per materiaal) + nieuw FAQ-blok (3 vragen)
  staan live — dekt het protocolvereiste "formules, vuistregels én FAQ". Interne link naar de hub
  toegevoegd onderaan de tool; kruislinks naar verwante tools volgen zodra tool 2 live is.
- GA4: `tool_calculate` (gedebouncet, 1200ms) en `click_affiliate` events toegevoegd aan de
  materiaalcalculator.
- Eerstvolgende taak: Sprint 1 Stap 2 (wacht op Johans review) → Stap 3 (affiliate-netwerken).

**Portfolio-benchmark, volgorde van uitrol** (zie `ROADMAP.md` § Mijlpalen & Monetisatie voor de
volledige, gesynchroniseerde tool-indeling per mijlpaal):
1. Bouw- & Tuinmateriaal Calculator — live op staging.
2. UBL 2.1 / Peppol Factuur Validator — B2B, € 9/mnd.
3. Beton- & Mortel Calculator — zakken cement/zand/grind-verhouding.
4. Bestrating & Snijverlies Calculator — klinkers/tegels/straatzandbed.
5. CAMT.053 / MT940 Bankexport Converter — B2B-utility.

**Vergelijkings-benchmark (zie `CLAUDE.md` § Dagelijkse Vergelijkings-Benchmark):** subtiele
1-regel disclosure ✅ live op de materiaalcalculator; `rel="sponsored nofollow"` op affiliate-
knoppen ✅ toegevoegd. Logo + "v.a."-indicatieprijs per rij: backlog, pas zinvol zodra Fase B
(prijsfeed → `api/data/prices.json`, zie `ROADMAP.md`) echte prijzen aanlevert.

## ✅ Gedaan: Tool 1 — Bouw- & Tuinmateriaal Calculator, live op staging (14 september 2026)

- `site-tools-staging/materiaal-calculator/index.html` — zelfstandige HTML-pagina, geen
  build-stap. Materiaalkeuze (zand/grind/boomschors/tuinaarde), vormkeuze (rechthoekig/rond),
  instant herberekening via JS `input`-events, resultaten (oppervlakte, volume incl. inklinking,
  aantal big bags à 1 m³/0,5 m³, geschat gewicht), affiliate-placeholder-knop (inert, geen
  verzonnen link), uitleg-sectie met de gebruikte dichtheid/inklinking-aannames.
- `nginx/johanlijffijt.dev.conf` — oude `/game/` en `/games/<slug>/` staging-locations verwijderd,
  nieuwe `location /tools/` (alias naar `site-tools-staging/`) toegevoegd aan het staging-
  serverblok. `sudo nginx -t && sudo systemctl reload nginx` gedraaid, geverifieerd.
- `site-staging/index.html` — volledig herschreven van game-arcade naar Tools Hub-homepage: hero
  met CTA naar de calculator, kaartengrid met de calculator als actieve "Nieuw"-kaart plus twee
  "Binnenkort"-kaarts (Factuur/XML Validator, een nog te bepalen derde tool).
- Geverifieerd met curl: staging-homepage (200, nieuwe titel), staging-tool (200, nieuwe titel),
  **productie ongewijzigd** (200, oude game-arcade-titel) en `/tools/...` op productie geeft 404
  (nog geen productie-route, per de Gouden Regel voor Deployment — terecht).
- `CLAUDE.md`/`ROADMAP.md` herschreven voor de nieuwe scope (dit bestand als derde).

## 📍 Mijlpaal 1 — Sprint 1 (huidige focus, zie `ROADMAP.md` § Mijlpalen & Monetisatie)

Volgorde is bewust: eerst de consument-tool afronden en op review laten liggen (kost Johan geen
tijd om op te wachten), dan pas de commerciële/technische vervolgstappen oppakken.

### Stap 1 — Pijler A: lichte styling & E-E-A-T ✅ gedaan (14 september 2026)

Zie § Gedaan hierboven voor het volledige overzicht. Eén openstaand detailpunt, niet blokkerend:

- [ ] De laagdikte-uitleg in de E-E-A-T-sectie concreter maken per toepassing (bijv. "7–8 cm
      boomschors tegen lichtkiemend onkruid" i.p.v. alleen een algemeen laagdikte-getal) — kleine
      copy-aanvulling, kan tegelijk met de eerstvolgende staging-wijziging.

### Stap 2 — Wacht op Johans review, dan "GO voor productie"

- [ ] Johan test `staging.johanlijffijt.dev` (homepage + `/tools/materiaal-calculator/`) op
      desktop en mobiel.
- [ ] Feedback verwerken (rekenlogica, copy, styling).
- [ ] Pas na expliciete "GO voor productie": tool + nieuwe homepage + nieuwe `/feedback/`
      (`site-feedback-staging/` → `site/feedback/`) naar `site/` kopiëren, `site/sitemap.xml`
      bijwerken (nieuwe URL + `lastmod`), en heroverwegen of de nieuwe homepage-copy opnieuw
      ingediend moet worden bij Search Console/Bing (zie `REGISTRATIONS.md`).
      **Kant-en-klare sitemap-inhoud voor dat moment** (nu nog niet toegepast — `site/sitemap.xml`
      is een gedeeld bestand met productie, dus een `/tools/...`-entry erin zetten vóór de tool
      daadwerkelijk op `site/tools/...` staat zou een 404-URL bij Google indienen; `/game/` staat
      er nu terecht nog in, want dat is nog live op productie):
      ```xml
      <url><loc>https://johanlijffijt.dev/</loc><lastmod>YYYY-MM-DD</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
      <url><loc>https://johanlijffijt.dev/tools/materiaal-calculator/</loc><lastmod>YYYY-MM-DD</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
      <url><loc>https://johanlijffijt.dev/feedback/</loc><lastmod>YYYY-MM-DD</lastmod><changefreq>monthly</changefreq><priority>0.3</priority></url>
      ```
      (`/game/` eruit, `lastmod` invullen op de dag van de GO-deploy.)

### Stap 3 — Pijler A: affiliate-monetisatie activeren

- [ ] Scaffold herbruikbare prijsvergelijker-component voor calculators (Fase A, zie
      `ROADMAP.md` § Universele Dynamische Prijsvergelijker) — vervangt de losse statische
      affiliate-knop, herbruikbaar over materiaal-/beton-/bestratingcalculator heen.
- [ ] Aanmelden bij TradeTracker (Gamma/Karwei) en Daisycon zodra staging live gezet wordt
      — registratie met `play@johanlijffijt.dev` (zie `CLAUDE.md` § Gouden Regel: registraties).
- [ ] Inerte CTA-knoppen op de materiaalcalculator vervangen door echte affiliate-links/
      prijsvergelijker voor 1 m³ / 0,5 m³ big bags zand, grind en boomschors.
- Rekenmodel: ~15–20 bestellingen/maand @ € 15–20 commissie = € 250–350/maand.

### Stap 4 — Pijler B: UBL/Factuur Validator scaffolden (`/tools/ubl-validator/`, staging-only)

- [ ] Scaffold nieuwe staging-route (zelfde patroon als de materiaalcalculator: `site-tools-
      staging/ubl-validator/`, geen build-stap).
- [ ] XSD- en Peppol-syntaxcontrole voor geplakte XML, foutmeldingen in begrijpelijke mensentaal
      (niet de rauwe XSD-validator-output).
- [ ] Freemium-flow: 3 gratis validaties/dag; onbeperkt via Stripe Customer Portal voor € 9/mnd
      (nieuw stuk techniek voor dit project — Stripe-integratie, geen bestaand patroon om op voort
      te bouwen zoals bij de affiliate-knoppen).
- Rekenmodel: 20–30 abonnees = € 180–270/maand.

### Stap 5 — Pijler C: AdSense (trigger-conditie, geen actie totdat die klopt)

- [ ] Pas aanvragen zodra Search Console 100 dagelijkse organische bezoekers laat zien
      (€ 50–100/maand verwacht) — vóór die drempel heeft een aanvraag geen zin.

## Backlog: Mijlpaal 2 & 3 (niet nu oppakken, zie `ROADMAP.md` voor detail)

- [ ] Tool 3 — Bestrating & Tegel Calculator (Mijlpaal 2, Pijler A-vervolg).
- [ ] Tool 4 — MT940/CAMT.053 Converter, in hetzelfde € 9/mnd-abonnement (Mijlpaal 2, Pijler B-
      vervolg).
- [ ] Lead capture (gratis checklists i.r.v. e-mailadres, Mijlpaal 2).
- [ ] B2B teamlicenties + REST API, leveranciersponsoring, DE/EN-vertaling (Mijlpaal 3).
- [ ] Overwegen of de oude game-projecten (`~/projects/apps/meteor-dodge/`, `neon-drift/`,
      `gravity-flip/`, `marble-jam/`) op enig moment opgeruimd moeten worden, of gewoon blijven
      staan als afgesloten archief (geen actie nodig, kost niets in stilstand).

## On hold: Tumble (sinds 12 september 2026 — geen actief vervolgwerk)

Geen wijziging door deze koerswijziging — Tumble stond al on hold vóór de gamedev-episode en
blijft dat. Zie `~/projects/apps/tumble/ROADMAP.md`/`CLAUDE.md` voor de status van dat project
zelf. `site/tumble/...`-pagina's blijven bereikbaar maar worden niet actief onderhouden; hun
formulieren werken niet meer sinds Tumble's Supabase-stack is gestopt (zie `CLAUDE.md` §
Supabase-proxy).
