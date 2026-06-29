import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getGemById } from '../../data/gems'
import GemBreadcrumb from './GemBreadcrumb'
import GemHero from './GemHero'
import GemSpecs from './GemSpecs'
import GemIncludes from './GemIncludes'
import GemCompare from './GemCompare'
import GemSimilar from './GemSimilar'
import GemLiquidate from './GemLiquidate'
import './GemDetailPage.css'

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export default function GemDetailPage() {
  const { id } = useParams()
  const gem = getGemById(id)

  const [theme, setTheme] = useState('dark')
  const [fading, setFading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const toggleTheme = () => {
    setFading(true)
    setTimeout(() => {
      setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
      setFading(false)
    }, 220)
  }

  if (!gem) {
    return (
      <div className="gem-not-found">
        <h1 className="gem-not-found-title">Gem not found</h1>
        <Link to="/gems" className="gem-not-found-link">← Back to collection</Link>
      </div>
    )
  }

  return (
    <>
      {/* Floating theme toggle — outside rg-section so it's always top-right */}
      <button
        className={`gem-theme-toggle gem-theme-toggle--${theme}`}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        <span className="gem-theme-toggle-label">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      </button>

      <div
        className={`gem-detail gem-detail--${theme}${fading ? ' gem-detail--fading' : ''}`}
      >
        <div className="gem-detail-inner rg-section">
          <GemBreadcrumb gem={gem} />
          <GemHero gem={gem} />
          <GemSpecs gem={gem} />
          <GemIncludes />
          <GemCompare gem={gem} />
          <GemSimilar gem={gem} />
          <GemLiquidate gem={gem} />
        </div>
      </div>
    </>
  )
}
