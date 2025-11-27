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
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default SessionList
