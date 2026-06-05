import { Link, useLocation } from 'react-router-dom'

export function NotFound() {
  const { pathname } = useLocation()

  return (
    <div className="notfound-page">
      <img src="/screen/sylvaris_logo.png" alt="Sylvaris" className="notfound-logo" />

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
