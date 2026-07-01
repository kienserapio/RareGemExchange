import { Link } from 'react-router-dom'
import './Gallery.css'
import Reveal from './Reveal'

const GEMS = [
  {
    id: 'rare-ruby',
    name: 'Rare Ruby',
    spec: 'Cushion Cut • Vivid Red',
    img: '/rare-ruby.jpg',
  },
  {
    id: 'pink-diamond',
    name: 'Pink Diamond',
    spec: 'Radiant Cut • Natural Fancy',
    img: '/pink-diamond.jpg',
  },
  {
    id: 'yellow-diamond',
    name: 'Yellow Diamond',
    spec: 'Pear Shape • Brilliant Cut',
    img: '/yellow-diamond.jpg',
  },
]

export default function Gallery() {
  return (
    <section id="our-gems" className="gallery rg-section">
      <Reveal className="gallery-header">
        <div className="gallery-header-text">
          <p className="rg-eyebrow">OUR COLLECTION</p>
          <h2 className="rg-heading gallery-title">FEATURED GEMS</h2>
        </div>
        <Link to="/gems" className="gallery-cta">
          View Full Collection
        </Link>
      </Reveal>

      <div className="gallery-grid">
        {GEMS.map((g, i) => (
          <Reveal key={g.name} className="gallery-cell" delay={0.05 + i * 0.08}>
            <Link to={`/gems/${g.id}`} className="gallery-card">
              <div className="gallery-media">
                <img src={g.img} alt={g.name} className="gallery-photo" />
              </div>
              <div className="gallery-info">
                <h3 className="gallery-name">{g.name}</h3>
                <p className="gallery-spec">{g.spec}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
