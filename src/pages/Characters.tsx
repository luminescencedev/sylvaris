import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { LayoutGrid, List } from 'lucide-react'
import { characters, type CharacterCategory, type Origin, categoryLabels, categoryColors } from '../data/characters'
import { CharacterCard } from '../components/CharacterCard'

const allCats: CharacterCategory[] = ['conseil', 'garde', 'artisan', 'erudit', 'diplomate', 'citoyen']

const originLabels: Record<Origin, string> = {
  'pur-sang-elf': 'Elfe pur-sang',
  'sang-mele': 'Sang-mêlé',
  'humain': 'Humain',
  'autre': 'Autre',
}

const allOrigins = (['pur-sang-elf', 'sang-mele', 'humain', 'autre'] as Origin[]).filter(
  o => characters.some(c => c.originType === o)
)

type ViewMode = 'grid' | 'list'

export function Characters() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const cat = params.get('cat') as CharacterCategory | null
  const [search, setSearch] = useState('')
  const [originFilter, setOriginFilter] = useState<Origin | null>(null)
  const [focusedIdx, setFocusedIdx] = useState(-1)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const focusedIdxRef = useRef(-1)
  focusedIdxRef.current = focusedIdx

  const q = search.trim().toLowerCase()
  const filtered = characters
    .filter(c => !cat || c.category === cat)
    .filter(c => !originFilter || c.originType === originFilter)
    .filter(c => !q || [c.firstName, c.lastName, c.role, c.origin, c.allegiance].join(' ').toLowerCase().includes(q))

  useEffect(() => { setFocusedIdx(-1) }, [cat, originFilter, search])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT') return
      if (e.key === 'j') {
        e.preventDefault()
        setFocusedIdx(i => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'k') {
        e.preventDefault()
        setFocusedIdx(i => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        const idx = focusedIdxRef.current
        if (idx >= 0 && filtered[idx]) navigate(`/personnages/${filtered[idx].id}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filtered, navigate])

  const allPages = [
    { href: '/personnages', label: 'Tous les personnages' },
    ...allCats.map(c => ({ href: `/personnages?cat=${c}`, label: categoryLabels[c] }))
  ]
  const currentIdx = cat ? allPages.findIndex(p => p.href === `/personnages?cat=${cat}`) : 0
  const prev = currentIdx > 0 ? allPages[currentIdx - 1] : null
  const next = currentIdx < allPages.length - 1 ? allPages[currentIdx + 1] : null

  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Archive</div>
        <h1 className="page-title">{cat ? categoryLabels[cat] : 'Personnages'}</h1>
        <p className="page-desc">
          {cat
            ? `Les ${categoryLabels[cat].toLowerCase()} de Sylvaris.`
            : "L'ensemble des habitants, gardiens et visiteurs de la cité elfique de Sylvaris."
          }
        </p>
      </div>

      {/* Toolbar : search + view toggle */}
      <div className="chars-toolbar">
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
        <div className="chars-view-toggle">
          <button
            className={`chars-view-btn${viewMode === 'grid' ? ' chars-view-btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vue grille"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            className={`chars-view-btn${viewMode === 'list' ? ' chars-view-btn--active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Vue liste"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      <div className="filters">
        <button className={`filter-btn${!cat ? ' filter-btn--active' : ''}`} onClick={() => navigate('/personnages')}>
          Tous<span className="filter-count">{characters.length}</span>
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

      {allOrigins.length > 1 && (
        <div className="filters" style={{ marginTop: 4 }}>
          <span className="filters-label">Origine</span>
          {allOrigins.map(o => (
            <button
              key={o}
              className={`filter-btn${originFilter === o ? ' filter-btn--active' : ''}`}
              onClick={() => setOriginFilter(prev => prev === o ? null : o)}
            >
              {originLabels[o]}
              <span className="filter-count">{characters.filter(c => c.originType === o).length}</span>
            </button>
          ))}
        </div>
      )}

      {focusedIdx >= 0 && (
        <p className="chars-keyboard-hint">
          J/K pour naviguer · Entrée pour ouvrir · <strong>{filtered[focusedIdx]?.firstName} {filtered[focusedIdx]?.lastName}</strong>
        </p>
      )}

      {/* Grid view */}
      {viewMode === 'grid' && (
        <div className="char-cards">
          {filtered.map((character, idx) => (
            <CharacterCard key={character.id} character={character} focused={idx === focusedIdx} />
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <div className="char-list">
          {filtered.map((character, idx) => (
            <Link
              key={character.id}
              to={`/personnages/${character.id}`}
              className={`char-list-item${idx === focusedIdx ? ' char-list-item--focused' : ''}`}
            >
              {character.minecraftUsername && (
                <img
                  src={`https://mc-heads.net/avatar/${character.minecraftUsername}/32`}
                  className="char-list-skin"
                  alt=""
                />
              )}
              <span className="char-list-name">{character.firstName} {character.lastName}</span>
              <span className="char-list-role">{character.role}</span>
              <span
                className="char-list-cat"
                style={{ color: categoryColors[character.category] }}
              >
                {categoryLabels[character.category]}
              </span>
            </Link>
          ))}
        </div>
      )}

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
