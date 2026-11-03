// Contenus gérés depuis l'administration (Decap CMS) : content/donnees/realisations-data.json
import donnees from "@/content/donnees/realisations-data.json";
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

export const projectFilters: { id: "all" | ProjectPole; label: string }[] = donnees.projectFilters as { id: "all" | ProjectPole; label: string }[];

export const featuredProject = donnees.featuredProject;

export const projects: ProjectCard[] = donnees.projects as ProjectCard[];

export const kawaCaseStudy = donnees.kawaCaseStudy;
