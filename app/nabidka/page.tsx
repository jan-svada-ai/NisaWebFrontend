"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Home, MapPin, RotateCcw, Search } from "lucide-react";
import { fetchJsonWithRetry } from "@/lib/api";

interface Listing {
  id: number;
  nazev: string;
  slug: string;
  cena: number | null;
  mena: string | null;
  plocha: number | null;
  pokoje: number | null;
  dispozice: string | null;
  typ: string | null;
  typPonuky: string | null;
  mesto: { nazev: string } | null;
  makler: { jmeno: string } | null;
  obrazky: Array<{ url: string; alt?: string }>;
  atributy?: {
    estate?: Record<string, unknown>;
    estate_readable?: Record<string, unknown>;
  } | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ListingsResponse {
  data?: Listing[];
  pagination?: PaginationInfo;
}

interface ListingFilters {
  type: string;
  offerType: string;
  priceMin: string;
  priceMax: string;
  areaMin: string;
  areaMax: string;
  sort: string;
}

const DEFAULT_FILTERS: ListingFilters = {
  type: "",
  offerType: "",
  priceMin: "",
  priceMax: "",
  areaMin: "",
  areaMax: "",
  sort: "vytvoren-desc",
};

function readStringFromObject(
  source: Record<string, unknown> | null | undefined,
  keys: string[],
): string | null {
  if (!source) return null;

  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function resolveDisposition(listing: Listing): string | null {
  if (listing.dispozice?.trim()) return listing.dispozice.trim();

  const readable = listing.atributy?.estate_readable;
  const estate = listing.atributy?.estate;

  return (
    readStringFromObject(readable, [
      "dispozice",
      "disposition",
      "layout",
      "flat_layout",
      "object_disposition",
    ]) ??
    readStringFromObject(estate, [
      "dispozice",
      "disposition",
      "layout",
      "flat_layout",
      "object_disposition",
    ])
  );
}

function resolveCurrencyLabel(value: string | null): string {
  const normalized = (value ?? "").trim().toUpperCase();
  if (!normalized || normalized === "CZK" || normalized === "KC" || normalized === "KČ") {
    return "Kč";
  }
  return normalized;
}

export default function NabidkaPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [type, setType] = useState("");
  const [offerType, setOfferType] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [sort, setSort] = useState(DEFAULT_FILTERS.sort);

  const getCurrentFilters = (): ListingFilters => ({
    type,
    offerType,
    priceMin,
    priceMax,
    areaMin,
    areaMax,
    sort,
  });

  const fetchListings = useCallback(
    async (page: number, filters: ListingFilters) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "20",
          ...(filters.type && { typ: filters.type }),
          ...(filters.offerType && { typPonuky: filters.offerType }),
          ...(filters.priceMin && { cenaMin: filters.priceMin }),
          ...(filters.priceMax && { cenaMax: filters.priceMax }),
          ...(filters.areaMin && { plochaMin: filters.areaMin }),
          ...(filters.areaMax && { plochaMax: filters.areaMax }),
          ...(filters.sort && { razeni: filters.sort }),
        });

        setError(null);
        const result = await fetchJsonWithRetry<ListingsResponse>(
          `/api/inzeraty?${params}`,
          { timeoutMs: 25000, retries: 3, retryDelayMs: 900 },
        );

        if (result.data) {
          setListings(result.data);
          if (result.pagination) setPagination(result.pagination);
        }
      } catch (error) {
        console.error("Nepodařilo se načíst nabídky:", error);
        setError("Načítání nabídek trvá příliš dlouho. Zkuste to prosím znovu.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSearch = () => {
    void fetchListings(1, getCurrentFilters());
  };

  const handleReset = () => {
    setType(DEFAULT_FILTERS.type);
    setOfferType(DEFAULT_FILTERS.offerType);
    setPriceMin(DEFAULT_FILTERS.priceMin);
    setPriceMax(DEFAULT_FILTERS.priceMax);
    setAreaMin(DEFAULT_FILTERS.areaMin);
    setAreaMax(DEFAULT_FILTERS.areaMax);
    setSort(DEFAULT_FILTERS.sort);
    void fetchListings(1, { ...DEFAULT_FILTERS });
  };

  useEffect(() => {
    void fetchListings(1, { ...DEFAULT_FILTERS });
  }, [fetchListings]);

  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Nisa Centrum Reality
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-black md:text-5xl">
            <span className="inline-flex flex-col items-center">
              <span>Aktuální nabídka nemovitostí</span>
              <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h1>
        </div>

        <div className="mb-10 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-semibold text-black/70">
                Typ nemovitosti
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-2 block w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
              >
                <option value="">Vše</option>
                <option value="byt">Byt</option>
                <option value="dum">Dům</option>
                <option value="pozemek">Pozemek</option>
                <option value="komercni">Komerční</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black/70">
                Typ nabídky
              </label>
              <select
                value={offerType}
                onChange={(e) => setOfferType(e.target.value)}
                className="mt-2 block w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
              >
                <option value="">Vše</option>
                <option value="prodej">Prodej</option>
                <option value="pronajeti">Pronájem</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black/70">
                Cena od (Kč)
              </label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="0"
                className="mt-2 block w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black placeholder-black/40 shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black/70">
                Cena do (Kč)
              </label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="999999999"
                className="mt-2 block w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black placeholder-black/40 shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black/70">
                Plocha od (m²)
              </label>
              <input
                type="number"
                value={areaMin}
                onChange={(e) => setAreaMin(e.target.value)}
                placeholder="0"
                className="mt-2 block w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black placeholder-black/40 shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black/70">
                Plocha do (m²)
              </label>
              <input
                type="number"
                value={areaMax}
                onChange={(e) => setAreaMax(e.target.value)}
                placeholder="99999"
                className="mt-2 block w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black placeholder-black/40 shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black/70">
                Řazení
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mt-2 block w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
              >
                <option value="vytvoren-desc">Nejnovější</option>
                <option value="cena-asc">Cena vzestupně</option>
                <option value="cena-desc">Cena sestupně</option>
                <option value="plocha-asc">Plocha vzestupně</option>
                <option value="plocha-desc">Plocha sestupně</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="btn-main inline-flex items-center gap-2 rounded-xl bg-[color:var(--gold1)] px-6 py-2.5 font-semibold text-black transition disabled:opacity-50"
            >
              <Search className="h-4 w-4" />
              Hledat
            </button>
            <button
              onClick={handleReset}
              className="btn-main inline-flex items-center gap-2 rounded-xl border border-black/20 bg-white px-6 py-2.5 font-semibold text-black"
            >
              <RotateCcw className="h-4 w-4" />
              Vymazat
            </button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium text-black/60">
            Nalezeno{" "}
            <span className="font-bold text-black">{pagination.total}</span>{" "}
            nemovitostí
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-black/50">Načítání...</div>
        ) : error ? (
          <div className="py-12 text-center text-black/50">{error}</div>
        ) : listings.length === 0 ? (
          <div className="py-12 text-center text-black/50">
            Žádné nemovitosti nebyly nalezeny. Zkuste změnit filtry.
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => {
                const disposition = resolveDisposition(listing);

                return (
                  <a
                    key={listing.id}
                    href={`/nabidka/detail/?slug=${encodeURIComponent(listing.slug)}`}
                    className="group overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-black/5 to-black/10">
                      {listing.obrazky[0] ? (
                        <Image
                          src={listing.obrazky[0].url}
                          alt={listing.obrazky[0].alt || listing.nazev}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Home className="h-12 w-12 text-black/20" />
                        </div>
                      )}
                      {listing.typPonuky && (
                        <div className="absolute top-3 right-3">
                          <span className="rounded-full bg-[color:var(--gold1)] px-3 py-1 text-xs font-bold text-black">
                            {listing.typPonuky === "prodej"
                              ? "Prodej"
                              : listing.typPonuky === "pronajeti"
                                ? "Pronájem"
                                : "Dražba"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-black">
                        {listing.nazev}
                      </h3>

                      <div className="mb-4 flex items-center gap-2 text-sm text-black/70">
                        <MapPin className="h-4 w-4 text-[color:var(--gold1)]" />
                        {listing.mesto?.nazev || "N/A"}
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-3 border-y border-black/5 py-3 text-sm">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/50">
                            Cena
                          </p>
                          <p className="font-bold text-black">
                            {listing.cena && listing.cena > 0 ? (
                              <>
                                {new Intl.NumberFormat("cs-CZ").format(listing.cena)}{" "}
                                <span className="text-xs text-black/60">
                                  {resolveCurrencyLabel(listing.mena)}
                                </span>
                              </>
                            ) : (
                              "Cena na dotaz"
                            )}
                          </p>
                        </div>
                        {listing.plocha && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-black/50">
                              Plocha
                            </p>
                            <p className="font-bold text-black">{listing.plocha} m²</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {listing.typ && (
                          <span className="rounded-lg bg-black/5 px-2.5 py-1 text-xs font-semibold text-black/70">
                            {listing.typ === "byt"
                              ? "Byt"
                              : listing.typ === "dum"
                                ? "Dům"
                                : listing.typ === "pozemek"
                                  ? "Pozemek"
                                  : "Komerční"}
                          </span>
                        )}
                        {disposition && (
                          <span className="rounded-lg bg-black/5 px-2.5 py-1 text-xs font-semibold text-black/70">
                            {disposition}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {pagination.page > 1 && (
                  <button
                    onClick={() =>
                      void fetchListings(pagination.page - 1, getCurrentFilters())
                    }
                    className="btn-main inline-flex items-center gap-2 rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-semibold text-black"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Předchozí
                  </button>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => void fetchListings(pageNum, getCurrentFilters())}
                        className={`btn-main rounded-xl px-3 py-2 text-sm font-semibold ${
                          pageNum === pagination.page
                            ? "bg-[color:var(--gold1)] text-black"
                            : "border border-black/20 bg-white text-black"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ),
                  )}
                </div>

                {pagination.page < pagination.totalPages && (
                  <button
                    onClick={() =>
                      void fetchListings(pagination.page + 1, getCurrentFilters())
                    }
                    className="btn-main inline-flex items-center gap-2 rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm font-semibold text-black"
                  >
                    Další
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}



