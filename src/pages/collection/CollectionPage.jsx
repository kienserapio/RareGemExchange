import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { GEMS } from '../../data/gems'
import Reveal from '../../components/Reveal'
import './CollectionPage.css'

function GemCard({ gem, index }) {
  return (
    <Reveal className="col-card-cell" delay={0.04 + (index % 3) * 0.07}>
      <Link to={`/gems/${gem.id}`} className="col-card">
        <div className="col-card-media">
          <img src={gem.img} alt={gem.shortName} className="col-card-photo" />
        </div>
        <div className="col-card-info">
          <h3 className="col-card-name">{gem.name}</h3>
          <p className="col-card-spec">{gem.cut} • {gem.subtitle.split('CT')[0]}CT</p>
        </div>
      </Link>
    </Reveal>
  )
}

export default function CollectionPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="col-page">
      <div className="rg-section">
        <Reveal className="col-header">
          <p className="rg-eyebrow">OUR COLLECTION</p>
          <h1 className="rg-heading col-title">ALL GEMS</h1>
          <p className="col-sub">
            Every stone individually sourced, certified by a leading laboratory,
            and offered with complete transparency.
          </p>
        </Reveal>

        <div className="col-grid">
          {GEMS.map((gem, i) => (
            <GemCard key={gem.id} gem={gem} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
