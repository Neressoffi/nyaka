import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AproposV2 } from "@/components/apropos/AproposV2";

// Page À propos V2 (v21) — textes du brief, zones de couleur du prototype.
export const metadata: Metadata = {
  title: "À propos · NYAKA | L'empreinte de votre marque.",
  description:
    "Découvrez NYAKA, agence de communication créative et de solutions d'intelligence artificielle : notre vision, nos publics et notre approche.",
};

export default function AproposPage() {
  return (
    <main className="bg-[#e9e4db]">
      <TopBanner />
      <Header />
      <AproposV2 />
      <Footer />
    </main>
  );
}
