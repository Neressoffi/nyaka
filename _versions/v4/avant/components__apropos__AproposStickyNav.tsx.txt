"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { id: "origine", label: "Origine" },
  { id: "empreinte", label: "Empreinte" },
  { id: "principes", label: "Principes" },
  { id: "equipe", label: "Équipe" },
  { id: "direction", label: "Direction" },
] as const;

export function AproposStickyNav() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    const onScroll = () => {
      const first = document.getElementById("origine");
      const last = document.getElementById("direction");
      if (!first) return;

      const pastStart = window.scrollY >= first.offsetTop - 120;
      const beforeEnd = last
        ? window.scrollY < last.offsetTop + last.offsetHeight - 120
        : true;
      setVisible(pastStart && beforeEnd);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 z-30 border-b border-white/10 bg-surface-0/90 backdrop-blur transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <nav
        aria-label="Navigation À propos"
        className="mx-auto flex max-w-screen-2xl gap-1 overflow-x-auto px-4 py-3 scrollbar-hidden lg:px-8"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 rounded-lg px-3.5 py-2 text-[13px] transition-colors sm:text-sm ${
                isActive
                  ? "bg-white text-black"
                  : "text-foreground-2 hover:bg-white/5 hover:text-foreground-0"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
