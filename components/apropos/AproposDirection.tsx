import contenu from "@/content/pages/apropos.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/apropos.json
const TXT = contenu.AproposDirection;
export function AproposDirection() {
  return (
    <section
      id="direction"
      className="scroll-mt-28 bg-beige-950 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">{TXT.texte_01}</p>
        <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">{TXT.texte_02}</h2>
        <p className="mt-6 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">{TXT.texte_03}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[17px]">{TXT.texte_04}</p>
        <p className="mt-8 font-display text-xl font-bold text-white sm:text-2xl lg:text-[28px]">{TXT.texte_05}</p>
      </div>
    </section>
  );
}
