import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, MessageSquareQuote, Star } from "lucide-react";
import { SITE_URL } from "@/lib/site-url";

type ReviewSource = "google" | "firmy";

type ReviewItem = {
  id: string | number;
  author: string;
  rating: number;
  text: string;
  date?: string | null;
  source: ReviewSource;
  url?: string | null;
};

type ReviewsResponse = {
  data?: ReviewItem[];
  links?: {
    google?: string;
    googleWrite?: string;
    firmy?: string;
  };
  sources?: {
    google?: string;
    googleReason?: string;
    googleStatusText?: string;
    firmy?: string;
  };
};

type ReviewsPageData = {
  items: ReviewItem[];
  googleUrl: string;
  googleWriteUrl: string | null;
  googleReason: string | null;
  googleStatusText: string | null;
  error: string | null;
};

const API_BASE = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

const GOOGLE_REVIEWS_URL = "https://share.google/mTkMMCC6dhLqSGPAv";
const FIRMY_PROFILE_URL =
  "https://www.firmy.cz/detail/13200814-nisa-centrum-reality-liberec.html#hodnoceni";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Reference klientů | Realitní kancelář Liberec | Nisa Centrum Reality",
  description:
    "Skutečné reference klientů Nisa Centrum Reality z Google a Firmy.cz. Zjistěte, jak klienti hodnotí naši realitní kancelář, makléře i realitní služby.",
  alternates: {
    canonical: `${SITE_URL}/reference`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/reference`,
    title: "Reference klientů | Realitní kancelář Liberec | Nisa Centrum Reality",
    description:
      "Skutečné reference klientů Nisa Centrum Reality z Google a Firmy.cz. Zjistěte, jak klienti hodnotí naši realitní kancelář, makléře i realitní služby.",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Reference klientů Nisa Centrum Reality",
      },
    ],
  },
};

function googleReasonLabel(reason: string | null): string | null {
  if (!reason) return null;
  switch (reason) {
    case "missing-google-api-key":
      return "Chybí GOOGLE_API_KEY nebo GOOGLE_PLACES_API_KEY na backendu.";
    case "missing-google-place-id":
      return "Chybí GOOGLE_PLACE_ID na backendu.";
    case "google-http-error":
      return "Google API vrátilo HTTP chybu. Ověřte restrikce API klíče a billing.";
    case "google-status-error":
      return "Google API odmítlo požadavek, například REQUEST_DENIED nebo INVALID_REQUEST.";
    case "google-empty-reviews":
      return "Google API pro zadané místo nevrátilo žádné recenze.";
    case "google-request-error":
      return "Backend se nedokázal spojit s Google API.";
    default:
      return reason;
  }
}

function SourceBadge({ source }: { source: ReviewSource }) {
  return (
    <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-black/70">
      {source === "google" ? "Google" : "Firmy.cz"}
    </span>
  );
}

function CenterSectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-5 text-center text-2xl font-semibold text-black">
      <span className="inline-flex flex-col items-center">
        <span>{title}</span>
        <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
      </span>
    </h2>
  );
}

function ReviewsGrid({ items }: { items: ReviewItem[] }) {
  const hasOddCount = items.length % 2 === 1;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item, idx) => (
        <article
          key={`${item.source}-${item.id}`}
          className={`rounded-3xl border border-black/10 bg-white/80 p-6 shadow-sm ${
            hasOddCount && idx === items.length - 1
              ? "md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-0.75rem)]"
              : ""
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-black">{item.author}</p>
              {item.date ? (
                <p className="text-xs text-black/55">{item.date}</p>
              ) : null}
            </div>
            <SourceBadge source={item.source} />
          </div>

          <div className="mt-4 flex items-center gap-1 text-[color:var(--gold2)]">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className="h-4 w-4"
                fill={idx < Math.round(item.rating) ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-2 text-sm font-semibold text-black/70">
              {item.rating.toFixed(1)}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-black/75">{item.text}</p>

          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gold2)] hover:underline"
            >
              Zobrazit originál
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

async function getReviews(): Promise<ReviewsPageData> {
  try {
    const res = await fetch(`${API_BASE}/api/reference`, {
      headers: { Accept: "application/json" },
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }

    const json = (await res.json()) as ReviewsResponse;
    return {
      items: Array.isArray(json.data) ? json.data : [],
      googleUrl: json.links?.google ?? GOOGLE_REVIEWS_URL,
      googleWriteUrl: json.links?.googleWrite ?? null,
      googleReason: json.sources?.googleReason ?? null,
      googleStatusText: json.sources?.googleStatusText ?? null,
      error: null,
    };
  } catch (e) {
    return {
      items: [],
      googleUrl: GOOGLE_REVIEWS_URL,
      googleWriteUrl: null,
      googleReason: null,
      googleStatusText: null,
      error: e instanceof Error ? e.message : "Nepodařilo se načíst reference.",
    };
  }
}

export default async function ReferencePage() {
  const { items, googleUrl, googleWriteUrl, googleReason, googleStatusText, error } =
    await getReviews();

  const grouped = {
    google: items.filter((x) => x.source === "google"),
    firmy: items.filter((x) => x.source === "firmy"),
  };

  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/reference#page`,
        url: `${SITE_URL}/reference`,
        name: "Reference klientů | Nisa Centrum Reality",
        description:
          "Skutečné reference klientů Nisa Centrum Reality z Google a Firmy.cz.",
        about: {
          "@id": `${SITE_URL}#real-estate-agent`,
        },
      },
      ...(items.length
        ? [
            {
              "@type": "ItemList",
              itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: item.author,
                  },
                  reviewBody: item.text,
                  url: item.url ?? undefined,
                  itemReviewed: {
                    "@id": `${SITE_URL}#real-estate-agent`,
                  },
                  datePublished: item.date ?? undefined,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: item.rating,
                    bestRating: 5,
                    worstRating: 1,
                  },
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }}
      />

      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-black/60">
          Nisa Centrum Reality
        </p>
        <h1 className="mt-2 text-5xl font-semibold text-black">
          <span className="inline-flex flex-col items-center">
            <span>Reference</span>
            <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-black/70">
          Zobrazujeme aktuální hodnocení z externích portálů. Díky server renderu
          jsou reference dostupné rovnou při načtení stránky i pro vyhledávače.
        </p>
      </div>

      <div className="mb-10 flex justify-center">
        <Link
          href="/kontakt"
          className="btn-main inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          <MessageSquareQuote className="h-4 w-4" />
          Napište nám
        </Link>
      </div>

      <div className="space-y-12">
        <section>
          <CenterSectionHeading title="Firmy.cz recenze" />

          <div className="mb-6 flex justify-center">
            <a href={FIRMY_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src="https://www.firmy.cz/img-stars/light-13200814.svg"
                alt="Nisa Centrum Reality na Firmy.cz"
                width={170}
                height={28}
                className="h-auto w-[170px]"
                unoptimized
              />
            </a>
          </div>

          {grouped.firmy.length > 0 ? (
            <ReviewsGrid items={grouped.firmy} />
          ) : (
            <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-sm">
              <p className="text-base font-semibold text-black">
                Firmy.cz reference zatím nejsou k dispozici.
              </p>
              {error ? (
                <p className="mt-3 text-xs text-black/55">Detail: {error}</p>
              ) : null}
            </div>
          )}
        </section>

        <section className="border-t border-black/10 pt-12">
          <CenterSectionHeading title="Google recenze" />

          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:border-black/30 hover:bg-black/5"
            >
              Zobrazit Google profil
              <ExternalLink className="h-4 w-4" />
            </a>
            {googleWriteUrl ? (
              <a
                href={googleWriteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-95"
              >
                Napsat recenzi na Google
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>

          {grouped.google.length > 0 ? (
            <ReviewsGrid items={grouped.google} />
          ) : (
            <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-sm">
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-black underline-offset-4 hover:underline"
              >
                Google recenze teď nejsou dostupné přes API. Otevřít recenze na
                Google
                <ExternalLink className="h-4 w-4" />
              </a>
              {googleReasonLabel(googleReason) ? (
                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  {googleReasonLabel(googleReason)}
                </p>
              ) : null}
              {googleStatusText ? (
                <p className="mt-2 text-xs text-black/60">
                  Detail z Google API: {googleStatusText}
                </p>
              ) : null}
              {error ? (
                <p className="mt-3 text-xs text-black/55">Detail: {error}</p>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
