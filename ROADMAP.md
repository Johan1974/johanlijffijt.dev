# Roadmap — johanlijffijt.dev

> Historische mijlpalen, eerdere iteratielogs en gearchiveerde projecten (games/Tumble) zijn
> verplaatst naar `ROADMAP.his`.

Bindende regels: zie `CLAUDE.md`. Dit document = wat gebouwd wordt, in welke volgorde.

## Status — 5 Tools + Feedback

| # | Tool | Status |
|---|---|---|
| 1 | Materiaal Calculator | Live productie |
| 2 | Beton & Mortel Calculator | Live staging — klaar voor Johans review/GO |
| 3 | Bestrating & Egaline Calculator | Live staging — klaar voor Johans review/GO |
| 4 | UBL/Peppol Factuur Validator | Backlog (B2B, €9/mnd) |
| 5 | CAMT.053/MT940 Bankexport Converter | Backlog (B2B, zelfde abonnement) |
| — | Klusmand Multi-Store Optimizer | Concept, geblokkeerd tot Fase B |
| — | `/feedback/` | Nieuwe versie klaar op staging, wacht op eigen GO |

## Directe prioriteit

Tool 2 (Beton & Mortel Calculator) en Tool 3 (Bestrating & Egaline Calculator) staan **live op
staging**, `npm test` groen (16/16). Mengverhouding-aannames Tool 2 zijn vooraf met Johan
afgestemd (zakken 12,5L/25kg, zelf mengen 1:2:3, mortel 100 stenen/m² + 1:4 cement:zand — zie
onderbouwing op de toolpagina zelf). Enige volgende stap: Johans inspectie + expliciete "GO voor
productie" voor beide.

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
| 4. UBL Validator (Fase 1, gratis) | 3-4 | geen |
| 4b. UBL Stripe/freemium | +3-5 | [ACTIE JOHAN] Stripe-account |
| 5. MT940/CAMT.053 Converter | ~3 | geen |
| Klusmand Optimizer | 4-5 | Fase B (live prijsfeed) vereist |

Bouwvolgorde: **Tool 2/3 (staging, wachten op GO) → Tool 4 (UBL Fase 1) → Tool 5 (MT940) →
Klusmand Optimizer**.

## Domeinmigratie (optioneel, post-validatie)

Pas overwegen bij >€250-500/mnd bewezen omzet. Dan: 301-redirect + GSC-adreswijziging. Volledige
overwegingen: `ROADMAP.his`.
