import './Certifications.css'
import Reveal from './Reveal'

/* ════════════════════════════════════════════════════════════════
   Certifications — institutional credibility ribbon.
   Recognized grading laboratories rendered as monochrome, low-opacity
   typographic lockups (abbreviation + full name) that light up on
   hover. No logo files needed; tokens only. Anchored #certifications.
   ════════════════════════════════════════════════════════════════ */

const LABS = [
  { abbr: 'GIA',  name: 'Gemological Institute of America' },
  { abbr: 'GRS',  name: 'GemResearch Swisslab' },
  { abbr: 'SSEF', name: 'Swiss Gemmological Institute' },
  { abbr: 'IGI',  name: 'International Gemological Institute' },
]

export default function Certifications() {
  return (
    <section id="certifications" className="certs">
      <Reveal className="certs-inner rg-section">
        <p className="rg-eyebrow certs-eyebrow">Verified &amp; Certified By</p>

        <ul className="certs-row">
          {LABS.map((lab) => (
            <li key={lab.abbr} className="certs-item">
              <span className="certs-abbr">{lab.abbr}</span>
              <span className="certs-name">{lab.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
