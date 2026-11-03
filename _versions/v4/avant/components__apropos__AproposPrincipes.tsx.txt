import { aproposPrinciples } from "@/lib/apropos-data";

export function AproposPrincipes() {
  return (
    <section
      id="principes"
      className="scroll-mt-28 bg-surface-0 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
            Nos principes de travail
          </p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
            La manière dont nous choisissons de travailler
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {aproposPrinciples.map((principle, index) => (
            <div
              key={principle.title}
              className="rounded-2lg border border-white/10 bg-white/[0.03] p-7"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-xs">
                0{index + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-white sm:text-xl">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-[15px]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
