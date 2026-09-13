# Roadmap — johanlijffijt.dev (overkoepelend)

# GOUDEN REGEL VOOR DEPLOYMENT

**Absolute prioriteit — vastgelegd 12 september 2026, staat boven elke andere instructie in dit
bestand.**

1. **ALTIJD EERST NAAR STAGING:**
   - Elke wijziging, bugfix of nieuwe feature wordt UITSLUITEND gebouwd en gedeployd via
     `npm run deploy:staging`.
   - Raak de productiemap of `npm run deploy:prod` NOOIT autonoom aan.

2. **GEEN PRODUCTIE ZONDER EXPLICIETE 'GO':**
   - Pas wanneer Johan in de chat expliciet toestemming geeft (bijvoorbeeld "GO voor productie" of
     "Deploy naar prod"), mag het script `npm run deploy:prod` worden aangeroepen.
   - Vraag na elke succesvolle staging-deploy om review en wacht op dit expliciete akkoord.

Volledige achtergrond/reden in § Staging-workflow hieronder, en bovenaan `CLAUDE.md`.

---

# 🚨 CORE REGEL: Publiekstrekker & Retentie Eerst (Veel Publiek = Doel)

**Absolute prioriteit — vastgelegd 12 september 2026, staat op hetzelfde niveau als de Gouden
Regel hierboven. Volledige tekst + toepassing in `CLAUDE.md`.**

1. **Primair Doel:** elke feature/aanpassing/iteratie dient maximaal publiek trekken,
   spelersretentie maximaliseren en verslavende gameplay bouwen — zonder spelers geen bereik en
   geen inkomsten.
2. **Proactieve Spelers-Check:** een voorstel dat het spel té passief/saai/repetitief/niche maakt
   → Claude trekt direct aan de rem en doet concrete tegenvoorstellen op basis van beproefde
   mechanismen uit virale hits op itch.io/CrazyGames/Poki.
3. **Pijlers:** Spectakel & Juice (schermeffecten, directe feedback, ontploffingen, combo-audio) ·
   Actie boven Passiviteit (terugslaan/schieten + upgrades, niet puur vluchten) · Dopamine-loop
   (duidelijke progressie die motiveert tot "nog één potje").

## 🔍 Benchmarking & Inspiratiebron: Portals

Itch.io (tags `#arcade`/`#survival`/`#bullet-hell`/`#roguelite`), Poki en CrazyGames zijn de
actieve maatstaf — bij elke nieuwe mechanic kijken naar wat *Vampire Survivors*, *Brotato*,
*Void Scrappers*, *SNKRX* succesvol maakt (feedback/risico-beloning/tempo-oplossingen, juice- en
audio-cues) en die bewezen patronen proactief voorstellen i.p.v. het wiel opnieuw uitvinden.

---

Het grote plaatje voor de hub-site én de apps die eraan linken. Voor dagelijkse actiepunten, zie
`TODO.md` in deze map. Voor de gedetailleerde technische ontwikkelgeschiedenis van een specifieke
app, zie de `ROADMAP.md` in de map van die app zelf (bv. `~/projects/apps/tumble/ROADMAP.md`) —
dit bestand dupliceert dat niet, het geeft alleen de fases op hoofdlijnen.

## Visie

Een lichte, persoonlijke hub-pagina die naar apps linkt die Johan in avonduren en weekenden bouwt,
met als doel op termijn wat onafhankelijker te worden van een baan. Geen grote lanceringen, geen
haast — rustig bouwen, één ding tegelijk bewijzen voordat er een volgende bij komt.

## Pivot: van utility-apps naar browsergames (12 september 2026)

**Herroept de "geen ander thema (games o.i.d.)"-afspraak uit Fase 6/§ Bewuste keuzes hieronder,
zoals die tot 9 september 2026 gold.** Reden (Johans woorden): utility-apps zoals Tumble motiveren
hem simpelweg niet, en bouwplezier staat voorop — dat weegt zwaarder dan de eerder geplande
validatie-volgorde. Concreet:

- **Tumble gaat on hold** — geen actief vervolgwerk (geen Play Store-indiening, geen Fase 4-stappen
  uit Tumble's eigen ROADMAP.md), maar de bestaande build blijft online/bereikbaar via de try-it-
  links op de hub-pagina. Niet verwijderd, niet actief verder gebouwd.
- **Browsergames (HTML5, Phaser+Vite) worden het hoofdspoor**, niet meer via Expo Go: Expo Go is
  een test-tool voor developers, geen distributiekanaal voor eindgebruikers — een spel dat met één
  klik in de browser speelt (geen download/installatie) is oneindig veel makkelijker te delen via
  social media/gameportals.
- Eerste game: **Meteor Dodge** (werktitel), zie `~/projects/apps/meteor-dodge/` — live op
  `https://johanlijffijt.dev/game/`, gedeployed als statische Vite-build via de bestaande nginx op
  deze VPS (geen nieuwe infrastructuur, zelfde patroon als de rest van deze site).
- Deze hub-pagina zelf (`site/index.html`) leidt op dit moment nog met Tumble's grace-dag-verhaal
  (zie § Herziening hub-pagina in `CLAUDE.md`) — nog niet herschreven naar een games-hub. Staat als
  open punt in `TODO.md`.

## Fases

1. **Hub-site live** — *afgerond, 7 september 2026.* Domein, HTTPS, statische pagina.
2. **Eerste app gekoppeld: Tumble** — *afgerond, on hold sinds 12 september 2026 (zie pivot
   hierboven).* Try-it-links, feedbackformulier, contactformulier, privacy policy, click-tracking.
3. **Eerste browsergame: Meteor Dodge** — *fase 1 afgerond, 12 september 2026, sindsdien in
   doorlopende iteratie via de Dagelijkse Game Optimization Loop hieronder.* Speelbare core loop
   live op `/game/`. Zie Meteor Dodge's eigen ROADMAP.md voor de vervolgstappen (mobiel testen,
   naam definitief maken, delen/validatie).
4. **Hub-pagina herschrijven rond games** — *afgerond, 12 september 2026.* `site/index.html` is nu
   een "Indie Game Arcade & Hub" met een speelbare-nu-hero, een kaartengrid en een generieke
   feedbackpagina (`site/feedback/`) — zie `CLAUDE.md` § Homepage herschreven tot arcade-hub voor
   de details.
5. **Portfolio uitbouwen richting eerste inkomsten** — *bewust singleplayer-only, zie § Scope
   hieronder.* Doel: een strakke portfolio singleplayer-arcadegames, organisch verkeer opbouwen, en
   de allereerste inkomsten via advertenties/gameportals — zelfde "geen investering vóór
   validatie"-instinct als bij Tumble, nu toegepast op games i.p.v. op utility-apps.

## Dagelijkse Game Optimization Loop (vastgelegd 12 september 2026)

Vast terugkerend proces, niet een eenmalige actie — het idee is dat elke game in deze portfolio
stapsgewijs evolueert van een functioneel prototype naar een **verslavende arcade-hit**, via
herhaalde kleine, onderbouwde iteraties in plaats van in één keer "af" proberen te zijn. Zie
`CLAUDE.md` § Rol: Game Researcher & Optimization Lead voor wie dit binnen een sessie oppakt.

De lus, elke keer in dezelfde volgorde:

1. **Research** — kijk naar wat aantoonbaar werkt bij succesvolle webgames (Poki, CrazyGames,
   itch.io): welke mechanics, welke retentie-trucs, welke onboarding-patronen.
2. **Psychologisch inzicht** — vertaal die observatie naar een retentie-principe (near-miss effect,
   micro-feedback loops, dopamine-triggers, "juice") dat verklaart *waarom* het werkt, niet alleen
   *dat* het werkt.
3. **Hypothese** — een concrete, toetsbare aanname voor Meteor Dodge (of een volgende game) op
   basis van dat inzicht — geen vage richting ("meer juice") maar een specifiek voorstel.
4. **Concrete code-aanpassing** — implementeer de hypothese daadwerkelijk in de game-code. De lus
   is pas rond als er een zichtbare/speelbare verandering live staat, niet bij een voorstel op
   papier.

**Iteratie 1 (12 september 2026, dezelfde dag als de pivot):** touch-besturing met verticale
offset (het schip zweeft boven de vinger i.p.v. eronder, zodat de duim het niet meer bedekt),
een ruimtesfeer-visuele-upgrade (schip/meteoren/parallax-sterrenhemel, alle procedureel
gegenereerd) en de eerste retentie-juice (coin-collectibles, near-miss-bonus met "+10 Close!"-
popup, explosie/screen shake bij botsing, highscore via localStorage).

**Iteratie 2 (12 september 2026, na feedback op iteratie 1):** de verticale-offset-besturing bleek
nog steeds een absolute mapping, dus liet het schip "teleporteren" (en soms oneerlijk in een
meteoor botsen) zodra de vinger werd opgetild en elders opnieuw neergezet. Vervangen door
relatieve delta-drag (pointerdown ankert vinger-positie tegen huidige scheepspositie, pointermove
past alleen het verschil toe) — het schip staat nu stil zodra er niet wordt gesleept, ongeacht waar
de vinger landt. Daarnaast een procedurele geluids-synthesizer via de Web Audio API toegevoegd
(coin/near-miss/explosie-geluiden, geen audiobestanden) met een mute-knop en autoplay-policy-proof
initialisatie op de eerste tap.

**Iteratie 3 (12 september 2026) — Benchmark → Psychologisch inzicht → Hypothese:**

- *Benchmark:* Vampire Survivors-achtige micro-loops (elke pickup krijgt overdreven feedback:
  flash/geluid/korte tijdsvertraging), bullet-hells/wave-shooters (spanning/ontspanning wisselen
  elkaar af i.p.v. vlakke moeilijkheidscurve), en games met persistent currency (een mislukte run
  voelt minder verlies-vol als er toch iets blijvends is opgebouwd).
- *Psychologisch inzicht:* een korte "hit-stop" (freeze-frame) laat een routine-actie zwaar/
  impactvol aanvoelen zonder dure animatie; een waarschuwing vóór een piekmoment triggert
  anticipatie; zichtbare voortgang richting een concrete unlock (i.p.v. alleen een vergankelijke
  score) verhoogt de motivatie om na een game-over toch nog een run te starten.
- *Hypothese:* een korte hit-stop + felle burst bij het pakken van een ster, een terugkerende
  "meteor-shower"-golf (waarschuwing → piek → rustigere bonus-wave) i.p.v. een vlakke curve, een
  persistente "Space Dust"-teller met voortgang richting een toekomstige schip-unlock, én
  achtergrondmuziek voor de flow-state, zouden samen meer "kick" en meer reden-om-opnieuw-te-
  spelen moeten geven.
- *Concrete code-aanpassing (afgerond, live):* hit-stop (40ms physics-pause) + gouden particle-
  burst + score-tekst-"pop" bij coin-pickup; wave-systeem (elke 30s een waarschuwing, dichte
  meteor-burst, dan een coin-gevulde bonus-wave, dan terug naar normaal — de vlakke moeilijkheids-
  ramp pauzeert tijdens een wave-event i.p.v. te stapelen); "Space Dust" in localStorage (elke
  ster telt mee, blijft over runs heen bestaan) met voortgang op het Game Over-scherm richting een
  toekomstige schip-kleur-unlock (bewust een preview, geen echt functionerend unlock-systeem —
  dat is een grotere feature voor een latere iteratie); procedurele chiptune-achtergrondmuziek
  (bas + arpeggio via Web Audio API, geen audiobestand), tempo loopt licht op met de score, wordt
  gedempt/uitgefaded bij game-over, gaat door de bestaande mute-knop. Volledige technische details
  en de onderbouwing per keuze (alle drie iteraties) staan in
  `~/projects/apps/meteor-dodge/CLAUDE.md`.

**Iteratie 4 (12 september 2026) — na Johans staging-review van iteratie 1-3:**

- Twee bugfixes uit de staging-review: het "Best:"-label linksboven bleek niet realtime mee te
  lopen tijdens het spelen (alleen op het Game Over-scherm zelf klopte het al) — nu bijgewerkt
  zodra `score > bestScore`, met een aparte `sessionStartBest`-snapshot om "is dit een nieuw
  record" te blijven kunnen bepalen. Retry-tekst kreeg het exacte gevraagde format
  ("TAP TO RETRY / PRESS SPACE").
- *Hypothese (Top-5-benchmarkpsychologie):* near-miss-beloningen tunen naar kleinere, frequentere
  bonussen (20px marge, +5 i.p.v. +10) houden het spannend zonder de score-economie te
  ontwrichten; een oplopende toonhoogte bij snel-achter-elkaar sterren rapen (combo-pitch) geeft
  auditieve feedback voor een "streak", een bekende retentie-truc uit ritme-/combo-games.
- *Concrete code-aanpassing (afgerond, staging):* near-miss-marge/beloning/tekst aangepast (het
  mechanisme zelf bestond al sinds iteratie 3 — hier bewust hergebruikt en getuned, niet
  gedupliceerd); `SoundManager.playCoin(combo)` transponeert de coin-chime per combo-stap
  (max 8) omhoog, combo reset na 2s zonder pickup. **Nog niet naar productie** — staat op
  `staging.johanlijffijt.dev`, wacht op test + expliciete "GO".

**Pauzefunctie + synthwave-audio-herwerking (12 september 2026, zelfde dag):** 'P'/Escape/knopje
pauzeren nu het spel (physics/timers/flame-flicker bevroren, muziek gedempt via een lowpass-sweep
i.p.v. gestopt). Audio omgegooid van "schelle jaren 80 piepjes" naar een warmere synthwave-richting:
100→126 BPM, `square`-golven vervangen door `triangle`/`sawtooth`, een pompende baslijn +
kick/snare-ritmesectie, één gedeeld lowpass-filter op de muziekbus. Zie
`~/projects/apps/meteor-dodge/CLAUDE.md` voor de volledige technische onderbouwing (incl. een
Phaser-brontekst-check die voorkwam dat `tweens.pauseAll()` de pauze-hint-tekst zelf ook zou
bevriezen). **Staging only.**

**Fundamentele transformatie: Meteor Dodge → "Meteor Survivor" (12 september 2026, zelfde dag) —**
zie de nieuwe CORE REGEL hierboven ("Publiekstrekker & Retentie Eerst"): van pure ontwijker naar
auto-shooter roguelite. Auto-vurende lasers vernietigen meteoren (klein = 1 hit, nieuwe grote
variant = 3 hits), destructie levert Space-Dust-drops op die een magneet naar het schip trekt, en
een EXP-balk triggert een level-up-keuzemenu (Twin Laser / Overdrive / Super Magnet) dat de
gameplay-intensiteit per run laat opbouwen. Bestaande systemen (wave-pacing, near-miss, hit-stop,
meta-progressie, pauze) blijven intact, dit is een laag erbovenop, geen vervanging. Volledige
technische details in `~/projects/apps/meteor-dodge/CLAUDE.md` § Fundamentele transformatie.
**Grootste ongeteste wijziging tot nu toe — staging only, wacht op uitgebreide test + "GO".**

## Scope: singleplayer-only tot bewezen inkomsten (vastgelegd 12 september 2026)

Expliciete scope-beslissing van Johan, om afleiding en over-engineering te voorkomen zolang er nog
geen bewezen spelersbasis of inkomsten zijn:

- **Geen multiplayer, geen backend-networking** (WebSockets/Socket.io of vergelijkbaar) voorlopig.
  De focus ligt 100% op snelle, laagdrempelige HTML5/Phaser **singleplayer**-arcadegames die direct
  starten — geen wachttijd, geen lege lobby's, geen matchmaking om over na te denken.
- **Eerste doel:** een strakke portfolio van dit soort games, organisch verkeer opbouwen (zie
  Dagelijkse Game Optimization Loop hierboven) en de allereerste inkomsten genereren via
  advertenties/gameportals (Poki/CrazyGames-achtige distributie) — dit is **monetisatie van de
  games zelf**, geen tegenspraak met de "geen betaalde marketing"-regel hieronder (dat gaat over
  geld uitgeven om verkeer te *kopen*, niet over geld *verdienen* via ad-supported portals).
- **Iedere game in deze portfolio blijft singleplayer** totdat er een bewezen spelersbasis én een
  stabiele inkomstenstroom is — zie § Toekomstvisie / Post-Revenue hieronder voor waar multiplayer
  dan wél weer op tafel komt. Actieve taken in `TODO.md` blijven daarom gericht op het
  perfectioneren van core loop, juice, audio en retentie van de huidige singleplayer-titels
  (te beginnen met Meteor Dodge) — geen multiplayer-concepten oppakken als "leuk zijstapje".

## 🎯 Commercieel tussendoel & catalogusstrategie (vastgelegd 13 september 2026)

Concretiseert § Scope hierboven ("eerste inkomsten via advertenties/gameportals") met echte
getallen, na een strategie-sessie met Johan:

- **Tussentijds doel:** een stabiele **€500/maand** aan passieve advertentie-inkomsten als eerste
  commerciële mijlpaal — geen eindstation, wel het eerste concrete bewijs dat dit spoor werkt.
- **Rekenmodel:** bij een gemiddelde portal-eCPM van ~€2,00-€3,00 is daarvoor ~150.000-250.000
  plays/maand nodig. Dit is een vuistregel om beslissingen aan te toetsen, geen keihard gegarandeerd
  getal — eCPM's variëren sterk per portal/regio/seizoen.
- **Portfolio-hefboom, niet één toevalstreffer:** een compacte **catalogus van 3 tot 5
  micro-games**, elk met een bescheiden doel van ~1.200-2.000 plays/dag, telt op tot het
  maandtotaal. Dit spreidt het risico dat één titel simpelweg niet aanslaat — precies de reden dat
  Meteor Survivor niet de enige titel blijft (zie § Directe actie: Game 2 hieronder).
- **Bouwcadans:** de basisinfrastructuur die voor Meteor Survivor is opgezet (Vite+Phaser-scaffold,
  nginx-deploy-patroon, Playwright E2E-testgate vóór elke staging-deploy, portal-packaging via
  Python's `zipfile`) is nu een **herbruikbare mal**, geen eenmalig maatwerk. Vandaar een streven
  van **~2 effectieve bouwdagen (8-12 uur) per nieuwe micro-titel**:
  - *Dag 1:* Prototype & Core Mechanic — de kernloop speelbaar, nog kaal.
  - *Dag 2:* Juice, Audio, Balans & Packaging — procedurele visuals/audio (zelfde aanpak als Meteor
    Survivor, geen externe assets), afronden, portal-export.
- **Tijdlijn:** streven naar een actieve catalogus van 3 à 4 titels live binnen 3-4 weken vanaf
  13 september 2026.

**Status Meteor Survivor: monitoring-modus (13 september 2026).** Geen actieve verdere development
totdat er spelersdata/portal-reviews binnenkomen — de Dagelijkse Game Optimization Loop hierboven
pauzeert voor deze titel, niet omdat het project stopt, maar omdat verder itereren zonder
spelersfeedback gokwerk zou zijn. **Uitzondering:** zodra CrazyGames de lopende review goedkeurt,
heeft **CrazyGames SDK-integratie (rewarded ads + midrolls)** direct prioriteit boven alle andere
Meteor Survivor-werk — dat is de eerste concrete stap richting het €500/maand-doel op een titel die
al bewezen speelbaar/goedgekeurd is.

**Status Neon Drift: on-hold (13 september 2026).** Strategisch besluit om ontwikkelsnelheid te
richten op Titel 3 (Gravity Flip, zie hieronder) i.p.v. ad-hoc door te sleutelen aan Neon Drift's
pseudo-3D camera/wegdek. Laatste staat: werkende, volledig geteste build (17/17 E2E-tests) op
staging, geen halfwerkende tussenstand — zie `TODO.md` en `~/projects/apps/neon-drift/CLAUDE.md`.

## Directe actie: Game 2 — Neon Drift (13 september 2026, on-hold)

Eerste uitbreiding van de catalogus-strategie hierboven. Zie `~/projects/apps/neon-drift/` voor de
scaffold en `TODO.md` voor de dag-1/dag-2-taken.

- **Genre/concept:** snelle neon/synthwave arcade drift-/reflexgame — one-touch/snappy
  stuurmechaniek, korte speelsessies (past bij portal-ad-economie: meer sessies/uur = meer
  ad-impressies dan één lange sessie).
- **Bewuste herkenbare afwijking van Meteor Survivor:** geen vrije 2D-beweging + auto-shoot, maar
  een strak 3-lane-dodge-mechaniek — portfolio-diversificatie i.p.v. dezelfde game met een ander
  jasje, terwijl de onderliggende tech (Vite/Phaser/procedurele graphics/Web Audio/Playwright-gate)
  hergebruikt wordt.
- **Workflow:** zelfde Gouden Regel als altijd — eerst `staging.johanlijffijt.dev`, pas na
  expliciete "GO" naar productie.
- **Ethische monetisatie ("skip voor regulier, bekijk voor 2x"):** eerste implementatie van de
  bindende Game Over-beloningsflow uit `CLAUDE.md` § Respectvolle Ad-Pacing & GEEN Playable Ads —
  twee expliciete knoppen (gratis directe herstart, of een opt-in rewarded video die de score
  verdubbelt), mock-first via `RewardAdManager` zodat de flow nu al end-to-end getest is, vooruit-
  lopend op echte CrazyGames-SDK/AdMob-integratie.

## Directe actie: Game 3 — Gravity Flip (13 september 2026)

Derde titel in de catalogus-strategie, gestart terwijl Neon Drift on-hold staat (zie hierboven).
Zie `~/projects/apps/gravity-flip/` voor de scaffold en `TODO.md` voor de dag-1-taken.

- **Genre/concept:** minimalistische 2D side-scrolling neon-runner met **one-button/deterministic
  gameplay** — één tap/Spatie/pijl-omhoog kaart de zwaartekracht om (vloer ↔ plafond). Bewuste
  keuze voor determinisme na Neon Drift's pseudo-3D-camera-gedoe: geen doorlopende camera-
  beweging, geen perspectief-projectie om fout te krijgen — de camera scrollt strak horizontaal
  mee met een vaste snelheid, punt uit.
- **Bewuste herkenbare afwijking van Meteor Survivor/Neon Drift:** een derde duidelijk ander
  besturingsparadigma (one-button i.p.v. vrije 2D-beweging of 3-lane-sturen) — portfolio-
  diversificatie, dezelfde onderliggende tech (Vite/Phaser/procedurele graphics/Web Audio/
  Playwright-gate) hergebruikt.
- **Workflow:** zelfde Gouden Regel als altijd — eerst `staging.johanlijffijt.dev`, pas na
  expliciete "GO" naar productie.

## Toekomstvisie / Post-Revenue

**Bewust hier geparkeerd, niet nu oppakken** — het idee blijft bewaard zodat het niet steeds
opnieuw ter sprake hoeft te komen, maar het is nadrukkelijk geen actieve taak:

- **Multiplayer** (realtime, WebSockets/Socket.io of vergelijkbaar) is een mogelijke latere fase,
  pas te overwegen zodra er een bewezen spelersbasis is én een stabiele inkomstenstroom uit de
  singleplayer-portfolio (zie § Scope hierboven). Geen concrete plannen, geen architectuur-
  voorbereiding vooruit bouwen — dat zou precies de over-engineering zijn die deze scope-
  beslissing wil voorkomen.

## Fase 4 — Native Mobile Export via Capacitor (vastgelegd 13 september 2026, gate-based, niet nu starten)

**Formele toevoeging aan de roadmap, bewust nog niet actief** — net als § Toekomstvisie hierboven:
het idee staat vastgelegd zodat het niet steeds opnieuw ter sprake hoeft te komen, maar niemand
begint hieraan totdat de harde triggers hieronder zijn gehaald.

- **Doel:** bewezen webgames uit de catalogus (zie § Commercieel tussendoel hierboven) omzetten
  naar native apps voor Google Play/Apple App Store, via **Capacitor** — een WebView-wrapper om de
  bestaande Phaser `dist/`-bundle heen, geen herschrijven van gameplay-code.
- **Harde gates vóór start (allebei, niet één van beide):**
  1. **Bewezen web-tractie:** alleen titels met >1.000 daily plays, of aantoonbare vraag naar een
     offline/installeerbare versie (bv. herhaalde speler-verzoeken).
  2. **Kosten al gedekt:** de web-inkomsten van die titel moeten de accountkosten dekken vóór
     indiening — $25 eenmalig (Google Play) en $99/jaar (Apple Developer Program) — dus geen geld
     vooruit investeren op een titel die zichzelf nog niet bewezen heeft.
- **Techniek (voor zodra de gates gehaald zijn):** Capacitor iOS/Android-shell, Google AdMob SDK
  (rewarded video ads als primair verdienmodel, consistent met de ad-supported-aanpak hierboven),
  optioneel een simpele IAP ("Ad-free") — geen ingewikkelder monetisatie dan dat.
- **Backlogtaak (niet nu oppakken):** ooit een losse spike reserveren om een Capacitor-export uit
  te proberen op de eerste titel die de tractie-gate haalt — pas relevant zodra dat moment zich
  voordoet, zie `TODO.md`.

## Organische Groei & SEO Strategie (vastgelegd 12 september 2026)

Naast de Dagelijkse Game Optimization Loop (gameplay/juice) nu ook een structurele **Daily SEO &
Traffic Loop** — vindbaarheid is net zo'n doorlopend aandachtspunt als retentie, geen eenmalige
toevoeging. Sluit aan bij § Scope hieronder: organisch verkeer is de eerste groeimotor, vóór er
sprake is van betaalde marketing of een bewezen inkomstenstroom.

- **Technische fundering (afgerond, 12 september 2026):** `sitemap.xml` + `robots.txt`, JSON-LD
  (`schema.org/VideoGame`) op de homepage en op Meteor Dodge's eigen pagina, verificatie-
  placeholders voor Google Search Console/Bing Webmaster Tools. Zie `CLAUDE.md` § Technische
  SEO-fundering voor de details.
- **Google Analytics (GA4) geïntegreerd (13 september 2026)** — een ander soort meting dan Search
  Console: Search Console laat zien hoe Google de site *indexeert* (zoektermen, indexeringsstatus),
  GA4 laat zien wat echte bezoekers *doen* (sessies, welke game gespeeld wordt, `game_start`/
  `game_over`/`click_itch`-events). Measurement ID `G-TLWY630Z6D`, uitsluitend voor productie —
  zie `CLAUDE.md` § Google Analytics (GA4) voor het hostname-hard-filter en de bewuste keuze om
  staging/localhost volledig buiten GA4 te houden (geen aparte staging-property).
- **Monitoring:** zodra Google Search Console gekoppeld is (zie `TODO.md`) — impressies/clicks per
  zoekterm volgen, indexeringsfouten signaleren, `sitemap.xml` opnieuw indienen na elke nieuwe
  pagina/game.
- **Keyword-targeting:** rondom webgame-gerelateerde zoektermen (bv. "free browser games", "html5
  arcade games", "play online no download", en later game-specifieke termen zoals "meteor dodge
  game") — copy/meta's hierop laten aansluiten zodra er zoekdata binnenkomt, niet vooraf gissen.
- **Externe distributie:** publiceren op gameportals (itch.io, CrazyGames, Poki) als aanvullend
  organisch kanaal naast directe zoekverkeer — zelfde "geen betaalde marketing"-instinct
  (organische portal-plaatsing, geen advertentiebudget om op die portals te promoten).
- **Export-profiel voor portals (afgerond, 12 september 2026):** Meteor Dodge heeft nu
  `npm run build:portal` — een relatieve-paden-build (`base: './'`) naast de absolute-paden-build
  die de eigen site nodig heeft, geverifieerd geschikt voor itch.io/CrazyGames' zip-upload. Zie
  `~/projects/apps/meteor-dodge/CLAUDE.md` § SEO-metadata + itch.io-exportprofiel voor de details
  (incl. een bewuste afwijking van de oorspronkelijke `inLanguage`-vraag — de game is
  Engelstalig, geen Nederlandse localisatie aanwezig).
- **Portal-export volledig geautomatiseerd (12 september 2026, zelfde dag):** `npm run zip` bouwt
  én pakt in tot een kant-en-klare `meteor-dodge-portal.zip` — de eerdere blokkade (geen `zip`-CLI
  op de VPS, geen sudo om die te installeren) omzeild via Python's ingebouwde `zipfile`-module
  i.p.v. een handmatige stap te blijven documenteren. Daarnaast een subtiel feedback-linkje
  rechtsonder in de game zelf (`target="_blank"`, nodig omdat de game op een portal in diens eigen
  iframe draait) — zodat portal-spelers een weg terug naar `johanlijffijt.dev/feedback/` hebben.
  Volledige upload-instructies voor itch.io in `~/projects/apps/meteor-dodge/CLAUDE.md`
  § Upload naar itch.io. **Uitsluitend naar staging gedeployed**, wacht op test + "GO".

## Staging-workflow (vastgelegd 12 september 2026, verscherpt tot bindende regel dezelfde dag)

**Strikte deployment-regel, zonder uitzondering** (zie ook de banner bovenaan `CLAUDE.md`):

1. **Build → Deploy Staging.** Elke code-wijziging, bugfix of nieuwe feature gaat via
   `npm run deploy:staging` (in het game-project, bv. `~/projects/apps/meteor-dodge/`).
   `npm run deploy:prod`/`npm run deploy` blijven onaangeraakt tijdens ontwikkelen/testen.
2. **Wachten op expliciete "GO".** Pas nadat Johan zelf op `https://staging.johanlijffijt.dev/`
   heeft getest én in de chat expliciet akkoord geeft ("GO voor productie" of gelijkwaardig), mag
   `npm run deploy:prod` uitgevoerd worden — nooit op eigen inschatting dat het "wel goed genoeg
   zal zijn".
3. **Pas dan Deploy Prod.**

Dit vervangt niet de behoefte aan een echte fysieke-toestel-test (zie de openstaande punten in
`TODO.md` bij eerdere iteraties) — staging is een verplichte tussenstap tussen "lokaal gebouwd" en
"productie", niet een vervanging van "met eigen ogen/oren bevestigd".

**Vóór stap 1 zit nu ook een geautomatiseerde poort (12 september 2026):** Meteor Dodge draait een
Playwright-E2E-suite automatisch vóór elke `npm run deploy:staging` (via npm's `predeploy:staging`-
hook) — een falende test **blokkeert de deploy daadwerkelijk**, niet alleen als afspraak op papier
(getest: een assertie bewust laten falen, bevestigd dat de deploy zelf dan nooit start). Vangt
regressies af zoals de ontbrekende Y-as-besturing en de God Mode-bug uit eerdere iteraties, vóórdat
Johan ze zelf op staging hoeft te ontdekken. Volledige technische details (inclusief hoe headless
Chromium zonder root aan het draaien is gekregen) in
`~/projects/apps/meteor-dodge/CLAUDE.md` § Geautomatiseerde E2E-verificatie.

## Bewuste keuzes die voor de hele roadmap gelden

- **Geen betaalde marketing/advertenties** — groei loopt via organisch delen en community-posts.
- **Bouwplezier weegt zwaarder dan een vooraf vastgelegde validatie-volgorde** (zie pivot
  hierboven) — dit vervangt de eerdere "geen scope-verbreding vóór validatie"-afspraak van
  9 september 2026 voor zover die games uitsloot. Scope-verbreding blijft wel iets om bewust te
  doen, niet impulsief — vandaar dat deze herziening hier expliciet gelogd staat.
- **Documentatie blijft bij de code die ze beschrijft** — deze roadmap geeft het overzicht, de
  technische details staan in de eigen `CLAUDE.md`/`ROADMAP.md` van elk project.
