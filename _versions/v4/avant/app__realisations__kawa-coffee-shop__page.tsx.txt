import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { kawaCaseStudy } from "@/lib/realisations-data";

export const metadata: Metadata = {
  title: "Étude de cas KAWA Coffee Shop | NYAKA",
  description:
    "Comment NYAKA a transformé la carte de menu de KAWA Coffee Shop en prolongement de l'expérience de marque, entre support premium et base digitale.",
};

export default function KawaCaseStudyPage() {
  return (
    <main>
      <TopBanner />
      <Header />

      <section className="relative overflow-hidden">
        <img
          src={kawaCaseStudy.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />

        <div className="relative mx-auto flex min-h-[72vh] w-full max-w-screen-2xl flex-col justify-end px-4 pb-16 pt-40 lg:px-8 lg:pb-24">
          <Link
            href="/realisations"
            className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-white/70 transition-colors hover:text-white sm:text-[15px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux réalisations
          </Link>

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">
            Étude de cas
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[30px] font-bold leading-[1.15] text-white sm:text-[38px] lg:text-[52px]">
            {kawaCaseStudy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-base lg:text-[17px]">
            {kawaCaseStudy.subtitle}
          </p>
          <p className="mt-4 text-[13px] text-white/60 sm:text-sm">
            {kawaCaseStudy.sector}
            <span className="mx-2">|</span>
            {kawaCaseStudy.location}
          </p>
        </div>
      </section>

      {kawaCaseStudy.sections.map((section, index) => {
        const imageFirst = index % 2 === 1;
        const isDark = index % 2 === 0;

        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-24 px-4 py-16 lg:px-8 lg:py-24 ${
              isDark ? "bg-surface-0" : "bg-marketing-surface-0"
            }`}
          >
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={imageFirst ? "lg:order-2" : undefined}>
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${
                    isDark ? "text-accent" : "text-marketing-foreground-2"
                  }`}
                >
                  0{index + 1}
                </p>
                <h2
                  className={`mt-3 font-display text-[26px] font-bold leading-[1.2] sm:text-[32px] sm:leading-tight lg:text-[40px] ${
                    isDark
                      ? "text-white"
                      : "text-marketing-foreground-0"
                  }`}
                >
                  {section.title}
                </h2>
                <p
                  className={`mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base lg:text-[17px] ${
                    isDark
                      ? "text-white/70"
                      : "text-marketing-foreground-2"
                  }`}
                >
                  {section.content}
                </p>
              </div>

              <div
                className={`relative min-h-[280px] overflow-hidden rounded-2lg lg:min-h-[480px] ${
                  imageFirst ? "lg:order-1" : ""
                }`}
              >
                <img
                  src={section.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative overflow-hidden px-4 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b1055] via-[#7b2d5e] to-[#d96a3b]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-px w-[160%] -translate-x-1/2 -rotate-[8deg] bg-accent/70" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-display text-[26px] font-bold leading-[1.2] text-white sm:text-[32px] sm:leading-tight lg:text-[40px]">
            Votre projet peut être le prochain.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/80 sm:text-base lg:text-[17px]">
            Présentez-nous votre besoin, votre idée ou la transformation que
            vous préparez. Nous partirons de votre situation pour construire
            la réponse adaptée.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#"
              className="group inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85 sm:text-[15px]"
            >
              Démarrer un projet
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/realisations"
              className="rounded-lg border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:text-[15px]"
            >
              Voir toutes les réalisations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
