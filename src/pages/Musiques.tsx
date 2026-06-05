import { PageBanner } from '../components/PageBanner'

interface Musique {
  id: string
  youtubeId: string
  title: string
  artist?: string
  description?: string
}

const musiques: Musique[] = [
  { id: '1', youtubeId: 'CV6X8JJrifM', title: 'Garden', artist: 'Blockba' },
]

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
            <div key={m.id} className="video-card">
              <div className="video-card-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${m.youtubeId}`}
                  title={m.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-card-body">
                <p className="video-card-title">{m.title}</p>
                {m.artist && <p className="video-card-desc">{m.artist}</p>}
                {m.description && <p className="video-card-desc">{m.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
