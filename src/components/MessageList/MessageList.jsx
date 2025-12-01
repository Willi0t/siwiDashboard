import { useMemo } from 'react'
import './MessageList.scss'

function MessageList({ transcript }) {
  const parts = useMemo(() => {
    if (!transcript || !transcript.trim()) return []
    return transcript
      .split(';')
      .map((part) => part.trim())
      .filter((part) => part !== '')
      .map((part) => {
        const lower = part.toLowerCase()
        if (lower.startsWith('bot says:')) {
          return { role: 'bot', text: part.replace(/^Bot says:\s*/i, '') }
        }
        if (lower.startsWith('user says:')) {
          return { role: 'user', text: part.replace(/^User says:\s*/i, '') }
        }
        return { role: 'bot', text: part }
      })
  }, [transcript])

  if (!parts.length) {
    return <p>Ingen chattdata i denna session.</p>
  }

  return (
    <div className="messages-container">
      {parts.map((part, index) => (
        <div key={`${part.role}-${index}-${part.text.slice(0, 8)}`} className="message-row">
          <div className={`message ${part.role}`}>
            <div className="message-role">{part.role === 'bot' ? 'SIWi' : 'Användare'}</div>
            <div className="message-text">{part.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessageList
