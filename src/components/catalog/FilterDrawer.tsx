"use client";

import { useEffect } from "react";
import type { CatalogFilters } from "@/lib/catalog-filters";
import { FilterPanel } from "@/components/catalog/FilterPanel";

export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onClear,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  onClear: () => void;
  resultCount: number;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Cerrar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-ink p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold">Filtros</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/70"
          >
            Cerrar
          </button>
        </div>
        <FilterPanel
          filters={filters}
          onChange={onChange}
          onClear={onClear}
          resultCount={resultCount}
        />
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-ink"
        >
          Ver {resultCount} resultados
        </button>
      </div>
    </div>
  );
}
