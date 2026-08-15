"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:9999px;background:#fba13a;border:2px solid #fff;box-shadow:0 0 0 4px rgba(251,161,58,0.35)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

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
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.marker([lat, lng], { icon: pinIcon }).addTo(map).bindPopup(titulo);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, titulo]);

  return (
    <div
      ref={containerRef}
      className="h-64 w-full overflow-hidden rounded-2xl sm:h-80"
      role="application"
      aria-label={`Mapa de ubicación de ${titulo}`}
    />
  );
}
