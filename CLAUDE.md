# CLAUDE.md — johanlijffijt.dev

Persoonlijke hub-/portfoliopagina van Johan, domein `johanlijffijt.dev` (Namecheap, geregistreerd
7 september 2026). Doel: een lichte "proeftuin" die naar zijn projecten linkt en later kan
uitbreiden met eigen pagina's — geen mobiele app zelf. Sinds de pivot van 12 september 2026 (zie
`ROADMAP.md` § Pivot) ligt de focus op **browsergames** (eerste: Meteor Dodge, zie
`~/projects/apps/meteor-dodge/`, live op `/game/`); Tumble (`~/projects/apps/tumble/`) staat on
hold maar blijft bereikbaar via de bestaande try-it-links.

**Live sinds 7 september 2026:** https://johanlijffijt.dev (HTTP→HTTPS-redirect + geldig
Let's Encrypt-certificaat, geverifieerd via curl).

## Sessie-start-instructie (bindend)

Bij het starten van een nieuwe sessie op dit project: lees eerst `ROADMAP.md` en `TODO.md`
volledig door voor de laatste stand van zaken, vóórdat je verder werkt, voorstellen doet of
code aanpast. Vastgelegd op verzoek van Johan (12 september 2026) zodat elke sessie aansluit op
waar de vorige is gebleven, in plaats van blind op deze CLAUDE.md alleen te vertrouwen — dit
bestand beschrijft bewuste keuzes en architectuur, `ROADMAP.md`/`TODO.md` de actuele status en
openstaande taken.

## Rol: Game Researcher & Optimization Lead

Sinds de pivot naar games (12 september 2026, zie `ROADMAP.md` § Pivot) heeft de AI-assistent op
dit project, naast reguliere implementatie, ook de rol van **Game Researcher & Optimization
Lead**: actief succesvolle webgames analyseren (Poki, CrazyGames, itch.io — genres, mechanics,
retentie-trucs die daar aantoonbaar werken) en retentie-psychologie toepassen (near-miss effect,
micro-feedback loops, dopamine-triggers, "game juice") om **dagelijks concrete, uitvoerbare**
verbetervoorstellen te doen voor de games in deze portfolio (nu: Meteor Dodge). Het proces hiervoor
staat vastgelegd in `ROADMAP.md` § Dagelijkse Game Optimization Loop — niet vrijblijvend
brainstormen, maar elke ronde eindigen in een concrete hypothese én een code-aanpassing.

## Bewuste keuzes

- **Geen relatie met `solo-stack-blog`** (`~/projects/solo-stack-blog/`): die blog gebruikt
  bewust een pseudonieme auteurspersona (voornaam "Johan", geen achternaam) om niet de volledige
  identiteit te koppelen aan affiliate-content. Dit domein gebruikt wél de volledige naam — nooit
  naar elkaar laten linken of vermelden (bevestigd met Johan, 7 september 2026).
- **Statisch, geen framework/build-pipeline/CMS** — puur HTML/CSS in `site/`, past bij de kleine
  schaal (portfolio + linklijst, geen contentvolume zoals solo-stack-blog).
- **Geen Docker.** Eerste opzet gebruikte een losse Caddy-container op poort 80/443, maar dat
  botste met de al bestaande systeem-nginx op deze VPS (zie hieronder) — één publiek IP kan maar
  één proces op poort 80/443 hebben. Overgestapt op een nginx-vhost, exact hetzelfde patroon als
  `lazykeeper.com` al gebruikte (static root, geen proxy_pass nodig want geen backend).
- lazykeeper (verwijderd) en mypaperhive (offline gehaald door Johan) speelden geen rol meer in
  de afweging — dit domein deelt geen app-logica met die projecten, alleen de nginx-daemon zelf
  (onvermijdelijk, één VPS/IP).

## Stack

- **Systeem-nginx** (niet in Docker) op de VPS serveert de site rechtstreeks als static files —
  zelfde nginx-installatie als mypaperhive.com/lazykeeper.com, aparte server-block.
- Config: `nginx/johanlijffijt.dev.conf` in deze repo, gesymlinkt naar
  `/etc/nginx/sites-available/` → `/etc/nginx/sites-enabled/`. **Certbot herschrijft dit bestand
  bij elke hernieuwing** (auto-renew staat aan) — wijzigingen aan de HTTPS-blokken komen dus van
  Certbot, niet handmatig aanpassen tenzij je weet wat je doet.
- `site/index.html` — de hub-pagina zelf, één bestand, inline CSS, licht/donker-thema-aware.
- SSL: Let's Encrypt via `certbot --nginx`, cert vervalt 6 december 2026, auto-renew via
  Certbot's systemd-timer (zelfde mechanisme als de andere domeinen op deze VPS).

## Deployment

Geen CI/CD — dit draait al rechtstreeks op de VPS (`vps-8b79bc05`), want deze Claude Code-sessie
bleek al via Remote-SSH op de VPS zelf te draaien (bevestigd 7 september 2026: `hostname` gaf
`vps-8b79bc05`). Wijzigingen aan `site/index.html` zijn dus direct live, geen kopieerstap nodig
— **maar dit geldt niet voor `nginx/johanlijffijt.dev.conf` zelf**: nginx leest zijn configbestand
alleen opnieuw in bij een expliciete `sudo nginx -t && sudo systemctl reload nginx`, er is geen
watcher die dat automatisch doet. Passwordless sudo hiervoor staat sinds 8 september 2026 in
`/etc/sudoers.d/johan-nginx` (beperkt tot precies `nginx -t` en `systemctl reload nginx`).

DNS bij Namecheap: A-records `@` en `www` → `51.68.189.167` (al gezet, 7 september 2026).

## Supabase-proxy (self-hosted, gedeeld met Tumble)

Tumble's self-hosted Supabase (Envoy-gateway, `~/projects/apps/tumble/supabase/`) draait
alléén op platte HTTP op `127.0.0.1:8000`/`51.68.189.167:8000` — geen TLS. De feedbackpagina
(`site/tumble/feedback/`) en de click-tracking op de hub-pagina draaien over HTTPS, en een
`fetch()` naar `http://` vanaf een `https://`-pagina wordt door browsers standaard geblokkeerd
("mixed content"). Ontdekt 8 september 2026 — de feedbackpagina werkte hierdoor vermoedelijk al
niet in normale browsers sinds livegang.

**Oplossing:** een reverse-proxy `location /supabase/` in `nginx/johanlijffijt.dev.conf` die naar
`http://127.0.0.1:8000/` proxyt, zodat client-side code `https://johanlijffijt.dev/supabase/...`
aanroept i.p.v. het rechtstreekse HTTP-adres. Vereist `proxy_http_version 1.1;` +
`proxy_set_header Connection "";` — zonder die twee regels antwoordt Envoy met `426 Upgrade
Required` (nginx stuurt anders standaard HTTP/1.0 naar de backend). Beide client-scripts
(`site/index.html`, `site/tumble/feedback/index.html`) wijzen inmiddels naar de proxy-URL, niet
meer naar het kale IP.

## Click-tracking (Fase-4-validatiesignaal voor Tumble)

Toegevoegd 8 september 2026 op verzoek van Johan: de try-it-links op de hub-pagina
(`data-track="ios"/"android"/"feedback"`) posten fire-and-forget naar een `link_clicks`-tabel in
dezelfde Supabase-instance als de feedbacktabel (`~/projects/apps/tumble/supabase/migrations/
0003_link_clicks.sql`, insert-only RLS, zelfde patroon als `feedback`). Doel: een niet-giswerk-
signaal voor de Fase-4-gate in Tumble's `ROADMAP.md` (geen developer-accounts kopen zonder
reëel validatiesignaal) — Johan wil eerst de app breder onder testers krijgen. Aantallen zijn
alleen via `psql`/Supabase Studio op te vragen, niet via de publieke API (geen select-policy).

## Herziening hub-pagina (8 september 2026)

Op kritiek van Johan ("ziet er donker en simpel uit") herschreven van een persoonlijke bio-pagina
("Hoi, ik ben Johan" als H1, project ondergeschikt) naar een pagina die leidt met Tumble's
onderscheidende kenmerk: de vergevingsgezinde grace-dag-streaklogica, gevalideerd met een
ADHD-gebruiker (zie Tumble's `ROADMAP.md`/`CLAUDE.md` § Productfilosofie). Belangrijkste inzicht:
die informatie stond alleen in Tumble's interne roadmap, niet op de pagina die vreemden moet
overtuigen — de copy verkocht zichzelf niet.

Concreet aangepast in `site/index.html`:
- H1/intro leidt nu met het grace-dag-verhaal i.p.v. met Johans motivatie.
- Zelfgemaakte streak-visualisatie (rij dag-cirkels, één dag "vergeven") vervangt de generieke
  "JL"-initialen-avatar — dat patroon oogt als een leeg Slack/Gravatar-profiel, niet als bewuste
  keuze.
- Favicon toegevoegd (inline SVG data-URI, checkmark-in-cirkel) — ontbrak volledig.
- CTA-hiërarchie: "Probeer op iOS/Android" zijn primaire (gevulde) knoppen, "Feedback geven" is
  secundair (outline) — stonden voorheen visueel gelijk.
- Dark-mode kaartcontrast verhoogd (`--card-bg` #1d1c22 → #242230, `--line` #2c2a30 → #332f3c) —
  kaart smolt samen met de achtergrond.
- OG/Twitter-meta's aangepast aan de nieuwe hook-copy.

**Vervolg, zelfde dag:** hub-pagina én feedbackpagina (`site/tumble/feedback/`) volledig omgezet
naar Engels (`lang="en"`), inclusief de opgeslagen `data-value`-waardes van de feedbackform (nog
geen echte inzendingen op het moment van omzetten, dus geen mix van Nederlandse/Engelse waardes in
`feedback`-tabel). Reden: de beoogde outreach-kanalen (r/ADHD, r/SideProject/IndieHackers) zijn
Engelstalig, de Nederlandse markt voor een habit-tracker is verwaarloosbaar t.o.v. de Engelstalige,
en er is geen technische/i18n-reden om dit uit te stellen bij een los statisch bestand. Directe
Nederlandstalige outreach (vrienden/familie/collega's) loopt via persoonlijke appjes, niet via de
publieke pagina — die hoeft dus niet ook nog die rol te vervullen.

## Naamswissel Streakly → Tumble (9 september 2026)

De app achter `/tumble/...` heette tot 9 september 2026 "Streakly" — hernoemd na het ontdekken van
een botsing met een al bestaande, identieke App Store-app. Site-URL's zijn meeverhuisd
(`site/streakly/` → `site/tumble/`, nginx-redirects aangepast). Volledige afweging (andere
overwogen namen, merkregistratie-checks) staat in `~/projects/apps/tumble/ROADMAP.md`.

## Eerste browsergame: Meteor Dodge op /game/ (12 september 2026)

Onderdeel van de pivot naar games (zie `ROADMAP.md` § Pivot). Bron/build leeft in het losstaande
project `~/projects/apps/meteor-dodge/` (eigen CLAUDE.md/ROADMAP.md daar) — dit repo bevat alleen
de **gedeployde statische build** onder `site/game/` plus de nginx-caching-regel, net als
`site/tumble/...` de statische companion-pagina's van Tumble bevat.

- **Deploy is een handmatige stap** (`npm run deploy` in het meteor-dodge-project: `vite build` +
  `rsync --delete` naar `site/game/`) — geen watcher, geen CI/CD, zelfde filosofie als de rest van
  deze site. Na een wijziging aan de game-source moet die stap opnieuw gedraaid worden vóór het
  live staat.
- `location /game/assets/` toegevoegd in `nginx/johanlijffijt.dev.conf` voor lang-cachebare
  `Cache-Control`-headers op Vite's content-hashed JS-bundel — de rest van `/game/` (incl.
  `index.html`) valt al onder de bestaande `location /` van deze site (zelfde `root`), dus geen
  aparte proxy/serverblok nodig.
- **Node.js stond niet op de VPS** — geïnstalleerd via nvm (user-space, geen root nodig; de
  passwordless-sudo-regel in `/etc/sudoers.d/johan-nginx` is beperkt tot `nginx -t`/
  `systemctl reload nginx`, dus apt-based install was geen optie zonder wachtwoord). Elke nieuwe
  sessie die de game opnieuw wil builden, moet nvm eerst sourcen — zie meteor-dodge's CLAUDE.md.
- **Deze repo bleek nog geen lokale git had** ondanks dat dit bestand al sprak van "deze repo" —
  op 12 september 2026 alsnog geïnitialiseerd (`git init -b main`) en gekoppeld aan
  `https://github.com/Johan1974/johanlijffijt.dev.git` (bevestigd leeg via `git ls-remote`, dus
  geen bestaande historie om mee te reconciliën). Nog niet gepusht — eerste commit/push is een
  bewuste, aparte stap.

## Homepage herschreven tot arcade-hub (12 september 2026)

`site/index.html` volledig herschreven van Tumble's grace-dag-hero naar een "Indie Game Arcade &
Hub": hero met directe "Play now"-CTA naar `/game/`, een kaartengrid ("The Arcade") met Meteor
Dodge als actieve kaart plus twee bewust generieke "coming soon"-kaarten (geen verzonnen
titels/screenshots voor games die nog niet bestaan), en een korte footer-bio. Paars/oranje
kleurenschema vervangen door een paars/geel arcade-palet (`--accent: #7c3aed`), losstaand van
Tumble's kleuren — favicon meeverhuisd naar een play-knop-icoon.

**Feedback-link gerepareerd, niet blind hergebruikt:** de bestaande `site/tumble/feedback/`
bleek een Tumble-specifieke PMF-enquête ("Hoe teleurgesteld zou je zijn als Tumble morgen
verdween?") — ongeschikt om vanaf een arcade-kaart ("Got a game idea?") naartoe te linken.
In plaats daarvan een nieuwe, generieke `site/feedback/index.html` gemaakt die het al bestaande,
al generieke `contact_messages`-formulier (`site/tumble/contact/`'s achterliggende tabel, zie
`0004_contact_messages.sql`) hergebruikt met arcade-neutrale copy — geen nieuwe tabel nodig.
`site/tumble/contact/` en `site/tumble/feedback/` blijven ongewijzigd bestaan voor eventuele
toekomstige Tumble-specifieke inquiries.

**Click-tracking uitgebreid:** de oude `link_clicks`-insert-policy stond alleen `'ios'`/
`'android'`/`'feedback'` toe (Tumble-specifiek, zie `0003_link_clicks.sql`) — nieuwe waardes als
`'hero-play'` en `'game-meteor-dodge'` zouden een 401 op de insert hebben gekregen. Migratie
`~/projects/apps/tumble/supabase/migrations/0005_link_clicks_games.sql` verbreedt de policy naar
`'ios' | 'android' | 'feedback' | 'hero-play'` plus een `'game-%'`-patroon (zodat een volgende game
geen nieuwe migratie nodig heeft), toegepast via `docker exec supabase-db psql` en geverifieerd
met een test-insert (daarna opgeruimd uit de tabel).

## Eigen backend: loskoppelen van Tumble's Supabase (12 september 2026)

Op verzoek van Johan ("zet alles onder johanlijffijt.dev") — de arcade-hub's feedback/click-
tracking leunden nog op Tumble's self-hosted Supabase-instance, die inmiddels gestopt is (Tumble
staat on hold, alle containers van die stack zijn verwijderd om VPS-ruimte vrij te maken voor de
focus op games). Een nieuwe, losstaande, minimale backend toegevoegd in `api/`:

- **`api/server.js`** — geen framework, geen database-engine: puur Node's ingebouwde `http`-module,
  schrijft naar append-only NDJSON-bestanden (`api/data/feedback.ndjson`,
  `api/data/link_clicks.ndjson`). Twee endpoints: `POST /feedback` (message, optioneel email),
  `POST /track` (target, willekeurige string — geen CHECK-constraint-gedoe meer zoals bij
  Supabase's RLS-policies, want dit is nu eigen simpele code).
  Ruim voldoende voor het verkeer dat dit ooit gaat krijgen; een echte database zou hier premature
  infrastructuur zijn.
- **Draait als Docker-container** (`api/Dockerfile` + `api/docker-compose.yml`), op verzoek van
  Johan ("maak daar waar mogelijk gebruik van containers") i.p.v. een los Node-proces — dit
  weerspreekt niet de "Geen Docker"-keuze hierboven, want die ging specifiek over het **serveren
  van de statische site zelf** (nginx vs. een Caddy-container die botste op poort 80/443); een
  losstaande backend-container op een intern poortje heeft dat conflict niet. `restart:
  unless-stopped` lost reboot-overleving op zonder dat daar extra sudo voor nodig is (je account zit
  al in de `docker`-groep) — een systemd-unit zou wél root vereisen, wat verder gaat dan de
  passwordless-sudo-scope hierboven.
  **Let op:** de container draait as root (default `node:24-alpine`-gedrag, geen `USER` gezet), dus
  bestanden in `api/data/` zijn root-owned op de host — aanpassen/inspecteren vanaf de host kan
  niet direct (`Permission denied`), wel via `docker exec johanlijffijt-dev-api sh -c "..."`.
- **nginx:** nieuwe `location /api/` proxyt naar `127.0.0.1:8787` (zelfde patroon als de bestaande
  `/supabase/`-proxy, alleen zonder de `proxy_http_version 1.1`/`Connection`-headers — die waren
  specifiek nodig omdat Envoy anders `426 Upgrade Required` teruggaf, deze simpele Node-server heeft
  dat euvel niet). De oude `/supabase/`-proxy blijft staan (geeft nu 502, want de backend erachter
  is gestopt) — bewust niet verwijderd, kost niets in stilstand en scheelt herbedraden als Tumble
  ooit weer wordt opgepakt.
- **Client-side aangepast:** `site/index.html` (click-tracking) en `site/feedback/index.html`
  wijzen nu naar `/api/track`/`/api/feedback` i.p.v. de Supabase REST-URL's — de `ANON_KEY`-constante
  is overal verwijderd, niet meer nodig zonder Supabase ertussen.
  `site/tumble/feedback/` en `site/tumble/contact/` zijn **niet** aangepast — die blijven (nu
  niet-werkende) Tumble-specifieke pagina's, consistent met "Tumble blijft bereikbaar maar niet
  actief onderhouden".

## Nog open

- Geen store-link naar Tumble op de pagina — Tumble staat sinds de pivot van 12 september 2026 op
  on hold, dus dit is niet langer een actieve prioriteit.
- Geen echte screenshot/thumbnail voor Meteor Dodge's arcade-kaart — momenteel een emoji (☄️) op
  een gradient-achtergrond i.p.v. een echte in-game screenshot.
- Geen `og:image`/`twitter:image` op de hub-pagina — nog geen screenshot/logo-asset.
- Eerste commit + push naar `github.com/Johan1974/johanlijffijt.dev` nog niet gedaan (zie
  hierboven, § Eerste browsergame).

## Opgelost

- `lazykeeper.com.conf` stond nog als orphaned bestand in `/etc/nginx/sites-available/` terwijl
  het project zelf al verwijderd was — bleek al eerder losgekoppeld uit `sites-enabled/` (niet
  actief geserveerd). Bestand verwijderd op 2026-09-08.
