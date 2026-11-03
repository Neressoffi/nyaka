import { photo } from "./media";

export type ProjectPole =
  | "branding"
  | "design"
  | "video"
  | "ia-data";

export type ProjectCard = {
  id: string;
  name: string;
  sector: string;
  situation: string;
  interventions: string;
  poles: ProjectPole[];
  image: string;
  href?: string;
  ctaLabel?: string;
  note?: string;
};

export type CaseStudySection = {
  id: string;
  title: string;
  content: string;
  image: string;
};

export const projectFilters: { id: "all" | ProjectPole; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "branding", label: "Branding et identité" },
  { id: "design", label: "Design et supports" },
  { id: "video", label: "Vidéo et campagnes" },
];

export const featuredProject = {
  name: "KAWA Coffee Shop",
  tagline:
    "Transformer une carte de menu en prolongement de l'expérience de marque.",
  sector: "Restauration / Coffee shop",
  location: "Bastos, Yaoundé",
  situation:
    "KAWA souhaitait professionnaliser la présentation de son offre et construire une expérience plus cohérente entre son positionnement, son menu physique et ses supports digitaux.",
  challenge:
    "Concevoir une carte premium qui ne soit pas seulement un document tarifaire, mais un véritable support de marque : lisible, cohérent avec l'univers du coffee shop et capable d'évoluer vers une expérience plus digitale.",
  interventions: [
    "Définition d'une direction visuelle vintage et premium.",
    "Structuration des catégories, contenus et niveaux d'information du menu.",
    "Conception d'une carte physique premium adaptée à l'usage en salle.",
    "Conception d'un menu digital consultable sur mobile.",
    "Intégration de QR codes et réflexion sur la collecte de données clients.",
    "Adaptation des choix aux contraintes réelles d'impression et de production.",
    "Réflexion sur les prolongements : fidélisation, événements, communication et activation via WhatsApp.",
  ],
  deliverables: [
    "Couverture et pages intérieures du menu imprimé.",
    "Extraits du menu digital.",
    "QR code et logique de parcours.",
    "Photographies ou mockups du menu final imprimé.",
    "Supports complémentaires pertinents, uniquement s'ils ont été réellement produits.",
  ],
  result:
    "Une présentation plus professionnelle et plus cohérente de l'offre KAWA, avec un support physique premium et une base digitale permettant de prolonger l'expérience client.",
  image: photo(1060, 1600, 1100),
  gallery: [
    photo(1060, 900, 700),
    photo(225, 900, 700),
    photo(431, 900, 700),
  ],
  caseStudyHref: "/realisations/kawa-coffee-shop",
};

export const projects: ProjectCard[] = [
  {
    id: "the-vision",
    name: "THE VISION",
    sector: "Éducation / Orientation internationale",
    situation:
      "Accompagnement régulier de la communication autour des opportunités d'études, des campagnes de recrutement et des contenus éducatifs.",
    interventions:
      "Stratégie de message, flyers, vidéos, scripts, contenus et campagnes.",
    poles: ["video", "design"],
    image: photo(1015, 1200, 900),
    note: "À présenter avec une sélection de campagnes cohérentes, pas une accumulation de visuels isolés.",
  },
  {
    id: "7g-services",
    name: "7G Services",
    sector: "Services financiers et assistance",
    situation:
      "Structuration de campagnes destinées à rendre des services multiples plus simples à comprendre et plus rassurants pour les publics entre la Russie et l'Afrique.",
    interventions:
      "Concepts de campagne, messages, visuels, contenus et déclinaisons multilingues.",
    poles: ["video", "design"],
    image: photo(1043, 1200, 900),
    note: "Privilégier une campagne représentative montrant le système de communication.",
  },
  {
    id: "nemesis",
    name: "NEMESIS",
    sector: "Identité / Marque",
    situation:
      "Travail de conception et d'affinement d'une identité destinée à porter une vision plus forte et plus professionnelle.",
    interventions:
      "Logo, direction visuelle, variantes et recommandations de marque.",
    poles: ["branding"],
    image: photo(1039, 1200, 900),
    note: "Présenter uniquement les éléments validés et les rendus finaux.",
  },
  {
    id: "brirena-hair",
    name: "BRIRENA HAIR",
    sector: "Beauté / Afro-luxury",
    situation:
      "Création d'un univers de marque glamour et chic destiné principalement aux Africaines en Russie.",
    interventions:
      "Logo, palette, typographies, moodboard et déclinaisons d'identité.",
    poles: ["branding"],
    image: photo(1067, 1200, 900),
    note: "Projet pertinent pour la catégorie Branding et identité.",
  },
  {
    id: "perfecta",
    name: "Perfecta",
    sector: "Support commercial / Catalogue",
    situation:
      "Projet de conception de supports professionnels destinés à mieux présenter l'offre et renforcer la perception de l'entreprise.",
    interventions: "Catalogue et supports graphiques.",
    poles: ["design"],
    image: photo(1062, 1200, 900),
    note: "Le contenu exact à publier doit être validé avant mise en ligne.",
  },
];

export const kawaCaseStudy = {
  title: "KAWA Coffee Shop",
  subtitle:
    "Transformer une carte de menu en prolongement de l'expérience de marque.",
  sector: "Restauration / Coffee shop",
  location: "Bastos, Yaoundé",
  heroImage: photo(1060, 1974, 1175),
  sections: [
    {
      id: "contexte",
      title: "Contexte",
      content:
        "KAWA Coffee Shop est un établissement situé à Bastos, Yaoundé. Le projet portait sur la professionnalisation de la présentation de son offre, entre expérience en salle et supports digitaux.",
      image: photo(1060, 1400, 900),
    },
    {
      id: "demande",
      title: "Demande initiale",
      content:
        "Le client souhaitait au départ une carte de menu plus claire et plus professionnelle pour présenter son offre en salle.",
      image: photo(225, 1400, 900),
    },
    {
      id: "probleme",
      title: "Problème à résoudre",
      content:
        "La carte ne devait pas rester un simple document tarifaire. Elle devait devenir un support de marque lisible, cohérent avec l'univers du coffee shop, et capable d'évoluer vers une expérience plus digitale.",
      image: photo(431, 1400, 900),
    },
    {
      id: "direction",
      title: "Direction retenue",
      content:
        "Une direction visuelle vintage et premium a été retenue pour renforcer la perception de KAWA, avec des principes de cohérence entre identité, lisibilité et usage réel en salle.",
      image: photo(1011, 1400, 900),
    },
    {
      id: "conception",
      title: "Conception",
      content:
        "Structuration des catégories, hiérarchie des informations, formats adaptés à l'usage, conception du menu imprimé et d'un menu digital consultable sur mobile, avec QR codes et logique de parcours.",
      image: photo(292, 1400, 900),
    },
    {
      id: "production",
      title: "Production",
      content:
        "Les choix d'impression, les adaptations techniques et les contraintes de production ont guidé les décisions finales pour obtenir un livrable premium utilisable au quotidien.",
      image: photo(366, 1400, 900),
    },
    {
      id: "resultat",
      title: "Résultat",
      content:
        "Une présentation plus professionnelle et plus cohérente de l'offre KAWA, avec un support physique premium et une base digitale permettant de prolonger l'expérience client. La preuve repose sur la transformation visible, la cohérence du système et la qualité du livrable final.",
      image: photo(488, 1400, 900),
    },
    {
      id: "evolution",
      title: "Évolution possible",
      content:
        "Des prolongements ont été envisagés : fidélisation, activation via WhatsApp, événements et collecte de données. Ces pistes restent des évolutions possibles, et non des livrables déjà réalisés.",
      image: photo(513, 1400, 900),
    },
  ] satisfies CaseStudySection[],
};
