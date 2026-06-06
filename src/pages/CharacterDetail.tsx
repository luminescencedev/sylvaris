import { useParams, Link } from 'react-router-dom'
import { characters, categoryLabels, categoryColors } from '../data/characters'
import { SkinViewer } from '../components/SkinViewer'

export function CharacterDetail() {
  const { id } = useParams()
  const idx = characters.findIndex(c => c.id === id)
  const character = idx !== -1 ? characters[idx] : null

  const prev = idx > 0 ? characters[idx - 1] : null
  const next = idx < characters.length - 1 ? characters[idx + 1] : null

  if (!character) {
    return (
      <div className="not-found">
        <div className="not-found-inner">
          <span className="not-found-code">404</span>
          <div className="not-found-divider" />
          <div className="not-found-body">
            <p className="not-found-title">Personnage introuvable</p>
            <p className="not-found-desc">Ce personnage n'existe pas dans les archives.</p>
            <Link to="/personnages" className="not-found-btn" style={{ marginTop: 8 }}>
              ← Retour aux personnages
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const color = categoryColors[character.category]

  return (
    <div className="docs-page">

      <div className="char-hero">
        <div className="char-hero-skin">
          <span className="char-hero-badge" style={{ color, borderColor: color + '40', background: color + '12' }}>
            {categoryLabels[character.category]}
          </span>
          <SkinViewer username={character.minecraftUsername} width={260} height={500} animate />
        </div>

        <div className="char-hero-info">
          <h1 className="char-hero-name">{character.firstName} {character.lastName}</h1>
          <p className="char-hero-role">{character.role}</p>

          <div className="char-attrs" style={{ '--attr-color': color } as React.CSSProperties}>
            <div className="char-attr">
              <span className="char-attr-key">Âge</span>
              <span className="char-attr-val">{character.age} ans</span>
            </div>
            <div className="char-attr">
              <span className="char-attr-key">Origine</span>
              <span className="char-attr-val">{character.origin}</span>
            </div>
            <div className="char-attr">
              <span className="char-attr-key">Allégeance</span>
              <span className="char-attr-val">{character.allegiance}</span>
            </div>
            {character.minecraftUsername && (
              <div className="char-attr">
                <span className="char-attr-key">Pseudo MC</span>
                <span className="char-attr-val char-attr-mono">{character.minecraftUsername}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <h2 className="section-h2">Histoire</h2>
      <div className="prose">
        {character.bio.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {character.goals.length > 0 && (
        <>
          <h2 className="section-h2">Objectifs & Ambitions</h2>
          <ul className="feature-list">
            {character.goals.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </>
      )}

      {character.details && (
        <>
          <h2 className="section-h2">Autres informations</h2>
          <div className="prose">
            {character.details.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </>
      )}

      <nav className="page-nav" aria-label="Navigation personnages">
        {prev ? (
          <Link to={`/personnages/${prev.id}`} className="page-nav-link page-nav-link--prev">
            <span className="page-nav-dir">← Précédent</span>
            <span className="page-nav-label">{prev.firstName} {prev.lastName}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/personnages/${next.id}`} className="page-nav-link page-nav-link--next">
            <span className="page-nav-dir">Suivant →</span>
            <span className="page-nav-label">{next.firstName} {next.lastName}</span>
          </Link>
        )}
      </nav>

    </div>
  )
}
