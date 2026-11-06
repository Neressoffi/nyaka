import { config } from "./config";

// Limiteur de débit "best effort" en mémoire : suffisant pour freiner un abus rapide
// pendant la durée de vie d'une instance de fonction serverless, mais remis à zéro à
// chaque redémarrage à froid et non partagé entre instances. Documenté comme limite
// connue dans le README.
const hits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - config.limits.rateLimitWindowMs;
  const timestamps = (hits.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= config.limits.rateLimitMaxRequests) {
    hits.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

// Nettoyage périodique pour éviter une fuite mémoire sur une instance longue durée.
setInterval(
  () => {
    const windowStart = Date.now() - config.limits.rateLimitWindowMs;
    for (const [ip, timestamps] of Array.from(hits.entries())) {
      const kept = timestamps.filter((t) => t > windowStart);
      if (kept.length === 0) hits.delete(ip);
      else hits.set(ip, kept);
    }
  },
  5 * 60 * 1000
).unref?.();
