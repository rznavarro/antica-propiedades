"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(
  () => import("@/components/map/PropertyMap").then((m) => m.PropertyMap),
  {
    ssr: false,
    loading: () => <div className="h-64 animate-pulse rounded-2xl bg-white/5 sm:h-80" />,
  },
);

export { PropertyMap as PropertyMapLoader };
