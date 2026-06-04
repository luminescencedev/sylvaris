import { Link } from 'react-router-dom'
import { type Character, categoryColors, categoryLabels } from '../data/characters'
import { SkinViewer } from './SkinViewer'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const color = categoryColors[character.category]

  return (
    <Link to={`/personnages/${character.id}`} className="char-card">
      <div className="char-card-skin">
        <SkinViewer username={character.minecraftUsername} width={100} height={180} />
      </div>
      <div className="char-card-body">
        <span className="char-card-cat" style={{ color }}>
          {categoryLabels[character.category]}
        </span>
        <p className="char-card-name">{character.firstName} {character.lastName}</p>
        <p className="char-card-role">{character.role}</p>
        <div className="char-card-meta">
          <span>{character.age} ans</span>
          <span className="char-card-dot">·</span>
          <span>{character.origin}</span>
        </div>
      </div>
      <div className="char-card-accent" style={{ background: color }} />
    </Link>
  )
}
