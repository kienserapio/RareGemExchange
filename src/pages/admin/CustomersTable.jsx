import { formatBudget, formatDate } from './utils'

const COL_COUNT = 10

function SkeletonRows({ rows = 7 }) {
  return Array.from({ length: rows }).map((_, r) => (
    <tr className="admin-tr" key={r}>
      {Array.from({ length: COL_COUNT }).map((__, c) => (
        <td className="admin-td" key={c}>
          <span className="admin-skel admin-skel-cell" />
        </td>
      ))}
    </tr>
  ))
}

export default function CustomersTable({ rows, loading, emptyLabel, onViewChat }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table admin-table--customers">
        <thead>
          <tr>
            <th className="admin-th admin-th--id">ID</th>
            <th className="admin-th">Name</th>
            <th className="admin-th">Email</th>
            <th className="admin-th">WhatsApp</th>
            <th className="admin-th">Location</th>
            <th className="admin-th">Budget</th>
            <th className="admin-th admin-th--center">Consent</th>
            <th className="admin-th admin-th--center">Chat</th>
            <th className="admin-th">Created</th>
            <th className="admin-th">Updated</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows />
          ) : rows.length === 0 ? (
            <tr>
              <td className="admin-empty" colSpan={COL_COUNT}>
                {emptyLabel || 'No customers yet.'}
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const hasChat = Array.isArray(row.chat_history) && row.chat_history.length > 0
              return (
                <tr className="admin-tr" key={row.id}>
                  <td className="admin-td admin-td--mono admin-td--dim">{row.id}</td>
                  <td className="admin-td admin-td--strong">{row.name || '—'}</td>
                  <td className="admin-td">
                    {row.email ? (
                      <a className="admin-link" href={`mailto:${row.email}`}>
                        {row.email}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="admin-td admin-td--nowrap">{row.whatsapp || '—'}</td>
                  <td className="admin-td">{row.location || '—'}</td>
                  <td className="admin-td admin-td--nowrap">
                    {formatBudget(row.budget_min, row.budget_max, row.currency)}
                  </td>
                  <td className="admin-td admin-td--center">
                    {row.consent ? (
                      <span className="admin-badge admin-badge--yes" title="Consented">
                        ✓
                      </span>
                    ) : (
                      <span className="admin-badge admin-badge--no" title="No consent">
                        ✗
                      </span>
                    )}
                  </td>
                  <td className="admin-td admin-td--center">
                    {hasChat ? (
                      <button
                        type="button"
                        className="admin-chip"
                        onClick={() => onViewChat(row)}
                      >
                        View chat
                        <span className="admin-chip-count">{row.chat_history.length}</span>
                      </button>
                    ) : (
                      <span className="admin-td--dim">No chat</span>
                    )}
                  </td>
                  <td className="admin-td admin-td--mono admin-td--dim admin-td--nowrap">
                    {formatDate(row.created_at)}
                  </td>
                  <td className="admin-td admin-td--mono admin-td--dim admin-td--nowrap">
                    {formatDate(row.updated_at)}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
