import { useMemo, useState } from 'react'
import './SessionList.scss'

function SessionList({ sessions, onSelect, activeSessionId, onMarkReviewed }) {
  const [activeTab, setActiveTab] = useState('new')

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
            const progress = Math.min(messageCount / 40, 1)
            const accentHue = 190 - progress * 55
            const accentLightness = 88 - progress * 22
            const accentColor = `hsl(${accentHue}, 78%, ${accentLightness}%)`
            const accentStrength = 0.18 + progress * 0.32

            const accentTone = `color-mix(in srgb, ${accentColor} 80%, #2f6fca 20%)`
            const minimumFill = 18
            const fillPercent = Math.min(Math.max(progress * 100, minimumFill), 100)
            const fadeSize = progress >= 1 ? 0 : 18
            const fadeTail = Math.min(fillPercent + fadeSize, 100)
            const solidStop = Math.min(Math.max(fillPercent - fadeSize * 0.45, 16), fillPercent)
            const fadeColor = progress >= 1 ? accentTone : `color-mix(in srgb, ${accentTone} 70%, #fff)`
            const tailColor = progress >= 1 ? accentTone : '#fff'

            return (
              <div
                key={session.SessionId + session.StartDateTime}
                className={`session-item${isActive ? ' active' : ''}`}
                style={{
                  '--message-accent': accentColor,
                  '--message-strength': accentStrength,
                  '--message-accent-strong': accentTone,
                  '--message-solid': `${solidStop}%`,
                  '--message-fill': `${fillPercent}%`,
                  '--message-fade': `${fadeTail - fillPercent}%`,
                  '--message-fade-color': fadeColor,
                  '--message-tail-color': tailColor
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
                    <button
                      type="button"
                      className="review-button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onMarkReviewed(session.SessionId)
                      }}
                      disabled={session.isReviewed}
                    >
                      Granskad
                    </button>
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
