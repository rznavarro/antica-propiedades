"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import type { Property } from "@/types/property";
import {
  applyFiltersClientSide,
  countActiveFilters,
  EMPTY_FILTERS,
  filtersToParams,
  parseFiltersFromParams,
  type CatalogFilters,
} from "@/lib/catalog-filters";
import { PropertyCard } from "@/components/property/PropertyCard";
import { FilterPanel } from "@/components/catalog/FilterPanel";
import { FilterDrawer } from "@/components/catalog/FilterDrawer";
import { ActiveFilterChips } from "@/components/catalog/ActiveFilterChips";
import { EmptyState } from "@/components/catalog/EmptyState";
import { SearchBar } from "@/components/catalog/SearchBar";

const CatalogMap = dynamic(
  () => import("@/components/map/CatalogMap").then((m) => m.CatalogMap),
  { ssr: false, loading: () => <div className="h-full min-h-[420px] animate-pulse rounded-2xl bg-white/5" /> },
);

const PAGE_SIZE = 9;

export function CatalogClient({ properties }: { properties: Property[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<CatalogFilters>(() =>
    parseFiltersFromParams(searchParams),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<"lista" | "mapa">("lista");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  function updateFilters(next: CatalogFilters) {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
    const params = filtersToParams(next);
    router.replace(`/catalogo${params.toString() ? `?${params}` : ""}`, { scroll: false });
  }

  const filtered = useMemo(
    () => applyFiltersClientSide(properties, filters),
    [properties, filters],
  );
  const visible = filtered.slice(0, visibleCount);
  const activeCount = countActiveFilters(filters);

  return (
    <div className="container-app py-10">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-fluid-h2 font-bold">Catálogo de Propiedades</h1>
        <SearchBar />
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <p className="text-sm text-white/60">{filtered.length} propiedades encontradas</p>

        <div className="flex items-center gap-3">
          <select
            value={filters.sort}
            onChange={(e) => updateFilters({ ...filters, sort: e.target.value as CatalogFilters["sort"] })}
            className="rounded-lg border border-white/15 bg-ink px-3 py-2 text-xs text-white/80"
          >
            <option value="recientes">Más recientes</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
            <option value="superficie-desc">Mayor superficie</option>
          </select>

          <div className="hidden overflow-hidden rounded-lg border border-white/15 sm:flex">
            <button
              type="button"
              onClick={() => setView("lista")}
              className={`px-3 py-2 text-xs ${view === "lista" ? "bg-white/10 text-white" : "text-white/50"}`}
            >
              Lista
            </button>
            <button
              type="button"
              onClick={() => setView("mapa")}
              className={`px-3 py-2 text-xs ${view === "mapa" ? "bg-white/10 text-white" : "text-white/50"}`}
            >
              Mapa
            </button>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg border border-white/15 px-3 py-2 text-xs text-white/80 lg:hidden"
          >
            Filtros {activeCount ? `(${activeCount})` : ""}
          </button>
        </div>
      </div>

      {activeCount > 0 && (
        <div className="mt-4">
          <ActiveFilterChips filters={filters} onChange={updateFilters} />
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel
            filters={filters}
            onChange={updateFilters}
            onClear={() => updateFilters(EMPTY_FILTERS)}
            resultCount={filtered.length}
          />
        </aside>

        <div>
          {view === "mapa" ? (
            filtered.length === 0 ? (
              <EmptyState onClear={() => updateFilters(EMPTY_FILTERS)} />
            ) : (
              <div className="grid gap-5 md:h-[calc(100vh-260px)] md:min-h-[500px] md:grid-cols-[360px_1fr]">
                <div className="hidden space-y-4 overflow-y-auto pr-2 md:block">
                  {filtered.map((p) => (
                    <PropertyCard
                      key={p.id}
                      property={p}
                      onHoverChange={setHoveredId}
                      highlighted={hoveredId === p.id}
                    />
                  ))}
                </div>
                <div className="h-[420px] md:h-full">
                  <CatalogMap properties={filtered} hoveredId={hoveredId} onHoverChange={setHoveredId} />
                </div>
              </div>
            )
          ) : filtered.length === 0 ? (
            <EmptyState onClear={() => updateFilters(EMPTY_FILTERS)} />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 hover:border-white/30"
                  >
                    Cargar más propiedades
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onClear={() => updateFilters(EMPTY_FILTERS)}
        resultCount={filtered.length}
      />
    </div>
  );
}
