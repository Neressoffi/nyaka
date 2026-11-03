// Contenus gérés depuis l'administration (Decap CMS) : content/donnees/approche-data.json
import donnees from "@/content/donnees/approche-data.json";
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

export const modeleDimensions: ModeleDimension[] = donnees.modeleDimensions as ModeleDimension[];

export const frameworkPhases: FrameworkPhase[] = donnees.frameworkPhases as FrameworkPhase[];

export const approachBenefits: Benefit[] = donnees.approachBenefits as Benefit[];

export const exampleRows = donnees.exampleRows;
