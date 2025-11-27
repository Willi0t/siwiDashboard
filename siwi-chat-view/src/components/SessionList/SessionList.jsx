import { useEffect, useMemo, useRef, useState } from 'react'
import './SessionList.scss'

function SessionList({ sessions, onSelect, activeSessionId, onMarkReviewed }) {
  const [activeTab, setActiveTab] = useState('new')
  const [pendingToggle, setPendingToggle] = useState(null)
  const toggleTimeoutRef = useRef(null)

  const { newSessions, reviewedSessions } = useMemo(() => {
    const newOnes = sessions.filter((session) => !session.isReviewed)
    const done = sessions.filter((session) => session.isReviewed)
    return { newSessions: newOnes, reviewedSessions: done }
  }, [sessions])

  const filteredSessions = activeTab === 'new' ? newSessions : reviewedSessions

  const tabContent = {
    new: {
      title: `Nya sessioner (${newSessions.length})`,
      empty: 'Inga nya sessioner just nu.'
    },
    reviewed: {
      title: `Granskade sessioner (${reviewedSessions.length})`,
      empty: 'Inga granskade sessioner ännu.'
    }
  }

  const { title, empty } = tabContent[activeTab]

  const handleToggleReviewed = (session) => {
    const nextState = !session.isReviewed

    if (toggleTimeoutRef.current) {
      clearTimeout(toggleTimeoutRef.current)
    }

    setPendingToggle({ id: session.SessionId, direction: nextState ? 'to-reviewed' : 'to-new' })

    toggleTimeoutRef.current = setTimeout(() => {
      onMarkReviewed(session.SessionId, nextState)
      setPendingToggle(null)
      toggleTimeoutRef.current = null
    }, 220)
  }

  useEffect(
    () => () => {
      if (toggleTimeoutRef.current) {
        clearTimeout(toggleTimeoutRef.current)
      }
    },
    []
  )

  return (
    <aside id="session-list">
      <div className="session-header">
        <h2>{title}</h2>
        <div className="session-tabs">
          <button
            type="button"
            className={activeTab === 'new' ? 'active' : ''}
            onClick={() => setActiveTab('new')}
          >
            Nya
          </button>
          <button
            type="button"
            className={activeTab === 'reviewed' ? 'active' : ''}
            onClick={() => setActiveTab('reviewed')}
          >
            Granskade
          </button>
        </div>
      </div>

      {!filteredSessions.length ? (
        <p className="empty-list">{empty}</p>
      ) : (
        <div id="session-items">
          {filteredSessions.map((session) => {
            const shortId = session.SessionId
              ? `${session.SessionId.slice(0, 10)}...`
              : 'Okänt ID'
            const isActive = session.SessionId === activeSessionId
            const messageCount = session.Messages || 0
            const intensity = Math.min(messageCount / 30, 1)
            const accentHue = 180 - intensity * 50
            const accentLightness = 95 - intensity * 25
            const accentColor = `hsl(${accentHue}, 75%, ${accentLightness}%)`
            const accentStrength = 0.12 + intensity * 0.35

            const animationClass =
              pendingToggle?.id === session.SessionId
                ? pendingToggle.direction === 'to-reviewed'
                  ? 'moving-reviewed'
                  : 'moving-new'
                : ''

            return (
              <div
                key={session.SessionId + session.StartDateTime}
                className={`session-item${isActive ? ' active' : ''}${animationClass ? ` ${animationClass}` : ''}`}
                style={{
                  '--message-accent': accentColor,
                  '--message-strength': accentStrength
                }}
                onClick={() => onSelect(session)}
              >
                <div className="session-row">
                  <div className="session-id">
                    <strong>{shortId}</strong>
                  </div>
                  <span className="session-outcome">{session.SessionOutcome || 'Okänt resultat'}</span>
                </div>
                <div className="session-meta">{session.StartDateTime || ''}</div>
                <div className="session-stats">
                  <span className="message-count">{messageCount} meddelanden</span>
                  <div className="session-actions">
                    <label
                      className={`review-toggle${session.isReviewed ? ' checked' : ''}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <span className="toggle-label">Granskad</span>
                      <input
                        type="checkbox"
                        checked={session.isReviewed}
                        onChange={(event) => {
                          event.stopPropagation()
                          handleToggleReviewed(session)
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </aside>
  )
}

export default SessionList
