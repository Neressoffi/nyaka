"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Video } from "@/lib/portfolio";

// Lecteur vidéo intégré : la vidéo n'est chargée qu'à l'ouverture,
// sans lecture automatique avec le son. Contrôles natifs : lecture/pause,
// son, plein écran (clavier et mobile compris). Échap ou ✕ pour fermer.
export function VideoModal({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!video) return;
    previousFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      // Garde le focus dans la fenêtre
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          "button, video, [href], [tabindex]:not([tabindex='-1'])"
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previousFocus.current?.focus();
    };
  }, [video, onClose]);

  if (!video) return null;
  const vertical = video.format === "vertical";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-[fadeIn_250ms_ease-out] sm:p-8"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className={`relative flex max-h-full w-full flex-col ${
          vertical ? "max-w-[min(420px,100%)]" : "max-w-5xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la vidéo"
          className="absolute -top-1 right-0 z-10 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-hidden rounded-2xl bg-black">
          <video
            key={video.video}
            src={vertical ? `${video.video}#t=1` : video.video}
            poster={vertical ? undefined : video.miniature}
            controls
            playsInline
            preload="metadata"
            className={`block w-full object-contain ${
              vertical ? "aspect-[9/16] max-h-[75vh]" : "aspect-video max-h-[70vh]"
            }`}
          >
            Votre navigateur ne peut pas lire cette vidéo.
          </video>
        </div>

        <div className="mt-4 text-white">
          <h2 id="video-modal-title" className="font-display text-xl font-bold sm:text-2xl">
            {video.titre}
          </h2>
          <p className="mt-1 text-sm text-white/55">{video.client}</p>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/85">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
