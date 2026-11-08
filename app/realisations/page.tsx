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
    <main className="bg-black">
      <TopBanner />
      <Header />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-screen-xl flex-col justify-center px-4 pb-20 pt-32 lg:px-8 lg:pb-24 lg:pt-36">
          <h1 className="font-display text-[34px] font-bold leading-[1.1] text-white sm:text-[44px] lg:text-[56px]">
            {portfolioPage.titre}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {portfolioPage.introduction}
          </p>
        </div>
      </section>

      <section className="bg-black px-4 pb-20 pt-6 lg:px-8 lg:pb-28 lg:pt-10">
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
