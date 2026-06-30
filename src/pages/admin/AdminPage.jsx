import { useCallback, useEffect, useState } from 'react'
import './AdminPage.css'
import LoginGate from './LoginGate'
import Dashboard from './Dashboard'

/*
 * Internal admin console for Rare Gem Exchange.
 *
 * Reachable only by typing /admin — it is intentionally absent from all site
 * navigation. App.jsx renders the public Header/Footer/Chatbot outside <Routes>,
 * so this page renders as a fixed, full-viewport overlay (.admin-root) that
 * covers the site chrome and stands alone visually.
 *
 * AUTH NOTE: the verified password is kept in sessionStorage and sent via the
 * `x-admin-password` header on every data request. This is acceptable for a
 * simple internal tool, but a production deployment should prefer an httpOnly
 * session cookie or a short-lived JWT rather than holding the raw password in
 * web storage.
 */

const PW_KEY = 'rge_admin_pw'

export default function AdminPage() {
  const [password, setPassword] = useState(() => {
    try {
      return sessionStorage.getItem(PW_KEY) || ''
    } catch {
      return ''
    }
  })

  // Lock background scroll while the full-screen console is mounted so the
  // covered site page can't produce a second scrollbar.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const handleAuthed = useCallback((pw) => {
    try {
      sessionStorage.setItem(PW_KEY, pw)
    } catch {
      /* storage may be unavailable; keep it in memory only */
    }
    setPassword(pw)
  }, [])

  const handleLogout = useCallback(() => {
    try {
      sessionStorage.removeItem(PW_KEY)
    } catch {
      /* ignore */
    }
    setPassword('')
  }, [])

  return (
    <div className="admin-root">
      {password ? (
        <Dashboard password={password} onLogout={handleLogout} />
      ) : (
        <LoginGate onAuthed={handleAuthed} />
      )}
    </div>
  )
}
