"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { PortfolioTexts, Projet, Video, VideosIntro } from "@/lib/portfolio";
import { VideoModal } from "./VideoModal";

type Filtre = "tous" | "branding" | "videos" | "ia";
const FILTRES: Filtre[] = ["tous", "branding", "videos", "ia"];

type Item =
  | { kind: "projet"; key: string; projet: Projet }
  | { kind: "video"; key: string; video: Video };

function lireFiltre(): Filtre {
  if (typeof window === "undefined") return "tous";
  const f = new URLSearchParams(window.location.search).get("filtre");
  return FILTRES.includes(f as Filtre) ? (f as Filtre) : "tous";
}

export function PortfolioGallery({
  texts,
  videosIntro,
  projets,
  videos,
}: {
  texts: PortfolioTexts;
  videosIntro: VideosIntro;
  projets: Projet[];
  videos: Video[];
}) {
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const [video, setVideo] = useState<Video | null>(null);

  // Le filtre actif est conservé dans l'adresse (?filtre=…) : il reste actif
  // au retour d'une fiche, sans rechargement de la page.
  useEffect(() => {
    setFiltre(lireFiltre());
    const onPop = () => setFiltre(lireFiltre());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const choisir = useCallback((f: Filtre) => {
    setFiltre(f);
    const url = new URL(window.location.href);
    if (f === "tous") url.searchParams.delete("filtre");
    else url.searchParams.set("filtre", f);
    window.history.replaceState(null, "", url.toString());
  }, []);

  const branding = projets.filter((p) => p.categorie === "branding-design");
  const ia = projets.filter((p) => p.categorie === "ia-data");
  const asItems = (list: Projet[]): Item[] =>
    list.map((p) => ({ kind: "projet", key: p.slug, projet: p }));
  const videoItems: Item[] = videos.map((v, i) => ({
    kind: "video",
    key: `video-${i}-${v.titre}`,
    video: v,
  }));

  const items: Item[] =
    filtre === "branding"
      ? asItems(branding)
      : filtre === "videos"
        ? videoItems
        : filtre === "ia"
          ? asItems(ia)
          : [...asItems(branding), ...asItems(ia), ...videoItems];

  const [vedette, ...reste] = items;

  return (
    <>
      <div
        role="tablist"
        aria-label="Filtrer les réalisations"
        className="mt-10 flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-hidden"
      >
        {FILTRES.map((f) => {
          const actif = filtre === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={actif}
              onClick={() => choisir(f)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                actif
                  ? "border-[#191817] bg-[#191817] text-white"
                  : "border-[#d9d3c9] text-[#4a4540] hover:border-[#968779] hover:text-[#191817]"
              }`}
            >
              {texts.filtres[f]}
            </button>
          );
        })}
      </div>

      {filtre === "videos" && (
        <div className="mt-12 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-[#191817] sm:text-3xl">
            {videosIntro.titre}
          </h2>
          <p className="mt-3 text-lg text-[#191817]">{videosIntro.accroche}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-[#6d6861]">
            {videosIntro.description}
          </p>
        </div>
      )}

      <div key={filtre} className="animate-[fadeIn_400ms_ease-out]">
        {vedette && (
          <div className="mt-10 border-b border-[#dedad3] pb-10">
            <Carte item={vedette} vedette onVideo={setVideo} />
          </div>
        )}

        {reste.length > 0 && (
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8 lg:gap-y-14">
            {reste.map((item) => (
              <li key={item.key}>
                <Carte item={item} onVideo={setVideo} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <VideoModal video={video} onClose={() => setVideo(null)} />
    </>
  );
}

function Carte({
  item,
  vedette = false,
  onVideo,
}: {
  item: Item;
  vedette?: boolean;
  onVideo: (v: Video) => void;
}) {
  const image =
    item.kind === "projet" ? item.projet.couverture.image : item.video.miniature;
  const alt =
    item.kind === "projet"
      ? item.projet.couverture.alt
      : item.video.alt ?? `Miniature de la vidéo ${item.video.titre}`;
  const titre = item.kind === "projet" ? item.projet.titre : item.video.titre;
  const meta =
    item.kind === "projet" ? item.projet.expertises : item.video.client;
  const accroche = item.kind === "projet" ? item.projet.accroche : item.video.description;

  const visuel = (
    <div
      className={`relative overflow-hidden rounded-[20px] bg-[#e7e0d7] sm:rounded-[24px] ${
        vedette ? "aspect-[16/9]" : item.kind === "video" ? "aspect-[16/9]" : "aspect-[4/3]"
      }`}
    >
      <img
        src={image}
        alt={alt}
        loading={vedette ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      {item.kind === "video" && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/35">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
            <Play className="ml-0.5 h-5 w-5 fill-black sm:h-6 sm:w-6" />
          </span>
        </span>
      )}
    </div>
  );

  const texte = (
    <div className={vedette ? "mt-5" : "mt-4"}>
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-display font-bold leading-tight text-[#191817] ${
            vedette ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl lg:text-2xl"
          }`}
        >
          {titre}
        </h3>
        {vedette && (
          <ArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-[#a39a8f] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D8A53A]" />
        )}
      </div>
      <p className="mt-1.5 text-sm leading-snug text-[#6d6861] sm:text-[15px]">{meta}</p>
      {vedette && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3a3530] sm:text-lg">
          {accroche}
        </p>
      )}
    </div>
  );

  if (item.kind === "video") {
    return (
      <button
        type="button"
        onClick={() => onVideo(item.video)}
        aria-label={`Lire la vidéo « ${item.video.titre} » · ${item.video.client}`}
        className="group block w-full text-left"
      >
        {visuel}
        {texte}
      </button>
    );
  }

  return (
    <Link href={`/realisations/${item.projet.slug}`} className="group block">
      {visuel}
      {texte}
    </Link>
  );
}
