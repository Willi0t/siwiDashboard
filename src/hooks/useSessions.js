import { useCallback, useMemo, useState } from 'react'
import { parseCsv } from '../utils/csvUtils'

const initialStatus = {
  mode: 'default',
  text: 'Ladda upp din ursprungliga CSV-export för att börja.'
}

function useSessions() {
  const [status, setStatus] = useState(initialStatus)
  const [selectedSession, setSelectedSession] = useState(null)
  const [messageThreshold, setMessageThreshold] = useState(3)
  const [allSessions, setAllSessions] = useState([])
  const [reviewStatus, setReviewStatus] = useState({})

  const applyFilter = useCallback((sessionsToFilter, threshold, statusMap) => {
    return sessionsToFilter
      .filter(
        (row) => {
          const messageCount = Number(row.Messages) || 0
          return (
            messageCount > threshold && row.ChatTranscript && row.ChatTranscript.trim() !== ''
          )
        }
      )
      .map((session) => ({
        ...session,
        isReviewed: statusMap[session.SessionId] ?? false
      }))
  }, [])

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0]
      if (!file) return

      setStatus({ mode: 'default', text: `Laddar ${file.name}...` })
      const reader = new FileReader()

      reader.onload = (e) => {
        const text = e.target?.result
        if (typeof text !== 'string') {
          setStatus({ mode: 'default', text: 'Kunde inte läsa filen.' })
          setAllSessions([])
          setReviewStatus({})
          setSelectedSession(null)
          return
        }

        const rows = parseCsv(text)
        const nextSessions = applyFilter(rows, messageThreshold, {})

        setAllSessions(rows)
        setReviewStatus({})
        setSelectedSession(null)
        setStatus({
          mode: 'filtered',
          text: `Hittade ${nextSessions.length} filtrerade sessioner (Meddelanden > ${messageThreshold}). Klicka på en session för att visa chatten.`,
          count: nextSessions.length
        })
      }

      reader.readAsText(file, 'utf-8')
    },
    [applyFilter, messageThreshold]
  )

  const handleSelectSession = useCallback((session) => {
    setSelectedSession(session)
  }, [])

  const handleMarkReviewed = useCallback((sessionId, isReviewed) => {
    setReviewStatus((prevStatus) => ({ ...prevStatus, [sessionId]: isReviewed }))
  }, [])

  const handleThresholdChange = useCallback((value) => {
    const parsed = Number(value)
    if (Number.isNaN(parsed)) return
    const nextThreshold = Math.max(0, parsed)
    setMessageThreshold(nextThreshold)

    if (!allSessions.length) return

    const nextSessions = applyFilter(allSessions, nextThreshold, reviewStatus)
    const isSelectedStillVisible = nextSessions.some(
      (session) => session.SessionId === selectedSession?.SessionId
    )

    if (!isSelectedStillVisible) {
      setSelectedSession(null)
    }

    setStatus({
      mode: 'filtered',
      text: `Hittade ${nextSessions.length} filtrerade sessioner (Meddelanden > ${nextThreshold}). Klicka på en session för att visa chatten.`,
      count: nextSessions.length
    })
  }, [allSessions, applyFilter, reviewStatus, selectedSession])

  const sessions = useMemo(
    () => applyFilter(allSessions, messageThreshold, reviewStatus),
    [allSessions, applyFilter, messageThreshold, reviewStatus]
  )

  return {
    status,
    sessions,
    selectedSession,
    messageThreshold,
    handleThresholdChange,
    handleFileChange,
    handleSelectSession,
    handleMarkReviewed
  }
}

export default useSessions
