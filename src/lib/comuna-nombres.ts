import comunasData from "@/data/comunas.json";
import type { ComunaInfo, ComunaSlug } from "@/types/property";

const comunas = comunasData as ComunaInfo[];

export const COMUNA_NOMBRES = comunas.reduce(
  (acc, c) => {
    acc[c.slug] = c.nombre;
    return acc;
  },
  {} as Record<ComunaSlug, string>,
);
