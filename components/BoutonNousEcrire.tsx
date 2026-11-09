"use client";

import { ArrowRight } from "lucide-react";

// « Nous écrire » (cahier n°4) : ouvre l'assistant IA sur la page en cours, sans
// modifier le code de l'assistant (géré par l'ingénieur IA) : on clique sur sa bulle.
// Si l'assistant n'est pas disponible, on bascule vers WhatsApp (jamais d'impasse).
const BULLE = 'button[aria-label="Ouvrir l\'assistant NYAKA"], button[aria-label="Open the NYAKA assistant"]';
const SECOURS = "https://wa.me/79152135853";

function ouvrir() {
  const bulle = document.querySelector<HTMLButtonElement>(BULLE);
  if (bulle) bulle.click();
  else window.location.href = SECOURS;
}

export function BoutonNousEcrire({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={ouvrir}
      className="group inline-flex items-center gap-2 rounded-lg bg-[#f6f3ef] px-6 py-3 text-sm font-semibold text-[#181716] transition-transform hover:-translate-y-0.5 sm:text-[15px]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </button>
  );
}
