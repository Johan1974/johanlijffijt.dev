# Todo — dagelijks bijwerken

Geschiedenis/achtergrond: zie `ROADMAP.md` (actief) en `ROADMAP.his` (archief). Hieronder alleen
actuele status + openstaande acties.

## Status

- Tool 1 (Materiaal Calculator): live productie.
- Tool 2 (Bestrating & Egaline Calculator): live staging, klaar voor review/GO.
- Kwaliteitspoort (`scripts/verify-site.js` + lychee CI + pre-commit hook): actief, `npm test`
  groen.

## [ACTIE JOHAN]

- [ ] TradeTracker-registratie (Gamma/Karwei affiliate) met `play@johanlijffijt.dev` — blokkeert
      affiliate-deeplinks + live prijsfeed.
- [ ] Daisycon-registratie zodra relevant voor een andere retailer.
- [ ] Stripe-account voor UBL-validator freemium (Tool 4, Fase 2) — niet nu blokkerend.
- [ ] Heroverwegen Search Console/Bing-resubmit voor de nieuwe homepage-copy.
- [ ] Review + "GO voor productie" voor Tool 2 (Bestrating & Egaline, staat op staging).

## Actief — Mijlpaal 1

- [ ] Affiliate-deeplinks live zetten zodra TradeTracker rond is.
- [ ] Live prijsfeed-cronjob (Fase B) bouwen zodra merchant-approval binnen is.
- [ ] UBL-validator scaffolden op staging (`site-tools-staging/ubl-validator/`).
- [ ] AdSense aanvragen zodra GSC 100 dagelijkse bezoekers toont.
- [ ] Kleine copy-fix: laagdikte-uitleg materiaalcalculator concreter per toepassing.

## Backlog (Mijlpaal 2/3)

- [ ] Tool 3: Beton- & Mortel Calculator.
- [ ] Tool 5: CAMT.053/MT940 Converter.
- [ ] Lead capture (checklists i.r.v. e-mailadres).
- [ ] Klusmand Multi-Store Optimizer — wacht op Fase B.
- [ ] B2B teamlicenties/REST API, leveranciersponsoring, DE/EN-vertaling.
- [ ] Domeinmigratie-evaluatie (pas bij €250+/mnd omzet).

## On hold

- Tumble en de oude game-projecten: zie `ROADMAP.his` voor volledige status — nog geen besluit
  over commit/archiveren/verwijderen van de broncode buiten dit repo.
