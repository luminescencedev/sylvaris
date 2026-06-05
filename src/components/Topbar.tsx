import { Link } from 'react-router-dom'
import { MobileMenuButton } from './Sidebar'

function SylvarisGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="27" height="27" rx="7" fill="#09140b" stroke="#1c3020" strokeWidth="0.75"/>

      {/* outer ring */}
      <circle cx="14" cy="14" r="10.5" stroke="#c4983c" strokeWidth="0.5" opacity="0.2"/>

      {/* cardinal ticks */}
      <line x1="14" y1="2.5" x2="14" y2="4.5" stroke="#c4983c" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
      <line x1="14" y1="23.5" x2="14" y2="25.5" stroke="#c4983c" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
      <line x1="2.5" y1="14" x2="4.5" y2="14" stroke="#c4983c" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
      <line x1="23.5" y1="14" x2="25.5" y2="14" stroke="#c4983c" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>

      {/* diagonal dots */}
      <circle cx="6.5" cy="6.5" r="0.85" fill="#c4983c" opacity="0.28"/>
      <circle cx="21.5" cy="6.5" r="0.85" fill="#c4983c" opacity="0.28"/>
      <circle cx="6.5" cy="21.5" r="0.85" fill="#c4983c" opacity="0.28"/>
      <circle cx="21.5" cy="21.5" r="0.85" fill="#c4983c" opacity="0.28"/>

      {/* main branches */}
      <path d="M14 14 C 11.5 11.5, 8.5 9.5, 7.5 6.5" stroke="#c4983c" strokeWidth="1.1" fill="none" opacity="0.82" strokeLinecap="round"/>
      <path d="M14 14 C 16.5 11.5, 19.5 9.5, 20.5 6.5" stroke="#c4983c" strokeWidth="1.1" fill="none" opacity="0.82" strokeLinecap="round"/>

      {/* crown tip */}
      <line x1="14" y1="6.5" x2="14" y2="4.5" stroke="#c4983c" strokeWidth="1.1" opacity="0.8" strokeLinecap="round"/>

      {/* secondary branches */}
      <path d="M11.5 11 C 10 9.8, 8.8 9.2, 8 8" stroke="#c4983c" strokeWidth="0.75" fill="none" opacity="0.45" strokeLinecap="round"/>
      <path d="M16.5 11 C 18 9.8, 19.2 9.2, 20 8" stroke="#c4983c" strokeWidth="0.75" fill="none" opacity="0.45" strokeLinecap="round"/>

      {/* trunk */}
      <line x1="14" y1="14" x2="14" y2="21" stroke="#c4983c" strokeWidth="1.1" opacity="0.75" strokeLinecap="round"/>

      {/* roots */}
      <path d="M14 21 C 12 22.2, 10.5 23, 9.5 24" stroke="#c4983c" strokeWidth="0.85" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M14 21 C 16 22.2, 17.5 23, 18.5 24" stroke="#c4983c" strokeWidth="0.85" fill="none" opacity="0.4" strokeLinecap="round"/>

      {/* center diamond */}
      <rect x="12.2" y="12.2" width="3.6" height="3.6" rx="0.35" transform="rotate(45 14 14)" fill="#09140b" stroke="#c4983c" strokeWidth="0.85" opacity="0.88"/>

      {/* center gem */}
      <circle cx="14" cy="14" r="1.1" fill="#c4983c" opacity="0.97"/>
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
