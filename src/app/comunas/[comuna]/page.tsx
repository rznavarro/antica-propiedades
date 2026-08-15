import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllComunas, getComunaBySlug } from "@/lib/comunas";
import { getPropertiesByComuna } from "@/lib/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { CatalogMapLoader as CatalogMap } from "@/components/map/CatalogMapLoader";

export function generateStaticParams() {
  return getAllComunas().map((c) => ({ comuna: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ comuna: string }>;
}): Promise<Metadata> {
  const { comuna: slug } = await params;
  const comuna = getComunaBySlug(slug);
  if (!comuna) return {};

  return {
    title: `Propiedades en ${comuna.nombre}`,
    description: `${comuna.blurb} Explora el catálogo de propiedades disponibles en ${comuna.nombre} con Antica Propiedades.`,
  };
}

export default async function ComunaPage({
  params,
}: {
  params: Promise<{ comuna: string }>;
}) {
  const { comuna: slug } = await params;
  const comuna = getComunaBySlug(slug);
  if (!comuna) notFound();

  const properties = getPropertiesByComuna(comuna.slug);

  return (
    <div className="container-app py-10">
      <p className="text-sm font-semibold text-white/50">Comuna</p>
      <h1 className="text-fluid-h2 mt-2 font-bold">{comuna.nombre}</h1>
      <p className="mt-3 max-w-2xl text-white/60">{comuna.blurb}</p>
      <p className="mt-4 text-sm text-white/50">
        {properties.length} {properties.length === 1 ? "propiedad disponible" : "propiedades disponibles"}
      </p>

      {properties.length > 0 && (
        <div className="mt-6 h-56 sm:h-72">
          <CatalogMap properties={properties} />
        </div>
      )}

      {properties.length === 0 ? (
        <p className="mt-10 text-white/60">
          Por ahora no tenemos propiedades publicadas en {comuna.nombre}. Escríbenos y
          te avisamos apenas tengamos algo para ti.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
