"use client";

import { ArrowRight } from "lucide-react";
import { ouvrirAssistant } from "@/components/ChatWidget";

// « Nous écrire » : ouvre l'assistant IA sur la page en cours (pas de mailto,
// pas de changement d'adresse). v42 — cahier de cadrage n°4.
export function BoutonNousEcrire({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={ouvrirAssistant}
      className="group inline-flex items-center gap-2 rounded-lg bg-[#f6f3ef] px-6 py-3 text-sm font-semibold text-[#181716] transition-transform hover:-translate-y-0.5 sm:text-[15px]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </button>
  );
}
