import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getProjet,
  mediasAutorises,
  portfolioPage,
  projetsPublies,
  type MediaItem,
  type Section,
} from "@/lib/portfolio";

// Fiche projet (Branding & Design) ou fiche produit (IA & Data) — 5 temps :
// couverture · le défi · notre réponse · les réalisations · le résultat.
// Contenus : content/realisations/portfolio.json (administration).

export const dynamicParams = false;

export function generateStaticParams() {
  return projetsPublies.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const projet = getProjet(params.slug);
  if (!projet) return {};
  const title = `${projet.titre} | Réalisations NYAKA`;
  return {
    title,
    description: `${projet.accroche} ${projet.expertises}.`,
    openGraph: {
      title,
      description: projet.accroche,
      type: "article",
      locale: "fr_FR",
      siteName: "NYAKA",
      images: [{ url: projet.couverture.image, alt: projet.couverture.alt }],
    },
  };
}

function Bloc({
  numero,
  etiquette,
  section,
}: {
  numero: string;
  etiquette: string;
  section: Section;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8A53A] sm:text-xs">
        {numero} · {etiquette}
      </p>
      <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
        {section.accroche}
      </h2>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
        {section.texte}
      </p>
    </div>
  );
}

function grouper(medias: MediaItem[]) {
  const groupes: { type: string; medias: MediaItem[] }[] = [];
  for (const m of medias) {
    const g = groupes.find((x) => x.type === m.type);
    if (g) g.medias.push(m);
    else groupes.push({ type: m.type, medias: [m] });
  }
  return groupes;
}

export default function FicheProjet({ params }: { params: { slug: string } }) {
  const projet = getProjet(params.slug);
  if (!projet) notFound();

  const e = portfolioPage.etiquettes;
  const groupes = grouper(mediasAutorises(projet));

  return (
    <main className="bg-black">
      <TopBanner />
      <Header />

      {/* 01 · Couverture plein écran (passe derrière le menu) */}
      <header className="relative flex min-h-[78vh] items-end overflow-hidden bg-[#171515] lg:min-h-[86vh]">
        <img
          src={projet.couverture.image}
          alt={projet.couverture.alt}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-screen-xl px-4 pb-14 pt-40 lg:px-8 lg:pb-20">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Toutes les réalisations
          </Link>
          <h1 className="mt-6 font-display text-[38px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[76px]">
            {projet.titre}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {projet.accroche}
          </p>
          <p className="mt-3 text-sm text-white/55 sm:text-base">{projet.expertises}</p>
        </div>
      </header>

      <article className="bg-black px-4 pb-24 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-screen-xl">
          {/* 02 · Le défi — 03 · Notre réponse */}
          <div className="grid gap-12 pt-16 md:grid-cols-2 md:gap-10 lg:pt-24">
            <Bloc numero="02" etiquette={e.defi} section={projet.defi} />
            <Bloc numero="03" etiquette={e.reponse} section={projet.reponse} />
          </div>

          {/* 04 · Les réalisations */}
          <section className="mt-16 border-t border-white/10 pt-14 lg:mt-24 lg:pt-20">
            <Bloc numero="04" etiquette={e.realisations} section={projet.realisations} />

            {groupes.map((groupe) => (
              <div key={groupe.type} className="mt-12">
                <h3 className="text-sm font-semibold text-white/60 sm:text-[15px]">
                  {groupe.type}
                </h3>
                <ul
                  className={`mt-4 grid gap-4 sm:gap-6 ${
                    groupe.medias.length > 1 ? "md:grid-cols-2" : ""
                  }`}
                >
                  {groupe.medias.map((m) => (
                    <li key={m.image}>
                      <figure>
                        <div className="overflow-hidden rounded-[20px] bg-white/5 lg:rounded-[24px]">
                          <img
                            src={m.image}
                            alt={m.alt}
                            loading="lazy"
                            decoding="async"
                            className="block h-auto w-full"
                          />
                        </div>
                        {m.legende && (
                          <figcaption className="mt-2.5 text-sm text-white/55">
                            {m.legende}
                          </figcaption>
                        )}
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* 05 · Le résultat */}
          <section className="mt-16 border-t border-white/10 pt-14 lg:mt-24 lg:pt-20">
            <Bloc numero="05" etiquette={e.resultat} section={projet.resultat} />
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
