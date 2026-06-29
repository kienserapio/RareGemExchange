import { Link } from 'react-router-dom'
import './GemBreadcrumb.css'

export default function GemBreadcrumb({ gem }) {
  return (
    <nav className="gem-bc" aria-label="Breadcrumb">
      <Link to="/gems" className="gem-bc-link">OUR GEMS</Link>
      <span className="gem-bc-sep">/</span>
      <Link to="/gems" className="gem-bc-link">{gem.category}</Link>
      <span className="gem-bc-sep">/</span>
      <span className="gem-bc-current">{gem.subtitle}</span>
    </nav>
  )
}
