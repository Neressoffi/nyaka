"use client";

import { useEffect, useState } from "react";
import { frameworkPhases } from "@/lib/approche-data";

export function ApprocheFramework() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % frameworkPhases.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="framework"
      className="scroll-mt-28 bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">
            Le Framework NYAKA
          </p>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
            Six phases, du besoin initial à l&apos;évolution
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">
            Le Framework décrit la manière dont NYAKA accompagne un projet.
            Un parcours continu, du cadrage jusqu&apos;à l&apos;évolution.
          </p>
        </div>

        <div className="mt-10 h-1 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{
              width: `${((activeIndex + 1) / frameworkPhases.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {frameworkPhases.map((phase, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={phase.number}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-2lg border p-5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-marketing-surface-1 text-marketing-foreground-0 hover:border-black/25"
                }`}
              >
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-xs ${
                    isActive ? "text-accent" : "text-marketing-foreground-2"
                  }`}
                >
                  {phase.number}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold sm:text-xl">
                  {phase.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed sm:text-[15px] ${
                    isActive ? "text-white/75" : "text-marketing-foreground-2"
                  }`}
                >
                  {phase.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
