import { modeleDimensions } from "@/lib/approche-data";

export function ApprocheModele() {
  return (
    <section
      id="modele"
      className="scroll-mt-28 bg-surface-0 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
            Le Modèle NYAKA
          </p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
            Cinq dimensions à faire évoluer ensemble
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">
            NYAKA lit une organisation comme un système. Une solution devient
            cohérente lorsqu&apos;elle soutient plusieurs dimensions sans en
            fragiliser une autre.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent xl:block" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {modeleDimensions.map((dimension, index) => (
              <div
                key={dimension.name}
                className="relative rounded-2lg border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-xs">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-white sm:text-xl">
                  {dimension.name}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white/90 sm:text-[15px]">
                  {dimension.question}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
                  {dimension.looksAt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
