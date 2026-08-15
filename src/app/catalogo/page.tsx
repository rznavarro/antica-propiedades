import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProperties } from "@/lib/properties";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { PropertyGridSkeleton } from "@/components/catalog/PropertyCardSkeleton";

export const metadata: Metadata = {
  title: "Catálogo de Propiedades",
  description:
    "Explora todas las propiedades disponibles de Antica en Santiago: filtra por comuna, precio, dormitorios y más.",
};

export default function CatalogoPage() {
  const properties = getAllProperties();

  return (
    <Suspense
      fallback={
        <div className="container-app py-10">
          <PropertyGridSkeleton count={9} />
        </div>
      }
    >
      <CatalogClient properties={properties} />
    </Suspense>
  );
}
