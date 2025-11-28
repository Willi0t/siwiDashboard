import './StatusHeader.scss'

function StatusHeader({ status, onFileChange, messageThreshold, onThresholdChange }) {
  const isFilterStatus = status?.mode === 'filtered'

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
        <div className="status-pill" title={status?.text}>
          <span className="pulse-dot" aria-hidden="true" />
          <span className="status-text">
            {isFilterStatus ? (
              <>
                Hittade {status?.count ?? 0} filtrerade sessioner (Meddelanden &gt;
                <input
                  type="number"
                  min="0"
                  className="status-threshold-input"
                  value={messageThreshold}
                  onChange={(event) => onThresholdChange?.(event.target.value)}
                  aria-label="Filtrera på antal meddelanden"
                />
                ). Klicka på en session för att visa chatten.
              </>
            ) : (
              status?.text
            )}
          </span>
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
