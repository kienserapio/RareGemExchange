import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { getSimilarGems } from '../../data/gems'
import './GemSimilar.css'

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function GemSimilar({ gem }) {
  const trackRef = useRef(null)
  const similar = getSimilarGems(gem)

  const scroll = (dir) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.gem-similar-card')
    const w = card ? card.offsetWidth + 24 : 300
    trackRef.current.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <div className="gem-similar">
      <div className="gem-similar-header">
        <div>
          <p className="gem-similar-eyebrow rg-eyebrow">CURATION</p>
          <h2 className="gem-similar-title">SIMILAR GEMS</h2>
        </div>
        <div className="gem-similar-nav">
          <button className="gem-similar-nav-btn" onClick={() => scroll(-1)} aria-label="Previous gems">
            <ChevronLeft />
          </button>
          <button className="gem-similar-nav-btn" onClick={() => scroll(1)} aria-label="Next gems">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="gem-similar-track" ref={trackRef}>
        {similar.map((s) => (
          <Link key={s.id} to={`/gems/${s.id}`} className="gem-similar-card">
            <div className="gem-similar-img-wrap">
              <img src={s.img} alt={s.shortName} className="gem-similar-img" />
            </div>
            <div className="gem-similar-info">
              <p className="gem-similar-cat">{s.shortName.toUpperCase()}</p>
              <h3 className="gem-similar-name">{s.subtitle}</h3>
              <p className="gem-similar-cut">{s.cut}</p>
              <div className="gem-similar-footer">
                <span className="gem-similar-price">{s.priceDisplay.split('.')[0]}</span>
                <span className="gem-similar-clarity">
                  {s.specs.gemstoneInfo.find(r => r.label === 'Clarity')?.value} /&nbsp;
                  {s.specs.precision.find(r => r.label === 'Treatment')?.value?.split(' ')[0]}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
