export const SITE_URL = "https://www.nisacentrum.cz";
export const SHORT_SITE_URL = SITE_URL.replace("://www.", "://");

export function toAbsoluteUrl(
  path = "/",
  options?: { shortHost?: boolean },
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = options?.shortHost ? SHORT_SITE_URL : SITE_URL;
  return `${baseUrl}${normalizedPath}`;
}

export function toDisplayUrl(
  path = "/",
  options?: { shortHost?: boolean },
): string {
  return toAbsoluteUrl(path, options).replace(/^https?:\/\//i, "");
}
