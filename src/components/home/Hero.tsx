import Image from "next/image";
import { SearchBar } from "@/components/catalog/SearchBar";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <Image
        src="/images/prop-8.jpg"
        alt="Interior de propiedad de lujo, bodega y living principal"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />

      <div className="container-app relative z-10 py-24">
        <h1 className="text-fluid-h1 font-extrabold leading-[0.95] tracking-tight">
          Corretaje
        </h1>
        <p className="mt-4 max-w-lg text-lg text-white/85">
          En Santiago. Arrienda y vende sin trámites, con asesoría real de principio a
          fin.
        </p>

        <div className="mt-8 max-w-xl">
          <SearchBar variant="hero" />
        </div>
      </div>
    </section>
  );
}
