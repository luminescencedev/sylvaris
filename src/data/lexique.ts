export type LexiqueCategory = 'titre' | 'lieu' | 'evenement' | 'maison' | 'objet' | 'concept'

export interface LexiqueEntry {
  id: string
  term: string
  category: LexiqueCategory
  definition: string
  refs?: { name: string; id: string }[]
}

export const lexiqueCategoryLabels: Record<LexiqueCategory, string> = {
  titre: 'Titres & Fonctions',
  lieu: 'Lieux & Géographie',
  evenement: 'Événements',
  maison: 'Maisons & Lignées',
  objet: 'Objets & Reliques',
  concept: 'Concepts & Institutions',
}

export const lexique: LexiqueEntry[] = [
  // Titres
  {
    id: 'premiere-gardienne',
    term: 'Première Gardienne',
    category: 'titre',
    definition: 'Titre porté par la dirigeante de Sylvaris. Choisi délibérément par Mina Vaelith en refus du titre de reine : "un dirigeant ne doit pas régner au-dessus de son peuple, il doit veiller sur lui."',
    refs: [{ name: 'Mina Vaelith', id: 'mina-vaelith' }],
  },
  {
    id: 'sage',
    term: 'Sage de Sylvaris',
    category: 'titre',
    definition: 'Titre de Trim Vaelor au Haut Conseil. Gardien des traditions anciennes, de la mémoire collective et des enseignements elfiques.',
    refs: [{ name: 'Trim Vaelor', id: 'trim-vaelor' }],
  },
  {
    id: 'chevalier-protecteur',
    term: 'Chevalier Protecteur',
    category: 'titre',
    definition: 'Titre de Lunaris Eldenar. Garde personnel de la Première Gardienne, chargé de sa protection et de celle de la cité. Allégeance totale, jurée sur sa vie.',
  },
  {
    id: 'veilleur',
    term: 'Veilleur',
    category: 'titre',
    definition: 'Membre de la garde de Sylvaris. Les Veilleurs assurent la sécurité de la cité, ses frontières et ses habitants. Corps d\'élite aux méthodes militaires.',
  },
  {
    id: 'erudit',
    term: 'Érudit',
    category: 'titre',
    definition: 'Chercheur, savant ou gardien du savoir de Sylvaris. Les Érudits sont chargés de préserver, étudier et transmettre les connaissances de la cité.',
  },
  {
    id: 'artisan',
    term: 'Artisan & Bâtisseur',
    category: 'titre',
    definition: 'Créateur, architecte ou artisan au service de Sylvaris. Responsables de l\'édification et de l\'entretien de la cité.',
  },
  {
    id: 'diplomate',
    term: 'Diplomate',
    category: 'titre',
    definition: 'Représentant de Sylvaris dans les relations extérieures et les négociations avec les autres factions du Nouveau Monde.',
  },
  // Lieux
  {
    id: 'sylvaris-lieu',
    term: 'Sylvaris',
    category: 'lieu',
    definition: 'Cité elfique fondée dans une région luxuriante du Nouveau Monde. Son nom est dérivé de sylva (forêt) et varis (gardienne). Reconnue pour son architecture élégante, ses jardins lumineux et ses traditions uniques.',
  },
  {
    id: 'ancien-monde',
    term: 'L\'Ancien Monde',
    category: 'lieu',
    definition: 'Terres d\'origine des elfes et des autres peuples, consumées par les Grandes Guerres. Considérées comme perdues. Subsistent uniquement dans les mémoires et les récits des survivants.',
  },
  {
    id: 'nouveau-monde',
    term: 'Le Nouveau Monde',
    category: 'lieu',
    definition: 'Terres inconnues découvertes au-delà des mers après les Grandes Guerres. Immenses, vierges et sauvages, elles représentèrent l\'espoir d\'un recommencement pour les peuples survivants.',
  },
  {
    id: 'karminea',
    term: 'Karminéa',
    category: 'lieu',
    definition: 'Région du Nouveau Monde où se trouve Sylvaris. Les cités et factions du Nouveau Monde s\'y développent.',
  },
  // Événements
  {
    id: 'grandes-guerres',
    term: 'Les Grandes Guerres',
    category: 'evenement',
    definition: 'Conflits dévastateurs qui consumèrent l\'Ancien Monde. Ambitions démesurées, idéologies opposées et soif de pouvoir plongèrent les nations dans une spirale de violence. Détruisirent maisons nobles, savoirs anciens et peuples entiers. À l\'origine de la Grande Traversée.',
  },
  {
    id: 'grande-traversee',
    term: 'La Grande Traversée',
    category: 'evenement',
    definition: 'Voyage maritime vers le Nouveau Monde entrepris par les survivants des Grandes Guerres. Long et périlleux — tous n\'arrivèrent pas. Pour ceux qui en revinrent, un seul horizon : recommencer.',
  },
  {
    id: 'fondation',
    term: 'La Fondation de Sylvaris',
    category: 'evenement',
    definition: 'Acte fondateur de la cité elfique, conduit par Mina Vaelith avec Trim Vaelor et les premiers colons. Marqua le début d\'un projet collectif refusant de reproduire les erreurs de l\'Ancien Monde.',
    refs: [
      { name: 'Mina Vaelith', id: 'mina-vaelith' },
      { name: 'Trim Vaelor', id: 'trim-vaelor' },
    ],
  },
  {
    id: 'intronisation',
    term: 'L\'Intronisation',
    category: 'evenement',
    definition: 'Cérémonie au cours de laquelle Trim Vaelor intronisa officiellement Mina Vaelith comme Première Gardienne de Sylvaris, devant les premiers habitants rassemblés.',
    refs: [
      { name: 'Mina Vaelith', id: 'mina-vaelith' },
      { name: 'Trim Vaelor', id: 'trim-vaelor' },
    ],
  },
  // Maisons
  {
    id: 'maison-vaelith',
    term: 'Maison Vaelith',
    category: 'maison',
    definition: 'Ancienne lignée elfique noble, gardienne du savoir et protectrice de l\'équilibre entre peuples et nature. Connue non pour sa puissance militaire ou sa richesse, mais pour sa sagesse et sa modération. Décimée lors des Grandes Guerres. Mina Vaelith en est la dernière héritière.',
    refs: [{ name: 'Mina Vaelith', id: 'mina-vaelith' }],
  },
  {
    id: 'maison-aervyn',
    term: 'Maison Aervyn',
    category: 'maison',
    definition: 'Famille d\'architectes de renom. Daeren Aervyn, père de Lumi, forma de jeunes elfes dans son atelier et fut reconnu bien au-delà de sa communauté, avant de périr dans les Grandes Guerres.',
    refs: [{ name: 'Lumi Aervyn', id: 'lumi-aervyn' }],
  },
  // Objets
  {
    id: 'couronne-elyndra',
    term: 'Couronne d\'Elyndra',
    category: 'objet',
    definition: 'Relique ancestrale de la Maison Vaelith, transmise de génération en génération. Ne représente pas un titre de noblesse mais un devoir : préserver l\'héritage elfique et empêcher que les erreurs du passé ne se reproduisent.',
    refs: [{ name: 'Mina Vaelith', id: 'mina-vaelith' }],
  },
  // Concepts
  {
    id: 'haut-conseil',
    term: 'Haut Conseil',
    category: 'concept',
    definition: 'Organe dirigeant de Sylvaris, composé des figures les plus influentes de la cité. Créé par Mina Vaelith pour assurer l\'avenir de Sylvaris et partager les responsabilités de gouvernance.',
  },
  {
    id: 'panacee',
    term: 'La Panacée',
    category: 'concept',
    definition: 'Objectif de vie de Silar Valemor : trouver un remède universel à tous les maux, à l\'exception de la vieillesse. Promesse faite au souvenir de sa petite sœur, morte d\'une maladie inconnue.',
    refs: [{ name: 'Silar Valemor', id: 'silar-valemor' }],
  },
]
