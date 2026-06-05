import { Link } from 'react-router-dom'
import { type Character, categoryColors, categoryLabels } from '../data/characters'
import { SkinViewer } from './SkinViewer'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const color = categoryColors[character.category]

  return (
    <Link
      to={`/personnages/${character.id}`}
      className="char-card"
      style={{ '--char-color': color } as React.CSSProperties}
    >
      <div className="char-card-skin">
        <span className="char-card-badge">{categoryLabels[character.category]}</span>
        <SkinViewer username={character.minecraftUsername} width={150} height={270} />
      </div>
      <div className="char-card-sep" style={{ background: color }} />
      <div className="char-card-body">
        <p className="char-card-name">{character.firstName} {character.lastName}</p>
        <p className="char-card-role">{character.role}</p>
        <p className="char-card-meta">{character.age} ans · {character.origin}</p>
      </div>
    </Link>
  )
}
