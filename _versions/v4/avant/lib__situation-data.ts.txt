import { photo } from "./media";

export type Situation = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  recognizeIf: string[];
  howWeHelp: string[];
  poles: { label: string; href: string }[];
  cta: { label: string; href: string };
  image: string;
};

export const situationsOverview = [
  {
    id: "lancement",
    title: "Vous lancez",
    description:
      "Créer une marque, une activité, une offre ou préparer un premier lancement.",
  },
  {
    id: "professionnalisation",
    title: "Vous professionnalisez",
    description:
      "Élever la qualité perçue de votre image, de vos supports ou de votre expérience.",
  },
  {
    id: "communication",
    title: "Vous communiquez",
    description:
      "Faire connaître, expliquer, lancer ou renforcer l'impact d'un message.",
  },
  {
    id: "repositionnement",
    title: "Vous repositionnez",
    description:
      "Faire évoluer une identité, une perception ou une offre devenue moins adaptée.",
  },
  {
    id: "transformation",
    title: "Vous transformez",
    description:
      "Intégrer de nouveaux outils, l'IA, les données ou une nouvelle manière de fonctionner.",
  },
] as const;

export const situations: Situation[] = [
  {
    id: "lancement",
    number: "01",
    title: "Vous lancez",
    subtitle:
      "Une idée forte a besoin d'une base claire avant de devenir visible.",
    description:
      "Cette situation concerne les organisations, marques, offres ou projets en phase de création ou de lancement. NYAKA peut intervenir avant même que l'identité, les supports ou la communication soient totalement définis.",
    overview:
      "Créer une marque, une activité, une offre ou préparer un premier lancement.",
    recognizeIf: [
      "Vous avez une idée mais l'identité reste à construire.",
      "Vous préparez le lancement d'une nouvelle marque ou activité.",
      "Votre offre existe, mais sa présentation n'est pas encore professionnelle.",
      "Vous devez créer les premiers supports et contenus de lancement.",
    ],
    howWeHelp: [
      "Clarifier la perception recherchée et les priorités du lancement.",
      "Construire l'identité et les premiers supports.",
      "Préparer les messages et contenus nécessaires.",
      "Définir les outils utiles au démarrage sans surdimensionner le projet.",
    ],
    poles: [
      { label: "Branding et identité", href: "/solutions#branding" },
      { label: "Design et supports", href: "/solutions#design" },
      { label: "Contenus vidéo et campagnes", href: "/solutions#video" },
    ],
    cta: { label: "Préparer votre lancement", href: "#" },
    image: photo(1060, 1200, 900),
  },
  {
    id: "professionnalisation",
    number: "02",
    title: "Vous professionnalisez",
    subtitle:
      "Votre niveau réel doit enfin être visible dans la manière dont votre organisation se présente.",
    description:
      "Une entreprise peut fonctionner correctement tout en donnant une impression trop amateur, incohérente ou en dessous de son ambition. Cette phase consiste à faire correspondre la perception à la qualité que l'organisation souhaite réellement incarner.",
    overview:
      "Élever la qualité perçue de votre image, de vos supports ou de votre expérience.",
    recognizeIf: [
      "Votre logo ou vos supports ne correspondent plus à votre niveau.",
      "Votre communication manque d'unité.",
      "Vos documents, visuels ou présentations réduisent votre crédibilité.",
      "Vous souhaitez créer une expérience plus premium.",
    ],
    howWeHelp: [
      "Identifier les écarts entre la promesse et la perception actuelle.",
      "Revoir l'identité ou la direction artistique si nécessaire.",
      "Professionnaliser les supports prioritaires.",
      "Harmoniser les principaux points de contact avec la marque.",
    ],
    poles: [
      { label: "Branding et identité", href: "/solutions#branding" },
      { label: "Design et supports", href: "/solutions#design" },
      { label: "Contenus vidéo selon les besoins", href: "/solutions#video" },
    ],
    cta: { label: "Professionnaliser votre image", href: "#" },
    image: photo(1062, 1200, 900),
  },
  {
    id: "communication",
    number: "03",
    title: "Vous communiquez",
    subtitle:
      "Un bon message ne doit pas seulement être beau. Il doit être compris et provoquer une action.",
    description:
      "Cette situation concerne les organisations qui doivent faire connaître une offre, expliquer un service, lancer une campagne, promouvoir un événement ou créer des contenus plus impactants.",
    overview:
      "Faire connaître, expliquer, lancer ou renforcer l'impact d'un message.",
    recognizeIf: [
      "Vous préparez une campagne ou un lancement.",
      "Votre activité est difficile à expliquer rapidement.",
      "Vous manquez de vidéos ou de contenus professionnels.",
      "Vos supports actuels ne déclenchent pas suffisamment d'attention.",
    ],
    howWeHelp: [
      "Clarifier le message et l'action recherchée.",
      "Définir l'angle créatif et le format adapté.",
      "Produire les vidéos, visuels et supports nécessaires.",
      "Construire des déclinaisons cohérentes autour du même message.",
    ],
    poles: [
      {
        label: "Contenus vidéo et campagnes",
        href: "/solutions#video",
      },
      { label: "Design et supports", href: "/solutions#design" },
      {
        label: "Branding si le problème est plus profond",
        href: "/solutions#branding",
      },
    ],
    cta: { label: "Préparer votre prochaine campagne", href: "#" },
    image: photo(1043, 1200, 900),
  },
  {
    id: "repositionnement",
    number: "04",
    title: "Vous repositionnez",
    subtitle:
      "Parfois, le problème n'est pas de repartir de zéro, mais de faire évoluer ce qui existe déjà.",
    description:
      "Cette situation apparaît lorsqu'une organisation change de marché, monte en gamme, élargit son offre ou constate que son identité actuelle ne traduit plus correctement son ambition.",
    overview:
      "Faire évoluer une identité, une perception ou une offre devenue moins adaptée.",
    recognizeIf: [
      "Votre marque est devenue difficile à différencier.",
      "Vous entrez sur un nouveau marché ou visez une nouvelle cible.",
      "Votre offre a évolué mais votre image n'a pas suivi.",
      "Vous souhaitez monter en gamme sans perdre ce qui fait votre identité.",
    ],
    howWeHelp: [
      "Comprendre ce qui doit être conservé et ce qui doit évoluer.",
      "Clarifier le nouveau positionnement et la perception cible.",
      "Adapter l'identité, les messages et les supports.",
      "Préparer la transition pour maintenir la cohérence de la marque.",
    ],
    poles: [
      { label: "Branding et identité", href: "/solutions#branding" },
      { label: "Design et supports", href: "/solutions#design" },
      {
        label: "Contenus vidéo selon la phase",
        href: "/solutions#video",
      },
    ],
    cta: { label: "Faire évoluer votre marque", href: "#" },
    image: photo(1067, 1200, 900),
  },
  {
    id: "transformation",
    number: "05",
    title: "Vous transformez",
    subtitle:
      "La technologie n'a de valeur que lorsqu'elle répond à un besoin réel de l'organisation.",
    description:
      "Cette situation concerne les organisations qui souhaitent intégrer l'intelligence artificielle, exploiter davantage leurs données, automatiser certains échanges ou faire évoluer une expérience grâce à la technologie.",
    overview:
      "Intégrer de nouveaux outils, l'IA, les données ou une nouvelle manière de fonctionner.",
    recognizeIf: [
      "Vous envisagez un assistant intelligent ou un chatbot.",
      "Vous souhaitez mieux collecter ou exploiter certaines données.",
      "Vous voulez automatiser une tâche ou un parcours répétitif.",
      "Vous avez une idée technologique mais son usage reste à clarifier.",
    ],
    howWeHelp: [
      "Identifier le problème réel et l'usage prioritaire.",
      "Définir les données, utilisateurs et résultats attendus.",
      "Concevoir la solution fonctionnelle adaptée.",
      "Mobiliser les partenaires techniques nécessaires lorsque le projet l'exige.",
    ],
    poles: [
      {
        label: "Intelligence artificielle et données",
        href: "/solutions#ia-data",
      },
      {
        label: "Design / expérience si le parcours doit être repensé",
        href: "/solutions#design",
      },
    ],
    cta: { label: "Parler de votre projet IA ou data", href: "#" },
    image: photo(1015, 1200, 900),
  },
];
