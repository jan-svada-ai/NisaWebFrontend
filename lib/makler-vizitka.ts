const API_BASE = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

const VIZITKA_SLUG_PATTERN = /^[A-Za-z0-9]{2,8}$/;

export interface MaklerVizitkaInzerat {
  id: number;
  nazev: string;
  slug: string;
  cena: number | null;
  mena: string | null;
  mesto: { nazev: string } | null;
  obrazky: Array<{ url: string }>;
  atributy?: {
    estate?: Record<string, unknown>;
    estate_readable?: Record<string, unknown>;
  } | null;
}

export interface MaklerVizitkaDetail {
  id: number;
  jmeno: string;
  slug: string;
  vizitkaSlug: string | null;
  email: string | null;
  telefon: string | null;
  webUrl?: string | null;
  webButtonLabel?: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  pozice: string;
  moto: string | null;
  popis: string | null;
  fotoUrl: string | null;
  recenzeGoogleJson?: unknown;
  recenzeGoogleUrl?: string | null;
  recenzeSeznamJson?: unknown;
  recenzeSeznamUrl?: string | null;
  lokalita: string | null;
  poznamka: string | null;
  inzeraty: MaklerVizitkaInzerat[];
}

type BrokerPayload = MaklerVizitkaDetail | { data?: MaklerVizitkaDetail | null };

function isWrappedBrokerPayload(
  payload: BrokerPayload,
): payload is { data?: MaklerVizitkaDetail | null } {
  return typeof payload === "object" && payload !== null && "data" in payload;
}

function unwrapBroker(payload: BrokerPayload | null): MaklerVizitkaDetail | null {
  if (!payload) return null;
  if (isWrappedBrokerPayload(payload)) return payload.data ?? null;
  return payload;
}

export function isValidVizitkaSlug(value: string): boolean {
  return VIZITKA_SLUG_PATTERN.test(value.trim());
}

export function normalizeExternalUrl(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function fetchBrokerByVizitkaSlug(
  vizitkaSlug: string,
): Promise<MaklerVizitkaDetail | null> {
  if (!isValidVizitkaSlug(vizitkaSlug)) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE}/api/makleri/vizitka/${encodeURIComponent(vizitkaSlug)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const payload = (await response.json()) as BrokerPayload;
    return unwrapBroker(payload);
  } catch {
    return null;
  }
}
