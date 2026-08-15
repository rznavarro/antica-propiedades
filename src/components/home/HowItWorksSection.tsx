const STEPS = [
  { n: "01", titulo: "Cuéntanos qué buscas", desc: "Según tu presupuesto y zona preferida." },
  { n: "02", titulo: "Agenda tu visita", desc: "Por WhatsApp, correo o el formulario." },
  { n: "03", titulo: "Revisamos todo por ti", desc: "Contratos, firma electrónica y coordinación." },
  { n: "04", titulo: "Entrega de llaves", desc: "Cero burocracia innecesaria." },
];

export function HowItWorksSection() {
  return (
    <section id="how-works" className="container-app py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-fluid-h2 font-bold">¿Cómo Funciona?</h2>
        <p className="max-w-sm text-sm text-white/60">
          Te acompañamos desde la primera visita hasta la firma, con total
          transparencia.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.n} className="rounded-2xl border border-white/10 p-5">
            <p className="text-xs font-semibold text-accent">{step.n}</p>
            <p className="mt-3 font-semibold">{step.titulo}</p>
            <p className="mt-1 text-sm text-white/60">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
