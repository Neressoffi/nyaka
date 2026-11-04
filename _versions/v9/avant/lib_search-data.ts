import { solutionsOverview } from "@/lib/solutions-data";
import { situationsOverview } from "@/lib/situation-data";
import { featuredProject, projects } from "@/lib/realisations-data";
import { creativeSuiteColumns } from "@/lib/menu-data";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export const searchIndex: SearchItem[] = [
  {
    id: "home",
    title: "Accueil",
    description: "Présentation de NYAKA et entrée vers les besoins et solutions.",
    href: "/",
    category: "Pages",
    keywords: "accueil nyaka marque empreinte",
  },
  {
    id: "solutions",
    title: "Solutions",
    description:
      "Branding, design, vidéo, intelligence artificielle et données.",
    href: "/solutions",
    category: "Pages",
    keywords: "solutions poles expertises offres",
  },
  {
    id: "votre-situation",
    title: "Votre situation",
    description:
      "Lancement, professionnalisation, communication, repositionnement, transformation.",
    href: "/votre-situation",
    category: "Pages",
    keywords: "situation besoin contexte projet",
  },
  {
    id: "notre-approche",
    title: "Notre approche",
    description: "Modèle NYAKA, framework et manière de travailler.",
    href: "/notre-approche",
    category: "Pages",
    keywords: "approche methode framework cadrer diagnostiquer",
  },
  {
    id: "realisations",
    title: "Réalisations",
    description: "Projets et études de cas NYAKA.",
    href: "/realisations",
    category: "Pages",
    keywords: "realisations portfolio projets",
  },
  {
    id: "a-propos",
    title: "À propos",
    description: "Qui est NYAKA, équipe et principes.",
    href: "/a-propos",
    category: "Pages",
    keywords: "apropos equipe qui sommes nous",
  },
  {
    id: "demarrer",
    title: "Démarrer un projet",
    description: "Parler de votre besoin ou de votre idée.",
    href: "/demarrer-un-projet",
    category: "Pages",
    keywords: "contact projet demarrer echange devis",
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Réponses aux questions fréquentes.",
    href: "/#faq",
    category: "Pages",
    keywords: "faq questions reponses tarifs delais",
  },
  ...solutionsOverview.map((pole) => ({
    id: `pole-${pole.id}`,
    title: pole.title,
    description: pole.description,
    href: `/solutions#${pole.id}`,
    category: "Solutions",
    keywords: `${pole.title} ${pole.description} pole`,
  })),
  ...situationsOverview.map((situation) => ({
    id: `situation-${situation.id}`,
    title: situation.title,
    description: situation.description,
    href: `/votre-situation#${situation.id}`,
    category: "Situations",
    keywords: `${situation.title} ${situation.description}`,
  })),
  {
    id: "kawa",
    title: featuredProject.name,
    description: featuredProject.tagline,
    href: featuredProject.caseStudyHref,
    category: "Réalisations",
    keywords: `kawa coffee shop menu ${featuredProject.sector}`,
  },
  ...projects.map((project) => ({
    id: `project-${project.id}`,
    title: project.name,
    description: project.situation,
    href: project.href ?? "/realisations",
    category: "Réalisations",
    keywords: `${project.name} ${project.sector} ${project.interventions}`,
  })),
  ...creativeSuiteColumns.flatMap((column) =>
    column.links.map((link) => ({
      id: `link-${column.title}-${link.label}`,
      title: link.label,
      description: `Dans ${column.title}`,
      href: link.href,
      category: "Services",
      keywords: `${link.label} ${column.title}`,
    }))
  ),
];

export function searchSite(query: string, limit = 12): SearchItem[] {
  const q = normalize(query.trim());
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  return searchIndex
    .map((item) => {
      const haystack = normalize(
        `${item.title} ${item.description} ${item.category} ${item.keywords}`
      );
      const score = terms.reduce((acc, term) => {
        if (normalize(item.title).includes(term)) return acc + 5;
        if (haystack.includes(term)) return acc + 1;
        return acc;
      }, 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item);
}
