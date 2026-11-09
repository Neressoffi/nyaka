export const config = {
  claude: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: process.env.CLAUDE_MODEL || "claude-haiku-4-5-20251001",
    maxTokens: 500,
  },

  // Autorise des appels à /api/chat uniquement depuis ces origines. En développement,
  // localhost est toujours autorisé.
  allowedOrigin: process.env.SITE_ORIGIN || "https://nyakaagency.com",

  limits: {
    maxMessageLength: 600, // caractères, par message visiteur
    maxMessagesPerSession: 40, // messages visiteur acceptés pour une même session
    maxHistoryMessages: 20, // messages gardés et renvoyés à Claude (les plus récents)
    // Limitation de débit "best effort" : mémoire locale à l'instance de la fonction
    // serverless, remise à zéro à chaque redémarrage à froid. Protège contre les abus
    // rapides mais n'est pas une garantie globale — à renforcer avec Cloudflare Turnstile
    // si des abus sont constatés (voir README).
    rateLimitWindowMs: 60_000,
    rateLimitMaxRequests: 12, // requêtes par IP et par fenêtre
  },

  sheets: {
    sheetId: process.env.GOOGLE_SHEET_ID,
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
  },
};
