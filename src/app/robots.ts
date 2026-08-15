import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://antica-propiedades-1mzv.vercel.app/sitemap.xml",
  };
}
