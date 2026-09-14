# Integrations — affiliate, API-feeds & commerciële status

Bijhouden welke affiliate-netwerken, merchant-aanvragen en data-feeds nodig zijn om de
monetisatie uit `ROADMAP.md` § Mijlpalen & Monetisatie daadwerkelijk te activeren. **Verschil met
`REGISTRATIONS.md`:** dat bestand houdt élke externe account bij (Namecheap, GitHub, Search
Console, enz.), dit bestand is specifiek de commerciële/integratie-laag — affiliate-netwerken,
merchant-status per retailer, en de API/data-feeds die tools nodig hebben. Bij een nieuwe
affiliate- of feed-registratie: hier bijwerken, niet alleen in `REGISTRATIONS.md`.

## Affiliate netwerken & merchants

| Netwerk/Merchant | Doel | Status | Actie |
|---|---|---|---|
| TradeTracker | Affiliate-netwerk voor Gamma & Karwei | ⏳ Aangemeld (14-09-2026), wacht op accountactivatie/-goedkeuring | Zodra goedgekeurd: verificatiecode op site plaatsen, daarna merchant-aanvragen Gamma/Karwei |
| Daisycon | Affiliate-netwerk, alternatief/aanvullend | ✅ Publisher-account geverifieerd (privé, Basic-plan) | **[ACTIE JOHAN]** kandidaat-merchant kiezen en aanvraag indienen |
| Gamma (merchant via TradeTracker) | Affiliate-deeplinks Tool 1 (Materiaal Calculator) + Tool 3 (Bestrating & Egaline Calculator) | ⏳ Wacht op TradeTracker-account | Na TradeTracker-account: merchant-aanvraag indienen |
| Karwei (merchant via TradeTracker) | Affiliate-deeplinks Tool 1 (Materiaal Calculator) + Tool 3 (Bestrating & Egaline Calculator) | ⏳ Wacht op TradeTracker-account | Na TradeTracker-account: merchant-aanvraag indienen |
| Gespecialiseerde webshop (nog te bepalen) | Derde affiliate-partner op de retailer-vergelijkingskaart | ⏳ Nog geen kandidaat gekozen | Onderzoeken welke specialist-webshop (materiaal/bestrating) een eigen affiliate-programma heeft |

## API & data feeds

| Feed | Doel | Status | Actie |
|---|---|---|---|
| TradeTracker-productfeed (XML/CSV) | Fase B — automatische nachtelijke sync naar `api/data/prices.json` voor Tool 1 + Tool 3 (zie `ROADMAP.md` § Prijsvergelijker) | ⏳ Wacht op TradeTracker-account + merchant-goedkeuring | Zie `TODO.md` § Backlog — Fase B-cronjob |
| Stripe (billing) | Tool 4 — UBL/Peppol Factuur Validator, freemium-laag (Fase 2) | ⏳ Nog niet aangevraagd | **[ACTIE JOHAN]**, pas relevant bij Tool 4 Fase 2 — niet nu al aanvragen |

## Actielijst — commerciële showstoppers

- [ ] TradeTracker-account: aanmelding verstuurd, wacht op activatiemail + goedkeuring — blokkeert
      nog steeds de affiliate-deeplinks én de Fase B-prijsfeed voor zowel Tool 1 als Tool 3.
- [ ] **[ACTIE JOHAN]** Daisycon: account geverifieerd, kandidaat kiezen voor de "gespecialiseerde
      webshop"-affiliate-partner en merchant-aanvraag indienen.
- [ ] Kandidaat voor de "gespecialiseerde webshop"-affiliate-partner kiezen en diens
      affiliate-programma onderzoeken — nog volledig open.
- [ ] Stripe-account: bewust pas bij Tool 4 Fase 2, niet vooruit aanvragen zonder aanleiding.
