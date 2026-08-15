import type { Etiqueta } from "@/types/property";
import { ETIQUETA_LABELS } from "@/types/property";

const BADGE_STYLES: Record<Etiqueta, string> = {
  promocion: "bg-accent text-ink",
  "precio-rebajado": "bg-red-500/90 text-white",
  "nuevo-ingreso": "bg-emerald-500/90 text-white",
  destacada: "bg-white text-ink",
  "ultima-unidad": "bg-red-600/90 text-white",
  "disponibilidad-inmediata": "bg-sky-500/90 text-white",
  "sin-comision": "bg-purple-500/90 text-white",
};

export function PropertyBadge({ etiqueta }: { etiqueta: Etiqueta }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE_STYLES[etiqueta]}`}
    >
      {ETIQUETA_LABELS[etiqueta]}
    </span>
  );
}

export function PropertyBadgeList({ etiquetas }: { etiquetas: Etiqueta[] }) {
  if (!etiquetas.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {etiquetas.map((e) => (
        <PropertyBadge key={e} etiqueta={e} />
      ))}
    </div>
  );
}
