import Link from "next/link";
import Image from "next/image";
import { getAllComunas } from "@/lib/comunas";
import { getAllProperties } from "@/lib/properties";

export function ComunaExplorer() {
  const comunas = getAllComunas();
  const properties = getAllProperties();

  const counts = comunas.map((c) => ({
    ...c,
    count: properties.filter((p) => p.comuna === c.slug).length,
  }));

  return (
    <section className="container-app py-20">
      <p className="text-sm font-semibold text-white/50">Zonas</p>
      <h2 className="text-fluid-h2 mt-2 font-bold">Explora por Comuna</h2>
      <p className="mt-3 max-w-2xl text-white/60">
        Encuentra tu próximo hogar. Contamos con propiedades en Santiago Centro,
        Ñuñoa, Providencia, Las Condes, Vitacura, La Florida, San Miguel, Macul e
        Independencia.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((c) => (
          <Link
            key={c.slug}
            href={`/comunas/${c.slug}`}
            className="group relative flex h-40 items-end overflow-hidden rounded-2xl border border-white/10 p-5"
          >
            <Image
              src={c.heroImage}
              alt={`Propiedades en ${c.nombre}`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative z-10">
              <p className="font-semibold">{c.nombre}</p>
              <p className="text-sm text-white/70">
                / {c.count} {c.count === 1 ? "propiedad" : "propiedades"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
