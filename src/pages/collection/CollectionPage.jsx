import { Link } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { GEMS } from '../../data/gems'
import Reveal from '../../components/Reveal'
import './CollectionPage.css'

const CATEGORIES = ['DIAMOND', 'RUBY', 'SAPPHIRE']

const CT_RANGES = [
  { label: 'All Sizes', value: '' },
  { label: 'Under 3 ct', value: '<3' },
  { label: '3 – 4.5 ct', value: '3-4.5' },
  { label: 'Over 4.5 ct', value: '>4.5' },
]

function getCarats(gem) {
  return parseFloat(gem.subtitle)
}

function matchesCt(gem, range) {
  if (!range) return true
  const ct = getCarats(gem)
  if (range === '<3') return ct < 3
  if (range === '3-4.5') return ct >= 3 && ct <= 4.5
  if (range === '>4.5') return ct > 4.5
  return true
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

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
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [ctRange, setCtRange] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return GEMS.filter((gem) => {
      if (q) {
        const hit =
          gem.name.toLowerCase().includes(q) ||
          gem.category.toLowerCase().includes(q) ||
          gem.cut.toLowerCase().includes(q) ||
          gem.shortName.toLowerCase().includes(q)
        if (!hit) return false
      }
      if (category && gem.category !== category) return false
      if (!matchesCt(gem, ctRange)) return false
      return true
    })
  }, [search, category, ctRange])

  const clearAll = () => {
    setSearch('')
    setCategory('')
    setCtRange('')
  }

  const hasFilters = search || category || ctRange

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

        {/* ── Search & Filters ─────────────────────────── */}
        <div className="col-filters">
          <div className="col-search-wrap">
            <span className="col-search-icon" aria-hidden="true"><SearchIcon /></span>
            <input
              type="search"
              className="col-search"
              placeholder="Search by name, type, or cut…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search gems"
            />
          </div>

          <div className="col-filter-row">
            <div className="col-filter-group">
              <span className="col-filter-label">Category</span>
              <div className="col-pills">
                <button
                  type="button"
                  className={`col-pill${!category ? ' col-pill--active' : ''}`}
                  onClick={() => setCategory('')}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`col-pill${category === cat ? ' col-pill--active' : ''}`}
                    onClick={() => setCategory(cat === category ? '' : cat)}
                  >
                    {cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-filter-group">
              <span className="col-filter-label">Carat Weight</span>
              <div className="col-pills">
                {CT_RANGES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    className={`col-pill${ctRange === r.value ? ' col-pill--active' : ''}`}
                    onClick={() => setCtRange(r.value)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button type="button" className="col-clear-btn" onClick={clearAll}>
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ── Results ──────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="col-grid">
            {filtered.map((gem, i) => (
              <GemCard key={gem.id} gem={gem} index={i} />
            ))}
          </div>
        ) : (
          <div className="col-empty">
            <p className="col-empty-text">No gems match your current filters.</p>
            <button type="button" className="col-empty-reset" onClick={clearAll}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
