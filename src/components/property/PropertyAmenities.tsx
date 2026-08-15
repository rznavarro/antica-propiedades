import type { Amenidad } from "@/types/property";
import { AMENIDAD_LABELS } from "@/types/property";

export function PropertyAmenities({ amenidades }: { amenidades: Amenidad[] }) {
  if (!amenidades.length) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {amenidades.map((a) => (
        <li key={a} className="flex items-center gap-2 text-sm text-white/80">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs text-accent">
            ✓
          </span>
          {AMENIDAD_LABELS[a]}
        </li>
      ))}
    </ul>
  );
}
