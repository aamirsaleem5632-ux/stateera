/**
 * Configuration for StateEra Railway Backend Integration
 */
export const RAILWAY_BACKEND_URL =
  process.env.NEXT_PUBLIC_RAILWAY_BACKEND_URL ||
  "https://stateera-backend-production.up.railway.app";

export function getBackendUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${RAILWAY_BACKEND_URL.replace(/\/$/, "")}${cleanPath}`;
}
