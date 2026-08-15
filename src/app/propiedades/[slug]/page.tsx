import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProperties, getPropertyBySlug, getSimilarProperties } from "@/lib/properties";
import { COMUNA_NOMBRES } from "@/lib/comuna-nombres";
import { formatPrecio, formatMonto } from "@/lib/format";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertySpecs } from "@/components/property/PropertySpecs";
import { PropertyAmenities } from "@/components/property/PropertyAmenities";
import { PropertyContactCard } from "@/components/property/PropertyContactCard";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { ShareButton } from "@/components/property/ShareButton";
import { PropertyBadgeList } from "@/components/property/PropertyBadge";
import { PropertyJsonLd } from "@/components/seo/PropertyJsonLd";

export function generateStaticParams() {
  return getAllProperties({ onlyAvailable: false }).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const comuna = COMUNA_NOMBRES[property.comuna];
  return {
    title: property.titulo,
    description: `${property.titulo} en ${comuna}. ${property.superficie.util} m², ${property.dormitorios} dormitorios, ${property.banos} baños. ${formatPrecio(property.precio)}.`,
    openGraph: {
      images: property.media[0] ? [{ url: property.media[0].url }] : undefined,
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property, 4);
  const url = `https://antica-propiedades-1mzv.vercel.app/propiedades/${property.slug}`;

  return (
    <div className="container-app py-10">
      <PropertyJsonLd property={property} url={url} />

      {property.estado !== "disponible" && (
        <div className="mb-6 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          Esta propiedad ya no está disponible ({property.estado}). Te dejamos
          propiedades similares más abajo.
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <PropertyGallery media={property.media} titulo={property.titulo} />

          <div className="mt-8">
            <PropertyBadgeList etiquetas={property.etiquetas} />
            <h1 className="text-fluid-h2 mt-3 font-bold">{property.titulo}</h1>
            <p className="mt-1 text-white/60">
              {COMUNA_NOMBRES[property.comuna]}
              {property.sector ? ` — ${property.sector}` : ""}
            </p>

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              {property.precio.precioAnterior && (
                <span className="text-white/40 line-through">
                  {formatMonto(property.precio.precioAnterior, property.precio.moneda)}
                </span>
              )}
              <span className="text-3xl font-bold text-accent">{formatPrecio(property.precio)}</span>
              {property.precio.gastosComunes && (
                <span className="text-sm text-white/50">
                  + {formatMonto(property.precio.gastosComunes)} gastos comunes
                </span>
              )}
            </div>

            <div className="mt-4">
              <ShareButton titulo={property.titulo} url={url} />
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-fluid-h3 font-bold">Ficha técnica</h2>
            <div className="mt-4">
              <PropertySpecs property={property} />
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-fluid-h3 font-bold">Descripción</h2>
            <p className="mt-4 text-white/70">{property.descripcion}</p>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-fluid-h3 font-bold">Características</h2>
            <div className="mt-4">
              <PropertyAmenities amenidades={property.amenidades} />
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-fluid-h3 font-bold">Ubicación</h2>
            <div className="mt-4 flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/15 text-sm text-white/50">
              Mapa interactivo próximamente
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${property.geo.lat},${property.geo.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-accent underline underline-offset-4"
            >
              Cómo llegar →
            </a>
          </div>

          <SimilarProperties properties={similar} />
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <PropertyContactCard property={property} />
        </div>
      </div>
    </div>
  );
}
