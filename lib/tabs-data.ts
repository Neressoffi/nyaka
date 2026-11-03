// Contenus gérés depuis l'administration (Decap CMS) : content/donnees/tabs-data.json
import donnees from "@/content/donnees/tabs-data.json";
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

export const tabs: TabContent[] = donnees.tabs as TabContent[];
