import { useState } from 'react'
import { Link } from 'react-router-dom'
import { lexique, lexiqueCategoryLabels, type LexiqueCategory } from '../data/lexique'

const allCats: LexiqueCategory[] = ['titre', 'lieu', 'evenement', 'maison', 'objet', 'concept']

export function Lexique() {
  const [filter, setFilter] = useState<LexiqueCategory | null>(null)
  const [search, setSearch] = useState('')

  const q = search.trim().toLowerCase()
  const filtered = lexique
    .filter(e => !filter || e.category === filter)
    .filter(e => !q || `${e.term} ${e.definition}`.toLowerCase().includes(q))

  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Référence</div>
        <h1 className="page-title">Lexique</h1>
        <p className="page-desc">
          Termes elfiques, titres, lieux et événements — le vocabulaire de Sylvaris.
        </p>
      </div>

      <div className="char-search-wrap reveal">
        <span className="char-search-icon">⌕</span>
        <input
          className="char-search"
          type="search"
          placeholder="Rechercher un terme…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filters reveal">
        <button
          className={`filter-btn${!filter ? ' filter-btn--active' : ''}`}
          onClick={() => setFilter(null)}
        >
          Tous
          <span className="filter-count">{lexique.length}</span>
        </button>
        {allCats.map(cat => {
          const count = lexique.filter(e => e.category === cat).length
          if (count === 0) return null
          return (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? ' filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {lexiqueCategoryLabels[cat]}
              <span className="filter-count">{count}</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>Aucun terme trouvé</h3>
          <p>Essayez un autre mot-clé ou réinitialisez le filtre.</p>
        </div>
      ) : (
        <div className="lexique-list reveal">
          {filtered.map(entry => (
            <div key={entry.id} className="lexique-entry">
              <div className="lexique-header">
                <span className="lexique-term">{entry.term}</span>
                <span className="lexique-cat">{lexiqueCategoryLabels[entry.category]}</span>
              </div>
              <p className="lexique-def">{entry.definition}</p>
              {entry.refs && entry.refs.length > 0 && (
                <div className="lexique-refs">
                  {entry.refs.map(r => (
                    <Link key={r.id} to={`/personnages/${r.id}`} className="chron-entry-char-tag">
                      {r.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
