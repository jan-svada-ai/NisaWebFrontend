import type { Metadata } from "next";
import MaklerDetailClient from "./MaklerDetailClient";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

const apiBase = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

type BrokerDetail = {
  jmeno?: string | null;
  slug?: string | null;
  pozice?: string | null;
  popis?: string | null;
  zmenen?: string | null;
  vytvoren?: string | null;
  fotoUrl?: string | null;
};

export const revalidate = 1800;
export const dynamicParams = false;

function summarizeText(text?: string | null, max = 165): string {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

async function fetchBroker(slug: string): Promise<BrokerDetail | null> {
  try {
    const response = await fetch(
      `${apiBase}/api/makleri/slug/${encodeURIComponent(slug)}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate },
      },
    );

    if (!response.ok) return null;
    return (await response.json()) as BrokerDetail;
  } catch {
    return null;
  }
}

async function fetchBrokerSlugs(): Promise<string[]> {
  const response = await fetch(`${apiBase}/api/makleri`, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });

  if (!response.ok) return [];
  const payload = (await response.json()) as {
    data?: Array<{ slug?: string | null }>;
  };

  return Array.from(
    new Set(
      (payload.data ?? [])
        .map((item) => item.slug?.trim())
        .filter((item): item is string => Boolean(item)),
    ),
  );
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const slugs = await fetchBrokerSlugs();
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
  const broker = await fetchBroker(slug);
  const canonical = `${siteUrl}/nas-tym/${encodeURIComponent(slug)}/`;

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
    `${name}${role ? ` – ${role}` : ""}. Kontakt na realitního makléře Nisa Centrum Reality.`;

  const pageTitle = `${name}${role ? ` | ${role}` : ""} | Nisa Centrum Reality`;
  const image = broker.fotoUrl?.trim() || "/og-image.png";
  const lastModified = broker.zmenen ?? broker.vytvoren ?? undefined;

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
      ...(lastModified ? { modifiedTime: lastModified } : {}),
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
  return <MaklerDetailClient slug={slug} />;
}
