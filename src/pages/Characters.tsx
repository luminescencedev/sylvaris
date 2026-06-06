import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { characters, type CharacterCategory, categoryLabels } from '../data/characters'
import { CharacterCard } from '../components/CharacterCard'

const allCats: CharacterCategory[] = ['conseil', 'garde', 'artisan', 'erudit', 'diplomate', 'citoyen']

export function Characters() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const cat = params.get('cat') as CharacterCategory | null
  const [search, setSearch] = useState('')

  const q = search.trim().toLowerCase()
  const filtered = characters
    .filter(c => !cat || c.category === cat)
    .filter(c => !q || [c.firstName, c.lastName, c.role, c.origin].join(' ').toLowerCase().includes(q))

  const allPages = [
    { href: '/personnages', label: 'Tous les personnages' },
    ...allCats.map(c => ({ href: `/personnages?cat=${c}`, label: categoryLabels[c] }))
  ]

  const currentIdx = cat
    ? allPages.findIndex(p => p.href === `/personnages?cat=${cat}`)
    : 0
  const prev = currentIdx > 0 ? allPages[currentIdx - 1] : null
  const next = currentIdx < allPages.length - 1 ? allPages[currentIdx + 1] : null

  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Archive</div>
        <h1 className="page-title">
          {cat ? categoryLabels[cat] : 'Personnages'}
        </h1>
        <p className="page-desc">
          {cat
            ? `Les ${categoryLabels[cat].toLowerCase()} de Sylvaris.`
            : "L'ensemble des habitants, gardiens et visiteurs de la cité elfique de Sylvaris."
          }
        </p>
      </div>

      <div className="char-search-wrap">
        <span className="char-search-icon">⌕</span>
        <input
          className="char-search"
          type="search"
          placeholder="Rechercher un personnage…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filters">
        <button
          className={`filter-btn${!cat ? ' filter-btn--active' : ''}`}
          onClick={() => navigate('/personnages')}
        >
          Tous
          <span className="filter-count">{characters.length}</span>
        </button>
        {allCats.map(c => (
          <button
            key={c}
            className={`filter-btn${cat === c ? ' filter-btn--active' : ''}`}
            onClick={() => navigate(`/personnages?cat=${c}`)}
          >
            {categoryLabels[c]}
            <span className="filter-count">{characters.filter(ch => ch.category === c).length}</span>
          </button>
        ))}
      </div>

      <div className="char-cards">
        {filtered.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <nav className="page-nav" aria-label="Navigation">
        {prev ? (
          <a href={prev.href} className="page-nav-link page-nav-link--prev" onClick={e => { e.preventDefault(); navigate(prev.href) }}>
            <span className="page-nav-dir">← Précédent</span>
            <span className="page-nav-label">{prev.label}</span>
          </a>
        ) : <span />}
        {next && (
          <a href={next.href} className="page-nav-link page-nav-link--next" onClick={e => { e.preventDefault(); navigate(next.href) }}>
            <span className="page-nav-dir">Suivant →</span>
            <span className="page-nav-label">{next.label}</span>
          </a>
        )}
      </nav>

    </div>
  )
}
