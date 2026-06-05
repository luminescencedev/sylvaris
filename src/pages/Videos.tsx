import { PageBanner } from '../components/PageBanner'

interface Video {
  id: string
  youtubeId: string
  title: string
  description?: string
}

// Ajoute tes vidéos ici :
const videos: Video[] = [
  // { id: '1', youtubeId: 'YOUTUBE_ID', title: 'Titre de la vidéo', description: 'Description optionnelle' },
]

export function Videos() {
  return (
    <div className="docs-page">

      <div className="page-header">
        <div className="page-badge">Mémoire Vivante</div>
        <h1 className="page-title">Chroniques</h1>
        <p className="page-desc">
          Vidéos de Sylvaris — événements, constructions, sessions RP.
        </p>
      </div>

      <PageBanner
        src="/screen/sylvaris6.png"
        label="Chroniques"
        title="Vidéos"
        size="sm"
      />

      {videos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📜</div>
          <h3>Archives visuelles vides</h3>
          <p>
            Les chroniques en vidéo seront déposées ici au fur et à mesure des aventures de Sylvaris.
          </p>
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map(v => (
            <div key={v.id} className="video-card">
              <div className="video-card-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-card-body">
                <p className="video-card-title">{v.title}</p>
                {v.description && <p className="video-card-desc">{v.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
