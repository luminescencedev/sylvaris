import { Link } from 'react-router-dom'
import { PageBanner } from '../components/PageBanner'
import { musiques } from '../data/musiques'

export function Musiques() {
  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Mémoire Vivante</div>
        <h1 className="page-title">Musiques</h1>
        <p className="page-desc">
          Créations musicales et sonores de Sylvaris.
        </p>
      </div>

      <PageBanner
        src="/screen/sylvaris3.png"
        label="Musiques"
        title="Musiques"
        size="sm"
      />

      {musiques.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎵</div>
          <h3>Archives sonores vides</h3>
          <p>
            Les créations musicales de Sylvaris seront déposées ici au fil du temps.
          </p>
        </div>
      ) : (
        <div className="videos-grid">
          {musiques.map(m => (
            <Link key={m.id} to={`/musiques/${m.id}`} className="video-card musique-card">
              <div className="musique-card-thumb">
                <img
                  src={`https://img.youtube.com/vi/${m.youtubeId}/hqdefault.jpg`}
                  alt={m.title}
                  className="musique-card-img"
                />
                <div className="musique-card-play">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="rgba(0,0,0,0.55)"/>
                    <polygon points="16,13 30,20 16,27" fill="#e4dccb"/>
                  </svg>
                </div>
              </div>
              <div className="video-card-body">
                <p className="video-card-title">{m.title}</p>
                {m.artist && <p className="video-card-desc">{m.artist}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  )
}
