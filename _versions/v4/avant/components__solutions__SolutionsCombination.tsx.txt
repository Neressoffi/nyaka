import { combinationExamples } from "@/lib/solutions-data";

export function SolutionsCombination() {
  return (
    <section
      id="combinaison"
      className="scroll-mt-28 bg-beige-950 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
            Combinaison des pôles
          </p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
            Un projet ne se limite pas toujours à une seule expertise
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">
            Vous pouvez venir pour un logo, une vidéo, un catalogue ou une idée
            liée à l&apos;IA. Le besoin initial reste le point de départ.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">
            Après compréhension de votre situation, NYAKA peut recommander une
            intervention limitée à un seul pôle ou une combinaison de plusieurs
            expertises. L&apos;objectif n&apos;est pas d&apos;ajouter des
            prestations, mais de construire la réponse réellement nécessaire.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-xs">
            Exemples simples
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {combinationExamples.map((example) => (
              <div
                key={example.situation}
                className="rounded-2lg border border-white/10 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]"
              >
                <p className="text-[17px] font-semibold leading-snug text-white sm:text-lg">
                  {example.situation}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-[15px]">
                  {example.combination}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
