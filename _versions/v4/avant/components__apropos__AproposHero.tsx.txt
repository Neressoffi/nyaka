import Link from "next/link";
import { photo } from "@/lib/media";

export function AproposHero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={photo(1011, 1974, 1175)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-screen-2xl flex-col justify-end px-4 pb-16 pt-40 lg:px-8 lg:pb-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">
          À propos de NYAKA
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-[30px] font-bold leading-[1.15] text-white sm:text-[38px] lg:text-[52px]">
          Nous aidons les organisations à construire une identité claire et à
          la faire évoluer avec cohérence.
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">
          NYAKA réunit création, réflexion stratégique et technologie pour
          accompagner les marques et les organisations dans les moments qui
          façonnent durablement leur perception et leur évolution.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/realisations"
            className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:text-[15px]"
          >
            Découvrir nos réalisations
          </Link>

          <Link
            href="/demarrer-un-projet"
            className="rounded-lg border border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
          >
            Parler de votre projet
          </Link>
        </div>
      </div>
    </section>
  );
}
