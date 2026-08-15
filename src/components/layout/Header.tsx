import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#how-works", label: "Cómo Funciona" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          Antica Propiedades
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/catalogo"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white/90 md:inline-block"
        >
          Ver Catálogo
        </Link>

        {/* Mobile nav: simple links row (no JS menu needed for this scope) */}
        <nav className="flex items-center gap-4 md:hidden">
          <Link href="/catalogo" className="text-sm font-semibold underline underline-offset-4">
            Catálogo
          </Link>
        </nav>
      </div>
    </header>
  );
}
