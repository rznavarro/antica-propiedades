"use client";

import { useState } from "react";
import Image from "next/image";
import type { PropertyMedia } from "@/types/property";

export function PropertyGallery({ media, titulo }: { media: PropertyMedia[]; titulo: string }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = media[index];

  function prev() {
    setIndex((i) => (i - 1 + media.length) % media.length);
  }
  function next() {
    setIndex((i) => (i + 1) % media.length);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl"
        aria-label={`Ampliar foto de ${titulo}`}
      >
        <Image
          src={current.url}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {media.length > 1 && (
          <>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/70 p-2 text-white"
            >
              ‹
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/70 p-2 text-white"
            >
              ›
            </span>
          </>
        )}
      </button>

      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {media.map((m, i) => (
            <button
              key={m.url + i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === index ? "border-accent" : "border-transparent"
              }`}
            >
              <Image src={m.url} alt={m.alt} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.url} alt={current.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-2 text-white"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
