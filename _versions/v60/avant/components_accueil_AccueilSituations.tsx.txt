"use client";

import { useEffect, useRef, useState } from "react";
import { CSS as SV5_CSS, SITUATIONS } from "@/components/solutions/SolutionsV5";

// Section « Votre situation / Notre réponse » de la page Solutions (V5),
// reprise à l’identique sur la page d’accueil (v36) : mêmes textes, même design.
export function AccueilSituations() {
  const [choix, setChoix] = useState(0);
  const s = SITUATIONS[choix];
  const racine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = racine.current?.querySelectorAll(".reveal");
    if (!els) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sv5" ref={racine}>
      <style dangerouslySetInnerHTML={{ __html: SV5_CSS }} />
      <section className="situations" id="votre-situation" aria-labelledby="situationTitleAccueil">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Votre situation / Notre réponse</span><span className="section-ref">Trouver le bon point de départ</span></div>
          <div className="situation-head"><h2 id="situationTitleAccueil" className="reveal">Une idée. Plusieurs chemins possibles.</h2><p className="reveal">Vous connaissez votre besoin, mais pas nécessairement la solution. Choisissez la situation qui vous correspond pour découvrir comment NYAKA peut vous accompagner.</p></div>
          <div className="situation-grid">
            <div className="situation-options" aria-label="Choisir votre situation">
              {SITUATIONS.map((item, i) => (
                <button key={item.choix} className="situation-card" aria-pressed={choix === i} type="button" onClick={() => setChoix(i)}>
                  <span className="card-top"><span className="situ-num">{String(i + 1).padStart(2, "0")}</span><span className="situ-glyph">{item.glyphe}</span></span>
                  <span className="situ-title">{item.choix}</span>
                </button>
              ))}
            </div>
            <div className="situation-detail" aria-live="polite" aria-atomic="true">
              <span className="detail-kicker">Une réponse adaptée</span>
              <div className="detail-index">{String(choix + 1).padStart(2, "0")}.</div>
              <h3>{s.titre}</h3>
              <p>{s.texte}</p>
              <div className="detail-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="detail-cta"><a className="btn btn-light" href="/demarrer-un-projet">Parler de ce besoin <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
