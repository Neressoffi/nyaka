export type AproposPole = {
  title: string;
  description: string;
  href: string;
};

export type AproposPrinciple = {
  title: string;
  description: string;
};

export type TeamRole = {
  title: string;
  description: string;
};

export type ClientReference = {
  name: string;
  href?: string;
};

export const aproposPoles: AproposPole[] = [
  {
    title: "Branding et identité de marque",
    description:
      "Construire ou faire évoluer l'identité et l'univers d'une marque.",
    href: "/solutions#branding",
  },
  {
    title: "Design et supports de communication",
    description:
      "Donner une forme professionnelle aux offres, messages et points de contact.",
    href: "/solutions#design",
  },
  {
    title: "Contenus vidéo et campagnes créatives",
    description:
      "Transformer une idée ou un message en contenus capables d'attirer l'attention et de provoquer une action.",
    href: "/solutions#video",
  },
  {
    title: "Intelligence artificielle et données",
    description:
      "Identifier et intégrer des usages intelligents là où ils créent une valeur réelle.",
    href: "/solutions#ia-data",
  },
];

export const aproposPrinciples: AproposPrinciple[] = [
  {
    title: "Comprendre avant de produire",
    description:
      "La demande du client est un point de départ. Nous cherchons d'abord le résultat réellement attendu.",
  },
  {
    title: "Cohérence avant accumulation",
    description:
      "Nous ne recommandons pas davantage de livrables lorsqu'une solution plus simple suffit.",
  },
  {
    title: "Utilité avant effet de mode",
    description:
      "Design, vidéo, IA ou données doivent répondre à un usage et à un objectif réels.",
  },
  {
    title: "Évoluer sans perdre l'identité",
    description:
      "Les solutions doivent pouvoir accompagner les changements futurs sans obliger l'organisation à repartir de zéro.",
  },
];

export const teamRoles: TeamRole[] = [
  {
    title: "Direction / stratégie",
    description:
      "Responsables de la vision, du cadrage et de la coordination.",
  },
  {
    title: "Design",
    description: "Identité visuelle, supports et direction artistique.",
  },
  {
    title: "Vidéo / contenu",
    description: "Conception, montage et production de contenus.",
  },
  {
    title: "Technologie / IA",
    description:
      "Expertise interne ou partenaires spécialisés selon les projets.",
  },
  {
    title: "Partenaires",
    description:
      "Production, impression, développement ou expertises spécifiques lorsque nécessaire.",
  },
];

export const clientReferences: ClientReference[] = [
  { name: "KAWA Coffee Shop", href: "/realisations/kawa-coffee-shop" },
  { name: "THE VISION", href: "/realisations" },
  { name: "7G Services", href: "/realisations" },
  { name: "NEMESIS", href: "/realisations" },
  { name: "BRIRENA HAIR", href: "/realisations" },
  { name: "Perfecta", href: "/realisations" },
];
