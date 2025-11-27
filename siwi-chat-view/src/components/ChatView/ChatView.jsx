import MessageList from '../MessageList/MessageList'
import './ChatView.scss'

function ChatView({ session }) {
  if (!session) {
    return (
      <section id="chat-view">
        <div id="chat-header">
          <div>
            <div>
              <strong>Session:</strong> <span>–</span>
            </div>
            <div className="session-meta">
              <span></span>
            </div>
          </div>
          <div className="session-meta">
            <div>
              <strong>Turns:</strong> <span>–</span>
            </div>
            <div>
              <strong>Outcome:</strong> <span>–</span>
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
        <div>
          <div>
            <strong>Session:</strong> <span>{session.SessionId || '–'}</span>
          </div>
          <div className="session-meta">
            <span>{session.StartDateTime || ''}</span>
          </div>
        </div>
        <div className="session-meta">
          <div>
            <strong>Turns:</strong> <span>{session.Turns || '–'}</span>
          </div>
          <div>
            <strong>Outcome:</strong> <span>{session.SessionOutcome || '–'}</span>
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
