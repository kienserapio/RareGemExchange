import { Link } from 'react-router-dom'
import './GemCompare.css'

export default function GemCompare({ gem }) {
  const { compare } = gem
  const titleLines = compare.title.split('\n')

  return (
    <div className="gem-compare">
      {/* Left: heading + description */}
      <div className="gem-compare-left">
        <h2 className="gem-compare-title">
          {titleLines.map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h2>
        <p className="gem-compare-desc">{compare.description}</p>
      </div>

      {/* Right: comparison table */}
      <div className="gem-compare-table">
        {/* YOUR GEM (current, highlighted) */}
        <div className="gem-compare-col gem-compare-col--current">
          <div className="gem-compare-col-img-wrap">
            <img src={compare.yourGem.img} alt="Your gem" className="gem-compare-col-img" />
          </div>
          <div className="gem-compare-col-badge gem-compare-col-badge--current">
            {compare.yourGem.label}
          </div>
          <div className="gem-compare-rows">
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">PRICE</span>
              <span className="gem-compare-row-val">{compare.yourGem.price}</span>
            </div>
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">COLOR GRADE</span>
              <span className="gem-compare-row-val">{compare.yourGem.colorGrade}</span>
            </div>
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">CLARITY</span>
              <span className="gem-compare-row-val">{compare.yourGem.clarity}</span>
            </div>
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">CUT</span>
              <span className="gem-compare-row-val">{compare.yourGem.cut}</span>
            </div>
          </div>
        </div>

        {/* ROW LABELS (center) */}

        {/* ALTERNATIVE */}
        <div className="gem-compare-col gem-compare-col--alt">
          <div className="gem-compare-col-img-wrap">
            <img src={compare.alternative.img} alt="Alternative gem" className="gem-compare-col-img" />
            <div className="gem-compare-overlay" />
          </div>
          <div className="gem-compare-col-badge">
            {compare.alternative.label}
          </div>
          <div className="gem-compare-rows">
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">PRICE</span>
              <span className="gem-compare-row-val">
                {compare.alternative.price}
                {compare.alternative.priceDiff && (
                  <span className="gem-compare-diff">{compare.alternative.priceDiff}</span>
                )}
              </span>
            </div>
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">COLOR GRADE</span>
              <span className="gem-compare-row-val">{compare.alternative.colorGrade}</span>
            </div>
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">CLARITY</span>
              <span className="gem-compare-row-val">{compare.alternative.clarity}</span>
            </div>
            <div className="gem-compare-row">
              <span className="gem-compare-row-label">CUT</span>
              <span className="gem-compare-row-val">{compare.alternative.cut}</span>
            </div>
          </div>
          {compare.alternative.linkId ? (
            <Link to={`/gems/${compare.alternative.linkId}`} className="gem-compare-view-btn">
              VIEW GEM
            </Link>
          ) : (
            <button className="gem-compare-view-btn">VIEW GEM</button>
          )}
        </div>
      </div>
    </div>
  )
}
