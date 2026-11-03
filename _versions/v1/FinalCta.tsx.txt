import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b1055] via-[#7b2d5e] to-[#d96a3b]" />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute left-1/2 top-1/2 h-px w-[160%] -translate-x-1/2 -rotate-[8deg] bg-accent/70" />

      <div className="relative flex max-w-3xl flex-col items-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-xs">
          Parlons de votre projet
        </p>

        <h2 className="mt-4 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
          Vous avez une idée. Construisons la suite avec méthode.
        </h2>

        <p className="mt-5 text-[15px] leading-relaxed text-white/80 sm:text-base lg:text-[17px]">
          Présentez-nous votre projet, même s&apos;il n&apos;est pas encore
          totalement structuré. Nous vous aiderons à clarifier le besoin, à
          définir le bon point de départ et à construire la réponse adaptée.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/demarrer-un-projet"
            className="group flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85 sm:text-[15px]"
          >
            Démarrer un projet
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
          >
            Échanger sur WhatsApp
          </Link>
        </div>

        <p className="mt-5 text-[13px] leading-relaxed text-white/80 sm:text-sm">
          Un premier échange ne vous engage pas sur une production. Il sert à
          comprendre votre situation et à vérifier comment NYAKA peut intervenir.
        </p>
      </div>
    </section>
  );
}
