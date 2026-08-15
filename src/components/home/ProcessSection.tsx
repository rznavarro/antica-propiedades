const STEPS = [
  { n: "01", titulo: "Elige una propiedad", desc: "Explora el catálogo o contáctanos directamente según tu presupuesto y zona." },
  { n: "02", titulo: "Agenda tu visita", desc: "Por WhatsApp, correo o el formulario. Respondemos en menos de 24 horas." },
  { n: "03", titulo: "Revisión y firma", desc: "Revisamos el contrato contigo y coordinamos la firma electrónica." },
  { n: "04", titulo: "Entrega de llaves", desc: "Nosotros hacemos el resto. Cero burocracia innecesaria." },
];

export function ProcessSection() {
  return (
    <section className="container-app py-20">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
        <h2 className="text-fluid-h2 font-bold">Todo en un solo proceso</h2>
        <div className="flex gap-6 text-sm text-white/50">
          <span>+ Visita</span>
          <span>+ Contrato</span>
          <span>+ Entrega</span>
        </div>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.n}>
            <p className="text-2xl font-bold text-white/30">{step.n}</p>
            <p className="mt-2 font-semibold">{step.titulo}</p>
            <p className="mt-1 text-sm text-white/60">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
