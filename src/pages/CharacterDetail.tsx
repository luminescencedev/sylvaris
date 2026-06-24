import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Link2, Check } from 'lucide-react'
import { characters, categoryLabels, categoryColors } from '../data/characters'
import { SkinViewer } from '../components/SkinViewer'
import { ElfDivider } from '../components/ElfDivider'

export function CharacterDetail() {
  const { id } = useParams()
  const idx = characters.findIndex(c => c.id === id)
  const character = idx !== -1 ? characters[idx] : null
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
  const relationChars = character.relations
    ?.map(r => ({ rel: r, char: characters.find(c => c.id === r.id) }))
    .filter(r => r.char != null) ?? []

  return (
    <div className="docs-page">

      {/* Hero */}
      <div className="char-hero reveal" style={{ '--char-color': color } as React.CSSProperties}>
        <div className="char-hero-skin">
          <span className="char-hero-badge" style={{ color, borderColor: color + '40', background: color + '12' }}>
            {categoryLabels[character.category]}
          </span>
          <SkinViewer username={character.minecraftUsername} width={260} height={500} animate />
        </div>

        <div className="char-hero-info">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <h1 className="char-hero-name">{character.firstName} {character.lastName}</h1>
            <button
              className={`copy-link-btn${copied ? ' copy-link-btn--copied' : ''}`}
              onClick={copyLink}
            >
              {copied ? <><Check size={12} /> Copié</> : <><Link2 size={12} /> Lien</>}
            </button>
          </div>
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

      {/* Timeline */}
      {character.timeline && character.timeline.length > 0 && (
        <div className="reveal">
          <ElfDivider />
          <h2 className="section-h2">Chronologie</h2>
          <div className="char-timeline">
            {character.timeline.map((entry, i) => (
              <div key={i} className="char-timeline-entry">
                <div className="char-timeline-dot" style={{ borderColor: color, background: color + '22' }}>
                  <span className="char-timeline-dot-inner" style={{ background: color }} />
                </div>
                <div className="char-timeline-body">
                  <span className="char-timeline-era" style={{ color }}>{entry.era}</span>
                  <p className="char-timeline-event">{entry.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bio */}
      <div className="reveal">
        <ElfDivider />
        <h2 className="section-h2">Histoire</h2>
        <div className="char-bio prose">
          {character.bio.split('\n\n').map((p, i) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <h3 key={i} className="char-bio-heading">{p.slice(2, -2)}</h3>
            }
            return <p key={i}>{p}</p>
          })}
        </div>
      </div>

      {/* Lore image */}
      {character.loreImage && (
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <img
            src={character.loreImage}
            alt={`Illustration de lore — ${character.firstName} ${character.lastName}`}
            style={{ maxWidth: '100%', maxHeight: 480, borderRadius: 8, border: `1px solid ${color}30` }}
          />
        </div>
      )}

      {/* Pull quote */}
      {character.quote && (
        <blockquote className="char-pullquote reveal" style={{ '--quote-color': color } as React.CSSProperties}>
          <span className="char-pullquote-mark">"</span>
          <p>{character.quote}</p>
        </blockquote>
      )}

      {/* Objectifs */}
      {character.goals.length > 0 && (
        <div className="reveal">
          <ElfDivider />
          <h2 className="section-h2">Objectifs & Ambitions</h2>
          <ul className="feature-list">
            {character.goals.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>
      )}

      {/* Autres infos */}
      {character.details && (
        <div className="reveal">
          <ElfDivider />
          <h2 className="section-h2">Autres informations</h2>
          <div className="prose">
            {character.details.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )}

      {/* Relations */}
      {relationChars.length > 0 && (
        <div className="reveal">
          <ElfDivider />
          <h2 className="section-h2">Relations</h2>
          <div className="char-relations">
            {relationChars.map(({ rel, char }) => (
              <Link key={rel.id} to={`/personnages/${rel.id}`} className="char-relation-card">
                <div className="char-relation-skin">
                  <SkinViewer username={char!.minecraftUsername} width={56} height={100} />
                </div>
                <div className="char-relation-info">
                  <span className="char-relation-name">{char!.firstName} {char!.lastName}</span>
                  <span className="char-relation-label" style={{ color: categoryColors[char!.category] }}>
                    {rel.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <nav className="page-nav reveal" aria-label="Navigation personnages">
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
