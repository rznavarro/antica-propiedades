import { z } from "zod";

const operacionSchema = z.enum(["arriendo", "venta"]);

const tipoPropiedadSchema = z.enum([
  "departamento",
  "casa",
  "oficina",
  "local",
  "estacionamiento",
  "bodega",
]);

const comunaSlugSchema = z.enum([
  "santiago-centro",
  "nunoa",
  "providencia",
  "las-condes",
  "vitacura",
  "la-florida",
  "san-miguel",
  "macul",
  "independencia",
]);

const estadoPropiedadSchema = z.enum([
  "disponible",
  "reservada",
  "arrendada",
  "vendida",
]);

const etiquetaSchema = z.enum([
  "promocion",
  "precio-rebajado",
  "nuevo-ingreso",
  "destacada",
  "ultima-unidad",
  "disponibilidad-inmediata",
  "sin-comision",
]);

const amenidadSchema = z.enum([
  "estacionamiento",
  "bodega",
  "amoblado",
  "pet-friendly",
  "gimnasio",
  "piscina",
  "quincho",
  "conserjeria-24-7",
]);

const propertyMediaSchema = z.object({
  url: z.string().min(1),
  alt: z.string().min(3, "El alt de cada imagen debe ser descriptivo (SEO/accesibilidad)"),
  isCover: z.boolean(),
});

export const propertySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  referencia: z.string().min(1),
  titulo: z.string().min(1),
  operacion: operacionSchema,
  tipo: tipoPropiedadSchema,
  comuna: comunaSlugSchema,
  sector: z.string().optional(),
  direccion: z.string().optional(),
  geo: z.object({ lat: z.number(), lng: z.number() }),
  precio: z.object({
    monto: z.number().positive(),
    moneda: z.enum(["CLP", "UF"]),
    gastosComunes: z.number().nonnegative().optional(),
    precioAnterior: z.number().positive().optional(),
  }),
  superficie: z.object({
    util: z.number().positive(),
    total: z.number().positive().optional(),
  }),
  dormitorios: z.number().int().nonnegative(),
  banos: z.number().int().nonnegative(),
  estacionamientos: z.number().int().nonnegative(),
  bodegas: z.number().int().nonnegative(),
  orientacion: z.string().optional(),
  piso: z.number().int().optional(),
  anoConstruccion: z.number().int().optional(),
  descripcion: z.string().min(1),
  amenidades: z.array(amenidadSchema),
  etiquetas: z.array(etiquetaSchema),
  estado: estadoPropiedadSchema,
  media: z.array(propertyMediaSchema).min(1, "Cada propiedad necesita al menos una foto"),
  fechaPublicacion: z.string().min(1),
  fechaActualizacion: z.string().min(1),
  destacada: z.boolean(),
});

export type PropertyParsed = z.infer<typeof propertySchema>;
