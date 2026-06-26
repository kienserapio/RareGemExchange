import Reveal from './Reveal'
import './Hero.css'

/**
 * Hero — the opening brand lockup. Uses the shared Reveal wrapper so the
 * elements slide up on first paint (and on scroll-back-into-view).
 */
export default function Hero() {
  return (
    <section id="top" className="hero rg-section">
      <Reveal delay={0.05}>
        <img src="/gem logo.png" alt="Rare Gem Exchange" className="hero-logo" />
      </Reveal>

      <Reveal as="h1" delay={0.15} className="hero-heading">
        RARE GEM<br />EXCHANGE
      </Reveal>

      <Reveal delay={0.25} className="hero-divider">
        <span className="hero-divider-line" />
        <span className="hero-divider-diamond">◇</span>
        <span className="hero-divider-line" />
      </Reveal>

      <Reveal as="p" delay={0.35} className="hero-subheading">
        INVESTMENT GRADE GEMSTONES
      </Reveal>

      <Reveal as="p" delay={0.45} className="hero-support">
        FINE GEMS • RARE STONES • GLOBAL TRADING
      </Reveal>

      <Reveal className="hero-cta" delay={0.55}>
        <a href="#our-gems" className="hero-cta-primary">
          Explore the Collection
        </a>
        <a href="#coming-soon" className="hero-cta-secondary">
          Inquire Privately
        </a>
      </Reveal>
    </section>
  )
}
