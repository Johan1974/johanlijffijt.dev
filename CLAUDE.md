# CLAUDE.md — johanlijffijt.dev

**Scope:** Tools Hub — portfolio van gratis, snelle, betrouwbare calculators/web-utilities.
Browsergames-episode definitief afgesloten (14-09-2026); volledige geschiedenis staat in de
git-historie van dit bestand vóór die datum, stuurt het werk niet meer aan.

## Harde regels (bindend)

1. **Deployment — staging eerst.** Elke wijziging eerst op `staging.johanlijffijt.dev`. Nooit
   `site/` (productie) aanraken zonder expliciete "GO" van Johan in de chat. Nieuwe
   productie-URL → in dezelfde stap `site/sitemap.xml` bijwerken + heroverwegen
   Search Console/Bing-resubmit (zie `REGISTRATIONS.md`).
2. **SEO-eerst, elke tekst voor dit project.** Kernwoorden vooraan (titel + openingszin),
   link terug naar de tool, beschrijvende alt-teksten, precies 1 H1/pagina met logische
   H1/H2-structuur, geen keyword-stuffing. Groei is 100% organisch — nooit betaald verkeer
   voorstellen.
3. **Monetisatie.**
   - Affiliate: nooit een echte/live link verzinnen. Placeholder ("binnenkort — affiliate-link
     volgt") tot Johan een echte link/tracking-ID aanlevert.
   - Vergelijkers: **nooit** een handmatig geschat of ingevoerd eurobedrag tonen, ook niet
     "indicatief" gelabeld (een eerdere schatting zat 40% naast de echte prijs). Uitsluitend
     doorverwijs-knoppen zonder bedrag tot een live prijsfeed draait (ROADMAP.md, Fase B).
   - AdSense altijd buiten de invoer/resultaat-flow van een calculator.
   - Geen dark patterns (nep-countdowns, misleidende knoppen, verwarrende cookiebanners).
4. **Taalkeuze per tool**, niet vast: NL voor NL-marktvraag (bijv. materiaalcalculator), EN
   voor evident internationale tools. Communicatie met Johan + documentatie (`CLAUDE.md`,
   `ROADMAP.md`, `TODO.md`) altijd Nederlands. Code/comments Engels.
5. **Registraties:** elke nieuwe externe registratie (AdSense, affiliate-netwerken, Search
   Console/Bing, overig) uitsluitend met `play@johanlijffijt.dev`. Bestaande registraties van
   vóór dit besluit (GitHub `Johan1974`, itch.io) blijven ongewijzigd. Zie `REGISTRATIONS.md`.
6. **Kwaliteitseisen per tool:**
   - Rekenkundig correct; formule/aannames zichtbaar uitgelegd op de pagina (E-E-A-T).
   - Instant herberekenen via JS-events, geen submit-knop nodig.
   - Mobiel: 44×44px touch-targets, labels/eenheden altijd zichtbaar (geen placeholder-only).
   - Eerlijke disclaimers, geen overclaiming.
   - Eén zelfstandig HTML-bestand, inline CSS/JS, geen build-pipeline — bewerken in de juiste
     staging/productie-map ís de deploy-stap.
   - JSON-LD (`WebApplication`, `UtilitiesApplication`, `isAccessibleForFree: true`,
     `inLanguage`) in de bron van elke nieuwe tool.
7. **Proactief mandaat.** Claude opereert als technisch/commercieel partner, niet puur
   reactief: meldt eenvoudigere/robuustere routes vóór er code geschreven wordt, signaleert
   kansrijke tool-niches (deterministisch, hoog SEO-zoekvolume, affiliate/micro-SaaS-potentieel),
   geeft na elke deeltaak minimaal 1 concrete optimalisatietip, en zet elke externe blokkerende
   actie (registraties, DNS, credentials, review-verzoek) direct in `TODO.md` onder
   `[ACTIE JOHAN]` — vóórdat het werk daarop strandt, niet achteraf.
8. **Kwaliteitspoort dode links.** `npm test` (`scripts/verify-site.js` + lychee-CI in
   `.github/workflows/lint-and-links.yml`) moet slagen vóór elke wijziging aan `site/` of
   `site-staging/`. Lokale `.git/hooks/pre-commit` draait dit al (niet versiebeheerd, overleeft
   geen verse clone).
9. **Token- & Context-Discipline:**
   - Geen subagents voor werk dat lineair in de hoofdthread kan.
   - Gericht lezen — geen hele mappen/logs dumpen in context.
   - Compacte, feitelijke communicatie; diffs met minimale contextregels.
   - Na elke succesvolle commit/deeltaak: herinner Johan expliciet aan `/clear`.
   - **📁 Zelfstandig documentatie-onderhoud:** Claude houdt `ROADMAP.md` en `TODO.md` strikt
     compact. Zodra een deeltaak is afgerond, worden debug-details en achtergrondgesprekken
     direct verwijderd in plaats van opgestapeld. Documenten blijven beknopt en functioneel om
     onnodig tokenverbruik bij sessie-starts te voorkomen.
10. **Sessie-start.** Lees uitsluitend `ROADMAP.md`, `TODO.md` en `INTEGRATIONS.md` volledig
    (`ROADMAP.his` is bewust uitgesloten van de opstart-routine — koud archief, alleen lezen op
    expliciet verzoek). Check sitemap/SEO-metadata nog actueel. Bij een status-/roadmap-vraag:
    rapporteer eerst (1) suite-status live/staging/backlog, (2) Claude's technische taak deze
    sessie, (3) `[ACTIE JOHAN]`-items + commerciële showstoppers uit `INTEGRATIONS.md` — wacht
    op akkoord vóór er gecodeerd wordt.
11. **GA4-events per tool:** `tool_calculate` (gedebounced, niet per toetsaanslag),
    `click_affiliate` op elke affiliate-knop.

## Architectuur

- Statisch, geen framework/build/CMS. Systeem-nginx (niet Docker) serveert `site/` direct
  (zelfde patroon als mypaperhive.com/lazykeeper.com).
- Config `nginx/johanlijffijt.dev.conf`, gesymlinkt naar `sites-available/` →
  `sites-enabled/`. **Certbot herschrijft de HTTPS-blokken bij elke renewal** — niet handmatig
  aanpassen tenzij bewust. Reload: `sudo nginx -t && sudo systemctl reload nginx`
  (passwordless sudo beperkt tot die twee commando's, `/etc/sudoers.d/johan-nginx`).
- Site-structuur: `site/index.html` (hub), `site/tools/<slug>/index.html`,
  `site/feedback/index.html` — productie. Staging: **volledig gescheiden bestanden**
  (`site-staging/`, `site-tools-staging/`, `site-feedback-staging/`), geen gedeelde brontekst
  voor pagina's die per omgeving kunnen verschillen (incident: staging-only content lekte ooit
  via een gedeeld bestand naar productie). Gedeeld via root (geen staging-kopie nodig):
  `robots.txt`, `sitemap.xml`, `images/`.
  - nginx-valkuil: `location = /` + `alias` naar het staging-bestand gaf een 500; `root` in
    diezelfde exact-match-location compileerde maar serveerde stilzwijgend de
    productie-homepage terug. Werkende vorm: `location = / { try_files /nonexistent-marker
    @staging_home; }` met een named location die `root` + volledig `try_files`-pad gebruikt.
  - `site-staging/index.html` heeft `noindex, nofollow` (duplicate-content-preventie).
  - Staging-banner staat onvoorwaardelijk in elk staging-bestand (wordt toch nooit op
    productie geserveerd).
- Backend `api/`: pure Node `http`-module, append-only NDJSON (`api/data/feedback.ndjson`,
  `link_clicks.ndjson`). Endpoints `POST /feedback`, `POST /track` (vrije `target`-string, geen
  whitelist nodig voor nieuwe tools/knoppen). Docker-container, `user 1001:1001` (moet matchen
  met host-UID bij een nieuwe VPS/gebruiker), `restart: unless-stopped`. nginx `/api/` proxyt →
  `127.0.0.1:8787`, zelfde backend/databestanden op staging én productie (bewust geen aparte
  staging-DB, premature infra op deze schaal).
- SSL: Let's Encrypt via `certbot --nginx`, auto-renew via systemd-timer.
- GA4, hostname-gestuurd (`<head>`-script leest `window.location.hostname`): productie
  `G-TLWY630Z6D`, elke hostname met "staging" → `G-4C5KX41VNB` (`debug_mode: true`),
  localhost/leeg → geen script geladen.
- DNS (Namecheap): A-records `@`, `www`, `staging` → `51.68.189.167`.
- `/supabase/` reverse-proxy in nginx-config staat nog (502, hoort bij Tumble's gestopte
  self-hosted Supabase) — bewust niet verwijderd, kost niets stil.

## Bewuste keuzes

- Geen relatie met `solo-stack-blog` (`~/projects/solo-stack-blog/`) — aparte persona, nooit
  naar elkaar linken/vermelden.
- Geen Docker voor de site zelf (poort 80/443-conflict met systeem-nginx); de API-backend
  draait wél in Docker (intern poortje, geen conflict).

## Nog open

- Materiaal Calculator live op productie (`/tools/materiaal-calculator/`); affiliate-knoppen
  nog inerte doorverwijzers zonder partnerlink.
- Productie-`/feedback/` toont nog de oude game-arcade-versie — nieuwe Tools Hub-versie staat
  klaar op staging (`site-feedback-staging/`), wacht op eigen GO.

## Opgelost

- Eerste commit/push naar GitHub (12-09-2026).
- `lazykeeper.com.conf` orphaned bestand verwijderd (08-09-2026).
- Browsergames-episode afgesloten + web-facing sporen opgeruimd (14-09-2026) — details in
  git-historie vóór die datum.
