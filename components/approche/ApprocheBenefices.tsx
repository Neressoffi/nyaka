import { approachBenefits } from "@/lib/approche-data";
import contenu from "@/content/pages/approche.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/approche.json
const TXT = contenu.ApprocheBenefices;

export function ApprocheBenefices() {
  return (
    <section className="bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">{TXT.texte_01}</p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">{TXT.texte_02}</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approachBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2lg border border-black/5 bg-marketing-surface-1 p-6"
            >
              <h3 className="font-display text-lg font-bold text-marketing-foreground-0 sm:text-xl">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marketing-foreground-2 sm:text-[15px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
