"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { searchSite, type SearchItem } from "@/lib/search-data";

type SiteSearchProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = query.trim() ? searchSite(query) : [];

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setActiveIndex(0);
  }, [onOpenChange]);

  const goTo = useCallback(
    (item: SearchItem) => {
      close();
      router.push(item.href);
    },
    [close, router]
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0 ? 0 : (current + 1) % results.length
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          results.length === 0
            ? 0
            : (current - 1 + results.length) % results.length
        );
        return;
      }

      if (event.key === "Enter" && results[activeIndex]) {
        event.preventDefault();
        goTo(results[activeIndex]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, results, activeIndex, goTo]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Rechercher sur le site"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-surface-1 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-foreground-3" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une page, un pôle, un projet…"
            className="min-w-0 flex-1 bg-transparent text-base text-foreground-0 outline-none placeholder:text-foreground-3"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-activedescendant={
              results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined
            }
          />
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-foreground-3 transition-colors hover:bg-white/5 hover:text-foreground-0"
            aria-label="Fermer la recherche"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {!query.trim() && (
            <p className="px-3 py-6 text-sm text-foreground-3">
              Essayez « branding », « KAWA », « vous lancez » ou « IA ».
            </p>
          )}

          {query.trim() && results.length === 0 && (
            <p className="px-3 py-6 text-sm text-foreground-3">
              Aucun résultat pour « {query.trim()} ».
            </p>
          )}

          {results.length > 0 && (
            <ul id={listId} role="listbox" className="flex flex-col gap-1">
              {results.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={item.id} role="option" aria-selected={isActive}>
                    <button
                      id={`${listId}-${item.id}`}
                      type="button"
                      onClick={() => goTo(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                        isActive ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                          {item.category}
                        </span>
                        <span className="mt-1 block text-sm font-medium text-foreground-0">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-foreground-3 line-clamp-2">
                          {item.description}
                        </span>
                      </span>
                      <ArrowRight
                        className={`mt-1 h-4 w-4 shrink-0 transition-opacity ${
                          isActive ? "opacity-100 text-foreground-0" : "opacity-0"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-[11px] text-foreground-3">
          <span>↑↓ naviguer · Entrée ouvrir · Esc fermer</span>
          <span>Ctrl / ⌘ K</span>
        </div>
      </div>
    </div>
  );
}
