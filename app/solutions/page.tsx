import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SolutionsMaquette } from "@/components/solutions/SolutionsMaquette";

// Page Solutions — maquette v2 adaptée au thème du site (v19).
export const metadata: Metadata = {
  title: "Solutions : branding, design, vidéo, IA & data | NYAKA",
  description:
    "Branding, design, vidéo et intelligence artificielle : des expertises qui se complètent pour donner la bonne forme à votre projet.",
};

export default function SolutionsPage() {
  return (
    <main className="bg-black">
      <TopBanner />
      <Header />
      <SolutionsMaquette />
      <Footer />
    </main>
  );
}
