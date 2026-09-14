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
| TradeTracker | Affiliate-netwerk voor Gamma & Karwei | ⏳ Aanmelden door Johan | **[ACTIE JOHAN]** registreren met `play@johanlijffijt.dev` (zie `CLAUDE.md` § Gouden Regel: registraties) |
| Daisycon | Affiliate-netwerk, alternatief/aanvullend | ⏳ Aanmelden door Johan | **[ACTIE JOHAN]** idem, zodra relevant voor een retailer buiten TradeTracker |
| Gamma (merchant via TradeTracker) | Affiliate-deeplinks materiaalcalculator + bestratingcalculator | ⏳ Wacht op TradeTracker-account | Na TradeTracker-account: merchant-aanvraag indienen |
| Karwei (merchant via TradeTracker) | Affiliate-deeplinks materiaalcalculator + bestratingcalculator | ⏳ Wacht op TradeTracker-account | Na TradeTracker-account: merchant-aanvraag indienen |
| Gespecialiseerde webshop (nog te bepalen) | Derde affiliate-partner op de retailer-vergelijkingskaart | ⏳ Nog geen kandidaat gekozen | Onderzoeken welke specialist-webshop (materiaal/bestrating) een eigen affiliate-programma heeft |

## API & data feeds

| Feed | Doel | Status | Actie |
|---|---|---|---|
| TradeTracker-productfeed (XML/CSV) | Fase B — automatische nachtelijke sync naar `api/data/prices.json` (zie `ROADMAP.md` § Universele Dynamische Prijsvergelijker) | ⏳ Wacht op TradeTracker-account + merchant-goedkeuring | Zie `TODO.md` § Backlog — Fase B-cronjob |
| Energieprijzen-API (dynamische tarieven) | Tool 4 — Thuisbatterij & Terugverdientijd Calculator | ⏳ Nog geen bron gekozen | Onderzoeken bij start van de Tool 4-bouwsessie (bijv. ENTSO-E, een day-ahead-prijzen-API, of een vaste vuistregel als lean-start-alternatief) |
| Stripe (billing) | Tool 5 — UBL Validator, freemium-laag (Fase 2) | ⏳ Nog niet aangevraagd | **[ACTIE JOHAN]**, pas relevant bij Tool 5 Fase 2 — niet nu al aanvragen |

## Actielijst — commerciële showstoppers

- [ ] **[ACTIE JOHAN]** TradeTracker-account aanmaken (`play@johanlijffijt.dev`) — blokkeert de
      affiliate-deeplinks én de Fase B-prijsfeed voor zowel Tool 1 als Tool 3.
- [ ] **[ACTIE JOHAN]** Daisycon-account aanmaken zodra er een retailer buiten TradeTracker bij
      komt.
- [ ] Kandidaat voor de "gespecialiseerde webshop"-affiliate-partner kiezen en diens
      affiliate-programma onderzoeken — nog volledig open.
- [ ] Energieprijzen-API-bron kiezen vóórdat Tool 4 daadwerkelijk gebouwd wordt (zie
      `ROADMAP.md` § Tijdsplanning & Mijlpalen).
- [ ] Stripe-account: bewust pas bij Tool 5 Fase 2, niet vooruit aanvragen zonder aanleiding.
