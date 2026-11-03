// Contenus gérés depuis l'administration (Decap CMS) : content/donnees/menu-data.json
import donnees from "@/content/donnees/menu-data.json";
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

export const creativeSuiteColumns: MenuColumn[] = donnees.creativeSuiteColumns as MenuColumn[];

export const stockColumns: MenuColumn[] = donnees.stockColumns as MenuColumn[];


