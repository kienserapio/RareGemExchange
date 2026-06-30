import { formatDate } from './utils'

const COL_COUNT = 3

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

export default function WaitlistsTable({ rows, loading, emptyLabel }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table admin-table--waitlists">
        <thead>
          <tr>
            <th className="admin-th admin-th--id">ID</th>
            <th className="admin-th">Email</th>
            <th className="admin-th">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows />
          ) : rows.length === 0 ? (
            <tr>
              <td className="admin-empty" colSpan={COL_COUNT}>
                {emptyLabel || 'No waitlist signups yet.'}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr className="admin-tr" key={row.id}>
                <td className="admin-td admin-td--mono admin-td--dim">{row.id}</td>
                <td className="admin-td admin-td--strong">
                  {row.email ? (
                    <a className="admin-link" href={`mailto:${row.email}`}>
                      {row.email}
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="admin-td admin-td--mono admin-td--dim admin-td--nowrap">
                  {formatDate(row.submitted_at)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
