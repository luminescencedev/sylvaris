export interface LoreSection {
  id: string
  title: string
  subtitle?: string
  content: string[]
}

export const kcrpLore: LoreSection = {
  id: 'kcrp',
  title: 'Le Monde Nouveau',
  subtitle: 'Lore de KCRP',
  content: [
    "Lorsque les grandes guerres consumèrent l'ancien monde, il ne resta derrière elles que des ruines fumantes et des peuples brisés. Les nations s'effondrèrent les unes après les autres, rongées par les conflits. Puis, contre toute attente, une découverte changea le destin de l'humanité : au-delà des mers inconnues, des explorateurs rapportèrent l'existence de nouvelles terres. Immenses, sauvages et encore vierges de toute civilisation, elles représentaient une chance unique de recommencer.",
    "Une expédition fut rapidement organisée avec l'objectif de bâtir un monde meilleur à partir de zéro. Des volontaires venus de tous horizons répondirent à l'appel. Certains cherchaient à fuir le chaos de l'ancien monde, tandis que d'autres espéraient trouver richesse, liberté ou pouvoir. Malgré leurs différences, tous partageaient la même conviction : sur ces nouvelles terres, chacun aurait enfin l'opportunité de recommencer sa vie.",
    "Après un voyage long et périlleux, une première vague d'expéditionnaires atteignit ces côtes et posa les fondations de la colonie. Les premiers échanges débutèrent et un président fut élu pour diriger ce nouveau départ. Néanmoins, malgré ces premiers pas, tout reste encore incertain.",
    "Ces terres offrent autant d'opportunités qu'elles attisent les convoitises. L'économie commence à émerger, les influences politiques se dessinent peu à peu et certaines factions cherchent déjà à étendre leur influence. C'est dans ce contexte qu'une seconde vague a tout juste atteint les côtes. De nouveaux arrivants débarquent avec leurs projets et leurs ambitions.",
    "Que vous choisissiez de devenir commerçant, leader d'un groupe, criminel ou simple citoyen, vos actions façonneront l'avenir de la colonie et le destin de ceux qui y vivent. Ici, votre survie dépendra toujours de celle qui vous entourent.",
  ],
}

export const sylvarisLore: LoreSection = {
  id: 'sylvaris',
  title: 'La Naissance de Sylvaris',
  subtitle: 'Lore de la Cité Elfique',
  content: [
    "Lorsque l'ancien monde s'effondra dans les flammes et les guerres, beaucoup perdirent espoir. Les nations s'écroulèrent, les peuples se déchirèrent et la violence finit par consumer tout ce qui avait été construit.",
    "Mais au-delà des mers inconnues, de nouvelles terres furent découvertes.",
    "Parmi les premiers colons se trouvait un groupe refusant de reproduire les erreurs du passé. Ils rêvaient d'une société plus raffinée, plus unie et plus proche de la nature. Une société où le savoir, l'équilibre et la discipline primeraient sur le chaos et la destruction.",
    "C'est ainsi que naquit Sylvaris.",
    "Fondée au cœur d'une région luxuriante, la cité devint rapidement un refuge pour ceux cherchant un nouveau départ. Son architecture élégante, ses jardins lumineux et ses traditions uniques attirèrent voyageurs, érudits, artisans et diplomates.",
    "À la tête de cette nouvelle nation se trouve Mina Vaelith, Première Gardienne de Sylvaris. Reconnue pour ses longs cheveux blancs et ses yeux bleus perçants, elle guida les premiers habitants dans la fondation de la cité et veille aujourd'hui à préserver sa stabilité.",
    "Cependant, derrière son apparente harmonie, Sylvaris reste une puissance émergente dans un monde encore instable. La cité protège farouchement ses intérêts, surveille les tensions politiques des colonies voisines et se prépare à défendre son avenir à tout prix.",
    "Dans cette nouvelle terre, chacun peut trouver sa place : artisan, marchand, érudit, garde, diplomate ou simple citoyen. Mais une chose demeure certaine : l'avenir de Sylvaris dépendra de ceux qui choisiront de la faire prospérer.",
  ],
}

export const presentationTemplate = [
  { key: 'Nom & prénom', description: 'Votre identité complète dans le monde de Sylvaris' },
  { key: 'Âge', description: 'Votre âge en années' },
  { key: 'Origine', description: 'Votre peuple et vos origines' },
  { key: 'Occupation / rôle', description: 'Votre fonction au sein de la cité' },
  { key: 'Histoire rapide', description: 'Un résumé de votre parcours' },
  { key: 'Objectifs / ambitions', description: 'Ce qui vous motive et ce que vous cherchez à accomplir' },
  { key: 'Allégeance éventuelle', description: 'Votre loyauté dans ce monde' },
  { key: 'Autres informations', description: 'Tout ce qui vous définit et que vous souhaitez partager' },
]
