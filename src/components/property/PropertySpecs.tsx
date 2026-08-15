import type { Property } from "@/types/property";

export function PropertySpecs({ property }: { property: Property }) {
  const rows: [string, string | number | undefined][] = [
    ["Superficie útil", `${property.superficie.util} m²`],
    ["Superficie total", property.superficie.total ? `${property.superficie.total} m²` : undefined],
    ["Dormitorios", property.dormitorios],
    ["Baños", property.banos],
    ["Estacionamientos", property.estacionamientos],
    ["Bodegas", property.bodegas],
    ["Orientación", property.orientacion],
    ["Piso", property.piso],
    ["Año de construcción", property.anoConstruccion],
  ].filter(([, v]) => v !== undefined && v !== "" && v !== 0) as [string, string | number][];

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs text-white/50">{label}</dt>
          <dd className="mt-0.5 font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
