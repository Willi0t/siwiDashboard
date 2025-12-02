# SIWi Chat Viewer

En enkel dashboard som hjälper supportteamet att snabbt skumma igenom chattloggar från SIWi-exporter. Appen läser in en CSV-fil, filtrerar bort korta/irrelevanta sessioner och låter dig växla mellan nya och redan granskade konversationer.

## Funktioner
- **CSV-import** av sessioner med förväntade kolumner: `SessionId`, `StartDateTime(UTC)`, `Turns` (antal meddelanden), `SessionOutcome` och `ChatTranscript`.
- **Automatisk filtrering** på antal meddelanden (standard >3) och tomma transkript så att endast intressanta sessioner visas.
- **Två flikar** för att separera nya och granskade sessioner; statusindikator i toppbanner visar hur många som matchar filtret.
- **Snabbgranskning**: markera en session som granskad via toggle eller genom att trycka `Enter` när en ogranskad session är aktiv.
- **Detaljerad vy** med meddelanderäkning, outcome och fullständigt transkript för vald session.

## Kom igång
### Förutsättningar
- Node.js 20+ och npm.
- Git om du vill klona repo:t.

### Installation
```bash
# Klona projektet
git clone <repo-url>
cd siwiDashboard

# Installera beroenden
npm install
```

### Utvecklingsläge
```bash
npm run dev
```
Öppna sedan adressen som Vite visar (oftast http://localhost:5173).

### Ladda upp data
1. Exportera SIWi-sessioner till CSV med kolumnerna ovan.
2. Klicka på **Importera CSV** i toppen och välj filen.
3. Justera tröskeln för antal meddelanden om du vill se fler/färre sessioner.
4. Markera sessioner som granskade allt eftersom du arbetar dig igenom listan.

## Scripts
- `npm run dev` – startar utvecklingsservern.
- `npm run build` – bygger en produktionsbundle med Vite.
- `npm run preview` – förhandsgranskar byggd bundle lokalt.
- `npm run lint` – kör ESLint enligt projektets regler.

## Tech stack
- [React](https://react.dev/) 19 med hooks.
- [Vite](https://vitejs.dev/) för bygg och dev-server.
- [Sass](https://sass-lang.com/) för styling.

## Struktur
- `src/components` – UI-komponenter för sessionslista, statusheader och chatvy.
- `src/hooks/useSessions.js` – logik för filinläsning, filtrering, tröskelhantering och granskningsstatus.
- `src/utils/csvUtils.js` – enkel parser för SIWi-exporter.

## Licens
Ingen licensfil ingår ännu. Lägg till en licens innan projektet delas externt.
