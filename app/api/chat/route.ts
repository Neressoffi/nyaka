import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { config } from "@/lib/assistant/config";
import { isRateLimited } from "@/lib/assistant/rate-limit";
import { loadKnowledge, buildSystemPrompt, TOOLS } from "@/lib/assistant/prompt";
import { appendLead } from "@/lib/assistant/sheets";

export const runtime = "nodejs";

const FALLBACK_MESSAGE: Record<"fr" | "en", string> = {
  fr: "Désolé, je rencontre un petit souci technique. Vous pouvez réessayer, ou nous écrire directement.",
  en: "Sorry, I'm having a technical issue. You can try again, or reach out to us directly.",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

function corsHeaders(origin: string | null) {
  const allowed = isAllowedOrigin(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin! : config.allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (origin === config.allowedOrigin) return true;
  if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) return true;
  return false;
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: "origin_not_allowed" }, { status: 403, headers });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers });
  }

  if (!config.claude.apiKey) {
    console.error("[chat] ANTHROPIC_API_KEY manquante.");
    return NextResponse.json({ reply: FALLBACK_MESSAGE.fr, handedOff: false }, { status: 200, headers });
  }

  let body: { sessionId?: string; message?: string; history?: ChatMessage[]; lang?: "fr" | "en" };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400, headers });
  }

  const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";
  const message = (body.message || "").trim();
  const history = Array.isArray(body.history) ? body.history : [];

  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400, headers });
  }
  if (message.length > config.limits.maxMessageLength) {
    return NextResponse.json({ error: "message_too_long" }, { status: 400, headers });
  }
  if (history.length >= config.limits.maxMessagesPerSession) {
    return NextResponse.json(
      { reply: FALLBACK_MESSAGE[lang], error: "session_limit_reached" },
      { status: 200, headers }
    );
  }

  // On ne garde que les derniers messages pour limiter le coût ; le client est seul
  // responsable de conserver l'historique complet côté navigateur (sessionStorage).
  const trimmedHistory = history
    .slice(-config.limits.maxHistoryMessages)
    .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({ role: m.role, content: m.content.slice(0, config.limits.maxMessageLength) }));

  const anthropicMessages: Anthropic.MessageParam[] = [
    ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];

  const client = new Anthropic({ apiKey: config.claude.apiKey });
  const system = buildSystemPrompt(loadKnowledge());

  let handedOff = false;

  try {
    for (let step = 0; step < 3; step++) {
      const response = await client.messages.create({
        model: config.claude.model,
        max_tokens: config.claude.maxTokens,
        system,
        tools: TOOLS,
        messages: anthropicMessages,
      });

      anthropicMessages.push({ role: "assistant", content: response.content });

      if (response.stop_reason !== "tool_use") {
        const reply = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        return NextResponse.json({ reply: reply || FALLBACK_MESSAGE[lang], handedOff }, { status: 200, headers });
      }

      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        if (block.name === "transferer_a_humain") {
          const input = block.input as {
            motif: string;
            langue: string;
            nom?: string;
            structure_projet?: string;
            besoin: string;
            contact?: string;
            accord_contact: boolean;
          };
          const saved = await appendLead(input);
          handedOff = saved;
          results.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: saved
              ? "Demande enregistrée avec succès. Termine la conversation avec un message de remerciement, sans dire qu'une personne a été notifiée."
              : "L'enregistrement a échoué. Informe le visiteur que tu n'as pas pu finaliser l'enregistrement et propose de réessayer ou d'écrire directement à contact@nyakaagency.com.",
          });
        } else {
          results.push({ type: "tool_result", tool_use_id: block.id, content: "Outil inconnu." });
        }
      }
      anthropicMessages.push({ role: "user", content: results });
    }

    return NextResponse.json({ reply: FALLBACK_MESSAGE[lang], handedOff }, { status: 200, headers });
  } catch (err) {
    console.error("[chat] Erreur Anthropic :", (err as Error).message);
    return NextResponse.json({ reply: FALLBACK_MESSAGE[lang], handedOff: false }, { status: 200, headers });
  }
}
