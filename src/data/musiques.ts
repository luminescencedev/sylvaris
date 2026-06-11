export interface Musique {
  id: string
  youtubeId: string
  title: string
  artist?: string
  description?: string
}

export const musiques: Musique[] = [
  { id: 'garden', youtubeId: 'CV6X8JJrifM', title: 'Garden', artist: 'Blockba' },
  { id: 'hard', youtubeId: 'qkwxupRpULA', title: 'HARD!', artist: 'Blockba' },
]
