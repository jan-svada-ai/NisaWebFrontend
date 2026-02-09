import DetailPageClient from "./DetailPageClient";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nisawebapi.onrender.com";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_BASE}/api/inzeraty?limit=1000&page=1`, {
      cache: "force-cache",
    });

    if (!response.ok) return [];

    const result = await response.json();
    const listings = Array.isArray(result?.data) ? result.data : [];

    return listings
      .map((item: { slug?: string | null }) => item.slug)
      .filter((slug: string | null | undefined): slug is string => Boolean(slug))
      .map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DetailPageClient slug={slug} />;
}
