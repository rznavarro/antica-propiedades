"use client";

import type { CatalogFilters } from "@/lib/catalog-filters";
import { AMENIDAD_LABELS, ETIQUETA_LABELS, TIPO_LABELS } from "@/types/property";
import { COMUNA_NOMBRES } from "@/lib/comuna-nombres";

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-white/30"
    >
      {label}
      <span aria-hidden>×</span>
    </button>
  );
}

export function ActiveFilterChips({
  filters,
  onChange,
}: {
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
}) {
  const chips: { key: string; label: string; remove: () => void }[] = [];

  if (filters.operacion)
    chips.push({
      key: "op",
      label: filters.operacion === "arriendo" ? "Arriendo" : "Venta",
      remove: () => onChange({ ...filters, operacion: "" }),
    });

  filters.comuna.forEach((c) =>
    chips.push({
      key: `comuna-${c}`,
      label: COMUNA_NOMBRES[c],
      remove: () => onChange({ ...filters, comuna: filters.comuna.filter((x) => x !== c) }),
    }),
  );

  filters.tipo.forEach((t) =>
    chips.push({
      key: `tipo-${t}`,
      label: TIPO_LABELS[t],
      remove: () => onChange({ ...filters, tipo: filters.tipo.filter((x) => x !== t) }),
    }),
  );

  if (filters.precioMin != null || filters.precioMax != null)
    chips.push({
      key: "precio",
      label: `Precio ${filters.precioMin ?? "0"} - ${filters.precioMax ?? "∞"}`,
      remove: () => onChange({ ...filters, precioMin: null, precioMax: null }),
    });

  if (filters.dormMin != null)
    chips.push({
      key: "dorm",
      label: `${filters.dormMin}+ dormitorios`,
      remove: () => onChange({ ...filters, dormMin: null }),
    });

  if (filters.banosMin != null)
    chips.push({
      key: "banos",
      label: `${filters.banosMin}+ baños`,
      remove: () => onChange({ ...filters, banosMin: null }),
    });

  if (filters.supMin != null || filters.supMax != null)
    chips.push({
      key: "sup",
      label: `${filters.supMin ?? "0"} - ${filters.supMax ?? "∞"} m²`,
      remove: () => onChange({ ...filters, supMin: null, supMax: null }),
    });

  filters.amenidades.forEach((a) =>
    chips.push({
      key: `am-${a}`,
      label: AMENIDAD_LABELS[a],
      remove: () =>
        onChange({ ...filters, amenidades: filters.amenidades.filter((x) => x !== a) }),
    }),
  );

  filters.etiquetas.forEach((e) =>
    chips.push({
      key: `et-${e}`,
      label: ETIQUETA_LABELS[e],
      remove: () =>
        onChange({ ...filters, etiquetas: filters.etiquetas.filter((x) => x !== e) }),
    }),
  );

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <Chip key={c.key} label={c.label} onRemove={c.remove} />
      ))}
    </div>
  );
}
