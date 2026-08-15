import type { ComunaInfo, ComunaSlug } from "@/types/property";
import comunasData from "@/data/comunas.json";

const comunas = comunasData as ComunaInfo[];

export function getAllComunas(): ComunaInfo[] {
  return comunas;
}

export function getComunaBySlug(slug: string): ComunaInfo | undefined {
  return comunas.find((c) => c.slug === slug);
}

export function isValidComunaSlug(slug: string): slug is ComunaSlug {
  return comunas.some((c) => c.slug === slug);
}
