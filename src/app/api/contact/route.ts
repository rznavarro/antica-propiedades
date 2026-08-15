import { NextResponse } from "next/server";

interface ContactPayload {
  nombre?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  propertyRef?: string;
  propertyTitulo?: string;
}

// Contact form endpoint. Today it just validates + logs; wire RESEND_API_KEY
// (or whatever email/CRM the client already uses) here to actually deliver
// the message to contacto@anticapropiedades.cl.
export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body.nombre || !body.telefono || !body.email) {
    return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Antica Propiedades <onboarding@resend.dev>",
          to: "contacto@anticapropiedades.cl",
          subject: `Nuevo contacto: ${body.propertyTitulo ?? "Consulta general"}`,
          text: `Nombre: ${body.nombre}\nTeléfono: ${body.telefono}\nEmail: ${body.email}\nPropiedad: ${body.propertyTitulo ?? "-"} (${body.propertyRef ?? "-"})\n\nMensaje:\n${body.mensaje ?? ""}`,
        }),
      });
    } catch (err) {
      console.error("Error enviando email de contacto:", err);
      return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 502 });
    }
  } else {
    // No email provider configured yet — log so the lead isn't silently lost.
    console.log("Nuevo contacto (sin RESEND_API_KEY configurado):", body);
  }

  return NextResponse.json({ ok: true });
}
