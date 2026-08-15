import { NextResponse } from "next/server";
import { getAllProperties, type SortOrder } from "@/lib/properties";
import type { ComunaSlug, TipoPropiedad } from "@/types/property";

// Reads from local JSON today. This is the seam where the client's external
// "replicador" feed gets wired in later — the response shape stays the same,
// only the data source inside getAllProperties() changes.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const csv = (key: string) => searchParams.get(key)?.split(",").filter(Boolean);
  const num = (key: string) => {
    const v = searchParams.get(key);
    return v ? Number(v) : undefined;
  };

  const properties = getAllProperties(
    {
      q: searchParams.get("q") ?? undefined,
      operacion: (searchParams.get("operacion") as "arriendo" | "venta" | null) ?? undefined,
      comuna: csv("comuna") as ComunaSlug[] | undefined,
      tipo: csv("tipo") as TipoPropiedad[] | undefined,
      precioMin: num("precioMin"),
      precioMax: num("precioMax"),
      dormitoriosMin: num("dormMin"),
      banosMin: num("banosMin"),
    },
    (searchParams.get("sort") as SortOrder | null) ?? "recientes",
  );

  return NextResponse.json({ count: properties.length, properties });
}
