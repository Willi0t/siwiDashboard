import MessageList from '../MessageList/MessageList'
import './ChatView.scss'

function ChatView({ session }) {
  if (!session) {
    return (
      <section id="chat-view">
        <div id="chat-header" className="empty">
          <div className="session-title">
            <p className="eyebrow">Aktiv session</p>
            <div className="session-id">Ingen vald ännu</div>
            <div className="session-time muted">Välj en session i listan för att se detaljer.</div>
          </div>
          <div className="session-highlights">
            <div className="stat-chip">
              <span className="label">Meddelanden</span>
              <span className="value">–</span>
            </div>
            <div className="stat-chip soft">
              <span className="label">Outcome</span>
              <span className="value">–</span>
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
        <div className="session-title">
          <p className="eyebrow">Aktiv session</p>
          <div className="session-id">{session.SessionId || '–'}</div>
          <div className="session-time">{session.StartDateTime || ''}</div>
        </div>
        <div className="session-highlights">
          <div className="stat-chip">
            <span className="label">Meddelanden</span>
            <span className="value">{session.Messages || '–'}</span>
          </div>
          <div className="stat-chip soft">
            <span className="label">Outcome</span>
            <span className="value">{session.SessionOutcome || '–'}</span>
          </div>
        </div>
      </div>
      <div id="chat-messages">
        <MessageList transcript={session.ChatTranscript} />
      </div>
    </section>
  )
}

export default ChatView
