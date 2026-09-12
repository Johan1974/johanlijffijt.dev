# CLAUDE.md — johanlijffijt.dev

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

Zie `ROADMAP.md` § Staging-workflow voor de achtergrond/reden.

---

Persoonlijke hub-/portfoliopagina van Johan, domein `johanlijffijt.dev` (Namecheap, geregistreerd
7 september 2026). Doel: een lichte "proeftuin" die naar zijn projecten linkt en later kan
uitbreiden met eigen pagina's — geen mobiele app zelf. Sinds de pivot van 12 september 2026 (zie
`ROADMAP.md` § Pivot) ligt de focus op **browsergames** (eerste: Meteor Dodge, zie
`~/projects/apps/meteor-dodge/`, live op `/game/`); Tumble (`~/projects/apps/tumble/`) staat on
hold maar blijft bereikbaar via de bestaande try-it-links.

**Live sinds 7 september 2026:** https://johanlijffijt.dev (HTTP→HTTPS-redirect + geldig
Let's Encrypt-certificaat, geverifieerd via curl).

## Sessie-start-instructie (bindend)

Bij het starten van een nieuwe sessie op dit project: lees eerst `ROADMAP.md`, `TODO.md` én
`FEEDBACK.md` volledig door voor de laatste stand van zaken, vóórdat je verder werkt, voorstellen
doet of code aanpast. Vastgelegd op verzoek van Johan (12 september 2026, `FEEDBACK.md` toegevoegd
later dezelfde dag) zodat elke sessie aansluit op waar de vorige is gebleven, in plaats van blind
op deze CLAUDE.md alleen te vertrouwen — dit bestand beschrijft bewuste keuzes en architectuur,
`ROADMAP.md`/`TODO.md` de actuele status en openstaande taken, `FEEDBACK.md` wat spelers zelf
aandragen. Check bij `FEEDBACK.md` specifiek of er nieuwe, nog onbeoordeelde inzendingen zijn
(zie dat bestand § Hoe nieuwe inzendingen ophalen) die in de dagelijkse optimalisatielus
meegenomen moeten worden.

Kijk bij die sessie-start én bij de dagelijkse review (zie § Rol hieronder) ook expliciet naar
**organische vindbaarheid en SEO-metadata** — niet alleen gameplay/juice. Concreet: klopt
`sitemap.xml` nog met de live pagina's, zijn titel/description/JSON-LD actueel als er een pagina
bijkomt of wijzigt, staat er geen dode/verouderde structured data. Vastgelegd op verzoek van Johan
(12 september 2026, zie ROADMAP.md § Organische Groei & SEO Strategie) — SEO is hiermee een
terugkerend aandachtspunt, geen eenmalige toevoeging.

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
  **Update 12 september 2026 (zelfde dag):** dit root-owned-bestanden-probleem bleek de eigenlijke
  reden dat Johan ingezonden feedback nergens lokaal terugzag — niet leesbaar zonder
  `sudo`/`docker exec`. Opgelost via `user: "1001:1001"` (Johans host-UID:GID) in
  `api/docker-compose.yml` — `api/data/*.ndjson` is sindsdien gewoon leesbaar als `johan`, geen
  root-gedoe meer. Bij een eventuele nieuwe VPS/gebruiker moet dit UID:GID-paar wel kloppen (`id
  <gebruiker>` om te checken), anders faalt de container-write weer stil.
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

## Technische SEO-fundering (12 september 2026)

Op verzoek van Johan, onderdeel van de nieuwe "Daily SEO & Traffic Loop" (zie ROADMAP.md):

- **`site/robots.txt`** + **`site/sitemap.xml`** — handgeschreven statisch bestand (geen generator),
  past bij de "geen build-pipeline"-keuze hierboven. Bevat bewust alleen de actief onderhouden
  arcade-pagina's (`/`, `/game/`, `/feedback/`) — niet de Tumble-pagina's, die horen niet bij de
  huidige SEO-strategie (games) en hun formulieren werken toch niet meer (zie § Eigen backend).
  **Onderhoudspunt:** dit bestand moet handmatig bijgewerkt worden zodra er een nieuwe game/pagina
  bijkomt — geen automatische sync met `site/`'s mapstructuur, bewust simpel gehouden voor 3 URL's.
- **JSON-LD (`schema.org/VideoGame`)** op zowel de homepage (`site/index.html`) als op Meteor
  Dodge's eigen pagina — in de **bron** van meteor-dodge (`~/projects/apps/meteor-dodge/index.html`)
  toegevoegd, niet alleen in de gedeployde `site/game/index.html`, anders verdwijnt het bij de
  volgende `npm run deploy`. Velden: `genre: "Arcade"`, `gamePlatform: "WebBrowser"`,
  `playMode: "SinglePlayer"` (consistent met de singleplayer-only-scope-beslissing), `author`
  (Johan Lijffijt). Geen `image`-veld — geen echte screenshot om naar te verwijzen (zie eerdere
  "geen verzonnen assets"-afspraak bij de arcade-kaarten).
- **Verificatie-placeholders** voor Google Search Console (`google-site-verification`) en Bing
  Webmaster Tools (`msvalidate.01`) als lege `<meta>`-tags in `site/index.html` — een placeholder-
  waarde heeft geen effect (geen echte code = geen verificatie), dus dit is veilig om alvast klaar
  te zetten. **Echte codes moeten nog ingevuld worden** door Johan zelf na registratie van de
  property in beide tools (account-specifiek, kan niet vanuit deze sessie) — zie `TODO.md`.

## Staging-omgeving (12 september 2026)

DNS-record voor `staging.johanlijffijt.dev` → `51.68.189.167` stond al live (door Johan gezet) toen
dit is opgezet. Nieuw server-block in `nginx/johanlijffijt.dev.conf`:

- **Deelt de `root`** met productie (zelfde `site/`-map) — homepage, `/feedback/`, `robots.txt`,
  `sitemap.xml` etc. zijn dus altijd identiek tussen staging en productie, geen aparte kopie om uit
  sync te raken.
- **`location /game/` wijst via `alias`** naar een aparte map
  (`~/projects/johanlijffijt-dev/site-game-staging/`, gevuld door meteor-dodge's
  `npm run deploy:staging`) — dat is het enige stuk dat daadwerkelijk verschilt tussen staging en
  productie, en precies het stuk dat je hier wil testen vóór het naar productie (`site/game/`) gaat.
  Bewust **geen** lang-cachebare `Cache-Control`-headers op staging-assets (wel op productie) —
  bij snel itereren wil je dat elke deploy meteen zichtbaar is.
- **`/api/` proxy ook op staging** (zelfde backend, `127.0.0.1:8787`) — nodig omdat de gedeelde
  homepage/feedback-pagina die aanroept; test-inzendingen vanaf staging komen dus in dezelfde
  `api/data/*.ndjson` terecht als productie. Geen aparte staging-database — bewust, voor een
  project van deze schaal met één tester is dat premature infrastructuur.
- **HTTPS actief** (12 september 2026, zelfde dag) — Johan heeft zelf
  `sudo certbot --nginx -d staging.johanlijffijt.dev` gedraaid (root nodig, buiten de
  passwordless-sudo-scope hierboven). Certbot heeft `nginx/johanlijffijt.dev.conf` zelf aangevuld
  met een 443/ssl-blok + een HTTP→HTTPS-redirect-blok voor `staging.johanlijffijt.dev`, exact
  hetzelfde patroon als bij `johanlijffijt.dev` zelf — geldig cert t/m 11 december 2026, geverifieerd
  via curl (200 op homepage/`/game/`, 301-redirect vanaf `http://`).
- **Workflow vanaf nu:** game-iteraties (en andere wijzigingen) eerst deployen naar en testen op
  `staging.johanlijffijt.dev`, pas daarna naar productie — zie `ROADMAP.md` § Staging-workflow.

**Afwijking van het oorspronkelijke verzoek:** Johan vroeg om `/var/www/...`-paden voor zowel
staging als productie — die bestaan niet in dit project (de site draait vanaf
`~/projects/johanlijffijt-dev/site`, zie boven). Productiepad bewust ongewijzigd gelaten i.p.v.
blind een niet-bestaand pad te gebruiken en zo de live site te breken.

## Staging-banner (12 september 2026)

Op verzoek van Johan: een amber waarschuwingsbalk bovenaan de homepage en `/feedback/` die
duidelijk maakt dat je op staging zit. **Uitdaging:** deze pagina's zijn letterlijk hetzelfde
bestand op beide domeinen (gedeelde `root` in nginx, zie § Staging-omgeving) — een statische
banner zou dus op productie net zo goed verschijnen. Opgelost met client-side hostname-detectie
(`window.location.hostname.includes('staging')`), precies zoals Johan voorstelde — er was geen
server-side alternatief zonder de gedeelde root op te splitsen (grotere ingreep dan dit rechtvaardigt).

- **Fail-safe default:** het element heeft `hidden` in de HTML zelf; JS haalt dat er alleen af als
  de hostname-check slaagt. Als het script om wat voor reden dan ook niet draait, blijft de banner
  verborgen — het kan dus nooit per ongeluk op productie verschijnen, hooguit onterecht wegblijven
  op staging (veel onschuldiger falen).
- **Geen `position: fixed`** — bewuste keuze (Johan gevraagd, "los bovenaan" gekozen boven "fixed
  tijdens scrollen"): een banner in de normale document-flow, vóór de hero, kan nooit content
  overlappen. Fixed zou top-padding op de rest van de pagina hebben gevergd om hetzelfde te
  garanderen — meer complexiteit voor een subtiel voordeel op een korte pagina.
- **Niet op `/game/`** — bewust (Johan gevraagd): de canvas is fullscreen met eigen HUD
  (score linksboven, exact waar een banner zou komen) — een banner toevoegen zonder de layout te
  raken is een aparte, zorgvuldigere klus dan deze simpele statische pagina's. Dus: als je puur via
  `/game/` op staging test, is er (nog) geen visuele waarschuwing dat het staging is.
- **Duplicatie tussen `site/index.html` en `site/feedback/index.html`** is bewust, geen
  copy-paste-vergissing — dit project heeft geen templating/include-systeem (zie "Statisch, geen
  framework"-keuze bovenaan dit bestand), dus elke pagina is zelfstandig.
- **Geen aparte deploy-stap nodig:** deze bestanden staan al direct live zodra ze opgeslagen worden
  (zie § Deployment hierboven) — anders dan de game, die wél door `deploy:staging`/`deploy:prod`
  gaat.

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
