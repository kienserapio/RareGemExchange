import { useState } from 'react'
import { apiUrl } from '../../config'

/**
 * Password gate for the admin console. On success it hands the verified
 * password up to AdminPage, which stores it in sessionStorage and mounts the
 * dashboard. The password is never logged.
 */
export default function LoginGate({ onAuthed }) {
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting || !password) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        onAuthed(password) // store + enter dashboard; this unmounts the gate
        return
      }
      if (res.status === 401) {
        setError('Incorrect password.')
        setShake(true)
      } else if (res.status === 503) {
        setError('Admin dashboard is not configured on the server.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Check your connection and try again.')
    }

    setSubmitting(false)
  }

  return (
    <div className="admin-login">
      <div className="admin-login-glow" aria-hidden="true" />
      <form
        className={`admin-login-card${shake ? ' admin-login-card--shake' : ''}`}
        onSubmit={handleSubmit}
        onAnimationEnd={() => setShake(false)}
      >
        <img src="/gem logo.png" alt="" className="admin-login-logo" />
        <div className="admin-wordmark admin-login-wordmark">Rare Gem Exchange</div>
        <div className="admin-login-eyebrow">Admin Console</div>

        <p className="admin-login-hint">
          Restricted area. Enter the admin password to continue.
        </p>

        <label className="admin-field">
          <span className="admin-field-label">Password</span>
          <input
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            autoFocus
            autoComplete="current-password"
            aria-label="Admin password"
            disabled={submitting}
          />
        </label>

        {error && (
          <div className="admin-login-error" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="admin-btn admin-btn--primary admin-login-submit"
          disabled={submitting || !password}
        >
          {submitting ? 'Verifying…' : 'Enter Dashboard'}
        </button>
      </form>
    </div>
  )
}
