import { useState } from 'react'
import Reveal from './Reveal'
import './Faq.css'

/* ──────────────────────────────────────────────────────────────
   FAQ copy — verbatim from Figma (node 64:280). Questions are kept
   in natural case and uppercased in CSS so the markup stays clean.
   ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Are the gems certified?',
    a: 'Every gemstone in our collection is accompanied by a comprehensive certification from world-renowned laboratories such as GRS or SSEF. This ensures absolute transparency regarding the stone’s origin, treatment status, and investment-grade quality.',
  },
  {
    q: 'Can I request custom sourcing?',
    a: 'Our global network of ethical mines and private collectors allows us to source specific stones tailored to your requirements. Contact our concierge to discuss your specific criteria for color, clarity, and carat weight.',
  },
  {
    q: 'How does pricing work?',
    a: 'Pricing is determined by current market indices for investment-grade colored stones, factoring in rarity and historical auction performance. We provide transparent, competitive valuations based on architectural gemological precision.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'We offer secure, fully insured international shipping via specialized high-value couriers. All shipments are tracked and require white-glove delivery protocols to ensure the safety of your acquisition.',
  },
  {
    q: 'Is investment in gemstones safe?',
    a: 'Rare colored gemstones have historically served as a stable hedge against inflation and market volatility. Our rigorous 12-point authentication process ensures you are acquiring tangible assets with verified provenance and long-term value retention.',
  },
]

/* Plus glyph (two thin strokes). It rotates 45° in CSS when open,
   reading as a × — see Faq.css `.faq-item.is-open .faq-icon-wrap`. */
const PlusIcon = () => (
  <svg
    className="faq-icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <line x1="8" y1="1.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

function Faq() {
  // Single-open accordion: index of the expanded item (first open by default).
  const [openIndex, setOpenIndex] = useState(0)

  // Toggle: clicking the open item closes it; clicking another switches.
  const toggle = (i) => setOpenIndex((current) => (current === i ? null : i))

  return (
    <section id="faq" className="rg-section faq">
      {/* ── Heading ── */}
      <Reveal className="faq-header">
        <span className="rg-eyebrow faq-eyebrow">Concierge Support</span>
        <h2 className="rg-heading faq-heading">Frequently Asked Questions</h2>
      </Reveal>

      {/* ── Accordion list ── */}
      <div className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i
          const btnId = `faq-trigger-${i}`
          const panelId = `faq-panel-${i}`

          return (
            <Reveal
              key={item.q}
              delay={0.08 * (i + 1)}
              className={`faq-item${isOpen ? ' is-open' : ''}`}
            >
              <h3 className="faq-q-heading">
                <button
                  type="button"
                  id={btnId}
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon-wrap">
                    <PlusIcon />
                  </span>
                </button>
              </h3>

              {/* grid-rows trick: 0fr → 1fr for smooth auto-height */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="faq-answer-wrap"
              >
                <div className="faq-answer-inner">
                  <p className="faq-answer">{item.a}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default Faq
