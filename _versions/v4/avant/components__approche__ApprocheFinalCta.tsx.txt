import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ApprocheFinalCta() {
  return (
    <section className="relative overflow-hidden px-4 py-24 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b1055] via-[#7b2d5e] to-[#d96a3b]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-px w-[160%] -translate-x-1/2 -rotate-[8deg] bg-accent/70" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
          Vous avez déjà une idée de ce que vous voulez construire ?
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-white/80 sm:text-base lg:text-[17px]">
          Présentez-nous votre besoin. Nous partirons de votre idée, puis nous
          clarifierons avec vous la réponse la plus cohérente.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/demarrer-un-projet"
            className="group inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85 sm:text-[15px]"
          >
            Démarrer un projet
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/realisations"
            className="rounded-lg border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
          >
            Voir nos réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}
