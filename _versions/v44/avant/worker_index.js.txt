// Assistant IA NYAKA — Worker Cloudflare (v39, demandes vers Google Sheets : v42).
// - Les pages du site sont servies telles quelles (dossier « out »).
// - Seules les adresses /api/* passent par ce fichier (voir wrangler.jsonc, run_worker_first).
// - IA gratuite : Cloudflare Workers AI (allocation gratuite quotidienne du compte).
// - Demandes de contact : Google Sheets (onglet « Demandes ») via un compte de service.
//   Secrets à définir dans Cloudflare (Worker nyaka > Settings > Variables and Secrets) :
//   GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY.
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

// Si la réponse a été coupée en plein milieu (limite de longueur), on s'arrête
// à la dernière ligne ou phrase complète.
function couperProprement(texte) {
  if (/[.!?…»)]$/.test(texte)) return texte;
  const fin = Math.max(texte.lastIndexOf("\n"), texte.lastIndexOf(". "), texte.lastIndexOf("? "));
  return fin > 40 ? texte.slice(0, fin + 1).trim() : texte;
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
      const texte = couperProprement(nettoyer(texteDeReponse(r)));
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

// ---------- Google Sheets (compte de service, signature RS256 via WebCrypto) ----------
let jetonEnCache = null;

function base64url(octets) {
  let s = "";
  const b = new Uint8Array(octets);
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function jetonGoogle(env) {
  const maintenant = Math.floor(Date.now() / 1000);
  if (jetonEnCache && jetonEnCache.expire > maintenant + 60) return jetonEnCache.valeur;

  const pem = String(env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, "\n");
  const corpsCle = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(corpsCle), (c) => c.charCodeAt(0));
  const cle = await crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const enc = new TextEncoder();
  const entete = base64url(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const contenu = base64url(
    enc.encode(
      JSON.stringify({
        iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: "https://oauth2.googleapis.com/token",
        iat: maintenant,
        exp: maintenant + 3600,
      })
    )
  );
  const signature = base64url(
    await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cle, enc.encode(`${entete}.${contenu}`))
  );
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${entete}.${contenu}.${signature}`,
  });
  if (!r.ok) throw new Error(`jeton Google refusé (${r.status})`);
  const j = await r.json();
  jetonEnCache = { valeur: j.access_token, expire: maintenant + (j.expires_in || 3600) };
  return j.access_token;
}

async function ajouterLigneSheets(env, ligne) {
  const jeton = await jetonGoogle(env);
  const plage = encodeURIComponent("Demandes!A:I");
  const r = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEET_ID}/values/${plage}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${jeton}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [ligne] }),
    }
  );
  if (!r.ok) throw new Error(`Google Sheets a refusé l'ajout (${r.status})`);
}

async function demande(request, env, origine) {
  let d;
  try {
    d = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400, origine);
  }
  // Une formule ne doit jamais être interprétée par le tableur.
  const champ = (v, max) => String(v || "").trim().slice(0, max).replace(/^[=+\-@]/, "'$&");
  const nom = champ(d.nom, 120);
  const contact = champ(d.contact, 160);
  const besoin = champ(d.besoin, 1500);
  const langue = d.langue === "en" ? "en" : "fr";
  if (!contact || !besoin || d.accord !== true) {
    return json({ ok: false, error: "champs_manquants" }, 400, origine);
  }
  if (!env.GOOGLE_SHEET_ID || !env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_PRIVATE_KEY) {
    console.warn("[demande] Google Sheets non configuré : demande non enregistrée.");
    return json({ ok: false, error: "sheets_non_configure" }, 503, origine);
  }
  try {
    // Mêmes colonnes que le tableur prévu : date, source, langue, motif, nom,
    // structure / projet, besoin, contact, accord.
    await ajouterLigneSheets(env, [
      new Date().toISOString(),
      `site web ${champ(d.page, 200)}`.trim(),
      langue,
      "projet",
      nom,
      "",
      besoin,
      contact,
      "oui",
    ]);
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
