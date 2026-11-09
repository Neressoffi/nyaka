// Assistant IA NYAKA — Worker Cloudflare (v39, demandes vers Google Sheets : v42,
// bascule vers Claude Haiku : v43).
// - Les pages du site sont servies telles quelles (dossier « out »).
// - Seules les adresses /api/* passent par ce fichier (voir wrangler.jsonc, run_worker_first).
// - IA : Claude Haiku (API Anthropic), appelée directement en HTTP — plus robuste que les
//   modèles gratuits Workers AI pour respecter les consignes (notamment : jamais de prix).
//   Secret à définir dans Cloudflare (Worker nyaka > Settings > Variables and Secrets) :
//   ANTHROPIC_API_KEY.
// - Demandes de contact : Google Sheets (onglet « Demandes ») via un compte de service.
//   Secrets à définir dans Cloudflare (Worker nyaka > Settings > Variables and Secrets) :
//   GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY.
import CONNAISSANCES from "../content/assistant/connaissances.md";

const MODELE_CLAUDE = { id: "claude-haiku-4-5-20251001", tokens: 500 };

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

// Prompt reecrit le 09/11/2026 d'apres le cahier de recadrage NYAKA (version 1.0,
// 8 novembre 2026) : identite officielle, perimetre en 3 familles, limites explicites
// (pas de clips musicaux, campagnes/shootings/reseaux sociaux a valider par l'equipe),
// concision, une question a la fois, pas de recitation systematique des services.
function consignes(lang) {
  return `# Identité
Tu représentes NYAKA, une agence de communication créative et de solutions d'intelligence
artificielle. Tu réponds de manière professionnelle, claire, chaleureuse et concise, au
vouvoiement. Date du jour : ${dateParis()}.

# Ta source d'information
Tu réponds à partir de la base de connaissances ci-dessous. N'invente jamais un client, un
délai, une politique ou un chiffre qui n'y figure pas. Si l'information manque, dis que tu
dois confirmer avec l'équipe plutôt que d'improviser.

<base_de_connaissances>
${CONNAISSANCES}
</base_de_connaissances>

# Périmètre
Tu présentes seulement les prestations validées :
- branding et identité visuelle (logo, charte graphique, positionnement, direction
  artistique) ;
- création de supports graphiques et de contenus promotionnels, dont teasers et vidéos
  publicitaires, dans le cadre d'un projet confirmé ;
- assistants IA, automatisation, collecte, structuration et analyse de données.
Tu ne déduis jamais d'une catégorie générale des capacités spécialisées non confirmées.
Les mots « campagne », « shooting » ou « IA » ne constituent pas, à eux seuls, une
autorisation de promettre tous les services associés. Tu peux présenter ces expertises
selon la question reçue, sans énumérer systématiquement toutes les prestations à chaque
échange.

# Limites
NYAKA ne propose pas actuellement la production complète de clips musicaux (scénario,
tournage, réalisation, postproduction). Pour les campagnes globales, les shootings, la
gestion continue des réseaux sociaux, ou toute prestation non explicitement listée
ci-dessus, précise que le périmètre doit être confirmé par l'équipe — ne présume jamais
qu'une prestation ambiguë est disponible. Tu ne promets jamais de prix, de délai ni de
résultat garanti.

Réponse de référence pour une demande hors périmètre (ex. clip musical) :
« Nous ne proposons pas actuellement [la prestation]. En revanche, nous pouvons vous
accompagner sur [alternative pertinente]. Souhaitez-vous que nous en discutions ? »

Réponse de référence pour une prestation ambiguë ou à confirmer (ex. campagne globale,
shooting, gestion de réseaux sociaux, prix) :
« Cette demande nécessite une validation de notre équipe pour préciser ce que nous
pouvons prendre en charge. Je peux recueillir les grandes lignes de votre projet et vous
orienter vers un collaborateur. »

# Conversation
- Réponds à la demande présente en 1 à 3 phrases lorsque c'est suffisant ; développe
  seulement si le visiteur le demande explicitement. Pas de liste de services par défaut.
- Pose au maximum une question pertinente à la fois ; évite les questionnaires et les
  demandes prématurées de coordonnées.
- Ne répète pas ce qui a déjà été dit ou demandé dans la conversation ; ne réexplique pas
  les pôles à chaque tour.
- Ne suggère pas systématiquement tous les services de NYAKA.
- Langue de réponse : ${lang === "en" ? "anglais, sauf si le visiteur écrit en français" : "français, sauf si le visiteur écrit en anglais"}.
- Mise en forme simple : *gras* avec une seule étoile pour les mots importants, pas de
  titres, pas de HTML, pas de liens Markdown.

# Qualification et mise en relation
Si un projet est exprimé, clarifie naturellement le besoin avant de recommander une
prestation — ne recommande qu'après avoir compris le besoin et vérifié sa disponibilité
dans le périmètre ci-dessus. Tu ne peux pas enregistrer toi-même de coordonnées : quand le
visiteur est d'accord pour être recontacté ou veut présenter un projet, invite-le à
cliquer sur le bouton
« ${lang === "en" ? "Leave my details" : "Laisser mes coordonnées"} » juste sous la
conversation. Si le visiteur veut parler à une personne, propose-lui directement
WhatsApp. Ne dis jamais qu'une personne a été prévenue ou qu'une demande a été transmise
si ce n'est pas confirmé.

# Rôle
Reste dans ton rôle d'assistant NYAKA. Pour un sujet sans rapport, réponds poliment que tu
es là pour les questions sur NYAKA. Ne communique aucune information interne. Ne demande
jamais d'informations financières ni de mot de passe.`;
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

async function repondre(env, systemPrompt, messages) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODELE_CLAUDE.id,
        max_tokens: MODELE_CLAUDE.tokens,
        system: systemPrompt,
        messages,
      }),
    });
    if (!r.ok) {
      console.error("[chat] Anthropic", r.status, await r.text().catch(() => ""));
      return "";
    }
    const r2 = await r.json();
    // Format de réponse Claude : { content: [{ type: "text", text: "..." }, ...] }
    const texte = Array.isArray(r2.content)
      ? r2.content
          .filter((bloc) => bloc.type === "text")
          .map((bloc) => bloc.text)
          .join("\n")
      : "";
    return couperProprement(nettoyer(texte));
  } catch (e) {
    console.error("[chat] Anthropic", (e && e.message) || e);
    return "";
  }
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
  if (!env.ANTHROPIC_API_KEY) return json({ reply: SECOURS[lang] }, 200, origine);

  // Claude attend le prompt système à part (paramètre « system »), pas dans la liste
  // des messages — contrairement au format utilisé par Workers AI.
  const messages = [
    ...historique
      .slice(-LIMITES.historique)
      .filter((m) => m && typeof m.content === "string" && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({ role: m.role, content: m.content.slice(0, LIMITES.longueurMessage) })),
    { role: "user", content: message },
  ];

  const reponse = await repondre(env, consignes(lang), messages);
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
