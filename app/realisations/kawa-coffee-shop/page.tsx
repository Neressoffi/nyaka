import { redirect } from "next/navigation";

// Ancienne étude de cas KAWA : remplacée par la fiche « KAWA Menu Experience »
// (cahier de corrections n°2). L'ancienne adresse renvoie vers la nouvelle.
export default function AncienneFicheKawa() {
  redirect("/realisations/kawa-menu-experience");
}
