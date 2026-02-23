import NabidkaPageClient, {
  type Listing,
  type ListingsResponse,
  type PaginationInfo,
} from "./NabidkaPageClient";

const API_BASE = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

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

  return (
    <NabidkaPageClient
      initialListings={listings}
      initialPagination={pagination}
    />
  );
}
