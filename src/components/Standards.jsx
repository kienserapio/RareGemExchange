import './Standards.css'
import Reveal from './Reveal'

/* ────────────────────────────────────────────────────────────────
   Inline line-art icons — thin, elegant, gold-light via currentColor.
   Rendered at 40px on a 24-unit grid for a hairline 0.9px stroke.
   ──────────────────────────────────────────────────────────────── */

// Forensic Sovereignty → microscope (lab analysis / verification)
const MicroscopeIcon = () => (
  <svg
    className="standards-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 1 0 0-14h-1" />
    <path d="M9 14h2" />
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
  </svg>
)

// Vault Continuity → vault / safe dial (secure custodial storage)
const VaultIcon = () => (
  <svg
    className="standards-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="m7.9 7.9 2.7 2.7" />
    <path d="m13.4 13.4 2.7 2.7" />
    <path d="m7.9 16.1 2.7-2.7" />
    <path d="m13.4 10.6 2.7-2.7" />
  </svg>
)

// Ethical Provenance → scroll / certificate (documented, traceable origin)
const ScrollIcon = () => (
  <svg
    className="standards-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M15 12h-5" />
    <path d="M15 8h-5" />
    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
  </svg>
)

/* The three commitments — copy verbatim from Figma (node 57:522). */
const COMMITMENTS = [
  {
    icon: <MicroscopeIcon />,
    title: 'FORENSIC SOVEREIGNTY',
    body: 'Every stone verified with 12-point forensic analysis and dual-lab certification from GRS and SSEF.',
  },
  {
    icon: <VaultIcon />,
    title: 'VAULT CONTINUITY',
    body: 'Secure, climate-controlled custodial management and high-security logistics for global gemstone holdings.',
  },
  {
    icon: <ScrollIcon />,
    title: 'ETHICAL PROVENANCE',
    body: 'Strict adherence to RJC standards and sustainable sourcing protocols across the entire supply chain.',
  },
]

/**
 * Standards — "OUR STANDARDS" section: three commitment cards.
 * Anchored as #standards for nav links. Header + each card slide up
 * on scroll via <Reveal>, with the cards staggered.
 */
export default function Standards() {
  return (
    <section id="standards" className="standards rg-section">
      {/* Centered header: kicker + serif heading */}
      <Reveal className="standards-header">
        <p className="rg-eyebrow">COMMITMENTS</p>
        <h2 className="rg-heading standards-title">OUR STANDARDS</h2>
      </Reveal>

      {/* 3-up commitment grid (wraps to 2, then stacks to 1) */}
      <div className="standards-grid">
        {COMMITMENTS.map((item, i) => (
          <Reveal
            key={item.title}
            className="standards-cell"
            delay={0.05 + i * 0.1}
          >
            <article className="standards-card">
              <span className="standards-card-icon">{item.icon}</span>
              <h3 className="standards-card-title">{item.title}</h3>
              <p className="standards-card-body">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
