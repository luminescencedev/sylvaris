import { useState } from 'react'
import { screenshots, type GalleryCategory, categoryLabels } from '../data/gallery'

const allCats: GalleryCategory[] = ['cite', 'architecture', 'habitants', 'evenements']

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = filter ? screenshots.filter(s => s.category === filter) : screenshots

  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Visuels</div>
        <h1 className="page-title">Galerie</h1>
        <p className="page-desc">
          Screenshots de Sylvaris.
        </p>
      </div>

      {screenshots.length > 0 && (
        <div className="filters">
          <button
            className={`filter-btn${!filter ? ' filter-btn--active' : ''}`}
            onClick={() => setFilter(null)}
          >
            Tout
            <span className="filter-count">{screenshots.length}</span>
          </button>
          {allCats.map(cat => {
            const count = screenshots.filter(s => s.category === cat).length
            if (count === 0) return null
            return (
              <button
                key={cat}
                className={`filter-btn${filter === cat ? ' filter-btn--active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {categoryLabels[cat]}
                <span className="filter-count">{count}</span>
              </button>
            )
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏛️</div>
          <h3>Galerie vide</h3>
          <p>
            Les screenshots de Sylvaris seront ajoutés ici au fur et à mesure.
          </p>
          <p className="empty-hint">
            Mets tes screens dans <code>public/screenshots/</code> puis ajoute-les dans{' '}
            <code>src/data/gallery.ts</code>
          </p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filtered.map(s => (
            <div
              key={s.id}
              className="gallery-card"
              onClick={() => setLightbox(s.src)}
            >
              <div className="gallery-card-img">
                <img src={s.src} alt={s.title} loading="lazy" />
              </div>
              <div className="gallery-card-body">
                <span className="gallery-card-cat">{categoryLabels[s.category]}</span>
                <p className="gallery-card-title">{s.title}</p>
                {s.description && <p className="gallery-card-desc">{s.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}

    </div>
  )
}
