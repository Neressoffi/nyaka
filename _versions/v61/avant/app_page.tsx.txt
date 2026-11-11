import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { AccueilV2 } from "@/components/accueil/AccueilV2";
import { Footer } from "@/components/Footer";

// Page d’accueil V2 (v28) — maquette NYAKA_Accueil_V2_Interactif.
// En-tête officiel (version claire) sur bande claire, pied de page officiel.
export default function Home() {
  return (
    <main className="bg-[#f5f3ef]">
      <TopBanner />
      <div className="acc2-head">
        <Header clair />
      </div>
      <AccueilV2 />
      <Footer />
    </main>
  );
}
