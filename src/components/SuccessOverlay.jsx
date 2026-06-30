import { useEffect, useState } from 'react'
import './SuccessOverlay.css'

export default function SuccessOverlay({ title, subtitle, onDone }) {
  const [out, setOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 2200)
    const t2 = setTimeout(() => onDone?.(), 2800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // Run the timed sequence once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`sov-backdrop${out ? ' sov-backdrop--out' : ''}`}>
      <div className="sov-card">
        <div className="sov-icon">
          <svg viewBox="0 0 52 52" className="sov-svg" aria-hidden="true">
            <circle className="sov-circle" cx="26" cy="26" r="24" />
            <path className="sov-tick" d="M15 26l8 9 14-16" />
          </svg>
        </div>
        <h3 className="sov-title">{title}</h3>
        {subtitle && <p className="sov-sub">{subtitle}</p>}
      </div>
    </div>
  )
}
