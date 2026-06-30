import { useState } from 'react'
import { apiUrl } from '../../config'
import './CustomerIntakeForm.css'

const CURRENCIES = ['AUD', 'USD', 'EUR', 'GBP', 'SGD', 'HKD', 'CNY', 'JPY']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

/* Mirror the server's validation so users get instant feedback before any
   request is sent. The server re-checks everything authoritatively. */
function validate(form) {
  if (!form.name.trim()) return 'Please enter your name.'
  if (!EMAIL_RE.test(form.email.trim())) return 'Please enter a valid email address.'
  if (!PHONE_RE.test(form.whatsapp.trim())) return 'Please enter a valid WhatsApp number.'

  const min = form.budgetMin === '' ? null : Number(form.budgetMin)
  const max = form.budgetMax === '' ? null : Number(form.budgetMax)

  if (min !== null && (!Number.isFinite(min) || min < 0))
    return 'Minimum budget must be a positive number.'
  if (max !== null && (!Number.isFinite(max) || max < 0))
    return 'Maximum budget must be a positive number.'
  if (min !== null && max !== null && max < min)
    return 'Maximum budget must be greater than or equal to the minimum.'

  if (!form.consent) return 'Please agree to be contacted to continue.'

  return null
}

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function CustomerIntakeForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    currency: 'AUD',
    consent: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const toggleConsent = (e) =>
    setForm((prev) => ({ ...prev, consent: e.target.checked }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validate(form)
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(apiUrl('/api/customers'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.trim(),
          location: form.location.trim() || null,
          budgetMin: form.budgetMin ? parseFloat(form.budgetMin) : null,
          budgetMax: form.budgetMax ? parseFloat(form.budgetMax) : null,
          currency: form.currency,
          consent: form.consent,
          sessionId: crypto.randomUUID(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      onSubmit()
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="intake-backdrop" onClick={onClose}>
      <div className="intake-modal" role="dialog" aria-modal="true" aria-label="Concierge Intake" onClick={(e) => e.stopPropagation()}>

        <div className="intake-header">
          <div>
            <span className="intake-brand">RARE GEM EXCHANGE</span>
            <span className="intake-brand-sub">Private Concierge</span>
          </div>
          <button type="button" className="intake-close-btn" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="intake-body">
          <p className="intake-lead">
            Before we begin, please share a few details so our concierge team can provide the most personalised service.
          </p>

          <form className="intake-form" onSubmit={handleSubmit} noValidate>
            <div className="intake-row">
              <div className="intake-field">
                <label className="intake-label">
                  Full Name <span className="intake-req" aria-hidden="true">*</span>
                </label>
                <input
                  className="intake-input"
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="intake-row intake-row--two">
              <div className="intake-field">
                <label className="intake-label">
                  Email Address <span className="intake-req" aria-hidden="true">*</span>
                </label>
                <input
                  className="intake-input"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="intake-field">
                <label className="intake-label">
                  WhatsApp Number <span className="intake-req" aria-hidden="true">*</span>
                </label>
                <input
                  className="intake-input"
                  type="tel"
                  value={form.whatsapp}
                  onChange={set('whatsapp')}
                  placeholder="+61 400 000 000"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="intake-row">
              <div className="intake-field">
                <label className="intake-label">
                  Location <span className="intake-optional">(optional)</span>
                </label>
                <input
                  className="intake-input"
                  type="text"
                  value={form.location}
                  onChange={set('location')}
                  placeholder="City, Country"
                  autoComplete="country-name"
                />
              </div>
            </div>

            <div className="intake-row">
              <div className="intake-field intake-field--budget">
                <label className="intake-label">
                  Budget Range <span className="intake-optional">(optional)</span>
                </label>
                <div className="intake-budget-row">
                  <select
                    className="intake-currency"
                    value={form.currency}
                    onChange={set('currency')}
                    aria-label="Currency"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    className="intake-input intake-budget-input"
                    type="number"
                    value={form.budgetMin}
                    onChange={set('budgetMin')}
                    placeholder="Min"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    aria-label="Minimum budget"
                  />
                  <span className="intake-budget-sep">—</span>
                  <input
                    className="intake-input intake-budget-input"
                    type="number"
                    value={form.budgetMax}
                    onChange={set('budgetMax')}
                    placeholder="Max"
                    min={form.budgetMin || '0'}
                    step="any"
                    inputMode="decimal"
                    aria-label="Maximum budget"
                  />
                </div>
              </div>
            </div>

            <label className="intake-consent">
              <input
                type="checkbox"
                className="intake-consent-box"
                checked={form.consent}
                onChange={toggleConsent}
              />
              <span className="intake-consent-text">
                By continuing, you agree to be contacted regarding your inquiry.
              </span>
            </label>

            {error && <p className="intake-error" role="alert">{error}</p>}

            <button className="intake-submit" type="submit" disabled={submitting}>
              {submitting ? 'SUBMITTING…' : 'BEGIN CONSULTATION'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
