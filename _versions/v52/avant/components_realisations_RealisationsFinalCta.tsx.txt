import Link from "next/link";
import { ArrowRight } from "lucide-react";
import contenu from "@/content/pages/realisations.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/realisations.json
const TXT = contenu.RealisationsFinalCta;

export function RealisationsFinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2b2220] to-[#171717] px-4 py-24 lg:px-8 lg:py-32">
      {/* Couleurs actuelles du site (v40) : fond brun-noir, décor et accents jaune or */}
      <div className="pointer-events-none absolute -right-24 -top-56 h-[680px] w-[680px] rounded-full border border-[#D8A53A]/30 shadow-[0_0_0_70px_rgba(216,165,58,0.03),0_0_0_150px_rgba(216,165,58,0.03)]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="mb-6 h-px w-10 bg-[#D8A53A]" aria-hidden />
        <h2 className="font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">{TXT.texte_01}</h2>
        <p className="mt-5 text-[15px] leading-relaxed text-[#d1c7bd] sm:text-base lg:text-[17px]">{TXT.texte_02}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/demarrer-un-projet"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#f6f3ef] px-6 py-3 text-sm font-semibold text-[#181716] transition-transform hover:-translate-y-0.5 sm:text-[15px]"
          >{TXT.texte_03}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/solutions"
            className="rounded-lg border border-[#776a5f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#D8A53A] hover:text-[#D8A53A] sm:text-[15px]"
          >{TXT.texte_04}</Link>
        </div>
      </div>
    </section>
  );
}
