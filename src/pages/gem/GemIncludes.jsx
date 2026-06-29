import './GemIncludes.css'

const PackagingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

const ShippingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

const CertIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

const INCLUDES = [
  {
    Icon: PackagingIcon,
    title: 'SIGNATURE PACKAGING',
    body: 'Each gem ships in a handcrafted presentation box with velvet lining and a certificate holder, designed to preserve and display your investment.',
  },
  {
    Icon: ShippingIcon,
    title: 'FREE INSURED SHIPPING',
    body: 'All orders include door-to-door insured shipping at no additional cost, with real-time tracking and signature confirmation upon delivery.',
  },
  {
    Icon: CertIcon,
    title: 'CERTIFICATION',
    body: 'Every gem arrives with its original laboratory certificate (GIA, GRS, SSEF, or IGI) and a detailed provenance report for your records.',
  },
]

export default function GemIncludes() {
  return (
    <div className="gem-includes">
      <p className="gem-includes-heading rg-eyebrow">INCLUDED WITH YOUR ORDER</p>
      <div className="gem-includes-grid">
        {INCLUDES.map(({ Icon, title, body }) => (
          <div key={title} className="gem-includes-card">
            <div className="gem-includes-card-visual">
              <span className="gem-includes-icon"><Icon /></span>
            </div>
            <h3 className="gem-includes-title">{title}</h3>
            <p className="gem-includes-body">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
