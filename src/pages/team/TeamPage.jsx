import { useEffect } from 'react'
import Reveal from '../../components/Reveal'
import './TeamPage.css'

/* The first entry is the original "MEET THE FOUNDER" section, reused verbatim
   from the homepage; the rest are additional team members in the same design. */
const TEAM = [
  {
    initials: 'JM',
    eyebrow: 'OUR HERITAGE',
    heading: 'MEET THE FOUNDER',
    title: 'Founder & Principal Gemologist',
    bio: [
      'I built Rare Gem Exchange on a simple conviction — that the world\'s finest gems should be sourced with integrity and traded in full daylight. Every stone we hold is chosen by hand, traced to its origin, and certified before it ever reaches you.',
      'For over two decades I have travelled to the mines and cutting houses behind the rarest diamonds and colored stones, building relationships rooted in fair sourcing and lasting trust. What we offer is not a transaction, but a quiet promise: real assets, honest provenance, and rarity that endures.',
    ],
    signature: 'Julien Marchand',
    credit: 'Julien Marchand · Founder & Principal Gemologist',
  },
  {
    initials: 'SC',
    eyebrow: 'OUR TEAM',
    heading: 'MEET SOPHIE',
    title: 'Head of Procurement & Gemstone Sourcing',
    bio: [
      'With fifteen years of field experience across the gem markets of Bangkok, Colombo, and Antwerp, Sophie brings an unmatched depth of sourcing expertise to Rare Gem Exchange. Her relationships with certified cutters and ethical miners ensure every stone that enters our inventory meets the highest standards of provenance and quality.',
      'Sophie leads our procurement process from mine to market — evaluating rough material, overseeing precision cutting, and managing independent laboratory certification before any stone is presented to clients. Her dedication to transparency is the foundation of our clients\' trust.',
    ],
    signature: 'Sophie Chen',
    credit: 'Sophie Chen · Head of Procurement & Gemstone Sourcing',
  },
]

function TeamCard({ member }) {
  return (
    <div className="team-card">
      {/* ── LEFT: editorial portrait frame ─────────────── */}
      <Reveal className="team-portrait-col" delay={0}>
        <figure className="team-portrait">
          <div className="team-portrait-plate">
            <span className="team-monogram">{member.initials}</span>
            <span className="team-portrait-label">{member.title}</span>
          </div>
        </figure>
      </Reveal>

      {/* ── RIGHT: heritage statement ──────────────────── */}
      <div className="team-content">
        <Reveal as="p" className="rg-eyebrow" delay={0.1}>
          {member.eyebrow}
        </Reveal>

        <Reveal as="h2" className="rg-heading team-name" delay={0.16}>
          {member.heading}
        </Reveal>

        <Reveal className="team-bio" delay={0.24}>
          {member.bio.map((para, i) => (
            <p key={i} className="team-para">{para}</p>
          ))}
        </Reveal>

        <Reveal className="team-signoff" delay={0.32}>
          <span className="team-signature">{member.signature}</span>
          <span className="team-credit">{member.credit}</span>
        </Reveal>
      </div>
    </div>
  )
}

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="team-page">
      <div className="rg-section">
        <Reveal className="team-page-header">
          <p className="rg-eyebrow">OUR PEOPLE</p>
          <h1 className="rg-heading team-page-title">MEET THE TEAM</h1>
          <p className="team-page-sub">
            The people behind every stone — trusted specialists with decades of
            combined expertise in fine gemstones, ethical sourcing, and investment-grade collecting.
          </p>
        </Reveal>

        <div className="team-list">
          {TEAM.map((member) => (
            <TeamCard key={member.signature} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
