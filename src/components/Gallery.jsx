import './Gallery.css'
import Reveal from './Reveal'

/* ════════════════════════════════════════════════════════════════
   Gallery — "THE COLLECTION": a curated preview grid of rare stones.
   Each card is a sharp (0px-radius) rectangle: a faceted gem plate on
   top, a clean technical subtitle below (name · carat · origin) and a
   monochrome lab tag that lights up on hover. Anchored #our-gems.

   Gem colors are passed per-card as CSS custom properties (--gem /
   --gem-2) so a single .gallery-media rule renders every stone.
   ════════════════════════════════════════════════════════════════ */

const GEMS = [
  { name: 'Blue Sapphire',  spec: '5.1 ct · Ceylon',       cert: 'GRS',  gem: '#1d3f8f', gem2: '#3f73d6' },
  { name: 'Emerald',        spec: '4.2 ct · Colombia',     cert: 'GIA',  gem: '#0d6b4d', gem2: '#19a473' },
  { name: 'Pink Diamond',   spec: '1.8 ct · Fancy Vivid',  cert: 'GIA',  gem: '#c07f97', gem2: '#f0c2d4' },
  { name: 'Ruby',           spec: '3.4 ct · Burma',        cert: 'SSEF', gem: '#8e1b2e', gem2: '#d6394f' },
  { name: 'Yellow Diamond', spec: '6.0 ct · Fancy Vivid',  cert: 'GIA',  gem: '#b3851d', gem2: '#f0c84a' },
  { name: 'Pink Sapphire',  spec: '2.6 ct · Ceylon',       cert: 'SSEF', gem: '#a83768', gem2: '#d96a96' },
]

export default function Gallery() {
  return (
    <section id="our-gems" className="gallery rg-section">
      <Reveal className="gallery-header">
        <p className="rg-eyebrow">THE COLLECTION</p>
        <h2 className="rg-heading gallery-title">FEATURED RARE GEMS</h2>
        <p className="gallery-sub">
          A private selection of exceptional stones — each individually
          sourced, certified, and held in vault.
        </p>
      </Reveal>

      <div className="gallery-grid">
        {GEMS.map((g, i) => (
          <Reveal
            key={g.name}
            className="gallery-cell"
            delay={0.05 + (i % 3) * 0.08}
          >
            <article className="gallery-card">
              <div
                className="gallery-media"
                style={{ '--gem': g.gem, '--gem-2': g.gem2 }}
              >
                <span className="gallery-facet" aria-hidden="true" />
                <span className="gallery-tag">{g.cert} Certified</span>
                <span className="gallery-cta-hint">View Details</span>
              </div>
              <div className="gallery-info">
                <h3 className="gallery-name">{g.name}</h3>
                <p className="gallery-spec">{g.spec}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="gallery-foot" delay={0.1}>
        <a href="#coming-soon" className="gallery-foot-btn">
          Explore the Full Collection
        </a>
      </Reveal>
    </section>
  )
}
