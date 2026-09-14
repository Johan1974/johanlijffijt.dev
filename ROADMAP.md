# Roadmap — johanlijffijt.dev (overkoepelend)

# Bindende regels — volledige tekst in `CLAUDE.md`

Zie `CLAUDE.md` voor de volledige, bindende tekst van:

- **Gouden Regel voor Deployment** — altijd eerst staging, nooit productie zonder expliciete "GO".
- **Core Regel: SEO-Eerst voor Alle Tekst** — kernwoorden vooraan, link terug naar de tool, geen
  betaald verkeer.
- **Core Regel: Monetisatie via Affiliate & AdSense** — placeholders totdat een echt
  partnerprogramma is aangesloten, nooit tussen invoer/resultaat in.
- **Gouden Regel: Taalkeuze per Doelgroep** — per tool op basis van zoekintentie, niet vast.
- **Gouden Regel: `play@johanlijffijt.dev`** voor elke nieuwe externe registratie.
- **Kwaliteitseisen per tool** — rekenkundig correct, instant, mobiel-vriendelijk, eerlijke
  disclaimers, geen build-pipeline.
- **Token & Context Discipline.**

Deze roadmap gaat over *wat* er gebouwd wordt en *waarom*, niet over de bindende regels zelf —
die staan opzettelijk maar op één plek.

## Visie

Een lichte "proeftuin"-portfolio op `johanlijffijt.dev`: geen mobiele app, geen zwaar CMS, gewoon
statische pagina's die iets nuttigs doen. Sinds 14 september 2026 (zie § Koerswijziging
hieronder) is dat nuttige "iets": **gratis, snelle, betrouwbare online tools & calculators**, elk
gericht op een concrete, veelgezochte zoekvraag.

## Koerswijziging: van browsergames naar Tools Hub (14 september 2026)

Na een pivot naar browsergames op 12 september 2026 (Meteor Survivor, later Neon Drift, Gravity
Flip, Marble Jam) heeft Johan definitief besloten te stoppen met gamedev. Reden: de
browsergame-episode kostte veel iteratie zonder dat er een geloofwaardig pad naar de
commerciële/kwalitatieve lat lag — een taalmodel kan spellogica schrijven maar mist de artistieke
smaak/assets om een game er niet als "een programmeeroefening" uit te laten zien, en het genre
leunt zwaar op dingen (visuele polish, marketingbudget, portal-distributie) die buiten wat hier
haalbaar is. Calculators/tools spelen precies andersom in op wat een taalmodel wél goed kan:
correcte rekenlogica, heldere structuur, sterke SEO-copy — geen artistieke asset-productie nodig.

**Wat dit betekent voor de bestaande games:**
- Meteor Survivor, Neon Drift, Gravity Flip en Marble Jam worden **niet meer doorontwikkeld**.
- De broncode van deze projecten (`~/projects/apps/meteor-dodge/`, `neon-drift/`,
  `gravity-flip/`, `marble-jam/`) blijft ongewijzigd staan — geen opruimactie, kost niets in
  stilstand.
- Productie (`site/index.html`, `site/game/`) toont op het moment van schrijven nog de oude
  game-arcade-homepage — die blijft zo totdat Johan expliciet "GO voor productie" geeft voor de
  nieuwe Tools Hub-homepage (zie Gouden Regel voor Deployment).
- Staging-only game-routes (`/games/neon-drift/`, `/games/gravity-flip/`, `/games/marble-jam/`)
  zijn uit `nginx/johanlijffijt.dev.conf` verwijderd; de bijbehorende staging-buildmappen
  (`site-*-staging/`) staan nog op schijf maar worden niet meer geserveerd.
- Voor de volledige geschiedenis van de gamedev-episode (dagelijkse optimization loop,
  Top-5-benchmarking, ad-pacing-regels, Vlambeer/Octalysis-onderbouwing, per-game beslissingen):
  zie de git-historie van dit bestand en van `CLAUDE.md`/`TODO.md` vóór 14 september 2026. Die
  content stuurt het werk hier niet langer aan, maar is niet weggegooid.

## 🗺️ Mijlpalen & Monetisatie (formeel vastgesteld 14 september 2026)

**Status van de checkboxes hieronder wordt bijgehouden — vinkjes betekenen daadwerkelijk
opgeleverd, niet alleen gepland.** Zie `TODO.md` voor de dag-tot-dag uitwerking van de eerstvolgende
stappen (Mijlpaal 1, Sprint 1).

### 🎯 Strategische Focus & Monetisatie Filosofie

We bouwen geen losse gok-projecten, maar een complementaire portfolio van **deterministische
reken- en validatietools** met direct commercieel zoekverkeer:
- **Consument / Doe-Het-Zelf:** Hoge affiliate-orders (zand, grind, big bags, bestrating).
- **B2B / Zakelijk:** Terugkerende Micro-SaaS abonnementen voor foutpreventie (XML/UBL
  factuurvalidatie).
- **Display Ads:** Google AdSense als passieve bodem zodra stabiel organisch verkeer loopt.

### 📍 Mijlpaal 1: De Eerste € 500 / maand (Fundering & Validatie)

*Doel: Eerste meetbare inkomsten valideren via affiliates en de lancering van de eerste
B2B-tool.*

#### Pijler A: Consument (Klus & Materiaal)

- [x] **Bouw- & Tuinmateriaal Calculator (Live op staging):**
  - [x] Thema omzetten naar een fris, licht en uitnodigend palet (wit/slate met groen accent).
  - [x] Browser-stepper overlap op invoervelden oplossen (`pr-12` padding).
  - [x] E-E-A-T SEO-sectie onder de tool toegevoegd: uitleg over inklinking (10–20%) en
    laagdikte (bv. 7–8 cm boomschors tegen lichtkiemend onkruid) — **openstaand vervolgpunt:**
    de laagdikte-richtlijn per toepassing (onkruid/paden/borders) nog concreter uitwerken in de
    uitlegsectie, zie `TODO.md`.
- [ ] **Affiliate-monetisatie activeren:**
  - [ ] Aanmelden bij affiliate-netwerken (Daisycon / TradeTracker / partnerprogramma's
    bouwmarkten) — met `play@johanlijffijt.dev`.
  - [ ] Inerte CTA-knoppen vervangen door echte affiliate-links voor 1 m³ / 0,5 m³ big bags
    zand, grind en boomschors.
  - *Rekenmodel:* ~15 tot 20 bestellingen per maand @ € 15 – € 20 commissie =
    **€ 250 – € 350 / maand**.

#### Pijler B: B2B Micro-SaaS (UBL / Factuur Validator)

- [ ] **Scaffold Tool 2: `/tools/ubl-validator/`:**
  - [ ] XSD- en Peppol-syntaxcontrole voor e-facturen.
  - [ ] Gebruiker plakt XML → direct inzicht in ontbrekende of foutieve tags in begrijpelijke
    mensentaal.
  - [ ] Freemium model: 3 gratis validaties per dag; onbeperkt valideren via Stripe Customer
    Portal voor **€ 9 / maand**.
  - *Rekenmodel:* 20 tot 30 abonnees = **€ 180 – € 270 / maand**.

#### Pijler C: Display Ads & Hub Integratie

- [ ] Google AdSense aanvragen en activeren zodra de eerste 100 dagelijkse organische bezoekers
  via Google Search Console binnenkomen (**€ 50 – € 100 / maand**).

### 🚀 Mijlpaal 2: Schalen naar € 1.500 / maand (Portfolio Verdikking)

*Doel: Verhoging van de conversiewaarde per bezoeker en uitbreiding van het B2B-aanbod.*

- [ ] **Tool 3 (Consument): Beton- & Mortel Calculator:**
  - Rekenmodel: zakken 25 kg premix vs. losse zand/grind/cement-verhouding (1:2:3).
  - Affiliate link naar cement/premix bij een bouwmarkt.
- [ ] **Tool 4 (Consument): Bestrating & Snijverlies Calculator:**
  - Berekening van tegels, klinkers, snijverlies (8–10%) en benodigd zandbed.
  - Affiliate links naar voegmortel, opsluitbanden en tegeldragers.
- [ ] **Tool 5 (B2B): CAMT.053 / MT940 Bankexport Converter:**
  - Converteert bank-exports naar schone formaten voor Exact, Moneybird en Yuki.
  - Inbegrepen in hetzelfde € 9/mnd Micro-SaaS abonnement (verhoogt retentie en verlaagt churn).
- [ ] **Lead Capture:**
  - Gratis downloadbare checklists (bijv. "UBL Fouten Cheat Sheet" of "Terras Aanleg Checklist")
    in ruil voor e-mailadressen.

### 🏢 Mijlpaal 3: Doorgroei naar € 3.000 – € 5.000 / maand (B2B Teams & Expansie)

*Doel: Zakelijke teamlicenties, API-toegang en internationale organische expansie.*

- [ ] **B2B Teamlicenties & REST API:**
  - Administratiekantoren en softwarehuizen betalen € 29 tot € 49 / maand voor teamtoegang of
    geautomatiseerde factuurvalidatie via API.
- [ ] **Directe Leveranciersponsoring:**
  - Vaste bannerdeals met gespecialiseerde zand-/grindleveranciers (€ 250 – € 500 per maand per
    vaste sponsorplek).
- [ ] **Internationale Expansie (DE/EN):**
  - UBL/Peppol validator vertalen naar `/en/` en `/de/` voor de bredere Europese markt.

### Toetsingskader

Elk voorstel wordt getoetst tegen de mijlpaal waar we ons op dat moment in bevinden, niet tegen
een groot vergelijkingsbedrijf zoals Omni Calculator of RapidTables — geen teamgrootte, geen
live-ops, geen marketingbudget, dit is en blijft een solo, organisch project (zie ook `CLAUDE.md`
§ Core Regel: SEO-Eerst en § Core Regel: Monetisatie).

## Staging-workflow

**Vastgelegd 12 september 2026, bindend.** Elke wijziging (nieuwe tool, aanpassing aan een
bestaande tool, homepage-wijziging) wordt eerst gebouwd en getest op
`staging.johanlijffijt.dev`, pas daarna — na Johans expliciete "GO voor productie" — naar `site/`
(productie) gekopieerd. Zie `CLAUDE.md` § Staging-omgeving voor de nginx-technische invulling
(aparte staging-mappen + `alias`, geen gedeelde brontekst voor pagina's die per omgeving kunnen
verschillen).

## Organische Groei & SEO Strategie

**Vastgelegd 12 september 2026, van kracht gebleven na de koerswijziging (zie CLAUDE.md §
SEO-Eerst-regel).** Groei komt uitsluitend uit organisch verkeer: zoekmachines (elke tool-pagina
geoptimaliseerd voor de exacte zoekvraag die hij beantwoordt), en — waar relevant — natuurlijke
linkgroei (bijv. iemand die een tool deelt in een forum/subreddit over klussen/tuinieren). Geen
advertentiebudget voor eigen promotie. `sitemap.xml`/`robots.txt`/JSON-LD moeten bij elke nieuwe
productie-URL meteen kloppen (zie Gouden Regel voor Deployment, punt 3).

## Bewuste keuzes die voor de hele roadmap gelden

- **Geen relatie met `solo-stack-blog`** — aparte identiteit/persona, nooit naar elkaar linken
  (zie `CLAUDE.md`).
- **Geen build-pipeline, geen framework** — elke tool is één zelfstandig HTML-bestand, bewerken
  = deployen (naar de juiste staging/productie-map). Dit is bewust simpeler dan de oude
  Vite/Phaser-gamebuilds, en past beter bij het soort content (rekenlogica + copy, geen
  interactieve graphics-engine).
- **Eén gedeelde eigen backend** (`api/`, zie `CLAUDE.md` § Eigen backend) voor feedback en
  click-/affiliate-tracking over alle tools heen — geen aparte database per tool.
