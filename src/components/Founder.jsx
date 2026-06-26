import './Founder.css'
import Reveal from './Reveal'

/* ════════════════════════════════════════════════════════════════
   Founder — "MEET THE FOUNDER": estate-style two-column split.
   Left: a hard-edged editorial portrait frame (placeholder plate —
   drop a real <img> in where marked). Right: heritage statement and a
   handwritten rose-gold signature. Anchored #founder.
   ════════════════════════════════════════════════════════════════ */

export default function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="founder-grid rg-section">
        {/* ── LEFT: editorial portrait frame ─────────────── */}
        <Reveal className="founder-portrait-col" delay={0}>
          <figure className="founder-portrait">
            {/*
              Replace this placeholder plate with a real editorial portrait:
              <img src="/founder.jpg" alt="Julien Marchand, Founder" className="founder-photo" />
            */}
            <div className="founder-portrait-plate">
              <span className="founder-monogram">JM</span>
              <span className="founder-portrait-label">Founder &amp; Principal</span>
            </div>
          </figure>
        </Reveal>

        {/* ── RIGHT: heritage statement ──────────────────── */}
        <div className="founder-content">
          <Reveal as="p" className="rg-eyebrow" delay={0.1}>
            OUR HERITAGE
          </Reveal>

          <Reveal as="h2" className="rg-heading founder-title" delay={0.16}>
            MEET THE FOUNDER
          </Reveal>

          <Reveal className="founder-statement" delay={0.24}>
            <p className="founder-para">
              I built Rare Gem Exchange on a simple conviction — that the
              world&rsquo;s finest gems should be sourced with integrity and
              traded in full daylight. Every stone we hold is chosen by hand,
              traced to its origin, and certified before it ever reaches you.
            </p>
            <p className="founder-para">
              For over two decades I have travelled to the mines and cutting
              houses behind the rarest diamonds and colored stones, building
              relationships rooted in fair sourcing and lasting trust. What we
              offer is not a transaction, but a quiet promise: real assets,
              honest provenance, and rarity that endures.
            </p>
          </Reveal>

          <Reveal className="founder-signoff" delay={0.32}>
            <span className="founder-signature">Julien Marchand</span>
            <span className="founder-credit">
              Julien Marchand &middot; Founder &amp; Principal Gemologist
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
