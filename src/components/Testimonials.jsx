import './Testimonials.css'
import Reveal from './Reveal'

/* ────────────────────────────────────────────────────────────────
   Decorative opening-quote glyph — gold, sits at the top-left of
   each testimonial card. Sized via CSS; colored with currentColor.
   (Remix "double-quotes-l" line — clean, recognizable "66" mark.)
   ──────────────────────────────────────────────────────────────── */
const QuoteMark = () => (
  <svg
    className="testi-quote-mark"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
)

/* ────────────────────────────────────────────────────────────────
   Endorsements. First two quotes are verbatim from Figma (57:557);
   the remaining three are on-brand additions so the marquee loops
   with enough cards to read as continuous.
   ──────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      'The level of forensic detail provided by Estate Exchange is unprecedented. They are setting a new architectural standard for how high-value gemstones should be traded and documented.',
    name: 'Dr. Elara Vance',
    role: 'Senior Gemologist, Lucerne Institute',
  },
  {
    quote:
      'As a collector, trust is my primary currency. Their commitment to provenance and the transparency of their vault operations makes them our primary partner for rare acquisitions.',
    name: 'Marcus Thorne',
    role: 'Institutional Collector & Portfolio Manager',
  },
  {
    quote:
      'Every stone arrives with a chain of custody so meticulous it reads like a museum dossier. They have quietly redefined what due diligence means at this tier of the market.',
    name: 'Isabelle Chen',
    role: 'Director of Acquisitions, Meridian House',
  },
  {
    quote:
      'I have appraised estate collections for three decades and never encountered documentation this rigorous. Their vault has become the benchmark the rest of the trade is measured against.',
    name: 'Laurent Dubois',
    role: 'Master Appraiser, Geneva Gem Council',
  },
  {
    quote:
      'Provenance is everything in coloured stones. The integrity of their grading and the clarity of their sourcing gave our fund the confidence to allocate at institutional scale.',
    name: 'Priya Raghunathan',
    role: 'Head of Tangible Assets, Ashworth Capital',
  },
]

/* A single endorsement card — quote glyph, italic quote, bordered footer. */
function TestimonialCard({ quote, name, role }) {
  return (
    <article className="testi-card">
      <QuoteMark />
      <p className="testi-quote">&ldquo;{quote}&rdquo;</p>
      <footer className="testi-foot">
        <p className="testi-name">{name}</p>
        <p className="testi-role">{role}</p>
      </footer>
    </article>
  )
}

/**
 * Testimonials — "INDUSTRY ENDORSEMENTS" section.
 *
 * Centered header (Reveal-animated) over an infinite, continuously
 * looping marquee of endorsement cards. The card list is rendered
 * twice back-to-back inside the track; a CSS keyframe slides the track
 * by exactly one set (translateX 50%) on a linear infinite loop, so the
 * seam is invisible. Pauses on hover; honors prefers-reduced-motion
 * (auto-scroll off, single set, horizontal drag-scroll instead).
 */
export default function Testimonials() {
  return (
    <section id="endorsements" className="testi">
      {/* Centered header: kicker + large serif heading */}
      <Reveal className="testi-header rg-section">
        <p className="rg-eyebrow">VOICES OF AUTHORITY</p>
        <h2 className="rg-heading testi-title">INDUSTRY ENDORSEMENTS</h2>
      </Reveal>

      {/* Infinite marquee — edge fades applied via CSS mask on the viewport */}
      <div
        className="testi-marquee"
        role="region"
        aria-label="Industry endorsements carousel"
      >
        <div className="testi-track">
          {/* Primary, readable set */}
          <div className="testi-set">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
          {/* Duplicate set — purely visual, hidden from assistive tech */}
          <div className="testi-set" aria-hidden="true">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={`${t.name}-dup`} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
