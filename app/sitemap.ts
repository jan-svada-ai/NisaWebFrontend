import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";
export const revalidate = 1800;

const siteUrl = SITE_URL;

const apiBase = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

type ListingItem = {
  slug?: string | null;
  vytvoren?: string | null;
  zmenen?: string | null;
  obrazky?: Array<{ url?: string | null }> | null;
};

type ListingsResponse = {
  data?: ListingItem[];
  pagination?: {
    page?: number;
    totalPages?: number;
  };
};

type BrokerItem = {
  slug?: string | null;
  vytvoren?: string | null;
  zmenen?: string | null;
  fotoUrl?: string | null;
};

type BrokersResponse = {
  data?: BrokerItem[];
};

type StaticRoute = {
  route: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticRoutes: StaticRoute[] = [
  { route: "/", changeFrequency: "daily", priority: 1 },
  {
    route: "/prodej-pronajem",
    changeFrequency: "weekly",
    priority: 0.92,
  },
  {
    route: "/vyhledavani-na-miru",
    changeFrequency: "weekly",
    priority: 0.92,
  },
  {
    route: "/tipni-realitu",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    route: "/oceneni-zdarma",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    route: "/co-vse-pro-vas-udelame",
    changeFrequency: "weekly",
    priority: 0.88,
  },
  { route: "/nabidka", changeFrequency: "daily", priority: 0.95 },
  { route: "/nas-tym", changeFrequency: "weekly", priority: 0.9 },
  { route: "/reference", changeFrequency: "weekly", priority: 0.82 },
  { route: "/kontakt", changeFrequency: "monthly", priority: 0.82 },
  { route: "/cookies", changeFrequency: "yearly", priority: 0.35 },
  { route: "/gdpr", changeFrequency: "yearly", priority: 0.35 },
  {
    route: "/zpracovani-osobnich-udaju-oceneni",
    changeFrequency: "yearly",
    priority: 0.35,
  },
];

function toDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

const staticLastModified = toDate(process.env.SITEMAP_STATIC_LASTMOD);

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${path}`);
  }

  return (await response.json()) as T;
}

async function fetchAllListings(): Promise<ListingItem[]> {
  const limit = 100;
  const parsedMaxPages = Number.parseInt(
    process.env.SITEMAP_MAX_PAGES ?? "50",
    10,
  );
  const maxPages =
    Number.isFinite(parsedMaxPages) && parsedMaxPages > 0
      ? parsedMaxPages
      : 50;
  const allItems: ListingItem[] = [];

  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= maxPages) {
    const payload = await fetchJson<ListingsResponse>(
      `/api/inzeraty?page=${page}&limit=${limit}&razeni=vytvoren-desc`,
    );

    const items = Array.isArray(payload.data) ? payload.data : [];
    allItems.push(...items);

    const nextTotalPages = Number(payload.pagination?.totalPages ?? totalPages);
    totalPages =
      Number.isFinite(nextTotalPages) && nextTotalPages > 0
        ? Math.min(nextTotalPages, maxPages)
        : totalPages;

    if (items.length === 0) break;
    page += 1;
  }

  return allItems;
}

async function fetchAllBrokers(): Promise<BrokerItem[]> {
  const payload = await fetchJson<BrokersResponse>("/api/makleri");
  return Array.isArray(payload.data) ? payload.data : [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generatedAt = new Date();
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const item of staticRoutes) {
    const url = `${siteUrl}${item.route}`;
    const staticEntry: MetadataRoute.Sitemap[number] = {
      url,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      ...(staticLastModified ? { lastModified: staticLastModified } : {}),
    };

    entries.set(url, staticEntry);
  }

  try {
    const [listings, brokers] = await Promise.all([
      fetchAllListings(),
      fetchAllBrokers(),
    ]);

    for (const listing of listings) {
      const slug = listing.slug?.trim();
      if (!slug) continue;

      const url = `${siteUrl}/nabidka/${encodeURIComponent(slug)}`;
      const coverImage = listing.obrazky?.[0]?.url?.trim() || undefined;

      entries.set(url, {
        url,
        lastModified:
          toDate(listing.zmenen) ?? toDate(listing.vytvoren) ?? generatedAt,
        changeFrequency: "weekly",
        priority: 0.8,
        ...(coverImage ? { images: [coverImage] } : {}),
      });
    }

    for (const broker of brokers) {
      const slug = broker.slug?.trim();
      if (!slug) continue;

      const url = `${siteUrl}/nas-tym/${encodeURIComponent(slug)}`;
      const photo = broker.fotoUrl?.trim() || undefined;

      entries.set(url, {
        url,
        lastModified:
          toDate(broker.zmenen) ?? toDate(broker.vytvoren) ?? generatedAt,
        changeFrequency: "weekly",
        priority: 0.75,
        ...(photo ? { images: [photo] } : {}),
      });
    }
  } catch (error) {
    console.error("Sitemap dynamic load failed, using static routes only:", error);
  }

  return Array.from(entries.values()).sort((a, b) => a.url.localeCompare(b.url));
}

