"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import * as Popover from "@radix-ui/react-popover";

import {
  ArrowRight,
  Book,
  Box,
  ChevronDown,
  GraduationCap,
  HelpCircle,
  Image as ImageIcon,
  Menu,
  Music,
  Newspaper,
  Palette,
  Search,
  Sparkles,
  Users,
  Video,
  Wrench,
  X,
} from "lucide-react";

import {
  creativeSuiteColumns,
  stockColumns,
  type MenuColumn,
} from "@/lib/menu-data";
import { SiteSearch } from "@/components/SiteSearch";
import { ANNOUNCEMENT } from "@/components/TopBanner";
import { NyakaLogo } from "@/components/NyakaLogo";

const ICONS: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  box: Box,
  palette: Palette,
  wrench: Wrench,
  newspaper: Newspaper,
  graduation: GraduationCap,
  book: Book,
  users: Users,
  help: HelpCircle,
  sparkles: Sparkles,
};

function NavTrigger({
  label,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <Popover.Trigger asChild>
      <span
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group flex cursor-pointer items-center gap-1 text-2xl leading-none"
      >
        {label}
        <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </span>
    </Popover.Trigger>
  );
}

function ColumnsMenu({
  columns,
  footerLabel = "Voir toutes nos solutions",
  footerHref = "/solutions",
}: {
  columns: MenuColumn[];
  footerLabel?: string;
  footerHref?: string;
}) {
  return (
    <div>
      <div
        className="grid gap-8"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((column) => {
          const Icon = ICONS[column.icon];
          return (
            <div key={column.title}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-foreground-0" />
                <span className="text-sm font-bold text-foreground-0">
                  {column.title}
                </span>
              </div>

              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 rounded px-2 py-1.5 -mx-2 text-xs text-foreground-2 transition-colors duration-100 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <Link
        href={footerHref}
        className="group mt-8 flex items-center justify-between rounded-lg bg-neutral-875 px-5 py-3.5 text-sm text-foreground-2 transition-colors hover:text-foreground-0"
      >
        {footerLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}



function MegaMenu({
  label,
  width,
  open,
  onShow,
  onHide,
  children,
}: {
  label: string;
  width: number;
  open: boolean;
  onShow: (label: string) => void;
  onHide: () => void;
  children: React.ReactNode;
}) {
  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => (next ? onShow(label) : onHide())}
    >

      <NavTrigger
        label={label}
        onMouseEnter={() => onShow(label)}
        onMouseLeave={onHide}
      />
      <Popover.Portal>

        <Popover.Content
          sideOffset={16}
          align="start"
          style={{ width }}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onMouseEnter={() => onShow(label)}
          onMouseLeave={onHide}

          className="z-50 max-w-[95vw] rounded-[10px] bg-surface-1 px-10 py-8 shadow-2xl outline-none data-[state=open]:animate-in"
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function Header() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  // Petit délai pour laisser le temps d'aller de l'intitulé vers le panneau.
  const hideMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (!isShortcut) return;
      event.preventDefault();
      setSearchOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
    <SiteSearch open={searchOpen} onOpenChange={setSearchOpen} />

    <header
      className={`absolute inset-x-0 z-40 ${ANNOUNCEMENT ? "top-9" : "top-0"}`}
    >

      <div className="mx-auto flex h-[72px] max-w-screen-2xl items-center justify-between px-4 lg:px-8">

        <div className="flex items-center gap-8">

          <button
            className="text-foreground-0 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Ouvrir le menu"
          >

            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <NyakaLogo />

          <nav className="hidden items-center gap-6 lg:flex">

            <MegaMenu
              label="Solutions"
              width={980}
              open={openMenu === "Solutions"}
              onShow={showMenu}
              onHide={hideMenu}
            >
              <ColumnsMenu columns={creativeSuiteColumns} />
            </MegaMenu>
            <MegaMenu
              label="Votre situation"
              width={720}
              open={openMenu === "Votre situation"}
              onShow={showMenu}
              onHide={hideMenu}
            >
              <ColumnsMenu
                columns={stockColumns}
                footerLabel="Voir toutes les situations"
                footerHref="/votre-situation"
              />
            </MegaMenu>
            <Link
              href="/realisations"
              className="hidden text-2xl leading-none xl:block"
            >
              Réalisations
            </Link>

            <Link
              href="/a-propos"
              className="text-2xl leading-none"
            >
              À propos
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-2xl leading-none text-foreground-2 transition-colors hover:border-white/30 hover:text-foreground-0 md:flex"
          >
            <Search className="h-5 w-5" />
            Rechercher
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-2 text-foreground-1 md:hidden"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/notre-approche"
            className="hidden rounded-lg px-4 py-2 text-2xl font-medium leading-none text-foreground-1 transition-colors hover:bg-white/10 sm:block"
          >
            Notre approche
          </Link>

          <Link
            href="/demarrer-un-projet"
            className="rounded-lg bg-white px-4 py-2 text-2xl font-medium leading-none text-black transition-opacity hover:opacity-90"
          >
            Démarrer un projet
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mx-4 mt-2 flex flex-col gap-1 rounded-2lg bg-surface-1 p-4 lg:hidden">
          {[
            { label: "Solutions", href: "/solutions" },
            { label: "Votre situation", href: "/votre-situation" },
            { label: "Notre approche", href: "/notre-approche" },
            { label: "Ressources", href: "#" },
            { label: "Réalisations", href: "/realisations" },
            { label: "À propos", href: "/a-propos" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-base text-foreground-1 transition-colors hover:bg-white/5 hover:text-accent"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
    </>
  );
}
