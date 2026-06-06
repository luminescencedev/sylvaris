import { createContext, useContext, useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { characters, categoryLabels, categoryColors, type CharacterCategory } from '../data/characters'

// ── Sidebar context ────────────────────────────────────────────────

type SidebarCtx = { open: boolean; setOpen: (v: boolean) => void }
const SidebarContext = createContext<SidebarCtx>({ open: false, setOpen: () => {} })

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

function useSidebar() {
  return useContext(SidebarContext)
}

// ── Mobile menu button ─────────────────────────────────────────────

export function MobileMenuButton() {
  const { open, setOpen } = useSidebar()
  return (
    <button
      className="mobile-menu-btn"
      onClick={() => setOpen(!open)}
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={open}
    >
      <span className={`menu-icon${open ? ' menu-icon--open' : ''}`}>
        <svg className="icon-hamburger" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <svg className="icon-close" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
    </button>
  )
}

// ── Sidebar overlay ────────────────────────────────────────────────

export function SidebarOverlay() {
  const { open, setOpen } = useSidebar()
  if (!open) return null
  return <div className="sidebar-overlay" onClick={() => setOpen(false)} aria-hidden="true" />
}

// ── Nav config ─────────────────────────────────────────────────────

const categories: CharacterCategory[] = ['conseil', 'garde', 'artisan', 'erudit', 'diplomate', 'citoyen']

// ── Sidebar ────────────────────────────────────────────────────────

export function Sidebar() {
  const location = useLocation()
  const { open, setOpen } = useSidebar()

  useEffect(() => { setOpen(false) }, [location.pathname, location.search])

  const isCharCat = (cat: CharacterCategory) =>
    location.pathname === '/personnages' &&
    new URLSearchParams(location.search).get('cat') === cat

  const isAllChars =
    location.pathname === '/personnages' &&
    !new URLSearchParams(location.search).get('cat')

  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
      <nav className="sidebar-nav" aria-label="Navigation">

        <div className="sidebar-group">
          <p className="sidebar-group-label">Navigation</p>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/lore"
            className={({ isActive }) => `sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
          >
            Histoire & Lore
          </NavLink>
          <NavLink
            to="/galerie"
            className={({ isActive }) => `sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
          >
            Galerie
          </NavLink>
          <NavLink
            to="/videos"
            className={({ isActive }) => `sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
          >
            Chroniques
          </NavLink>
          <NavLink
            to="/musiques"
            className={({ isActive }) => `sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
          >
            Musiques
          </NavLink>
        </div>

        <div className="sidebar-group">
          <p className="sidebar-group-label">Personnages</p>
          {categories.map(cat => {
            const count = characters.filter(c => c.category === cat).length
            const active = isCharCat(cat)
            return (
              <NavLink
                key={cat}
                to={`/personnages?cat=${cat}`}
                className={`sidebar-item${active ? ' sidebar-item--active' : ''}`}
              >
                {categoryLabels[cat]}
                <span
                  className="sidebar-count"
                  style={{ color: categoryColors[cat], borderColor: `${categoryColors[cat]}44` }}
                >
                  {count}
                </span>
              </NavLink>
            )
          })}
        </div>

        <div className="sidebar-group">
          <NavLink
            to="/personnages"
            end
            className={`sidebar-item${isAllChars ? ' sidebar-item--active' : ''}`}
          >
            Tous les personnages
            <span className="sidebar-count">{characters.length}</span>
          </NavLink>
        </div>

      </nav>
    </aside>
  )
}
