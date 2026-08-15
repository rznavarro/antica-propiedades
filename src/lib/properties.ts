import fs from "fs";
import path from "path";
import { propertySchema } from "@/lib/schemas/property.schema";
import type {
  Amenidad,
  ComunaSlug,
  Etiqueta,
  Operacion,
  Property,
  TipoPropiedad,
} from "@/types/property";

const DATA_DIR = path.join(process.cwd(), "src", "data", "properties");

let cache: Property[] | null = null;

function loadProperties(): Property[] {
  if (cache) return cache;

  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));

  const parsed = files.map((file) => {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    const json = JSON.parse(raw);
    const result = propertySchema.safeParse(json);
    if (!result.success) {
      throw new Error(
        `Propiedad inválida en ${file}: ${result.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ")}`,
      );
    }
    return result.data as Property;
  });

  cache = parsed;
  return parsed;
}

export interface PropertyFilters {
  q?: string;
  operacion?: Operacion;
  comuna?: ComunaSlug[];
  tipo?: TipoPropiedad[];
  precioMin?: number;
  precioMax?: number;
  dormitoriosMin?: number;
  banosMin?: number;
  superficieMin?: number;
  superficieMax?: number;
  amenidades?: Amenidad[];
  etiquetas?: Etiqueta[];
  bounds?: { north: number; south: number; east: number; west: number };
  onlyAvailable?: boolean;
}

export type SortOrder = "recientes" | "precio-asc" | "precio-desc" | "superficie-desc";

function matchesQuery(p: Property, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [p.titulo, p.comuna, p.sector ?? "", p.referencia]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

export function getAllProperties(
  filters: PropertyFilters = {},
  sort: SortOrder = "recientes",
): Property[] {
  let items = loadProperties();

  if (filters.onlyAvailable !== false) {
    items = items.filter((p) => p.estado === "disponible");
  }
  if (filters.q) items = items.filter((p) => matchesQuery(p, filters.q!));
  if (filters.operacion) items = items.filter((p) => p.operacion === filters.operacion);
  if (filters.comuna?.length) items = items.filter((p) => filters.comuna!.includes(p.comuna));
  if (filters.tipo?.length) items = items.filter((p) => filters.tipo!.includes(p.tipo));
  if (filters.precioMin != null)
    items = items.filter((p) => p.precio.monto >= filters.precioMin!);
  if (filters.precioMax != null)
    items = items.filter((p) => p.precio.monto <= filters.precioMax!);
  if (filters.dormitoriosMin != null)
    items = items.filter((p) => p.dormitorios >= filters.dormitoriosMin!);
  if (filters.banosMin != null) items = items.filter((p) => p.banos >= filters.banosMin!);
  if (filters.superficieMin != null)
    items = items.filter((p) => p.superficie.util >= filters.superficieMin!);
  if (filters.superficieMax != null)
    items = items.filter((p) => p.superficie.util <= filters.superficieMax!);
  if (filters.amenidades?.length)
    items = items.filter((p) => filters.amenidades!.every((a) => p.amenidades.includes(a)));
  if (filters.etiquetas?.length)
    items = items.filter((p) => filters.etiquetas!.some((e) => p.etiquetas.includes(e)));
  if (filters.bounds) {
    const { north, south, east, west } = filters.bounds;
    items = items.filter(
      (p) =>
        p.geo.lat <= north && p.geo.lat >= south && p.geo.lng <= east && p.geo.lng >= west,
    );
  }

  const sorted = [...items];
  switch (sort) {
    case "precio-asc":
      sorted.sort((a, b) => a.precio.monto - b.precio.monto);
      break;
    case "precio-desc":
      sorted.sort((a, b) => b.precio.monto - a.precio.monto);
      break;
    case "superficie-desc":
      sorted.sort((a, b) => b.superficie.util - a.superficie.util);
      break;
    case "recientes":
    default:
      sorted.sort(
        (a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime(),
      );
  }

  return sorted;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return loadProperties().find((p) => p.slug === slug);
}

export function getPropertiesByComuna(comuna: ComunaSlug): Property[] {
  return getAllProperties({ comuna: [comuna] });
}

export function getFeaturedProperties(limit = 5): Property[] {
  return getAllProperties().filter((p) => p.destacada).slice(0, limit);
}

export function getSimilarProperties(property: Property, limit = 4): Property[] {
  const candidates = getAllProperties().filter((p) => p.id !== property.id);

  const scored = candidates.map((p) => {
    let score = 0;
    if (p.comuna === property.comuna) score += 2;
    if (p.tipo === property.tipo) score += 1;
    const priceDiff = Math.abs(p.precio.monto - property.precio.monto) / property.precio.monto;
    if (priceDiff < 0.3) score += 1;
    return { p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

export function getPriceRange(): { min: number; max: number } {
  const clpItems = loadProperties().filter((p) => p.precio.moneda === "CLP");
  const values = clpItems.map((p) => p.precio.monto);
  return { min: Math.min(...values), max: Math.max(...values) };
}
