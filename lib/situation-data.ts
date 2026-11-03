// Contenus gérés depuis l'administration (Decap CMS) : content/donnees/situation-data.json
import donnees from "@/content/donnees/situation-data.json";
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

export const situationsOverview = donnees.situationsOverview;

export const situations: Situation[] = donnees.situations as Situation[];
