import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RealisationsFinalCta } from "@/components/realisations/RealisationsFinalCta";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import {
  portfolioPage,
  projetsPublies,
  videosIntro,
  videosPubliees,
} from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Nos réalisations | NYAKA",
  description: portfolioPage.introduction,
  openGraph: {
    title: "Nos réalisations | NYAKA",
    description: portfolioPage.introduction,
    type: "website",
    locale: "fr_FR",
    siteName: "NYAKA",
  },
};

// Couleurs (v58, prototype 2) : dernier mot du titre en or du logo (#D8A53A),
// « prennent vie. » en or clair (#e8c477). Les textes restent modifiables
// dans l'administration.
function couper(texte: string, repere: string) {
  const i = texte.lastIndexOf(repere);
  return i > 0 ? [texte.slice(0, i), texte.slice(i)] : [texte, ""];
}

export default function RealisationsPage() {
  const titre = portfolioPage.titre.trim();
  const [titreDebut, titreFin] = couper(titre, titre.slice(titre.lastIndexOf(" ") + 1));
  const [introDebut, introFin] = couper(portfolioPage.introduction, "prennent vie");

  return (
    <main className="bg-[#f5f3ef]">
      <TopBanner />
      <Header />

      {/* Style A (v47) : haut de page espresso comme l'Accueil, galerie sur fond ivoire */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#181615] via-[#2b211d] to-[#171515] px-4 pb-14 pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        <div className="mx-auto w-full max-w-screen-xl">
          <h1 className="text-[38px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[52px] lg:text-[72px]">
            {titreDebut}
            <span className="text-[#D8A53A]">{titreFin}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#bfb6aa] sm:text-lg">
            {introDebut}
            {introFin && <span className="text-[#e8c477]">{introFin}</span>}
          </p>
        </div>
      </section>

      <section className="bg-[#f5f3ef] px-4 pb-20 pt-2 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-screen-xl">
          <PortfolioGallery
            texts={portfolioPage}
            videosIntro={videosIntro}
            projets={projetsPublies}
            videos={videosPubliees}
          />
        </div>
      </section>

      <RealisationsFinalCta />
      <Footer />
    </main>
  );
}
