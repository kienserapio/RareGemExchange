import { useState } from 'react'
import './App.css'

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <line x1="7" y1="10" x2="7" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="7" cy="7.5" r="1" fill="currentColor" />
    <path d="M11 17V13c0-1.657 1.343-3 3-3s3 1.343 3 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="10" x2="11" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="page">
      <div className="page-bg" />

      <main className="main">
        <section className="hero">
          <div className="slide-up" style={{ animationDelay: '0.15s' }}>
            <img src="/gem logo.png" alt="Rare Gem Exchange" className="gem-logo" />
          </div>

          <h1 className="main-heading slide-up" style={{ animationDelay: '0.3s' }}>
            RARE GEM<br />EXCHANGE
          </h1>

          <div className="divider slide-up" style={{ animationDelay: '0.5s' }}>
            <span className="divider-line" />
            <span className="divider-diamond">◇</span>
            <span className="divider-line" />
          </div>

          <p className="subheading slide-up" style={{ animationDelay: '0.65s' }}>
            INVESTMENT GRADE GEMSTONES
          </p>

          <p className="supporting-text slide-up" style={{ animationDelay: '0.8s' }}>
            FINE GEMS • RARE STONES • GLOBAL TRADING
          </p>
        </section>

        <section className="coming-soon-section">
          <div className="coming-soon-header slide-up" style={{ animationDelay: '0.95s' }}>
            <span className="coming-soon-line" />
            <h2 className="coming-soon-text">COMING SOON</h2>
            <span className="coming-soon-line" />
          </div>

          <div className="body-text slide-up" style={{ animationDelay: '1.1s' }}>
            <p>
              We are crafting a world-class destination for collectors,<br />
              investors and gemstone enthusiasts seeking the world's<br />
              most exceptional stones.
            </p>
            <p className="tagline">Excellence. Integrity. Rarity.</p>
            <p className="launch-text">Be the first to show when we launch.</p>
          </div>

          <form
            className="email-form slide-up"
            style={{ animationDelay: '1.25s' }}
            onSubmit={handleSubmit}
          >
            {submitted ? (
              <p className="form-success">
                Thank you — we'll be in touch.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  className="email-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="request-btn">
                  REQUEST ACCESS
                </button>
              </>
            )}
          </form>

          <div className="socials slide-up" style={{ animationDelay: '1.4s' }}>
            <a href="#" className="social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="#" className="social-link" aria-label="Email">
              <EmailIcon />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer slide-up" style={{ animationDelay: '1.55s' }}>
        <p className="footer-brand">RARE GEM EXCHANGE</p>
        <p className="footer-tagline">Fine Gems • Rare Stones • Investment Grade</p>
        <p className="footer-copy">© 2026 Rare Gem Exchange</p>
      </footer>
    </div>
  )
}

export default App
