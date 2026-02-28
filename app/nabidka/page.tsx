import NabidkaPageClient, {
  type Listing,
  type ListingsResponse,
  type PaginationInfo,
} from "./NabidkaPageClient";
import { SITE_URL } from "@/lib/site-url";

const API_BASE = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

export const dynamic = "force-dynamic";

const DEFAULT_PAGINATION: PaginationInfo = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
};

async function getInitialListings(): Promise<{
  listings: Listing[];
  pagination: PaginationInfo;
}> {
  try {
    const response = await fetch(
      `${API_BASE}/api/inzeraty?page=1&limit=20&razeni=vytvoren-desc`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return {
        listings: [],
        pagination: DEFAULT_PAGINATION,
      };
    }

    const payload = (await response.json()) as ListingsResponse;
    const listings = Array.isArray(payload.data) ? payload.data : [];
    const pagination = payload.pagination
      ? payload.pagination
      : {
          ...DEFAULT_PAGINATION,
          total: listings.length,
        };

    return { listings, pagination };
  } catch {
    return {
      listings: [],
      pagination: DEFAULT_PAGINATION,
    };
  }
}

export default async function NabidkaPage() {
  const { listings, pagination } = await getInitialListings();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Aktu�ln� nab�dka nemovitost� | Nisa Centrum Reality",
    url: `${SITE_URL}/nabidka`,
    about: {
      "@id": `${SITE_URL}#real-estate-agent`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: pagination.total ?? listings.length,
      itemListElement: listings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "RealEstateListing",
          name: listing.nazev,
          url: `${SITE_URL}/nabidka/${encodeURIComponent(listing.slug)}`,
          image: listing.obrazky?.[0]?.url ?? undefined,
          offers:
            typeof listing.cena === "number" && listing.cena > 0
              ? {
                  "@type": "Offer",
                  price: listing.cena,
                  priceCurrency: listing.mena || "CZK",
                }
              : undefined,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NabidkaPageClient
        initialListings={listings}
        initialPagination={pagination}
      />
    </>
  );
}
