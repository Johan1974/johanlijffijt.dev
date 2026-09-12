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

## Staging (vastgelegd 12 september 2026, zie ROADMAP.md § Staging-workflow)

- [x] `sudo certbot --nginx -d staging.johanlijffijt.dev` — gedraaid door Johan, HTTPS werkt
      (geldig cert t/m 11 december 2026, HTTP→HTTPS-redirect actief, geverifieerd via curl).
- [x] nginx-serverblok + `deploy:staging`/`deploy:prod`-scripts staan klaar en zijn geverifieerd
      (curl 200 op homepage/`/game/`/`/api/` via `staging.johanlijffijt.dev`, productie ongewijzigd).
- [ ] Vanaf nu bij elke game-iteratie: eerst `npm run deploy:staging` + handmatig testen, dan pas
      `npm run deploy:prod` — nog niet als gewoonte ingesleten, expliciet blijven doen tot het
      vanzelf gaat.

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
- [ ] Meteor Dodge aanmelden bij itch.io/CrazyGames/Poki als extra organisch kanaal (zie ROADMAP.md
      § Externe distributie) — export-profiel staat nu klaar (`npm run build:portal`), aanmelden
      zelf nog niet gedaan.
- [ ] **Eenmalig:** `sudo apt install zip` op de VPS (kan niet vanuit deze sessie — buiten de
      passwordless-sudo-scope), daarna `cd ~/projects/apps/meteor-dodge && npm run build:portal &&
      cd dist-portal && zip -r ../meteor-dodge-portal.zip .` om de daadwerkelijke upload-zip te maken.
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
