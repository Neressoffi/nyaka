import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { photo } from "@/lib/media";

export function SolutionsHero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={photo(1036, 1974, 1175)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-screen-2xl flex-col justify-end px-4 pb-16 pt-40 lg:px-8 lg:pb-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">
          Nos solutions
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-[30px] font-bold leading-[1.15] text-white sm:text-[38px] lg:text-[52px]">
          Quatre expertises pour construire une réponse cohérente.
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">
          NYAKA accompagne les organisations à travers le branding, le design,
          la création vidéo, l&apos;intelligence artificielle et les données.
          Selon votre situation, nous mobilisons une ou plusieurs expertises
          autour d&apos;un même objectif.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/demarrer-un-projet"
            className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:text-[15px]"
          >
            Parler de votre projet
          </Link>

          <Link
            href="#poles"
            className="group flex items-center gap-2 rounded-lg border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
          >
            Voir les quatre pôles
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </Link>
        </div>

        <Link
          href="#poles"
          className="mt-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white sm:text-[15px]"
        >
          Explorer les expertises
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
