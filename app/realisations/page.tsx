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

export default function RealisationsPage() {
  return (
    <main className="bg-[#f5f3ef]">
      <TopBanner />
      <Header />

      {/* Style A (v47) : haut de page espresso comme l'Accueil, galerie sur fond ivoire */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#181615] via-[#2b211d] to-[#171515] px-4 pb-14 pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        <div className="mx-auto w-full max-w-screen-xl">
          <h1 className="text-[38px] font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-[52px] lg:text-[72px]">
            {portfolioPage.titre}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#bfb6aa] sm:text-lg">
            {portfolioPage.introduction}
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
