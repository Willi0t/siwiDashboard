import './SessionList.scss'

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
          const shortId = session.SessionId ? `${session.SessionId.slice(0, 10)}...` : 'Okänt ID'
          const isActive = session.SessionId === activeSessionId
          const messageCount = session.Messages || 0
          const intensity = Math.min(messageCount / 30, 1)
          const accentHue = 180 - intensity * 50
          const accentLightness = 95 - intensity * 25
          const accentColor = `hsl(${accentHue}, 75%, ${accentLightness}%)`
          const accentStrength = 0.12 + intensity * 0.35

          return (
            <div
              key={session.SessionId + session.StartDateTime}
              className={`session-item${isActive ? ' active' : ''}`}
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
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default SessionList
