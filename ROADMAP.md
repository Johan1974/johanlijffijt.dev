# Roadmap — johanlijffijt.dev (overkoepelend)

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

## Toekomstvisie / Post-Revenue

**Bewust hier geparkeerd, niet nu oppakken** — het idee blijft bewaard zodat het niet steeds
opnieuw ter sprake hoeft te komen, maar het is nadrukkelijk geen actieve taak:

- **Multiplayer** (realtime, WebSockets/Socket.io of vergelijkbaar) is een mogelijke latere fase,
  pas te overwegen zodra er een bewezen spelersbasis is én een stabiele inkomstenstroom uit de
  singleplayer-portfolio (zie § Scope hierboven). Geen concrete plannen, geen architectuur-
  voorbereiding vooruit bouwen — dat zou precies de over-engineering zijn die deze scope-
  beslissing wil voorkomen.

## Organische Groei & SEO Strategie (vastgelegd 12 september 2026)

Naast de Dagelijkse Game Optimization Loop (gameplay/juice) nu ook een structurele **Daily SEO &
Traffic Loop** — vindbaarheid is net zo'n doorlopend aandachtspunt als retentie, geen eenmalige
toevoeging. Sluit aan bij § Scope hieronder: organisch verkeer is de eerste groeimotor, vóór er
sprake is van betaalde marketing of een bewezen inkomstenstroom.

- **Technische fundering (afgerond, 12 september 2026):** `sitemap.xml` + `robots.txt`, JSON-LD
  (`schema.org/VideoGame`) op de homepage en op Meteor Dodge's eigen pagina, verificatie-
  placeholders voor Google Search Console/Bing Webmaster Tools. Zie `CLAUDE.md` § Technische
  SEO-fundering voor de details.
- **Monitoring:** zodra Google Search Console gekoppeld is (zie `TODO.md`) — impressies/clicks per
  zoekterm volgen, indexeringsfouten signaleren, `sitemap.xml` opnieuw indienen na elke nieuwe
  pagina/game.
- **Keyword-targeting:** rondom webgame-gerelateerde zoektermen (bv. "free browser games", "html5
  arcade games", "play online no download", en later game-specifieke termen zoals "meteor dodge
  game") — copy/meta's hierop laten aansluiten zodra er zoekdata binnenkomt, niet vooraf gissen.
- **Externe distributie:** publiceren op gameportals (itch.io, CrazyGames, Poki) als aanvullend
  organisch kanaal naast directe zoekverkeer — zelfde "geen betaalde marketing"-instinct
  (organische portal-plaatsing, geen advertentiebudget om op die portals te promoten).

## Bewuste keuzes die voor de hele roadmap gelden

- **Geen betaalde marketing/advertenties** — groei loopt via organisch delen en community-posts.
- **Bouwplezier weegt zwaarder dan een vooraf vastgelegde validatie-volgorde** (zie pivot
  hierboven) — dit vervangt de eerdere "geen scope-verbreding vóór validatie"-afspraak van
  9 september 2026 voor zover die games uitsloot. Scope-verbreding blijft wel iets om bewust te
  doen, niet impulsief — vandaar dat deze herziening hier expliciet gelogd staat.
- **Documentatie blijft bij de code die ze beschrijft** — deze roadmap geeft het overzicht, de
  technische details staan in de eigen `CLAUDE.md`/`ROADMAP.md` van elk project.
