import Link from "next/link";
import {
  GitBranch,
  Layers,
  Scale,
  Sparkles,
} from "lucide-react";
import contenu from "@/content/pages/accueil.json";

// Contenus gérés depuis l'administration (Decap CMS) : content/pages/accueil.json
const TXT = contenu.pourquoi;

const ICONES: Record<string, React.ElementType> = {
  balance: Scale,
  calques: Layers,
  branches: GitBranch,
  etincelles: Sparkles,
};

const DIFFERENCES = TXT.cartes.map((carte) => ({
  icon: ICONES[carte.icone] ?? Sparkles,
  title: carte.titre,
  text: carte.texte,
}));

export function TeamPlans() {
  return (
    <section className="bg-surface-0 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-screen-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
          {TXT.surtitre}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
          {TXT.titre}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENCES.map((item) => (
            <div key={item.title}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2">
                <item.icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-2 sm:text-[15px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="font-display text-xl font-bold text-white sm:text-2xl lg:text-[28px]">
            {TXT.signature}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={TXT.bouton_principal.lien}
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:text-[15px]"
            >
              {TXT.bouton_principal.texte}
            </Link>
            <Link
              href={TXT.bouton_secondaire.lien}
              className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
            >
              {TXT.bouton_secondaire.texte}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
