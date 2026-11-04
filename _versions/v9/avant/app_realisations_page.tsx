import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RealisationsHero } from "@/components/realisations/RealisationsHero";
import { RealisationsFeatured } from "@/components/realisations/RealisationsFeatured";
import { RealisationsGrid } from "@/components/realisations/RealisationsGrid";
import { RealisationsFinalCta } from "@/components/realisations/RealisationsFinalCta";

export const metadata: Metadata = {
  title: "Réalisations et projets | NYAKA",
  description:
    "Découvrez les projets accompagnés par NYAKA en branding, design, contenus vidéo et solutions intelligentes, avec KAWA Coffee Shop comme étude de cas principale.",
};

export default function RealisationsPage() {
  return (
    <main>
      <TopBanner />
      <Header />
      <RealisationsHero />
      <RealisationsFeatured />
      <RealisationsGrid />
      <RealisationsFinalCta />
      <Footer />
    </main>
  );
}
