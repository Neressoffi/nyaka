import contenu from "@/content/pages/approche.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/approche.json
const TXT = contenu.ApprochePrincipe;
export function ApprochePrincipe() {
  return (
    <section
      id="principe"
      className="scroll-mt-28 bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">{TXT.texte_01}</p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">{TXT.texte_02}</h2>
        </div>

        <div className="space-y-5">
          <p className="text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">{TXT.texte_03}</p>

          <p className="font-display text-xl font-bold text-marketing-foreground-0 sm:text-2xl">{TXT.texte_04}</p>

          <p className="text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">{TXT.texte_05}</p>
        </div>
      </div>
    </section>
  );
}
