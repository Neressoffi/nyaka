import { exampleRows } from "@/lib/approche-data";

export function ApprocheExemple() {
  return (
    <section
      id="exemple"
      className="scroll-mt-28 bg-beige-950 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
            Exemple concret
          </p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
            Ce que l&apos;approche change dans un projet
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/80 sm:text-base lg:text-[17px]">
            Demande initiale : « Nous voulons une vidéo publicitaire. »
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2lg border border-white/10">
          {exampleRows.map((row, index) => (
            <div
              key={row.label}
              className={`grid grid-cols-1 gap-2 px-6 py-5 md:grid-cols-[280px_1fr] md:gap-8 ${
                index % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
              } ${index !== exampleRows.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <p className="text-sm font-semibold leading-relaxed text-white/80 sm:text-[15px]">
                {row.label}
              </p>
              <p className="text-sm leading-relaxed text-white sm:text-[15px]">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-[15px]">
          Autre exemple : un client demande une solution IA ; NYAKA commence
          par identifier le cas d&apos;usage, les utilisateurs, les données
          disponibles et la valeur recherchée avant de définir la technologie.
        </p>
      </div>
    </section>
  );
}
