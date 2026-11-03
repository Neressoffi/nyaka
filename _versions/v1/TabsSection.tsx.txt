"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import * as Tabs from "@radix-ui/react-tabs";
import {
  ArrowRight,
  Box,
  Image as ImageIcon,
  LayoutGrid,
  Music,
  Video,
} from "lucide-react";

import { tabs, type TabContent } from "@/lib/tabs-data";

const ICONS: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  box: Box,
  layout: LayoutGrid,
};

const AUTO_ROTATE_MS = 5000;

function TabPanel({ tab }: { tab: TabContent }) {

  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveItem((current) => (current + 1) % tab.items.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [activeItem, tab.items.length]);

  return (
    <div className="grid min-h-[650px] grid-cols-1 gap-8 overflow-hidden rounded-2lg bg-beige-950 p-6 lg:h-[650px] lg:grid-cols-[320px_minmax(0,1fr)] lg:p-10 xl:grid-cols-[360px_minmax(0,1fr)]">

      <div className="flex min-w-0 flex-col">

        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
          {tab.panelTitle}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
          {tab.panelDescription}
        </p>

        <Link
          href={tab.ctaHref}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white sm:text-[15px]"
        >
          {tab.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <ul className="mt-10 flex flex-col gap-1 lg:mt-auto lg:pt-8">
          {tab.items.map((item, index) => {
            const Icon = ICONS[item.icon];

            const isActive = index === activeItem;
            return (
              <li key={item.title}>

                <button
                  onClick={() => setActiveItem(index)}
                  className="group w-full py-2.5 text-left"
                >

                  <span className="flex items-center gap-3">
                    <Icon
                      className={`h-[18px] w-[18px] transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`text-[15px] font-bold transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {item.title}
                    </span>
                  </span>

                  <span
                    className={`grid transition-all duration-300 ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >

                    <span className="overflow-hidden">

                      <span className="block pl-[30px] pt-1.5 text-[13px] leading-relaxed text-white/70 sm:text-sm">
                        {item.description}
                      </span>

                      <span className="ml-[30px] mt-3 block h-[2px] w-[calc(100%-30px)] overflow-hidden rounded bg-white/20">
                        {isActive && (
                          <span
                            key={activeItem}
                            className="block h-full bg-white animate-progress motion-reduce:animate-none"
                          />
                        )}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative min-h-[320px] min-w-0 lg:min-h-0">

        <div className="absolute inset-0 overflow-hidden rounded-2lg lg:inset-y-2 lg:inset-x-0 xl:inset-x-4">

          {tab.items.map((item, index) => (
            <img
              key={item.title}
              src={item.image}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                index === activeItem
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TabsSection() {

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const button = tabRefs.current[activeTab];
      if (button) {
        setIndicator({ left: button.offsetLeft, width: button.offsetWidth });
      }
    };
    updateIndicator();

    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab]);

  return (

    <section className="bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-screen-2xl">

        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-marketing-foreground-2 sm:text-xs">
          Nos quatre pôles
        </p>
        <h2 className="mt-3 text-center font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
          Une idée peut demander plusieurs expertises.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-marketing-foreground-2 sm:text-base lg:text-[17px]">
          Nos quatre pôles peuvent intervenir séparément ou se combiner autour
          d&apos;une même direction, selon la réalité de votre projet.
        </p>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>

          <div className="mt-10 flex justify-center">

            <div className="max-w-full overflow-x-auto scrollbar-hidden rounded-full">
              <Tabs.List className="relative flex w-max items-center rounded-full bg-marketing-surface-1 p-1.5">

                <div
                  className="absolute top-1.5 bottom-1.5 rounded-full bg-black transition-all duration-300"
                  style={{ left: indicator.left, width: indicator.width }}
                />

                {tabs.map((tab) => (
                  <Tabs.Trigger
                    key={tab.id}
                    value={tab.id}

                    ref={(el) => {
                      tabRefs.current[tab.id] = el;
                    }}

                    className={`relative z-10 whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-300 sm:text-sm ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-marketing-foreground-0 hover:text-marketing-foreground-1"
                    }`}
                  >
                    <span className="lg:hidden">{tab.shortLabel}</span>
                    <span className="hidden lg:inline">{tab.label}</span>
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </div>
          </div>

          {tabs.map((tab) => (
            <Tabs.Content key={tab.id} value={tab.id} className="mt-8 outline-none">
              <TabPanel tab={tab} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
