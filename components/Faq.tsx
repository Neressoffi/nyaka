"use client";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { Plus } from "lucide-react";
import contenu from "@/content/pages/accueil.json";

// Questions gérées depuis l'administration (Decap CMS) : content/pages/accueil.json
const TXT = contenu.faq;

const QUESTIONS = TXT.questions.map((item) => ({
  question: item.question,
  answer: item.reponse,
}));

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 bg-marketing-surface-0 px-4 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">

        <div>
          <h2 className="max-w-xs font-display text-[26px] font-bold leading-[1.2] text-marketing-foreground-0 sm:text-[32px] sm:leading-tight lg:text-[40px]">
            {TXT.titre}
          </h2>

          <Link
            href={TXT.bouton.lien}
            className="mt-6 inline-block rounded-lg border border-black/20 px-5 py-2.5 text-sm font-medium text-marketing-foreground-0 transition-colors hover:bg-black/5 sm:text-[15px]"
          >
            {TXT.bouton.texte}
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
