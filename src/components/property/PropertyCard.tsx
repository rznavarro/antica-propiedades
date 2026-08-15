"use client";

import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";
import { COMUNA_NOMBRES } from "@/lib/comuna-nombres";
import { formatPrecio } from "@/lib/format";
import { PropertyBadgeList } from "@/components/property/PropertyBadge";

export function PropertyCard({
  property,
  onHoverChange,
}: {
  property: Property;
  onHoverChange?: (id: string | null) => void;
}) {
  const cover = property.media.find((m) => m.isCover) ?? property.media[0];

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      onMouseEnter={() => onHoverChange?.(property.id)}
      onMouseLeave={() => onHoverChange?.(null)}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-white/20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={cover.url}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <PropertyBadgeList etiquetas={property.etiquetas} />
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur">
          {property.operacion === "arriendo" ? "Arriendo" : "Venta"}
        </div>
      </div>

      <div className="space-y-2 p-4">
        <p className="line-clamp-1 text-sm font-semibold text-white">{property.titulo}</p>
        <p className="text-xs text-white/50">{COMUNA_NOMBRES[property.comuna]}</p>

        <div className="flex items-baseline gap-2">
          {property.precio.precioAnterior ? (
            <span className="text-xs text-white/40 line-through">
              {formatPrecio({ ...property.precio, monto: property.precio.precioAnterior })}
            </span>
          ) : null}
          <span className="text-base font-bold text-accent">{formatPrecio(property.precio)}</span>
        </div>

        <p className="text-xs text-white/60">
          {property.superficie.util} m² · {property.dormitorios} dorm · {property.banos} baños
        </p>
      </div>
    </Link>
  );
}
