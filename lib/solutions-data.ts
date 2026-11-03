// Contenus gérés depuis l'administration (Decap CMS) : content/donnees/solutions-data.json
import donnees from "@/content/donnees/solutions-data.json";
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

export const solutionsOverview = donnees.solutionsOverview;

export const solutionsPoles: SolutionPole[] = donnees.solutionsPoles as SolutionPole[];

export const combinationExamples: CombinationExample[] = donnees.combinationExamples as CombinationExample[];
