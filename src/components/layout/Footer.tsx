import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink">
      <div className="container-app grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">Antica Propiedades</p>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Corretaje sin trámites en Santiago. Arrienda y vende con asesoría real de
            principio a fin.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white/40">Navegación</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/catalogo" className="text-white/80 hover:text-white">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/#how-works" className="text-white/80 hover:text-white">
                Cómo Funciona
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white/40">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="tel:+56944681615" className="text-white/80 hover:text-white">
                +56 9 4468 1615
              </a>
            </li>
            <li>
              <a
                href="mailto:contacto@anticapropiedades.cl"
                className="text-white/80 hover:text-white"
              >
                contacto@anticapropiedades.cl
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-app text-xs text-white/40">
          © Todos los derechos reservados. Antica Propiedades, {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}
