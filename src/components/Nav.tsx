import { NavLink } from 'react-router-dom'
import './Nav.css'

const links = [
  { to: '/', label: 'Accueil', exact: true },
  { to: '/personnages', label: 'Personnages' },
  { to: '/lore', label: 'Lore' },
  { to: '/videos', label: 'Chroniques' },
]

export function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        <span className="nav-logo-main">Sylvaris</span>
        <span className="nav-logo-sub">Bibliothèque</span>
      </NavLink>
      <ul className="nav-links">
        {links.map(({ to, label, exact }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={exact}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
