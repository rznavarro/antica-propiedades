import type { Property } from "@/types/property";

const clpFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const ufFormatter = new Intl.NumberFormat("es-CL", {
  maximumFractionDigits: 0,
});

export function formatPrecio(precio: Property["precio"]): string {
  if (precio.moneda === "UF") return `UF ${ufFormatter.format(precio.monto)}`;
  return clpFormatter.format(precio.monto);
}

export function formatMonto(monto: number, moneda: "CLP" | "UF" = "CLP"): string {
  if (moneda === "UF") return `UF ${ufFormatter.format(monto)}`;
  return clpFormatter.format(monto);
}

export const WHATSAPP_NUMBER = "56944681615";

export function buildWhatsAppLink(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export function propertyWhatsAppMessage(property: Property): string {
  return `Hola, me interesa la propiedad "${property.titulo}" (ref. ${property.referencia}). ¿Podrían darme más información?`;
}

export function googleMapsDirectionsLink(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
