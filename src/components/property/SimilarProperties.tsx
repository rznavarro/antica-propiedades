import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property/PropertyCard";

export function SimilarProperties({ properties }: { properties: Property[] }) {
  if (!properties.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-fluid-h3 font-bold">Propiedades similares</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
