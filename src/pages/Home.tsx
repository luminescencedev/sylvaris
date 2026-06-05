import { Link } from 'react-router-dom'
import { characters, categoryLabels, categoryColors } from '../data/characters'
import { CharacterCard } from '../components/CharacterCard'
import { PageBanner } from '../components/PageBanner'

const featured = characters.filter(c =>
  ['mina-vaelith', 'lunaris-eldenar', 'dwena-drathmir'].includes(c.id)
)

const HERO_BG = '/screen/sylvaris1.png'

export function Home() {
  return (
    <div className="docs-page">

      <PageBanner
        src={HERO_BG}
        label="Bibliothèque de Sylvaris"
        title="Sylvaris"
        subtitle="Cité Elfique · KCRP"
      />

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

      <p className="prose" style={{ marginTop: 8 }}>
        Archives de Sylvaris — personnages, histoire et lore de la cité elfique sur KCRP.
      </p>

      <h2 className="section-h2">Figures de Sylvaris</h2>
      <p className="prose">
        Quelques personnages clés de la cité.
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
        Les différents rôles au sein de la cité.
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

      <h2 className="section-h2">Étendard de Sylvaris</h2>
      <div className="banner-showcase">
        <img
          src="/screen/sylvaris4.png"
          alt="Bannière de Sylvaris"
          className="banner-showcase-img"
        />
        <p className="banner-showcase-caption">
          L'étendard de Sylvaris — symbole de la cité elfique, aux couleurs de la forêt ancienne.
        </p>
      </div>

      <h2 className="section-h2">Histoire</h2>
      <p className="prose">
        Comment Sylvaris a été fondée, par qui, et pourquoi — les origines de la cité en texte complet.
      </p>
      <p>
        <Link to="/lore" style={{ fontSize: 13, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}>
          Lire le lore complet →
        </Link>
      </p>

    </div>
  )
}
