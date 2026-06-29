import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="rg-section footer-inner" delay={0}>
        <div className="footer-col footer-brand-col">
          <p className="footer-brand">RARE GEM EXCHANGE</p>
          <p className="footer-brand-tagline">
            FINE GEMS • RARE STONES • INVESTMENT GRADE
          </p>
        </div>

        <nav className="footer-col" aria-label="Our Products">
          <p className="footer-heading">OUR PRODUCTS</p>
          <a className="footer-link" href="/#about">ABOUT</a>
          <Link className="footer-link" to="/gems">OUR GEMS</Link>
          <a className="footer-link" href="/#compare-gems">COMPARE GEMS</a>
        </nav>

        <nav className="footer-col" aria-label="Our Company">
          <p className="footer-heading">OUR COMPANY</p>
          <a className="footer-link" href="#terms">TERMS &amp; CONDITIONS</a>
          <a className="footer-link" href="#privacy">PRIVACY POLICY</a>
          <p className="footer-copy">
            © 2026 RARE GEM EXCHANGE. ARCHITECTURAL PRECISION IN GEMOLOGY.
          </p>
        </nav>
      </Reveal>
    </footer>
  )
}
