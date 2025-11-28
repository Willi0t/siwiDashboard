import { useCallback, useMemo, useState } from 'react'
import { parseCsv } from '../utils/csvUtils'

const initialStatus = 'Ladda upp din ursprungliga CSV-export för att börja.'

function useSessions() {
  const [statusOverride, setStatusOverride] = useState(initialStatus)
  const [rawSessions, setRawSessions] = useState([])
  const [messageThreshold, setMessageThreshold] = useState(3)
  const [selectedSessionId, setSelectedSessionId] = useState(null)
  const [reviewStatuses, setReviewStatuses] = useState({})

  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setStatusOverride(`Laddar ${file.name}...`)
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target?.result
      if (typeof text !== 'string') {
        setStatusOverride('Kunde inte läsa filen.')
        return
      }

      const cleanedRows = parseCsv(text).filter(
        (row) => row.ChatTranscript && row.ChatTranscript.trim() !== ''
      )

      if (!cleanedRows.length) {
        setRawSessions([])
        setSelectedSessionId(null)
        setReviewStatuses({})
        setStatusOverride('Inga konversationer hittades i filen.')
        return
      }

      setRawSessions(cleanedRows)
      setSelectedSessionId(null)
      setReviewStatuses({})
      setStatusOverride(null)
    }

    reader.readAsText(file, 'utf-8')
  }, [])

  const handleSelectSession = useCallback((session) => {
    setSelectedSessionId(session.SessionId)
  }, [])

  const handleMarkReviewed = useCallback((sessionId, isReviewed) => {
    setReviewStatuses((prevStatuses) => ({ ...prevStatuses, [sessionId]: isReviewed }))
  }, [])

  const handleThresholdChange = useCallback((value) => {
    setMessageThreshold(Math.max(0, value))
  }, [])

  const threshold = Number(messageThreshold) || 0

  const sessions = useMemo(() => {
    const filtered = rawSessions.filter((row) => Number(row.Messages) > threshold)

    return filtered.map((session) => ({
      ...session,
      isReviewed: reviewStatuses[session.SessionId] ?? false
    }))
  }, [rawSessions, reviewStatuses, threshold])

  const selectedSession = useMemo(
    () => sessions.find((session) => session.SessionId === selectedSessionId) ?? null,
    [selectedSessionId, sessions]
  )

  const status = useMemo(() => {
    if (statusOverride) return statusOverride
    if (!rawSessions.length) return initialStatus

    return `Hittade ${sessions.length} filtrerade sessioner (Meddelanden > ${threshold}). Klicka på en session för att visa chatten.`
  }, [rawSessions.length, sessions.length, statusOverride, threshold])

  return {
    status,
    sessions,
    selectedSession,
    messageThreshold,
    handleFileChange,
    handleSelectSession,
    handleMarkReviewed,
    handleThresholdChange
  }
}

export default useSessions
