"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Home,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { fetchJsonWithRetry } from "@/lib/api";

interface DetailListing {
  id: number;
  nazev: string;
  slug: string;
  popis: string | null;
  cena: number | null;
  mena: string | null;
  plocha: number | null;
  pokoje: number | null;
  dispozice: string | null;
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
  atributy?: {
    estate?: Record<string, unknown>;
    estate_readable?: Record<string, unknown>;
  } | null;
  vytvoren: string;
  zmenen: string;
}

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

function resolveDisposition(listing: DetailListing): string | null {
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

export default function DetailPageClient({ slug }: { slug: string }) {
  const [listing, setListing] = useState<DetailListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setError(null);
        const result = await fetchJsonWithRetry<DetailListing | { data?: DetailListing }>(
          `/api/inzeraty/slug/${slug}`,
          { timeoutMs: 25000, retries: 3, retryDelayMs: 900 },
        );
        const item =
          typeof result === "object" && result !== null && "data" in result
            ? result.data ?? null
            : (result as DetailListing);
        setListing(item);
      } catch (error) {
        console.error("Nepodařilo se načíst detail inzerátu:", error);
        setError("Nacitani detailu nabidky trva prilis dlouho. Zkuste to prosim znovu.");
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
          <div className="py-12 text-center text-black/50">
            Načítání detailu...
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
            className="btn-main mb-6 inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-5 py-2.5 text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na nabídku
          </Link>
          <div className="py-12 text-center text-black/50">
            {error ?? "Inzerat nebyl nalezen."}
          </div>
        </div>
      </main>
    );
  }

  const hasImages = listing.obrazky && listing.obrazky.length > 0;
  const disposition = resolveDisposition(listing);
  const contactRecipient = listing.makler?.email ?? undefined;
  const contactName = listing.makler?.jmeno?.trim() || "Nisa Centrum Reality";
  const isCompanyContact = listing.makler?.id === 0;

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    setSendSuccess(null);

    try {
      const response = await fetchJsonWithRetry<{ ok?: boolean; error?: string }>(
        "/api/contact",
        {
          timeoutMs: 25000,
          retries: 1,
          retryDelayMs: 800,
          init: {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: contactForm.name,
              email: contactForm.email,
              phone: contactForm.phone,
              message: contactForm.message,
              subject: `Dotaz k inzerátu: ${listing.nazev}`,
              recipientEmail: contactRecipient,
            }),
          },
        },
      );

      if (response.ok) {
        setSendSuccess("Zpráva byla odeslána. Makléř se vám brzy ozve.");
        setContactForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setSendError(response.error ?? "Odeslání se nepodařilo. Zkuste to znovu.");
      }
    } catch (err) {
      console.error("Failed to submit listing contact form:", err);
      setSendError("Odeslání se nepodařilo. Zkuste to znovu.");
    } finally {
      setSending(false);
    }
  };

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
          className="btn-main mb-8 inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-5 py-2.5 text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět na nabídku
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="group relative mb-4 h-96 w-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-black/5 to-black/10"
            >
              {hasImages ? (
                <>
                  <Image
                    src={listing.obrazky[selectedImage].url}
                    alt={listing.nazev}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                    <div className="text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Klikni pro zvětšení
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Home className="h-16 w-16 text-black/20" />
                </div>
              )}

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
                    className="btn-main absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 backdrop-blur-sm"
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
                    className="btn-main absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 backdrop-blur-sm"
                  >
                    <ChevronRight className="h-6 w-6 text-black" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {selectedImage + 1} / {listing.obrazky.length}
                  </div>
                </>
              )}

              <div className="absolute right-4 top-4 flex gap-2">
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

            {hasImages && listing.obrazky.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
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

            <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-lg font-semibold text-black">
                Parametry nemovitosti
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-black/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-black/50">
                    Cena
                  </p>
                  <p className="mt-1 text-xl font-bold text-black">
                    {listing.cena && listing.cena > 0 ? (
                      <>
                        {new Intl.NumberFormat("cs-CZ").format(listing.cena)}{" "}
                        <span className="text-sm text-black/60">
                          {resolveCurrencyLabel(listing.mena)}
                        </span>
                      </>
                    ) : (
                      "Cena na dotaz"
                    )}
                  </p>
                </div>
                {listing.plocha && (
                  <div className="rounded-xl bg-black/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-black/50">
                      Plocha
                    </p>
                    <p className="mt-1 text-xl font-bold text-black">
                      {listing.plocha} m²
                    </p>
                  </div>
                )}
                {disposition && (
                  <div className="rounded-xl bg-black/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-black/50">
                      Dispozice
                    </p>
                    <p className="mt-1 text-xl font-bold text-black">
                      {disposition}
                    </p>
                  </div>
                )}
                {listing.pokoje && !disposition && (
                  <div className="rounded-xl bg-black/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-black/50">
                      Pokoje
                    </p>
                    <p className="mt-1 text-xl font-bold text-black">
                      {listing.pokoje}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {listing.popis && (
              <div className="mt-8 rounded-2xl border border-black/10 bg-white/60 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-lg font-semibold text-black">Popis</h2>
                <div className="whitespace-pre-line leading-relaxed text-black/80">
                  {listing.popis}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur-sm">
              <h1 className="mb-3 text-2xl font-bold text-black">
                {listing.nazev}
              </h1>

              <div className="mb-6 flex items-start gap-2 border-b border-black/10 pb-6">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--gold1)]" />
                <div>
                  <p className="text-sm text-black/60">Lokalita</p>
                  <p className="font-semibold text-black">
                    {listing.mesto?.nazev || "Neuvedeno"}
                  </p>
                </div>
              </div>

              {listing.typ && (
                <div className="mb-6 border-b border-black/10 pb-6">
                  <p className="mb-2 text-xs uppercase tracking-wide text-black/50">
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

              {listing.makler && (
                <div className="mb-6 rounded-xl border border-[color:var(--gold1)]/20 bg-gradient-to-br from-[color:var(--gold1)]/10 to-black/5 p-4">
                  <p className="mb-3 text-xs uppercase tracking-wide text-black/50">
                    {isCompanyContact ? "Kontakt" : "Váš makléř"}
                  </p>
                  <p className="mb-3 font-semibold text-black">
                    {contactName}
                  </p>

                  {listing.makler.telefon && (
                    <a
                      href={`tel:${listing.makler.telefon}`}
                      className="mb-2 flex items-center gap-2 text-black/70 transition hover:text-black"
                    >
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{listing.makler.telefon}</span>
                    </a>
                  )}

                  {listing.makler.email && (
                    <a
                      href={`mailto:${listing.makler.email}`}
                      className="flex items-center gap-2 text-black/70 transition hover:text-black"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{listing.makler.email}</span>
                    </a>
                  )}
                </div>
              )}

              <div className="mt-6 space-y-3">
                {listing.makler?.telefon ? (
                  <a
                    href={`tel:${listing.makler.telefon}`}
                    className="btn-main inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--gold1)] py-3 font-semibold text-black"
                  >
                    <Phone className="h-4 w-4" />
                    Zavolat
                  </a>
                ) : null}
              </div>

              <div className="mt-6 border-t border-black/10 pt-6">
                <h2 className="mb-3 text-base font-semibold text-black">
                  {isCompanyContact
                    ? "Formulář pro Nisa Centrum Reality"
                    : "Formulář pro tohoto makléře"}
                </h2>
                <form className="grid gap-3" onSubmit={handleContactSubmit}>
                  {sendSuccess ? (
                    <div className="rounded-xl bg-green-50 px-3 py-2 text-sm text-green-800">
                      {sendSuccess}
                    </div>
                  ) : null}
                  {sendError ? (
                    <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800">
                      {sendError}
                    </div>
                  ) : null}
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Jméno a příjmení"
                    required
                    className="w-full rounded-xl border-2 border-black/20 bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                  />
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="E-mail"
                    required
                    className="w-full rounded-xl border-2 border-black/20 bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                  />
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="Telefon"
                    className="w-full rounded-xl border-2 border-black/20 bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                  />
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Vaše zpráva"
                    rows={4}
                    required
                    className="w-full rounded-xl border-2 border-black/20 bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-main inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--gold1)] py-2.5 font-semibold text-black disabled:opacity-60"
                  >
                    <Mail className="h-4 w-4" />
                    {sending ? "Odesílám..." : "Odeslat zprávu"}
                  </button>
                </form>
              </div>

              <div className="mt-6 border-t border-black/10 pt-6 text-xs text-black/50">
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

      {isLightboxOpen && hasImages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative flex h-full max-h-[90vh] w-full max-w-5xl items-center justify-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="btn-main absolute right-4 top-4 z-50 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative h-full w-full">
              <Image
                src={listing.obrazky[selectedImage].url}
                alt={listing.nazev}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>

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
                  className="btn-main absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(
                      (prev) => (prev + 1) % listing.obrazky.length,
                    )
                  }
                  className="btn-main absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              {selectedImage + 1} / {listing.obrazky.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


