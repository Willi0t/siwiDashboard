import './StatusHeader.scss'

function StatusHeader({ status, messageThreshold, onFileChange, onThresholdChange }) {
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
          <div className="status-row">
            <span className="pulse-dot" aria-hidden="true" />
            <div className="status-filter">
              <span className="status-label">Meddelanden &gt;</span>
              <input
                type="number"
                min="0"
                aria-label="Minsta antal meddelanden"
                value={messageThreshold}
                onChange={(event) => onThresholdChange(Number(event.target.value) || 0)}
              />
            </div>
          </div>

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
