const STATS = [
  { value: "4 Años", label: "Experiencia en la RM" },
  { value: "+800 Propiedades", label: "Gestionadas con éxito" },
  { value: "98% Satisfacción", label: "De nuestros clientes" },
];

export function StatsSection() {
  return (
    <section className="container-app py-20">
      <p className="text-sm font-semibold text-white/50">Antica</p>
      <h2 className="text-fluid-h2 mt-2 max-w-2xl font-bold">
        Más de 800 propiedades gestionadas con éxito en la Región Metropolitana
      </h2>

      <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-lg font-bold">{s.value}</p>
            <p className="mt-1 text-sm text-white/50">/ {s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
