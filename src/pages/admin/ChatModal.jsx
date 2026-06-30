import { useEffect, useRef } from 'react'
import { formatDate } from './utils'

/**
 * Read-only conversation viewer. Renders a customer's chat_history as
 * bot/user bubbles in a centered modal. Closes on backdrop click, the X
 * button, or Escape.
 */
export default function ChatModal({ customer, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const history = Array.isArray(customer.chat_history) ? customer.chat_history : []

  return (
    // onMouseDown (not onClick) so a text selection that ends outside the
    // panel doesn't accidentally dismiss the modal.
    <div className="admin-modal-overlay" onMouseDown={onClose}>
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Conversation with ${customer.name || 'customer'}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="admin-modal-head">
          <div className="admin-modal-headings">
            <div className="admin-modal-title">{customer.name || 'Conversation'}</div>
            <div className="admin-modal-sub">
              {customer.email || customer.session_id || `Customer #${customer.id}`}
            </div>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close conversation"
            ref={closeRef}
          >
            ✕
          </button>
        </header>

        <div className="admin-modal-meta">
          <span>{history.length} message{history.length === 1 ? '' : 's'}</span>
          <span aria-hidden="true">·</span>
          <span>Started {formatDate(customer.created_at)}</span>
        </div>

        <div className="admin-modal-body">
          {history.length === 0 ? (
            <div className="admin-modal-empty">No chat history for this customer.</div>
          ) : (
            history.map((m, i) => {
              const isUser = m.sender === 'user'
              return (
                <div
                  className={`admin-bubble-row ${isUser ? 'is-user' : 'is-bot'}`}
                  key={i}
                >
                  <div className="admin-bubble">{m.text}</div>
                  <div className="admin-bubble-meta">{isUser ? 'Customer' : 'Concierge'}</div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
