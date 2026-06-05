import { Link } from 'react-router-dom'
import { MobileMenuButton } from './Sidebar'

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">

        <div className="topbar-left">
          <MobileMenuButton />
          <Link to="/" className="topbar-logo">
            <img
              src="/screen/sylvaris_logo.png"
              alt="Sylvaris"
              className="topbar-logo-img"
            />
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
