# Todo — dagelijks bij te werken

Concrete, direct uitvoerbare actiepunten voor het hele project: de hub-site (johanlijffijt.dev)
én de Tumble-app (`~/projects/apps/tumble/`) horen bij elkaar, dus staat het hier samen. Voor
de gefaseerde langetermijnplanning en het besluiten-log van de app zelf, zie
`~/projects/apps/tumble/ROADMAP.md`. Dit bestand is een **levende lijst**: vink af en verwijder
wat gedaan is, voeg toe wat nieuw opduikt — geen archief.

## Dagelijkse Game Optimization Loop (vastgelegd 12 september 2026, zie ROADMAP.md)

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
      mute-knop werkt zonder ook de besturing te triggeren — pas daarna een iteratie 3-hypothese
      kiezen.

## Overig, sinds de pivot van 12 september 2026 (zie hub-`ROADMAP.md` § Pivot)

- [x] Meteor Dodge getest op een fysiek mobiel toestel (screenshot van Johan, 12 september 2026) —
      canvas rendert goed edge-to-edge, geen zichtbare letterboxing-glitches, spel speelt en scoort
      (score 127 in de test). Dit was vóór iteratie 1 hierboven, dus met de oude cirkel-graphics.
- [ ] Eerste commit + push naar `github.com/Johan1974/johanlijffijt.dev` (repo lokaal
      geïnitialiseerd en gekoppeld op 12 september, nog niet gepusht — bevat nu ook de nieuwe
      arcade-homepage).
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
