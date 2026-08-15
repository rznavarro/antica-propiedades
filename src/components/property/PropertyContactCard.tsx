import { buildWhatsAppLink, propertyWhatsAppMessage } from "@/lib/format";
import { ContactForm } from "@/components/property/ContactForm";
import type { Property } from "@/types/property";

export function PropertyContactCard({ property }: { property: Property }) {
  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <a
        href={buildWhatsAppLink(propertyWhatsAppMessage(property))}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
      >
        Escribir por WhatsApp
      </a>

      <a
        href={buildWhatsAppLink(
          `Hola, quiero agendar una visita para "${property.titulo}" (ref. ${property.referencia}).`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-semibold text-white hover:border-white/40"
      >
        Agendar visita
      </a>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-medium text-white/70">O escríbenos directamente</p>
        <ContactForm propertyRef={property.referencia} propertyTitulo={property.titulo} />
      </div>
    </div>
  );
}
