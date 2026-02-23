import type { Metadata } from "next";
import DetailPageClient from "./DetailPageClient";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

const apiBase = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

type ListingDetail = {
  nazev?: string | null;
  slug?: string | null;
  popis?: string | null;
  zmenen?: string | null;
  vytvoren?: string | null;
  cena?: number | null;
  mena?: string | null;
  typPonuky?: string | null;
  mesto?: { nazev?: string | null } | null;
  obrazky?: Array<{ url?: string | null }> | null;
};

export const revalidate = 1800;
export const dynamicParams = false;

function summarizeText(text?: string | null, max = 165): string {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

async function fetchListing(slug: string): Promise<ListingDetail | null> {
  try {
    const response = await fetch(
      `${apiBase}/api/inzeraty/slug/${encodeURIComponent(slug)}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate },
      },
    );

    if (!response.ok) return null;
    return (await response.json()) as ListingDetail;
  } catch {
    return null;
  }
}

async function fetchListingSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  const limit = 100;
  const maxPages = Number(process.env.SITEMAP_MAX_PAGES ?? "50");
  const safeMaxPages = Number.isFinite(maxPages) && maxPages > 0 ? maxPages : 50;

  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= safeMaxPages) {
    const response = await fetch(
      `${apiBase}/api/inzeraty?page=${page}&limit=${limit}&razeni=vytvoren-desc`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate },
      },
    );

    if (!response.ok) break;
    const payload = (await response.json()) as {
      data?: Array<{ slug?: string | null }>;
      pagination?: { totalPages?: number };
    };

    const pageSlugs = (payload.data ?? [])
      .map((item) => item.slug?.trim())
      .filter((item): item is string => Boolean(item));

    slugs.push(...pageSlugs);

    const nextTotal = Number(payload.pagination?.totalPages ?? totalPages);
    if (Number.isFinite(nextTotal) && nextTotal > 0) {
      totalPages = Math.min(nextTotal, safeMaxPages);
    }

    if (pageSlugs.length === 0) break;
    page += 1;
  }

  return Array.from(new Set(slugs));
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const slugs = await fetchListingSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await fetchListing(slug);
  const canonical = `${siteUrl}/nabidka/${encodeURIComponent(slug)}/`;

  if (!listing) {
    return {
      title: "Detail nabídky | Nisa Centrum Reality",
      description:
        "Detail nabídky nemovitosti od Nisa Centrum Reality. Aktuální prodej a pronájem nemovitostí.",
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }

  const titleBase = listing.nazev?.trim() || "Detail nabídky";
  const city = listing.mesto?.nazev?.trim();
  const offerKind = listing.typPonuky?.trim();
  const price =
    typeof listing.cena === "number" && listing.cena > 0
      ? `${new Intl.NumberFormat("cs-CZ").format(listing.cena)} ${
          listing.mena?.trim() || "Kč"
        }`
      : null;

  const fallbackDescription = [
    offerKind ? `${offerKind[0].toUpperCase()}${offerKind.slice(1)}` : null,
    city ? `lokalita ${city}` : null,
    price ? `cena ${price}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  const description =
    summarizeText(listing.popis) ||
    (fallbackDescription
      ? `${fallbackDescription}. Kompletní detail nabídky na webu Nisa Centrum Reality.`
      : "Kompletní detail nabídky nemovitosti na webu Nisa Centrum Reality.");

  const ogImage = listing.obrazky?.[0]?.url?.trim() || "/og-image.png";
  const pageTitle = `${titleBase} | Nisa Centrum Reality`;
  const lastModified = listing.zmenen ?? listing.vytvoren ?? undefined;

  return {
    title: pageTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: pageTitle,
      description,
      images: [{ url: ogImage }],
      ...(lastModified ? { modifiedTime: lastModified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function NabidkaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DetailPageClient slug={slug} />;
}
