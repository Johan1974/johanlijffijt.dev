# Roadmap — johanlijffijt.dev

> Historische mijlpalen, eerdere iteratielogs en gearchiveerde projecten (games/Tumble) zijn
> verplaatst naar `ROADMAP.his`.

Bindende regels: zie `CLAUDE.md`. Dit document = wat gebouwd wordt, in welke volgorde.

## Status — 5 Tools + Feedback

| # | Tool | Status |
|---|---|---|
| 1 | Materiaal Calculator | Live productie |
| 2 | Beton & Mortel Calculator | Live productie sinds 14-09-2026 (GO) |
| 3 | Bestrating & Egaline Calculator | Live productie sinds 14-09-2026 (GO) |
| 4 | UBL/Peppol Invoice Validator | Live productie sinds 14-09-2026 (GO) — Fase 1 (well-formed XML + UBL-root check), EN |
| 5 | CAMT.053/MT940 Bankexport Converter | Backlog (B2B, zelfde abonnement) |
| — | Klusmand Multi-Store Optimizer | Concept, geblokkeerd tot Fase B |
| — | `/feedback/` | Nieuwe versie klaar op staging, wacht op eigen GO |

## Directe prioriteit

Tool 2, 3 en 4 staan **live op productie** sinds 14-09-2026 (GO), `npm test` groen (23/23).
Mengverhouding-aannames Tool 2 zijn vooraf met Johan afgestemd (zakken 12,5L/25kg, zelf mengen
1:2:3, mortel 100 stenen/m² + 1:4 cement:zand — zie onderbouwing op de toolpagina zelf). Tool 4 is
bewust Engelstalig (internationale Peppol-standaard, EN-zoekvolume) en Fase 1 checkt alleen
well-formed XML + herkend UBL-root-element (Invoice/CreditNote) — geen BIS Billing 3.0-veldencheck,
staat expliciet zo op de pagina. Volgende stap: Daisycon-goedkeuring afwachten en TradeTracker-
accountactivatie afwachten (zie `TODO.md` § [ACTIE JOHAN]) voor de affiliate-deeplinks.

## Mijlpalen & omzetdoel

- **Mijlpaal 1 (€500/mnd):** Tool 1 live + affiliate-netwerken aangesloten + Tool 4 Fase 1 live.
- **Mijlpaal 2 (€1.500/mnd):** Tool 2/3/5 live + lead capture + Klusmand Optimizer (na Fase B).
- **Mijlpaal 3 (€3-5k/mnd):** B2B teamlicenties/API, leveranciersponsoring, DE/EN-vertaling.

## Prijsvergelijker — Fase A/B

- **Fase A (nu):** geen bedragen, alleen deeplinks ("Bekijk actuele prijzen bij X →"). Geldt
  voor elke vergelijker-tool.
- **Fase B (later):** cronjob → `api/data/prices.json` uit TradeTracker/Daisycon-feed. Pas dan
  bedragen tonen.

## Tijdsplanning (resterende tools, sessies = effectieve bouwtijd)

| Tool | Sessies | Blokkade |
|---|---|---|
| 4b. UBL Stripe/freemium (BIS Billing 3.0-veldencheck) | 3-5 | [ACTIE JOHAN] Stripe-account |
| 5. MT940/CAMT.053 Converter | ~3 | geen |
| Klusmand Optimizer | 4-5 | Fase B (live prijsfeed) vereist |

Bouwvolgorde: **Tool 2/3/4 (live productie) → Tool 5 (MT940) → Klusmand Optimizer**.

## Domeinmigratie (optioneel, post-validatie)

Pas overwegen bij >€250-500/mnd bewezen omzet. Dan: 301-redirect + GSC-adreswijziging. Volledige
overwegingen: `ROADMAP.his`.
