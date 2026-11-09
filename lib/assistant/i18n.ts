export type Lang = "fr" | "en";

export const STRINGS: Record<Lang, Record<string, string>> = {
  fr: {
    bubbleLabel: "Ouvrir l'assistant NYAKA",
    title: "Assistant NYAKA",
    subtitle: "Propulsé par l'IA",
    welcome:
      "Bonjour, je suis l'assistant IA de NYAKA. Je peux vous présenter nos services, nos réalisations, ou transmettre votre projet à l'équipe.",
    aiNotice: "Vous échangez avec une IA.",
    privacyLink: "Politique de confidentialité",
    placeholder: "Écrivez votre message…",
    send: "Envoyer",
    typing: "L'assistant écrit…",
    errorGeneric: "Une erreur est survenue. Vous pouvez réessayer.",
    sessionLimitReached:
      "Vous avez atteint la limite de messages pour cette conversation. Contactez-nous directement si besoin.",
    handedOffNotice: "Votre demande a bien été enregistrée. L'équipe NYAKA vous recontactera.",
    talkToHuman: "Parler à l'équipe",
    whatsappCta: "Continuer sur WhatsApp",
    contactCta: "Démarrer un projet",
    close: "Fermer l'assistant",
    langToggle: "English",
  },
  en: {
    bubbleLabel: "Open the NYAKA assistant",
    title: "NYAKA Assistant",
    subtitle: "Powered by AI",
    welcome:
      "Hi, I'm NYAKA's AI assistant. I can walk you through our services, our work, or pass your project on to the team.",
    aiNotice: "You're chatting with an AI.",
    privacyLink: "Privacy policy",
    placeholder: "Type your message…",
    send: "Send",
    typing: "Assistant is typing…",
    errorGeneric: "Something went wrong. Please try again.",
    sessionLimitReached: "You've reached the message limit for this conversation. Please reach out directly if needed.",
    handedOffNotice: "Your request has been recorded. The NYAKA team will get back to you.",
    talkToHuman: "Talk to the team",
    whatsappCta: "Continue on WhatsApp",
    contactCta: "Start a project",
    close: "Close the assistant",
    langToggle: "Français",
  },
};

export function detectDefaultLang(): Lang {
  if (typeof navigator === "undefined") return "fr";
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "fr";
}
