# Todo — dagelijks bij te werken

Concrete, direct uitvoerbare actiepunten voor het hele project: de hub-site (johanlijffijt.dev)
én de Tumble-app (`~/projects/apps/tumble/`) horen bij elkaar, dus staat het hier samen. Voor
de gefaseerde langetermijnplanning en het besluiten-log van de app zelf, zie
`~/projects/apps/tumble/ROADMAP.md`. Dit bestand is een **levende lijst**: vink af en verwijder
wat gedaan is, voeg toe wat nieuw opduikt — geen archief.

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
- [ ] Iteratie 1 + 2 hierboven controleren op een echt toestel: proporties schip/meteoren,
      vlam-positie tijdens bank-tilt, sterrenhemel-snelheid, of de nieuwe delta-besturing het
      teleport-probleem echt oplost en prettig aanvoelt, of de drie geluiden goed klinken en de
      mute-knop werkt zonder ook de besturing te triggeren.
- [x] **Iteratie 3 (12 september 2026) — Audio & Juice:** hit-stop + gouden burst bij coin-pickup,
      wave-systeem (waarschuwing → meteor-shower → bonus-wave i.p.v. vlakke curve), "Space Dust"-
      meta-progressie in localStorage met voortgang richting een toekomstige schip-unlock (preview,
      nog geen echt unlock-systeem), en procedurele chiptune-achtergrondmuziek (bas+arpeggio, Web
      Audio API, tempo schaalt met score, dempt/fade't bij game-over, via de bestaande mute-knop).
      Zie ROADMAP.md voor de research/hypothese-onderbouwing. Live gedeployed, build getest.
- [ ] Iteratie 3 hierboven controleren op een echt toestel: voelt de hit-stop als impact of als
      hapering, is de wave-cadans (elke 30s) prettig getimed, is de achtergrondmuziek hoorbaar
      zonder de sfx te overstemmen, mute't de mute-knop ook echt de muziek — pas daarna een
      iteratie 4-hypothese kiezen.

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
- [ ] Vanaf nu bij elke game-iteratie: eerst `npm run deploy:staging` + handmatig testen, dan pas
      `npm run deploy:prod` — nog niet als gewoonte ingesleten, expliciet blijven doen tot het
      vanzelf gaat.

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
- [ ] **Uitsluitend naar staging gedeployed** (`https://staging.johanlijffijt.dev/game/`) — wacht
      op Johans test (nu ook: klopt de tekst per apparaat) + expliciete "GO voor productie" vóór
      dit naar `deploy:prod` gaat.

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
- [ ] **Uitsluitend naar staging gedeployed** — nog niet getest/goedgekeurd.

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
- [ ] **Grootste ongeteste wijziging tot nu toe.** Nog te controleren op staging: voelt auto-vuren
      synchroon met bewegen, is de magneet-aantrekking soepel (niet te snel/traag), is het
      level-up-menu leesbaar en voelen de 3 upgrades voelbaar anders, blijft pauzeren werken
      tijdens dit alles, en klopt de balans (te makkelijk/te moeilijk met auto-fire erbij).
- [ ] Naam "Meteor Survivor" (genoemd door Johan) nog niet doorgevoerd in code/meta's — bewust,
      eerst bevestigen dat de transformatie aanslaat.

## Drie staging-blokkades uit de eerste Meteor Survivor-test (12 september 2026)

- [x] **Space Dust-pickup gefixt** — bleek een Arcade-overlap-tunneling-probleem bij snel
      magneet-bewegende kleine objecten, opgelost via een handmatige afstandscheck i.p.v. te
      vertrouwen op `physics.add.overlap`. Magneet ook sterker gezet.
- [x] **Score voor meteoor-destructie:** klein +10, groot +25, met zwevende tekst, telt direct op.
- [x] **Game Over-overlap opgelost:** meer verticale ruimte + een halfdoorzichtige achtergrondbox
      achter de statistieken.
- [x] Losse polish: "LVL n"-label op de EXP-balk, puls-glow op Space Dust-deeltjes.
- [ ] **Opnieuw testen op staging** — met name: pakt het schip stof nu wél op, voelt de magneet
      sterk genoeg aan, is het Game Over-scherm leesbaar, klopt de meteoor-score.

## Daily SEO & Traffic Loop (vastgelegd 12 september 2026, zie ROADMAP.md § Organische Groei & SEO Strategie)

Technische fundering staat al live (`sitemap.xml`, `robots.txt`, JSON-LD) — onderstaande stappen
zijn account-specifiek en moeten door Johan zelf gezet worden (kan niet vanuit deze sessie):

- [ ] Property aanmaken in **Google Search Console** voor `johanlijffijt.dev` → de verificatiecode
      die je krijgt invullen in `site/index.html`'s `google-site-verification`-meta-tag (nu een
      placeholder) → live zetten → in Search Console op "verifiëren" klikken.
- [ ] `https://johanlijffijt.dev/sitemap.xml` indienen in Search Console (Sitemaps-sectie).
- [ ] Zelfde traject voor **Bing Webmaster Tools**: property aanmaken, `msvalidate.01`-meta-tag
      invullen (nu een placeholder), sitemap indienen. Bing biedt vaak een "importeer vanuit Google
      Search Console"-snelkoppeling, kan schelen.
- [ ] Na verificatie: een paar dagen wachten en dan de eerste indexerings-/zoektermdata bekijken —
      pas daarna zinvol om op keywords te gaan optimaliseren (zie ROADMAP.md, niet vooraf gissen).
- [x] **`npm run zip` gebouwd** — geen `sudo apt install zip` meer nodig, gebruikt Python's
      ingebouwde `zipfile`-module (al op de VPS). Getest: zip-inhoud geïnspecteerd (index.html op
      de root, geen submap) én standalone geserveerd met `python3 -m http.server` om te bevestigen
      dat het ook echt los van onze eigen nginx werkt.
- [x] Subtiel feedback-linkje (rechtsonder in de game, `target="_blank"`) toegevoegd zodat
      portal-spelers terug kunnen naar `/feedback/` — **naar staging gedeployed, nog niet naar
      productie.**
- [ ] Meteor Dodge daadwerkelijk aanmelden bij itch.io — zie
      `~/projects/apps/meteor-dodge/CLAUDE.md` § Upload naar itch.io voor de stappen. Moet Johan
      zelf doen (account-actie).
- [ ] Een echte screenshot/thumbnail maken voor `og:image`/`twitter:image` op `/game/` (nu bewust
      weggelaten i.p.v. een placeholder-URL, zie meteor-dodge's CLAUDE.md) — zelfde openstaande
      punt als de arcade-kaart op de homepage.
- [ ] Checken of localStorage (highscore/Space Dust/mute) normaal werkt in itch.io's iframe-sandbox
      zodra de game daar daadwerkelijk staat — nog niet getest.

## Overig, sinds de pivot van 12 september 2026 (zie hub-`ROADMAP.md` § Pivot)

- [x] Meteor Dodge getest op een fysiek mobiel toestel (screenshot van Johan, 12 september 2026) —
      canvas rendert goed edge-to-edge, geen zichtbare letterboxing-glitches, spel speelt en scoort
      (score 127 in de test). Dit was vóór iteratie 1 hierboven, dus met de oude cirkel-graphics.
- [x] Eerste commit + push naar `github.com/Johan1974/johanlijffijt.dev` — gedaan.
- [ ] Definitieve naam kiezen voor Meteor Dodge (werktitel) — zie het project's eigen CLAUDE.md.
- [ ] Een echte screenshot/thumbnail van Meteor Dodge maken voor de arcade-kaart (nu een emoji-
      placeholder) en voor `og:image`/`twitter:image` — wacht bij voorkeur tot na de visuele
      controle van iteratie 1 hierboven.

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
