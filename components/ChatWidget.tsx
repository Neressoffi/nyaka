"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { STRINGS, detectDefaultLang, type Lang } from "@/lib/assistant/i18n";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SESSION_ID_KEY = "nyaka_chat_session_id";
const HISTORY_KEY = "nyaka_chat_history";
const LANG_KEY = "nyaka_chat_lang";
// Numéro fictif en attendant le numéro WhatsApp définitif de NYAKA.
// Modifiable via la variable d'environnement NEXT_PUBLIC_WHATSAPP_NUMBER (publique,
// visible côté navigateur — ce n'est qu'un numéro de téléphone, pas un secret).
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "000000000000";

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.close : t.bubbleLabel}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 sm:bottom-6 sm:right-6"
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
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-surface-2 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground-0">{t.title}</p>
              <p className="text-xs text-foreground-3">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-foreground-2 transition-colors hover:text-foreground-0"
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
                    m.role === "user" ? "bg-accent text-white" : "bg-surface-2 text-foreground-1"
                  }`}
                >
                  {renderFormatted(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-foreground-3">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
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

          <div className="border-t border-white/10 px-4 py-2">
            <div className="flex gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-white/15 px-2 py-1.5 text-center text-xs text-foreground-2 transition-colors hover:text-foreground-0"
              >
                {t.whatsappCta}
              </a>
              <Link
                href="/demarrer-un-projet"
                className="flex-1 rounded-lg border border-white/15 px-2 py-1.5 text-center text-xs text-foreground-2 transition-colors hover:text-foreground-0"
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
              className="flex-1 rounded-full bg-surface-2 px-4 py-2 text-sm text-foreground-0 placeholder:text-foreground-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || sessionLimitReached}
              aria-label={t.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-90 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
