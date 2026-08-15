"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_STYLE, MAPBOX_TOKEN, hasMapboxToken } from "@/components/map/mapbox-config";

export function PropertyMap({
  lat,
  lng,
  titulo,
}: {
  lat: number;
  lng: number;
  titulo: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!hasMapboxToken() || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      center: [lng, lat],
      zoom: 15,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    new mapboxgl.Marker({ color: "#fba13a" })
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 24 }).setText(titulo))
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, titulo]);

  if (!hasMapboxToken()) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/15 px-4 text-center text-sm text-white/50">
        Mapa no configurado — agrega NEXT_PUBLIC_MAPBOX_TOKEN en las variables de
        entorno para activarlo.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-64 w-full overflow-hidden rounded-2xl sm:h-80"
      role="application"
      aria-label={`Mapa de ubicación de ${titulo}`}
    />
  );
}
