# Todo — dagelijks bij te werken

## Meteor Survivor: monitoring-modus (13 september 2026)

Zie ROADMAP.md § Commercieel tussendoel & catalogusstrategie — geen actieve verdere development
totdat spelersdata/portal-reviews binnenkomen.

- [ ] **Uitzondering, hoogste prioriteit zodra van toepassing:** zodra CrazyGames de lopende review
      goedkeurt → direct CrazyGames SDK-integratie oppakken (`gameplayStart()`/`gameplayStop()`-
      events, rewarded ads/midrolls, Full Launch) — eerste concrete stap richting het
      €500/maand-doel.
- [ ] Reacties van Newgrounds (Under Judgment) en Kongregate (developer-goedkeuring) monitoren,
      geen actie totdat die binnenkomen.

## Game 2 — Neon Drift: Dag 1 (Prototype & Core Mechanic) (13 september 2026)

Zie ROADMAP.md § Directe actie: Game 2 — Neon Drift. Project: `~/projects/apps/neon-drift/`.

- [x] Scaffold opgezet (Vite + Phaser, zelfde structuur als meteor-dodge).
- [x] Kernmechaniek speelbaar en functioneel getest (niet alleen "lijkt te werken"): 3-lane-dodge,
      one-touch/snappy sturen (tap-zones mobiel, pijltjestoetsen desktop), oplopende snelheid,
      score = overleefde tijd, game-over bij een échte physics-botsing, herstart-flow. Onderweg een
      echte bug gevonden (`JustDown()`-polling miste snelle toetsaanslagen) en gefixt met keydown-
      event-listeners — zie `~/projects/apps/neon-drift/CLAUDE.md`.
- [x] Procedureel gegenereerde placeholder-graphics (zelfde Phaser Graphics-aanpak als Meteor
      Survivor) — geen externe assets.
- [x] **Naar staging gedeployed** (13 september 2026) — `https://staging.johanlijffijt.dev/games/
      neon-drift/`, nieuwe "/games/&lt;slug&gt;/"-nginx-conventie (i.p.v. Meteor Survivor's oudere
      "/game/"). Geen productie-tegenhanger, per de Gouden Regel.
- [x] Johan bevestigde op staging dat de kernmechaniek goed voelt ("het werkt ik kan heen en weer
      slalommen") — groen licht om door te bouwen.

## Game 2 — Neon Drift: Dag 2, deel 1 (evolutie naar "traffic racer") (13 september 2026)

Grotere scope dan oorspronkelijk gepland — Johan vroeg expliciet om door te bouwen "tot een echt
racespel", zie ROADMAP.md/CLAUDE.md voor de volledige onderbouwing (traffic-racer-genre, zelfde
bewezen 3-lane-mechaniek als basis).

- [x] Visuele reskin: top-down auto's (speler + 3 rivalenkleuren) i.p.v. blokken, scrollende
      neon-rijstrepen/wegrand voor snelheidsgevoel.
- [x] Near-miss-beloning (+5, "Close Call!"-popup + geluid) voor een rivaal die in de aangrenzende
      lane passeert.
- [x] Procedurele Web Audio-synthesizer (`src/audio/SoundManager.js`) — motor-hum die met de
      snelheid meepitcht, lane-wissel-whoosh, near-miss-chime, crash-geluid. Mute-knop met
      44×44-tikzone.
- [x] Crash-juice: screenshake + spark-particle-burst.
- [x] Score omgedoopt tot "Distance: Xm".
- [x] **E2E-tests (7/7)** + `predeploy:staging`-gate geverifieerd (bewust een assertie laten
      falen → bevestigd dat de deploy dan niet doorgaat). Onderweg een echte testsuite-bug
      gevonden en gefixt (viewport/canvas-coördinaten-mismatch, zie
      `~/projects/apps/neon-drift/CLAUDE.md` voor de volledige analyse).
- [x] Naar staging gedeployed en geverifieerd: `staging.johanlijffijt.dev/games/neon-drift/`.

## Game 2 — Neon Drift: Dag 2, deel 2 (wow-factor + leesbaarheidsfix) (13 september 2026)

- [x] **Near-miss-combo-multiplier** — onderzoek gedaan naar Traffic Racer/Subway Surfers/Crossy
      Road (zie `~/projects/apps/neon-drift/CLAUDE.md` voor de volledige analyse en bronnen);
      opeenvolgende near-misses schalen nu op (tot 4x) i.p.v. een vlakke +5-bonus, met decay na
      2,5s stilte en reset bij een crash. Coins/power-ups/unlocks/missies bewust nog niet
      meegenomen — eerst dit ene mechanisme laten landen.
- [x] **Game-over-tekst-leesbaarheidsfix** — Johans screenshot liet zien dat een bevroren
      rivaal-auto de retry-tekst overlapte; halfdoorzichtige achtergrondbox toegevoegd (zelfde
      patroon als Meteor Survivor's Game Over-scherm eerder al nodig had).
- [x] 9/9 E2E-tests (2 nieuw), gedeployed en geverifieerd op staging.

## Game 2 — Neon Drift: Dag 2, deel 3 (pauzeknop + écht voelbare combo) (13 september 2026)

Vervolg op Johans feedback: "Geen pauze knop", "nog steeds niet duidelijke tekst pop" en
"ik zie hier ook nog geen wauw factor".

- [x] **Pauzeknop toegevoegd** (ontbrak volledig) — P/Escape + knop met 44×44-tikzone, motorgeluid
      gedempt tijdens pauze. Twee echte bugs gevonden via tests (niet aangenomen dat het werkte):
      pijltjestoetsen werkten nog door tijdens pauze (guard zat op de verkeerde plek), en
      hervatten zou de moeilijkheidsgraad laten springen (globale klok loopt door tijdens pauze) —
      beide gefixt en apart getest.
- [x] **Combo-tekst-fix, root cause:** de pop-up stond gecentreerd op de x-positie van de
      inhalende auto, viel in de buitenste rijstroken deels buiten beeld. Vaste, gegarandeerd
      zichtbare positie + groter lettertype.
- [x] **Permanente "COMBO x2.0"-badge** naast de score (blijft staan tijdens de hele streak,
      i.p.v. een tekst die na 0,5s weer verdwijnt) + een schermflits die van cyaan naar goud
      kleurt naarmate de combo oploopt — dit was het ontbrekende "wauw"-stuk.
- [x] 12/12 E2E-tests (3 nieuw voor pauze), gedeployed en geverifieerd op staging.
- [ ] **Balans-tuning nog niet bewust gedaan** — spawn-interval/snelheidscurve zijn nog de
      Dag 1-waardes, niet getest op "voelt het eerlijk aan bij een botsing".
- [ ] Portal-packaging (`npm run zip`) bestaat maar is nog niet uitgeprobeerd/geverifieerd.
- [ ] Wacht op Johans beoordeling van deze versie op staging, dan pas balans-tuning of
      "GO voor productie" overwegen.

## Game 2 — Neon Drift: Top 5 Benchmark & Wauw-Factor Plan (13 september 2026)

Uitgevoerd conform de nieuwe bindende standaard in CLAUDE.md § Automatische Top 5 Benchmark &
Wauw-Factor Cyclus. Benchmark: Drift Boss, Tunnel Rush, Retro Highway, Subway Surfers, Super
Hexagon/Geometry Dash — zie CLAUDE.md voor de volledige analyse + bronnen.

- [x] **1. Pseudo-diepte-illusie** (verdwijnpunt-simulatie voor obstakels, camera-tilt bij
      lane-wissel) — gebouwd, getest, live op staging.
- [x] **2. Snelheids-stapeling** (zij-streak-particles, snelheid-geschaalde camera-shake-pulsen,
      zoom-punch elke 100m) — gebouwd, getest, live op staging.
- [x] **3. Fever/Overdrive-modus bij max-combo** (kleur-overlay, opgevoerde motor-oscillator,
      sparkburst op het passeermoment i.p.v. tekst) — gebouwd, getest, live op staging.
- [x] **4. Drift-screech + rijkere motor-audio** (noise-burst-screech bij lane-wissel, tweede
      ontstemde oscillator die infadet met snelheid) — gebouwd, getest, live op staging.
- [x] **Visuele correctie bovenop het plan** (Johan: "ziet er nog steeds saai uit"): synthwave-
      horizon met gloeiende retro-zon (canvas-gradient) + scrollend neon-grid verving de vlakke
      achtergrond; speler-auto kreeg een gloeiend koplamplicht + exhaust-deeltjesspoor.
- [x] **Pauzescherm herontworpen** (Johan: "nooit een tekstblok midden op de weg") — dimoverlay +
      icoon + minimale hint onderin, i.p.v. een tekstblok gecentreerd op het wegdek.

13/13 E2E-tests, gedeployed en visueel geverifieerd op `staging.johanlijffijt.dev/games/
neon-drift/` (13 september 2026) — zie `~/projects/apps/neon-drift/CLAUDE.md` § Dag 2, deel 4.

**Commerciële benchmark (zie CLAUDE.md § Commerciële & Monetisatie Benchmark):**
- [x] **"Skip voor regulier, bekijk voor 2x"-flow gebouwd (13 september 2026)** — twee expliciete
      Game Over-knoppen ("CLAIM & RESTART" / "2X BONUS 🎬 WATCH AD"), mock-first via
      `RewardAdManager` (simuleert de advertentie met een 2s-timer in test-/staging-modus) zodat
      flow + score-verdubbel-animatie nu al end-to-end Playwright-getest zijn. **Nog niet
      aangesloten op een echte advertentie** — dat gebeurt pas zodra CrazyGames SDK/AdMob
      daadwerkelijk geïntegreerd is (Full-Launch-stap).
- [ ] Revive-op-crash (watch ad, behoud combo/afstand) — trigger direct op het CRASH-scherm. Nog
      niet gebouwd; wacht op echte SDK-integratie (revive vereist een levende, niet-herstarte
      scene-state, complexer dan de score-verdubbeling die al staat).
- [ ] Meta-sink: "Neon Cores"-currency (verdiend per run) → exponentieel "Engine Level"-
      upgradesysteem (startcombo/topsnelheid), maakt spelers ontvankelijker voor de 2x-ad. Nog
      niet gebouwd — apart scope-stuk (persistente opslag/progressie), niet meegenomen in deze
      ronde.

## Fase 4 — Native Mobile Export (Capacitor): backlog, niet nu oppakken

Zie ROADMAP.md § Fase 4 voor de volledige uitleg en de twee harde gates (>1.000 daily plays of
duidelijke vraag naar offline builds, én web-inkomsten dekken de accountkosten).

- [ ] Backlogtaak: spike reserveren voor een Capacitor-export **zodra** een titel uit de catalogus
      een van beide gates haalt — niet vooruit bouwen.

Concrete, direct uitvoerbare actiepunten voor het hele project: de hub-site (johanlijffijt.dev)
én de Tumble-app (`~/projects/apps/tumble/`) horen bij elkaar, dus staat het hier samen. Voor
de gefaseerde langetermijnplanning en het besluiten-log van de app zelf, zie
`~/projects/apps/tumble/ROADMAP.md`. Dit bestand is een **levende lijst**: vink af en verwijder
wat gedaan is, voeg toe wat nieuw opduikt — geen archief.

## "GO voor productie" ontvangen en uitgevoerd (12 september 2026)

Alles wat hieronder in eerdere secties nog als "staging only, wacht op GO" stond gemarkeerd (2D-
keyboard-besturing, de God Mode/level-up-menu-fix, 44×44-tikzones, de Playwright-E2E-gate) staat
nu **live op productie** — `npm run deploy:prod` gedraaid, hash geverifieerd gelijk aan de
laatst-goedgekeurde staging-build (`index-C8WDfOPW.js`). `npm run zip` opnieuw gedraaid voor een
actuele `meteor-dodge-portal.zip` (matcht dezelfde build, geverifieerd: index.html op de root,
relatieve paden intact).

- [x] Meteor Dodge geüpload naar itch.io — live als **"Meteor Survivor: Rogue Space"**:
      https://johan1974.itch.io/meteor-survivor-rogue-space (200, title bevestigd).

## Naamswissel Meteor Dodge → Meteor Survivor (12 september 2026)

De itch.io-publicatie maakte de naam "Meteor Survivor" feitelijk al definitief — overal
doorgevoerd (package.json, index.html-meta's/JSON-LD, homepage-arcade-kaart/hero-CTA,
apps/CLAUDE.md-index). Geen naamsbotsing gevonden (check zoals bij Streakly→Tumble). Mapnaam
`apps/meteor-dodge/` blijft bewust ongewijzigd (intern pad, nooit publiek).

- [x] Naam overal doorgevoerd, naar staging gedeployed, alle 7 E2E-tests groen.
- [x] Echte in-game screenshot gemaakt (via Playwright) en gebruikt als arcade-kaart-thumbnail
      + `og:image`/`twitter:image` op zowel de homepage als de game-pagina zelf — twee losstaande,
      langlopende TODO's in één keer opgelost.
- [x] Secundaire "Also on itch.io ↗"-link toegevoegd op de arcade-kaart (opent in nieuw tabblad).
- [x] "GO voor productie" ontvangen en uitgevoerd — live op `johanlijffijt.dev/game/`, hash
      geverifieerd gelijk aan staging (`index-C8WDfOPW.js`), homepage-og:image/itch.io-link ook
      bevestigd op productie.
- [x] `meteor-survivor-portal.zip` (bijgewerkt met de nieuwe naam) opnieuw geüpload naar itch.io —
      vervangt de allereerste upload van vóór de naamswissel.
- [x] 3 extra promo-screenshots gemaakt (`site/images/meteor-survivor-action-1.png`, `-action-2.png`,
      `-upgrade-menu.png`) voor itch.io's screenshot-galerij — zie CLAUDE.md § Extra
      itch.io-promo-screenshots (bevat ook een losstaande bugfix: ontbrekende systeemfonts op de
      VPS maakten alle Phaser-tekst onzichtbaar in headless Chromium, nu opgelost).
- [x] Deze 3 nieuwe screenshots geüpload naar itch.io's screenshot-galerij — geverifieerd via
      WebFetch, galerij toont nu 4 afbeeldingen (cover + de 3 nieuwe).
- [x] v1.0-devlogpost gepubliceerd op itch.io (Major Update or Launch, `meteor-survivor-portal.zip`
      aangehecht, tags Arcade/Phaser/Pixel Art/Roguelite/Space): https://johan1974.itch.io/
      meteor-survivor-rogue-space/devlog/1661590/meteor-survivor-rogue-space-v10-free-browser-arcade-roguelite-is-live
      — titel/openingszin herschreven volgens de nieuwe SEO-kernregel (kernwoorden vooraan +
      expliciete link naar `johanlijffijt.dev/game/`), live-geverifieerd via WebFetch.

## Multi-portal distributie: zoveel mogelijk aanwezig voor naamsbekendheid (12 september 2026)

Op verzoek van Johan: Meteor Survivor niet alleen op itch.io + eigen site, maar breed uitzetten
voor bereik/naamsbekendheid. Eén voor één afwerken, niet alles tegelijk. Onderzoek naar de
technische eisen per portal staat in CLAUDE.md-geschiedenis van dit gesprek — samengevat hieronder
per portal met de concrete eerstvolgende actie.

- [ ] **itch.io-build achterloopt op productie/CrazyGames** — mist het nieuwe on-screen titel-logo
      ("METEOR SURVIVOR", toegevoegd 12 september 2026 voor CrazyGames' naam-matching-eis). Bewust
      geen aparte her-upload hiervoor (Johan: "komt later wel als er echte updates plaatsvinden") —
      meenemen bij de eerstvolgende inhoudelijke gameplay-update, niet als losse actie.

**CrazyGames — laagste drempel, eerst oppakken:**
- [x] 3 cover-afbeeldingen gemaakt in de exacte vereiste verhoudingen (`site/images/
      meteor-survivor-cover-landscape.png` 1920×1080, `-portrait.png` 800×1200, `-square.png`
      800×800) — echte key-art via een nieuwe standalone Phaser-scene in het meteor-dodge-project
      (`cover-art.html`/`src/cover-art.js`, zie dat project's CLAUDE.md) die het schip/meteoren/
      sterrenhemel opnieuw op native resolutie tekent i.p.v. een bestaand screenshot uit te
      rekken — scherp, geen randen, alleen de titel als tekst.
- [x] Submissie-tekst opgesteld (titel, description, controls) — SEO-kernregel toegepast, zie de
      geplakte teksten in het gespreksverloop.
- [x] Developer-account aangemaakt op `developer.crazygames.com` met `play@johanlijffijt.dev`.
- [x] Titel "METEOR SURVIVOR" toegevoegd op het startscherm in de game zelf (zie hoofdstuk hierboven,
      "GO voor productie" al ontvangen en uitgevoerd) — nodig omdat CrazyGames' naam-veld moet
      matchen met zichtbare tekst in de game, wat er nog nergens stond.
- [x] **2 verplichte preview-video's gebouwd** (landscape 1920×1080, portrait 1080×1620, ~17s, geen
      geluid, beginnend met de statische cover) — pas ontdekt op het Details-scherm, niet vooraf
      bekend. Nieuwe pipeline in het meteor-dodge-project (`scripts/build-preview-videos.sh`, zie
      dat project's CLAUDE.md § Preview-video's voor CrazyGames): echte gameplay opgenomen via
      Playwright, gecomposit op een thema-achtergrond (i.p.v. zwarte letterbox-balken) met een
      losstaande statische ffmpeg-build (geen root/apt nodig). Output:
      `site/images/meteor-survivor-preview-landscape.mp4` / `-portrait.mp4`.
- [x] Deze 2 video's + de eerdere 3 cover-afbeeldingen geüpload in het "Details"-submissieformulier.
- [x] **Submissie ingediend** (12 september 2026) — Category "Shooting", status **AWAITING REVIEW**.
      Build ID `965a9500-f3be-476b-a8da-89460ce2cfd8`.
- [x] **Bijgewerkte versie ingediend** (13 september 2026) via "Submit new version" — bevat de
      feedback-link-hostname-fix, met update-note voor CrazyGames' team.
- [ ] Reactie afwachten (meestal 1-2 dagen) en eventuele fixes doorvoeren.
- [ ] **Pas ná een positieve Basic Launch-periode:** overwegen of volledige SDK-integratie
      (`gameplayStart()`/`gameplayStop()`-events, Full Launch, monetisatie) de moeite waard is.

**Self-serve, geen herontwerp nodig (huidige portrait-build werkt zoals-die-is, zelfde als itch.io):**
- [x] Newgrounds — account aangemaakt (`play@johanlijffijt.dev`, username `MeteorSurvivor`) en
      build ingediend: https://www.newgrounds.com/portal/view/project/8098322 — status "Under
      Judgment" (Newgrounds' communitystemsysteem, geen reviewteam zoals CrazyGames). Zelfde
      kanttekening als bij CrazyGames: dateert van vóór de feedback-link-fix, minder kritisch hier
      (geen bekende Newgrounds-regel tegen externe links) maar wel goed om ooit bij te werken.
- [x] **Feedback-link verborgen op externe portals** (13 september 2026) — was altijd zichtbaar,
      ook in portal-embeds; Kongregate's richtlijnen noemen "links taking players outside of
      Kongregate" expliciet als afwijzingsreden. Nu hostname-gated (alleen zichtbaar op
      `johanlijffijt.dev`/`staging.johanlijffijt.dev`, fail-safe verborgen overal elders) — zie
      meteor-dodge's `index.html`. Naar productie gedeployed, portal-zip opnieuw gebouwd.
- [x] Kongregate — account aangemaakt (`play@johanlijffijt.dev`) en Developer Application (Step 1
      van hun publishing-proces) ingediend. **Geen self-serve zoals itch.io/Newgrounds** — vereist
      eerst handmatige goedkeuring door Kongregate's team voordat de game zelf geüpload kan worden.
- [ ] Wachten op goedkeuring van de Developer Application, dan pas verder met de game-upload
      (build, screenshots, description, controls — zelfde patroon als de andere portals).
- [x] GameJolt — account aangemaakt (`play@johanlijffijt.dev`) en gepubliceerd, direct live (geen
      review/goedkeuring nodig). Let op: hun "Become a Creator"-programma (1.000 volgers-eis) is
      een apart, optioneel monetisatietraject — niet nodig om gewoon een gratis game te uploaden,
      dat gaat via de aparte "Add a Game"-pagina op je eigen profiel.
- [ ] Armor Games — account aanmaken + build indienen.
- [ ] Y8 — account aanmaken + build indienen.

**Poki — bewust apart gehouden, geen quick win:**
- [ ] **Geparkeerd totdat expliciet besloten wordt** of een landscape-herontwerp (16:9, i.p.v. de
      huidige 480×800 portrait) de investering waard is — Poki's eis is een structurele
      layout-wijziging (HUD, spawnlogica, bewegingsgrenzen), geen submissie-detail. Plus volledige
      verplichte SDK-integratie (geen losse Basic-Launch-achtige tussenstap zoals bij CrazyGames).

## Dagelijkse Game Optimization Loop (vastgelegd 12 september 2026, zie ROADMAP.md)

**Scope-grens (zie ROADMAP.md § Scope: singleplayer-only tot bewezen inkomsten):** alle taken
hieronder blijven gericht op core loop, juice, audio en retentie van singleplayer-titels. Geen
multiplayer/backend-networking (WebSockets/Socket.io) oppakken — dat staat bewust geparkeerd in
ROADMAP.md § Toekomstvisie / Post-Revenue, pas relevant na een bewezen spelersbasis + inkomsten.

- [ ] **Terugkerend, geen eenmalig vinkje:** elke sessie een optimalisatieronde op Meteor Dodge (of
      een volgende game) volgens ROADMAP.md § Dagelijkse Game Optimization Loop — research
      (Poki/CrazyGames/itch.io) → psychologisch inzicht (near-miss, micro-feedback, dopamine-
      triggers, juice) → concrete hypothese → daadwerkelijke code-aanpassing. Niet afvinken en
      verwijderen zoals de rest van deze lijst — dit item blijft staan als terugkerend proces.
- [x] **Iteratie 1 (12 september 2026, dezelfde dag):** touch-offset-fix (schip zweeft ~70px boven
      de vinger i.p.v. eronder), grafische upgrade (ruimteschip + rotsachtige roterende meteoren +
      parallax-sterrenhemel, procedureel gegenereerd) en de eerste game-juice/near-miss-toevoegingen
      (coin-collectibles +50, near-miss "+10 Close!"-popup, explosie/screen shake bij botsing,
      highscore via localStorage).
- [x] **Iteratie 2 (12 september 2026, na Johans feedback op iteratie 1):** besturing omgezet van
      absolute offset-mapping naar relatieve delta-drag (fix voor het "teleporterende schip"/
      oneerlijke game-overs bij vinger optillen+elders neerzetten), plus een procedurele Web Audio
      API-synthesizer (coin/near-miss/explosie-geluiden, geen audiobestanden) met mute-knop en
      autoplay-policy-proof initialisatie. Live gedeployed, build getest — **nog niet visueel/
      auditief bevestigd in een echte browser**, zie het openstaande punt hieronder.
- [x] **Achterhaald** — iteratie 1+2 zijn sindsdien overschreven door iteraties 3+4 en de volledige
      auto-shooter-transformatie; deze losse check op de oude besturing/graphics is niet meer
      relevant, de huidige v1.0-build (live op productie én itch.io) is wat telt.
- [x] **Iteratie 3 (12 september 2026) — Audio & Juice:** hit-stop + gouden burst bij coin-pickup,
      wave-systeem (waarschuwing → meteor-shower → bonus-wave i.p.v. vlakke curve), "Space Dust"-
      meta-progressie in localStorage met voortgang richting een toekomstige schip-unlock (preview,
      nog geen echt unlock-systeem), en procedurele chiptune-achtergrondmuziek (bas+arpeggio, Web
      Audio API, tempo schaalt met score, dempt/fade't bij game-over, via de bestaande mute-knop).
      Zie ROADMAP.md voor de research/hypothese-onderbouwing. Live gedeployed, build getest.
- [x] **Achterhaald** — iteratie 3 is sindsdien overschreven door de auto-shooter-transformatie en
      latere polish-rondes; niet meer los relevant, zie de v1.0-devlogpost voor de huidige feature-set.

## Staging-banner (12 september 2026)

- [x] Amber waarschuwingsbalk toegevoegd op homepage + `/feedback/`, alleen zichtbaar via
      client-side hostname-check (`hostname.includes('staging')`) — al live op beide domeinen
      (geen build/deploy-stap nodig voor deze statische bestanden), zie CLAUDE.md § Staging-banner.
- [ ] **Bevestigen in een echte browser:** zichtbaar op `staging.johanlijffijt.dev`, onzichtbaar op
      `johanlijffijt.dev` — curl kan het client-side aan/uit-gedrag niet tonen.
- [ ] Bewust nog niet op `/game/` (canvas-HUD-overlap-risico) — apart oppakken als daar behoefte
      aan is.

## Staging (vastgelegd 12 september 2026, zie ROADMAP.md § Staging-workflow)

- [x] `sudo certbot --nginx -d staging.johanlijffijt.dev` — gedraaid door Johan, HTTPS werkt
      (geldig cert t/m 11 december 2026, HTTP→HTTPS-redirect actief, geverifieerd via curl).
- [x] nginx-serverblok + `deploy:staging`/`deploy:prod`-scripts staan klaar en zijn geverifieerd
      (curl 200 op homepage/`/game/`/`/api/` via `staging.johanlijffijt.dev`, productie ongewijzigd).
- [x] Ingesleten als automatisme — sindsdien meerdere staging→GO-cycli succesvol doorlopen (2D-
      besturing, God Mode-fix, de auto-shooter-transformatie, de naamswissel), telkens eerst
      staging, pas na expliciete "GO" naar productie.

## Bugfix: desktop-besturing ontbrak volledig (12 september 2026)

- [x] Gemeld door Johan: pijltjestoetsen deden niets bij testen in een desktop-browser — er was
      helemaal geen keyboard-input gebouwd, alleen touch/muis-drag. Toegevoegd: pijltjestoetsen +
      WASD voor horizontale beweging (met acceleratie/deceleratie, zelfde `moveShipTo()` als touch
      dus zelfde bank-tilt-gevoel), Space om te starten/herstarten, en `addCapture` zodat Space/
      pijltjestoetsen niet meer de pagina laten scrollen. Gedeployed naar
      `staging.johanlijffijt.dev` (nog niet naar productie).
- [x] Bevestigd door Johan op staging: pijltjestoetsen-besturing voelt goed aan.
- [x] **"GO voor productie" ontvangen en uitgevoerd** — `npm run deploy:prod` gedraaid, live op
      `johanlijffijt.dev/game/`, asset-hash geverifieerd gelijk aan de goedgekeurde staging-build.

## Polijstpuntjes uit staging-review (12 september 2026) — inmiddels ook live in productie

- [x] **Best-score linksboven bleef oud staan bij een nieuwe highscore** — eerste fix (bijwerken
      in `onGameOver()`) loste alleen het Game Over-scherm zelf op, niet het label tijdens het
      spelen. Zie Iteratie 4 hieronder voor de daadwerkelijk-realtime-fix.
- [x] **Start-/retry-tekst hield geen rekening met toetsenbord** — eerst "Tap or press Space to
      launch"/"TAP OR PRESS SPACE TO RETRY", op Johans verzoek de retry-tekst daarna nog verkort
      naar het exacte gevraagde format "TAP TO RETRY / PRESS SPACE" (zie Iteratie 4).
- Beide gedeployed naar productie via de goedgekeurde staging-build.

## Iteratie 4: realtime best-score, near-miss-tuning, combo-pitch (12 september 2026)

- [x] **Best-score écht realtime tijdens het spelen** (i.p.v. alleen op het Game Over-scherm) —
      `update()` zet `bestScore` nu live gelijk aan `score` zodra die erover gaat; een aparte
      `sessionStartBest`-snapshot (vastgelegd bij `startGame()`) bepaalt nog steeds correct of een
      run een nieuw record was.
- [x] Near-miss-parameters getuned (bestond al sinds iteratie 3): marge 22→20px, beloning
      +10→+5, tekst "+10 Close!" → "+5 Close Call!".
- [x] Retry-tekst → "TAP TO RETRY / PRESS SPACE" (exact gevraagd format).
- [x] Combo-pitch: sterren binnen 2s na elkaar rapen laat de coin-chime per stap een halve noot
      stijgen (max 8 stappen), reset na een langere pauze.
- [x] **Device-specifieke instructie-/retry-tekst** (gemeld tijdens staging-testen): toonde alle
      besturingsopties tegelijk op elk apparaat, nu gesplitst via `this.sys.game.device.os.desktop`
      — mobiel krijgt "Drag to steer"/"Tap to launch"/"TAP TO RETRY", desktop "Arrow keys or WASD
      to steer"/"Press Space to launch"/"PRESS SPACE TO RETRY".
- [x] Inmiddels naar productie gedeployed via een latere "GO voor productie" (zie bovenaan dit
      bestand) — deze en alle latere iteraties zitten in de huidige live build.

## ~~Idee voor latere iteratie: schietwerk~~ — opgepakt en uitgevoerd (12 september 2026)

Het geparkeerde "schietwerk"-idee hierboven is dezelfde dag nog opgepakt, en flink groter geworden
dan het oorspronkelijke "meteoren kapotschieten voor bonus-punten" — zie de transformatie-sectie
hieronder.

## Pauze (P/Escape/knop) + synthwave-audio-herwerking (12 september 2026)

- [x] Pauzetoetsen 'P'/'Escape' + een ⏸-knopje rechtsboven (links van mute) — bevriest physics,
      alle spawn-timers (`this.time.paused`), en specifiek de flame-flicker-tween (niet
      `tweens.pauseAll()` — bleek een manager-brede vlag te zijn, geverifieerd in de Phaser-
      broncode, die ook een NIEUWE tween voor de eigen "resume"-hint zou bevriezen).
- [x] Muziek gedempt (lowpass-sweep) i.p.v. gestopt tijdens pauze — loop blijft op de achtergrond
      doorlopen, geen nieuwe loop nodig bij hervatten.
- [x] Audio omgegooid naar synthwave: 100→126 BPM, `square`→`triangle`/`sawtooth`, pompende
      baslijn + kick/snare, één gedeeld lowpass-filter op de muziekbus.
- [x] Inmiddels naar productie gedeployed via een latere "GO voor productie" — pauze en de
      synthwave-audio zitten in de huidige live build.

## Fundamentele transformatie: "Meteor Survivor" auto-shooter-roguelite (12 september 2026)

Direct voortvloeiend uit de nieuwe CORE REGEL (Publiekstrekker & Retentie Eerst, zie boven in
CLAUDE.md/ROADMAP.md) — actie boven passiviteit, een dopamine-loop via progressie/upgrades:

- [x] Auto-vurende lasers (elke 350ms, opvoerbaar via de Overdrive-upgrade).
- [x] Meteoren met HP: klein = 1 hit (bestond al), nieuwe grote variant = 3 hits (25% spawnkans).
- [x] Destructie: knisperend geluid, lichte screenshake, rotsachtige particle-burst, 1-3 Space
      Dust-drops.
- [x] Magneet (start 80px radius, opvoerbaar via Super Magnet-upgrade) trekt Space Dust én sterren
      soepel naar het schip, elke frame herberekend zodat het pad meebuigt.
- [x] EXP-balk bovenaan het scherm, level-up-keuzemenu met 3 upgrades (Twin Laser / Overdrive /
      Super Magnet) die physics/timers bevriezen tot een kaart gekozen is.
- [x] Bestaande systemen (wave-pacing, near-miss, hit-stop, meta-Space-Dust, pauze) ongewijzigd
      gelaten — dit is een laag erbovenop.
- [x] Inmiddels grondig getest en live: de drie staging-blokkades hieronder gevonden en gefixt,
      daarna naar productie gedeployed en gepubliceerd op itch.io als v1.0.
- [x] Naam "Meteor Survivor" overal doorgevoerd (zie § Naamswissel hierboven).

## Drie staging-blokkades uit de eerste Meteor Survivor-test (12 september 2026)

- [x] **Space Dust-pickup gefixt** — bleek een Arcade-overlap-tunneling-probleem bij snel
      magneet-bewegende kleine objecten, opgelost via een handmatige afstandscheck i.p.v. te
      vertrouwen op `physics.add.overlap`. Magneet ook sterker gezet.
- [x] **Score voor meteoor-destructie:** klein +10, groot +25, met zwevende tekst, telt direct op.
- [x] **Game Over-overlap opgelost:** meer verticale ruimte + een halfdoorzichtige achtergrondbox
      achter de statistieken.
- [x] Losse polish: "LVL n"-label op de EXP-balk, puls-glow op Space Dust-deeltjes.
- [x] Opnieuw getest en goedgekeurd, sindsdien naar productie gedeployed.

## God Mode + level-up-menu onklikbaar op desktop — zelfde oorzaak (12 september 2026)

- [x] **Root cause gevonden:** level-up-menu zat in een Phaser `Container` — bekende hit-testing-
      valkuil voor interactieve children. Kaarten zichtbaar maar onklikbaar op desktop → speler
      kon een level-up nooit wegklikken → `physics.pause()` bleef voor altijd staan → oogde als
      "God Mode". Eén oorzaak, twee gemelde bugs.
- [x] Kaarten losgetrokken van de Container, nu absolute scene-objecten.
- [x] Volledige toetsenbordnavigatie voor het menu: pijltjes/W-S bladeren (gele highlight-rand),
      Spatie/Enter bevestigt, 1/2/3 direct — muis blijft ook werken.
- [x] `update()` bevriest scheepsbeweging nu ook tijdens het level-up-menu (ontbrak eerder).
- [x] **Pre-Flight Checklist** vastgelegd in CLAUDE.md en er direct langsgelegd — bevinding:
      mute-/pauzeknop hadden een tikbare zone van ~24px (ruim onder de 44×44px-eis), gefixt met
      losse hit-zones.
- [ ] **Nog geen expliciete bevestiging op een echt touchscreen** dat het bladeren door kaarten en
      de vergrote tikzones goed aanvoelen — het menu is inmiddels wel live en publiek speelbaar
      (productie + itch.io), dus reële speeldata/feedback via `FEEDBACK.md` is nu de eerste plek
      om op te letten in plaats van een losse handmatige test.

## Geautomatiseerde E2E-tests vóór staging-deploy (12 september 2026)

- [x] Playwright geïnstalleerd + 7 tests geschreven (besturing X/Y, collision→game-over,
      score/EXP bij meteoor-destructie, level-up-menu opent én sluit, Game-Over-tekst-overlap).
- [x] **Chromium's ontbrekende systeembibliotheken opgelost zonder root** — `apt-get download` +
      `dpkg-deb -x` naar een projectlokale map, geen `sudo` nodig. Zie
      `~/projects/apps/meteor-dodge/scripts/install-playwright-libs.sh`.
- [x] `predeploy:staging`-hook toegevoegd — `npm run deploy:staging` draait nu altijd eerst de
      volledige testsuite, en **stopt écht** bij een falende test (bevestigd door een assertie
      bewust te breken en te zien dat de deploy nooit start).
- [x] Eén flaky test gevonden én gefixt tijdens het bouwen (before/na-score gemeten in twee losse
      round-trips ipv één atomaire `evaluate()`-call, liep uit de pas met de passieve
      overlevingsscore die ondertussen doortikte).
- Alle 7 tests groen, laatste deploy naar staging is er doorheen gekomen.

## Daily SEO & Traffic Loop (vastgelegd 12 september 2026, zie ROADMAP.md § Organische Groei & SEO Strategie)

Technische fundering staat al live (`sitemap.xml`, `robots.txt`, JSON-LD) — onderstaande stappen
zijn account-specifiek en moeten door Johan zelf gezet worden (kan niet vanuit deze sessie):

- [x] **Google Search Console** geverifieerd (12 september 2026, Html-tag-methode) — echte code
      staat in `site/index.html`'s `google-site-verification`-meta-tag, sitemap
      (`https://johanlijffijt.dev/sitemap.xml`) ingediend.
- [x] **Bing Webmaster Tools** geverifieerd (12 september 2026) — via de "importeer vanuit Google
      Search Console"-snelkoppeling, die de property én de sitemap in één keer meenam (geen
      `msvalidate.01`-meta-tag nodig geweest, dus de placeholder in `site/index.html` blijft
      bewust ongebruikt staan). Sitemap-status stond op "Processing" direct na import.
- [ ] Een paar dagen wachten en dan de eerste indexerings-/zoektermdata bekijken in zowel Google
      Search Console als Bing Webmaster Tools — pas daarna zinvol om op keywords te optimaliseren
      (zie ROADMAP.md, niet vooraf gissen).
- [x] **Google Analytics (GA4) geïmplementeerd op staging (13 september 2026)** — Measurement ID
      `G-TLWY630Z6D`, hostname-hard-filter (alleen exact `johanlijffijt.dev`, staging/localhost
      uitgesloten, geen aparte staging-property — Johans expliciete keuze). `game_start`/
      `game_over`/`click_itch`-events staan in beide games (Meteor Survivor + Neon Drift) via een
      gedeelde `trackEvent()`-wrapper. Zie hub-`CLAUDE.md` § Google Analytics (GA4) voor de volle
      details.
- [ ] **GA4 naar productie zetten** — wacht op expliciete "GO voor productie": alleen
      `site/index.html` (de productie-homepage) mist nog de snippet, per de Gouden Regel bewust
      niet vooruit aangepast. `site/feedback/index.html` en beide games staan al klaar (deels ook
      al live op staging/gedeeld bestand, zie CLAUDE.md voor de nuance per bestand).
- [x] **`npm run zip` gebouwd** — geen `sudo apt install zip` meer nodig, gebruikt Python's
      ingebouwde `zipfile`-module (al op de VPS). Getest: zip-inhoud geïnspecteerd (index.html op
      de root, geen submap) én standalone geserveerd met `python3 -m http.server` om te bevestigen
      dat het ook echt los van onze eigen nginx werkt.
- [x] Subtiel feedback-linkje (rechtsonder in de game, `target="_blank"`) toegevoegd zodat
      portal-spelers terug kunnen naar `/feedback/` — **naar staging gedeployed, nog niet naar
      productie.**
- [x] Aangemeld bij itch.io — live als "Meteor Survivor: Rogue Space", inclusief v1.0-devlogpost
      en 4 screenshots.
- [x] Echte screenshot/thumbnail gemaakt voor `og:image`/`twitter:image` (zie § Naamswissel).
- [ ] Checken of localStorage (highscore/Space Dust/mute) normaal werkt in itch.io's iframe-sandbox
      zodra de game daar daadwerkelijk staat — nog niet getest.

## Overig, sinds de pivot van 12 september 2026 (zie hub-`ROADMAP.md` § Pivot)

- [x] Meteor Dodge getest op een fysiek mobiel toestel (screenshot van Johan, 12 september 2026) —
      canvas rendert goed edge-to-edge, geen zichtbare letterboxing-glitches, spel speelt en scoort
      (score 127 in de test). Dit was vóór iteratie 1 hierboven, dus met de oude cirkel-graphics.
- [x] Eerste commit + push naar `github.com/Johan1974/johanlijffijt.dev` — gedaan.
- [x] Definitieve naam gekozen: "Meteor Survivor" (zie § Naamswissel hierboven).
- [x] Echte screenshot/thumbnail gemaakt voor de arcade-kaart (zie § Naamswissel hierboven).

## On hold: Tumble (sinds 12 september 2026 — geen actief vervolgwerk)

Onderstaande stond klaar vóór de pivot naar games; bewust laten staan (niet verwijderd) zodat het
er is als Tumble ooit weer wordt opgepakt, maar nu even niet actief aan werken:

- [ ] Test de nieuwe Tumble-build op je eigen telefoon — bevestig dat de Supabase-verbinding het
      goed doet via de HTTPS-proxy (de eerdere plain-HTTP-bug is gefixt, maar nog niet op een
      fysiek toestel gecheckt buiten Expo Go om), én zet de nieuwe widget op je homescreen om te
      checken of aftikken vanuit de widget echt werkt.
- [ ] Deel de link (johanlijffijt.dev) met vrienden/familie/collega's — het Nederlandse
      appje-bericht staat al klaar.
- [ ] Post in r/ADHD en r/SideProject/IndieHackers — de Engelstalige concept-teksten staan klaar.
- [ ] Check na een paar dagen de `link_clicks`- en `feedback`-tabellen (via `psql` of Supabase
      Studio) om te zien of er een validatiesignaal ontstaat.

## Volgende stap: Android eerst (besloten 10 september 2026, on hold sinds de pivot)

Volgorde-beslissing, geen afwijken van het einddoel (nog steeds beide platforms) — zie Tumble's
ROADMAP.md Fase 4 voor de volledige afweging. Android eerst omdat het maar $25 eenmalig kost
(i.p.v. $99/jaar voor Apple) en sneller echte, vertrouwde store-feedback oplevert. iOS-testers
gebruiken tot die tijd gewoon de Expo Go-link op de site.

- [ ] Google Play Console-account aanmaken + $25 betalen + identiteit verifiëren (moet Johan zelf
      doen).
- [ ] Screenshots maken van de huidige build (incl. de nieuwe widget) — nodig voor de Play
      Store-listing, kan niet vanuit deze omgeving.
- [ ] Service-account-JSON genereren in Play Console voor automatisch indienen via `eas submit`
      (account-specifiek, moet Johan zelf doen) — invullen in `~/projects/apps/tumble/eas.json`
      (`submit.production.android.serviceAccountKeyPath`).
- [ ] Play Store-app-record aanmaken, listing-copy uit `STORE_LISTING.md` plakken (al klaar).

## Later (niet nu oppakken, staat hier alleen zodat het niet vergeten wordt)

- [ ] Apple Developer Program ($99/jaar) — pas oppakken zodra Android laat zien dat er vraag is.
- [ ] App Store-categorie definitief kiezen (Health & Fitness vs. Productivity) — dichter bij
      indiening, met actuele marktdata.
- [ ] Mijlpaal-viering bij bv. dag 7/14/30 in de app (grotere beloning dan het gewone
      afvink-moment) — bewust niet meegenomen bij de vmbo/ADHD-verbeteringen van 9 september,
      kleinere impact.
- [ ] Fase 3 (RevenueCat/paywall) in de app — pas oppakken na een echt validatiesignaal.

## Inspiratie van bekende (ADHD-)apps — nog te beoordelen, niet zomaar overnemen

Gecheckt 9 september 2026: Finch (self-care pet), Tiimo (ADHD-planner), HabitKit (minimalistische
streak-tracker). Concrete, bruikbare ideeën, elk met een inschatting van de klus:

- [x] **Home-screen widget, Android — gebouwd 9 september 2026.** Tik een habit af zonder de app
      te openen (`react-native-android-widget`, zie Tumble's ROADMAP.md voor de technische
      details). Gevalideerd met een lokale `expo prebuild` vóór de cloud-build; build staat op
      de achtergrond te compileren.
- [ ] **iOS-widget** — vereist native SwiftUI-code (bv. via `@bacons/apple-targets`), bewust apart
      gehouden van de Android-versie, grotere klus.
- [ ] **Eigen icoon/kleur per habit** (Tiimo's kleursysteem) voor visuele herkenbaarheid.
      Kleine ontdekking tijdens het onderzoek: de Supabase-tabel `habits` heeft al `icoon`/`kleur`-
      kolommen (uit Fase 1), maar de lokale Zustand-store (`use-habits-store.ts`, Fase 2, bewust
      eerst lokaal gebouwd) heeft deze velden niet. Moet dus aan beide kanten alsnog toegevoegd
      worden, geen kwestie van alleen de UI erbij zetten.
- [ ] **Visuele voortgangs-heatmap** (GitHub-stijl contributiegraph, HabitKit's handelsmerk) als
      alternatief/aanvulling op de huidige percentage-balk op het Voortgang-scherm — motiverender
      dan een kaal getal.
- [ ] **Overweging, geen concrete taak:** Finch's mascotte gaat nooit "dood" bij een gemiste dag
      — griezelig dicht bij de eigen grace-dag-filosofie, maar met een groeiend/verzamelbaar
      beloningssysteem erbovenop. Zou een leuke uitbreiding op de bestaande haptics/animatie zijn,
      maar is een forse scope-toevoeging (een personage/mascotte bouwen) — pas overwegen als er
      al signaal is, niet als eerstvolgende stap.
