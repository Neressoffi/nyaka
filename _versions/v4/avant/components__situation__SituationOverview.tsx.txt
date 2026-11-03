import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { situationsOverview } from "@/lib/situation-data";

export function SituationOverview() {
  return (
    <section
      id="situations"
      className="scroll-mt-28 bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">
            Vue d&apos;ensemble
          </p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
            Commencez par vous reconnaître.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">
            Cinq situations concrètes pour identifier le moment que traverse
            votre organisation — avant de parler d&apos;approche ou de
            solutions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {situationsOverview.map((situation, index) => (
            <Link
              key={situation.id}
              href={`#${situation.id}`}
              className={`group flex flex-col justify-between rounded-2lg border border-black/5 bg-marketing-surface-1 p-7 transition-transform duration-300 hover:-translate-y-0.5 ${
                index === 4 ? "sm:col-span-2 xl:col-span-1" : ""
              }`}
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-xs">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-marketing-foreground-0 sm:text-xl">
                  {situation.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-marketing-foreground-2 sm:text-[15px]">
                  {situation.description}
                </p>
              </div>

              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-marketing-foreground-0 sm:text-[15px]">
                Voir cette situation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
