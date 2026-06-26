import { useState } from 'react'
import './Header.css'

/* ── Inline icons (thin stroke, inherit color via currentColor) ── */

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/* Nav links map to in-page section ids (smooth scroll handled globally) */
const NAV_LINKS = [
  { label: 'Home', href: '#top', active: true },
  { label: 'About', href: '#about' },
  { label: 'Our Gems', href: '#standards' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header-inner">
        {/* LEFT — brand wordmark + inline nav */}
        <div className="header-left">
          <a href="#top" className="header-brand" onClick={closeMenu}>
            Rare Gem Exchange
          </a>

          <nav className="header-nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link${link.active ? ' nav-link--active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* RIGHT — search + contact (desktop) and hamburger (mobile) */}
        <div className="header-right">
          <button type="button" className="header-icon-btn" aria-label="Search">
            <SearchIcon />
          </button>

          <a href="#coming-soon" className="header-contact-btn">
            Contact Us
          </a>

          <button
            type="button"
            className="header-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="header-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* MOBILE — collapsible drawer (translucent, blurred) */}
      <div
        id="header-mobile-menu"
        className={`header-drawer${menuOpen ? ' header-drawer--open' : ''}`}
      >
        <nav className="header-drawer-nav" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`drawer-link${link.active ? ' drawer-link--active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a href="#coming-soon" className="drawer-contact-btn" onClick={closeMenu}>
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
