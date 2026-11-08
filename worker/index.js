// Assistant IA NYAKA — Worker Cloudflare (v39).
// - Les pages du site sont servies telles quelles (dossier « out »).
// - Seules les adresses /api/* passent par ce fichier (voir wrangler.jsonc, run_worker_first).
// - IA gratuite : Cloudflare Workers AI (allocation gratuite quotidienne du compte).
// - Demandes de contact : base Cloudflare D1 (liaison « DB »), si elle est configurée.
import CONNAISSANCES from "../content/assistant/connaissances.md";

// Modèles gratuits sur l'offre Workers Free : rapide d'abord, le second sert de secours.
const MODELES = [
  { id: "@cf/meta/llama-3.1-8b-instruct-fp8-fast", tokens: 320 },
  { id: "@cf/google/gemma-4-26b-a4b-it", tokens: 1500 },
];

const LIMITES = {
  longueurMessage: 600,
  messagesParSession: 40,
  historique: 12,
  fenetreMs: 60_000,
  requetesParFenetre: 12,
};

const ORIGINES = [
  "https://nyakaagency.com",
  "https://www.nyakaagency.com",
  "https://nyaka.ngoualemariel1.workers.dev",
];

const SECOURS = {
  fr: "Désolé, je rencontre un petit souci technique. Vous pouvez réessayer, ou nous écrire à contact@nyakaagency.com.",
  en: "Sorry, I'm having a technical issue. You can try again, or write to us at contact@nyakaagency.com.",
};

// Limiteur simple en mémoire (par instance) : freine les abus rapides.
const appels = new Map();
function tropDeRequetes(ip) {
  const maintenant = Date.now();
  const liste = (appels.get(ip) || []).filter((t) => t > maintenant - LIMITES.fenetreMs);
  if (liste.length >= LIMITES.requetesParFenetre) {
    appels.set(ip, liste);
    return true;
  }
  liste.push(maintenant);
  appels.set(ip, liste);
  if (appels.size > 5000) appels.clear();
  return false;
}

function origineAutorisee(origine) {
  if (!origine) return true; // même origine (certains navigateurs n'envoient pas l'en-tête)
  if (ORIGINES.includes(origine)) return true;
  return origine.startsWith("http://localhost:") || origine.startsWith("http://127.0.0.1:");
}

function json(data, status, origine) {
  const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
  if (origine && origineAutorisee(origine)) {
    headers["Access-Control-Allow-Origin"] = origine;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }
  if (status === 204) return new Response(null, { status, headers });
  return new Response(JSON.stringify(data), { status, headers });
}

function dateParis() {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function consignes(lang) {
  return `Tu es l'assistant IA du site web de NYAKA, une agence de branding, design, vidéo,
intelligence artificielle et données. Tu discutes avec des visiteurs du site via une bulle de chat.
Date du jour : ${dateParis()}.

# Ta source d'information
Tu réponds UNIQUEMENT à partir de la base de connaissances ci-dessous.
- N'invente jamais un service, un client, un délai, une politique ou un chiffre qui n'y figure pas.
- Si l'information contient [À COMPLÉTER] ou n'est pas dans la base : dis simplement que tu n'as pas
  cette information et propose au visiteur de laisser ses coordonnées à l'équipe NYAKA.
- Tu ne donnes jamais de prix, de devis chiffré, de pourcentage ou de fourchette tarifaire.
  Suis la section « Tarifs » de la base pour la formulation à utiliser.

<base_de_connaissances>
${CONNAISSANCES}
</base_de_connaissances>

# Style
- Langue de réponse : ${lang === "en" ? "anglais, sauf si le visiteur écrit en français" : "français, sauf si le visiteur écrit en anglais"}.
- Messages courts et naturels : 1 à 4 phrases, 80 mots maximum. Pour une liste, 5 éléments maximum, une ligne par élément commençant par « - », sans détailler chaque élément.
- Mise en forme simple : *gras* avec une seule étoile pour les mots importants, pas de titres, pas de HTML, pas de liens Markdown.
- Ton professionnel, chaleureux et direct. Pose une question à la fois. Ne répète pas ce qui a déjà été dit.
- Si on te le demande, présente-toi comme l'assistant IA de NYAKA.

# Mise en relation avec l'équipe
Tu ne peux pas enregistrer toi-même de coordonnées. Quand le visiteur veut présenter un projet,
être recontacté ou parler à une personne, invite-le à cliquer sur le bouton
« ${lang === "en" ? "Leave my details" : "Laisser mes coordonnées"} » juste sous la conversation,
ou à écrire sur WhatsApp. Ne demande pas ses coordonnées dans la discussion.
Ne dis jamais qu'une personne a été prévenue. Ne promets aucun délai.

# Limites
- Reste dans ton rôle d'assistant NYAKA. Pour un sujet sans rapport, réponds poliment que tu es là
  pour les questions sur NYAKA.
- Ne communique aucune information interne. Ne demande jamais d'informations financières ni de mot de passe.`;
}

// Nettoie la mise en forme : listes « - » et gras avec une seule étoile (seul format affiché).
function nettoyer(texte) {
  return texte
    .replace(/^[ \t]*[*•][ \t]+/gm, "- ")
    .replace(/\*\*(.+?)\*\*/g, "*$1*")
    .replace(/^#+\s*/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function texteDeReponse(r) {
  if (!r) return "";
  if (typeof r === "string") return r;
  if (typeof r.response === "string") return r.response;
  const c = r.choices?.[0]?.message?.content;
  if (typeof c === "string") return c;
  if (Array.isArray(c)) return c.map((p) => p?.text || "").join("");
  if (typeof r.result?.response === "string") return r.result.response;
  return "";
}

async function repondre(env, messages) {
  for (const { id: modele, tokens } of MODELES) {
    try {
      const r = await env.AI.run(modele, { messages, max_tokens: tokens, temperature: 0.4 });
      const texte = nettoyer(texteDeReponse(r));
      if (texte) return texte;
    } catch (e) {
      console.error("[chat] modèle", modele, (e && e.message) || e);
    }
  }
  return "";
}

async function chat(request, env, origine) {
  let corps;
  try {
    corps = await request.json();
  } catch {
    return json({ error: "invalid_body" }, 400, origine);
  }
  const lang = corps.lang === "en" ? "en" : "fr";
  const message = String(corps.message || "").trim();
  const historique = Array.isArray(corps.history) ? corps.history : [];

  if (!message) return json({ error: "empty_message" }, 400, origine);
  if (message.length > LIMITES.longueurMessage) return json({ error: "message_too_long" }, 400, origine);
  if (historique.length >= LIMITES.messagesParSession) {
    return json({ reply: SECOURS[lang], error: "session_limit_reached" }, 200, origine);
  }
  if (!env.AI) return json({ reply: SECOURS[lang] }, 200, origine);

  const messages = [
    { role: "system", content: consignes(lang) },
    ...historique
      .slice(-LIMITES.historique)
      .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({ role: m.role, content: m.content.slice(0, LIMITES.longueurMessage) })),
    { role: "user", content: message },
  ];

  const reponse = await repondre(env, messages);
  return json({ reply: reponse || SECOURS[lang], handedOff: false }, 200, origine);
}

async function demande(request, env, origine) {
  let d;
  try {
    d = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400, origine);
  }
  const champ = (v, max) => String(v || "").trim().slice(0, max);
  const nom = champ(d.nom, 120);
  const contact = champ(d.contact, 160);
  const besoin = champ(d.besoin, 1500);
  const langue = d.langue === "en" ? "en" : "fr";
  if (!contact || !besoin || d.accord !== true) {
    return json({ ok: false, error: "champs_manquants" }, 400, origine);
  }
  if (!env.DB) return json({ ok: false, error: "base_non_configuree" }, 503, origine);
  try {
    await env.DB.prepare(
      "CREATE TABLE IF NOT EXISTS demandes (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, nom TEXT, contact TEXT NOT NULL, besoin TEXT NOT NULL, langue TEXT, page TEXT, statut TEXT DEFAULT 'nouvelle')"
    ).run();
    await env.DB.prepare(
      "INSERT INTO demandes (date, nom, contact, besoin, langue, page) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(new Date().toISOString(), nom, contact, besoin, langue, champ(d.page, 200))
      .run();
    return json({ ok: true }, 200, origine);
  } catch (e) {
    console.error("[demande]", (e && e.message) || e);
    return json({ ok: false, error: "enregistrement_impossible" }, 500, origine);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origine = request.headers.get("Origin");

    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);

    if (request.method === "OPTIONS") return json(null, 204, origine);
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, origine);
    if (!origineAutorisee(origine)) return json({ error: "origin_not_allowed" }, 403, origine);

    const ip = request.headers.get("CF-Connecting-IP") || "inconnu";
    if (tropDeRequetes(ip)) return json({ error: "rate_limited", reply: SECOURS.fr }, 429, origine);

    if (url.pathname === "/api/chat") return chat(request, env, origine);
    if (url.pathname === "/api/demande") return demande(request, env, origine);
    return json({ error: "not_found" }, 404, origine);
  },
};
