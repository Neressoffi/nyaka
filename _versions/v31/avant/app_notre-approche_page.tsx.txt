import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ApprocheHero } from "@/components/approche/ApprocheHero";
import { ApprocheStickyNav } from "@/components/approche/ApprocheStickyNav";
import { ApprochePrincipe } from "@/components/approche/ApprochePrincipe";
import { ApprocheModele } from "@/components/approche/ApprocheModele";
import { ApprocheFramework } from "@/components/approche/ApprocheFramework";
import { ApprocheExemple } from "@/components/approche/ApprocheExemple";
import { ApprocheBenefices } from "@/components/approche/ApprocheBenefices";
import { ApprocheFinalCta } from "@/components/approche/ApprocheFinalCta";

export const metadata: Metadata = {
  title: "Notre approche | NYAKA",
  description:
    "Découvrez comment NYAKA analyse les besoins, aligne les décisions et construit des solutions cohérentes en branding, design, vidéo, intelligence artificielle et données.",
};

export default function NotreApprochePage() {
  return (
    <main>
      <TopBanner />
      <Header />
      <ApprocheHero />
      <ApprocheStickyNav />
      <ApprochePrincipe />
      <ApprocheModele />
      <ApprocheFramework />
      <ApprocheExemple />
      <ApprocheBenefices />
      <ApprocheFinalCta />
      <Footer />
    </main>
  );
}
