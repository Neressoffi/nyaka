export type MenuLink = {
  label: string;
  href: string;
  isNew?: boolean;
};

export type MenuColumn = {
  title: string;
  icon: string;
  links: MenuLink[];
};

export const creativeSuiteColumns: MenuColumn[] = [
  {
    title: "Branding",
    icon: "image",
    links: [
      { label: "Identité de marque", href: "/solutions#branding" },
      { label: "Positionnement", href: "/solutions#branding" },
      { label: "Logo", href: "/solutions#branding" },
      { label: "Identité visuelle", href: "/solutions#branding" },
      { label: "Direction artistique", href: "/solutions#branding" },
      { label: "Charte graphique", href: "/solutions#branding" },
      { label: "Univers de marque", href: "/solutions#branding" },
    ],
  },
  {
    title: "Design",
    icon: "palette",
    links: [
      { label: "Flyers", href: "/solutions#design" },
      { label: "Catalogues", href: "/solutions#design" },
      { label: "Menus", href: "/solutions#design" },
      { label: "Brochures", href: "/solutions#design" },
      { label: "Présentations", href: "/solutions#design" },
    ],
  },
  {
    title: "Vidéo & campagnes",
    icon: "video",
    links: [
      { label: "Vidéos publicitaires", href: "/solutions#video" },
      { label: "Teasers", href: "/solutions#video" },
      { label: "Spots", href: "/solutions#video" },
      { label: "Contenus de lancement", href: "/solutions#video" },
      { label: "Campagnes créatives", href: "/solutions#video" },
      { label: "Concepts créatifs", href: "/solutions#video" },
    ],
  },
  {
    title: "IA & données",
    icon: "audio",
    links: [
      { label: "Assistants intelligents", href: "/solutions#ia-data" },
      { label: "Automatisation", href: "/solutions#ia-data" },
      { label: "Collecte de données", href: "/solutions#ia-data" },
      { label: "Structuration de données", href: "/solutions#ia-data" },
    ],
  },
];

export const stockColumns: MenuColumn[] = [
  {
    title: "Lancement",
    icon: "image",
    links: [
      { label: "Vous lancez", href: "/votre-situation#lancement" },
      { label: "Créer une marque", href: "/votre-situation#lancement" },
      { label: "Préparer un lancement", href: "/votre-situation#lancement" },
    ],
  },
  {
    title: "Évolution",
    icon: "palette",
    links: [
      {
        label: "Vous professionnalisez",
        href: "/votre-situation#professionnalisation",
      },
      {
        label: "Vous repositionnez",
        href: "/votre-situation#repositionnement",
      },
      {
        label: "Monter en gamme",
        href: "/votre-situation#professionnalisation",
      },
    ],
  },
  {
    title: "Communication",
    icon: "video",
    links: [
      { label: "Vous communiquez", href: "/votre-situation#communication" },
      {
        label: "Campagne ou lancement",
        href: "/votre-situation#communication",
      },
    ],
  },
  {
    title: "Transformation",
    icon: "box",
    links: [
      { label: "Vous transformez", href: "/votre-situation#transformation" },
      { label: "IA et données", href: "/votre-situation#transformation" },
    ],
  },
];


