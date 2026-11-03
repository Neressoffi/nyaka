"use client";
import { useEffect, useState } from "react";

const PHRASES = [
  "Une identité qui marque",
  "Une communication claire",
  "Des contenus qui engagent",
  "Une présence digitale cohérente",
  "Une campagne créative",
  "Une solution data & IA",
  "Un repositionnement de marque",
  "Une expérience digitale",
];

const LINE_HEIGHT = 60;
const VISIBLE_HEIGHT = 420;
const REPEAT = 5;

const CENTER_OFFSET = Math.floor(VISIBLE_HEIGHT / LINE_HEIGHT / 2);

function opacityForDistance(distance: number): number {
  if (distance === 0) return 1;
  if (distance === 1) return 0.45;
  if (distance === 2) return 0.3;
  if (distance === 3) return 0.2;
  return 0.1;
}

export function TextRoulette() {

  const [step, setStep] = useState(0);

  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => s + 1);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === PHRASES.length) {

      const timeout = setTimeout(() => {
        setInstant(true);
        setStep(0);
      }, 650);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  useEffect(() => {
    if (instant) {
      const raf = requestAnimationFrame(() => setInstant(false));
      return () => cancelAnimationFrame(raf);
    }
  }, [instant]);

  const lines = Array.from({ length: REPEAT }, () => PHRASES).flat();

  const activeIndex = step + CENTER_OFFSET;

  return (

    <div className="hidden items-center gap-6 lg:flex" aria-hidden>

      <div className="h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-[#323232]" />

      <div className="h-[420px] overflow-hidden">

        <ul
          style={{
            transform: `translateY(-${step * LINE_HEIGHT}px)`,
            transition: instant ? "none" : "transform 600ms ease",
          }}
        >
          {lines.map((phrase, index) => (
            <li
              key={index}

              className="flex h-[60px] items-center font-display text-[30px] font-bold text-white"

              style={{
                opacity: opacityForDistance(Math.abs(index - activeIndex)),
                transition: instant ? "none" : "opacity 600ms ease",
              }}
            >
              {phrase}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
