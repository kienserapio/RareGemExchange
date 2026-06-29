import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

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

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Link to="/" className="header-brand" onClick={closeMenu}>
            Rare Gem Exchange
          </Link>

          <nav className="header-nav" aria-label="Primary">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
            >
              Home
            </NavLink>
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
          </nav>
        </div>

        <div className="header-right">
          <button type="button" className="header-icon-btn" aria-label="Search">
            <SearchIcon />
          </button>

          <Link to="/gems" className="header-contact-btn">
            Contact Us
          </Link>

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
          <Link to="/" className="drawer-link" onClick={closeMenu}>Home</Link>
          <a href="/#about" className="drawer-link" onClick={closeMenu}>About</a>
          <Link to="/gems" className="drawer-link" onClick={closeMenu}>Our Gems</Link>
          <Link to="/gems" className="drawer-contact-btn" onClick={closeMenu}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
