import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/properties";
import { getAllComunas } from "@/lib/comunas";

const SITE_URL = "https://antica-propiedades-1mzv.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const properties = getAllProperties();
  const comunas = getAllComunas();

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/catalogo`, changeFrequency: "daily", priority: 0.9 },
    ...comunas.map((c) => ({
      url: `${SITE_URL}/comunas/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...properties.map((p) => ({
      url: `${SITE_URL}/propiedades/${p.slug}`,
      lastModified: p.fechaActualizacion,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
