import type { Metadata } from "next";
import { SolutionsMaquette } from "@/components/solutions/SolutionsMaquette";

// Page Solutions — nouvelle maquette (v18). Ancienne version : _versions/v18/avant.
export const metadata: Metadata = {
  title: "Solutions : branding, design, vidéo, IA & data | NYAKA",
  description:
    "Branding, design, vidéo et intelligence artificielle : des expertises qui se complètent pour donner la bonne forme à votre projet.",
};

export default function SolutionsPage() {
  return <SolutionsMaquette />;
}
