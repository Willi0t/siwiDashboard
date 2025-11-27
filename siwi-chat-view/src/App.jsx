import { useState } from 'react'
import ChatView from './components/ChatView'
import SessionList from './components/SessionList'
import StatusHeader from './components/StatusHeader'
import './App.scss'
import { parseCsv } from './utils/csvUtils'

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
