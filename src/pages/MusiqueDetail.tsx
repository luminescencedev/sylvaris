import { Link, useParams } from 'react-router-dom'
import { musiques } from '../data/musiques'
import { NotFound } from './NotFound'

export function MusiqueDetail() {
  const { id } = useParams<{ id: string }>()
  const musique = musiques.find(m => m.id === id)

  if (!musique) return <NotFound />

  return (
    <div className="docs-page">

      <div className="musique-detail-back">
        <Link to="/musiques" className="musique-back-link">← Musiques</Link>
      </div>

      <div className="musique-detail-embed">
        <iframe
          src={`https://www.youtube.com/embed/${musique.youtubeId}?autoplay=1`}
          title={musique.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="musique-detail-info">
        <h1 className="musique-detail-title">{musique.title}</h1>
        {musique.artist && (
          <p className="musique-detail-artist">{musique.artist}</p>
        )}
        {musique.description && (
          <p className="prose" style={{ marginTop: 20 }}>{musique.description}</p>
        )}
      </div>

    </div>
  )
}
