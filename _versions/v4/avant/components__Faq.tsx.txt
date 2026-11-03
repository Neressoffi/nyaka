"use client";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { Plus } from "lucide-react";

const QUESTIONS = [
  {
    question: "Quels types de projets NYAKA accompagne-t-elle ?",
    answer:
      "NYAKA intervient sur des projets de branding et d'identité de marque, de design et de supports de communication, de contenus vidéo et de campagnes créatives, ainsi que sur certains besoins liés à l'intelligence artificielle, à l'automatisation et aux données.",
  },
  {
    question: "Puis-je vous contacter si mon idée n'est pas encore bien structurée ?",
    answer:
      "Oui. Vous pouvez nous présenter une idée, un besoin ou une difficulté encore imprécise. Le premier échange sert justement à clarifier la situation, le résultat attendu et le bon point de départ.",
  },
  {
    question: "Travaillez-vous seulement avec des entreprises déjà établies ?",
    answer:
      "Non. NYAKA peut accompagner un projet au stade de l'idée, une marque en lancement, une organisation déjà active ou une entreprise qui prépare une évolution importante.",
  },
  {
    question: "Puis-je commander uniquement un logo, une vidéo ou un support précis ?",
    answer:
      "Oui, lorsqu'une intervention ciblée correspond réellement au besoin. Nous prendrons néanmoins le temps de comprendre le contexte afin que le livrable soit cohérent avec votre objectif et votre organisation.",
  },
  {
    question: "Comment se déroule un projet avec NYAKA ?",
    answer:
      "Après la présentation du besoin, nous cadrons la mission, clarifions les objectifs, proposons une démarche et un périmètre, puis nous avançons après validation. Selon le projet, NYAKA produit directement, coordonne des partenaires et peut accompagner la mise en œuvre ou l'évolution.",
  },
  {
    question: "Travaillez-vous avec des clients situés dans d'autres pays ?",
    answer:
      "Oui. Une partie des projets peut être conduite à distance. Lorsque le projet exige une présence locale ou une compétence particulière, nous définissons les modalités et les partenaires nécessaires.",
  },
  {
    question: "Que propose NYAKA en intelligence artificielle et en données ?",
    answer:
      "Nous aidons à identifier des usages utiles, puis à concevoir ou coordonner des assistants intelligents, des automatisations ciblées, des systèmes de collecte et de structuration de données ou des expériences connectées. Le périmètre dépend du besoin, des données disponibles et de la faisabilité technique.",
  },
  {
    question: "Comment sont calculés les tarifs ?",
    answer:
      "Les tarifs dépendent du périmètre, de la complexité, des livrables, des délais et des expertises mobilisées. Après un premier échange, nous transmettons une proposition claire avec les étapes, les responsabilités et les conditions de collaboration.",
  },
  {
    question: "Combien de temps faut-il pour réaliser un projet ?",
    answer:
      "La durée varie selon la nature du besoin et les validations nécessaires. Le calendrier est défini avant le démarrage et ajusté uniquement lorsque le périmètre évolue ou qu'une dépendance externe le nécessite.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">

        <div>
          <h2 className="max-w-xs font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
            Réponses à vos questions
          </h2>

          <Link
            href="/demarrer-un-projet"
            className="mt-6 inline-block rounded-lg border border-black/20 px-5 py-2.5 text-sm font-medium text-marketing-foreground-0 transition-colors hover:bg-black/5 sm:text-[15px]"
          >
            Parler de votre projet
          </Link>
        </div>

        <Accordion.Root type="single" collapsible className="flex flex-col">
          {QUESTIONS.map((item, index) => (
            <Accordion.Item
              key={index}
              value={`question-${index}`}
              className="border-b border-black/10"
            >

              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-medium text-marketing-foreground-0 transition-colors hover:text-marketing-foreground-1 sm:text-base">
                  {item.question}

                  <Plus className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-data-[state=open]:rotate-45" />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="grid overflow-hidden transition-all duration-300 data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100">
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-marketing-foreground-2 sm:text-[15px]">
                    {item.answer}
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
