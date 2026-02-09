"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Home } from "lucide-react";
import { apiUrl } from "@/lib/api";

interface Listing {
  id: number;
  nazev: string;
  slug: string;
  cena: number | null;
  mena: string | null;
  plocha: number | null;
  pokoje: number | null;
  typ: string | null;
  typPonuky: string | null;
  mesto: { nazev: string } | null;
  makler: { jmeno: string } | null;
  obrazky: Array<{ url: string; alt?: string }>;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
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

  // Filters
  const [type, setType] = useState("");
  const [offerType, setOfferType] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [sort, setSort] = useState("vytvoren-desc");

  const fetchListings = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "20",
          ...(type && { typ: type }),
          ...(offerType && { typPonuky: offerType }),
          ...(priceMin && { cenaMin: priceMin }),
          ...(priceMax && { cenaMax: priceMax }),
          ...(areaMin && { plochaMin: areaMin }),
          ...(areaMax && { plochaMax: areaMax }),
          ...(sort && { razeni: sort }),
        });

        const response = await fetch(apiUrl(`/api/inzeraty?${params}`));
        const result = await response.json();

        if (result.data) {
          setListings(result.data);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    },
    [type, offerType, priceMin, priceMax, areaMin, areaMax, sort],
  );

  const handleSearch = useCallback(() => {
    fetchListings(1);
  }, [fetchListings]);

  const handleReset = useCallback(() => {
    setType("");
    setOfferType("");
    setPriceMin("");
    setPriceMax("");
    setAreaMin("");
    setAreaMax("");
    setSort("vytvoren-desc");

    // počkej na promítnutí state, pak načti default
    setTimeout(() => fetchListings(1), 0);
  }, [fetchListings]);

  useEffect(() => {
    fetchListings(1);
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
        {/* Nadpis */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            NisaCentrum Reality
          </p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl text-black">
            Aktuální nabídka nemovitostí
          </h1>
          <div className="mt-4 h-[3px] w-16 rounded-full bg-[color:var(--gold1)]/70" />
        </div>

        {/* FILTERS */}
        <div className="mb-10 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Type */}
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

            {/* Offer Type */}
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

            {/* Price Min */}
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

            {/* Price Max */}
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

            {/* Area Min */}
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

            {/* Area Max */}
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

            {/* Sort */}
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

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-[color:var(--gold1)] px-6 py-2.5 font-semibold text-black transition hover:bg-[color:var(--gold2)] disabled:opacity-50"
            >
              <Search className="h-4 w-4" />
              Hledat
            </button>
            <button
              onClick={handleReset}
              className="rounded-xl border border-black/20 px-6 py-2.5 font-semibold text-black transition hover:bg-white/40"
            >
              Vymazat
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div className="mb-8">
          <p className="text-sm font-medium text-black/60">
            Nalezeno{" "}
            <span className="font-bold text-black">{pagination.total}</span>{" "}
            nemovitostí
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-black/50">Načítání...</div>
        ) : listings.length === 0 ? (
          <div className="py-12 text-center text-black/50">
            Žádné nemovitosti nebyly nalezeny. Zkuste změnit filtry.
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/nabidka/${listing.slug}`}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
                >
                  {/* Image */}
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
                    {/* Badge */}
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

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-3 font-semibold text-black line-clamp-2 text-lg">
                      {listing.nazev}
                    </h3>

                    <div className="mb-4 flex items-center gap-2 text-sm text-black/70">
                      <MapPin className="h-4 w-4 text-[color:var(--gold1)]" />
                      {listing.mesto?.nazev || "N/A"}
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-3 text-sm border-y border-black/5 py-3">
                      {listing.cena && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/50">
                            Cena
                          </p>
                          <p className="font-bold text-black">
                            {new Intl.NumberFormat("cs-CZ").format(
                              listing.cena,
                            )}{" "}
                            <span className="text-xs text-black/60">
                              {listing.mena || "Kč"}
                            </span>
                          </p>
                        </div>
                      )}
                      {listing.plocha && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/50">
                            Plocha
                          </p>
                          <p className="font-bold text-black">
                            {listing.plocha} m²
                          </p>
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2">
                {pagination.page > 1 && (
                  <button
                    onClick={() => fetchListings(pagination.page - 1)}
                    className="rounded-xl border border-black/20 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
                  >
                    Předchozí
                  </button>
                )}

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => fetchListings(pageNum)}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        pageNum === pagination.page
                          ? "bg-[color:var(--gold1)] text-black"
                          : "border border-black/20 text-black hover:bg-white/40"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {pagination.page < pagination.totalPages && (
                  <button
                    onClick={() => fetchListings(pagination.page + 1)}
                    className="rounded-xl border border-black/20 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
                  >
                    Další
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
