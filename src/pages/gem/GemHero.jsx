import { useState } from 'react'
import './GemHero.css'

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const TruckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

export default function GemHero({ gem }) {
  const [activeThumb, setActiveThumb] = useState(0)
  const [activeImg, setActiveImg] = useState(gem.img)

  const handleThumb = (src, idx) => {
    if (!src) return
    setActiveThumb(idx)
    setActiveImg(src)
  }

  return (
    <div className="gem-hero">
      {/* ── LEFT: media ─────────────────────────────────────── */}
      <div className="gem-hero-media">
        <div className="gem-hero-main-wrap">
          <img src={activeImg} alt={gem.name} className="gem-hero-main-img" />
        </div>

        <div className="gem-hero-thumbs">
          {gem.thumbnails.map((src, i) => (
            <button
              key={i}
              className={`gem-thumb${activeThumb === i ? ' gem-thumb--active' : ''}${!src ? ' gem-thumb--empty' : ''}`}
              onClick={() => handleThumb(src, i)}
              aria-label={src ? `View ${i + 1}` : undefined}
              disabled={!src}
            >
              {src && <img src={src} alt="" className="gem-thumb-img" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── RIGHT: details ──────────────────────────────────── */}
      <div className="gem-hero-details">
        <h1 className="gem-hero-title">{gem.name}</h1>
        <p className="gem-hero-sku">SKU: {gem.sku}</p>

        <div className="gem-hero-price-row">
          <span className="gem-hero-price">{gem.priceDisplay}</span>
          <span className="gem-hero-price-note">{gem.shippingNote}</span>
        </div>

        <p className="gem-hero-desc">{gem.description}</p>

        <div className="gem-hero-actions">
          <button className="gem-btn gem-btn--primary">INQUIRE ABOUT THIS GEM</button>
          <button className="gem-btn gem-btn--secondary">
            <span className="gem-btn-icon" aria-hidden="true">◇</span>
            CONSULT AN EXPERT
          </button>
        </div>

        <div className="gem-hero-links">
          <button className="gem-text-link">
            <ShareIcon /> ADD TO COMPARISON
          </button>
          <button className="gem-text-link">
            ♡ ADD TO WISHLIST
          </button>
        </div>

        <div className="gem-hero-shipping">
          <TruckIcon />
          <div className="gem-hero-shipping-text">
            <span className="gem-hero-shipping-label">SHIPPING ESTIMATE</span>
            <span className="gem-hero-shipping-date">Secure, Insured Delivery to Friday, Nov 5.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
