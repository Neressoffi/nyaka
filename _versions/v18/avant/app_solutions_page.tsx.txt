import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsOverview } from "@/components/solutions/SolutionsOverview";
import { SolutionsStickyNav } from "@/components/solutions/SolutionsStickyNav";
import { SolutionsPole } from "@/components/solutions/SolutionsPole";
import { SolutionsCombination } from "@/components/solutions/SolutionsCombination";
import { SolutionsFinalCta } from "@/components/solutions/SolutionsFinalCta";
import { solutionsPoles } from "@/lib/solutions-data";

export const metadata: Metadata = {
  title: "Solutions créatives et intelligentes | NYAKA",
  description:
    "Découvrez les solutions NYAKA en branding, design, contenus vidéo, intelligence artificielle et données, adaptées à la réalité de chaque projet.",
};

export default function SolutionsPage() {
  return (
    <main>
      <TopBanner />
      <Header />
      <SolutionsHero />
      <SolutionsOverview />
      <SolutionsStickyNav />
      {solutionsPoles.map((pole, index) => (
        <SolutionsPole key={pole.id} pole={pole} index={index} />
      ))}
      <SolutionsCombination />
      <SolutionsFinalCta />
      <Footer />
    </main>
  );
}
