import Link from "next/link";
import { ArrowRight } from "lucide-react";
import contenu from "@/content/pages/accueil.json";

// Section 05 — Nos réalisations (Cahier de corrections n°1, 01.11.2026)
// Galerie unique : 1 grand visuel KAWA + grille 2 × 2 de quatre projets.
// Visuels provisoires : leur remplacement appartient au sprint médias.

// Contenus gérés depuis l'administration (Decap CMS) : content/pages/accueil.json
const TXT = contenu.realisations;

const FEATURED = {
  name: TXT.projet_phare.nom,
  category: TXT.projet_phare.categorie,
  text: TXT.projet_phare.texte,
  image: TXT.projet_phare.image,
  href: TXT.projet_phare.lien,
};

const PROJECTS = TXT.projets.map((projet) => ({
  name: projet.nom,
  category: projet.categorie,
  text: projet.texte,
  image: projet.image,
  href: projet.lien,
}));

export function HomeRealisations() {
  return (
    <section className="bg-marketing-surface-1 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">
            {TXT.surtitre}
          </p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
            {TXT.titre}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">
            {TXT.sous_texte}
          </p>
        </div>

        <Link
          href={FEATURED.href}
          className="group relative mt-10 block aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/9] lg:aspect-[21/9]"
        >
          <img
            src={FEATURED.image}
            alt={FEATURED.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:text-xs">
              {TXT.etiquette_phare} · {FEATURED.category}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl lg:text-[40px] lg:leading-tight">
              {FEATURED.name}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90 sm:text-[15px]">
              {FEATURED.text}
            </p>
          </div>
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <Link
              key={project.name}
              href={project.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2lg sm:aspect-[16/10]"
            >
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:text-xs">
                  {project.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
                  {project.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/85 sm:text-sm">
                  {project.text}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={TXT.bouton.lien}
            className="group inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:text-[15px]"
          >
            {TXT.bouton.texte}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
