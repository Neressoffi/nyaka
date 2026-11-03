import { teamRoles } from "@/lib/apropos-data";
import contenu from "@/content/pages/apropos.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/apropos.json
const TXT = contenu.AproposEquipe;

export function AproposEquipe() {
  return (
    <section
      id="equipe"
      className="scroll-mt-28 bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">{TXT.texte_01}</p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">{TXT.texte_02}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">{TXT.texte_03}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teamRoles.map((role) => (
            <div
              key={role.title}
              className="rounded-2lg border border-black/5 bg-marketing-surface-1 p-6"
            >
              <h3 className="font-display text-lg font-bold text-marketing-foreground-0 sm:text-xl">
                {role.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marketing-foreground-2 sm:text-[15px]">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
