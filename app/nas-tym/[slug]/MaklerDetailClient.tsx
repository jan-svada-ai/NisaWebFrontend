"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Home,
  ExternalLink,
  Facebook,
  Instagram,
  ListChecks,
  Mail,
  MapPin,
  Phone,
  Send,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import { fetchJsonWithRetry } from "@/lib/api";

interface Inzerat {
  id: number;
  nazev: string;
  slug: string;
  cena: number | null;
  mena: string | null;
  plocha: number | null;
  dispozice: string | null;
  typ: string | null;
  typPonuky: string | null;
  mesto: { nazev: string } | null;
  obrazky: Array<{ url: string }>;
  atributy?: {
    estate?: Record<string, unknown>;
    estate_readable?: Record<string, unknown>;
  } | null;
}

interface MaklerDetail {
  id: number;
  jmeno: string;
  slug: string;
  email: string | null;
  telefon: string | null;
  webUrl?: string | null;
  webButtonLabel?: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  recenzeGoogleJson?: unknown;
  recenzeGoogleUrl?: string | null;
  recenzeSeznamJson?: unknown;
  recenzeSeznamUrl?: string | null;
  pozice: string;
  moto: string | null;
  popis: string | null;
  fotoUrl: string | null;
  inzeraty: Inzerat[];
}

type MaklerReview = {
  id: string;
  autor: string;
  hodnoceni: number;
  text: string;
  datum?: string | null;
  url?: string | null;
};

const FIRMY_WIDGET_IMG = "https://www.firmy.cz/img-stars/light-13200814.svg";

function getFirmyWidgetImageByProfileUrl(url: string | null): string {
  if (!url) return FIRMY_WIDGET_IMG;

  const match =
    url.match(/\/detail\/(\d+)-/i) ??
    url.match(/\/detail\/(\d+)(?:[/?#]|$)/i) ??
    url.match(/light-(\d+)\.svg/i) ??
    url.match(/dark-(\d+)\.svg/i);

  const firmyId = match?.[1];
  if (!firmyId) return FIRMY_WIDGET_IMG;

  return `https://www.firmy.cz/img-stars/light-${firmyId}.svg`;
}

function resolveCurrencyLabel(value: string | null): string {
  const normalized = (value ?? "").trim().toUpperCase();
  if (!normalized || normalized === "CZK" || normalized === "KC" || normalized === "KČ") {
    return "Kč";
  }
  return normalized;
}

function normalizeSocialUrl(value: string): string {
  const normalized = value.trim();
  if (!normalized) {
    return "";
  }
  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }
  return `https://${normalized}`;
}

function normalizeUrl(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
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

function resolveDisposition(inzerat: Inzerat): string | null {
  if (inzerat.dispozice?.trim()) return inzerat.dispozice.trim();

  const readable = inzerat.atributy?.estate_readable;
  const estate = inzerat.atributy?.estate;

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

function resolvePriceUnit(inzerat: Inzerat): string | null {
  const unitRaw =
    readStringFromObject(inzerat.atributy?.estate_readable, [
      "advert_price_unit",
      "price_unit",
    ]) ??
    readStringFromObject(inzerat.atributy?.estate, [
      "advert_price_unit",
      "price_unit",
    ]);

  if (!unitRaw) return null;

  const normalized = unitRaw.toLowerCase();
  const hasM2 = normalized.includes("m2") || normalized.includes("m²");
  const hasMonth = normalized.includes("mesic") || normalized.includes("měsíc");

  if (hasM2 && hasMonth) return "m² / měsíc";
  if (hasM2) return "m²";
  if (hasMonth) return "měsíc";

  return unitRaw.replace(/^za\s+/i, "").trim();
}

function normalizeMaklerReviews(raw: unknown): MaklerReview[] {
  if (!Array.isArray(raw)) return [];

  return raw.reduce<MaklerReview[]>((acc, item, idx) => {
    if (!item || typeof item !== "object") return acc;
    const row = item as Record<string, unknown>;

    const authorRaw =
      row.autor ?? row.author ?? row.jmeno ?? row.name ?? "Anonym";
    const textRaw = row.text ?? row.obsah ?? row.comment ?? "";
    const dateRaw = row.datum ?? row.date ?? row.published ?? null;
    const urlRaw = row.url ?? row.link ?? row.sourceUrl ?? null;
    const ratingRaw =
      row.hodnoceni ?? row.rating ?? row.stars ?? row.score ?? 0;

    const autor = String(authorRaw).trim() || "Anonym";
    const text = String(textRaw).trim();
    const datum = dateRaw ? String(dateRaw).trim() : null;
    const url = urlRaw ? normalizeUrl(String(urlRaw)) : null;
    const ratingNum = Number(ratingRaw);
    const hodnoceni = Number.isFinite(ratingNum)
      ? Math.max(0, Math.min(5, ratingNum))
      : 0;

    if (!text) return acc;

    acc.push({
      id: String(row.id ?? `review-${idx}`),
      autor,
      hodnoceni,
      text,
      datum,
      url,
    });
    return acc;
  }, []);
}

function ReviewsSourceBlock({
  title,
  reviews,
  sourceUrl,
  sourceKind,
}: {
  title: string;
  reviews: MaklerReview[];
  sourceUrl: string | null;
  sourceKind: "google" | "seznam";
}) {
  const isSeznam = sourceKind === "seznam";
  const firmyUrl = sourceUrl;
  const firmyWidgetImage = getFirmyWidgetImageByProfileUrl(firmyUrl);

  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-black">{title}</h3>
        {isSeznam && firmyUrl ? (
          <a
            href={firmyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <img
              src={firmyWidgetImage}
              alt="Nisa centrum reality na Firmy.cz"
              className="block"
            />
          </a>
        ) : isSeznam ? (
          <span className="inline-flex items-center opacity-80">
            <img
              src={firmyWidgetImage}
              alt="Nisa centrum reality na Firmy.cz"
              className="block"
            />
          </span>
        ) : sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--gold2)] hover:underline"
          >
            Otevřít zdroj
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>

      {reviews.length > 0 ? (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-xl border border-black/10 bg-white/85 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-black">{r.autor}</p>
                  {r.datum ? <p className="text-xs text-black/55">{r.datum}</p> : null}
                </div>
                <div className="flex items-center gap-1 text-[color:var(--gold2)]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4"
                      fill={idx < Math.round(r.hodnoceni) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-black/75">{r.text}</p>

              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--gold2)] hover:underline"
                >
                  Zdroj recenze
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-black/60">Recenze zatím nejsou vyplněné.</p>
      )}
    </div>
  );
}

export default function MaklerDetailClient({ slug }: { slug: string }) {
  const [makler, setMakler] = useState<MaklerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    const fetchMakler = async () => {
      setLoading(true);
      setMakler(null);
      try {
        setError(null);
        const result = await fetchJsonWithRetry<{ data?: MaklerDetail | null }>(
          `/api/makleri/slug/${slug}`,
          { timeoutMs: 25000, retries: 3, retryDelayMs: 900 },
        );
        setMakler(result.data || null);
      } catch (error) {
        console.error("Failed to fetch makler:", error);
        setMakler(null);
        setError("Načítání detailu makléře trvá příliš dlouho. Zkuste to prosím znovu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMakler();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 text-center text-black/60">
        Načítání...
      </div>
    );
  }

  if (!makler) {
    return (
      <div className="min-h-screen pt-20 text-center text-black/60">
        {error ?? "Makléř nenalezen."}
      </div>
    );
  }

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
              subject: `Kontakt na makléře (${makler.jmeno})`,
              recipientEmail: makler.email ?? undefined,
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
      console.error("Failed to submit makler contact form:", err);
      setSendError("Odeslání se nepodařilo. Zkuste to znovu.");
    } finally {
      setSending(false);
    }
  };

  const instagramUrl = makler.instagramUrl ? normalizeSocialUrl(makler.instagramUrl) : "";
  const facebookUrl = makler.facebookUrl ? normalizeSocialUrl(makler.facebookUrl) : "";
  const recenzeGoogle = normalizeMaklerReviews(makler.recenzeGoogleJson);
  const recenzeSeznam = normalizeMaklerReviews(makler.recenzeSeznamJson);
  const recenzeGoogleUrl = normalizeUrl(makler.recenzeGoogleUrl);
  const recenzeSeznamUrl = normalizeUrl(makler.recenzeSeznamUrl);
  const webUrl = normalizeUrl(makler.webUrl);
  const webButtonLabel = (makler.webButtonLabel ?? "").trim();
  const hasWebButton = Boolean(webUrl && webButtonLabel);
  const hasActiveInzeraty = makler.inzeraty.length > 0;
  const hasRecenze = Boolean(
    recenzeGoogle.length > 0 ||
      recenzeSeznam.length > 0 ||
      recenzeGoogleUrl ||
      recenzeSeznamUrl,
  );

  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-12 xl:px-6 xl:pr-24">
        <div className="grid gap-8 lg:grid-cols-12 xl:gap-10">
          <div className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm lg:col-span-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/5">
              {makler.fotoUrl ? (
                <Image
                  src={makler.fotoUrl}
                  alt={makler.jmeno}
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  loading="lazy"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-black/40">
                  <Users className="h-10 w-10" />
                </div>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-black">{makler.jmeno}</h1>
            <p className="text-sm text-black/70">{makler.pozice}</p>

            {makler.moto && (
              <p className="mt-3 text-sm italic text-black/70">{makler.moto}</p>
            )}

            <div className="mt-4 space-y-2 text-[18px] text-black/70">
              {makler.telefon && (
                <div className="flex items-center gap-2">
                  <Phone className="h-[1.3rem] w-[1.3rem] text-[color:var(--gold2)]" />
                  <span>{makler.telefon}</span>
                </div>
              )}
              {makler.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-[1.3rem] w-[1.3rem] text-[color:var(--gold2)]" />
                  <span>{makler.email}</span>
                </div>
              )}
              {(instagramUrl || facebookUrl) && (
                <div className="mt-1 flex flex-col items-start gap-2">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black/80 transition-colors hover:text-[color:var(--gold2)]"
                    >
                      <Instagram className="h-[1.3rem] w-[1.3rem] text-[color:var(--gold2)]" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black/80 transition-colors hover:text-[color:var(--gold2)]"
                    >
                      <Facebook className="h-[1.3rem] w-[1.3rem] text-[color:var(--gold2)]" />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {hasActiveInzeraty && (
                <a
                  href="#sekce-inzeraty"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:border-[color:var(--gold2)] hover:bg-black/5"
                >
                  <ListChecks className="h-4 w-4 text-[color:var(--gold2)]" />
                  Aktivní inzeráty
                </a>
              )}

              {hasRecenze && (
                <a
                  href="#sekce-recenze"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:border-[color:var(--gold2)] hover:bg-black/5"
                >
                  <Star className="h-4 w-4 text-[color:var(--gold2)]" />
                  Recenze klientů
                </a>
              )}

              {hasWebButton && (
                <a
                  href={webUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:border-[color:var(--gold2)] hover:bg-black/5"
                >
                  <UserRound className="h-4 w-4 text-[color:var(--gold2)]" />
                  {webButtonLabel}
                </a>
              )}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <div className="min-w-0 rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-black">
                <span className="inline-flex flex-col items-start">
                  <span className="inline-flex items-center gap-2">
                    <UserRound className="h-5 w-5 text-[color:var(--gold2)]" />
                    O mně
                  </span>
                  <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
                </span>
              </h2>
              <p className="mt-3 break-words text-sm text-black/70">{makler.popis || ""}</p>
            </div>

            <div className="mt-8 min-w-0 rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-black">
                <span className="inline-flex flex-col items-start">
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[color:var(--gold2)]" />
                    Kontaktovat makléře
                  </span>
                  <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
                </span>
              </h2>
              <form className="mt-4 grid gap-4" onSubmit={handleContactSubmit}>
                {sendSuccess ? (
                  <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                    {sendSuccess}
                  </div>
                ) : null}
                {sendError ? (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
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
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="E-mail"
                  required
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="Telefon"
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <textarea
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Vaše zpráva"
                  rows={4}
                  required
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-main inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--gold1)] px-4 py-2.5 text-sm font-semibold text-black"
                >
                  <Send className="h-4 w-4" />
                  {sending ? "Odesílám..." : "Odeslat"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {hasActiveInzeraty && (
          <div id="sekce-inzeraty" className="mt-12 scroll-mt-28">
            <h2 className="text-2xl font-semibold text-black">
              <span className="inline-flex flex-col items-start">
                <span className="inline-flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-[color:var(--gold2)]" />
                  Aktivní inzeráty
                </span>
                <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {makler.inzeraty.map((i) => {
                const disposition = resolveDisposition(i);
                const priceUnit = resolvePriceUnit(i);

                return (
                  <a
                    key={i.id}
                    href={`/nabidka/${encodeURIComponent(i.slug)}/`}
                    className="group overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-black/5 to-black/10">
                      {i.obrazky?.[0]?.url ? (
                        <>
                          <Image
                            src={i.obrazky[0].url}
                            alt=""
                            fill
                            aria-hidden
                            className="pointer-events-none object-cover scale-105 opacity-28 blur-xl saturate-110"
                          />
                          <div aria-hidden className="absolute inset-0 bg-black/5" />
                          <Image
                            src={i.obrazky[0].url}
                            alt={i.nazev}
                            fill
                            loading="lazy"
                            className="relative z-10 object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02] [image-rendering:-webkit-optimize-contrast]"
                            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                          />
                        </>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Home className="h-12 w-12 text-black/20" />
                        </div>
                      )}
                      {i.typPonuky && (
                        <div className="absolute right-3 top-3 z-20">
                          <span className="rounded-full bg-[color:var(--gold1)] px-3.5 py-1.5 text-sm font-bold text-black">
                            {i.typPonuky === "prodej"
                              ? "Prodej"
                              : i.typPonuky === "pronajeti"
                                ? "Pronájem"
                                : "Dražba"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-black">
                        {i.nazev}
                      </h3>

                      <div className="mb-4 flex items-center gap-2 text-sm text-black/70">
                        <MapPin className="h-4 w-4 text-[color:var(--gold1)]" />
                        {i.mesto?.nazev || "N/A"}
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-3 border-y border-black/5 py-3 text-sm">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-black/50">
                            Cena
                          </p>
                          <p className="font-bold text-black">
                            {i.cena && i.cena > 0 ? (
                              <>
                                {new Intl.NumberFormat("cs-CZ").format(i.cena)}{" "}
                                <span className="text-xs text-black/60">
                                  {resolveCurrencyLabel(i.mena)}
                                  {priceUnit ? ` / ${priceUnit}` : ""}
                                </span>
                              </>
                            ) : (
                              "Cena na dotaz"
                            )}
                          </p>
                        </div>
                        {i.plocha && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-black/50">
                              Plocha
                            </p>
                            <p className="font-bold text-black">{i.plocha} m²</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {i.typ && (
                          <span className="rounded-lg bg-black/5 px-2.5 py-1 text-xs font-semibold text-black/70">
                            {i.typ === "byt"
                              ? "Byt"
                              : i.typ === "dum"
                                ? "Dům"
                                : i.typ === "pozemek"
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
          </div>
        )}

        {hasRecenze && (
          <div
            id="sekce-recenze"
            className="mt-12 min-w-0 rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm scroll-mt-28"
          >
            <h2 className="text-2xl font-semibold text-black">
              <span className="inline-flex flex-col items-start">
                <span className="inline-flex items-center gap-2">
                  <Star className="h-5 w-5 text-[color:var(--gold2)]" />
                  Recenze klientů
                </span>
                <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </h2>

            <div className="mt-4 space-y-4">
              {(recenzeSeznam.length > 0 || recenzeSeznamUrl) && (
                <ReviewsSourceBlock
                  title="Seznam.cz"
                  reviews={recenzeSeznam}
                  sourceUrl={recenzeSeznamUrl}
                  sourceKind="seznam"
                />
              )}

              {(recenzeGoogle.length > 0 || recenzeGoogleUrl) && (
                <ReviewsSourceBlock
                  title="Google"
                  reviews={recenzeGoogle}
                  sourceUrl={recenzeGoogleUrl}
                  sourceKind="google"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


