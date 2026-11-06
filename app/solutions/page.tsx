import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SolutionsV5 } from "@/components/solutions/SolutionsV5";

// Page Solutions V5 (v24) — prototype « Premium Hybrid Tech », en-tête et pied de page du site.
export const metadata: Metadata = {
  title: "Solutions — NYAKA | L'empreinte de votre marque",
  description:
    "NYAKA accompagne les marques et les entreprises avec ses expertises en branding, design, vidéo et campagnes, intelligence artificielle et data.",
};

export default function SolutionsPage() {
  return (
    <main className="bg-[#191716]">
      <TopBanner />
      <Header />
      <SolutionsV5 />
      <Footer />
    </main>
  );
}
