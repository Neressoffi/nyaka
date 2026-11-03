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

const NEEDS = [
  {
    name: "Une identité de marque",
    description:
      "Créer ou repenser votre positionnement, votre logo et votre univers visuel.",
    icon: ImageIcon,
    href: "/solutions#branding",
    color: "bg-violet-500",
  },
  {
    name: "Des supports professionnels",
    description:
      "Présenter vos offres à travers des flyers, brochures, catalogues, menus ou documents commerciaux.",
    icon: Expand,
    href: "/solutions#design",
    color: "bg-sky-500",
  },
  {
    name: "Une vidéo publicitaire",
    description:
      "Transformer votre offre ou votre message en teaser, spot ou contenu de lancement.",
    icon: Video,
    href: "/solutions#video",
    color: "bg-blue-500",
  },
  {
    name: "Une campagne créative",
    description:
      "Construire un concept, un message et des déclinaisons visuelles ou audiovisuelles cohérentes.",
    icon: Scissors,
    href: "/solutions#video",
    color: "bg-blue-500",
  },
  {
    name: "Une expérience digitale simple",
    description:
      "Créer un catalogue, un menu digital, un formulaire ou un parcours relié à un QR code.",
    icon: Wand2,
    href: "/solutions#design",
    color: "bg-emerald-500",
  },
  {
    name: "Un assistant intelligent",
    description:
      "Concevoir un assistant ou un chatbot à partir d'un usage, de données et d'un objectif précis.",
    icon: Mic,
    href: "/solutions#ia-data",
    color: "bg-orange-500",
  },
  {
    name: "Un système de collecte de données",
    description:
      "Organiser la collecte d'informations clients afin de mieux comprendre, segmenter ou accompagner vos publics.",
    icon: Music,
    href: "/solutions#ia-data",
    color: "bg-orange-500",
  },
  {
    name: "Un projet encore à clarifier",
    description:
      "Présentez-nous votre situation. Nous vous aiderons à identifier le bon point de départ.",
    icon: Box,
    href: "/demarrer-un-projet",
    color: "bg-emerald-500",
  },
];

export function ToolsCarousel() {
  return (
    <section className="bg-marketing-surface-0 py-20 lg:py-28">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8">
        <h2 className="max-w-xl font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
          Que souhaitez-vous construire ?
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">
          Choisissez le point de départ qui correspond le mieux à votre besoin.
          Vous n&apos;avez pas besoin d&apos;avoir déjà défini toute la solution.
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
            href="/demarrer-un-projet"
            className="text-sm font-medium text-marketing-foreground-0 underline-offset-4 hover:underline sm:text-[15px]"
          >
            Je ne sais pas encore quelle solution choisir
          </Link>
        </p>
      </div>
    </section>
  );
}
