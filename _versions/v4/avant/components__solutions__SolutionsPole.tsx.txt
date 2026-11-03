import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { SolutionPole } from "@/lib/solutions-data";

export function SolutionsPole({
  pole,
  index,
}: {
  pole: SolutionPole;
  index: number;
}) {
  const isLight = index % 2 === 0;

  return (
    <section
      id={pole.id}
      className={`scroll-mt-28 px-4 py-20 lg:px-8 lg:py-28 ${
        isLight ? "bg-marketing-surface-0" : "bg-surface-0"
      }`}
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:gap-16">
          <div>
            <h2
              className={`mt-3 font-display text-[26px] font-bold leading-[1.2] sm:text-[32px] sm:leading-tight lg:text-[40px] ${
                isLight
                  ? "text-marketing-foreground-0"
                  : "text-foreground-0"
              }`}
            >
              {pole.title}
            </h2>

            <p
              className={`mt-4 text-lg font-medium sm:text-xl ${
                isLight
                  ? "text-marketing-foreground-1"
                  : "text-foreground-1"
              }`}
            >
              {pole.subtitle}
            </p>

            <p
              className={`mt-4 max-w-2xl text-[15px] leading-relaxed sm:text-base lg:text-[17px] ${
                isLight
                  ? "text-marketing-foreground-2"
                  : "text-foreground-2"
              }`}
            >
              {pole.description}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3
                  className={`text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs ${
                    isLight
                      ? "text-marketing-foreground-2"
                      : "text-foreground-3"
                  }`}
                >
                  Quand ce pôle est pertinent
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {pole.whenRelevant.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-3 text-sm leading-relaxed sm:text-[15px] ${
                        isLight
                          ? "text-marketing-foreground-1"
                          : "text-foreground-1"
                      }`}
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          isLight ? "text-black" : "text-accent"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3
                  className={`text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs ${
                    isLight
                      ? "text-marketing-foreground-2"
                      : "text-foreground-3"
                  }`}
                >
                  Solutions principales
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {pole.solutions.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-3 text-sm leading-relaxed sm:text-[15px] ${
                        isLight
                          ? "text-marketing-foreground-1"
                          : "text-foreground-1"
                      }`}
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          isLight ? "bg-black" : "bg-accent"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={pole.primaryCta.href}
                className={`group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 sm:text-[15px] ${
                  isLight
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {pole.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href={pole.secondaryCta.href}
                className={`rounded-lg border px-5 py-3 text-sm font-medium transition-colors sm:text-[15px] ${
                  isLight
                    ? "border-black/15 text-marketing-foreground-0 hover:bg-black/5"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {pole.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-2lg lg:min-h-[520px]">
            <img
              src={pole.proof.image}
              alt={`Réalisation ${pole.proof.project}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-xs">
                Preuve / projet associé
              </p>
              <p className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                {pole.proof.project}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 sm:text-[15px]">
                {pole.proof.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
