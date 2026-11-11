"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

// Page À propos V2 — textes exacts du brief « NYAKA_Brief_Developpeur_A_Propos_V2 »,
// zones de couleur du prototype (beige / blanc / section Vision sombre), accent jaune or.
// En-tête et pied de page : composants officiels du site (voir app/a-propos/page.tsx).

const PUBLICS = [
  {
    surtitre: "01 / Les idées qui démarrent",
    titre: "Entrepreneurs & porteurs de projets",
    texte: "Donner une direction, une identité et des outils solides aux idées qui prennent forme.",
    bas: "Votre point de départ",
    resultat: "Transformer une idée en projet clairement présenté et identifiable.",
  },
  {
    surtitre: "02 / Les activités qui grandissent",
    titre: "Petites & moyennes entreprises",
    texte: "Renforcer leur image, structurer leur communication et soutenir leur croissance.",
    bas: "Votre prochaine étape",
    resultat: "Renforcer la cohérence de l’image et donner plus de portée à la communication.",
  },
  {
    surtitre: "03 / Les structures qui évoluent",
    titre: "Grandes entreprises & organisations",
    texte: "Accompagner des projets plus complexes avec créativité, rigueur et solutions adaptées.",
    bas: "Vos nouveaux enjeux",
    resultat: "Relier les expertises pour accompagner des besoins plus complexes et évolutifs.",
  },
];

const ETAPES = [
  { n: "01", titre: "Comprendre", texte: "Identifier votre besoin, vos objectifs et le contexte réel de votre projet." },
  { n: "02", titre: "Concevoir", texte: "Définir une réponse créative et stratégique, adaptée à vos priorités." },
  { n: "03", titre: "Déployer", texte: "Donner vie à la solution, coordonner sa mise en œuvre et la faire évoluer." },
];

const ANIM = `
@keyframes ap-float{0%,100%{translate:0 0}50%{translate:0 -9px}}
@keyframes ap-rotate{to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes ap-bob{0%,100%{translate:0 0}50%{translate:0 5px}}
@keyframes ap-pulse{0%,100%{opacity:.7}50%{opacity:.3}}
.ap-float{animation:ap-float 6s ease-in-out infinite}
.ap-rotate{animation:ap-rotate 75s linear infinite}
.ap-bob{animation:ap-bob 2.7s ease-in-out infinite}
.ap-pulse{animation:ap-pulse 10s ease-in-out infinite}
.ap-reveal{opacity:0;transform:translateY(20px);transition:opacity .75s ease,transform .75s ease}
.ap-reveal.ap-in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.ap-float,.ap-rotate,.ap-bob,.ap-pulse{animation:none!important}.ap-reveal{opacity:1!important;transform:none!important;transition:none!important}}
`;

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a847c] sm:text-xs ${className}`}>
      {children}
    </p>
  );
}

function Tiny({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a847c] ${className}`}>{children}</span>
  );
}

function IntroLigne({ gauche, droite }: { gauche: string; droite: string }) {
  return (
    <div className="ap-reveal mb-10 flex items-start justify-between gap-6 lg:mb-12">
      <Eyebrow>{gauche}</Eyebrow>
      <Tiny className="hidden text-right sm:block">{droite}</Tiny>
    </div>
  );
}

const H2 = "font-display font-bold leading-[1.08] tracking-[-0.03em] text-[#1f1d1b] text-[34px] sm:text-[44px] lg:text-[56px]";
const BTN = "inline-flex min-h-[48px] items-center gap-3 rounded-lg px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 sm:text-[15px]";

const DESSINS = [
  <svg key="0" viewBox="0 0 220 150" fill="none" className="h-full w-full"><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M35 123h150M50 115v-54h120v54M86 61V37h48v24" /><path d="M68 115V84h34v31M118 83h32v32M94 37h32M101 30v-14M117 30v-14M109 11v-6" /><circle cx="176" cy="28" r="17" strokeDasharray="3 6" /><path d="M174 20v16m-7-8h15" /></g><rect x="76" y="73" width="27" height="5" rx="2.5" fill="currentColor" opacity=".35" /><path d="M58 123h105" stroke="#D8A53A" strokeWidth="3" /></svg>,
  <svg key="1" viewBox="0 0 220 150" fill="none" className="h-full w-full"><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M24 123h169M40 123V40h71v83M111 123V65h58v58M58 57h11m17 0h11M58 77h11m17 0h11M58 97h11m17 0h11M127 81h12m14 0h4M127 99h12m14 0h4" /><path d="M29 32h93" /></g><path d="M160 33l17-16m-16 16 0-13m0 13h13" stroke="#D8A53A" strokeWidth="2" strokeLinecap="round" /><rect x="49" y="40" width="52" height="5" rx="2.5" fill="currentColor" opacity=".35" /></svg>,
  <svg key="2" viewBox="0 0 220 150" fill="none" className="h-full w-full"><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 124h184M44 124V23h62v101m15 0V50h64v74M58 43h12m14 0h8M58 63h12m14 0h8M58 83h12m14 0h8M58 103h12m14 0h8M138 68h11m18 0h7m-36 18h11m18 0h7m-36 18h11m18 0h7" /><path d="M175 33l12-13 13 13" /></g><path d="M75 14h46" stroke="#D8A53A" strokeWidth="2" /><rect x="131" y="116" width="25" height="8" fill="currentColor" opacity=".35" /></svg>,
];

const SYMBOLES = [
  <svg key="0" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-12 w-12 sm:h-14 sm:w-14"><circle cx="24" cy="24" r="17" /><path d="m36 36 14 14M17 24h14M24 17v14" /></svg>,
  <svg key="1" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" className="h-12 w-12 sm:h-14 sm:w-14"><path d="M28 5 50 18 28 31 6 18 28 5ZM6 27l22 13 22-13M6 36l22 13 22-13" /></svg>,
  <svg key="2" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-12 w-12 sm:h-14 sm:w-14"><path d="M9 45V23h14v22M23 45V12h13v33M36 45V28h12v17M5 45h47M33 6h15v15M48 6 34 20" /></svg>,
];

export function AproposV2() {
  const [public_, setPublic] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".ap-reveal"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("ap-in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ap-in");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.09, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#e9e4db] text-[#1f1d1b]">
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* 01 · Hero */}
      <section id="intro" className="overflow-hidden bg-[#191716] px-4 pb-14 pt-32 text-white lg:px-8 lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-8 flex items-center justify-between gap-5 lg:mb-11">
            <Eyebrow className="!text-[#D8A53A]">Notre identité / L’agence</Eyebrow>
            <Tiny className="hidden !text-[#a59c90] sm:inline">NYAKA · L’empreinte de votre marque.</Tiny>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8 [&>*]:min-w-0">
            <div>
              <h1 className="font-display text-[64px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-[88px] lg:text-[108px]">
                À propos
              </h1>
              <p className="mt-7 max-w-[650px] font-display text-[24px] font-medium leading-[1.3] tracking-[-0.02em] text-[#e9e1d6] sm:text-[30px] lg:text-[34px]">
                Une agence de <strong className="font-bold text-white">communication créative</strong> et de{" "}
                <strong className="font-bold text-[#D8A53A]">solutions d’intelligence artificielle.</strong>
              </p>
              <p className="mt-5 max-w-[510px] text-[15px] leading-[1.8] text-[#bfb6aa] sm:text-base">
                Nous accompagnons les entrepreneurs, les porteurs de projets et les entreprises dans la création, la structuration et le développement de leur image, de leur communication et de leurs outils.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#vision" className={`${BTN} bg-[#f6f3ef] text-[#181716] hover:opacity-90`}>
                  Découvrir notre vision <ArrowDownRight className="h-4 w-4" />
                </a>
                <Link href="/realisations" className={`${BTN} border border-[#776a5f] text-white hover:border-[#D8A53A] hover:text-[#D8A53A]`}>
                  Nos réalisations <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Schéma en orbite */}
            <div
              className="relative mx-auto flex h-[300px] w-full max-w-[560px] items-center justify-center overflow-hidden sm:h-[420px] lg:h-[490px] lg:overflow-visible"
              aria-label="Schéma conceptuel représentant la stratégie, la création et la technologie réunies autour de NYAKA"
              role="img"
            >
              <div className="relative h-[440px] w-[510px] shrink-0 origin-center scale-[0.62] sm:scale-[0.85] lg:scale-100">
                <div className="ap-rotate absolute left-1/2 top-1/2 h-[435px] w-[435px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#5a5048]" />
                <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#48413b]" />
                <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D8A53A]/40 bg-[#282321]" />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 510 440" aria-hidden="true">
                  <g fill="none" stroke="#6b6158" strokeWidth="1.3"><path d="M128 92 L205 160" /><path d="M402 160 L326 190" /><path d="M163 358 L213 282" /></g>
                  <g fill="#D8A53A"><circle cx="205" cy="160" r="3" /><circle cx="326" cy="190" r="3" /><circle cx="213" cy="282" r="3" /></g>
                </svg>
                <div className="absolute left-1/2 top-1/2 w-[170px] -translate-x-1/2 -translate-y-1/2 text-center">
                  <strong className="block font-display text-[26px] leading-tight tracking-[-0.03em] text-white">Une vision<br />commune</strong>
                  <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.17em] text-[#D8A53A]">Créativité × Clarté</span>
                </div>
                {[
                  { t: "STRATÉGIE", c: "left-[6%] top-[12%]", d: "0s" },
                  { t: "CRÉATION", c: "right-[1%] top-[26%]", d: "-2s" },
                  { t: "IA & DONNÉES", c: "left-[14%] bottom-[12%]", d: "-4s" },
                ].map((n) => (
                  <div
                    key={n.t}
                    className={`ap-float absolute ${n.c} flex items-center gap-2.5 rounded-[10px] border border-[#48413b] bg-[#282321] px-4 py-3.5 text-[12px] font-bold tracking-[0.045em] text-white shadow-2xl`}
                    style={{ animationDelay: n.d }}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#D8A53A]" />
                    {n.t}
                  </div>
                ))}
                <span className="absolute bottom-2 right-0 text-[10px] uppercase tracking-[0.16em] text-[#a59c90]">
                  Des expertises qui se rencontrent
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 h-px bg-[#3a332e] lg:mt-12" />
          <div className="flex items-center justify-between gap-5 pt-5">
            <span className="flex items-center gap-2 text-[11px] font-semibold text-[#a59c90]">
              <ArrowDown className="ap-bob h-4 w-4" /> Faire défiler pour découvrir NYAKA
            </span>
            <Tiny className="hidden !text-[#a59c90] sm:inline">01 — Notre identité</Tiny>
          </div>
        </div>
      </section>

      {/* 02 · Ce qui nous anime */}
      <section id="conviction" className="border-t border-[#ddd7cc] bg-[#efebe4] px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-screen-xl">
          <IntroLigne gauche="01 / Ce qui nous anime" droite="La conviction avant la forme" />
          <div className="grid items-end gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <h2 className={`ap-reveal max-w-[760px] ${H2} lg:text-[68px]`}>
              Une marque ne se résume pas à{" "}
              <span className="bg-[linear-gradient(transparent_82%,rgba(216,165,58,0.35)_82%)]">ce qu’elle montre.</span>
            </h2>
            <div className="ap-reveal max-w-[440px] border-t border-[#dedad4] pt-6 lg:justify-self-end">
              <p className="text-base leading-[1.85] text-[#484440] sm:text-[17px]">
                Elle se construit dans ce que les gens comprennent, reconnaissent et retiennent. Chez NYAKA, nous relions les idées, les messages, les créations et les outils pour bâtir cette cohérence.
              </p>
            </div>
          </div>
          <div className="ap-reveal mt-14 flex flex-col gap-2 border-y border-[#dedad4] py-6 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
            <strong className="font-display text-base font-semibold">« L’empreinte de votre marque. »</strong>
            <Tiny>Notre signature. Notre exigence.</Tiny>
          </div>
        </div>
      </section>

      {/* 03 · Qui nous accompagnons */}
      <section id="publics" className="border-t border-[#dedad4] px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-screen-xl">
          <IntroLigne gauche="02 / Qui nous accompagnons" droite="Des ambitions de toutes tailles" />
          <div className="ap-reveal mb-10 grid items-end gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <h2 className={`max-w-[620px] ${H2}`}>À chaque étape de votre développement.</h2>
            <p className="max-w-[390px] text-[15px] leading-[1.8] text-[#6b6964] sm:text-base lg:justify-self-end">
              De la première idée à une organisation établie, nous adaptons notre accompagnement à votre situation, à vos ressources et à vos objectifs.
            </p>
          </div>

          {/* L'animation d'apparition est sur le conteneur : le className des cartes
              change au clic et effacerait sinon la classe d'apparition. */}
          <div className="ap-reveal grid gap-3 md:grid-cols-3">
            {PUBLICS.map((p, i) => {
              const actif = public_ === i;
              return (
                <button
                  key={p.titre}
                  type="button"
                  aria-pressed={actif}
                  onClick={() => setPublic(i)}
                  className={`group relative flex flex-col overflow-hidden rounded-[20px] border bg-[#f6f3ee] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#bbb6b0] hover:shadow-[0_20px_48px_rgba(33,29,25,0.07)] md:min-h-[430px] lg:p-7 ${
                    actif ? "-translate-y-1 border-[#bbb6b0] shadow-[0_20px_48px_rgba(33,29,25,0.07)]" : "border-[#dedad4]"
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8a847c]">{p.surtitre}</span>
                  <span className="my-4 flex h-32 w-full items-center justify-center text-[#8a847c] sm:h-40" aria-hidden="true">
                    <span className="block h-full w-[80%] max-w-[220px]">{DESSINS[i]}</span>
                  </span>
                  <span className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-[#1f1d1b] lg:text-[26px]">{p.titre}</span>
                  <span className="mt-3 max-w-[300px] text-sm leading-[1.7] text-[#6b6964]">{p.texte}</span>
                  <span className="mt-auto flex w-full items-center justify-between pt-6 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1f1d1b]">
                    {p.bas}
                    <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {actif && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#D8A53A]" />}
                </button>
              );
            })}
          </div>

          <div
            className="ap-reveal mt-4 flex flex-col gap-1.5 rounded-[14px] bg-[#e2dcd1] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            role="status"
            aria-live="polite"
          >
            <Eyebrow className="!text-[#8a847c]">Notre accompagnement</Eyebrow>
            <strong className="text-sm font-semibold leading-relaxed text-[#1f1d1b] sm:text-base">{PUBLICS[public_].resultat}</strong>
          </div>
        </div>
      </section>

      {/* 04 · Notre vision */}
      <section id="vision" className="relative scroll-mt-4 overflow-hidden bg-[#211e1d] text-white px-4 py-20 lg:px-8 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:linear-gradient(to_right,transparent_15%,black_100%)]"
        />
        <div className="relative mx-auto grid max-w-screen-xl items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="ap-reveal">
            <Eyebrow className="!text-[#b7b1ac]">03 / Notre vision</Eyebrow>
            <h2 className={`my-6 ${H2} !text-white lg:text-[64px]`}>Faire avancer les marques. Et les idées qui les portent.</h2>
            <p className="max-w-[630px] text-[15px] leading-[1.88] text-[#c8c2bb] sm:text-base">
              Notre vision est de faire de NYAKA une agence de référence à la rencontre de la communication créative, du design, de la stratégie et de l’intelligence artificielle.
            </p>
            <p className="mt-5 max-w-[630px] text-[15px] leading-[1.88] text-[#c8c2bb] sm:text-base">
              Nous voulons aider les entrepreneurs et les entreprises à construire une identité forte, à communiquer avec justesse et à intégrer des solutions capables d’accompagner leur développement.
            </p>
            <p className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.15em] text-[#afa8a0]">
              Une ambition portée par la création et l’utilité
            </p>
          </div>
          <div
            className="ap-reveal relative flex h-[300px] items-center justify-center overflow-hidden sm:h-[420px] lg:h-[465px] lg:overflow-visible"
            role="img"
            aria-label="Illustration conceptuelle de la création, de la communication et de l’intelligence artificielle liées à NYAKA"
          >
            <div className="relative h-[390px] w-[390px] shrink-0 scale-[0.68] rounded-full border border-[#4b4541] sm:scale-90 lg:scale-100">
              <div className="ap-pulse absolute inset-[40px] rounded-full border border-[#4b4541]" />
              <div className="ap-pulse absolute inset-[93px] rounded-full border border-[#4b4541]" style={{ animationDelay: "-5s" }} />
              {["top-[18px] left-[46%]", "right-[28px] bottom-[71px]", "bottom-[78px] left-[17px]"].map((c) => (
                <i key={c} className={`absolute ${c} h-3.5 w-3.5 rounded-full bg-[#D8A53A] shadow-[0_0_0_8px_#3b3431]`} />
              ))}
              {[
                { t: "COMMUNICATION", c: "-top-2 -right-12" },
                { t: "INTELLIGENCE", c: "bottom-[70px] -right-12" },
                { t: "CRÉATION", c: "bottom-[55px] -left-14" },
              ].map((n) => (
                <span key={n.t} className={`absolute ${n.c} rounded-lg border border-[#4b4541] bg-[#292421] px-4 py-3 text-[12px] font-bold tracking-[0.05em] text-white/90`}>
                  {n.t}
                </span>
              ))}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[29px] font-bold tracking-[-0.05em]">NYAKA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · Notre manière de travailler */}
      <section id="methode" className="scroll-mt-4 border-t border-[#ddd7cc] bg-[#efebe4] px-4 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-screen-xl">
          <IntroLigne gauche="04 / Notre manière de travailler" droite="Une méthode simple et structurée" />
          <div className="ap-reveal mb-14 grid items-end gap-5 lg:mb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <h2 className={H2}>
              Comprendre.<br />Concevoir.<br />Déployer.
            </h2>
            <p className="max-w-[390px] text-[15px] leading-[1.8] text-[#6b6964] sm:text-base lg:justify-self-end">
              Chaque projet commence par une question essentielle&nbsp;: quel résultat voulons-nous construire ensemble&nbsp;?
            </p>
          </div>

          <ol className="relative grid gap-2 md:grid-cols-3 md:gap-5">
            <span aria-hidden className="absolute bottom-0 left-[14px] top-0 w-px bg-[#dedad4] md:hidden" />
            {ETAPES.map((e, i) => (
              <li key={e.n} className="ap-reveal relative pl-12 md:border-t md:border-[#dedad4] md:pl-0 md:pt-12">
                <span className="absolute left-0 top-1 flex h-[29px] w-[29px] items-center justify-center rounded-full border border-[#dedad4] bg-[#efebe4] text-[11px] font-bold text-[#6b6964] md:-top-[11px] md:h-auto md:w-auto md:rounded-none md:border-0 md:pr-4 md:text-[13px]">
                  {e.n}
                </span>
                <div className="mb-3 flex h-12 items-center text-[#292929] sm:h-16 md:mb-5" aria-hidden>
                  {SYMBOLES[i]}
                </div>
                <h3 className="font-display text-[26px] font-bold tracking-[-0.02em] sm:text-[29px]">{e.titre}</h3>
                <p className="mt-2.5 max-w-[345px] pb-6 text-[15px] leading-[1.75] text-[#6b6964]">{e.texte}</p>
              </li>
            ))}
          </ol>
          <p className="ap-reveal mt-6 border-t border-[#dedad4] pt-5 text-xs text-[#8a847c]">
            Une approche intégrée à NYAKA, sans démarche inutilement complexe.
          </p>
        </div>
      </section>

      {/* 06 · Le collectif */}
      <section id="collectif" className="border-t border-[#dedad4] px-4 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 lg:grid-cols-[0.93fr_1.07fr] lg:gap-16">
          <div className="ap-reveal">
            <Eyebrow>05 / Le collectif</Eyebrow>
            <h2 className={`my-6 ${H2}`}>Des regards différents. Une vision commune.</h2>
            <p className="max-w-[505px] text-[15px] leading-[1.9] text-[#6b6964] sm:text-base">
              NYAKA s’appuie sur une équipe créative et des compétences complémentaires, mobilisées selon la nature de chaque projet.
            </p>
            <p className="mt-4 max-w-[505px] text-[15px] leading-[1.9] text-[#6b6964] sm:text-base">
              Notre force réside dans la capacité à faire dialoguer stratégie, design, production et technologie, avec des partenaires spécialisés lorsque cela est nécessaire.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {["Stratégie", "Identité & design", "Vidéo & contenus", "IA & données"].map((t) => (
                <li key={t} className="rounded-full bg-[#e2dcd1] px-3.5 py-2.5 text-xs font-medium text-[#292929]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="ap-reveal relative mx-auto h-[320px] w-full max-w-[580px] overflow-hidden sm:h-[465px]"
            role="img"
            aria-label="Schéma des compétences réunies autour de NYAKA"
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 580 465" fill="none" aria-hidden>
              <g stroke="#d1cbc3" strokeWidth="1.4">
                <path d="M290 233 138 100M290 233 465 103M290 233 127 375M290 233 464 365" />
                <circle cx="290" cy="233" r="160" strokeDasharray="2 8" />
              </g>
              <g fill="#afaaa1"><circle cx="138" cy="100" r="5" /><circle cx="465" cy="103" r="5" /><circle cx="127" cy="375" r="5" /><circle cx="464" cy="365" r="5" /></g>
            </svg>
            {[
              { t: "STRATÉGIE", c: "left-[1%] top-[13%] sm:left-[6%] sm:top-[17%]", d: "0s" },
              { t: "DESIGN", c: "right-0 top-[15%] sm:right-[2%]", d: "-2s" },
              { t: "PRODUCTION", c: "left-[2%] bottom-[12%] sm:left-[10%] sm:bottom-[14%]", d: "-3s" },
              { t: "IA & DATA", c: "right-[1%] bottom-[14%] sm:right-[4%] sm:bottom-[17%]", d: "-4s" },
            ].map((n) => (
              <span
                key={n.t}
                className={`ap-float absolute ${n.c} flex items-center gap-2 rounded-[11px] border border-[#dedad4] bg-[#f6f3ee] px-3 py-2.5 text-[10px] font-bold tracking-[0.02em] shadow-2xl sm:gap-2.5 sm:px-5 sm:py-4 sm:text-[13px]`}
                style={{ animationDelay: n.d, animationDuration: "7s" }}
              >
                <i className="h-2 w-2 rounded-full bg-[#aea59a] sm:h-[9px] sm:w-[9px]" />
                {n.t}
              </span>
            ))}
            <div className="absolute left-1/2 top-1/2 flex h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#1c1c1c] text-center text-white shadow-2xl sm:h-[150px] sm:w-[150px]">
              <strong className="font-display text-[19px] font-bold tracking-[-0.04em] sm:text-2xl">NYAKA</strong>
              <span className="mt-1 text-[8px] uppercase leading-[1.8] tracking-[0.12em] text-[#6b6964] sm:text-[9px]">
                Ensemble,<br />pour chaque projet
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · Contact */}
      <section id="contact" className="border-t border-[#ddd7cc] bg-[#efebe4] px-4 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-screen-xl items-end gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <div className="ap-reveal">
            <Eyebrow>Et maintenant&nbsp;?</Eyebrow>
            <h2 className={`mt-5 max-w-[720px] ${H2} lg:text-[66px]`}>Votre projet mérite une direction juste.</h2>
          </div>
          <div className="ap-reveal flex flex-col items-start gap-6">
            <p className="max-w-[375px] text-base leading-[1.8] text-[#6b6964] sm:text-[17px]">
              Une idée à lancer, une identité à construire, une communication à repenser ou une solution à développer&nbsp;? Parlons-en.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/demarrer-un-projet" className={`${BTN} bg-[#161616] text-white hover:opacity-90`}>
                Démarrer un projet <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/79152135853"
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN} border border-[#dedad4] text-[#1f1d1b] hover:border-[#161616]`}
              >
                Échanger sur WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
