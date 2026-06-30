import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import './Hero.css'

export default function Hero() {
  const handleInquirePrivately = () => {
    window.dispatchEvent(new CustomEvent('rge:open-intake'))
  }

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
        <Link to="/gems" className="hero-cta-primary">
          Explore the Collection
        </Link>
        <button
          type="button"
          className="hero-cta-secondary"
          onClick={handleInquirePrivately}
        >
          Inquire Privately
        </button>
      </Reveal>
    </section>
  )
}
