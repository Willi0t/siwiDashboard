import './StatusHeader.scss'

function StatusHeader({ status, onFileChange }) {
  return (
    <header className="status-header">
      <div className="brand">
        <div className="brand-mark">SI</div>
        <div className="brand-copy">
          <p className="eyebrow">SIWi Chat Viewer</p>
          <h1>Session Insights</h1>
          <span className="brand-status">Kontextstyrd översikt av dina konversationer</span>
        </div>
      </div>

      <div className="status-actions">
        <div className="status-pill" title={status}>
          <span className="pulse-dot" aria-hidden="true" />
          <span className="status-text">{status}</span>
        </div>

        <label className="upload-button">
          <input type="file" accept=".csv" onChange={onFileChange} />
          <span>Importera CSV</span>
        </label>
      </div>
    </header>
  )
}

export default StatusHeader
