"use client";

import { useState, type FormEvent } from "react";

export function ContactForm({ propertyRef, propertyTitulo }: { propertyRef: string; propertyTitulo: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.get("nombre"),
          telefono: form.get("telefono"),
          email: form.get("email"),
          mensaje: form.get("mensaje"),
          propertyRef,
          propertyTitulo,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-300">
        ¡Gracias! Recibimos tu mensaje y te contactaremos a la brevedad.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="nombre"
        required
        placeholder="Nombre"
        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm placeholder:text-white/40"
      />
      <input
        name="telefono"
        required
        placeholder="Teléfono"
        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm placeholder:text-white/40"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm placeholder:text-white/40"
      />
      <textarea
        name="mensaje"
        rows={3}
        placeholder="Mensaje"
        defaultValue={`Hola, me interesa la propiedad ${propertyTitulo}.`}
        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm placeholder:text-white/40"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-white py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">
          Hubo un problema al enviar. Intenta por WhatsApp mientras lo revisamos.
        </p>
      )}
    </form>
  );
}
