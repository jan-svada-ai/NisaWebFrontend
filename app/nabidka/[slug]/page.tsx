"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Home,
  Phone,
  Mail,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { apiUrl } from "@/lib/api";

interface DetailListing {
  id: number;
  nazev: string;
  slug: string;
  popis: string | null;
  cena: number | null;
  mena: string | null;
  plocha: number | null;
  pokoje: number | null;
  typ: string | null;
  typPonuky: string | null;
  stav: string;
  mesto: { nazev: string; slug: string } | null;
  makler: {
    id: number;
    jmeno: string;
    email: string | null;
    telefon: string | null;
  } | null;
  obrazky: Array<{ id: number; url: string; popis: string | null }>;
  vytvoren: string;
  zmenen: string;
}

export default function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [listing, setListing] = useState<DetailListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(apiUrl(`/api/inzeraty/slug/${slug}`));
        const result = await response.json();
        setListing(result.data ?? result);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  if (loading) {
    return (
      <main
        className="min-h-screen pt-20"
        style={{
          background:
            "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
        }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-12">
          <div className="text-center py-12 text-black/50">
            Načítání detailů...
          </div>
        </div>
      </main>
    );
  }

  if (!listing) {
    return (
      <main
        className="min-h-screen pt-20"
        style={{
          background:
            "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
        }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-12">
          <Link
            href="/nabidka"
            className="inline-flex items-center gap-2 text-black/70 hover:text-black mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na nabídku
          </Link>
          <div className="text-center py-12 text-black/50">
            Inzerát nebyl nalezen.
          </div>
        </div>
      </main>
    );
  }

  const hasImages = listing.obrazky && listing.obrazky.length > 0;

  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        {/* Zpět na seznam */}
        <Link
          href="/nabidka"
          className="inline-flex items-center gap-2 text-black/70 hover:text-black mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět na nabídku
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Galerie - Levá strana */}
          <div className="lg:col-span-2">
            {/* Hlavní obrázek */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-black/5 to-black/10 mb-4 cursor-pointer group"
            >
              {hasImages ? (
                <>
                  <Image
                    src={listing.obrazky[selectedImage].url}
                    alt={listing.nazev}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
                      Klikni pro zvětšení
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Home className="h-16 w-16 text-black/20" />
                </div>
              )}

              {/* Šipky pro přepínání */}
              {hasImages && listing.obrazky.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(
                        (prev) =>
                          (prev - 1 + listing.obrazky.length) %
                          listing.obrazky.length,
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6 text-black" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(
                        (prev) => (prev + 1) % listing.obrazky.length,
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition hover:bg-white"
                  >
                    <ChevronRight className="h-6 w-6 text-black" />
                  </button>

                  {/* Počitadlo */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {selectedImage + 1} / {listing.obrazky.length}
                  </div>
                </>
              )}

              {/* Badge */}
              <div className="absolute top-4 right-4 flex gap-2">
                {listing.typPonuky && (
                  <span className="rounded-full bg-[color:var(--gold1)] px-4 py-2 text-sm font-bold text-black">
                    {listing.typPonuky === "prodej"
                      ? "Prodej"
                      : listing.typPonuky === "pronajeti"
                        ? "Pronájem"
                        : "Dražba"}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnaily */}
            {hasImages && listing.obrazky.length > 1 && (
              <div className="grid gap-3 grid-cols-4">
                {listing.obrazky.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-24 overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === idx
                        ? "border-[color:var(--gold1)]"
                        : "border-black/10"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${listing.nazev} ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Info - Specifikace */}
            <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Parametry nemovitosti
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {listing.cena && (
                  <div className="rounded-xl bg-black/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-black/50">
                      Cena
                    </p>
                    <p className="text-xl font-bold text-black mt-1">
                      {new Intl.NumberFormat("cs-CZ").format(listing.cena)}{" "}
                      <span className="text-sm text-black/60">
                        {listing.mena || "Kč"}
                      </span>
                    </p>
                  </div>
                )}
                {listing.plocha && (
                  <div className="rounded-xl bg-black/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-black/50">
                      Plocha
                    </p>
                    <p className="text-xl font-bold text-black mt-1">
                      {listing.plocha} m²
                    </p>
                  </div>
                )}
                {listing.pokoje && (
                  <div className="rounded-xl bg-black/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-black/50">
                      Pokoje
                    </p>
                    <p className="text-xl font-bold text-black mt-1">
                      {listing.pokoje}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Popis */}
            {listing.popis && (
              <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold mb-4 text-black">Popis</h2>
                <div className="text-black/80 leading-relaxed whitespace-pre-line">
                  {listing.popis}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR - Pravá strana */}
          <div className="lg:col-span-1">
            {/* Základní info */}
            <div className="rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur-sm sticky top-24">
              <h1 className="text-2xl font-bold text-black mb-3">
                {listing.nazev}
              </h1>

              <div className="flex items-start gap-2 mb-6 pb-6 border-b border-black/10">
                <MapPin className="h-5 w-5 text-[color:var(--gold1)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-black/60 text-sm">Lokalita</p>
                  <p className="font-semibold text-black">
                    {listing.mesto?.nazev || "Neuvedeno"}
                  </p>
                </div>
              </div>

              {/* Typ */}
              {listing.typ && (
                <div className="mb-6 pb-6 border-b border-black/10">
                  <p className="text-xs uppercase tracking-wide text-black/50 mb-2">
                    Typ nemovitosti
                  </p>
                  <span className="inline-block rounded-lg bg-black/5 px-3 py-1.5 font-semibold text-black">
                    {listing.typ === "byt"
                      ? "Byt"
                      : listing.typ === "dum"
                        ? "Dům"
                        : listing.typ === "pozemek"
                          ? "Pozemek"
                          : "Komerční"}
                  </span>
                </div>
              )}

              {/* Makléř */}
              {listing.makler && (
                <div className="mb-6 rounded-xl bg-gradient-to-br from-[color:var(--gold1)]/10 to-black/5 p-4 border border-[color:var(--gold1)]/20">
                  <p className="text-xs uppercase tracking-wide text-black/50 mb-3">
                    Váš makléř
                  </p>
                  <p className="font-semibold text-black mb-3">
                    {listing.makler.jmeno}
                  </p>

                  {listing.makler.telefon && (
                    <a
                      href={`tel:${listing.makler.telefon}`}
                      className="flex items-center gap-2 text-black/70 hover:text-black transition mb-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{listing.makler.telefon}</span>
                    </a>
                  )}

                  {listing.makler.email && (
                    <a
                      href={`mailto:${listing.makler.email}`}
                      className="flex items-center gap-2 text-black/70 hover:text-black transition"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{listing.makler.email}</span>
                    </a>
                  )}
                </div>
              )}

              {/* CTA Tlačítka */}
              <div className="mt-6 space-y-3">
                <a
                  href={
                    listing.makler?.telefon
                      ? `tel:${listing.makler.telefon}`
                      : "#"
                  }
                  className="block w-full rounded-xl bg-[color:var(--gold1)] py-3 text-center font-semibold text-black transition hover:bg-[color:var(--gold2)]"
                >
                  Zavolat
                </a>
                <a
                  href={
                    listing.makler?.email
                      ? `mailto:${listing.makler.email}`
                      : "#"
                  }
                  className="block w-full rounded-xl border border-black/20 py-3 text-center font-semibold text-black transition hover:bg-white/40"
                >
                  Napsat zprávu
                </a>
              </div>

              {/* Metadata */}
              <div className="mt-6 pt-6 border-t border-black/10 text-xs text-black/50">
                <p>ID inzerátu: {listing.id}</p>
                <p>
                  Publikováno:{" "}
                  {new Date(listing.vytvoren).toLocaleDateString("cs-CZ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {isLightboxOpen && hasImages && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
            {/* Zavřít */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/30 text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Hlavní obrázek */}
            <div className="relative w-full h-full">
              <Image
                src={listing.obrazky[selectedImage].url}
                alt={listing.nazev}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>

            {/* Šipky */}
            {listing.obrazky.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage(
                      (prev) =>
                        (prev - 1 + listing.obrazky.length) %
                        listing.obrazky.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition hover:bg-white/30 text-white"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(
                      (prev) => (prev + 1) % listing.obrazky.length,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition hover:bg-white/30 text-white"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Počitadlo */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {selectedImage + 1} / {listing.obrazky.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
