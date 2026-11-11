import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { AccueilV2 } from "@/components/accueil/AccueilV2";
import { Footer } from "@/components/Footer";

// Page d’accueil V2 (v28) — maquette NYAKA_Accueil_V2_Interactif.
// En-tête officiel en version sombre (v61, comme les autres pages), pied de page officiel.
export default function Home() {
  return (
    <main className="bg-[#f5f3ef]">
      <TopBanner />
      <div className="relative z-50 h-[72px] bg-[#181615]">
        <Header />
      </div>
      <AccueilV2 />
      <Footer />
    </main>
  );
}
