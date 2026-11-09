import Link from "next/link";
import type { ReactNode } from "react";
import { NyakaLogo } from "@/components/NyakaLogo";
import contenu from "@/content/pages/site.json";

// Textes gérés depuis l'administration (Decap CMS) : content/pages/site.json
const TXT = contenu.Footer;

const FOOTER_COLUMNS: {
  title: string;
  links: { label: ReactNode; href: string }[];
}[] = [
  {
    title: "NYAKA",
    links: [
      { label: TXT.libelle_01, href: "/a-propos" },
      { label: TXT.libelle_03, href: "/realisations" },
      { label: TXT.libelle_04, href: "/demarrer-un-projet" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: TXT.libelle_05, href: "/solutions#branding" },
      { label: TXT.libelle_06, href: "/solutions#design" },
      { label: TXT.libelle_07, href: "/solutions#video" },
      { label: TXT.libelle_08, href: "/solutions#ia" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: TXT.libelle_09, href: "/#faq" },
      { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    ],
  },
  {
    title: "Coordonnées",
    links: [
      {
        // Retour à la ligne possible après « @ » sur petit écran
        label: (
          <>
            {TXT.email.split("@")[0]}@<wbr />
            {TXT.email.split("@")[1]}
          </>
        ),
        href: `mailto:${TXT.email}`,
      },
      { label: TXT.telephone, href: `tel:${TXT.telephone.replace(/[^+\d]/g, "")}` },
      { label: TXT.libelle_12, href: TXT.whatsapp_lien },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <NyakaLogo href="/" size="md" />
            <p className="mt-4 text-sm leading-relaxed text-foreground-3">{TXT.texte_01}</p>
           
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + String(link.label)}>
                      <Link
                        href={link.href}
                        className="inline-flex max-w-full items-center gap-1.5 text-sm text-foreground-3 transition-colors duration-100 hover:text-white"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-foreground-3">{TXT.texte_02}</p>
        </div>
      </div>
    </footer>
  );
}
