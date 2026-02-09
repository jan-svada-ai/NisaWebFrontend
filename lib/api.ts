export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nisawebapi.onrender.com"
).replace(/\/+$/, "");

export function apiUrl(path: string): string {
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
