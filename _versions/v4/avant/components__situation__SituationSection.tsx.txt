import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Situation } from "@/lib/situation-data";

export function SituationSection({
  situation,
  index,
}: {
  situation: Situation;
  index: number;
}) {
  const isLight = index % 2 === 0;

  return (
    <section
      id={situation.id}
      className={`scroll-mt-28 px-4 py-20 lg:px-8 lg:py-28 ${
        isLight ? "bg-marketing-surface-0" : "bg-surface-0"
      }`}
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
              {situation.number} · Votre situation
            </p>

            <h2
              className={`mt-3 font-display text-[26px] font-bold leading-[1.2] sm:text-[32px] sm:leading-tight lg:text-[40px] ${
                isLight
                  ? "text-marketing-foreground-0"
                  : "text-foreground-0"
              }`}
            >
              {situation.title}
            </h2>

            <p
              className={`mt-4 text-[15px] font-medium leading-relaxed sm:text-base lg:text-[17px] ${
                isLight
                  ? "text-marketing-foreground-1"
                  : "text-foreground-1"
              }`}
            >
              {situation.subtitle}
            </p>

            <p
              className={`mt-4 max-w-2xl text-sm leading-relaxed sm:text-[15px] ${
                isLight
                  ? "text-marketing-foreground-2"
                  : "text-foreground-2"
              }`}
            >
              {situation.description}
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
                  Vous vous reconnaissez si…
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {situation.recognizeIf.map((item) => (
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
                  Comment NYAKA peut intervenir
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {situation.howWeHelp.map((item) => (
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

            <div className="mt-8">
              <h3
                className={`text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs ${
                  isLight
                    ? "text-marketing-foreground-2"
                    : "text-foreground-3"
                }`}
              >
                Pôles susceptibles d&apos;être mobilisés
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {situation.poles.map((pole) => (
                  <Link
                    key={pole.label}
                    href={pole.href}
                    className={`rounded-lg border px-3.5 py-2 text-sm transition-colors sm:text-[15px] ${
                      isLight
                        ? "border-black/10 text-marketing-foreground-1 hover:border-black/25 hover:text-marketing-foreground-0"
                        : "border-white/15 text-foreground-2 hover:border-white/30 hover:text-foreground-0"
                    }`}
                  >
                    {pole.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link
                href={situation.cta.href}
                className={`group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 sm:text-[15px] ${
                  isLight ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {situation.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2lg lg:min-h-[520px]">
            <img
              src={situation.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-xs">
                Situation
              </p>
              <p className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                {situation.title}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 sm:text-[15px]">
                {situation.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
