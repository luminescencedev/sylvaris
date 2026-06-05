import { Link, useLocation } from 'react-router-dom'

export function NotFound() {
  const { pathname } = useLocation()

  return (
    <div className="notfound-page">
      <div className="notfound-glyph" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#c4983c" strokeWidth="1" opacity="0.2"/>
          <line x1="32" y1="4" x2="32" y2="10" stroke="#c4983c" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
          <line x1="32" y1="54" x2="32" y2="60" stroke="#c4983c" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
          <line x1="4" y1="32" x2="10" y2="32" stroke="#c4983c" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
          <line x1="54" y1="32" x2="60" y2="32" stroke="#c4983c" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
          <path d="M32 32 C 27 25, 20 19, 18 11" stroke="#c4983c" strokeWidth="2.2" fill="none" opacity="0.6" strokeLinecap="round"/>
          <path d="M32 32 C 37 25, 44 19, 46 11" stroke="#c4983c" strokeWidth="2.2" fill="none" opacity="0.6" strokeLinecap="round"/>
          <line x1="32" y1="11" x2="32" y2="6" stroke="#c4983c" strokeWidth="2.2" strokeLinecap="round" opacity="0.6"/>
          <line x1="32" y1="32" x2="32" y2="50" stroke="#c4983c" strokeWidth="2.2" strokeLinecap="round" opacity="0.55"/>
          <path d="M32 50 C 28 53, 24 55, 22 58" stroke="#c4983c" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.35"/>
          <path d="M32 50 C 36 53, 40 55, 42 58" stroke="#c4983c" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.35"/>
          <rect x="29" y="29" width="6" height="6" rx="0.5" transform="rotate(45 32 32)" fill="#0d1a10" stroke="#c4983c" strokeWidth="1.6" opacity="0.85"/>
          <circle cx="32" cy="32" r="2" fill="#c4983c" opacity="0.9"/>
        </svg>
      </div>

      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page introuvable</h1>
      <p className="notfound-desc">
        L'archive <span className="notfound-path">{pathname}</span> n'existe pas dans la Bibliothèque de Sylvaris.
      </p>

      <div className="notfound-actions">
        <Link to="/" className="notfound-btn notfound-btn--primary">
          ← Retour à l'accueil
        </Link>
        <Link to="/personnages" className="notfound-btn">
          Voir les personnages
        </Link>
        <Link to="/lore" className="notfound-btn">
          Lire le lore
        </Link>
      </div>
    </div>
  )
}
