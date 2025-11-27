import { useCallback, useState } from 'react'
import { parseCsv } from '../utils/csvUtils'

const initialStatus = 'Ladda upp din ursprungliga CSV-export för att börja.'

function useSessions() {
  const [status, setStatus] = useState(initialStatus)
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)

  const handleFileChange = useCallback((event) => {
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
  }, [])

  const handleSelectSession = useCallback((session) => {
    setSelectedSession(session)
  }, [])

  return { status, sessions, selectedSession, handleFileChange, handleSelectSession }
}

export default useSessions
