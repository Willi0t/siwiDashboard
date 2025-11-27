export function parseLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

export function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '')
  if (lines.length < 2) return []

  const header = parseLine(lines[0])
  const idxSessionId = header.indexOf('SessionId')
  const idxStart = header.indexOf('StartDateTime(UTC)')
  const idxTurns = header.indexOf('Turns')
  const idxOutcome = header.indexOf('SessionOutcome')
  const idxTranscript = header.indexOf('ChatTranscript')

  if (
    idxSessionId === -1 ||
    idxStart === -1 ||
    idxTurns === -1 ||
    idxOutcome === -1 ||
    idxTranscript === -1
  ) {
    return []
  }

  const rows = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const cols = parseLine(line)
    if (cols.length === 0) continue

    const sessionId = cols[idxSessionId] || ''
    const start = cols[idxStart] || ''
    const turns = parseInt(cols[idxTurns], 10) || 0
    const outcome = cols[idxOutcome] || ''
    const transcript = cols[idxTranscript] || ''

    if (!sessionId && !transcript) continue

    rows.push({
      SessionId: sessionId,
      StartDateTime: start,
      Turns: turns,
      SessionOutcome: outcome,
      ChatTranscript: transcript
    })
  }

  return rows
}
