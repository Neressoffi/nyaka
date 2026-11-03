import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HomeReferences } from "@/components/HomeReferences";
import { TabsSection } from "@/components/TabsSection";
import { ToolsCarousel } from "@/components/ToolsCarousel";
import { BentoGrid } from "@/components/BentoGrid";
import { UseCases } from "@/components/UseCases";
import { HomeFramework } from "@/components/HomeFramework";
import { HomeKawa } from "@/components/HomeKawa";
import { VideosCarousel } from "@/components/VideosCarousel";
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
      <BentoGrid />
      <UseCases />
      <HomeFramework />
      <HomeKawa />
      <VideosCarousel />
      <TeamPlans />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
