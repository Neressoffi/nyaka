import type { Metadata } from "next";
import Link from "next/link";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BoutonNousEcrire } from "@/components/BoutonNousEcrire";
import contenu from "@/content/pages/demarrer.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/demarrer.json
// v42 (cahier de cadrage n°4) : « Nous écrire » ouvre l'assistant, plus de mention
// de formulaire, fond graphique sombre (sans photo). v43 : lien WhatsApp retiré.
const TXT = contenu.Page_demarrer_un_projet;

export const metadata: Metadata = {
  title: "Démarrer un projet | NYAKA",
  description:
    "Que votre idée soit déjà définie ou encore en construction, présentez-nous votre besoin. NYAKA vous aide à identifier le bon point de départ.",
};

export default function DemarrerUnProjetPage() {
  return (
    <main className="bg-[#171717]">
      <TopBanner />
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#2b2220] via-[#1f1a18] to-[#141414]">
        {/* Composition graphique sombre : cercles et lumière dorés, voile noir pour la lisibilité */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full border border-[#D8A53A]/25 shadow-[0_0_0_60px_rgba(216,165,58,0.035),0_0_0_140px_rgba(216,165,58,0.025)] sm:-right-24 sm:-top-24 lg:h-[760px] lg:w-[760px]" />
          <div className="absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(216,165,58,0.18),transparent_65%)] blur-2xl" />
          <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[78vh] max-w-screen-xl flex-col justify-center px-4 pb-24 pt-36 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8A53A] sm:text-xs">{TXT.texte_01}</p>
          <h1 className="mt-4 max-w-3xl text-[34px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[60px]">{TXT.texte_02}</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#d1c7bd] sm:text-base lg:text-[17px]">{TXT.texte_03}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <BoutonNousEcrire>{TXT.texte_04}</BoutonNousEcrire>
            <Link
              href="/solutions"
              className="rounded-lg border border-[#776a5f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#D8A53A] hover:text-[#D8A53A] sm:text-[15px]"
            >{TXT.texte_05}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
