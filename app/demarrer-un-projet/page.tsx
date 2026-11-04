import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import contenu from "@/content/pages/demarrer.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/demarrer.json
const TXT = contenu.Page_demarrer_un_projet;

export const metadata: Metadata = {
  title: "Démarrer un projet | NYAKA",
  description:
    "Présentez votre besoin, votre idée ou la transformation que vous préparez. NYAKA vous aide à clarifier le point de départ et à construire la réponse adaptée.",
};

export default function DemarrerUnProjetPage() {
  return (
    <main>
      <TopBanner />
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-beige-950 via-surface-0 to-surface-0" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-screen-2xl flex-col justify-center px-4 py-32 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">{TXT.texte_01}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[30px] font-bold leading-[1.15] text-white sm:text-[38px] lg:text-[52px]">{TXT.texte_02}</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">{TXT.texte_03}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="mailto:contact@nyakaagency.com"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:text-[15px]"
            >{TXT.texte_04}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/solutions"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
            >{TXT.texte_05}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
