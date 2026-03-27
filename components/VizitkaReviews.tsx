import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";
import { normalizeExternalUrl } from "@/lib/makler-vizitka";

type MaklerReview = {
  id: string;
  autor: string;
  hodnoceni: number;
  text: string;
  datum?: string | null;
  url?: string | null;
};

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizeMaklerReviews(raw: unknown): MaklerReview[] {
  if (!Array.isArray(raw)) return [];

  return raw.reduce<MaklerReview[]>((acc, item, idx) => {
    if (!item || typeof item !== "object") return acc;
    const row = item as Record<string, unknown>;
    const autor = readString(row.autor) ?? readString(row.author) ?? readString(row.jmeno) ?? readString(row.name) ?? "Anonym";
    const text = readString(row.text) ?? readString(row.obsah) ?? readString(row.comment);
    const datum = readString(row.datum) ?? readString(row.date) ?? readString(row.published);
    const url = normalizeExternalUrl(
      readString(row.url) ?? readString(row.link) ?? readString(row.sourceUrl),
    );
    const ratingRaw = Number(row.hodnoceni ?? row.rating ?? row.stars ?? row.score ?? 0);
    const hodnoceni = Number.isFinite(ratingRaw)
      ? Math.max(0, Math.min(5, ratingRaw))
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

function getFirmyWidgetImageByProfileUrl(url: string | null): string {
  if (!url) return "https://www.firmy.cz/img-stars/light-13200814.svg";

  const match =
    url.match(/\/detail\/(\d+)-/i) ??
    url.match(/\/detail\/(\d+)(?:[/?#]|$)/i) ??
    url.match(/light-(\d+)\.svg/i) ??
    url.match(/dark-(\d+)\.svg/i);

  const firmyId = match?.[1];
  if (!firmyId) return "https://www.firmy.cz/img-stars/light-13200814.svg";

  return `https://www.firmy.cz/img-stars/light-${firmyId}.svg`;
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
  const firmyWidgetImage = getFirmyWidgetImageByProfileUrl(sourceUrl);

  return (
    <div className="rounded-[24px] bg-[color:var(--paper0)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-black">{title}</h3>
        {isSeznam && sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <Image
              src={firmyWidgetImage}
              alt="Nisa Centrum Reality na Firmy.cz"
              width={170}
              height={28}
              className="block"
            />
          </a>
        ) : isSeznam ? (
          <span className="inline-flex items-center opacity-80">
            <Image
              src={firmyWidgetImage}
              alt="Nisa Centrum Reality na Firmy.cz"
              width={170}
              height={28}
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
        <div className="mt-3 grid gap-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-[20px] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-black">{review.autor}</p>
                  {review.datum ? (
                    <p className="text-xs text-black/55">{review.datum}</p>
                  ) : null}
                </div>
                <div className="flex items-center gap-1 text-[color:var(--gold2)]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4"
                      fill={idx < Math.round(review.hodnoceni) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-black/75">{review.text}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-black/60">Recenze zatím nejsou vyplněné.</p>
      )}
    </div>
  );
}

type VizitkaReviewsProps = {
  recenzeGoogleJson?: unknown;
  recenzeGoogleUrl?: string | null;
  recenzeSeznamJson?: unknown;
  recenzeSeznamUrl?: string | null;
};

export default function VizitkaReviews({
  recenzeGoogleJson,
  recenzeGoogleUrl,
  recenzeSeznamJson,
  recenzeSeznamUrl,
}: VizitkaReviewsProps) {
  const recenzeGoogle = normalizeMaklerReviews(recenzeGoogleJson);
  const recenzeSeznam = normalizeMaklerReviews(recenzeSeznamJson);
  const googleUrl = normalizeExternalUrl(recenzeGoogleUrl);
  const seznamUrl = normalizeExternalUrl(recenzeSeznamUrl);

  const hasRecenze = Boolean(
    recenzeGoogle.length > 0 ||
      recenzeSeznam.length > 0 ||
      googleUrl ||
      seznamUrl,
  );

  if (!hasRecenze) {
    return null;
  }

  return (
    <section className="rounded-[28px] bg-white/92 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
      <h2 className="text-lg font-semibold text-black">Recenze klientů</h2>
      <div className="mt-4 space-y-4">
        {(recenzeSeznam.length > 0 || seznamUrl) && (
          <ReviewsSourceBlock
            title="Seznam.cz"
            reviews={recenzeSeznam}
            sourceUrl={seznamUrl}
            sourceKind="seznam"
          />
        )}
        {(recenzeGoogle.length > 0 || googleUrl) && (
          <ReviewsSourceBlock
            title="Google"
            reviews={recenzeGoogle}
            sourceUrl={googleUrl}
            sourceKind="google"
          />
        )}
      </div>
    </section>
  );
}
