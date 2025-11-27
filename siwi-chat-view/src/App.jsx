import ChatView from './components/ChatView/ChatView'
import SessionList from './components/SessionList/SessionList'
import StatusHeader from './components/StatusHeader/StatusHeader'
import './App.css'
import useSessions from './hooks/useSessions'

function App() {
  const { status, sessions, selectedSession, handleFileChange, handleSelectSession } = useSessions()

  return (
    <div className="app-shell">
      <StatusHeader status={status} onFileChange={handleFileChange} />
      <main>
        <SessionList
          sessions={sessions}
          onSelect={handleSelectSession}
          activeSessionId={selectedSession?.SessionId}
        />
        <ChatView session={selectedSession} />
      </main>
    </div>
  )
}

export default App
