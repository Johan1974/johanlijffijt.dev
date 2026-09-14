# Todo — dagelijks bijwerken

Geschiedenis/achtergrond: zie `ROADMAP.md` (actief) en `ROADMAP.his` (archief). Hieronder alleen
actuele status + openstaande acties.

## Status

- Tool 1 (Materiaal Calculator): live productie.
- Tool 2 (Beton & Mortel Calculator): live productie sinds 14-09-2026 (GO), 6/6 tests groen.
- Tool 3 (Bestrating & Egaline Calculator): live productie sinds 14-09-2026 (GO), 5/5 tests groen.
- Tool 4 (UBL/Peppol Invoice Validator, Engelstalig, Fase 1): live productie sinds 14-09-2026
  (GO), 7/7 tests groen.
- Kwaliteitspoort (`scripts/verify-site.js` + lychee CI + pre-commit hook): actief, `npm test`
  groen (23/23).

## [ACTIE JOHAN]

- [ ] TradeTracker: aanmelding verstuurd (14-09-2026), wacht op activatiemail + accountgoedkeuring
      (kan dagen duren). Na goedkeuring: verificatiecode op site plaatsen (eigenaarschapsbewijs),
      dan pas Gamma/Karwei-merchantaanvragen indienen.
- [ ] Daisycon: publisher-account geverifieerd (privé, plan Basic), media wacht op goedkeuring
      door Daisycon zelf (kan dagen duren, geen actie nodig). Na goedkeuring: kandidaat kiezen
      voor "gespecialiseerde webshop"-merchant en aanvraag indienen.
- [ ] Stripe-account voor UBL-validator freemium (Tool 4, Fase 2) — niet nu blokkerend.
- [ ] Search Console/Bing-resubmit heroverwegen: nieuwe homepage-copy + 3 nieuwe productie-URL's
      (Tool 2, 3, 4, sitemap.xml al bijgewerkt).

## Actief — Mijlpaal 1

- [ ] Affiliate-deeplinks live zetten zodra TradeTracker rond is.
- [ ] Live prijsfeed-cronjob (Fase B) bouwen zodra merchant-approval binnen is.
- [ ] AdSense aanvragen zodra GSC 100 dagelijkse bezoekers toont.
- [ ] Kleine copy-fix: laagdikte-uitleg materiaalcalculator concreter per toepassing.

## Backlog (Mijlpaal 2/3)

- [ ] Tool 5: CAMT.053/MT940 Converter.
- [ ] Lead capture (checklists i.r.v. e-mailadres).
- [ ] Klusmand Multi-Store Optimizer — wacht op Fase B.
- [ ] B2B teamlicenties/REST API, leveranciersponsoring, DE/EN-vertaling.
- [ ] Domeinmigratie-evaluatie (pas bij €250+/mnd omzet).
