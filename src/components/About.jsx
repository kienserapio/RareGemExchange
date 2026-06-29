import './About.css'
import Reveal from './Reveal'

/* ════════════════════════════════════════════════════════════════
   About — "The Architects of Rarity"
   Two-column: centered logo lockup (left) + brand copy & expertise
   list (right). Stacks to a single column on tablet / mobile.
   ════════════════════════════════════════════════════════════════ */

/* ── Thin gold line-art icons (20px, inherit color via currentColor) ── */

// Upward trend line + arrow — "investment strategy" / growth.
const StrategyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 17l5-5 4 3 8-8" />
    <path d="M16 4h5v5" />
  </svg>
)

// Globe with meridian — "global sourcing".
const GlobeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9z" />
  </svg>
)

// Scalloped certification seal with a check — "gemological integrity".
const SealIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2.5l2.32 2.37 3.27-.56.48 3.28L21.04 9.06 19.5 12l1.54 2.94-2.97 1.47-.48 3.28-3.27-.56L12 21.5l-2.32-2.37-3.27.56-.48-3.28L2.96 14.94 4.5 12 2.96 9.06l2.97-1.47.48-3.28 3.27.56z" />
    <path d="M8.6 12.2l2.3 2.3 4.5-4.7" />
  </svg>
)

// Expertise rows (verbatim labels).
const EXPERTISE = [
  { Icon: StrategyIcon, label: 'INVESTMENT STRATEGY' },
  { Icon: GlobeIcon, label: 'GLOBAL SOURCING' },
  { Icon: SealIcon, label: 'GUARANTEED QUALITY' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-grid rg-section">
        {/* ── LEFT: centered logo lockup ─────────────────── */}
        <Reveal className="about-lockup" delay={0}>
          <img
            src="/gem logo.png"
            alt="Rare Gem Exchange"
            className="about-logo"
          />
          <h2 className="about-wordmark">
            RARE GEM<br />EXCHANGE
          </h2>
          <div className="about-divider" aria-hidden="true">
            <span className="about-divider-line" />
            <span className="about-divider-diamond">◇</span>
            <span className="about-divider-line" />
          </div>
        </Reveal>

        {/* ── RIGHT: copy + expertise ────────────────────── */}
        <div className="about-content">
          <Reveal as="p" className="about-label" delay={0.1}>
            ABOUT US
          </Reveal>

          <Reveal as="p" className="about-body" delay={0.2}>
            Rare Gem Exchange is a premier destination for the world's most
            beautiful gemstones. We provide collectors and enthusiasts with
            direct access to rare stones, ensuring quality and transparency in
            every transaction. Our mission is simple: to bring the finest gems
            to those who appreciate true rarity.
          </Reveal>

          <Reveal className="about-expertise" delay={0.3}>
            <p className="about-sublabel">Our Expertise</p>
            <ul className="about-list">
              {EXPERTISE.map(({ Icon, label }) => (
                <li key={label} className="about-row">
                  <span className="about-row-icon">
                    <Icon />
                  </span>
                  <span className="about-row-label">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
