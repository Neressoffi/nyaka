// Contenus gérés depuis l'administration (Decap CMS) : content/donnees/apropos-data.json
import donnees from "@/content/donnees/apropos-data.json";
export type AproposPole = {
  title: string;
  description: string;
  href: string;
};

export type AproposPrinciple = {
  title: string;
  description: string;
};

export type TeamRole = {
  title: string;
  description: string;
};

export type ClientReference = {
  name: string;
  href?: string;
};

export const aproposPoles: AproposPole[] = donnees.aproposPoles as AproposPole[];

export const aproposPrinciples: AproposPrinciple[] = donnees.aproposPrinciples as AproposPrinciple[];

export const teamRoles: TeamRole[] = donnees.teamRoles as TeamRole[];

export const clientReferences: ClientReference[] = donnees.clientReferences as ClientReference[];
