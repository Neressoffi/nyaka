"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

// Page Solutions — maquette « Version 2 » adaptée au thème sombre du site
// (fond noir, accent du site, polices du site). En-tête et pied de page : ceux du site.

const ROSE = "var(--accent)";
const M = "/media/realisations";


const EXPERTISES = [
  { id: "branding", label: "01 · Branding" },
  { id: "design", label: "02 · Design" },
  { id: "video", label: "03 · Vidéo & campagnes" },
  { id: "ia-data", label: "04 · IA & Data" },
];

const CHEMINS = [
  {
    choix: "Je lance une marque",
    titre: "Une identité à construire, puis à faire connaître.",
    texte:
      "Nous posons les bases de la marque et créons les premiers supports nécessaires à son lancement.",
    poles: ["Branding", "Design", "Contenus de lancement"],
  },
  {
    choix: "Je veux promouvoir une offre",
    titre: "Un message clair, porté par les bons supports.",
    texte:
      "Nous concevons les visuels et les contenus vidéo qui présentent votre offre au bon public.",
    poles: ["Design", "Vidéo & campagnes", "Supports de diffusion"],
  },
  {
    choix: "Je souhaite simplifier un processus",
    titre: "Un outil pensé pour votre quotidien.",
    texte:
      "Nous partons de votre besoin pour concevoir une solution IA ou data adaptée à votre activité.",
    poles: ["IA & Data", "Automatisation", "Accompagnement"],
  },
];

function Eyebrow({ children, dot = true, light = false }: { children: React.ReactNode; dot?: boolean; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px] ${
        light ? "text-white/70" : "text-white/60"
      }`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: ROSE }} />}
      {children}
    </p>
  );
}

function Chips({ items, soft = false }: { items: string[]; soft?: boolean }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((c) => (
        <li
          key={c}
          className={`rounded-md border px-3 py-1.5 text-[12px] text-white/80 ${
            soft ? "border-transparent bg-white/10" : "border-white/15"
          }`}
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

function LienFleche({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-7 inline-flex items-center gap-2 border-b border-white pb-1.5 text-[13px] font-semibold text-white"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

function Carte({ src, alt, etiquette, className = "" }: { src: string; alt: string; etiquette?: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-white/10 bg-[#111] ${className}`}>
      <div className="h-10 px-4 pt-4 sm:h-12">
        {etiquette && (
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
            {etiquette}
          </span>
        )}
      </div>
      <div className="bg-white/[0.06]">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-auto w-full" />
      </div>
      <div className="h-10 sm:h-12" />
    </figure>
  );
}

function Expertise({
  id,
  numero,
  titre,
  sousTitre,
  texte,
  chips,
  lien,
  visuel,
  inverse = false,
}: {
  id: string;
  numero: string;
  titre: string;
  sousTitre: string;
  texte: string;
  chips: string[];
  lien: { href: string; label: string };
  visuel: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-white/10 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className={`order-2 lg:col-span-7 ${inverse ? "lg:order-2" : "lg:order-1"}`}>{visuel}</div>
        <div className={`order-1 lg:col-span-5 ${inverse ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"}`}>
          <Eyebrow dot={false}>{numero}</Eyebrow>
          <h2 className="font-display mt-4 text-[44px] font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-[56px]">
            {titre}
          </h2>
          <p className="mt-3 text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-white/70 sm:text-[28px]">
            {sousTitre}
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">{texte}</p>
          <Chips items={chips} />
          <LienFleche href={lien.href}>{lien.label}</LienFleche>
        </div>
      </div>
    </section>
  );
}

export function SolutionsMaquette() {
  const [actif, setActif] = useState("branding");
  const [chemin, setChemin] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      let courant = EXPERTISES[0].id;
      for (const e of EXPERTISES) {
        const el = document.getElementById(e.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) courant = e.id;
      }
      setActif(courant);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const c = CHEMINS[chemin];

  return (
    <div className="bg-black text-white">
      <div className="bg-black pt-24 lg:pt-28">
        {/* Hero */}
        <section className="px-4 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <Eyebrow>Nos solutions · Quatre expertises</Eyebrow>
              <h1 className="font-display mt-6 text-[46px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-[60px] lg:text-[68px]">
                Des idées à <br className="hidden sm:block" />
                faire <span style={{ color: ROSE }}>grandir.</span>
                <br />
                Des marques à <br className="hidden sm:block" />
                faire vivre.
              </h1>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/70 sm:text-base">
                Branding, design, vidéo et intelligence artificielle : des expertises qui se complètent pour donner la bonne forme à votre projet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#expertises"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[13px] font-semibold text-black transition-opacity hover:opacity-85"
                >
                  Explorer les expertises <ArrowDown className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="/realisations"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Voir nos réalisations <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <p className="mt-8 text-[11px] text-white/45">NYAKA — L&apos;empreinte de votre marque.</p>
            </div>

            <div className="rounded-3xl bg-white/[0.04] p-5 sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Le studio en images</p>
              <div className="relative mt-4 pb-[34%]">
                <div className="overflow-hidden rounded-xl bg-[#1a1a1a] p-2 sm:ml-[6%]">
                  <img
                    src={`${M}/KME/KME_page_01.jpg`}
                    alt="Deux pages intérieures du menu KAWA"
                    className="block aspect-[4/3] w-full rounded-lg object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[47%] -rotate-1 overflow-hidden rounded-xl bg-[#1a1a1a] p-2 shadow-2xl">
                  <img src={`${M}/BRI/BRI_application.jpg`} alt="Applications de l’identité BRIRENA HAIR" className="block aspect-[4/3] w-full rounded-lg object-cover" />
                </div>
                <div className="absolute bottom-[2%] right-0 w-[50%] rotate-1 overflow-hidden rounded-xl bg-[#1a1a1a] p-2 shadow-2xl">
                  <img src={`${M}/TV/TV_visuel_02.jpg`} alt="Publications THE VISION pour les réseaux sociaux" className="block aspect-[4/3] w-full rounded-lg object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Barre des expertises */}
        <div id="expertises" className="sticky top-0 z-40 scroll-mt-0 border-y border-white/10 bg-black/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 lg:px-8">
            <p className="hidden shrink-0 text-[12px] font-semibold sm:block">Nos expertises</p>
            <nav className="flex gap-1 overflow-x-auto scrollbar-hidden" aria-label="Nos expertises">
              {EXPERTISES.map((e) => (
                <a
                  key={e.id}
                  href={`#${e.id}`}
                  className={`shrink-0 rounded-md px-3 py-2 text-[12px] transition-colors ${
                    actif === e.id ? "bg-white font-semibold text-black" : "text-white/55 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {e.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Introduction */}
        <section className="px-4 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow>Quatre expertises. Une même vision.</Eyebrow>
              <h2 className="font-display mt-4 text-[34px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[46px]">
                Chaque besoin appelle une réponse différente.
              </h2>
            </div>
            <p className="text-[14px] leading-relaxed text-white/60 lg:col-span-4 lg:pl-6">
              Une marque à créer, une offre à présenter, une campagne à lancer ou un processus à simplifier : NYAKA mobilise les compétences adaptées.
            </p>
          </div>
        </section>

        <Expertise
          id="branding"
          numero="01 / Identité de marque"
          titre="Branding"
          sousTitre="Construire ce qui vous distingue."
          texte="Nous créons et faisons évoluer des identités capables de raconter une marque avec clarté et cohérence."
          chips={["Positionnement", "Logo & identité visuelle", "Charte graphique", "Direction artistique"]}
          lien={{ href: "/realisations?filtre=branding", label: "Explorer nos réalisations" }}
          visuel={
            <div className="grid grid-cols-[1.55fr_1fr] items-center gap-4">
              <Carte src={`${M}/BRI/BRI_application.jpg`} alt="Applications de l’identité BRIRENA HAIR" />
              <Carte src={`${M}/BRI/BRI_logo_variante.jpg`} alt="Déclinaisons du logo BRIRENA HAIR" />
            </div>
          }
        />

        <Expertise
          id="design"
          inverse
          numero="02 / Design graphique"
          titre="Design"
          sousTitre="Rendre vos idées visibles."
          texte="Des supports imprimés et digitaux qui mettent vos messages en valeur, sans perdre leur fonction première : être compris."
          chips={["Affiches & flyers", "Menus", "Brochures & catalogues", "Supports institutionnels"]}
          lien={{ href: "/realisations", label: "Découvrir le portfolio" }}
          visuel={
            <div className="grid grid-cols-[1.25fr_1fr] items-center gap-4">
              <Carte src={`${M}/KME/KME_page_01.jpg`} alt="Pages intérieures du menu KAWA" />
              <Carte src={`${M}/PER/PER_catalogue_extrait.jpg`} alt="Extrait du catalogue Perfecta" />
            </div>
          }
        />

        <Expertise
          id="video"
          numero="03 / Vidéo & campagnes"
          titre="Vidéo & campagnes"
          sousTitre="Des messages qui prennent vie."
          texte="Du concept au montage, nous pensons des contenus capables de capter l’attention et de servir un objectif de communication."
          chips={["Vidéos publicitaires", "Teasers", "Concepts de campagne", "Montage & formats courts"]}
          lien={{ href: "/demarrer-un-projet", label: "Parler d’une campagne" }}
          visuel={
            <div className="grid grid-cols-2 items-start gap-4 rounded-3xl bg-white/[0.04] p-4 sm:p-6">
              <Carte etiquette="Exemple de campagne" src={`${M}/TV/TV_visuel_01.jpg`} alt="Affiche THE VISION « Rentrées décalées »" />
              <Carte etiquette="Exemple de campagne" className="mt-6" src={`${M}/7G/7G_pay_promo.jpg`} alt="Visuel promotionnel 7G PAY" />
            </div>
          }
        />

        <Expertise
          id="ia-data"
          inverse
          numero="04 / Intelligence artificielle & données"
          titre="IA & Data"
          sousTitre="Des outils qui servent vos activités."
          texte="Nous explorons et concevons des usages ciblés de l’IA et des données pour simplifier les échanges, structurer l’information et accompagner la décision."
          chips={["Assistants IA", "Automatisation", "Collecte de données", "Analyse & reporting"]}
          lien={{ href: "/demarrer-un-projet", label: "Discuter d’un besoin IA" }}
          visuel={
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
              <div className="flex items-start justify-between gap-4">
                <p className="text-[13px] font-semibold">Un système conçu autour d’un usage</p>
                <p className="shrink-0 text-[10px] text-white/45">Schéma illustratif</p>
              </div>
              <ol className="mt-14 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                {[
                  { n: "1", t: "Besoin", d: "Identifier le problème", rose: false },
                  { n: "2", t: "Solution", d: "IA & automatisation", rose: true },
                  { n: "3", t: "Usage", d: "Accompagner l’activité", rose: false },
                ].map((s, i) => (
                  <li key={s.n} className="contents">
                    <div className={`rounded-xl p-4 ${s.rose ? "bg-accent/10" : "bg-white/[0.05]"}`}>
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded text-[11px] font-bold"
                        style={s.rose ? { background: "rgba(255,88,174,0.18)", color: ROSE } : { background: "rgba(255,255,255,0.1)" }}
                      >
                        {s.n}
                      </span>
                      <p className="mt-3 text-[13px] font-bold">{s.t}</p>
                      <p className="mt-0.5 text-[11px] text-white/50">{s.d}</p>
                    </div>
                    {i < 2 && (
                      <span aria-hidden className="hidden text-center text-[12px] sm:block" style={{ color: ROSE }}>
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <ul className="mt-14 flex flex-wrap gap-2">
                {["Processus", "Données", "Interactions", "Suivi"].map((x) => (
                  <li key={x} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        {/* Le bon point de départ */}
        <section className="border-t border-white/10 px-4 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Eyebrow>Le bon point de départ</Eyebrow>
                <h2 className="font-display mt-4 text-[32px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[44px]">
                  Une idée. Plusieurs chemins possibles.
                </h2>
              </div>
              <p className="text-[13px] leading-relaxed text-white/60 lg:col-span-4 lg:pl-10">
                Choisissez votre situation. Découvrez comment nos pôles peuvent se compléter sans multiplier les prestations inutiles.
              </p>
            </div>

            <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/10 bg-[#111] md:grid-cols-[1fr_1.2fr]">
              <div role="tablist" aria-label="Votre situation" className="border-b border-white/10 md:border-b-0 md:border-r">
                {CHEMINS.map((ch, i) => (
                  <button
                    key={ch.choix}
                    type="button"
                    role="tab"
                    aria-selected={chemin === i}
                    onClick={() => setChemin(i)}
                    className={`flex w-full items-center justify-between border-b border-white/10 px-6 py-5 text-left text-[13px] font-semibold transition-colors last:border-b-0 md:last:border-b ${
                      chemin === i ? "bg-accent/10" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    {ch.choix}
                    <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: chemin === i ? ROSE : "#ffffff" }} />
                  </button>
                ))}
              </div>
              <div key={chemin} role="tabpanel" className="animate-[fadeIn_300ms_ease-out] p-6 sm:p-10">
                <Eyebrow dot={false}>Une réponse adaptée</Eyebrow>
                <h3 className="font-display mt-4 max-w-md text-[24px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[28px]">{c.titre}</h3>
                <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/60">{c.texte}</p>
                <Chips items={c.poles} soft />
              </div>
            </div>
          </div>
        </section>

        {/* Appel final */}
        <section className="px-4 pb-24 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] px-7 py-12 text-white sm:px-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow light>Parlons de votre projet</Eyebrow>
              <h2 className="font-display mt-5 text-[38px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[54px]">
                Un projet en tête&nbsp;?
                <br />
                Parlons-en.
              </h2>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/70">
                Partagez-nous votre idée ou votre besoin. Ensemble, donnons-lui la bonne direction.
              </p>
            </div>
            <Link
              href="/demarrer-un-projet"
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-white px-6 py-3.5 text-[13px] font-semibold text-black transition-opacity hover:opacity-90 lg:self-auto"
            >
              Démarrer un projet <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>

    </div>
  );
}
