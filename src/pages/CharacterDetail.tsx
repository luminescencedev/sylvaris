import { useParams, Link, useNavigate } from 'react-router-dom'
import { characters, categoryLabels, categoryColors } from '../data/characters'
import { SkinViewer } from '../components/SkinViewer'

export function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
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

      <div className="page-header">
        <div className="page-badge" style={{ color, borderColor: `${color}44`, background: `${color}12` }}>
          {categoryLabels[character.category]}
        </div>
        <h1 className="page-title">{character.firstName} {character.lastName}</h1>
        <p className="page-desc">{character.role}</p>
      </div>

      <div className="char-hero">
        <div className="char-hero-skin">
          <SkinViewer username={character.minecraftUsername} width={160} height={300} animate />
        </div>
        <div className="char-hero-info">
          <div className="props-wrap">
            <table className="props-table">
              <thead>
                <tr>
                  <th>Attribut</th>
                  <th>Valeur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="prop-key">Âge</span></td>
                  <td className="prop-val">{character.age} ans</td>
                </tr>
                <tr>
                  <td><span className="prop-key">Origine</span></td>
                  <td className="prop-val">{character.origin}</td>
                </tr>
                <tr>
                  <td><span className="prop-key">Allégeance</span></td>
                  <td className="prop-val">{character.allegiance}</td>
                </tr>
                {character.minecraftUsername && (
                  <tr>
                    <td><span className="prop-key">Pseudo MC</span></td>
                    <td className="prop-val" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                      {character.minecraftUsername}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 className="section-h2">Histoire</h2>
      <p className="prose">{character.bio}</p>

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
          <p className="prose">{character.details}</p>
        </>
      )}

      <nav className="page-nav" aria-label="Navigation personnages">
        {prev ? (
          <button className="page-nav-link page-nav-link--prev" onClick={() => navigate(`/personnages/${prev.id}`)}>
            <span className="page-nav-dir">← Précédent</span>
            <span className="page-nav-label">{prev.firstName} {prev.lastName}</span>
          </button>
        ) : <span />}
        {next && (
          <button className="page-nav-link page-nav-link--next" onClick={() => navigate(`/personnages/${next.id}`)}>
            <span className="page-nav-dir">Suivant →</span>
            <span className="page-nav-label">{next.firstName} {next.lastName}</span>
          </button>
        )}
      </nav>

    </div>
  )
}
