import ChatView from './components/ChatView/ChatView'
import SessionList from './components/SessionList/SessionList'
import StatusHeader from './components/StatusHeader/StatusHeader'
import './App.scss'
import useSessions from './hooks/useSessions'

function App() {
  const {
    status,
    sessions,
    selectedSession,
    messageThreshold,
    handleFileChange,
    handleSelectSession,
    handleMarkReviewed,
    handleThresholdChange
  } = useSessions()

  return (
    <div className="app-shell">
      <StatusHeader
        status={status}
        messageThreshold={messageThreshold}
        onFileChange={handleFileChange}
        onThresholdChange={handleThresholdChange}
      />
      <main>
        <SessionList
          sessions={sessions}
          onSelect={handleSelectSession}
          activeSessionId={selectedSession?.SessionId}
          onMarkReviewed={handleMarkReviewed}
        />
        <ChatView session={selectedSession} />
      </main>
    </div>
  )
}

export default App
