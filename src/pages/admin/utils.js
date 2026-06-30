/* ════════════════════════════════════════════════════════════════
   Admin dashboard — shared formatting helpers.
   The stats endpoint returns counts as STRINGS and budget bounds as
   numeric strings or null, so everything here is defensive.
   ════════════════════════════════════════════════════════════════ */

/** Coerce a value (often a numeric string like "12") to a finite number. */
export const Num = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

/** Render an ISO timestamp as a readable local date + time, or "—". */
export function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Short clock time, e.g. "2:14:03 PM" — used for the live indicator. */
export function formatClock(date) {
  if (!date) return ''
  try {
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    })
  } catch {
    return ''
  }
}

/** Coarse relative time, e.g. "just now", "8 min ago", "3 hr ago". */
export function formatRelative(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  const diff = Date.now() - d.getTime()
  const sec = Math.round(diff / 1000)
  if (sec < 0) return 'just now'
  if (sec < 45) return 'just now'
  const min = Math.round(sec / 60)
  if (min < 60) return `${min} min ago`
  const hr = Math.round(min / 60)
  if (hr < 24) return `${hr} hr ago`
  const day = Math.round(hr / 24)
  if (day < 30) return `${day} day${day === 1 ? '' : 's'} ago`
  return formatDate(iso)
}

/**
 * Format a budget range as "min – max CURRENCY".
 * Bounds arrive as numeric strings or null; missing bounds degrade
 * gracefully ("—", "50,000+ USD", "Up to 50,000 USD").
 */
export function formatBudget(min, max, currency) {
  const cur = currency ? String(currency).toUpperCase() : ''
  const suffix = cur ? ` ${cur}` : ''
  const has = (v) => v !== null && v !== undefined && v !== ''
  const lo = has(min) ? Num(min) : null
  const hi = has(max) ? Num(max) : null
  const n = (x) => x.toLocaleString()

  if (lo === null && hi === null) return '—'
  if (lo !== null && hi !== null) return `${n(lo)} – ${n(hi)}${suffix}`
  if (lo !== null) return `${n(lo)}+${suffix}`
  return `Up to ${n(hi)}${suffix}`
}
