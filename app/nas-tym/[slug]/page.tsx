import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MaklerDetailClient, { type MaklerDetail } from "./MaklerDetailClient";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

const apiBase = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

type BrokerPayload = MaklerDetail | { data?: MaklerDetail | null };

export const dynamic = "force-dynamic";

function summarizeText(text?: string | null, max = 165): string {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}...`;
}

function unwrapBroker(payload: BrokerPayload | null): MaklerDetail | null {
  if (!payload) return null;
  if (isWrappedBrokerPayload(payload)) return payload.data ?? null;
  return payload;
}

function isWrappedBrokerPayload(
  payload: BrokerPayload,
): payload is { data?: MaklerDetail | null } {
  return typeof payload === "object" && payload !== null && "data" in payload;
}

async function fetchBroker(slug: string): Promise<MaklerDetail | null> {
  try {
    const response = await fetch(
      `${apiBase}/api/makleri/slug/${encodeURIComponent(slug)}`,
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

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const normalized = url.startsWith("/") ? url : `/${url}`;
  return `${siteUrl}${normalized}`;
}

function normalizeExternalUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function buildBrokerJsonLd(broker: MaklerDetail, slug: string): Record<string, unknown> {
  const canonical = `${siteUrl}/nas-tym/${encodeURIComponent(slug)}`;
  const sameAs = [broker.instagramUrl, broker.facebookUrl, broker.webUrl]
    .map((url) => (url ?? "").trim())
    .filter((url) => Boolean(url))
    .map((url) => normalizeExternalUrl(url));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${canonical}#profile-page`,
        url: canonical,
        name: broker.jmeno || "Detail maklere",
        mainEntity: {
          "@id": `${canonical}#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${canonical}#person`,
        name: broker.jmeno,
        jobTitle: broker.pozice || "Realitni makler",
        url: canonical,
        ...(broker.fotoUrl ? { image: toAbsoluteUrl(broker.fotoUrl) } : {}),
        ...(broker.email ? { email: broker.email } : {}),
        ...(broker.telefon ? { telephone: broker.telefon } : {}),
        ...(sameAs.length > 0 ? { sameAs } : {}),
        worksFor: {
          "@type": "RealEstateAgent",
          name: "Nisa Centrum Reality",
          url: siteUrl,
        },
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
            name: "Nas tym",
            item: `${siteUrl}/nas-tym`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: broker.jmeno || "Detail maklere",
            item: canonical,
          },
        ],
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const broker = await fetchBroker(slug);
  const canonical = `${siteUrl}/nas-tym/${encodeURIComponent(slug)}`;

  if (!broker) {
    return {
      title: "Detail makléře | Nisa Centrum Reality",
      description:
        "Profil realitního makléře Nisa Centrum Reality včetně kontaktu a aktivních nabídek.",
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }

  const name = broker.jmeno?.trim() || "Makléř";
  const role = broker.pozice?.trim();
  const description =
    summarizeText(broker.popis) ||
    `${name}${role ? ` - ${role}` : ""}. Kontakt na realitního makléře Nisa Centrum Reality.`;

  const pageTitle = `${name}${role ? ` | ${role}` : ""} | Nisa Centrum Reality`;
  const image = broker.fotoUrl?.trim() || "/og-image.png";

  return {
    title: pageTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      url: canonical,
      title: pageTitle,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}

export default async function NasTymSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const broker = await fetchBroker(slug);

  if (!broker) {
    notFound();
  }

  const brokerJsonLd = buildBrokerJsonLd(broker, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brokerJsonLd) }}
      />
      <MaklerDetailClient slug={slug} initialMakler={broker} />
    </>
  );
}
