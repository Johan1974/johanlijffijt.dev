# Todo — dagelijks bijwerken

Geschiedenis/achtergrond: zie `ROADMAP.md` (actief) en `ROADMAP.his` (archief). Hieronder alleen
actuele status + openstaande acties.

## Status

- Tool 1 (Materiaal Calculator): live productie.
- Tool 2 (Beton & Mortel Calculator): live staging, 6/6 tests groen, klaar voor Johans review/GO.
- Tool 3 (Bestrating & Egaline Calculator): live staging (5/5 tests groen, curl-geverifieerd),
  klaar voor Johans review/GO.
- Kwaliteitspoort (`scripts/verify-site.js` + lychee CI + pre-commit hook): actief, `npm test`
  groen (16/16).

## [ACTIE JOHAN]

- [ ] TradeTracker: aanmelding verstuurd (14-09-2026), wacht op activatiemail + accountgoedkeuring
      (kan dagen duren). Na goedkeuring: verificatiecode op site plaatsen (eigenaarschapsbewijs),
      dan pas Gamma/Karwei-merchantaanvragen indienen.
- [ ] Daisycon-registratie zodra relevant voor een andere retailer.
- [ ] Stripe-account voor UBL-validator freemium (Tool 4, Fase 2) — niet nu blokkerend.
- [ ] Heroverwegen Search Console/Bing-resubmit voor de nieuwe homepage-copy.
- [ ] Review + "GO voor productie" voor Tool 2 (Beton & Mortel) en Tool 3 (Bestrating & Egaline),
      beide op staging.

## Actief — Mijlpaal 1

- [ ] Affiliate-deeplinks live zetten zodra TradeTracker rond is.
- [ ] Live prijsfeed-cronjob (Fase B) bouwen zodra merchant-approval binnen is.
- [ ] UBL-validator scaffolden op staging (`site-tools-staging/ubl-validator/`).
- [ ] AdSense aanvragen zodra GSC 100 dagelijkse bezoekers toont.
- [ ] Kleine copy-fix: laagdikte-uitleg materiaalcalculator concreter per toepassing.

## Backlog (Mijlpaal 2/3)

- [ ] Tool 5: CAMT.053/MT940 Converter.
- [ ] Lead capture (checklists i.r.v. e-mailadres).
- [ ] Klusmand Multi-Store Optimizer — wacht op Fase B.
- [ ] B2B teamlicenties/REST API, leveranciersponsoring, DE/EN-vertaling.
- [ ] Domeinmigratie-evaluatie (pas bij €250+/mnd omzet).

## On hold

- Tumble en de oude game-projecten: zie `ROADMAP.his` voor volledige status — nog geen besluit
  over commit/archiveren/verwijderen van de broncode buiten dit repo.
