import { useEffect, useState } from 'react'
import { screenshots, type GalleryCategory, categoryLabels } from '../data/gallery'

const allCats: GalleryCategory[] = ['cite', 'architecture', 'habitants', 'evenements']

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const filtered = filter ? screenshots.filter(s => s.category === filter) : screenshots

  useEffect(() => {
    if (lightboxIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : i))
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i !== null && i < filtered.length - 1 ? i + 1 : i))
      if (e.key === 'Escape') setLightboxIdx(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, filtered.length])

  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Visuels</div>
        <h1 className="page-title">Galerie</h1>
        <p className="page-desc">Screenshots de Sylvaris.</p>
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
          <p>Les screenshots seront ajoutés ici.</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filtered.map((s, idx) => (
            <div
              key={s.id}
              className="gallery-card"
              onClick={() => setLightboxIdx(idx)}
            >
              <img src={s.src} alt={s.title} loading="lazy" />
              <div className="gallery-card-overlay">
                <span className="gallery-card-cat">{categoryLabels[s.category]}</span>
                <p className="gallery-card-title">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightboxIdx !== null && (
        <div className="lightbox" onClick={() => setLightboxIdx(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIdx(null)}>✕</button>
          <span className="lightbox-counter">{lightboxIdx + 1} / {filtered.length}</span>
          <img
            src={filtered[lightboxIdx].src}
            alt={filtered[lightboxIdx].title}
            onClick={e => e.stopPropagation()}
          />
          <div className="lightbox-nav" onClick={e => e.stopPropagation()}>
            <button
              className={`lightbox-nav-btn${lightboxIdx === 0 ? ' lightbox-nav-btn--hidden' : ''}`}
              onClick={() => setLightboxIdx(i => (i !== null ? i - 1 : i))}
            >←</button>
            <button
              className={`lightbox-nav-btn${lightboxIdx === filtered.length - 1 ? ' lightbox-nav-btn--hidden' : ''}`}
              onClick={() => setLightboxIdx(i => (i !== null ? i + 1 : i))}
            >→</button>
          </div>
          <p className="lightbox-caption">{filtered[lightboxIdx].title}</p>
        </div>
      )}

    </div>
  )
}
