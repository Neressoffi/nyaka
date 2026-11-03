import contenu from "@/content/pages/situation.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/situation.json
const TXT = contenu.SituationTransition;
export function SituationTransition() {
  return (
    <section
      id="transition"
      className="scroll-mt-28 bg-beige-950 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">{TXT.texte_01}</p>
        <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">{TXT.texte_02}</h2>
        <p className="mt-5 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">{TXT.texte_03}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-[15px]">{TXT.texte_04}</p>
        <p className="mt-6 text-sm font-medium leading-relaxed text-white sm:text-[15px]">{TXT.texte_05}</p>
      </div>
    </section>
  );
}
