import './GemLiquidate.css'

export default function GemLiquidate({ gem }) {
  return (
    <div className="gem-liq">
      {/* Centered content */}
      <div className="gem-liq-content">
        <p className="gem-liq-eyebrow">PRIVATE PLACEMENT SERVICES</p>
        <h2 className="gem-liq-title">
          PRIVATE<br />PLACEMENT<br />SERVICES
        </h2>
        <p className="gem-liq-body">
          Our global network provides exclusive access to qualified collectors
          and institutional investors for high-net-worth individuals looking to
          place or acquire exceptional gemstones through private advisory.
        </p>
        <button className="gem-liq-btn">INQUIRE ABOUT SERVICES</button>
      </div>
    </div>
  )
}
