"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { createRoot, type Root } from "react-dom/client";
import type { Property } from "@/types/property";
import { formatPrecio } from "@/lib/format";
import { COMUNA_NOMBRES } from "@/lib/comuna-nombres";

function PriceBadge({ property, active }: { property: Property; active: boolean }) {
  return (
    <div
      className={`cursor-pointer whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold shadow-lg transition ${
        active ? "scale-110 border-white bg-accent text-ink" : "border-white/30 bg-ink text-white"
      }`}
    >
      {formatPrecio(property.precio)}
    </div>
  );
}

function PopupCard({ property }: { property: Property }) {
  const cover = property.media.find((m) => m.isCover) ?? property.media[0];
  return (
    <a href={`/propiedades/${property.slug}`} className="block w-56 text-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cover.url} alt={cover.alt} className="h-28 w-full rounded-t-lg object-cover" />
      <div className="space-y-1 p-2">
        <p className="line-clamp-1 text-xs font-semibold">{property.titulo}</p>
        <p className="text-[11px] text-black/60">{COMUNA_NOMBRES[property.comuna]}</p>
        <p className="text-sm font-bold text-orange-600">{formatPrecio(property.precio)}</p>
        <p className="text-[11px] text-black/60">
          {property.superficie.util} m² · {property.dormitorios} dorm · {property.banos} baños
        </p>
        <p className="pt-1 text-[11px] font-semibold text-orange-600">Ver propiedad →</p>
      </div>
    </a>
  );
}

export function CatalogMap({
  properties,
  hoveredId,
  onHoverChange,
}: {
  properties: Property[];
  hoveredId?: string | null;
  onHoverChange?: (id: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const rootsRef = useRef<Map<string, Root>>(new Map());

  // Init map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-33.46, -70.62],
      zoom: 11,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    const roots = rootsRef.current;

    return () => {
      roots.forEach((root) => root.unmount());
      roots.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync markers whenever the filtered property list changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();
    rootsRef.current.forEach((root) => root.unmount());
    rootsRef.current.clear();

    const points: L.LatLngExpression[] = [];

    properties.forEach((property) => {
      const icon = L.divIcon({ className: "", html: "", iconSize: [1, 1] });
      const marker = L.marker([property.geo.lat, property.geo.lng], { icon }).addTo(map);

      const el = marker.getElement();
      if (el) {
        const root = createRoot(el);
        root.render(<PriceBadge property={property} active={hoveredId === property.id} />);
        rootsRef.current.set(property.id, root);

        el.addEventListener("mouseenter", () => onHoverChange?.(property.id));
        el.addEventListener("mouseleave", () => onHoverChange?.(null));
      }

      const popupEl = document.createElement("div");
      createRoot(popupEl).render(<PopupCard property={property} />);
      marker.bindPopup(popupEl);

      markersRef.current.set(property.id, marker);
      points.push([property.geo.lat, property.geo.lng]);
    });

    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [60, 60], maxZoom: 14 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  // Re-render badges when hover state changes (without rebuilding markers).
  useEffect(() => {
    rootsRef.current.forEach((root, id) => {
      const property = properties.find((p) => p.id === id);
      if (!property) return;
      root.render(<PriceBadge property={property} active={hoveredId === id} />);
    });
  }, [hoveredId, properties]);

  return <div ref={containerRef} className="h-full min-h-[420px] w-full rounded-2xl" />;
}
