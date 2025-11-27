import './StatusHeader.scss'

function StatusHeader({ status, onFileChange }) {
  return (
    <header>
      <div>
        <strong>SIWi Chat Viewer</strong>
        <br />
        <span id="status">{status}</span>
      </div>
      <div>
        <input type="file" accept=".csv" onChange={onFileChange} />
      </div>
    </header>
  )
}

export default StatusHeader
