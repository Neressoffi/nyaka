import { photo } from "./media";

export type AccordionItem = {
  icon: string;
  title: string;
  description: string;
  image: string;
};

export type TabContent = {
  id: string;
  label: string;
  shortLabel: string;
  panelTitle: string;
  panelDescription: string;
  ctaLabel: string;
  ctaHref: string;
  items: AccordionItem[];
};

export const tabs: TabContent[] = [
  {
    id: "branding",
    label: "Branding et identité de marque",
    shortLabel: "Branding",
    panelTitle: "Une identité reconnaissable et cohérente",
    panelDescription:
      "Positionnement, logo, identité visuelle et direction artistique : nous construisons une marque capable d'évoluer avec votre organisation.",
    ctaLabel: "Explorer le branding",
    ctaHref: "/solutions#branding",
    items: [
      {
        icon: "image",
        title: "Positionnement",
        description:
          "Clarifier ce que la marque représente, pour qui, et ce qui doit la distinguer.",
        image: photo(1025, 1200, 900),
      },
      {
        icon: "layout",
        title: "Identité visuelle",
        description:
          "Logo, couleurs, typographie et règles pour une marque reconnaissable.",
        image: photo(1065, 1200, 900),
      },
      {
        icon: "box",
        title: "Direction artistique",
        description:
          "Donner une cohérence visuelle à tous les points de contact de la marque.",
        image: photo(1055, 1200, 900),
      },
    ],
  },
  {
    id: "design",
    label: "Design et supports de communication",
    shortLabel: "Design",
    panelTitle: "Des supports professionnels, prêts à servir votre offre",
    panelDescription:
      "Flyers, catalogues, menus, brochures et présentations : nous donnons une forme claire et premium à vos messages et points de contact.",
    ctaLabel: "Explorer le design",
    ctaHref: "/solutions#design",
    items: [
      {
        icon: "layout",
        title: "Supports print",
        description:
          "Flyers, brochures, catalogues et documents commerciaux cohérents avec la marque.",
        image: photo(1065, 1200, 900),
      },
      {
        icon: "image",
        title: "Menus et catalogues",
        description:
          "Présenter l'offre de façon claire, premium et utilisable au quotidien.",
        image: photo(1025, 1200, 900),
      },
      {
        icon: "box",
        title: "Présentations",
        description:
          "Des supports professionnels pour présenter une offre, un projet ou une vision.",
        image: photo(1055, 1200, 900),
      },
    ],
  },
  {
    id: "video",
    label: "Contenus vidéo et campagnes créatives",
    shortLabel: "Vidéo",
    panelTitle: "Des contenus pensés pour l'action",
    panelDescription:
      "Teasers, vidéos publicitaires, spots et campagnes : nous transformons votre message en contenus capables d'attirer l'attention.",
    ctaLabel: "Explorer la vidéo",
    ctaHref: "/solutions#video",
    items: [
      {
        icon: "video",
        title: "Vidéo publicitaire",
        description:
          "Transformer une offre ou un message en teaser, spot ou contenu de lancement.",
        image: photo(1035, 1200, 900),
      },
      {
        icon: "box",
        title: "Campagnes créatives",
        description:
          "Construire un concept, un message et des déclinaisons cohérentes.",
        image: photo(1045, 1200, 900),
      },
      {
        icon: "image",
        title: "Contenus de lancement",
        description:
          "Attirer l'attention autour d'un lancement, d'une offre ou d'un événement.",
        image: photo(1025, 1200, 900),
      },
    ],
  },
  {
    id: "ia-data",
    label: "Intelligence artificielle et données",
    shortLabel: "IA et données",
    panelTitle: "L'intelligence artificielle au service du réel",
    panelDescription:
      "Assistants, automatisation, collecte et structuration de données : nous intégrons l'IA là où elle améliore réellement votre fonctionnement.",
    ctaLabel: "Explorer l'IA",
    ctaHref: "/solutions#ia-data",
    items: [
      {
        icon: "audio",
        title: "Assistants intelligents",
        description:
          "Concevoir un assistant ou un chatbot à partir d'un usage et d'un objectif précis.",
        image: photo(1055, 1200, 900),
      },
      {
        icon: "box",
        title: "Collecte de données",
        description:
          "Organiser la collecte d'informations pour mieux comprendre et accompagner vos publics.",
        image: photo(1045, 1200, 900),
      },
      {
        icon: "layout",
        title: "Automatisation",
        description:
          "Intégrer l'automatisation là où elle simplifie un parcours ou une décision.",
        image: photo(1065, 1200, 900),
      },
    ],
  },
];
