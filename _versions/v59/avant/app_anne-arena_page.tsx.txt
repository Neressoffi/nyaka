import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, UserPlus } from "lucide-react";

// Fiche contact NFC / QR — Nsame Nyaka Anne Arena (v27).
// Adresse durable : https://nyakaagency.com/anne-arena (ne pas changer, elle est
// imprimée sur la carte NFC et dans le QR code). Fichier contact :
// public/contacts/anne-arena.vcf (servi en text/vcard via public/_headers).

export const metadata: Metadata = {
  title: "Nsame Nyaka Anne Arena — Co-founder | NYAKA",
  description: "Coordonnées de Nsame Nyaka Anne Arena, Co-founder de NYAKA.",
};

const GOLD = "#D8A53A";

export default function AnneArenaPage() {
  const btn =
    "flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl text-[15px] font-semibold transition-opacity hover:opacity-90";

  return (
    <main className="flex min-h-[100svh] items-start justify-center bg-white px-5 py-10 text-[#161616] sm:items-center">
      <section className="w-full max-w-[400px]">
        <img
          src="/nyaka-logo-dark.png?v=1"
          alt="NYAKA"
          className="mx-auto h-10 w-auto object-contain"
        />

        <div className="mt-8 rounded-[22px] border border-[#ece7de] px-6 py-8 text-center shadow-[0_18px_40px_-28px_rgba(22,22,22,0.35)]">
          <span className="mx-auto block h-[3px] w-10 rounded-full" style={{ background: GOLD }} />
          <h1 className="mt-5 font-display text-[26px] font-bold leading-tight tracking-[-0.02em]">
            Nsame Nyaka Anne Arena
          </h1>
          <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
            Co-founder — NYAKA
          </p>

          <dl className="mt-7 space-y-3 text-left text-[14px]">
            <div className="flex items-center justify-between gap-3 border-b border-[#f0ece5] pb-3">
              <dt className="text-[#6b6964]">Téléphone</dt>
              <dd className="font-medium">
                <a href="tel:+237686924074">+237 686 924 074</a>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[#f0ece5] pb-3">
              <dt className="text-[#6b6964]">E-mail</dt>
              <dd className="min-w-0 font-medium [overflow-wrap:anywhere]">
                <a href="mailto:arena_nsame@nyakaagency.com">arena_nsame@nyakaagency.com</a>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[#6b6964]">Site</dt>
              <dd className="font-medium">
                <a href="https://nyakaagency.com">nyakaagency.com</a>
              </dd>
            </div>
          </dl>

          <div className="mt-8 space-y-2.5">
            <a href="/contacts/anne-arena.vcf" download="anne-arena.vcf" className={`${btn} bg-[#161616] text-white`}>
              <UserPlus className="h-[18px] w-[18px]" style={{ color: GOLD }} />
              Enregistrer le contact
            </a>
            <div className="grid grid-cols-3 gap-2.5">
              <a href="tel:+237686924074" className={`${btn} flex-col gap-1 border border-[#e3ddd2] text-[13px]`}>
                <Phone className="h-[18px] w-[18px]" style={{ color: GOLD }} />
                Appeler
              </a>
              <a
                href="https://wa.me/237686924074"
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn} flex-col gap-1 border border-[#e3ddd2] text-[13px]`}
              >
                <MessageCircle className="h-[18px] w-[18px]" style={{ color: GOLD }} />
                WhatsApp
              </a>
              <a href="mailto:arena_nsame@nyakaagency.com" className={`${btn} flex-col gap-1 border border-[#e3ddd2] text-[13px]`}>
                <Mail className="h-[18px] w-[18px]" style={{ color: GOLD }} />
                E-mail
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[13px]">
          <a href="https://nyakaagency.com" className="text-[#6b6964] underline-offset-4 hover:underline">
            Site NYAKA
          </a>
        </p>
      </section>
    </main>
  );
}
