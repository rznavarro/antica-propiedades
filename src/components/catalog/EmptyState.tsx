export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-20 text-center">
      <p className="text-lg font-semibold">No encontramos propiedades con esos filtros</p>
      <p className="mt-2 max-w-sm text-sm text-white/60">
        Prueba ampliando el rango de precio, quitando alguna característica o buscando
        en otra comuna cercana.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink hover:brightness-95"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
