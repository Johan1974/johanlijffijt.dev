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
5. **Volgende games / eventuele monetisatie** — *bewust nog niet gepland,* pas na signaal dat de
   eerste game aanslaat — zelfde "geen investering vóór validatie"-instinct als bij Tumble, nu
   toegepast op games i.p.v. op utility-apps.

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
initialisatie op de eerste tap. Volledige technische details en de onderbouwing per keuze (voor
beide iteraties) staan in `~/projects/apps/meteor-dodge/CLAUDE.md`.

## Bewuste keuzes die voor de hele roadmap gelden

- **Geen betaalde marketing/advertenties** — groei loopt via organisch delen en community-posts.
- **Bouwplezier weegt zwaarder dan een vooraf vastgelegde validatie-volgorde** (zie pivot
  hierboven) — dit vervangt de eerdere "geen scope-verbreding vóór validatie"-afspraak van
  9 september 2026 voor zover die games uitsloot. Scope-verbreding blijft wel iets om bewust te
  doen, niet impulsief — vandaar dat deze herziening hier expliciet gelogd staat.
- **Documentatie blijft bij de code die ze beschrijft** — deze roadmap geeft het overzicht, de
  technische details staan in de eigen `CLAUDE.md`/`ROADMAP.md` van elk project.
