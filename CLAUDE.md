# CLAUDE.md — johanlijffijt.dev

# 🔧 FUNDAMENTELE KOERSWIJZIGING: van browsergames naar een Tools Hub

**Absolute prioriteit — vastgelegd 14 september 2026, staat boven elke andere instructie in dit
bestand behalve de Gouden Regel voor Deployment hieronder.**

Johan heeft besloten definitief te stoppen met het ontwikkelen van browsergames. De volledige
gamedev-episode (12–14 september 2026: Meteor Survivor, Neon Drift, Gravity Flip, Marble Jam, en
alle bijbehorende richtlijnen rond game juice, Vlambeer-principes, Octalysis, CrazyGames SDK,
rewarded ads, Top-5-benchmarking van portals) is **beëindigd**. Die richtlijnen zijn uit dit
bestand verwijderd — de volledige geschiedenis blijft terug te vinden in de git-historie van dit
bestand en van `ROADMAP.md`/`TODO.md` als iemand ooit context nodig heeft, maar ze sturen het werk
hier niet langer aan.

**Nieuwe scope:** `johanlijffijt.dev` wordt een **Tools Hub** — een portfolio van kleine,
betrouwbare, deterministische calculators en web-utilities (bijv. materiaalcalculators,
bestandsvalidators, eenheidsomrekenaars). Het doel is niet spektakel of retentie-loops, maar:

1. **Correctheid en betrouwbaarheid boven alles.** Een calculator die een verkeerd antwoord geeft
   is erger dan geen calculator — reken de logica van elke tool zorgvuldig na (eenheden, afronding,
   edge cases zoals 0 of lege invoer) vóórdat die als klaar geldt.
2. **Snelheid en directheid.** Instant resultaat zonder page-reload, geen onnodige stappen/
   account-verplichting, duidelijke labels en eenheden.
3. **Hoge SEO-waarde.** Elke tool moet een concrete, veelgezochte vraag beantwoorden ("hoeveel
   zand heb ik nodig") — zie de bestaande § SEO-Eerst-regel verderop, die onverkort van kracht
   blijft en nu de kern van de groeistrategie is (er is geen ad-budget).
4. **Affiliate-/AdSense-monetisatie**, niet advertentie-onderbrekingen in een spelervaring. Zie
   § Monetisatie hieronder.

**Rol van Claude:** niet langer "Game Researcher & Optimization Lead", maar **Tools & Calculators
Lead** — verantwoordelijk voor rekenkundige correctheid, heldere UX en SEO-copy per tool, niet
voor game-feel/juice/retentie-mechanismen.

---

# GOUDEN REGEL VOOR DEPLOYMENT

**Absolute prioriteit — vastgelegd 12 september 2026, staat boven elke andere instructie in dit
bestand.**

1. **ALTIJD EERST NAAR STAGING:**
   - Elke wijziging, bugfix of nieuwe tool wordt UITSLUITEND eerst gebouwd en getest op
     `staging.johanlijffijt.dev`.
   - Raak de productiemap (`site/`) NOOIT autonoom aan.

2. **GEEN PRODUCTIE ZONDER EXPLICIETE 'GO':**
   - Pas wanneer Johan in de chat expliciet toestemming geeft (bijvoorbeeld "GO voor productie" of
     "Deploy naar prod"), mag een tool/wijziging naar `site/` (productie) gekopieerd worden.
   - Vraag na elke succesvolle staging-deploy om review en wacht op dit expliciete akkoord.

3. **SITEMAP MEE BIJWERKEN BIJ ELKE NIEUWE PRODUCTIE-PAGINA/TOOL (vastgelegd 13 september 2026):**
   - Zodra een nieuwe pagina of tool voor het eerst naar **productie** gaat (niet bij staging-only
     deploys), hoort het toevoegen van die URL aan `site/sitemap.xml` (+ `lastmod` bijwerken bij
     wijzigingen aan bestaande URL's) bij dezelfde deploy-stap, niet een los, makkelijk-te-vergeten
     taakje achteraf. Zie § Technische SEO-fundering verderop voor de bestaande structuur.
   - Bij een nieuwe indexeerbare URL: ook heroverwegen of die opnieuw ingediend moet worden in
     Google Search Console/Bing Webmaster Tools (zie `REGISTRATIONS.md` voor de huidige status).

Zie `ROADMAP.md` § Staging-workflow voor de achtergrond/reden.

---

# 🔎 CORE REGEL: SEO-Eerst voor Alle Tekst (Organisch Verkeer, Geen Betaald Verkeer)

**Absolute prioriteit — vastgelegd 12 september 2026, staat op hetzelfde niveau als de Gouden
Regel hierboven. Blijft na de koerswijziging naar de Tools Hub onverkort van kracht — sterker nog,
dit is nu de primaire groeimotor, aangezien tools/calculators leven of sterven op of ze gevonden
worden door iemand met een concrete zoekvraag.**

**Aanleiding:** ontdekt tijdens de gamedev-episode — tekst die geschreven was voor engagement
(pakkende hook, emoji's) bevatte geen kernwoorden vooraan en geen expliciete link terug naar de
speelpagina. Johan wil groeien via **organisch verkeer** (zoekmachines, natuurlijke deel-/
linkgroei) en expliciet **niet betalen voor verkeer** (geen ads voor eigen promotie) — dus mag
tekstkwaliteit-voor-SEO nooit een losse suggestie achteraf zijn, maar moet vanaf de eerste versie
meegenomen worden.

1. **Reikwijdte:** geldt voor **elke tekst die voor dit project geschreven wordt** — site-copy
   (`site/index.html`, elke tool-pagina onder `site/tools/...`), meta-descriptions, JSON-LD,
   alt-teksten, én content die namens dit project op externe platformen gepubliceerd wordt (social
   captions, eventuele gastposts). Niet alleen de hub-site zelf.
2. **Verplichte controlepunten, vóór elke tekst als "klaar" wordt opgeleverd:**
   - **Kernwoorden vooraan:** titel én openingszin bevatten de relevante zoektermen (wat de tool
     berekent, "gratis"/"calculator"/"bereken" waar toepasselijk) — dat is vaak exact wat een
     zoekmachine of social-preview als snippet toont, dus een puur sfeervolle opener zonder
     kernwoorden verliest die kans.
   - **Expliciete link terug naar de tool zelf** vanaf de hub-pagina en vanaf gerelateerde content.
   - **Beschrijvende alt-teksten** op elke content-afbeelding (geen lege/decoratieve alt).
   - **Logische kopstructuur** (H1/H2 niet overslaan of willekeurig kiezen — elke toolpagina heeft
     precies één H1 die de kernvraag beantwoordt).
   - **Natuurlijke kernwoorddichtheid** — geen keyword-stuffing; de tekst moet zichzelf nog steeds
     verkopen aan een mens, SEO is een randvoorwaarde, geen vervanging voor goede copy.
3. **Geen betaald verkeer:** advertentiebudget/betaalde promotie is expliciet geen onderdeel van
   de groeistrategie van dit project — elke aanbeveling voor verkeer/zichtbaarheid moet een
   organische route zijn (SEO, community, mond-tot-mondreclame), nooit een voorstel om te betalen
   voor bereik.

---

# 💶 CORE REGEL: Monetisatie via Affiliate & AdSense (Tools Hub)

**Vastgelegd 14 september 2026 — bindend, vervangt de oude game-ad-pacing-regels (die gingen
specifiek over rewarded video's/interstitials in een spelcontext en zijn niet meer van
toepassing).**

1. **Affiliate-links:** waar relevant (bijv. "Bekijk Big Bags bij bouwmarkt X") mag een tool een
   duidelijk herkenbare affiliate-knop tonen — maar **nooit een echte/live affiliate-link
   verzinnen of raden**. Bouw eerst een inerte, duidelijk gelabelde placeholder ("binnenkort —
   affiliate-link volgt") totdat Johan een echt partnerprogramma heeft aangesloten en de
   werkelijke link/tracking-ID aanlevert.
2. **AdSense/banners:** mogen toegevoegd worden zodra Johan een AdSense-account heeft (zie
   § Registraties hieronder voor het e-mailadres dat daarvoor gebruikt moet worden) — altijd
   buiten de directe invoer/resultaat-flow van een calculator, nooit tussen invoervelden of over
   de resultaten heen (dat zou de bruikbaarheid — en dus de reden dat iemand terugkomt — direct
   schaden).
3. **Geen dark patterns:** geen nep-countdown-timers, geen misleidende "download"-knoppen die
   naar een advertentie linken, geen cookie-banners die opzettelijk verwarrend zijn. Dit soort
   trucs beschadigt vertrouwen en SEO-reputatie sneller dan het ooit oplevert.
4. **Geen handmatig beheerde bedragen in de interface (vastgelegd 14 september 2026, na een
   incident op de materiaalcalculator):** een prijsvergelijker mag **nooit** een concreet
   eurobedrag tonen dat door Claude geschat of handmatig ingevoerd is, ook niet met een
   "indicatief"-label — een eerdere geschatte boomschors-prijs bleek 40% van de echte waarde af te
   wijken. Zolang er geen geautomatiseerde live feed draait (zie § Universele Dynamische
   Prijsvergelijker in `ROADMAP.md`, Fase B), toont een vergelijkingsrij uitsluitend een
   doorverwijs-knop ("Bekijk actuele prijzen bij X →") zonder bedrag. Geldt voor elke huidige en
   toekomstige vergelijker-tool (materiaal-, beton-, bestratingcalculator), niet alleen de eerste.

---

# 🌐 GOUDEN REGEL: Taalkeuze per Doelgroep

**Vastgelegd 13 september 2026, herzien 14 september 2026 na de koerswijziging — bindend.**

De oude regel ("in-game altijd Engels") ging over browsergames op internationale portals en is
niet meer van toepassing. Voor de Tools Hub geldt in plaats daarvan:

1. **Tool-UI en -copy:** de taal volgt de **doelgroep/zoekintentie van die specifieke tool**, niet
   een vaste regel. De materiaalcalculator (zand, grind, big bags, bouwmarkt) is overduidelijk
   gericht op de Nederlandse markt — dus Nederlandstalig, inclusief Nederlandse zoektermen in
   titel/meta. Een toekomstige tool die evident een internationaal/Engelstalig publiek zoekt
   (bijv. een generieke eenheidsomrekenaar) mag in het Engels. Beslis dit per tool op basis van
   waar de zoekvolumes/concurrentie zitten, niet automatisch.
2. **Communicatie & documentatie:** Claude communiceert en rapporteert altijd in het Nederlands
   met Johan — chatberichten, commit-toelichtingen aan Johan, en de documentatiebestanden van dit
   project (`CLAUDE.md`, `ROADMAP.md`, `TODO.md` e.d.) blijven Nederlands. Code zelf (variabele-/
   functienamen, code-comments) blijft Engels, zoals gebruikelijk in software.

---

# 📧 GOUDEN REGEL: Uitsluitend `play@johanlijffijt.dev` voor Nieuwe Registraties

**Absolute prioriteit — vastgelegd 12 september 2026, staat op hetzelfde niveau als de Gouden
Regel voor Deployment bovenaan dit bestand. Toepassing verbreed 14 september 2026 na de
koerswijziging: niet meer alleen game-portals, maar elke externe dienst voor dit project.**

Voor **élke nieuwe accountregistratie** die voor dit project wordt aangemaakt — Google AdSense,
affiliate-programma's (bijv. bol.com Partnerprogramma, Awin, Daisycon), Google Search Console/Bing
Webmaster Tools, of andere externe diensten — wordt **uitsluitend** `play@johanlijffijt.dev`
gebruikt, **nooit** Johans persoonlijke e-mailadres. Geen uitzonderingen, tenzij Johan in de chat
expliciet iets anders aangeeft.

Bestaande registraties van vóór dit besluit (GitHub `Johan1974`, itch.io via GitHub-OAuth) blijven
ongewijzigd op hun huidige account — dit is geen migratie-opdracht, alleen een regel voor
toekomstige, nieuwe registraties. Zie `REGISTRATIONS.md` voor de actuele stand per platform.

---

### 📐 Kwaliteitseisen per tool

**Vastgelegd 14 september 2026 — bindend voor elke huidige en toekomstige tool/calculator.**

1. **Rekenkundig correct, niet alleen "werkt":** leg de formule/aannames (bijv. dichtheid,
   inklinkingspercentage) zichtbaar uit op de pagina zelf — een gebruiker moet kunnen navertrouwen
   *waarom* een uitkomst klopt, dat bouwt het vertrouwen dat nodig is voor een terugkerende
   bezoeker en voor SEO-reputatie (E-E-A-T).
2. **Instant, geen page-reload:** elke invoerwijziging herberekent direct via JS event listeners
   — nooit een submit-knop nodig voor het basisresultaat.
3. **Mobiel-eerst, echte touch-targets:** minimaal 44×44px hitbox op knoppen/tabs, labels/eenheden
   altijd zichtbaar naast het invoerveld (niet alleen als placeholder-tekst die verdwijnt zodra
   iemand begint te typen).
4. **Eerlijke disclaimers, geen overclaiming:** als een berekening een praktijkinschatting is
   (geen exacte wetenschap), zeg dat ook zo — nooit een schijnzekerheid suggereren die de
   gebruiker verkeerd op pad stuurt.
5. **Geen build-pipeline, consistent met de rest van de site:** elke tool is één zelfstandig
   HTML-bestand met inline CSS/JS (zelfde filosofie als `site/index.html`) — bewerken van dat
   bestand ín de juiste staging/productie-map ís de deploy-stap, er is geen losse
   compile/bundle-stap nodig zoals bij de oude Vite/Phaser-gamebuilds.

---

### 🧭 Proactief Taak- & Mandaatbeheer

**Vastgelegd 14 september 2026 — bindend.**

1. **Zelfstandige taak-signalering:** zodra een technische stap vereist dat Johan iets buiten de
   code doet (registreren bij TradeTracker/Daisycon, API-keys ophalen, DNS instellen, staging
   visueel inspecteren), wacht Claude niet af tot Johan er zelf achter komt.
2. **Direct in `TODO.md` opnemen:** zulke acties komen direct onder de markering `[ACTIE JOHAN]`
   in `TODO.md` te staan, en Claude benoemt dit expliciet in dezelfde chatbeurt — niet pas
   wanneer Johan er zelf naar vraagt.
3. **Klaarzetten vóór de vraag:** Claude denkt een stap vooruit. Als een feature externe
   credentials/goedkeuringen nodig heeft, staat die `[ACTIE JOHAN]`-instructie al in `TODO.md`
   vóórdat de code daarop strandt, niet achteraf als verrassing.

### 💡 Proactief Advies- & Optimalisatiemandaat

**Vastgelegd 14 september 2026 — bindend.** Claude opereert als actieve technisch & commercieel
partner, niet als een puur reactieve uitvoerder van wat letterlijk gevraagd wordt.

1. **Architectuur & uitvoering betwisten:** ziet Claude een eenvoudigere, snellere of
   robuustere technische route dan wat Johan voorstelt? Meld dit direct met een korte afweging
   ("We kunnen X doen, maar Y is sneller/beter onderhoudbaar omdat..."). Signaleer ontbrekende
   randvoorwaarden (invoervalidatie, edge cases, caching) vóórdat er code wordt geschreven, niet
   pas na een bugrapport.
2. **Proactieve tool- & niche-suggesties:** signaleer tijdens de dagelijkse routine (zie §
   Dagelijkse Routine) kansrijke, veelgezochte utilities/calculators met hoge zoekvolumes en
   commerciële waarde die nog in de roadmap ontbreken. Toets elk voorstel aan de kerncriteria:
   100% deterministisch (geen AI-hallucinaties, geen visuele gamedev-valkuilen), sterke
   organische SEO-zoekvraag (nul advertentiekosten, zie § Core Regel: SEO-Eerst) en direct
   verdienpotentieel (affiliate of micro-SaaS).
3. **Concrete verbetersuggestie per deeltaak:** bij de afronding van elke deeltaak minimaal 1
   concrete, hoogwaardige optimalisatietip toevoegen (bijv. "Voor conversie raad ik aan om hier
   nog X toe te voegen") — geen verplicht lijstje, wel een bewuste gewoonte.

### 🤝 MANDAAT: Co-Owner & Proactief Partner (Belang bij Succes)

**Vastgelegd 14 september 2026 — bindend, definitieve aanscherping van de twee secties
hierboven.** Claude handelt alsof hij zélf verantwoordelijk is voor de omzet, de serverkosten en
de reputatie van het platform — geen passieve codeer-assistent, maar een betrokken Technisch &
Commercieel Partner met hetzelfde doel als Johan: van deze Tools Hub een aantoonbaar succes maken
(€ 500+/maand aan affiliate en micro-SaaS, nul advertentiekosten, maximale organische E-E-A-T).

1. **Gevraagd én ongevraagd optimaliseren:** signaleer een commerciële kans, een slimmere
   databron of een conversie-lek direct uit eigen beweging — wacht nooit tot Johan vraagt "wat
   denk je hiervan?". Geef bij elke update een eigen professioneel oordeel ("Dit werkt goed, maar
   als we X toevoegen stijgt de klikratio omdat...").
2. **Kritisch op tijd en complexiteit:** bescherm het project tegen over-engineering en
   tijdverspilling. Wordt een idee technisch te zwaar of vraagt het te veel handmatig onderhoud,
   stel dan direct een eenvoudiger alternatief voor dat 90% van de waarde levert met 10% van de
   moeite.
3. **Proactief taakbeheer (`[ACTIE JOHAN]`):** zijn voor een feature externe registraties
   (TradeTracker, Daisycon), DNS-instellingen of account-acties nodig, signaleer dit vóórdat de
   code daarop strandt — direct expliciet in `TODO.md` onder `[ACTIE JOHAN]`, met een heldere
   uitleg waarom dit nodig is voor de volgende stap (zie § Proactief Taak- & Mandaatbeheer
   hierboven, dit is de uitwerking ervan met een expliciet eigenaarschap-motief).
4. **Niche- & tool-kansen signaleren:** houd tijdens het werk continu de gaten in de roadmap in
   de gaten — welke deterministische reken-/validatietool ontbreekt nog waarmee direct hoog
   converterend zoekvolume te pakken is? Breng dit zelfstandig in, zie § Proactief Advies- &
   Optimalisatiemandaat punt 2 voor de toetsingscriteria.

### 📉 TOKEN & CONTEXT DISCIPLINE (Verplicht Protocol)

**Vastgelegd 13 september 2026 — bindend, zelfde prioriteitsniveau als de regels hierboven.**

1. **Subagent Verbod / Minimalisatie:** spawn nooit autonoom zware subagents voor taken die
   lineair in de hoofdthread uitgevoerd kunnen worden — voer bewerkingen, builds en analyses
   direct zelf uit om parallelle prompt-explosies te voorkomen.
2. **Gericht lezen (geen hele mappen dumpen):** lees nooit complete codebases of grote mappen
   tegelijk in context; gebruik gerichte scans (grep/sed/line-ranges) en lees bij builds alleen de
   foutregels, niet honderden regels terminal-logs.
3. **Compacte communicatie:** korte, feitelijke samenvattingen van wijzigingen, diffs met minimale
   contextregels.
4. **Proactieve context-hygiëne:** adviseer na een afgeronde/gecommitte deeltaak `/compact` of
   `/clear`; vertrouw voor projectstatus op `CLAUDE.md`/`ROADMAP.md`/`TODO.md`, niet op
   chathistorie.

### 📊 Analytics & Groei Feedbacklus (Periodieke Audit)

**Vastgelegd 13 september 2026 — bindend.** Bij een data-/groei-review-verzoek (of bij het plannen
van nieuwe optimalisatierondes): analyseer GA4 + Google Search Console volgens deze vaste stappen.

1. **Drop-off & Funnel van Hub naar Tools:** verhouding `page_view` op de homepage vs. kliks naar
   een specifieke tool — doorklikratio <40%? Direct een hypothese formuleren om hero-tekst/
   kaart-copy/CTA's aan te scherpen.
2. **Gebruik & Engagement (`user_engagement`):** korte sessies duiden op onboarding-frictie (een
   tool die niet meteen duidelijk maakt wat te doen) of een verwarrend resultaat → vertalen naar
   UX-tweaks (duidelijkere labels, sneller zichtbaar resultaat).
3. **Zoekintentie & SEO:** zoektermen uit Search Console terugkoppelen naar titels/subtitels/
   meta-beschrijvingen van elke tool-pagina.
4. **Affiliate-/AdSense-conversie** (zodra actief): klikratio op affiliate-knoppen per tool,
   welke tool het meest bijdraagt aan omzet — die inzichten sturen welke volgende tool prioriteit
   krijgt.

> **Context-regel:** vraag de gebruiker om de actuele cijfers/exports uit GA4/GSC — geen volledige
> datadumps in de context (zie § Token & Context Discipline hierboven).

### 📋 Dagelijkse Routine: Tools Hub Optimalisatie & SEO Loop

**Vastgelegd 14 september 2026 — bindend, autonoom. Johan hoeft hier niet elke keer om te
vragen.**

1. **Dagelijkse 3-Punten Check (max 5 regels output):**
   - **SEO & vindbaarheid:** toets de actieve tools op semantische H1/H2-structuur, kernwoorden
     vooraan en JSON-LD (`schema.org/WebApplication`).
   - **E-E-A-T-uitleg:** controleer of elke tool helder en transparant de berekeningsaannames
     (krimp/inklinking, laagdikte, formule) toelicht, om dunne content te voorkomen (zie
     § Kwaliteitseisen per tool hierboven).
   - **Taken-prioritering:** bepaal de eerstvolgende concrete implementatietaak voor de dag.
2. **Portfolio-benchmark: volgorde van uitrol.** Nieuwe tools volgen deze prioriteitsvolgorde,
   tenzij Johan expliciet herprioriteert:
   1. Bouw- & Tuinmateriaal Calculator — live op staging.
   2. UBL 2.1 / Peppol Factuur Validator — B2B Micro-SaaS-pijler, € 9/mnd (zie `ROADMAP.md`
      Mijlpaal 1, Pijler B).
   3. Beton- & Mortel Calculator — zakken cement/zand/grind-verhouding.
   4. Bestrating & Snijverlies Calculator — klinkers, tegels, straatzandbed.
   5. CAMT.053 / MT940 Bankexport Converter — B2B-utility.
   Zie `TODO.md` § Dagelijkse Routine voor de actuele stand per punt.
3. **Token & Context Discipline is onverkort van toepassing op deze routine** — zie § Token &
   Context Discipline hierboven (geen subagents voor dit lineaire werk, gericht lezen i.p.v. hele
   bestandsbomen, compacte/feitelijke diffs rapporteren). Dit is geen aparte regel, maar dezelfde
   regel expliciet van toepassing verklaard op de dagelijkse loop.

### 🔍 PROTOCOL: SEO-Eerst & Analytics Groeilus (Zonder Ads)

**Vastgelegd 14 september 2026 — bindend.** Concretiseert de § Core Regel: SEO-Eerst hierboven en
§ Analytics & Groei Feedbacklus tot een toetsbare pre-flight-checklist per tool en een vaste
GA4/GSC-terugkoppelingslus. Groei komt uitsluitend uit organische ranking — geen advertentiebudget
voor eigen promotie (zie § Core Regel: SEO-Eerst).

1. **SEO-regels per tool (verplichte pre-flight check, vóór een tool als "klaar" geldt):**
   - **Kernwoord vooraan:** de exacte Nederlandse zoekterm staat in `<title>`, `<h1>` én binnen de
     eerste 2 regels tekst (bijv. "kuub zand berekenen", "UBL factuur valideren").
   - **JSON-LD:** `<script type="application/ld+json">` met `@type: "WebApplication"`,
     `operatingSystem: "All"`, `applicationCategory: "UtilitiesApplication"` en
     `inLanguage: "nl"` (of de relevante taal voor die tool, zie § Taalkeuze per Doelgroep).
   - **E-E-A-T-uitleg + FAQ:** onder de rekenmodule staat altijd een compacte gids met
     berekeningsformules/vuistregels (inklinking, laagdikte) én een kort FAQ-blok — dit is de
     concrete invulling van § Kwaliteitseisen per tool, punt 1, en voorkomt een dunne-content-straf.
   - **Interne linkstructuur:** een link terug naar de hub (`/`) en, zodra er meer dan één tool
     live is, kruislinks naar verwante tools onderaan elke pagina.
2. **GA4 & Search Console-lus (geen zware context-dumps):**
   - **GA4-events (productie `G-TLWY630Z6D`, staging `G-4C5KX41VNB`):** `tool_calculate` zodra de
     rekenmodule een resultaat oplevert (gedebouncet — niet per toetsaanslag, dat verdrinkt het
     signaal) en `click_affiliate` op elke affiliate-knop.
   - **GSC-terugkoppeling:** wanneer Johan zoektermen uit Search Console meldt, past Claude direct
     de titel/meta-description van de betreffende tool aan op die exacte zoekvraag — geen volledige
     GSC-export in de context nodig, alleen de gemelde termen zelf (zie § Token & Context
     Discipline).

### 🔍 Dagelijkse Vergelijkings-Benchmark: Leren van de Top 5

**Vastgelegd 14 september 2026 — bindend.** Benchmark tegen de top 5 Nederlandse
vergelijkingssites (Tweakers, Kieskeurig, Independer, Gaslicht/Beslist) voor elke affiliate-/
vergelijkingstabel in de portfolio — concretiseert § PROTOCOL: SEO-Eerst hierboven, geen aparte
regelset.

1. **Wat we overnemen:**
   - **Subtiele disclosure (ACM-proof):** één strakke regel direct bij de vergelijkingstabel, geen
     kader/banner: `* Prijzen zijn indicatief. Bij bestelling via onze links ontvangen wij
     mogelijk een commissie, zonder extra kosten voor jou.`
   - **Tabel-architectuur:** compacte rijen, logo/winkelnaam, indicatieve prijs ("v.a."), directe
     deeplink-knop met `rel="sponsored nofollow"`.
   - **E-E-A-T-FAQ:** korte toelichting onder de tabel over berekeningsaannames en levering per
     regio (zie § Kwaliteitseisen per tool).
2. **Dagelijkse check (max 3 regels):** bij het ontwerpen van een nieuwe calculator, toets hoe de
   grote vergelijkers vergelijkbare producttabellen indelen; voorkom opdringerige advertentie-
   blokken — rust, redactionele onafhankelijkheid en direct gebruikersgemak wegen zwaarder dan
   conversie-tactieken.

---

Persoonlijke hub-/portfoliopagina van Johan, domein `johanlijffijt.dev` (Namecheap, geregistreerd
7 september 2026). Sinds 14 september 2026 (zie § Fundamentele Koerswijziging bovenaan) een
**Tools Hub**: een portfolio van gratis, snelle, betrouwbare online calculators en web-utilities.
Eerste tool: de Bouw- & Tuinmateriaal Calculator (`/tools/materiaal-calculator/`, staging-only
sinds 14 september 2026, zie `TODO.md`). Tumble (`~/projects/apps/tumble/`) staat on hold maar
blijft bereikbaar via de bestaande try-it-links; de browsergames-episode (Meteor Survivor, Neon
Drift, Gravity Flip, Marble Jam) is definitief beëindigd — productie draait op het moment van
schrijven nog op de oude game-arcade-homepage totdat Johan "GO voor productie" geeft voor de
nieuwe Tools Hub-homepage.

**Live sinds 7 september 2026:** https://johanlijffijt.dev (HTTP→HTTPS-redirect + geldig
Let's Encrypt-certificaat, geverifieerd via curl).

## Sessie-start-instructie (bindend)

Bij het starten van een nieuwe sessie op dit project: lees eerst `ROADMAP.md`, `TODO.md`,
`FEEDBACK.md` én `REGISTRATIONS.md` volledig door voor de laatste stand van zaken, vóórdat je
verder werkt, voorstellen doet of code aanpast. Vastgelegd op verzoek van Johan (12 september
2026) zodat elke sessie aansluit op waar de vorige is gebleven, in plaats van blind op deze
CLAUDE.md alleen te vertrouwen — dit bestand beschrijft bewuste keuzes en architectuur,
`ROADMAP.md`/`TODO.md` de actuele status en openstaande taken, `FEEDBACK.md` wat gebruikers zelf
aandragen, `REGISTRATIONS.md` op welke externe sites/diensten al een account bestaat (nooit gokken
of iets al geregistreerd is). Check bij `FEEDBACK.md` specifiek of er nieuwe, nog onbeoordeelde
inzendingen zijn die meegenomen moeten worden.

Kijk bij die sessie-start ook expliciet naar **organische vindbaarheid en SEO-metadata** — klopt
`sitemap.xml` nog met de live pagina's, zijn titel/description/JSON-LD actueel als er een tool
bijkomt of wijzigt, staat er geen dode/verouderde structured data. SEO is een terugkerend
aandachtspunt, geen eenmalige toevoeging.

## Bewuste keuzes

- **Geen relatie met `solo-stack-blog`** (`~/projects/solo-stack-blog/`): die blog gebruikt
  bewust een pseudonieme auteurspersona (voornaam "Johan", geen achternaam) om niet de volledige
  identiteit te koppelen aan affiliate-content. Dit domein gebruikt wél de volledige naam — nooit
  naar elkaar laten linken of vermelden (bevestigd met Johan, 7 september 2026).
- **Statisch, geen framework/build-pipeline/CMS** — puur HTML/CSS/inline JS, past bij de kleine
  schaal (portfolio van losse tool-pagina's, geen contentvolume zoals solo-stack-blog). Dit gold
  al voor de site zelf en blijft nu ook expliciet de aanpak per tool (zie § Kwaliteitseisen per
  tool hierboven) — geen Vite/Phaser-achtige buildstap meer nodig zoals bij de oude games.
- **Geen Docker voor de site zelf.** Eerste opzet gebruikte een losse Caddy-container op poort
  80/443, maar dat botste met de al bestaande systeem-nginx op deze VPS — één publiek IP kan maar
  één proces op poort 80/443 hebben. Overgestapt op een nginx-vhost, exact hetzelfde patroon als
  `lazykeeper.com` al gebruikte (static root, geen proxy_pass nodig want geen backend). De losse
  feedback/click-tracking-backend (zie § Eigen backend hieronder) draait wél in Docker — dat
  conflict speelt daar niet, want die luistert op een intern poortje, niet op 80/443.

## Stack

- **Systeem-nginx** (niet in Docker) op de VPS serveert de site rechtstreeks als static files —
  zelfde nginx-installatie als mypaperhive.com/lazykeeper.com, aparte server-block.
- Config: `nginx/johanlijffijt.dev.conf` in deze repo, gesymlinkt naar
  `/etc/nginx/sites-available/` → `/etc/nginx/sites-enabled/`. **Certbot herschrijft dit bestand
  bij elke hernieuwing** (auto-renew staat aan) — wijzigingen aan de HTTPS-blokken komen dus van
  Certbot, niet handmatig aanpassen tenzij je weet wat je doet.
- `site/index.html` — de hub-pagina zelf (Tools Hub-versie, live sinds "GO voor productie" op
  14 september 2026), één bestand, inline CSS, licht thema.
- Elke tool leeft onder `site/tools/<tool-slug>/index.html` (productie) resp.
  `site-tools-staging/<tool-slug>/index.html` (staging) — zie § Staging-omgeving hieronder voor
  de nginx-routing.
- SSL: Let's Encrypt via `certbot --nginx`, cert vervalt 6 december 2026, auto-renew via
  Certbot's systemd-timer (zelfde mechanisme als de andere domeinen op deze VPS).

## Deployment

Geen CI/CD — dit draait al rechtstreeks op de VPS (`vps-8b79bc05`), want deze Claude Code-sessie
bleek al via Remote-SSH op de VPS zelf te draaien. Wijzigingen aan `site/index.html` en aan een
tool-pagina zijn dus direct live zodra het bestand op de juiste plek staat — geen build/kopieerstap
nodig (in tegenstelling tot de oude games, die via Vite/`npm run deploy` gingen). **Dit geldt niet
voor `nginx/johanlijffijt.dev.conf` zelf**: nginx leest zijn configbestand alleen opnieuw in bij
een expliciete `sudo nginx -t && sudo systemctl reload nginx`, er is geen watcher die dat
automatisch doet. Passwordless sudo hiervoor staat sinds 8 september 2026 in
`/etc/sudoers.d/johan-nginx` (beperkt tot precies `nginx -t` en `systemctl reload nginx`).

DNS bij Namecheap: A-records `@` en `www` → `51.68.189.167` (al gezet, 7 september 2026).

## Supabase-proxy (self-hosted, gedeeld met Tumble — nu grotendeels historisch)

Tumble's self-hosted Supabase-stack is gestopt (Tumble staat on hold). De reverse-proxy
`location /supabase/` in `nginx/johanlijffijt.dev.conf` staat nog, maar geeft nu een 502 — bewust
niet verwijderd, kost niets in stilstand en scheelt herbedraden als Tumble ooit weer wordt
opgepakt. De hub zelf gebruikt sinds 12 september 2026 zijn eigen lichtgewicht backend, zie
hieronder.

## Eigen backend: feedback + click-tracking (`api/`)

- **`api/server.js`** — geen framework, geen database-engine: puur Node's ingebouwde `http`-module,
  schrijft naar append-only NDJSON-bestanden (`api/data/feedback.ndjson`,
  `api/data/link_clicks.ndjson`). Twee endpoints: `POST /feedback` (message, optioneel email),
  `POST /track` (target, willekeurige string — geen whitelist, dus nieuwe `data-track`-waardes
  voor toekomstige tools/affiliate-knoppen werken direct zonder codewijziging aan de backend).
- **Draait als Docker-container** (`api/Dockerfile` + `api/docker-compose.yml`), `restart:
  unless-stopped` voor reboot-overleving zonder extra sudo. `user: "1001:1001"` (Johans host-
  UID:GID) in `api/docker-compose.yml` zorgt dat `api/data/*.ndjson` gewoon leesbaar is als
  `johan`, geen root-gedoe. Bij een eventuele nieuwe VPS/gebruiker moet dit UID:GID-paar wel
  kloppen (`id <gebruiker>` om te checken), anders faalt de container-write stil.
- **nginx:** `location /api/` proxyt naar `127.0.0.1:8787`, zowel op productie als op staging
  (zelfde backend/databestanden voor beide — bewust, voor deze schaal is een aparte
  staging-database premature infrastructuur).
- **Client-side:** elke pagina met een `data-track`-attribuut op een link/knop stuurt fire-and-
  forget een `POST /api/track` met `{ target: <de data-track-waarde> }`. Gebruik dit patroon ook
  voor affiliate-knoppen op tool-pagina's zodra die echte links krijgen.

## Technische SEO-fundering

- **`site/robots.txt`** + **`site/sitemap.xml`** — handgeschreven statisch bestand (geen
  generator), past bij de "geen build-pipeline"-keuze hierboven.
  **Onderhoudspunt:** dit bestand moet handmatig bijgewerkt worden zodra er een nieuwe tool/pagina
  naar **productie** gaat (zie Gouden Regel voor Deployment, punt 3) — geen automatische sync met
  `site/`'s mapstructuur, bewust simpel gehouden.
- **JSON-LD (`schema.org/WebApplication`)** op elke tool-pagina — velden: `applicationCategory:
  "UtilitiesApplication"`, `operatingSystem: "Any"`, `isAccessibleForFree: true`, `author` (Johan
  Lijffijt). Voeg dit toe in de bron van elke nieuwe tool, niet er later bij plakken.
- **Verificatie-placeholders** voor Google Search Console (`google-site-verification`) en Bing
  Webmaster Tools (`msvalidate.01`) als (deels al ingevulde) `<meta>`-tags in `site/index.html` —
  zie `TODO.md`/`REGISTRATIONS.md` voor de actuele status.

## Google Analytics (GA4)

Op verzoek van Johan, aanvullend op Search Console (die laat zien hoe Google de site *indexeert*;
GA4 laat zien wat echte bezoekers *doen*).

- **Twee losse properties, dynamisch gekozen op hostname**: het `<head>`-script leest
  `window.location.hostname` en bepaalt daarmee welke measurement ID geladen wordt, of geen enkele.
  * `johanlijffijt.dev` (exact) → `G-TLWY630Z6D` (productie, property-ID 553925648).
  * elke hostname die `staging` bevat → `G-4C5KX41VNB` (staging, property-ID 553963991),
    met `debug_mode: true` zodat runs meteen zichtbaar zijn in GA4's DebugView.
  * `localhost`/`127.0.0.1`/leeg (o.a. elke headless-test) → er wordt zelfs het
    `gtag.js`-libraryscript niet geladen, geen dataLayer, geen netwerkrequest.
- **Waar het snippet staat:** `site/index.html`, `site-staging/index.html`,
  `site/feedback/index.html` / `site-feedback-staging/index.html`, en in elke tool-pagina onder
  `site/tools/...` / `site-tools-staging/...`.
- **Events, via `data-track` + `/api/track`** (zie § Eigen backend hierboven) voor kliks, en
  losse `gtag('event', ...)`-calls waar een tool een concreet gebruiksmoment heeft (bijv. een
  eerste succesvolle berekening) — voeg dit toe per tool zodra er reden is om te meten wélk
  gebruiksmoment converteert naar een affiliate-klik.

## Staging-omgeving

DNS-record voor `staging.johanlijffijt.dev` → `51.68.189.167` stond al live (door Johan gezet).
Server-block in `nginx/johanlijffijt.dev.conf`:

- **Deelt de `root`** met productie (zelfde `site/`-map) voor `robots.txt`, `sitemap.xml`,
  `images/` etc. — geen aparte kopie om uit sync te raken.
  **Uitzondering: elke pagina die per omgeving kan verschillen, niet.** Op Johans expliciete
  verzoek ("staging en productie moeten gescheiden zijn"), na een incident waarbij een
  staging-only kaart via de gedeelde `site/index.html` ook op productie verscheen, hebben de
  homepage (`site-staging/index.html`), `/feedback/` (`site-feedback-staging/`) en elke tool
  (`site-tools-staging/`) elk hun eigen staging-map — zie § Homepage volledig gescheiden verderop
  voor de volledige redenering en de nginx-valkuil die daarbij hoorde.
- **`location /tools/` en `location /feedback/` wijzen via `alias`** naar respectievelijk
  `site-tools-staging/` en `site-feedback-staging/` (gevuld door daar direct het bestand te
  plaatsen/bewerken — geen build-stap, zie § Kwaliteitseisen per tool hierboven). Zelfde precedent
  als de oude `/game/`-alias, nu toegepast op tools en feedback: dit is het stuk dat je hier wil
  testen vóór het naar productie (`site/tools/...`, `site/feedback/...`) gaat. Bewust **geen**
  lang-cachebare `Cache-Control`-headers op staging — bij snel itereren wil je dat elke wijziging
  meteen zichtbaar is.
- **`/api/` proxy ook op staging** (zelfde backend, `127.0.0.1:8787`) — nodig omdat de homepage,
  `/feedback/` en elke tool die aanroepen; test-inzendingen vanaf staging komen dus in dezelfde
  `api/data/*.ndjson` terecht als productie. Geen aparte staging-database — bewust, voor een
  project van deze schaal is dat premature infrastructuur.
- **HTTPS actief** — geldig cert t/m 11 december 2026, geverifieerd via curl (200 op homepage/
  `/tools/...`, 301-redirect vanaf `http://`).
- **Workflow vanaf nu:** elke nieuwe/gewijzigde tool eerst op `staging.johanlijffijt.dev` bouwen en
  testen, pas daarna (na expliciete "GO") naar `site/tools/...` (productie) kopiëren.

**Afwijking van het oorspronkelijke verzoek:** Johan vroeg ooit om `/var/www/...`-paden voor zowel
staging als productie — die bestaan niet in dit project (de site draait vanaf
`~/projects/johanlijffijt-dev/site`, zie boven). Productiepad bewust ongewijzigd gelaten i.p.v.
blind een niet-bestaand pad te gebruiken en zo de live site te breken.

## Staging-banner

Op verzoek van Johan: een amber waarschuwingsbalk bovenaan elke staging-pagina die duidelijk maakt
dat je op staging zit. Sinds alle per-omgeving-verschillende pagina's (homepage, `/feedback/`,
elke tool) een eigen fysiek gescheiden staging-bestand hebben (zie § Homepage volledig gescheiden
hieronder), staat de banner **onvoorwaardelijk** in dat staging-bestand — het wordt toch nooit op
productie geserveerd, dus een hostname-check is niet nodig. Dit verving eerder (vóór
14 september 2026) een **client-side hostname-detectie**
(`window.location.hostname.includes('staging')`) op `site/feedback/index.html`, van toen dat
bestand nog gedeeld was tussen staging en productie — dat patroon is niet meer nodig nu er een
aparte `site-feedback-staging/index.html` bestaat, maar de fail-safe-gedachte erachter (banner
verborgen tenzij een check expliciet slaagt) blijft het uitgangspunt voor elk shared bestand dat
ooit nog overblijft (`robots.txt`, `sitemap.xml`, `images/`).

## Homepage volledig gescheiden van productie

**Aanleiding:** een staging-only kaart verscheen via de gedeelde `site/index.html` ook op
productie. Johan wilde dit expliciet niet: **"staging en productie moeten gescheiden zijn"** — hij
moet op staging vrij kunnen experimenteren zonder risico dat iets per ongeluk op productie
terechtkomt, ook niet via een client-side toggle die in theorie feilloos hoort te zijn.

**Oplossing:** `site/index.html` (productie) en `site-staging/index.html` (staging) zijn
**volledig losse bestanden**, geen gedeelde brontekst voor de homepage. Hetzelfde patroon is later
(14 september 2026) doorgetrokken naar `/feedback/` (`site/feedback/` vs.
`site-feedback-staging/`) nadat bleek dat een thema-wijziging daar anders ook meteen op productie
had gestaan — zie § Staging-omgeving hierboven voor de huidige, volledige lijst van gescheiden
paden. Alleen `robots.txt`, `sitemap.xml`, `images/` etc. blijven gedeeld via de root — bestanden
die niet per omgeving verschillen, dus geen risico opleveren.

- **`site-staging/index.html`** heeft `<meta name="robots" content="noindex, nofollow">` —
  voorkomt dat Google deze pagina als duplicate content van de productie-homepage indexeert.
- **nginx-valkuil, niet triviaal:** een `location = /` met daarin direct `alias
  .../site-staging/index.html;` gaf een **500**; de voor de hand liggende "fix" (`root
  .../site-staging;` in diezelfde exacte-match-location) compileerde wél, maar **serveerde
  stilzwijgend gewoon de oude productie-homepage terug** (geen foutmelding) — een bekende
  nginx-valkuil rond hoe `root`/`alias` en de `index`-directive samen resolven bij een exacte
  match op de kale `/`-URI. **Werkende oplossing:** `location = / { try_files
  /nonexistent-marker @staging_home; }` met een named location `@staging_home` die `root` (niet
  `alias`, dat mag niet in een named location) + een expliciet volledig `try_files`-pad gebruikt.
  Herhaaldelijk geverifieerd met curl na elke wijziging, niet één keer aangenomen.
- Dezelfde scheidingstechniek (aparte staging-map + nginx `alias`, geen gedeeld bestand) is
  hergebruikt voor `/tools/` en, sinds een thema-wijziging daar anders ook meteen op productie
  had gestaan, ook voor `/feedback/` — zie § Staging-omgeving hierboven.

## Nog open

- **Materiaal Calculator staat live op productie** (`/tools/materiaal-calculator/`, sinds
  "GO voor productie" op 14 september 2026) — affiliate-links zijn nog inerte doorverwijs-knoppen
  zonder bedrag totdat er een echt partnerprogramma + live prijsfeed is (zie § Core Regel:
  Monetisatie, punt 4).
- Productie-`/feedback/` (`site/feedback/index.html`) toont nog de oude Engelstalige
  game-arcade-versie — de "GO voor productie" van 14 september 2026 gold expliciet alleen voor de
  homepage + materiaalcalculator, niet voor `/feedback/`. De nieuwe Tools Hub-versie staat al
  klaar op staging (`site-feedback-staging/`), wacht nog op een eigen GO.

## Opgelost

- Eerste commit + push naar `github.com/Johan1974/johanlijffijt.dev` (12 september 2026).
- `lazykeeper.com.conf` — orphaned nginx-bestand verwijderd (8 september 2026).
- De volledige browsergames-episode (Meteor Survivor, Neon Drift, Gravity Flip, Marble Jam) is
  afgesloten (14 september 2026) — voor implementatiedetails, zie de git-historie van dit bestand
  vóór 14 september 2026.
