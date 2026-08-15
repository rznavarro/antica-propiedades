import type { Property } from "@/types/property";

export function PropertyJsonLd({ property, url }: { property: Property; url: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.titulo,
    description: property.descripcion,
    image: property.media.map((m) => `https://antica-propiedades-1mzv.vercel.app${m.url}`),
    offers: {
      "@type": "Offer",
      priceCurrency: property.precio.moneda,
      price: property.precio.monto,
      availability:
        property.estado === "disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Superficie útil", value: `${property.superficie.util} m²` },
      { "@type": "PropertyValue", name: "Dormitorios", value: property.dormitorios },
      { "@type": "PropertyValue", name: "Baños", value: property.banos },
      { "@type": "PropertyValue", name: "Comuna", value: property.comuna },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
