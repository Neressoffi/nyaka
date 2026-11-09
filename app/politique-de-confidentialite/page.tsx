import type { Metadata } from "next";
import { TopBanner } from "@/components/TopBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité | NYAKA",
  description: "Comment NYAKA traite les données échangées avec l’assistant IA du site.",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <main>
      <TopBanner />
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-beige-950 via-surface-0 to-surface-0" />
        <div className="relative mx-auto max-w-screen-md px-4 py-32 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">Confidentialité</p>
          <h1 className="mt-4 font-display text-[30px] font-bold leading-[1.15] text-white sm:text-[38px]">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm text-white/60">
            Cette page porte spécifiquement sur l’assistant IA du site. Elle sera complétée avec la politique de
            confidentialité générale de NYAKA.
          </p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-white/85">
            <section>
              <h2 className="font-display text-xl font-semibold text-white">L’assistant du site</h2>
              <p className="mt-2">
                Le bouton de discussion présent sur le site vous met en relation avec un assistant basé sur
                l’intelligence artificielle (modèles d’IA exécutés par Cloudflare, hébergeur du site), et non avec une personne. Il répond à
                partir d’une base de connaissances sur NYAKA et ne donne jamais de prix ferme.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-white">Ce qui est conservé</h2>
              <p className="mt-2">
                L’historique de votre conversation est conservé uniquement dans votre navigateur (stockage de
                session), le temps de votre visite : il est effacé automatiquement à la fermeture de l’onglet.
                Il n’est pas stocké sur nos serveurs.
              </p>
              <p className="mt-2">
                Si vous choisissez de laisser vos coordonnées pour être recontacté·e (bouton « Laisser mes
                coordonnées »), ces informations (nom, moyen de contact, besoin exprimé) sont enregistrées dans
                un tableau de suivi interne à NYAKA (Google Sheets), uniquement après votre accord explicite
                (case à cocher).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-white">Avec qui vos messages sont partagés</h2>
              <p className="mt-2">
                Le contenu de vos messages est transmis à Cloudflare (hébergeur du site et des modèles d’IA) pour
                générer les réponses. Les coordonnées que vous choisissez de laisser sont transmises à Google
                (Google Sheets) pour être enregistrées dans le tableau de suivi de NYAKA. Vos coordonnées, si vous les laissez, sont accessibles uniquement à l’équipe NYAKA
                autorisée.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-white">Vos droits</h2>
              <p className="mt-2">
                Vous pouvez demander la suppression ou l’export des informations que vous avez laissées à
                l’assistant en écrivant à{" "}
                <a href="mailto:contact@nyakaagency.com" className="underline hover:text-white">
                  contact@nyakaagency.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-white">Ce que l’assistant ne fait pas</h2>
              <p className="mt-2">
                Il ne demande jamais d’informations financières, de mot de passe ou d’identifiant. Il ne propose
                aucun paiement.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
