export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
export const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v11";

export function hasMapboxToken(): boolean {
  return MAPBOX_TOKEN.length > 0;
}
