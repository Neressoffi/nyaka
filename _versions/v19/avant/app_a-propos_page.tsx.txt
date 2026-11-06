import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AproposHero } from "@/components/apropos/AproposHero";
import { AproposStickyNav } from "@/components/apropos/AproposStickyNav";
import { AproposOrigine } from "@/components/apropos/AproposOrigine";
import { AproposEmpreinte } from "@/components/apropos/AproposEmpreinte";
import { AproposPoles } from "@/components/apropos/AproposPoles";
import { AproposPrincipes } from "@/components/apropos/AproposPrincipes";
import { AproposEquipe } from "@/components/apropos/AproposEquipe";
import { AproposDirection } from "@/components/apropos/AproposDirection";
import { AproposReferences } from "@/components/apropos/AproposReferences";
import { AproposFinalCta } from "@/components/apropos/AproposFinalCta";

export const metadata: Metadata = {
  title: "À propos de NYAKA | Branding, design, vidéo, IA et données",
  description:
    "Découvrez NYAKA, son approche, sa vision de la marque, ses principes de travail et l'équipe qui accompagne les organisations dans leurs projets de branding, design, vidéo, intelligence artificielle et données.",
};

export default function AproposPage() {
  return (
    <main>
      <TopBanner />
      <Header />
      <AproposHero />
      <AproposStickyNav />
      <AproposOrigine />
      <AproposEmpreinte />
      <AproposPoles />
      <AproposPrincipes />
      <AproposEquipe />
      <AproposDirection />
      <AproposReferences />
      <AproposFinalCta />
      <Footer />
    </main>
  );
}
