import { Link } from 'react-router-dom'
import { characters, categoryLabels, categoryColors } from '../data/characters'
import { CharacterCard } from '../components/CharacterCard'

const featured = characters.filter(c =>
  ['mina-vaelith', 'lunaris-eldenar', 'dwena-drathmir'].includes(c.id)
)

export function Home() {
  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Bienvenue</div>
        <h1 className="page-title">Bibliothèque de Sylvaris</h1>
        <p className="page-desc">
          Archives de la cité elfique — personnages, histoire et chroniques du royaume de Sylvaris,
          fondé au cœur des nouvelles terres par ceux qui refusèrent de reproduire les erreurs du passé.
        </p>
      </div>

      <div className="stat-row">
        <div className="stat-item">
          <span className="stat-num">{characters.length}</span>
          <span className="stat-label">Habitants</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{characters.filter(c => c.originType === 'pur-sang-elf').length}</span>
          <span className="stat-label">Elfes</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{characters.filter(c => c.category === 'conseil').length}</span>
          <span className="stat-label">Conseil</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{characters.filter(c => c.category === 'garde').length}</span>
          <span className="stat-label">Veilleurs</span>
        </div>
      </div>

      <h2 className="section-h2">Figures de Sylvaris</h2>
      <p className="prose">
        Les personnages fondateurs de la cité, ceux qui ont façonné son histoire depuis les premiers jours.
      </p>

      <div className="char-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {featured.map(c => <CharacterCard key={c.id} character={c} />)}
      </div>

      <p style={{ marginTop: 12 }}>
        <Link to="/personnages" style={{ fontSize: 13, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
          Voir tous les personnages →
        </Link>
      </p>

      <h2 className="section-h2">Factions & Rôles</h2>
      <p className="prose">
        Sylvaris est structurée autour de plusieurs corps qui assurent sa gouvernance, sa protection et son développement.
      </p>

      <div className="intro-cards">
        {(['conseil', 'garde', 'artisan', 'erudit', 'citoyen'] as const).map(cat => {
          const count = characters.filter(c => c.category === cat).length
          const color = categoryColors[cat]
          const icons: Record<string, string> = {
            conseil: '👑', garde: '⚔️', artisan: '🏛️', erudit: '📜', citoyen: '🌿'
          }
          return (
            <Link key={cat} to={`/personnages?cat=${cat}`} className="intro-card">
              <span className="intro-card-icon">{icons[cat]}</span>
              <span className="intro-card-title" style={{ color }}>{categoryLabels[cat]}</span>
              <span className="intro-card-desc">{count} personnage{count > 1 ? 's' : ''}</span>
            </Link>
          )
        })}
      </div>

      <h2 className="section-h2">Histoire</h2>
      <p className="prose">
        Lorsque l'ancien monde s'effondra dans les flammes et les guerres, parmi les premiers
        colons se trouvait un groupe refusant de reproduire les erreurs du passé. Ils rêvaient
        d'une société plus raffinée, plus unie et plus proche de la nature…
      </p>
      <p>
        <Link to="/lore" style={{ fontSize: 13, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
          Lire le lore complet →
        </Link>
      </p>

    </div>
  )
}
