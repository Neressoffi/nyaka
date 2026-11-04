// Portfolio NYAKA (cahier de corrections n°2)
// Contenus gérés depuis l'administration : content/realisations/portfolio.json
import donnees from "@/content/realisations/portfolio.json";

export type Statut = "publie" | "brouillon";
export type Categorie = "branding-design" | "ia-data";

export type Section = { accroche: string; texte: string };

export type MediaItem = {
  image: string;
  type: string;
  legende?: string;
  alt: string;
  autorise?: boolean;
};

export type Projet = {
  slug: string;
  titre: string;
  categorie: Categorie;
  statut: Statut;
  expertises: string;
  accroche: string;
  couverture: { image: string; alt: string };
  defi: Section;
  reponse: Section;
  realisations: Section;
  resultat: Section;
  galerie?: MediaItem[];
};

export type Video = {
  titre: string;
  client: string;
  miniature: string;
  video: string;
  format: "horizontal" | "vertical";
  description: string;
  alt?: string;
  statut: Statut;
};

export type PortfolioTexts = typeof donnees.page;
export type VideosIntro = typeof donnees.videos_intro;

export const portfolioPage: PortfolioTexts = donnees.page;
export const videosIntro: VideosIntro = donnees.videos_intro;

const tousProjets = donnees.projets as Projet[];
const toutesVideos = donnees.videos as Video[];

// Seuls les contenus publiés sont visibles. Une vidéo sans fichier reste invisible.
export const projetsPublies: Projet[] = tousProjets.filter(
  (p) => p.statut === "publie" && p.slug
);

export const videosPubliees: Video[] = toutesVideos.filter(
  (v) => v.statut === "publie" && Boolean(v.video)
);

// Dans une galerie, seuls les médias autorisés à la publication sont affichés.
export function mediasAutorises(projet: Projet): MediaItem[] {
  return (projet.galerie ?? []).filter((m) => m.image && m.autorise !== false);
}

export function getProjet(slug: string): Projet | undefined {
  return projetsPublies.find((p) => p.slug === slug);
}
