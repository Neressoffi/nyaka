import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aproposPoles } from "@/lib/apropos-data";

export function AproposPoles() {
  return (
    <section className="bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">
              Ce que nous construisons
            </p>
            <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
              Des expertises différentes, réunies autour d&apos;une même
              logique
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">
              NYAKA intervient aujourd&apos;hui à travers quatre pôles. Ils
              peuvent être mobilisés séparément ou combinés selon le besoin du
              projet.
            </p>
          </div>

          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 text-sm font-medium text-marketing-foreground-0 sm:text-[15px]"
          >
            Voir toutes nos solutions
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {aproposPoles.map((pole) => (
            <Link
              key={pole.title}
              href={pole.href}
              className="group rounded-2lg border border-black/5 bg-marketing-surface-1 p-7 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <h3 className="font-display text-lg font-bold text-marketing-foreground-0 sm:text-xl">
                {pole.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marketing-foreground-2 sm:text-[15px]">
                {pole.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
