const ITEMS = [
  {
    numero: "4",
    label: "Años de experiencia",
    footer: "Trabajando con familias, inversionistas y empresas en Santiago.",
  },
  {
    numero: "+800",
    label: "Propiedades gestionadas",
    footer: "Corredora certificada, respaldada por sellos de la industria.",
  },
];

export function AboutSection() {
  return (
    <section className="container-app py-20">
      <p className="text-sm font-semibold text-white/50">Quiénes Somos</p>
      <h2 className="text-fluid-h2 mt-2 max-w-2xl font-bold">
        Hacemos del corretaje una experiencia distinta
      </h2>

      <p className="mt-6 max-w-2xl text-white/70">
        En Antica creemos que encontrar un hogar o vender una propiedad no debería ser
        un trámite. Por eso acompañamos a cada cliente desde la primera visita hasta la
        firma, con asesoría personalizada y total transparencia. Llevamos cuatro años
        trabajando con familias, inversionistas y empresas en Santiago.
      </p>

      <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <div key={item.label}>
            <p className="text-3xl font-bold">{item.numero}</p>
            <p className="mt-1 text-sm text-white/80">{item.label}</p>
            <p className="mt-3 text-xs text-white/50">{item.footer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
