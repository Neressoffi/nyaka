import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HomeReferences } from "@/components/HomeReferences";
import { TabsSection } from "@/components/TabsSection";
import { ToolsCarousel } from "@/components/ToolsCarousel";
import { HomeRealisations } from "@/components/HomeRealisations";
import { TeamPlans } from "@/components/TeamPlans";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBanner />
      <Header />
      <Hero />
      <HomeReferences />
      <TabsSection />
      <ToolsCarousel />
      <HomeRealisations />
      <TeamPlans />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
