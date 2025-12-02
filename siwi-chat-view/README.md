# SIWi Chat Viewer

SIWi Chat Viewer is a lightweight React + Vite dashboard for exploring chat session exports. Upload a CSV export, filter conversations by message volume, and review transcripts in a clean two-pane layout. The UI is tailored for quickly scanning new sessions, marking them as reviewed, and drilling into the message flow of a selected conversation.

## Key features
- **CSV import first workflow** – upload a CSV export to populate the dashboard instantly.
- **Smart filtering** – only sessions with transcripts and more messages than your threshold are shown; adjust the threshold inline.
- **Review states** – toggle sessions between **Nya** (new) and **Granskade** (reviewed) to track your progress.
- **Session drilldown** – pick a session to see its metadata and a formatted chat transcript with user/bot roles highlighted.

## Prerequisites
- Node.js 18+
- npm (bundled with Node.js)

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the Vite dev URL shown in the terminal (typically http://localhost:5173).

To create an optimized build, run:
```bash
npm run build
```
You can preview the production bundle locally with:
```bash
npm run preview
```

## CSV format
The viewer expects a CSV with the following headers (matching a standard SIWi export):
- `SessionId`
- `StartDateTime(UTC)`
- `Turns` (parsed as message count)
- `SessionOutcome`
- `ChatTranscript` (semicolon-delimited messages, e.g., `User says: Hello; Bot says: Hi!`)

Rows lacking both `SessionId` and `ChatTranscript` are ignored. Only sessions with a transcript and more messages than the active threshold are displayed.

## Using the app
1. Click **Importera CSV** in the header and select your export file.
2. Adjust **Meddelanden >** in the status pill to filter out shorter chats (default is 3 messages).
3. Browse **Nya sessioner**; click a row to view its details and transcript.
4. Toggle **Granskad** to move a session between **Nya** and **Granskade** tabs.
5. Review the transcript in the right pane; bot/user messages are visually separated for readability.

Happy reviewing!
