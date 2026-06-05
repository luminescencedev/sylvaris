export type GalleryCategory = 'cite' | 'architecture' | 'habitants' | 'evenements'

export interface Screenshot {
  id: string
  src: string
  title: string
  description?: string
  category: GalleryCategory
  date?: string
}

export const categoryLabels: Record<GalleryCategory, string> = {
  cite: 'La Cité',
  architecture: 'Architecture',
  habitants: 'Habitants',
  evenements: 'Événements',
}

export const screenshots: Screenshot[] = [
  {
    id: '1',
    src: '/screen/sylvaris1.png',
    title: 'Vue depuis les hauteurs',
    category: 'cite',
  },
  {
    id: '5',
    src: '/screen/sylvaris5.png',
    title: 'Les Veilleurs — vue de haut',
    category: 'habitants',
  },
  {
    id: '2',
    src: '/screen/sylvaris2.png',
    title: 'Rassemblement autour de Dame Mina',
    category: 'evenements',
  },
  {
    id: '3',
    src: '/screen/sylvaris3.png',
    title: 'Réunion — Salle du Conseil',
    category: 'evenements',
  },
  {
    id: '4',
    src: '/screen/sylvaris4.png',
    title: 'Les Veilleurs — vue de bas',
    category: 'habitants',
  },
  {
    id: '6',
    src: '/screen/sylvaris6.png',
    title: 'Nuit de pluie — Dame Mina',
    category: 'cite',
  },
]
