export type Operacion = "arriendo" | "venta";

export type TipoPropiedad =
  | "departamento"
  | "casa"
  | "oficina"
  | "local"
  | "estacionamiento"
  | "bodega";

export type ComunaSlug =
  | "santiago-centro"
  | "nunoa"
  | "providencia"
  | "las-condes"
  | "vitacura"
  | "la-florida"
  | "san-miguel"
  | "macul"
  | "independencia";

export type EstadoPropiedad = "disponible" | "reservada" | "arrendada" | "vendida";

export type Etiqueta =
  | "promocion"
  | "precio-rebajado"
  | "nuevo-ingreso"
  | "destacada"
  | "ultima-unidad"
  | "disponibilidad-inmediata"
  | "sin-comision";

export type Amenidad =
  | "estacionamiento"
  | "bodega"
  | "amoblado"
  | "pet-friendly"
  | "gimnasio"
  | "piscina"
  | "quincho"
  | "conserjeria-24-7";

export interface PropertyMedia {
  url: string;
  alt: string;
  isCover: boolean;
}

export interface Property {
  id: string;
  slug: string;
  referencia: string;
  titulo: string;
  operacion: Operacion;
  tipo: TipoPropiedad;
  comuna: ComunaSlug;
  sector?: string;
  direccion?: string;
  geo: { lat: number; lng: number };
  precio: {
    monto: number;
    moneda: "CLP" | "UF";
    gastosComunes?: number;
    precioAnterior?: number;
  };
  superficie: {
    util: number;
    total?: number;
  };
  dormitorios: number;
  banos: number;
  estacionamientos: number;
  bodegas: number;
  orientacion?: string;
  piso?: number;
  anoConstruccion?: number;
  descripcion: string;
  amenidades: Amenidad[];
  etiquetas: Etiqueta[];
  estado: EstadoPropiedad;
  media: PropertyMedia[];
  fechaPublicacion: string;
  fechaActualizacion: string;
  destacada: boolean;
}

export interface ComunaInfo {
  slug: ComunaSlug;
  nombre: string;
  blurb: string;
  heroImage: string;
  geo: { lat: number; lng: number; zoom: number };
}

export const AMENIDAD_LABELS: Record<Amenidad, string> = {
  estacionamiento: "Estacionamiento",
  bodega: "Bodega",
  amoblado: "Amoblado",
  "pet-friendly": "Acepta mascotas",
  gimnasio: "Gimnasio",
  piscina: "Piscina",
  quincho: "Quincho",
  "conserjeria-24-7": "Conserjería 24/7",
};

export const ETIQUETA_LABELS: Record<Etiqueta, string> = {
  promocion: "Promoción",
  "precio-rebajado": "Precio rebajado",
  "nuevo-ingreso": "Nuevo ingreso",
  destacada: "Destacada",
  "ultima-unidad": "Última unidad",
  "disponibilidad-inmediata": "Disponibilidad inmediata",
  "sin-comision": "Sin comisión",
};

export const TIPO_LABELS: Record<TipoPropiedad, string> = {
  departamento: "Departamento",
  casa: "Casa",
  oficina: "Oficina",
  local: "Local comercial",
  estacionamiento: "Estacionamiento",
  bodega: "Bodega",
};
