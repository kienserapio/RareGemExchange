import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const closeMenu = () => setMenuOpen(false)

  // On the homepage the logo is already at "/", so a plain Link does nothing.
  // Scroll back up to the hero instead.
  const handleBrandClick = (e) => {
    closeMenu()
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="header-brand" onClick={handleBrandClick}>
            Rare Gem Exchange
          </Link>

          <nav className="header-nav" aria-label="Primary">
            {isHome ? (
              <a href="#about" className="nav-link">About</a>
            ) : (
              <Link to="/#about" className="nav-link">About</Link>
            )}
            <NavLink
              to="/gems"
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
            >
              Our Gems
            </NavLink>
            <NavLink
              to="/team"
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
            >
              Team
            </NavLink>
          </nav>
        </div>

        <div className="header-right">
          {isHome ? (
            <a href="#coming-soon" className="header-contact-btn">
              Contact Us
            </a>
          ) : (
            <Link to="/#coming-soon" className="header-contact-btn">
              Contact Us
            </Link>
          )}

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

      <div
        id="header-mobile-menu"
        className={`header-drawer${menuOpen ? ' header-drawer--open' : ''}`}
      >
        <nav className="header-drawer-nav" aria-label="Mobile">
          <a href="/#about" className="drawer-link" onClick={closeMenu}>About</a>
          <Link to="/gems" className="drawer-link" onClick={closeMenu}>Our Gems</Link>
          <Link to="/team" className="drawer-link" onClick={closeMenu}>Team</Link>
          {isHome ? (
            <a href="#coming-soon" className="drawer-contact-btn" onClick={closeMenu}>
              Contact Us
            </a>
          ) : (
            <Link to="/#coming-soon" className="drawer-contact-btn" onClick={closeMenu}>
              Contact Us
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
