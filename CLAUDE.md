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

3. **SITEMAP MEE BIJWERKEN BIJ ELKE NIEUWE PRODUCTIE-PAGINA/GAME (vastgelegd 13 september 2026):**
   - Zodra een nieuwe pagina of game voor het eerst naar **productie** gaat (niet bij staging-only
     deploys), hoort het toevoegen van die URL aan `site/sitemap.xml` (+ `lastmod` bijwerken bij
     wijzigingen aan bestaande URL's) bij dezelfde deploy-stap, niet een los, makkelijk-te-vergeten
     taakje achteraf. Zie § Technische SEO-fundering verderop voor de bestaande structuur.
   - Bij een nieuwe indexeerbare URL: ook heroverwegen of die opnieuw ingediend moet worden in
     Google Search Console/Bing Webmaster Tools (zie `REGISTRATIONS.md` voor de huidige status).

Zie `ROADMAP.md` § Staging-workflow voor de achtergrond/reden.

---

# 🚨 CORE REGEL: Publiekstrekker & Retentie Eerst (Veel Publiek = Doel)

**Absolute prioriteit — vastgelegd 12 september 2026, staat op hetzelfde niveau als de Gouden
Regel hierboven.**

1. **Primair Doel:** Elke feature, aanpassing en iteratie heeft als hoofddoel: **maximaal publiek
   trekken, spelersretentie maximaliseren en verslavende gameplay bouwen**. Zonder spelers geen
   bereik en geen inkomsten.
2. **Proactieve Spelers-Check:**
   - Als een voorgestelde wijziging, idee of bugfix het spel té passief, saai, repetitief of niche
     maakt, MOET Claude direct aan de rem trekken.
   - Claude doet in dat geval direct concrete, proactieve tegenvoorstellen (gebaseerd op beproefde
     mechanismen uit virale hits op portals zoals itch.io, CrazyGames en Poki) om de game visueel
     spectaculairder, actiever en aantrekkelijker te maken voor de massa.
3. **Pijlers voor Elke Feature:**
   - **Spectakel & Juice:** Schermeffecten, directe feedback, ontploffingen, combo-audio.
   - **Actie boven Passiviteit:** Actief kunnen terugslaan/schieten en upgrades verzamelen in
     plaats van puur eindeloos vluchten.
   - **Dopamine-loop:** Duidelijke progressie (buit opzuigen, level-ups, builds) die motiveert tot
     "nog één potje".

**Toepassing op de lopende transformatie (12 september 2026):** de overstap van Meteor Dodge (pure
ontwijker) naar "Meteor Survivor" (auto-shooter roguelite, zie ROADMAP.md) is precies wat deze
regel voorschrijft — actief terugschieten i.p.v. passief ontwijken, een level-up-keuzemenu als
dopamine-loop, en meer spektakel (destructie, screenshake, deeltjes) bij elke meteoor-kill. Deze
regel is dus niet losstaand vastgelegd, maar bevestigt en onderbouwt een transformatie die al in
uitvoering was.

## 🔍 Benchmarking & Inspiratiebron: Portals (itch.io e.a.)

- **De Maatstaf:** Gebruik platformen zoals **itch.io** (tags `#arcade`, `#survival`,
  `#bullet-hell`, `#roguelite`), **Poki** en **CrazyGames** als actieve inspiratiebron en benchmark.
- **Trend-toetsing:** Kijk bij elke mechanic naar wat top-titels binnen deze genres (zoals
  *Vampire Survivors*, *Brotato*, *Void Scrappers*, *SNKRX*) succesvol maakt:
  * Hoe lossen zij feedback, risico/beloning, en tempo op?
  * Welke visuele beloningen ('juice') en audio-cues gebruiken zij?
- **Proactieve inbreng:** Stel bij nieuwe mechanics direct bewezen patronen uit deze titels voor
  in plaats van het wiel opnieuw uit te vinden.

## 🕹️ ROL & MANDAAT: Full-Stack Game Developer & Lead Designer

**Vastgelegd 12 september 2026, zelfde prioriteitsniveau als de regels hierboven.**

Niet simpelweg een assistent die gevraagde regels code typt — opereer als een **senior full-stack
indie game developer en lead designer**:

1. **Eigenaarschap over de Speelervaring (Game Feel & Polish):**
   - Schrijf nooit 'kale' mechanics. Elke actie (schieten, raken, verzamelen) vereist audiovisuele
     bevestiging (*game juice*: screen shake, floaters, sound feedback, micro-timing).
   - Test eigen logica conceptueel: als een pickup wordt toegevoegd, moet de collision/overlap en
     de magnetische aantrekking direct waterdicht geïmplementeerd zijn, niet pas na een bugrapport.
2. **Analyseren van Spelerspsychologie & Feedback:**
   - Interpreteer feedback zoals een ervaren developer dat doet: spelers identificeren feilloos
     *wáár* de wrijving zit, maar bedenken zelden zelf de juiste technische oplossing. Vertaal
     ruwe spelersreacties proactief naar onderliggende gamedesign-oplossingen.
3. **Commerciële Scherpte:**
   - Toets elke iteratie aan de wetten van platformen als itch.io: snelle onboarding (binnen 5
     seconden snappen wat je moet doen), directe dopamine (beloning voor risico), en een visueel
     aantrekkelijke presentatie die converteert naar clicks.

## 📱💻 VERPLICHTE PRE-FLIGHT CHECKLIST (Desktop & Mobiel)

**Vastgelegd 12 september 2026 — bindend.** Nooit een taak als gereed of klaar voor test melden
zonder eerst expliciet onderstaande checks te verifiëren in code-inspectie en tests, vóór elke
deploy naar staging:

1. **Besturing & Bewegingsvrijheid:**
   - Desktop: werkt 2D-beweging (X én Y-as) soepel via WASD én pijltjestoetsen? Zijn diagonale
     snelheden genormaliseerd?
   - Mobiel: volgt de pointer/touch zowel X als Y zonder haperingen en zonder dat het scherm
     ongewenst meescrolt?
2. **Menu- & UI-Navigatie (geen muis-blokkades):**
   - Desktop: zijn pauze- en level-up-menu's 100% te bedienen met het toetsenbord (pijltjes/WASD
     om te bladeren, Spatie/Enter om te kiezen, 1/2/3 als directe sneltoets)?
   - Mobiel: zijn knoppen en upgrade-kaarten groot genoeg voor touch-targets (minimaal 44×44px
     hitbox) en direct aantikbaar?
   - Focus & Escape: voorkom dat 'Escape' of 'P' botst met een al geopend keuzemenu.
3. **Collision & Game-Over-integriteit:**
   - Is de collider tussen speler en obstakels actief (geen onbedoelde 'god mode')?
   - Treedt Game Over betrouwbaar op zodra een meteoor het schip raakt?
4. **Drops, Magneet & Scoring Loop:**
   - Hebben vernietigde meteoren een werkende overlap-listener met de speler voor Space Dust?
   - Werkt de magnetische aantrekking op zowel desktop als touch soepel richting het schip?
   - Schrijft de scoreteller punten bij bij destructie (+10 / +25)?
5. **UI-Layout & Tekst-Overlap:**
   - Bounding boxes controleren: overlappen herstartinstructies en statistieken elkaar nooit op
     smalle schermen (mobiel portrait) én brede desktop-resoluties?

---

# 🔎 CORE REGEL: SEO-Eerst voor Alle Tekst (Organisch Verkeer, Geen Betaald Verkeer)

**Absolute prioriteit — vastgelegd 12 september 2026, staat op hetzelfde niveau als de Gouden
Regel en de Core Regel Publiekstrekker & Retentie hierboven.**

**Aanleiding:** ontdekt bij het schrijven van de v1.0-itch.io-devlogpost voor Meteor Survivor —
de tekst was geschreven voor engagement (pakkende hook, emoji's) maar bevatte geen kernwoorden
vooraan in titel/openingszin en geen expliciete link terug naar de speelpagina. Johan wil groeien
via **organisch verkeer** (zoekmachines, itch.io-discovery, natuurlijke deel-/linkgroei) en
expliciet **niet betalen voor verkeer** (geen ads) — dus mag tekstkwaliteit-voor-SEO nooit een
losse suggestie achteraf zijn, maar moet vanaf de eerste versie meegenomen worden, net zoals
game-juice dat is voor gameplay (zie de Core Regel Publiekstrekker hierboven).

1. **Reikwijdte:** geldt voor **elke tekst die voor dit project geschreven wordt** — site-copy
   (`site/index.html` e.a., zie ook § Technische SEO-fundering verderop), meta-descriptions,
   JSON-LD, alt-teksten, én content die namens dit project op externe platformen gepubliceerd
   wordt (itch.io-devlogposts, itch.io-projectbeschrijving/-tags, social captions). Niet alleen
   de hub-site zelf.
2. **Verplichte controlepunten, vóór elke tekst als "klaar" wordt opgeleverd:**
   - **Kernwoorden vooraan:** titel én openingszin bevatten de relevante zoektermen (game-naam,
     genre, "free"/"browser game"/"play now" waar toepasselijk) — dat is vaak exact wat een
     zoekmachine of social-preview als snippet toont, dus een puur sfeervolle opener zonder
     kernwoorden verliest die kans.
   - **Expliciete link terug naar de speelbare pagina** in de tekst zelf, niet alleen impliciet
     via een platformkoppeling (bijv. itch.io's automatische projectlink).
   - **Beschrijvende alt-teksten** op elke content-afbeelding (geen lege/decoratieve alt).
   - **Logische kopstructuur** (H1/H2 niet overslaan of willekeurig kiezen).
   - **Natuurlijke kernwoorddichtheid** — geen keyword-stuffing; de tekst moet zichzelf nog
     steeds verkopen aan een mens (zelfde eis als de Core Regel Publiekstrekker), SEO is een
     randvoorwaarde, geen vervanging voor goede copy.
3. **Geen betaald verkeer:** advertentiebudget/betaalde promotie is expliciet geen onderdeel van
   de groeistrategie van dit project — elke aanbeveling voor verkeer/zichtbaarheid moet een
   organische route zijn (SEO, platform-discovery, community, mond-tot-mondreclame), nooit een
   voorstel om te betalen voor bereik.

---

# 📧 GOUDEN REGEL: Uitsluitend `play@johanlijffijt.dev` voor Registraties

**Absolute prioriteit — vastgelegd 12 september 2026, staat op hetzelfde niveau als de Gouden
Regel voor Deployment bovenaan dit bestand.**

Voor **élke nieuwe accountregistratie** die voor dit project/deze game wordt aangemaakt — game-
portals (CrazyGames, Poki, Newgrounds, Kongregate, GameJolt, Armor Games, Y8) of andere externe
diensten — wordt **uitsluitend** `play@johanlijffijt.dev` gebruikt, **nooit** Johans persoonlijke
e-mailadres. Geen uitzonderingen, tenzij Johan in de chat expliciet iets anders aangeeft.

Bestaande registraties van vóór dit besluit (GitHub `Johan1974`, itch.io via GitHub-OAuth) blijven
ongewijzigd op hun huidige account — dit is geen migratie-opdracht, alleen een regel voor
toekomstige, nieuwe registraties. Zie `REGISTRATIONS.md` voor de actuele stand per platform.

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

Bij het starten van een nieuwe sessie op dit project: lees eerst `ROADMAP.md`, `TODO.md`,
`FEEDBACK.md` én `REGISTRATIONS.md` volledig door voor de laatste stand van zaken, vóórdat je
verder werkt, voorstellen doet of code aanpast. Vastgelegd op verzoek van Johan (12 september
2026, `FEEDBACK.md` en `REGISTRATIONS.md` toegevoegd later dezelfde dag) zodat elke sessie
aansluit op waar de vorige is gebleven, in plaats van blind op deze CLAUDE.md alleen te
vertrouwen — dit bestand beschrijft bewuste keuzes en architectuur, `ROADMAP.md`/`TODO.md` de
actuele status en openstaande taken, `FEEDBACK.md` wat spelers zelf aandragen,
`REGISTRATIONS.md` op welke externe sites/diensten al een account bestaat (nooit gokken of iets
al geregistreerd is). Check bij `FEEDBACK.md` specifiek of er nieuwe, nog onbeoordeelde
inzendingen zijn (zie dat bestand § Hoe nieuwe inzendingen ophalen) die in de dagelijkse
optimalisatielus
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
- **Sinds 12 september 2026 zit hier ook een geautomatiseerde poort vóór:** Meteor Dodge draait
  Playwright-E2E-tests automatisch vóór elke `deploy:staging` (npm `predeploy:staging`-hook) —
  een falende test blokkeert de deploy zelf, geverifieerd door dat daadwerkelijk uit te proberen.
  Details in `~/projects/apps/meteor-dodge/CLAUDE.md` § Geautomatiseerde E2E-verificatie.

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
- Meteor Survivor is op productie nog gedeployed onder de oude naam "Meteor Dodge" — hernoeming
  (12 september 2026) staat wel op staging, wacht op "GO voor productie" (zie TODO.md).

## Extra itch.io-promo-screenshots (12 september 2026)

Op verzoek van Johan: 3 extra screenshots toegevoegd naast de bestaande cover-afbeelding, bedoeld
voor handmatige upload naar itch.io's screenshot-galerij (niet gebruikt op deze site zelf) —
`site/images/meteor-survivor-action-1.png`, `-action-2.png` (drukke gameplay: meteoren, lasers,
HUD met score/level) en `-upgrade-menu.png` (het level-up-keuzemenu). Gegenereerd met een nieuw
script in het meteor-dodge-project (`scripts/capture-screenshots.mjs`, zie dat project's
CLAUDE.md) via dezelfde Playwright/`window.__game`-aanpak als de bestaande E2E-tests.

**Onderweg een echte bug gevonden, niet alleen een screenshot-klusje:** de eerste poging leverde
screenshots op met volledig lege HUD/upgrade-kaarten — geen scoretekst, geen kaarttitels, niets.
Bleek geen screenshot-timingprobleem maar een structurele blinde vlek: deze VPS heeft **geen
systeemfonts** geïnstalleerd, dus elk Phaser Text-object rendert onzichtbaar in headless Chromium
(canvas `measureText()` geeft stil 0×0 terug zonder font om mee te meten). De bestaande 7 E2E-tests
zagen dit nooit, want die lezen scene-state via `page.evaluate()`, niet gerenderde pixels — en de
eerdere cover-screenshot ontsnapte hier toevallig aan doordat die crop bewust onder de HUD begon.
Root-cause gefixt in het meteor-dodge-project (fontconfig + DejaVu-fonts zonder root geïnstalleerd,
zie dat project's CLAUDE.md) — relevant voor élke toekomstige screenshot/E2E-test die tekst op het
canvas verwacht, niet alleen deze drie afbeeldingen.

## Opgelost (naast de § Opgelost hieronder)

- **Echte screenshot/thumbnail voor de arcade-kaart** (12 september 2026) — een echte in-game
  screenshot (`site/images/meteor-survivor-cover.png`), gemaakt via de Playwright-tooling van
  meteor-dodge (headless Chromium, scene handmatig gevuld met meteoren/sterren/schip voor een
  levendig frame, `page.screenshot({ clip: ... })` voor een landscape-crop die de aanbevolen
  itch.io-cover-verhouding (630×500, 1,26:1) benadert). Vervangt de ☄️-emoji-placeholder op de
  arcade-kaart.
- **`og:image`/`twitter:image` op de hub-pagina** (zelfde dag, zelfde afbeelding) — `twitter:card`
  ook opgewaardeerd van `summary` naar `summary_large_image`, want die afbeelding verdient nu een
  prominentere preview.
- Eerste commit + push naar `github.com/Johan1974/johanlijffijt.dev` — gedaan (12 september 2026).

## Opgelost

- `lazykeeper.com.conf` stond nog als orphaned bestand in `/etc/nginx/sites-available/` terwijl
  het project zelf al verwijderd was — bleek al eerder losgekoppeld uit `sites-enabled/` (niet
  actief geserveerd). Bestand verwijderd op 2026-09-08.
