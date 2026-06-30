import { Num } from './utils'

/** Build the four summary metrics from the (string-count) stats payload. */
function buildCards(stats) {
  const customers = Num(stats.customers)
  const waitlists = Num(stats.waitlists)
  const withChat = Num(stats.with_chat)
  const newCustomers = Num(stats.customers_last_7d)
  const newWaitlists = Num(stats.waitlists_last_7d)
  const chatPct = customers > 0 ? Math.round((withChat / customers) * 100) : 0

  return [
    {
      label: 'Total Customers',
      value: customers.toLocaleString(),
      sub: newCustomers > 0 ? `+${newCustomers} this week` : 'No new this week',
    },
    {
      label: 'Total Waitlist',
      value: waitlists.toLocaleString(),
      sub: newWaitlists > 0 ? `+${newWaitlists} this week` : 'No new this week',
    },
    {
      label: 'Inquiries with Chat',
      value: withChat.toLocaleString(),
      sub: customers > 0 ? `${chatPct}% of customers` : 'No customers yet',
    },
    {
      label: 'New This Week',
      value: (newCustomers + newWaitlists).toLocaleString(),
      sub: `${newCustomers} customer${newCustomers === 1 ? '' : 's'} · ${newWaitlists} waitlist`,
    },
  ]
}

export default function StatCards({ stats }) {
  if (!stats) {
    return (
      <section className="admin-cards" aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <div className="admin-card admin-card--skeleton" key={i}>
            <span className="admin-skel" style={{ width: '45%', height: 11 }} />
            <span className="admin-skel" style={{ width: '60%', height: 30, marginTop: 14 }} />
            <span className="admin-skel" style={{ width: '50%', height: 11, marginTop: 14 }} />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section className="admin-cards">
      {buildCards(stats).map((c) => (
        <article className="admin-card" key={c.label}>
          <span className="admin-card-accent" aria-hidden="true" />
          <div className="admin-card-label">{c.label}</div>
          <div className="admin-card-value">{c.value}</div>
          <div className="admin-card-sub">{c.sub}</div>
        </article>
      ))}
    </section>
  )
}
