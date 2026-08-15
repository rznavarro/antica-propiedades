import Link from "next/link";
import { getFeaturedProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/property/PropertyCard";

export function FeaturedProperties() {
  const properties = getFeaturedProperties(5);

  return (
    <section id="retreats" className="container-app py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-fluid-h2 font-bold">Propiedades Destacadas</h2>
        <p className="max-w-sm text-sm text-white/60">
          Departamentos seleccionados con criterio para arriendo en las mejores
          comunas de Santiago.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}

        <Link
          href="/catalogo"
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 p-8 text-center transition hover:border-white/40"
        >
          <p className="text-lg font-semibold">¿Buscas otra comuna?</p>
          <p className="mt-2 text-sm text-white/60">Ver catálogo completo →</p>
        </Link>
      </div>
    </section>
  );
}
