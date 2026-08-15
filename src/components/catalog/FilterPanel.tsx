"use client";

import type { CatalogFilters } from "@/lib/catalog-filters";
import type { Amenidad, ComunaSlug, Etiqueta, TipoPropiedad } from "@/types/property";
import { AMENIDAD_LABELS, ETIQUETA_LABELS, TIPO_LABELS } from "@/types/property";
import { COMUNA_NOMBRES } from "@/lib/comuna-nombres";

const COMUNA_OPTIONS = Object.keys(COMUNA_NOMBRES) as ComunaSlug[];
const TIPO_OPTIONS = Object.keys(TIPO_LABELS) as TipoPropiedad[];
const AMENIDAD_OPTIONS = Object.keys(AMENIDAD_LABELS) as Amenidad[];
const ETIQUETA_OPTIONS = Object.keys(ETIQUETA_LABELS) as Etiqueta[];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterPanel({
  filters,
  onChange,
  onClear,
  resultCount,
}: {
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  onClear: () => void;
  resultCount: number;
}) {
  const set = <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-8 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white">Filtros</p>
        <button type="button" onClick={onClear} className="text-xs text-white/50 underline hover:text-white">
          Limpiar todos los filtros
        </button>
      </div>

      <p className="text-xs text-white/50">{resultCount} propiedades encontradas</p>

      {/* Operación */}
      <fieldset>
        <legend className="mb-2 font-medium text-white/80">Operación</legend>
        <div className="flex gap-2">
          {(["arriendo", "venta"] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => set("operacion", filters.operacion === op ? "" : op)}
              className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${
                filters.operacion === op
                  ? "border-accent bg-accent text-ink"
                  : "border-white/15 text-white/70 hover:border-white/30"
              }`}
            >
              {op}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Comuna */}
      <fieldset>
        <legend className="mb-2 font-medium text-white/80">Comuna</legend>
        <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
          {COMUNA_OPTIONS.map((slug) => (
            <label key={slug} className="flex items-center gap-2 text-white/70">
              <input
                type="checkbox"
                checked={filters.comuna.includes(slug)}
                onChange={() => set("comuna", toggle(filters.comuna, slug))}
                className="accent-accent"
              />
              {COMUNA_NOMBRES[slug]}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Tipo */}
      <fieldset>
        <legend className="mb-2 font-medium text-white/80">Tipo de propiedad</legend>
        <div className="space-y-1.5">
          {TIPO_OPTIONS.map((tipo) => (
            <label key={tipo} className="flex items-center gap-2 text-white/70">
              <input
                type="checkbox"
                checked={filters.tipo.includes(tipo)}
                onChange={() => set("tipo", toggle(filters.tipo, tipo))}
                className="accent-accent"
              />
              {TIPO_LABELS[tipo]}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Precio */}
      <fieldset>
        <legend className="mb-2 font-medium text-white/80">Precio (CLP)</legend>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Mín"
            value={filters.precioMin ?? ""}
            onChange={(e) => set("precioMin", e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-white/15 bg-transparent px-2 py-1.5 text-white placeholder:text-white/30"
          />
          <span className="text-white/30">—</span>
          <input
            type="number"
            placeholder="Máx"
            value={filters.precioMax ?? ""}
            onChange={(e) => set("precioMax", e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-white/15 bg-transparent px-2 py-1.5 text-white placeholder:text-white/30"
          />
        </div>
      </fieldset>

      {/* Dormitorios / Baños */}
      <div className="grid grid-cols-2 gap-4">
        <fieldset>
          <legend className="mb-2 font-medium text-white/80">Dormitorios</legend>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set("dormMin", filters.dormMin === n ? null : n)}
                className={`h-8 w-9 rounded-lg border text-xs transition ${
                  filters.dormMin === n
                    ? "border-accent bg-accent text-ink"
                    : "border-white/15 text-white/70 hover:border-white/30"
                }`}
              >
                {n}
                {n === 4 ? "+" : ""}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-medium text-white/80">Baños</legend>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set("banosMin", filters.banosMin === n ? null : n)}
                className={`h-8 w-9 rounded-lg border text-xs transition ${
                  filters.banosMin === n
                    ? "border-accent bg-accent text-ink"
                    : "border-white/15 text-white/70 hover:border-white/30"
                }`}
              >
                {n}
                {n === 3 ? "+" : ""}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Superficie */}
      <fieldset>
        <legend className="mb-2 font-medium text-white/80">Superficie (m²)</legend>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Mín"
            value={filters.supMin ?? ""}
            onChange={(e) => set("supMin", e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-white/15 bg-transparent px-2 py-1.5 text-white placeholder:text-white/30"
          />
          <span className="text-white/30">—</span>
          <input
            type="number"
            placeholder="Máx"
            value={filters.supMax ?? ""}
            onChange={(e) => set("supMax", e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-white/15 bg-transparent px-2 py-1.5 text-white placeholder:text-white/30"
          />
        </div>
      </fieldset>

      {/* Características */}
      <fieldset>
        <legend className="mb-2 font-medium text-white/80">Características</legend>
        <div className="space-y-1.5">
          {AMENIDAD_OPTIONS.map((a) => (
            <label key={a} className="flex items-center gap-2 text-white/70">
              <input
                type="checkbox"
                checked={filters.amenidades.includes(a)}
                onChange={() => set("amenidades", toggle(filters.amenidades, a))}
                className="accent-accent"
              />
              {AMENIDAD_LABELS[a]}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Etiquetas */}
      <fieldset>
        <legend className="mb-2 font-medium text-white/80">Etiquetas</legend>
        <div className="space-y-1.5">
          {ETIQUETA_OPTIONS.map((e) => (
            <label key={e} className="flex items-center gap-2 text-white/70">
              <input
                type="checkbox"
                checked={filters.etiquetas.includes(e)}
                onChange={() => set("etiquetas", toggle(filters.etiquetas, e))}
                className="accent-accent"
              />
              {ETIQUETA_LABELS[e]}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
