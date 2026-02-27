import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailPageClient, { type DetailListing } from "./DetailPageClient";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

const apiBase = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

type ListingPayload = DetailListing | { data?: DetailListing | null };

export const dynamic = "force-dynamic";

function summarizeText(text?: string | null, max = 165): string {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}...`;
}

function unwrapListing(payload: ListingPayload | null): DetailListing | null {
  if (!payload) return null;
  if (isWrappedListingPayload(payload)) return payload.data ?? null;
  return payload;
}

function isWrappedListingPayload(
  payload: ListingPayload,
): payload is { data?: DetailListing | null } {
  return typeof payload === "object" && payload !== null && "data" in payload;
}

async function fetchListing(slug: string): Promise<DetailListing | null> {
  try {
    const response = await fetch(
      `${apiBase}/api/inzeraty/slug/${encodeURIComponent(slug)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );

    if (!response.ok) return null;
    const payload = (await response.json()) as ListingPayload;
    return unwrapListing(payload);
  } catch {
    return null;
  }
}

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const normalized = url.startsWith("/") ? url : `/${url}`;
  return `${siteUrl}${normalized}`;
}

function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function getBusinessFunction(offerType?: string | null): string {
  return offerType === "pronajeti"
    ? "http://purl.org/goodrelations/v1#LeaseOut"
    : "http://purl.org/goodrelations/v1#Sell";
}

function buildListingJsonLd(listing: DetailListing, slug: string): Record<string, unknown> {
  const canonical = `${siteUrl}/nabidka/${encodeURIComponent(slug)}`;
  const priceCurrency = listing.mena?.trim() || "CZK";
  const hasPrice = typeof listing.cena === "number" && listing.cena > 0;
  const images = (listing.obrazky ?? [])
    .map((image) => image?.url?.trim())
    .filter((url): url is string => Boolean(url))
    .map((url) => toAbsoluteUrl(url));
  const city = listing.mesto?.nazev?.trim();
  const offerName = listing.nazev?.trim() || "Detail nabidky";

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    name: offerName,
    url: canonical,
    businessFunction: getBusinessFunction(listing.typPonuky),
    itemOffered: {
      "@type": "Place",
      name: offerName,
      ...(city
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: city,
              addressCountry: "CZ",
            },
          }
        : {}),
      ...(images.length > 0 ? { image: images } : {}),
    },
    seller: {
      "@type": "RealEstateAgent",
      name: "Nisa Centrum Reality",
      url: siteUrl,
    },
    ...(hasPrice
      ? {
          price: listing.cena,
          priceCurrency,
        }
      : {}),
    ...(toIsoDate(listing.zmenen ?? listing.vytvoren)
      ? { dateModified: toIsoDate(listing.zmenen ?? listing.vytvoren) }
      : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: offerName,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Uvod",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Nabidka",
            item: `${siteUrl}/nabidka`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: offerName,
            item: canonical,
          },
        ],
      },
      offer,
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await fetchListing(slug);
  const canonical = `${siteUrl}/nabidka/${encodeURIComponent(slug)}`;

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
  const listing = await fetchListing(slug);

  if (!listing) {
    notFound();
  }

  const listingJsonLd = buildListingJsonLd(listing, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <DetailPageClient slug={slug} initialListing={listing} />
    </>
  );
}
