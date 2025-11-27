import './SessionList.css'

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

export default SessionList
