import type {
  Amenidad,
  ComunaSlug,
  Etiqueta,
  Operacion,
  Property,
  TipoPropiedad,
} from "@/types/property";
import type { SortOrder } from "@/lib/properties";

export interface CatalogFilters {
  q: string;
  operacion: Operacion | "";
  comuna: ComunaSlug[];
  tipo: TipoPropiedad[];
  precioMin: number | null;
  precioMax: number | null;
  dormMin: number | null;
  banosMin: number | null;
  supMin: number | null;
  supMax: number | null;
  amenidades: Amenidad[];
  etiquetas: Etiqueta[];
  sort: SortOrder;
}

export const EMPTY_FILTERS: CatalogFilters = {
  q: "",
  operacion: "",
  comuna: [],
  tipo: [],
  precioMin: null,
  precioMax: null,
  dormMin: null,
  banosMin: null,
  supMin: null,
  supMax: null,
  amenidades: [],
  etiquetas: [],
  sort: "recientes",
};

function csv<T extends string>(v: string | null): T[] {
  return v ? (v.split(",").filter(Boolean) as T[]) : [];
}

function num(v: string | null): number | null {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function parseFiltersFromParams(params: URLSearchParams): CatalogFilters {
  return {
    q: params.get("q") ?? "",
    operacion: (params.get("operacion") as Operacion | null) ?? "",
    comuna: csv<ComunaSlug>(params.get("comuna")),
    tipo: csv<TipoPropiedad>(params.get("tipo")),
    precioMin: num(params.get("precioMin")),
    precioMax: num(params.get("precioMax")),
    dormMin: num(params.get("dormMin")),
    banosMin: num(params.get("banosMin")),
    supMin: num(params.get("supMin")),
    supMax: num(params.get("supMax")),
    amenidades: csv<Amenidad>(params.get("amenidades")),
    etiquetas: csv<Etiqueta>(params.get("etiquetas")),
    sort: (params.get("sort") as SortOrder | null) ?? "recientes",
  };
}

export function filtersToParams(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.operacion) params.set("operacion", filters.operacion);
  if (filters.comuna.length) params.set("comuna", filters.comuna.join(","));
  if (filters.tipo.length) params.set("tipo", filters.tipo.join(","));
  if (filters.precioMin != null) params.set("precioMin", String(filters.precioMin));
  if (filters.precioMax != null) params.set("precioMax", String(filters.precioMax));
  if (filters.dormMin != null) params.set("dormMin", String(filters.dormMin));
  if (filters.banosMin != null) params.set("banosMin", String(filters.banosMin));
  if (filters.supMin != null) params.set("supMin", String(filters.supMin));
  if (filters.supMax != null) params.set("supMax", String(filters.supMax));
  if (filters.amenidades.length) params.set("amenidades", filters.amenidades.join(","));
  if (filters.etiquetas.length) params.set("etiquetas", filters.etiquetas.join(","));
  if (filters.sort !== "recientes") params.set("sort", filters.sort);
  return params;
}

export function applyFiltersClientSide(
  properties: Property[],
  filters: CatalogFilters,
): Property[] {
  let items = properties;

  if (filters.q.trim()) {
    const needle = filters.q.trim().toLowerCase();
    items = items.filter((p) =>
      [p.titulo, p.comuna, p.sector ?? "", p.referencia].join(" ").toLowerCase().includes(needle),
    );
  }
  if (filters.operacion) items = items.filter((p) => p.operacion === filters.operacion);
  if (filters.comuna.length) items = items.filter((p) => filters.comuna.includes(p.comuna));
  if (filters.tipo.length) items = items.filter((p) => filters.tipo.includes(p.tipo));
  if (filters.precioMin != null) items = items.filter((p) => p.precio.monto >= filters.precioMin!);
  if (filters.precioMax != null) items = items.filter((p) => p.precio.monto <= filters.precioMax!);
  if (filters.dormMin != null) items = items.filter((p) => p.dormitorios >= filters.dormMin!);
  if (filters.banosMin != null) items = items.filter((p) => p.banos >= filters.banosMin!);
  if (filters.supMin != null) items = items.filter((p) => p.superficie.util >= filters.supMin!);
  if (filters.supMax != null) items = items.filter((p) => p.superficie.util <= filters.supMax!);
  if (filters.amenidades.length)
    items = items.filter((p) => filters.amenidades.every((a) => p.amenidades.includes(a)));
  if (filters.etiquetas.length)
    items = items.filter((p) => filters.etiquetas.some((e) => p.etiquetas.includes(e)));

  const sorted = [...items];
  switch (filters.sort) {
    case "precio-asc":
      sorted.sort((a, b) => a.precio.monto - b.precio.monto);
      break;
    case "precio-desc":
      sorted.sort((a, b) => b.precio.monto - a.precio.monto);
      break;
    case "superficie-desc":
      sorted.sort((a, b) => b.superficie.util - a.superficie.util);
      break;
    default:
      sorted.sort(
        (a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime(),
      );
  }
  return sorted;
}

export function countActiveFilters(filters: CatalogFilters): number {
  let n = 0;
  if (filters.operacion) n++;
  n += filters.comuna.length;
  n += filters.tipo.length;
  if (filters.precioMin != null || filters.precioMax != null) n++;
  if (filters.dormMin != null) n++;
  if (filters.banosMin != null) n++;
  if (filters.supMin != null || filters.supMax != null) n++;
  n += filters.amenidades.length;
  n += filters.etiquetas.length;
  return n;
}
