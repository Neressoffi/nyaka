import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SituationHero } from "@/components/situation/SituationHero";
import { SituationOverview } from "@/components/situation/SituationOverview";
import { SituationStickyNav } from "@/components/situation/SituationStickyNav";
import { SituationSection } from "@/components/situation/SituationSection";
import { SituationTransition } from "@/components/situation/SituationTransition";
import { SituationFinalCta } from "@/components/situation/SituationFinalCta";
import { situations } from "@/lib/situation-data";

export const metadata: Metadata = {
  title: "Votre situation | NYAKA",
  description:
    "Lancement, professionnalisation, communication, repositionnement ou transformation : identifiez la situation de votre organisation et découvrez comment NYAKA peut vous accompagner.",
};

export default function VotreSituationPage() {
  return (
    <main>
      <TopBanner />
      <Header />
      <SituationHero />
      <SituationOverview />
      <SituationStickyNav />
      {situations.map((situation, index) => (
        <SituationSection
          key={situation.id}
          situation={situation}
          index={index}
        />
      ))}
      <SituationTransition />
      <SituationFinalCta />
      <Footer />
    </main>
  );
}
