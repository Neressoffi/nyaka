import Link from "next/link";
import {
  GitBranch,
  Layers,
  Scale,
  Sparkles,
} from "lucide-react";

const DIFFERENCES = [
  {
    icon: Scale,
    title: "Comprendre avant de produire",
    text: "Nous clarifions le résultat attendu, le contexte et les priorités avant de concevoir la réponse.",
  },
  {
    icon: Layers,
    title: "Relier les expertises",
    text: "Branding, design, vidéo, intelligence artificielle et données avancent autour d’une même direction.",
  },
  {
    icon: GitBranch,
    title: "Adapter la réponse",
    text: "Chaque projet mobilise uniquement les compétences, formats et partenaires nécessaires.",
  },
  {
    icon: Sparkles,
    title: "Construire pour l’évolution",
    text: "Les solutions doivent pouvoir accompagner la prochaine étape de votre organisation.",
  },
];

export function TeamPlans() {
  return (
    <section className="bg-surface-0 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-screen-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
          Pourquoi NYAKA ?
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
          Quatre différences qui orientent chaque projet
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground-1 sm:text-base lg:text-[17px]">
          Une direction claire, des expertises reliées, une réponse adaptée, et
          des livrables pensés pour évoluer.
        </p>

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
            NYAKA — L&apos;empreinte de votre marque.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/notre-approche"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:text-[15px]"
            >
              Découvrir notre approche
            </Link>
            <Link
              href="/demarrer-un-projet"
              className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
            >
              Parler de votre projet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
