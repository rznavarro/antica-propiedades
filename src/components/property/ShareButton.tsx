"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/format";

export function ShareButton({ titulo, url }: { titulo: string; url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <a
        href={buildWhatsAppLink(`Mira esta propiedad: ${titulo} — ${url}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-white/30"
      >
        Compartir en WhatsApp
      </a>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-white/30"
      >
        {copied ? "¡Copiado!" : "Copiar link"}
      </button>
    </div>
  );
}
