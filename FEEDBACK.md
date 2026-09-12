# Feedback — spelerfeedback, suggesties en bugreports

Levende log van wat er binnenkomt via `/feedback/` (zie CLAUDE.md § Eigen backend — géén Supabase
meer, een eigen klein backend dat wegschrijft naar `api/data/feedback.ndjson`). Dit bestand is de
brug tussen ruwe inzendingen en de Dagelijkse Game Optimization Loop: nieuwe feedback wordt hier
eerst gelogd en beoordeeld, en pas als het een concrete taak wordt, verhuist het naar `TODO.md`.

Bijwerken: zie § Hoe nieuwe inzendingen ophalen onderaan voor het commando dat nieuwe berichten
uit `api/data/feedback.ndjson` toont.

**Instructie (vastgelegd 12 september 2026, na een gemiste inzending):** als Johan vraagt om "de
feedback te verwerken" (of vergelijkbaar), controleer dan altijd eerst `api/data/feedback.ndjson`
zelf — dit bestand kan achterlopen, want het is geen live-sync maar een handmatig getriageerd
overzicht. Reden: op 12 september 2026 stond een inzending al in `feedback.ndjson` maar nog niet
hier, waardoor Johan dacht dat de inzending niet was aangekomen.

---

## Ruwe Feedback / Inzendingen

### 2026-09-12 — Suggestie (uit de app, via `/feedback/`)
> Nieuw game idee

(e-mail opgegeven: johan@gmail.com)

<!-- Formaat voor een nieuwe inzending:
### YYYY-MM-DD — Categorie (Bug / Suggestie / Compliment / Anders)
> Letterlijke quote uit het bericht.

(eventueel: e-mail indien opgegeven, voor eventuele follow-up)
-->

---

## Claude's Beoordeling & Haalbaarheid

### Bij "Nieuw game idee" (2026-09-12)
**Beoordeling:** Niet te beoordelen zoals ingediend.
**Waarom:** het bericht bevat alleen de titel/aanleiding, geen omschrijving van wát het idee
inhoudt — geen genre, mechaniek of vergelijkbaar spel genoemd. Kan dus nog niet ingeschat worden
als quick win/grote feature/niet-passend. Actie: navragen wat het idee precies is (e-mail is
opgegeven) vóórdat dit een taak in `TODO.md` wordt.

<!-- Formaat voor een beoordeling, direct onder de bijbehorende inzending hierboven:
**Beoordeling:** Quick win / Grote feature / Niet passend bij arcade-scope
**Waarom:** korte onderbouwing — hoort dit bij singleplayer-arcade-scope (zie ROADMAP.md § Scope),
past het bij de huidige game-juice-richting, hoeveel werk is het ongeveer.
-->

---

## Actieve Taken

Items die vanuit hier zijn overgeheveld naar `TODO.md` — hier alleen een verwijzing, niet
dubbel bijhouden:

*Nog geen items overgeheveld.*

---

## Afgerond / Geïmplementeerd

*Nog niets afgerond vanuit spelerfeedback.*

---

## Hoe nieuwe inzendingen ophalen

Geen Supabase meer onder de motorkap — de data staat gewoon als NDJSON op de VPS zelf, sinds de
`docker-compose.yml`-fix van 12 september 2026 leesbaar als je eigen gebruiker (`user: "1001:1001"`
in `api/docker-compose.yml`, geen `docker exec`/root meer nodig):

```bash
# Alle inzendingen, netjes geformatteerd (jq zit al op de VPS)
cat ~/projects/johanlijffijt-dev/api/data/feedback.ndjson | jq .

# Alleen nieuw sinds de laatste keer dat je keek: bewaar hoeveel regels er waren,
# en toon bij de volgende check alleen de regels erna.
wc -l < ~/projects/johanlijffijt-dev/api/data/feedback.ndjson  # noteer dit getal

# Voorbeeld: als er vorige keer 3 regels waren, toon nu alles vanaf regel 4:
tail -n +4 ~/projects/johanlijffijt-dev/api/data/feedback.ndjson | jq .
```

Sessie-start-instructie in `CLAUDE.md` leest dit bestand (`FEEDBACK.md`) inmiddels standaard mee —
nieuwe inzendingen hoeven dus niet apart aangekaart te worden, dat gebeurt vanzelf bij de volgende
sessie/dagelijkse review.
