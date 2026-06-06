import { Link } from 'react-router-dom'
import { ElfDivider } from '../components/ElfDivider'
import { PageBanner } from '../components/PageBanner'

interface ChronEvent {
  title: string
  description: string
  chars?: { name: string; id: string }[]
}

interface ChronEra {
  label: string
  color: string
  events: ChronEvent[]
}

const CHRONOLOGIE: ChronEra[] = [
  {
    label: 'Ère Ancienne',
    color: '#9aaf9e',
    events: [
      {
        title: 'Les Grandes Guerres',
        description: 'Des conflits dévastateurs ravagèrent les terres elfiques, réduisant en cendres des générations de savoir, d\'architecture et de maisons nobles. La maison Vaelith, comme tant d\'autres, fut décimée. Seule Mina, dernière héritière, survécut — portant un héritage brûlé et un nom sans famille.',
        chars: [{ name: 'Mina Vaelith', id: 'mina-vaelith' }],
      },
      {
        title: 'L\'Atelier de Daeren',
        description: 'À l\'abri des conflits, l\'architecte de renom Daeren Aervyn forma de jeunes elfes dans son atelier. C\'est là que grandirent son fils Lumi, studieux et patient, et Gus, qui n\'était pas venu pour les plans mais revenait toujours. L\'un bâtissait, l\'autre veillait.',
        chars: [{ name: 'Lumi Aervyn', id: 'lumi-aervyn' }],
      },
      {
        title: 'La Perte de Daeren',
        description: 'Les guerres finirent par atteindre l\'atelier. Daeren périt dans les conflits, ses œuvres réduites en cendres. Lumi se retrouva seul porteur d\'un nom trop grand, sans père et sans œuvres à montrer.',
        chars: [{ name: 'Lumi Aervyn', id: 'lumi-aervyn' }],
      },
    ],
  },
  {
    label: 'Ère de l\'Expédition',
    color: '#c4983c',
    events: [
      {
        title: 'L\'Enseignement de Vaelor',
        description: 'Avant la traversée, Mina Vaelith apprit aux côtés de Trim Vaelor — vieux maître elfe dont la sagesse traversait les âges. Il lui enseigna l\'art de gouverner, de préserver, et de porter la responsabilité sans plier.',
        chars: [
          { name: 'Mina Vaelith', id: 'mina-vaelith' },
          { name: 'Trim Vaelor', id: 'trim-vaelor' },
        ],
      },
      {
        title: 'La Grande Traversée',
        description: 'Fuyant un monde consumé par les guerres, un groupe d\'elfes survivants prit la mer vers un nouveau monde. La traversée fut longue, incertaine. Tous n\'arrivèrent pas. Ceux qui survécurent portaient avec eux leurs noms, leurs deuils, et l\'espoir d\'une page blanche.',
        chars: [
          { name: 'Mina Vaelith', id: 'mina-vaelith' },
          { name: 'Trim Vaelor', id: 'trim-vaelor' },
          { name: 'Lumi Aervyn', id: 'lumi-aervyn' },
        ],
      },
    ],
  },
  {
    label: 'Ère de Sylvaris',
    color: '#4caf82',
    events: [
      {
        title: 'La Fondation',
        description: 'Dans une forêt ancienne du nouveau monde, la cité de Sylvaris fut fondée. Les premiers bâtiments furent tracés par les mains de Lumi Aervyn — une façon silencieuse d\'honorer son père sans jamais prononcer son nom.',
        chars: [
          { name: 'Mina Vaelith', id: 'mina-vaelith' },
          { name: 'Lumi Aervyn', id: 'lumi-aervyn' },
        ],
      },
      {
        title: 'L\'Intronisation',
        description: 'Trim Vaelor intronisa officiellement Mina Vaelith comme Dame de Sylvaris, devant les premiers habitants rassemblés. Ce n\'était pas un couronnement de soie — c\'était la reconnaissance d\'une responsabilité.',
        chars: [
          { name: 'Mina Vaelith', id: 'mina-vaelith' },
          { name: 'Trim Vaelor', id: 'trim-vaelor' },
        ],
      },
      {
        title: 'L\'Essor',
        description: 'Sylvaris grandit. Elfes, humains et voyageurs de toutes origines vinrent s\'y établir. La cité devint un refuge, un projet collectif, et pour certains — le seul endroit qui méritait encore le nom de foyer.',
        chars: [],
      },
    ],
  },
]

export function Chronologie() {
  return (
    <div className="docs-page">

      <PageBanner
        src="/screen/sylvaris1.png"
        label="Chronologie"
        title="Histoire de Sylvaris"
        subtitle="Des Grandes Guerres à la cité vivante"
        size="sm"
      />

      <p className="prose reveal" style={{ marginTop: 8 }}>
        Les événements marquants qui ont façonné Sylvaris — des guerres de l'ancien monde à la fondation de la cité elfique dans le nouveau.
      </p>

      {CHRONOLOGIE.map((era, ei) => (
        <div key={ei} className="chron-era reveal">
          <ElfDivider />
          <p className="chron-era-label" style={{ color: era.color }}>{era.label}</p>
          <div className="chron-timeline">
            {era.events.map((event, evi) => (
              <div key={evi} className="chron-entry">
                <div className="chron-dot" style={{ borderColor: era.color + '80' }}>
                  <span className="chron-dot-inner" style={{ background: era.color }} />
                </div>
                <p className="chron-entry-title">{event.title}</p>
                <p className="chron-entry-desc">{event.description}</p>
                {event.chars && event.chars.length > 0 && (
                  <div className="chron-entry-chars">
                    {event.chars.map(c => (
                      <Link key={c.id} to={`/personnages/${c.id}`} className="chron-entry-char-tag">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  )
}
