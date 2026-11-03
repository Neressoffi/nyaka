import Link from "next/link";
import {
  Box,
  Expand,
  Image as ImageIcon,
  Mic,
  Music,
  Scissors,
  Video,
  Wand2,
} from "lucide-react";
import contenu from "@/content/pages/accueil.json";

// Cartes gérées depuis l'administration (Decap CMS) : content/pages/accueil.json
const TXT = contenu.besoins;

const ICONES: Record<string, React.ElementType> = {
  image: ImageIcon,
  agrandir: Expand,
  video: Video,
  ciseaux: Scissors,
  baguette: Wand2,
  micro: Mic,
  musique: Music,
  boite: Box,
};

const COULEURS: Record<string, string> = {
  violet: "bg-violet-500",
  "bleu-ciel": "bg-sky-500",
  bleu: "bg-blue-500",
  vert: "bg-emerald-500",
  orange: "bg-orange-500",
};

const NEEDS = TXT.cartes.map((carte) => ({
  name: carte.titre,
  description: carte.description,
  icon: ICONES[carte.icone] ?? Box,
  href: carte.lien,
  color: COULEURS[carte.couleur] ?? "bg-emerald-500",
}));

export function ToolsCarousel() {
  return (
    <section className="bg-marketing-surface-0 py-20 lg:py-28">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8">
        <h2 className="max-w-xl font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
          {TXT.titre}
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">
          {TXT.sous_texte}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEEDS.map((need) => (
            <Link
              key={need.name}
              href={need.href}
              className="flex flex-col rounded-2xl bg-white p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${need.color}`}
              >
                <need.icon className="h-6 w-6 text-white" />
              </span>
              <span className="mt-4 font-display text-[17px] font-bold leading-snug text-marketing-foreground-0 sm:text-lg">
                {need.name}
              </span>
              <span className="mt-1.5 text-[13px] leading-relaxed text-marketing-foreground-2 sm:text-sm">
                {need.description}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8">
          <Link
            href={TXT.lien_bas.lien}
            className="text-sm font-medium text-marketing-foreground-0 underline-offset-4 hover:underline sm:text-[15px]"
          >
            {TXT.lien_bas.texte}
          </Link>
        </p>
      </div>
    </section>
  );
}
