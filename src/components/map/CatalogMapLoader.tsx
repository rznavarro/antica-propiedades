"use client";

import dynamic from "next/dynamic";

const CatalogMap = dynamic(
  () => import("@/components/map/CatalogMap").then((m) => m.CatalogMap),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[220px] animate-pulse rounded-2xl bg-white/5" />,
  },
);

export { CatalogMap as CatalogMapLoader };
