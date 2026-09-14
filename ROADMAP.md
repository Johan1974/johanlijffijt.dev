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
- Productie draait sinds "GO voor productie" op 14 september 2026 op de nieuwe Tools
  Hub-homepage + materiaalcalculator (zie Gouden Regel voor Deployment).
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

#### 🛒 Geavanceerde tools — concept: "Klusmand & Materiaal Optimizer" (N-Store Arbitrage)

**Vastgelegd 14 september 2026, Johans strategisch inzicht — concept, nog niet gestart. Opgeschaald
dezelfde dag van vaste 2-aanbieder-splitsing naar flexibele N-store-arbitrage.**
Vergelijkingssites vergelijken vrijwel nooit per artikel binnen één samengesteld project; dat is
precies de opening voor deze tool.

- **Probleem:** consumenten kopen nu alles bij 1 bouwmarkt uit gemak, terwijl mixen (bijv. stenen
  bij Bouwmarkt A en big bags zand bij Bouwmarkt B) tientallen tot honderden euro's bespaart.
- **Kernfunctionaliteit:** gebruiker stelt een gecombineerd project samen (bijv. bestrating +
  ophoogzand + worteldoek); het algoritme splitst niet langer per se over precies 2 aanbieders,
  maar zoekt flexibel over N leveranciers.
- **Algoritme (Combinatorische Mand-Optimizer):**
  - Berekent alle combinaties over N winkels: Prijs(artikelen) + Bezorgkosten(per unieke
    leverancier) — bezorgkosten tellen dus maar één keer per leverancier mee, niet per artikel.
  - Automatische detectie van gratis pakketverzending (bijv. klein materiaal via webshop/
    pakketpost) versus zwaar vrachtvervoer (big bags/stenen per vrachtwagen) — dit onderscheid
    bepaalt of splitsen over meerdere leveranciers de bezorgkosten juist laat oplopen of niet.
- **Resultaten-UI:**
  - Toont de "Optimale Mand-Samenstelling": kan bestaan uit 1, 2 of 3 leveranciers, niet vast op 2.
  - Geeft per leverancier een directe bestelknop met deeplink naar de specifieke artikelen.
  - Toont de nettobesparing ten opzichte van de goedkoopste 'alles-in-1'-aanbieder.
- **Commercieel voordeel:** meervoudige affiliate-kliks — de bezoeker rekent mogelijk af bij
  meerdere adverteerders in plaats van één, schaalt mee met N in plaats van vast op twee.
- **Feature: Store Exclusion met "Groot Voordeel"-Trigger (Soft Exclusion):**
  - **Gebruikerscontrole:** eenvoudige toggles/checkboxes om specifieke winkels uit te sluiten van
    het vergelijkingsresultaat.
  - **Drempelwaarde-alert (besparings-geweten):** het algoritme toetst de uitkomst altijd tegen
    het absolute marktminimum inclusief de uitgesloten winkels. Levert een uitgesloten winkel een
    significant voordeel op (drempelwaarde bijv. > € 25 of > 10% van het orderbedrag), dan toont
    de UI een vriendelijke alert: "Je hebt [Winkel X] uitgesloten, maar als je [Artikel Y] tóch
    daar bestelt bespaar je € ZZ extra. [Toon optie met Winkel X]".
  - Blijft het verschil onder de drempelwaarde, dan respecteert de tool de uitsluiting 100%
    geruisloos — geen alert, geen guilt-tripping bij een verwaarloosbaar verschil.
- **Feature: "Mijn Klusprofiel" (client-side state via `localStorage`):**
  - **Concept:** gebruiker stelt eenmalig zijn situatie in; alle tools op het platform rekenen
    direct gepersonaliseerd door zonder logins of server-accounts.
  - **Profiel-instellingen:**
    - Transport: "Laten bezorgen" vs. "Zelf ophalen / eigen aanhanger" (bepaalt of bezorgkosten
      meegerekend worden in de arbitrage).
    - Klantenkaarten: Gamma Voordeelpas, Karwei Kaart, Hornbach ProfiCard.
    - Winkelvoorkeuren: uitsluitingen van specifieke aanbieders (koppelt direct aan de Store
      Exclusion-feature hierboven — hetzelfde uitsluitingsprofiel, niet twee losse instellingen).
  - **Techniek:** pure browseropslag (`localStorage`), zero-backend-frictie, privacy-vriendelijk
    en instant actief over de hele Tools Hub — geen aparte database/account-systeem nodig, dus
    geen nieuwe infrastructuur naast de bestaande `api/`-backend.
  - **Commerciële waarde:** verhoogt terugkerend bezoek (retentie) en vormt de basis voor latere
    B2B/zzp-exportfuncties.
- **Afhankelijkheid:** vereist een werkende live prijsfeed per aanbieder (zie § Universele
  Dynamische Prijsvergelijker, Fase B) — zonder betrouwbare, actuele prijzen per artikel is een
  combinatorische optimalisatie per definitie een schatting, wat tegen de "geen handmatig beheerde
  bedragen"-regel in `CLAUDE.md` ingaat. Komt dus pas na Fase B, niet ervoor — en pas voor meer dan
  2 leveranciers relevant zodra er ook daadwerkelijk meer dan 2 aanbieders een live feed leveren.

### 🔀 Overkoepelend architectuurpatroon: Universele Dynamische Prijsvergelijker

**Van toepassing op alle affiliate-tools uit Mijlpaal 1 én 2** — vervangt het losse statische
affiliate-knop-patroon (zie § Core Regel: Monetisatie in `CLAUDE.md`) door één herbruikbaar
vergelijker-component per tool:

- Materiaalcalculator: Gamma vs. Karwei vs. specialist (zand, grind, boomschors big bags).
- Betoncalculator (Tool 3): vergelijking per zak premix beton/cement.
- Bestratingcalculator (Tool 4): opsluitbanden, voegzand, tegeldragers.
- B2B-tools: vergelijking van Peppol/e-facturatie-softwareabonnementen.

**Twee fasen — herzien 14 september 2026 (Johans kwaliteits-/integriteitsbesluit: géén
handmatig beheerde bedragen in de interface, ook niet indicatief-gelabeld):**
1. **Fase A (lean start, huidige staat):** vergelijker-UI **zonder bedragen** — pure deeplinks per
   aanbieder ("Bekijk actuele prijzen bij Gamma/Karwei →"), inert totdat een echte
   partnerkoppeling er is (zie § Core Regel: Monetisatie). Een eerdere versie toonde wél
   geschatte/handmatige `v.a. €`-bedragen (`prices.json`-mockup) — teruggedraaid nadat bleek dat
   een handmatige schatting 40% van de echte prijs kon afwijken. Prijzen tonen we pas weer zodra
   Fase B draait.
2. **Fase B (geautomatiseerd, pas dan bedragen tonen):** centrale cronjob op de VPS die dagelijks
   productfeeds (TradeTracker/Daisycon CSV/XML) inleest en wegschrijft naar `api/data/prices.json`
   — geen handmatig onderhoud per tool, dus geen mens meer tussen de bron en het getoonde bedrag.
   Bouwt voort op de bestaande `api/`-backend (zie `CLAUDE.md` § Eigen backend), geen nieuwe
   infrastructuur ernaast.

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

### 🌐 Fase: Eventuele Domeinmigratie naar Nederlands Merklabel (Optioneel, Post-Validatie)

**Vastgelegd 14 september 2026 — geparkeerd voor de huidige fase, formeel vastgelegd voor de
lange termijn.** Geen actie nu; de discussie is voor nu definitief gesloten, dit is alleen de
overstapstrategie voor het moment dat de voorwaarde eronder ooit wordt gehaald.

- **Voorwaarde vóór overweging:** stabiele tractie en bewezen omzet (> € 250–500/maand) op
  `johanlijffijt.dev` — geen domeinwissel op basis van een hypothese, pas na bewijs.
- **Architectuur & SEO-veiligheid, mocht die drempel ooit gehaald worden:**
  - Geen verlies van opgebouwde waarde: overstap via een HTTP 301 Permanent Redirect in nginx
    (`return 301 https://nieuw-domein.nl$request_uri;`).
  - Behoud van Google-rankings, backlinks en traffic via de officiële 'Adreswijziging'-verhuistool
    in Google Search Console.
  - Oude links naar tools blijven hierdoor 1-op-1 geruisloos functioneren.
- **Focus blijft nu 100% op het valideren van de eerste 3 tools op `johanlijffijt.dev/tools/`** —
  zie `TODO.md` voor de evaluatie-trigger.

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
