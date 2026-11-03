import { combinationExamples } from "@/lib/solutions-data";
import contenu from "@/content/pages/solutions.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/solutions.json
const TXT = contenu.SolutionsCombination;

export function SolutionsCombination() {
  return (
    <section
      id="combinaison"
      className="scroll-mt-28 bg-beige-950 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">{TXT.texte_01}</p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">{TXT.texte_02}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">{TXT.texte_03}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">{TXT.texte_04}</p>
        </div>

        <div className="mt-12">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 sm:text-xs">{TXT.texte_05}</h3>

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
