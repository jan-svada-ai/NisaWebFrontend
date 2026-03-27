import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { fetchBrokerByVizitkaSlug, normalizeExternalUrl } from "@/lib/makler-vizitka";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function summarizeText(text?: string | null, max = 150): string {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}...`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vizitkaSlug: string }>;
}): Promise<Metadata> {
  const { vizitkaSlug } = await params;
  const broker = await fetchBrokerByVizitkaSlug(vizitkaSlug);

  if (!broker) {
    return {
      title: "Online vizitka | Nisa Centrum Reality",
      robots: { index: false, follow: false },
    };
  }

  const profileUrl = `${SITE_URL}/nas-tym/${encodeURIComponent(broker.slug)}`;
  const title = `${broker.jmeno} | Online vizitka`;
  const description =
    summarizeText(broker.popis) ||
    `${broker.jmeno}${broker.pozice ? ` | ${broker.pozice}` : ""} | Nisa Centrum Reality`;

  return {
    title,
    description,
    alternates: {
      canonical: profileUrl,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${encodeURIComponent(vizitkaSlug)}`,
      images: broker.fotoUrl ? [{ url: broker.fotoUrl }] : undefined,
    },
  };
}

export default async function VizitkaPage({
  params,
}: {
  params: Promise<{ vizitkaSlug: string }>;
}) {
  const { vizitkaSlug } = await params;
  const broker = await fetchBrokerByVizitkaSlug(vizitkaSlug);

  if (!broker || !broker.vizitkaSlug) {
    notFound();
  }

  const websiteUrl = normalizeExternalUrl(broker.webUrl);
  const instagramUrl = normalizeExternalUrl(broker.instagramUrl);
  const facebookUrl = normalizeExternalUrl(broker.facebookUrl);
  const profileUrl = `/nas-tym/${encodeURIComponent(broker.slug)}`;
  const vcardUrl = `/api/vcard/${encodeURIComponent(broker.vizitkaSlug)}`;
  const featuredListings = broker.inzeraty.slice(0, 3);

  return (
    <main
      className="min-h-screen px-4 py-6 sm:px-6 sm:py-8"
      style={{
        background: [
          "radial-gradient(circle at top, rgba(230,194,94,0.36), transparent 32%)",
          "linear-gradient(180deg, #f8f3e7 0%, #f2ead9 55%, #eadfcb 100%)",
        ].join(", "),
      }}
    >
      <div className="mx-auto max-w-md">
        <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white/85 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur">
          <div className="relative isolate overflow-hidden px-5 pb-6 pt-5 sm:px-6">
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(135deg,rgba(230,194,94,0.95),rgba(156,122,23,0.8))]" />
            <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute left-[-2rem] top-16 h-28 w-28 rounded-full bg-black/10 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                    Nisa Centrum Reality
                  </p>
                  <p className="mt-2 text-sm text-white/85">Online vizitka pro QR kód</p>
                </div>
                <div className="rounded-full border border-white/35 bg-white/15 px-3 py-1 text-sm font-semibold">
                  /{broker.vizitkaSlug}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[28px] border border-white/35 bg-white/20 shadow-lg">
                  {broker.fotoUrl ? (
                    <Image
                      src={broker.fotoUrl}
                      alt={broker.jmeno}
                      fill
                      sizes="96px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/80">
                      <UserRound className="h-10 w-10" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 text-white">
                  <h1 className="text-2xl font-semibold leading-tight">{broker.jmeno}</h1>
                  <p className="mt-1 text-sm text-white/85">{broker.pozice}</p>
                  {broker.moto ? (
                    <p className="mt-3 text-sm italic leading-relaxed text-white/90">
                      {broker.moto}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 space-y-3">
              {broker.telefon ? (
                <a
                  href={`tel:${broker.telefon}`}
                  className="flex items-center justify-between rounded-2xl bg-black px-4 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:translate-y-[-1px]"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[color:var(--gold1)]" />
                    <span className="font-semibold">{broker.telefon}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/70" />
                </a>
              ) : null}

              {broker.email ? (
                <a
                  href={`mailto:${broker.email}`}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-black transition hover:border-[color:var(--gold2)]"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[color:var(--gold2)]" />
                    <span className="min-w-0 truncate font-semibold">{broker.email}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-black/50" />
                </a>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={vcardUrl}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--gold1)] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
                >
                  <Download className="h-4 w-4" />
                  Uložit kontakt
                </a>
                <Link
                  href={profileUrl}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:border-[color:var(--gold2)]"
                >
                  Profil makléře
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-5 px-5 pb-6 sm:px-6">
            {broker.popis ? (
              <section className="rounded-[28px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,243,231,0.95))] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/45">
                  O mně
                </p>
                <p className="mt-3 text-sm leading-relaxed text-black/72">{broker.popis}</p>
              </section>
            ) : null}

            <section className="rounded-[28px] border border-black/10 bg-white/80 p-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[color:var(--gold2)]" />
                <p className="text-sm font-semibold text-black">Liberec a okolí</p>
              </div>
              <p className="mt-2 text-sm text-black/65">
                Rychlý kontakt na makléře Nisa Centrum Reality. Odkaz je připravený pro
                QR kód, mobil a rychlé uložení do kontaktů.
              </p>

              {(websiteUrl || instagramUrl || facebookUrl) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {websiteUrl ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black transition hover:border-[color:var(--gold2)]"
                    >
                      Web
                      <ExternalLink className="h-3.5 w-3.5 text-[color:var(--gold2)]" />
                    </a>
                  ) : null}
                  {instagramUrl ? (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black transition hover:border-[color:var(--gold2)]"
                    >
                      <Instagram className="h-3.5 w-3.5 text-[color:var(--gold2)]" />
                      Instagram
                    </a>
                  ) : null}
                  {facebookUrl ? (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black transition hover:border-[color:var(--gold2)]"
                    >
                      <Facebook className="h-3.5 w-3.5 text-[color:var(--gold2)]" />
                      Facebook
                    </a>
                  ) : null}
                </div>
              )}
            </section>

            {featuredListings.length > 0 ? (
              <section className="rounded-[28px] border border-black/10 bg-white/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/45">
                  Aktivní nabídky
                </p>
                <div className="mt-4 space-y-3">
                  {featuredListings.map((listing) => (
                    <Link
                      key={listing.id}
                      href={`/nabidka/${encodeURIComponent(listing.slug)}`}
                      className="block rounded-2xl border border-black/10 bg-white px-4 py-3 transition hover:border-[color:var(--gold2)]"
                    >
                      <p className="line-clamp-2 text-sm font-semibold text-black">
                        {listing.nazev}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3 text-sm text-black/60">
                        <span>{listing.mesto?.nazev ?? "Lokalita na dotaz"}</span>
                        {listing.cena ? (
                          <span className="font-semibold text-black">
                            {listing.cena.toLocaleString("cs-CZ")} {listing.mena ?? "Kč"}
                          </span>
                        ) : null}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
