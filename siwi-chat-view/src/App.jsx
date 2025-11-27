import { useMemo, useState } from 'react'
import './App.scss'

function parseLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '')
  if (lines.length < 2) return []

  const header = parseLine(lines[0])
  const idxSessionId = header.indexOf('SessionId')
  const idxStart = header.indexOf('StartDateTime(UTC)')
  const idxTurns = header.indexOf('Turns')
  const idxOutcome = header.indexOf('SessionOutcome')
  const idxTranscript = header.indexOf('ChatTranscript')

  if (
    idxSessionId === -1 ||
    idxStart === -1 ||
    idxTurns === -1 ||
    idxOutcome === -1 ||
    idxTranscript === -1
  ) {
    return []
  }

  const rows = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const cols = parseLine(line)
    if (cols.length === 0) continue

    const sessionId = cols[idxSessionId] || ''
    const start = cols[idxStart] || ''
    const turns = parseInt(cols[idxTurns], 10) || 0
    const outcome = cols[idxOutcome] || ''
    const transcript = cols[idxTranscript] || ''

    if (!sessionId && !transcript) continue

    rows.push({
      SessionId: sessionId,
      StartDateTime: start,
      Turns: turns,
      SessionOutcome: outcome,
      ChatTranscript: transcript
    })
  }

  return rows
}

function StatusHeader({ status, onFileChange }) {
  return (
    <header>
      <div>
        <strong>SIWi Chat Viewer</strong>
        <br />
        <span id="status">{status}</span>
      </div>
      <div>
        <input type="file" accept=".csv" onChange={onFileChange} />
      </div>
    </header>
  )
}

function SessionList({ sessions, onSelect, activeSessionId }) {
  if (!sessions.length) {
    return (
      <aside id="session-list">
        <h2>Sessioner (filtrerade)</h2>
        <p className="empty-list">Inga sessioner matchar filtret.</p>
      </aside>
    )
  }

  return (
    <aside id="session-list">
      <h2>Sessioner (filtrerade)</h2>
      <div id="session-items">
        {sessions.map((session) => {
          const shortId = session.SessionId
            ? `${session.SessionId.slice(0, 10)}...`
            : 'Okänt ID'
          const isActive = session.SessionId === activeSessionId

          return (
            <div
              key={session.SessionId + session.StartDateTime}
              className={`session-item${isActive ? ' active' : ''}`}
              onClick={() => onSelect(session)}
            >
              <div>
                <strong>{shortId}</strong>
              </div>
              <div className="session-meta">
                {session.StartDateTime || ''}
                <br />
                Turns: {session.Turns} • {session.SessionOutcome || ''}
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

function MessageList({ transcript }) {
  const parts = useMemo(() => {
    if (!transcript || !transcript.trim()) return []
    return transcript
      .split(';')
      .map((part) => part.trim())
      .filter((part) => part !== '')
      .map((part) => {
        const lower = part.toLowerCase()
        if (lower.startsWith('bot says:')) {
          return { role: 'bot', text: part.replace(/^Bot says:\s*/i, '') }
        }
        if (lower.startsWith('user says:')) {
          return { role: 'user', text: part.replace(/^User says:\s*/i, '') }
        }
        return { role: 'bot', text: part }
      })
  }, [transcript])

  if (!parts.length) {
    return <p>Ingen chattdata i denna session.</p>
  }

  return (
    <div className="messages-container">
      {parts.map((part, index) => (
        <div key={`${part.role}-${index}-${part.text.slice(0, 8)}`} className="message-row">
          <div className={`message ${part.role}`}>
            <div className="message-role">{part.role === 'bot' ? 'SIWi' : 'Användare'}</div>
            <div className="message-text">{part.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ChatView({ session }) {
  if (!session) {
    return (
      <section id="chat-view">
        <div id="chat-header">
          <div>
            <div>
              <strong>Session:</strong> <span>–</span>
            </div>
            <div className="session-meta">
              <span></span>
            </div>
          </div>
          <div className="session-meta">
            <div>
              <strong>Turns:</strong> <span>–</span>
            </div>
            <div>
              <strong>Outcome:</strong> <span>–</span>
            </div>
          </div>
        </div>
        <div id="chat-messages">
          <p>Ingen session vald ännu.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="chat-view">
      <div id="chat-header">
        <div>
          <div>
            <strong>Session:</strong> <span>{session.SessionId || '–'}</span>
          </div>
          <div className="session-meta">
            <span>{session.StartDateTime || ''}</span>
          </div>
        </div>
        <div className="session-meta">
          <div>
            <strong>Turns:</strong> <span>{session.Turns || '–'}</span>
          </div>
          <div>
            <strong>Outcome:</strong> <span>{session.SessionOutcome || '–'}</span>
          </div>
        </div>
      </div>
      <div id="chat-messages">
        <MessageList transcript={session.ChatTranscript} />
      </div>
    </section>
  )
}

function App() {
  const [status, setStatus] = useState('Ladda upp din ursprungliga CSV-export för att börja.')
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setStatus(`Laddar ${file.name}...`)
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target?.result
      if (typeof text !== 'string') {
        setStatus('Kunde inte läsa filen.')
        return
      }

      const allRows = parseCsv(text)
      const filtered = allRows.filter(
        (row) => row.Turns > 2 && row.ChatTranscript && row.ChatTranscript.trim() !== ''
      )

      setSessions(filtered)
      setSelectedSession(null)
      setStatus(
        `Hittade ${filtered.length} filtrerade sessioner (Turns > 2). Klicka på en session för att visa chatten.`
      )
    }

    reader.readAsText(file, 'utf-8')
  }

  const handleSelectSession = (session) => {
    setSelectedSession(session)
  }

  return (
    <div className="app-shell">
      <StatusHeader status={status} onFileChange={handleFileChange} />
      <main>
        <SessionList
          sessions={sessions}
          onSelect={handleSelectSession}
          activeSessionId={selectedSession?.SessionId}
        />
        <ChatView session={selectedSession} />
      </main>
    </div>
  )
}

export default App
