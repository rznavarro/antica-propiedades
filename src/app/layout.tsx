import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://antica-propiedades-1mzv.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Antica Propiedades — Corretaje en Santiago",
    template: "%s | Antica Propiedades",
  },
  description:
    "Arrienda y vende sin trámites en Santiago. Asesoría real de principio a fin, con más de 800 propiedades gestionadas en la Región Metropolitana.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Antica Propiedades",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
