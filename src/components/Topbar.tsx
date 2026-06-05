import { Link } from 'react-router-dom'
import { MobileMenuButton } from './Sidebar'

function SylvarisGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="21" rx="5" fill="#07110a" stroke="#1e3326" strokeWidth="0.75"/>
      <line x1="11" y1="4" x2="11" y2="18" stroke="#c4983c" strokeWidth="0.75" opacity="0.45"/>
      <line x1="4" y1="11" x2="18" y2="11" stroke="#c4983c" strokeWidth="0.75" opacity="0.45"/>
      <rect x="8.5" y="8.5" width="5" height="5" rx="0.5" transform="rotate(45 11 11)" fill="none" stroke="#c4983c" strokeWidth="0.9" opacity="0.8"/>
      <circle cx="11" cy="11" r="1.2" fill="#c4983c" opacity="0.9"/>
    </svg>
  )
}

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">

        <div className="topbar-left">
          <MobileMenuButton />
          <Link to="/" className="topbar-logo">
            <SylvarisGlyph />
            <div className="topbar-brand-block">
              <span className="topbar-brand">Sylvaris</span>
              <span className="topbar-sub">Bibliothèque</span>
            </div>
          </Link>
        </div>

        <div className="topbar-right">
          <span className="topbar-server">
            <span className="topbar-server-dot" />
            KCRP
          </span>
        </div>

      </div>
    </header>
  )
}
