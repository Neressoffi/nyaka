import Link from "next/link";
import { NyakaLogo } from "@/components/NyakaLogo";

const FOOTER_COLUMNS: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "NYAKA",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Notre approche", href: "/notre-approche" },
      { label: "Réalisations", href: "/realisations" },
      { label: "Démarrer un projet", href: "/demarrer-un-projet" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Branding", href: "/solutions#branding" },
      { label: "Design", href: "/solutions#design" },
      { label: "Vidéo & campagnes", href: "/solutions#video" },
      { label: "IA & données", href: "/solutions#ia-data" },
    ],
  },
  {
    title: "Informations",
    links: [{ label: "FAQ", href: "/#faq" }],
  },
  {
    title: "Coordonnées",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "WhatsApp", href: "https://wa.me/" },
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
            <p className="mt-4 text-sm leading-relaxed text-foreground-3">
              NYAKA accompagne les organisations dans la construction et
              l&apos;évolution de leur marque à travers le branding, le design,
              la vidéo, l&apos;intelligence artificielle et les données.
            </p>
           
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm text-foreground-3 transition-colors duration-100 hover:text-white"
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
          <p className="text-xs text-foreground-3">
            © 2026 NYAKA — L&apos;empreinte de votre marque.
          </p>
        </div>
      </div>
    </footer>
  );
}
