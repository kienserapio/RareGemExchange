import { useEffect, useMemo, useRef, useState } from 'react'
import { apiUrl } from '../../config'
import './CustomerIntakeForm.css'

/* A comprehensive list of common ISO-4217 currencies so a location-detected
   currency is actually selectable. AUD stays first as the listed default. */
const CURRENCIES = [
  'AUD', 'USD', 'EUR', 'GBP', 'CAD', 'NZD', 'CHF', 'JPY', 'CNY', 'HKD',
  'SGD', 'INR', 'PHP', 'THB', 'MYR', 'IDR', 'KRW', 'TWD', 'VND', 'AED',
  'SAR', 'QAR', 'ZAR', 'BRL', 'MXN', 'SEK', 'NOK', 'DKK', 'PLN', 'TRY', 'ILS',
]

/* Bare currency symbols for the live budget adornment. Anything not listed
   falls back to Intl, then to the raw code (handled by currencySymbol). */
const CURRENCY_SYMBOLS = {
  AUD: '$', USD: '$', CAD: '$', NZD: '$', SGD: '$', HKD: '$', MXN: '$',
  TWD: 'NT$', BRL: 'R$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥', CHF: 'CHF',
  INR: '₹', PHP: '₱', THB: '฿', KRW: '₩', VND: '₫', IDR: 'Rp', MYR: 'RM',
  ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', TRY: '₺', ILS: '₪',
  AED: 'AED', SAR: 'SAR', QAR: 'QAR',
}

/* Derive a display symbol for a currency code: prefer the curated map, then
   Intl's narrow symbol, finally the raw code so something always renders. */
function currencySymbol(code) {
  if (!code) return ''
  if (CURRENCY_SYMBOLS[code]) return CURRENCY_SYMBOLS[code]
  try {
    const parts = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: code,
      currencyDisplay: 'narrowSymbol',
    }).formatToParts(0)
    const found = parts.find((p) => p.type === 'currency')
    if (found && found.value) return found.value
  } catch {
    /* unsupported / invalid code — fall through to the raw code */
  }
  return code
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

/* Which red/shake group an edited field belongs to, so editing it can clear
   that group's highlight. */
const FIELD_GROUP = {
  name: 'name',
  email: 'contact',
  whatsapp: 'contact',
  budgetMin: 'budget',
  budgetMax: 'budget',
}

const NO_ERROR = { message: '', field: null }

const cx = (...parts) => parts.filter(Boolean).join(' ')

/* Mirror the server's validation so users get instant feedback before any
   request is sent. The server re-checks everything authoritatively. Returns
   `{ error, field }` (field drives the red highlight + shake) or null. */
function validate(form) {
  if (!form.name.trim()) return { error: 'Please enter your name.', field: 'name' }

  const email = form.email.trim()
  const whatsapp = form.whatsapp.trim()
  if (!email && !whatsapp)
    return { error: 'Please provide at least an email or WhatsApp number.', field: 'contact' }
  if (email && !EMAIL_RE.test(email))
    return { error: 'Please enter a valid email address.', field: 'contact' }
  if (whatsapp && !PHONE_RE.test(whatsapp))
    return { error: 'Please enter a valid WhatsApp number.', field: 'contact' }

  const min = form.budgetMin === '' ? null : Number(form.budgetMin)
  const max = form.budgetMax === '' ? null : Number(form.budgetMax)
  if (min !== null && (!Number.isFinite(min) || min < 0))
    return { error: 'Minimum budget must be a positive number.', field: 'budget' }
  if (max !== null && (!Number.isFinite(max) || max < 0))
    return { error: 'Maximum budget must be a positive number.', field: 'budget' }
  if (min !== null && max !== null && max < min)
    return { error: 'Maximum budget must be greater than or equal to the minimum.', field: 'budget' }

  if (!form.consent) return { error: 'Please agree to be contacted to continue.', field: 'consent' }

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
  // One source of truth for the error message + which field group is invalid,
  // so editing the offending field clears both atomically (pure updater).
  const [errState, setErrState] = useState(NO_ERROR)
  const [shakeTick, setShakeTick] = useState(0)

  const { message: error, field: errorField } = errState

  // True once the user manually picks a currency — auto-detection must never
  // override an explicit choice.
  const currencyTouched = useRef(false)

  // ── Task 1: location-based currency detection (once, on mount) ──────────
  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 4000)

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const detected =
          data && typeof data.currency === 'string' ? data.currency.trim().toUpperCase() : ''
        if (!active || currencyTouched.current) return
        if (!/^[A-Z]{3}$/.test(detected)) return
        setForm((prev) =>
          currencyTouched.current || prev.currency === detected
            ? prev
            : { ...prev, currency: detected },
        )
      })
      .catch(() => {
        /* timeout / network / ad-blocker / no currency → keep the AUD fallback */
      })
      .finally(() => clearTimeout(timer))

    return () => {
      active = false
      controller.abort()
      clearTimeout(timer)
    }
  }, [])

  // Ensure a detected/selected currency outside the base list is still shown.
  const currencyOptions = useMemo(
    () => (CURRENCIES.includes(form.currency) ? CURRENCIES : [...CURRENCIES, form.currency]),
    [form.currency],
  )

  const symbol = currencySymbol(form.currency)

  // Clear the red/shake state (and its message) once the user edits a field in
  // the currently-flagged group. Pure updater — reads only `cur`.
  const clearGroup = (group) =>
    setErrState((cur) => (cur.field === group ? NO_ERROR : cur))

  const set = (field) => (e) => {
    const { value } = e.target
    setForm((prev) => ({ ...prev, [field]: value }))
    const group = FIELD_GROUP[field]
    if (group) clearGroup(group)
  }

  const onCurrencyChange = (e) => {
    currencyTouched.current = true
    const { value } = e.target
    setForm((prev) => ({ ...prev, currency: value }))
  }

  const toggleConsent = (e) => {
    const { checked } = e.target
    setForm((prev) => ({ ...prev, consent: checked }))
    clearGroup('consent')
  }

  const flagError = (message, field) => {
    setErrState({ message, field })
    setShakeTick((t) => t + 1) // bump so an identical failure still re-shakes
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = validate(form)
    if (result) {
      flagError(result.error, result.field)
      return
    }

    setSubmitting(true)
    setErrState(NO_ERROR)

    try {
      const res = await fetch(apiUrl('/api/customers'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || null,
          whatsapp: form.whatsapp.trim() || null,
          location: form.location.trim() || null,
          budgetMin: form.budgetMin ? parseFloat(form.budgetMin) : null,
          budgetMax: form.budgetMax ? parseFloat(form.budgetMax) : null,
          currency: form.currency,
          consent: form.consent,
          sessionId: crypto.randomUUID(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      // Genuine success only: hand the new customer id up for chat persistence.
      onSubmit(data.id)
    } catch (err) {
      // Any failure (4xx / 5xx / network): stay in the form, show a friendly
      // message, and shake. Never proceed into the chat.
      flagError(err.message || 'Something went wrong. Please try again.', 'submit')
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
              <div
                className={cx('intake-field', errorField === 'name' && 'intake-shake')}
                key={errorField === 'name' ? `name-${shakeTick}` : 'name'}
              >
                <label className="intake-label">
                  Full Name <span className="intake-req" aria-hidden="true">*</span>
                </label>
                <input
                  className={cx('intake-input', errorField === 'name' && 'intake-input--error')}
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div
              className={cx('intake-contact', errorField === 'contact' && 'intake-shake')}
              key={errorField === 'contact' ? `contact-${shakeTick}` : 'contact'}
            >
              <div className="intake-row intake-row--two">
                <div className="intake-field">
                  <label className="intake-label">Email Address</label>
                  <input
                    className={cx('intake-input', errorField === 'contact' && 'intake-input--error')}
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="intake-field">
                  <label className="intake-label">WhatsApp Number</label>
                  <input
                    className={cx('intake-input', errorField === 'contact' && 'intake-input--error')}
                    type="tel"
                    value={form.whatsapp}
                    onChange={set('whatsapp')}
                    placeholder="+61 400 000 000"
                    autoComplete="tel"
                  />
                </div>
              </div>
              <p className="intake-hint">Provide at least one — email or WhatsApp.</p>
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
                    onChange={onCurrencyChange}
                    aria-label="Currency"
                  >
                    {currencyOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div
                    className={cx(
                      'intake-budget-cell',
                      errorField === 'budget' && 'intake-budget-cell--error',
                      errorField === 'budget' && 'intake-shake',
                    )}
                    key={errorField === 'budget' ? `budgetmin-${shakeTick}` : 'budgetmin'}
                  >
                    <span className="intake-budget-symbol" aria-hidden="true">{symbol}</span>
                    <input
                      className="intake-budget-input"
                      type="number"
                      value={form.budgetMin}
                      onChange={set('budgetMin')}
                      placeholder="Min"
                      min="0"
                      step="any"
                      inputMode="decimal"
                      aria-label={`Minimum budget in ${form.currency}`}
                    />
                  </div>
                  <span className="intake-budget-sep">—</span>
                  <div
                    className={cx(
                      'intake-budget-cell',
                      errorField === 'budget' && 'intake-budget-cell--error',
                      errorField === 'budget' && 'intake-shake',
                    )}
                    key={errorField === 'budget' ? `budgetmax-${shakeTick}` : 'budgetmax'}
                  >
                    <span className="intake-budget-symbol" aria-hidden="true">{symbol}</span>
                    <input
                      className="intake-budget-input"
                      type="number"
                      value={form.budgetMax}
                      onChange={set('budgetMax')}
                      placeholder="Max"
                      min={form.budgetMin || '0'}
                      step="any"
                      inputMode="decimal"
                      aria-label={`Maximum budget in ${form.currency}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <label
              className={cx(
                'intake-consent',
                errorField === 'consent' && 'intake-consent--error',
                errorField === 'consent' && 'intake-shake',
              )}
              key={errorField === 'consent' ? `consent-${shakeTick}` : 'consent'}
            >
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

            <button
              className={cx('intake-submit', errorField === 'submit' && 'intake-shake')}
              key={errorField === 'submit' ? `submit-${shakeTick}` : 'submit'}
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'SUBMITTING…' : 'BEGIN CONSULTATION'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
