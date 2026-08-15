"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import comunasData from "@/data/comunas.json";
import type { ComunaInfo } from "@/types/property";

const comunas = comunasData as ComunaInfo[];

export function SearchBar({ variant = "default" }: { variant?: "hero" | "default" }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const needle = value.trim().toLowerCase();
    if (!needle) return [];
    return comunas.filter((c) => c.nombre.toLowerCase().includes(needle)).slice(0, 5);
  }, [value]);

  function goToCatalogo(q: string) {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/catalogo?${params.toString()}`);
  }

  return (
    <div ref={containerRef} className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          goToCatalogo(value);
        }}
        className={`flex items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1.5 backdrop-blur ${
          variant === "hero" ? "shadow-xl" : ""
        }`}
      >
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          type="text"
          placeholder="Busca por comuna, sector o referencia (ej: Ñuñoa, Metro Manquehue)"
          className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-95"
        >
          Buscar
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl">
          {suggestions.map((c) => (
            <li key={c.slug}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => router.push(`/comunas/${c.slug}`)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white/85 hover:bg-white/5"
              >
                <span>{c.nombre}</span>
                <span className="text-xs text-white/40">Ver comuna →</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
