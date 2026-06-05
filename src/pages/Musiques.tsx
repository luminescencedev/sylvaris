import { PageBanner } from '../components/PageBanner'

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

      <div className="empty-state">
        <div className="empty-state-icon">🎵</div>
        <h3>Archives sonores vides</h3>
        <p>
          Les créations musicales de Sylvaris seront déposées ici au fil du temps.
        </p>
      </div>

    </div>
  )
}
