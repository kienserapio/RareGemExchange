import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { apiUrl } from '../../config'
import StatCards from './StatCards'
import CustomersTable from './CustomersTable'
import WaitlistsTable from './WaitlistsTable'
import ChatModal from './ChatModal'
import { Num, formatClock, formatRelative } from './utils'

const POLL_MS = 5000

/* ── Small inline icons (keeps everything self-contained) ─────────────── */
const IconCustomers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 5.2A3 3 0 0 1 16 11M18 19c0-2.4-1-4.2-2.6-5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const IconWaitlist = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8 6h12M8 12h12M8 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="4" cy="6" r="1.3" fill="currentColor" />
    <circle cx="4" cy="12" r="1.3" fill="currentColor" />
    <circle cx="4" cy="18" r="1.3" fill="currentColor" />
  </svg>
)
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 12h10m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconRefresh = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 11a8 8 0 1 0-.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M20 4v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function Dashboard({ password, onLogout }) {
  const [activeTab, setActiveTab] = useState('customers') // 'customers' | 'waitlists'
  const [stats, setStats] = useState(null)
  const [customers, setCustomers] = useState([])
  const [waitlists, setWaitlists] = useState([])
  const [loading, setLoading] = useState(true) // initial load for the active tab
  const [refreshing, setRefreshing] = useState(false) // any fetch in flight
  const [error, setError] = useState('')
  const [configError, setConfigError] = useState(false) // 503 — server not configured
  const [lastUpdated, setLastUpdated] = useState(null)
  const [query, setQuery] = useState('')
  const [chatCustomer, setChatCustomer] = useState(null)

  const isFetchingRef = useRef(false) // guards against overlapping polls
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // All data requests carry the admin password header. 401 -> back to login,
  // 503 -> "not configured". Both are flagged so loadData can branch.
  const adminFetch = useCallback(
    async (path) => {
      const res = await fetch(apiUrl(path), {
        headers: { 'x-admin-password': password },
      })
      if (res.status === 401) {
        const e = new Error('Unauthorized')
        e.kind = '401'
        throw e
      }
      if (res.status === 503) {
        const e = new Error('Not configured')
        e.kind = '503'
        throw e
      }
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      return res.json()
    },
    [password]
  )

  const loadData = useCallback(
    async ({ initial = false } = {}) => {
      if (isFetchingRef.current) return // avoid overlapping requests
      isFetchingRef.current = true
      if (initial) setLoading(true)
      setRefreshing(true)

      const dataPath =
        activeTab === 'customers' ? '/api/admin/customers' : '/api/admin/waitlists'

      try {
        const [statsData, tabData] = await Promise.all([
          adminFetch('/api/admin/stats'),
          adminFetch(dataPath),
        ])
        if (!mountedRef.current) return
        setStats(statsData)
        if (activeTab === 'customers') setCustomers(tabData.rows || [])
        else setWaitlists(tabData.rows || [])
        setError('')
        setConfigError(false)
        setLastUpdated(new Date())
      } catch (err) {
        if (!mountedRef.current) return
        if (err.kind === '401') {
          onLogout() // stored password is wrong/expired -> login screen
          return
        }
        if (err.kind === '503') {
          setConfigError(true)
          return
        }
        setError('Could not reach the server. Check your connection and retry.')
      } finally {
        isFetchingRef.current = false
        if (mountedRef.current) {
          setRefreshing(false)
          setLoading(false)
        }
      }
    },
    [activeTab, adminFetch, onLogout]
  )

  // Initial load + 5s polling. loadData's identity changes when the active tab
  // (or password) changes, so the interval is torn down and restarted then.
  useEffect(() => {
    // Canonical fetch-on-mount + 5s polling. loadData manages its own
    // loading/refreshing flags; the initial setState is a single render (not a
    // cascading one), so the set-state-in-effect rule doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData({ initial: true })
    const id = setInterval(() => loadData(), POLL_MS)
    return () => clearInterval(id)
  }, [loadData])

  const switchTab = (tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setError('')
    setQuery('')
  }

  // ── Client-side search over the already-fetched rows ──────────────────
  const q = query.trim().toLowerCase()
  const filteredCustomers = useMemo(() => {
    if (!q) return customers
    return customers.filter((r) =>
      [r.name, r.email, r.whatsapp, r.location, String(r.id)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    )
  }, [customers, q])
  const filteredWaitlists = useMemo(() => {
    if (!q) return waitlists
    return waitlists.filter((r) =>
      [r.email, String(r.id)].filter(Boolean).some((v) => String(v).toLowerCase().includes(q))
    )
  }, [waitlists, q])

  const isCustomers = activeTab === 'customers'
  const total = isCustomers ? customers.length : waitlists.length
  const visible = isCustomers ? filteredCustomers : filteredWaitlists
  const showSkeleton = loading && total === 0

  const subtitle = (() => {
    if (loading && !stats) return 'Loading…'
    const countText = q ? `${visible.length} of ${total}` : `${total}`
    if (isCustomers) {
      const noun = `record${total === 1 ? '' : 's'}`
      const last = stats?.latest_customer_at
        ? ` · last inquiry ${formatRelative(stats.latest_customer_at)}`
        : ''
      return `${countText} ${noun}${last}`
    }
    return `${countText} signup${total === 1 ? '' : 's'}`
  })()

  return (
    <div className="admin-shell">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/gem logo.png" alt="" className="admin-brand-logo" />
          <div className="admin-brand-text">
            <span className="admin-wordmark">Rare Gem Exchange</span>
            <span className="admin-brand-sub">Admin Console</span>
          </div>
        </div>

        <nav className="admin-tabs" aria-label="Sections">
          <button
            type="button"
            className={`admin-tab${isCustomers ? ' admin-tab--active' : ''}`}
            onClick={() => switchTab('customers')}
            aria-current={isCustomers ? 'page' : undefined}
          >
            <IconCustomers />
            <span className="admin-tab-label">Customers</span>
            {stats && <span className="admin-tab-count">{Num(stats.customers)}</span>}
          </button>
          <button
            type="button"
            className={`admin-tab${!isCustomers ? ' admin-tab--active' : ''}`}
            onClick={() => switchTab('waitlists')}
            aria-current={!isCustomers ? 'page' : undefined}
          >
            <IconWaitlist />
            <span className="admin-tab-label">Waitlists</span>
            {stats && <span className="admin-tab-count">{Num(stats.waitlists)}</span>}
          </button>
        </nav>

        <button type="button" className="admin-logout" onClick={onLogout}>
          <IconLogout />
          Logout
        </button>
      </aside>

      {/* ── Main ────────────────────────────────────────────────── */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-titles">
            <h1 className="admin-title">{isCustomers ? 'Customers' : 'Waitlist'}</h1>
            <p className="admin-subtitle">{subtitle}</p>
          </div>

          <div className="admin-topbar-actions">
            <div
              className="admin-live"
              title="Auto-refreshing every 5 seconds"
              aria-live="polite"
            >
              <span className="admin-live-dot" />
              <span className="admin-live-text">
                Live{lastUpdated ? ` · ${formatClock(lastUpdated)}` : ''}
              </span>
            </div>
            <button
              type="button"
              className="admin-btn admin-refresh"
              onClick={() => loadData()}
              disabled={refreshing}
            >
              <span className={`admin-refresh-icon${refreshing ? ' is-spinning' : ''}`}>
                <IconRefresh />
              </span>
              Refresh
            </button>
          </div>
        </header>

        {configError ? (
          <div className="admin-body">
            <div className="admin-notice">
              <div className="admin-notice-title">Dashboard not configured</div>
              <p className="admin-notice-text">
                Admin dashboard is not configured on the server.
              </p>
            </div>
          </div>
        ) : (
          <div className="admin-body">
            <StatCards stats={stats} />

            {error && (
              <div className="admin-error-banner" role="alert">
                <span>{error}</span>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => loadData({ initial: true })}
                >
                  Retry
                </button>
              </div>
            )}

            <div className="admin-toolbar">
              <div className="admin-search-wrap">
                <span className="admin-search-icon">
                  <IconSearch />
                </span>
                <input
                  type="search"
                  className="admin-search"
                  placeholder={isCustomers ? 'Search name, email, location…' : 'Search email…'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search records"
                />
              </div>
            </div>

            {isCustomers ? (
              <CustomersTable
                rows={visible}
                loading={showSkeleton}
                emptyLabel={q ? 'No customers match your search.' : 'No customers yet.'}
                onViewChat={setChatCustomer}
              />
            ) : (
              <WaitlistsTable
                rows={visible}
                loading={showSkeleton}
                emptyLabel={q ? 'No signups match your search.' : 'No waitlist signups yet.'}
              />
            )}
          </div>
        )}
      </main>

      {chatCustomer && (
        <ChatModal customer={chatCustomer} onClose={() => setChatCustomer(null)} />
      )}
    </div>
  )
}
