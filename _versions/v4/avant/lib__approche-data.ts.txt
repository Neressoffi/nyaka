export type ModeleDimension = {
  name: string;
  question: string;
  looksAt: string;
};

export type FrameworkPhase = {
  number: string;
  title: string;
  description: string;
};

export type Benefit = {
  title: string;
  description: string;
};

export const modeleDimensions: ModeleDimension[] = [
  {
    name: "Identité",
    question: "Qui sommes-nous ?",
    looksAt:
      "Ce que l'organisation représente, son positionnement et ce qui doit rester reconnaissable.",
  },
  {
    name: "Direction",
    question: "Où allons-nous ?",
    looksAt:
      "Les objectifs, les priorités, les choix stratégiques et les décisions qui donnent une direction.",
  },
  {
    name: "Valeur",
    question: "Que créons-nous, pour qui ?",
    looksAt:
      "Le problème résolu, l'offre, la cible et la manière dont l'organisation crée et capte de la valeur.",
  },
  {
    name: "Expression & expérience",
    question: "Comment sommes-nous perçus et vécus ?",
    looksAt:
      "Les messages, visuels, supports et expériences qui rendent la promesse concrète.",
  },
  {
    name: "Capacités",
    question: "Avec quels moyens ?",
    looksAt:
      "Les compétences, outils, données, technologies, processus et partenaires nécessaires pour exécuter.",
  },
];

export const frameworkPhases: FrameworkPhase[] = [
  {
    number: "01",
    title: "Cadrer",
    description:
      "Clarifier la situation, le besoin et le résultat recherché.",
  },
  {
    number: "02",
    title: "Diagnostiquer",
    description:
      "Identifier les écarts, incohérences, contraintes et opportunités.",
  },
  {
    number: "03",
    title: "Aligner",
    description:
      "Définir les décisions prioritaires et l'état cible.",
  },
  {
    number: "04",
    title: "Concevoir",
    description:
      "Construire la réponse et organiser les solutions nécessaires.",
  },
  {
    number: "05",
    title: "Déployer",
    description:
      "Produire, coordonner et mettre en œuvre la transformation.",
  },
  {
    number: "06",
    title: "Faire évoluer",
    description:
      "Observer, ajuster et adapter lorsque le projet ou l'organisation évolue.",
  },
];

export const approachBenefits: Benefit[] = [
  {
    title: "Clarté",
    description: "Le client comprend ce qui doit réellement être traité.",
  },
  {
    title: "Cohérence",
    description:
      "Les différents livrables et expertises servent le même objectif.",
  },
  {
    title: "Priorisation",
    description:
      "Le projet évite d'investir trop tôt dans des éléments secondaires.",
  },
  {
    title: "Adaptabilité",
    description:
      "La réponse peut évoluer avec l'organisation sans repartir systématiquement de zéro.",
  },
];

export const exampleRows = [
  {
    label: "Ce que le client demande",
    value: "Une vidéo.",
  },
  {
    label: "Ce que NYAKA clarifie",
    value:
      "L'offre à promouvoir, la cible, le message, l'action attendue et le contexte de diffusion.",
  },
  {
    label: "Ce que NYAKA peut recommander",
    value:
      "Un concept, un script, une vidéo et les déclinaisons réellement nécessaires à la campagne.",
  },
  {
    label: "Ce que le client obtient",
    value:
      "Un contenu construit autour d'un objectif, plutôt qu'une vidéo isolée.",
  },
];
