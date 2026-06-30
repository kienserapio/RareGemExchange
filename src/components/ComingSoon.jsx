import { useState } from 'react'
import Reveal from './Reveal'
import SuccessOverlay from './SuccessOverlay'
import { apiUrl } from '../config'
import './ComingSoon.css'

const GemGlyph = () => (
  <svg
    className="cs-glyph"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 0.5 11.5 6 6 11.5 0.5 6 Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <line x1="7" y1="10" x2="7" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7" cy="7.5" r="1" fill="currentColor" />
    <path d="M11 17V13c0-1.657 1.343-3 3-3s3 1.343 3 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="10" x2="11" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(apiUrl('/api/waitlist'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setShowSuccess(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSuccessDone = () => {
    setShowSuccess(false)
    setDone(true)
  }

  return (
    <section id="coming-soon" className="rg-section cs-root">
      <Reveal className="cs-headline" delay={0}>
        <span className="cs-line" />
        <h2 className="cs-title">COMING SOON</h2>
        <span className="cs-line" />
      </Reveal>

      <Reveal delay={0.1}>
        <GemGlyph />
      </Reveal>

      <Reveal className="cs-copy" delay={0.18}>
        <p className="cs-lead">
          We are crafting a world-class platform for buying and trading the
          world&rsquo;s rarest gemstones.
        </p>
        <p className="cs-tagline">Excellence. Integrity. Rarity.</p>
        <p className="cs-note">Be the first to know when we launch.</p>
      </Reveal>

      <Reveal className="cs-form-wrap" delay={0.26}>
        {done ? (
          <p className="cs-success">Thank you &mdash; we&rsquo;ll be in touch.</p>
        ) : (
          <form className="cs-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="cs-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
              disabled={submitting}
            />
            <button type="submit" className="cs-btn" disabled={submitting}>
              {submitting ? 'SAVING…' : 'NOTIFY ME'}
            </button>
          </form>
        )}
        {error && !done && <p className="cs-error" role="alert">{error}</p>}
      </Reveal>

      <Reveal className="cs-socials" delay={0.34}>
        <a className="cs-social" href="#" aria-label="Instagram">
          <InstagramIcon />
        </a>
        <a className="cs-social" href="#" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a className="cs-social" href="#" aria-label="Email">
          <EmailIcon />
        </a>
      </Reveal>

      {showSuccess && (
        <SuccessOverlay
          title="Thank You for Joining"
          subtitle="We'll be in touch when we launch. Keep an eye on your inbox."
          onDone={handleSuccessDone}
        />
      )}
    </section>
  )
}
