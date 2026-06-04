import { Link } from 'react-router-dom'
import { MobileMenuButton } from './Sidebar'

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <MobileMenuButton />
          <Link to="/" className="topbar-logo">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect width="16" height="16" rx="3" fill="#0b1910" stroke="#1e3326" strokeWidth="1"/>
              <text x="3" y="12" fontSize="10" fill="#c4983c">✦</text>
            </svg>
            <span className="topbar-brand">Sylvaris</span>
            <span className="topbar-version">Bibliothèque</span>
          </Link>
        </div>
        <div className="topbar-right">
          <span className="topbar-badge">Cité Elfique</span>
        </div>
      </div>
    </header>
  )
}
