import { photo } from "./media";

export type SolutionPole = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  whenRelevant: string[];
  solutions: string[];
  proof: {
    project: string;
    note: string;
    image: string;
  };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type CombinationExample = {
  situation: string;
  combination: string;
};

export const solutionsOverview = [
  {
    id: "branding",
    title: "Branding et identité de marque",
    description:
      "Construire ou faire évoluer une marque claire, distinctive et cohérente.",
  },
  {
    id: "design",
    title: "Design et supports de communication",
    description:
      "Donner une forme professionnelle à vos offres, vos messages et vos points de contact.",
  },
  {
    id: "video",
    title: "Contenus vidéo et campagnes créatives",
    description:
      "Transformer un message, une offre ou un lancement en contenus vidéo capables d'attirer l'attention.",
  },
  {
    id: "ia-data",
    title: "Intelligence artificielle et données",
    description:
      "Intégrer des solutions intelligentes et exploiter les données là où elles créent une valeur réelle.",
  },
] as const;

export const solutionsPoles: SolutionPole[] = [
  {
    id: "branding",
    label: "Pôle 1",
    title: "Branding et identité de marque",
    subtitle: "Construire une marque claire, distinctive et capable d'évoluer.",
    description:
      "Ce pôle intervient lorsqu'une organisation doit définir ce qu'elle représente, améliorer la perception de sa marque ou créer un système visuel suffisamment cohérent pour accompagner sa croissance.",
    whenRelevant: [
      "Vous créez une nouvelle marque ou une nouvelle activité.",
      "Votre image ne correspond plus à votre niveau d'ambition.",
      "Votre marque manque de cohérence ou de reconnaissance.",
      "Vous préparez une montée en gamme ou un repositionnement.",
    ],
    solutions: [
      "Positionnement et direction de marque.",
      "Création ou refonte de logo.",
      "Identité visuelle et charte graphique.",
      "Direction artistique et univers de marque.",
      "Déclinaisons et applications essentielles.",
    ],
    proof: {
      project: "BRIRENA HAIR",
      note: "Identité, univers visuel et déclinaisons de marque.",
      image: photo(1060, 1200, 900),
    },
    primaryCta: {
      label: "Découvrir nos projets de branding",
      href: "/realisations",
    },
    secondaryCta: {
      label: "Parler de votre marque",
      href: "#",
    },
  },
  {
    id: "design",
    label: "Pôle 2",
    title: "Design et supports de communication",
    subtitle:
      "Donner une forme professionnelle à vos idées, vos offres et vos messages.",
    description:
      "NYAKA conçoit des supports destinés à présenter, expliquer ou valoriser une organisation. Le design doit rester lisible, cohérent avec la marque et adapté au contexte réel d'utilisation.",
    whenRelevant: [
      "Vous devez présenter une offre, un produit ou un événement.",
      "Vos supports actuels manquent de cohérence ou de qualité.",
      "Vous avez besoin d'un catalogue, d'un menu ou d'un document professionnel.",
      "Vous souhaitez harmoniser vos supports imprimés et digitaux.",
    ],
    solutions: [
      "Flyers et affiches.",
      "Brochures et catalogues.",
      "Menus et supports de présentation d'offres.",
      "Présentations commerciales et institutionnelles.",
      "Supports imprimés et digitaux.",
    ],
    proof: {
      project: "KAWA Coffee Shop",
      note: "Plusieurs supports cohérents plutôt qu'un visuel isolé.",
      image: photo(1062, 1200, 900),
    },
    primaryCta: {
      label: "Voir nos réalisations design",
      href: "/realisations",
    },
    secondaryCta: {
      label: "Présenter votre besoin",
      href: "#",
    },
  },
  {
    id: "video",
    label: "Pôle 3",
    title: "Contenus vidéo et campagnes créatives",
    subtitle:
      "Créer des vidéos et des campagnes qui rendent un message visible, clair et mémorable.",
    description:
      "La vidéo est au centre de ce pôle. NYAKA travaille le message, le concept créatif et la production afin que le contenu serve un objectif précis : faire connaître, expliquer, lancer, convaincre ou prolonger l'impact d'un événement.",
    whenRelevant: [
      "Vous lancez une offre, un service ou un événement.",
      "Vous devez expliquer votre activité de manière plus attractive.",
      "Votre communication manque de contenus vidéo professionnels.",
      "Vous souhaitez transformer une idée en campagne cohérente.",
    ],
    solutions: [
      "Teasers et vidéos publicitaires.",
      "Spots promotionnels et vidéos de lancement.",
      "Vidéos de présentation et formats courts.",
      "Scripts, concepts créatifs et direction de contenu.",
      "Montage et déclinaisons de campagne.",
    ],
    proof: {
      project: "THE VISION",
      note: "Message, vidéo et déclinaisons montrés ensemble.",
      image: photo(1043, 1200, 900),
    },
    primaryCta: {
      label: "Découvrir nos contenus vidéo",
      href: "/realisations",
    },
    secondaryCta: {
      label: "Préparer une campagne",
      href: "#",
    },
  },
  {
    id: "ia-data",
    label: "Pôle 4",
    title: "Intelligence artificielle et données",
    subtitle:
      "Intégrer l'intelligence artificielle et les données là où elles créent une valeur réelle.",
    description:
      "NYAKA aide les organisations à identifier des usages pertinents de l'IA et des données, puis à concevoir ou coordonner des solutions adaptées. Selon la complexité, la réalisation technique peut mobiliser des partenaires spécialisés.",
    whenRelevant: [
      "Vous souhaitez automatiser une interaction ou une tâche répétitive.",
      "Vous voulez mieux collecter ou structurer certaines données clients.",
      "Vous envisagez un assistant intelligent ou un chatbot.",
      "Vous avez une idée liée à l'IA, mais son usage réel n'est pas encore clarifié.",
    ],
    solutions: [
      "Identification des cas d'usage pertinents.",
      "Assistants intelligents et chatbots selon les projets.",
      "Automatisation de tâches et parcours simples.",
      "Collecte et structuration de données.",
      "Conception fonctionnelle et coordination de solutions intelligentes.",
    ],
    proof: {
      project: "Prototype validé",
      note: "Démonstrations, prototypes ou projets réels uniquement.",
      image: photo(1047, 1200, 900),
    },
    primaryCta: {
      label: "Parler d'un projet IA",
      href: "#",
    },
    secondaryCta: {
      label: "Explorer une solution adaptée",
      href: "#",
    },
  },
];

export const combinationExamples: CombinationExample[] = [
  {
    situation: "Lancement d'une nouvelle marque",
    combination:
      "Branding + supports de communication + contenus de lancement.",
  },
  {
    situation: "Montée en gamme d'un établissement",
    combination: "Branding + design des supports + expérience et contenus.",
  },
  {
    situation: "Campagne de lancement",
    combination:
      "Message + direction créative + vidéo + supports visuels.",
  },
  {
    situation: "Assistant client intelligent",
    combination:
      "Clarification du besoin + données + conception fonctionnelle + intégration via partenaires si nécessaire.",
  },
];
