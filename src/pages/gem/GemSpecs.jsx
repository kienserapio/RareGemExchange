import './GemSpecs.css'

function SpecColumn({ title, rows }) {
  return (
    <div className="gem-specs-col">
      <h3 className="gem-specs-col-title">{title}</h3>
      <div className="gem-specs-rows">
        {rows.map(({ label, value }) => (
          <div key={label} className="gem-specs-row">
            <span className="gem-specs-label">{label}</span>
            <span className="gem-specs-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GemSpecs({ gem }) {
  const { gemstoneInfo, precision, dimensions } = gem.specs
  return (
    <div className="gem-specs">
      <p className="gem-specs-eyebrow rg-eyebrow">GEMSTONE DETAILS</p>
      <div className="gem-specs-grid">
        <SpecColumn title="GEMSTONE INFORMATION" rows={gemstoneInfo} />
        <SpecColumn title="PRECISION &amp; QUALITY" rows={precision} />
        <SpecColumn title="PHYSICAL DIMENSIONS" rows={dimensions} />
      </div>
    </div>
  )
}
