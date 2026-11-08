"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { STRINGS, detectDefaultLang, type Lang } from "@/lib/assistant/i18n";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SESSION_ID_KEY = "nyaka_chat_session_id";
const HISTORY_KEY = "nyaka_chat_history";
const LANG_KEY = "nyaka_chat_lang";
// Numéro WhatsApp de NYAKA (même que le pied de page). Modifiable via la variable
// NEXT_PUBLIC_WHATSAPP_NUMBER (publique : ce n'est qu'un numéro de téléphone).
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "79152135853";

function readSessionStorage<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeSessionStorage(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // sessionStorage indisponible (navigation privée stricte, etc.) : on continue sans persister.
  }
}

// Rendu texte sécurisé : découpe sur *gras* sans jamais injecter de HTML (pas de
// dangerouslySetInnerHTML). Tout le reste est rendu comme texte brut, échappé par React.
function renderFormatted(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 1) {
      return <strong key={i}>{part.slice(1, -1)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [handedOff, setHandedOff] = useState(false);
  const [sessionLimitReached, setSessionLimitReached] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState({ nom: "", contact: "", besoin: "", accord: false });
  const [leadSending, setLeadSending] = useState(false);
  const [leadError, setLeadError] = useState(false);
  const sessionIdRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = STRINGS[lang];

  useEffect(() => {
    sessionIdRef.current =
      readSessionStorage<string>(SESSION_ID_KEY) ||
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    writeSessionStorage(SESSION_ID_KEY, sessionIdRef.current);

    setLang(readSessionStorage<Lang>(LANG_KEY) || detectDefaultLang());
    setMessages(readSessionStorage<ChatMessage[]>(HISTORY_KEY) || []);
  }, []);

  useEffect(() => {
    writeSessionStorage(LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    if (messages.length > 0) writeSessionStorage(HISTORY_KEY, messages);
  }, [messages]);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const whatsappHref = useMemo(() => `https://wa.me/${WHATSAPP_NUMBER}`, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading || sessionLimitReached) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: text,
          history: messages,
          lang,
        }),
      });
      const data = await res.json();

      if (data.error === "session_limit_reached") {
        setSessionLimitReached(true);
      }
      if (data.handedOff) setHandedOff(true);

      setMessages([...nextMessages, { role: "assistant", content: data.reply || t.errorGeneric }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: t.errorGeneric }]);
    } finally {
      setLoading(false);
    }
  }

  function openLead() {
    const dernier = [...messages].reverse().find((m) => m.role === "user");
    setLead((l) => ({ ...l, besoin: l.besoin || dernier?.content || "" }));
    setLeadError(false);
    setLeadOpen(true);
  }

  async function sendLead(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.contact.trim() || !lead.besoin.trim() || !lead.accord || leadSending) return;
    setLeadSending(true);
    setLeadError(false);
    try {
      const res = await fetch("/api/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, langue: lang, page: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setHandedOff(true);
        setLeadOpen(false);
      } else {
        setLeadError(true);
      }
    } catch {
      setLeadError(true);
    } finally {
      setLeadSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.close : t.bubbleLabel}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#D8A53A] text-[#161616] shadow-lg shadow-black/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <MessageCircle className="h-6 w-6" aria-hidden />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
          className="fixed bottom-24 right-5 z-[60] flex h-[min(600px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2lg border border-white/10 bg-surface-1 shadow-2xl sm:bottom-28 sm:right-6"
        >
          <header className="flex items-center justify-between gap-3 border-b-2 border-[#D8A53A] bg-[#161616] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">{t.title}</p>
              <p className="text-xs text-[#D8A53A]">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="rounded-full border border-[#D8A53A]/50 px-2.5 py-1 text-xs text-[#D8A53A] transition-colors hover:bg-[#D8A53A] hover:text-[#161616]"
              >
                {t.langToggle}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="rounded-full p-1 text-foreground-3 transition-colors hover:text-foreground-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="rounded-2lg bg-surface-2 px-3 py-2.5 text-sm leading-relaxed text-foreground-1">
              <p>{t.welcome}</p>
              <p className="mt-2 text-xs text-foreground-3">
                {t.aiNotice}{" "}
                <Link href="/politique-de-confidentialite" className="underline hover:text-foreground-1">
                  {t.privacyLink}
                </Link>
              </p>
            </div>

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2lg px-3 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-[#D8A53A] text-[#161616]" : "bg-surface-2 text-foreground-1"
                  }`}
                >
                  {renderFormatted(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-foreground-3">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#D8A53A]" aria-hidden />
                {t.typing}
              </div>
            )}

            {sessionLimitReached && (
              <p className="rounded-2lg bg-surface-2 px-3 py-2.5 text-xs text-foreground-2">{t.sessionLimitReached}</p>
            )}

            {handedOff && (
              <p className="rounded-2lg bg-surface-2 px-3 py-2.5 text-xs text-foreground-2">{t.handedOffNotice}</p>
            )}
          </div>

          {leadOpen && !handedOff && (
            <form onSubmit={sendLead} className="space-y-2 border-t border-white/10 bg-[#161616] px-4 py-3">
              <p className="text-xs font-semibold text-[#D8A53A]">{t.leadTitle}</p>
              <input
                type="text"
                value={lead.nom}
                onChange={(e) => setLead({ ...lead, nom: e.target.value.slice(0, 120) })}
                placeholder={t.leadName}
                aria-label={t.leadName}
                className="w-full rounded-lg bg-surface-2 px-3 py-2 text-sm text-foreground-0 placeholder:text-foreground-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8A53A]"
              />
              <input
                type="text"
                required
                value={lead.contact}
                onChange={(e) => setLead({ ...lead, contact: e.target.value.slice(0, 160) })}
                placeholder={t.leadContact}
                aria-label={t.leadContact}
                className="w-full rounded-lg bg-surface-2 px-3 py-2 text-sm text-foreground-0 placeholder:text-foreground-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8A53A]"
              />
              <textarea
                required
                rows={2}
                value={lead.besoin}
                onChange={(e) => setLead({ ...lead, besoin: e.target.value.slice(0, 1500) })}
                placeholder={t.leadNeed}
                aria-label={t.leadNeed}
                className="w-full resize-none rounded-lg bg-surface-2 px-3 py-2 text-sm text-foreground-0 placeholder:text-foreground-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8A53A]"
              />
              <label className="flex items-start gap-2 text-xs text-foreground-2">
                <input
                  type="checkbox"
                  required
                  checked={lead.accord}
                  onChange={(e) => setLead({ ...lead, accord: e.target.checked })}
                  className="mt-0.5 accent-[#D8A53A]"
                />
                <span>{t.leadConsent}</span>
              </label>
              {leadError && <p className="text-xs text-red-300">{t.leadError}</p>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={leadSending || !lead.contact.trim() || !lead.besoin.trim() || !lead.accord}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#D8A53A] px-3 py-2 text-xs font-semibold text-[#161616] transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  {leadSending && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
                  {t.leadSubmit}
                </button>
                <button
                  type="button"
                  onClick={() => setLeadOpen(false)}
                  className="rounded-lg border border-white/15 px-3 py-2 text-xs text-foreground-2 transition-colors hover:text-foreground-0"
                >
                  {t.leadCancel}
                </button>
              </div>
            </form>
          )}

          <div className="border-t border-white/10 px-4 py-2">
            {!handedOff && !leadOpen && (
              <button
                type="button"
                onClick={openLead}
                className="mb-2 w-full rounded-lg bg-[#D8A53A] px-2 py-2 text-center text-xs font-semibold text-[#161616] transition-opacity hover:opacity-90"
              >
                {t.leadCta}
              </button>
            )}
            <div className="flex gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-[#D8A53A]/40 px-2 py-1.5 text-center text-xs text-foreground-2 transition-colors hover:border-[#D8A53A] hover:text-foreground-0"
              >
                {t.whatsappCta}
              </a>
              <Link
                href="/demarrer-un-projet"
                className="flex-1 rounded-lg border border-[#D8A53A]/40 px-2 py-1.5 text-center text-xs text-foreground-2 transition-colors hover:border-[#D8A53A] hover:text-foreground-0"
              >
                {t.contactCta}
              </Link>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 600))}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              disabled={sessionLimitReached}
              className="flex-1 rounded-full bg-surface-2 px-4 py-2 text-sm text-foreground-0 placeholder:text-foreground-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8A53A] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || sessionLimitReached}
              aria-label={t.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D8A53A] text-[#161616] transition-opacity hover:opacity-90 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
