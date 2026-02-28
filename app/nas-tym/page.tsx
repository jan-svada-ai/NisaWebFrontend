import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone, Users } from "lucide-react";
import { SITE_URL } from "@/lib/site-url";

interface MaklerCard {
  id: number;
  jmeno: string;
  slug: string;
  email: string | null;
  telefon: string | null;
  pozice: string;
  fotoUrl: string | null;
  aktivniInzeraty: number;
}

interface BrokersResponse {
  data?: MaklerCard[];
}

const API_BASE = (
  process.env.BACKEND_URL ??
  process.env.SITEMAP_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:4000"
).replace(/\/+$/, "");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Naši realitní makléři | Liberec a okolí | Nisa Centrum Reality",
  description:
    "Seznamte se s týmem Nisa Centrum Reality. Zkušení realitní makléři z Liberce a okolí vám pomohou s prodejem, pronájmem i oceněním nemovitosti zdarma.",
  keywords: [
    "realitní makléř Liberec",
    "realitní kancelář Liberec",
    "makléři Liberec",
    "prodej nemovitosti Liberec",
    "pronájem nemovitosti Liberec",
    "ocenění nemovitosti zdarma",
  ],
  alternates: {
    canonical: `${SITE_URL}/nas-tym`,
  },
  openGraph: {
    title: "Naši realitní makléři | Liberec a okolí | Nisa Centrum Reality",
    description:
      "Seznamte se s týmem Nisa Centrum Reality. Zkušení realitní makléři z Liberce a okolí vám pomohou s prodejem, pronájmem i oceněním nemovitosti zdarma.",
    url: `${SITE_URL}/nas-tym`,
  },
};

async function getBrokers(): Promise<{
  brokers: MaklerCard[];
  failed: boolean;
}> {
  try {
    const response = await fetch(`${API_BASE}/api/makleri`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { brokers: [], failed: true };
    }

    const payload = (await response.json()) as BrokersResponse;
    return {
      brokers: Array.isArray(payload.data) ? payload.data : [],
      failed: false,
    };
  } catch {
    return { brokers: [], failed: true };
  }
}

export default async function NasTymPage() {
  const { brokers, failed } = await getBrokers();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Naši realitní makléři | Nisa Centrum Reality",
    url: `${SITE_URL}/nas-tym`,
    about: {
      "@id": `${SITE_URL}#real-estate-agent`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: brokers.map((broker, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "RealEstateAgent",
          name: broker.jmeno,
          url: `${SITE_URL}/nas-tym/${encodeURIComponent(broker.slug)}`,
          telephone: broker.telefon ?? undefined,
          email: broker.email ?? undefined,
        },
      })),
    },
  };

  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-screen-2xl px-4 py-12 xl:pr-24">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Nisa Centrum Reality
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-black md:text-5xl">
            <span className="inline-flex flex-col items-center">
              <span>Naši realitní makléři</span>
              <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70 md:text-lg">
            Poznejte tým makléřů z Liberce a okolí, který vám pomůže s
            prodejem, pronájmem i oceněním nemovitosti zdarma. Každý makléř má
            vlastní specializaci, ale všichni pracují na stejném cíli:
            bezpečný obchod a co nejlepší výsledek pro klienta.
          </p>
        </div>

        {brokers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brokers.map((m) => (
              <Link
                key={m.id}
                href={`/nas-tym/${encodeURIComponent(m.slug)}/`}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-5 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/5">
                  {m.fotoUrl ? (
                    <Image
                      src={m.fotoUrl}
                      alt={m.jmeno}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-black/40">
                      <Users className="h-10 w-10" />
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                    Aktivní inzeráty: {m.aktivniInzeraty}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-black">
                    {m.jmeno}
                  </h2>
                  <p className="text-sm text-black/70">{m.pozice}</p>

                  <div className="mt-3 space-y-1 text-sm text-black/70">
                    {m.telefon && (
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4 text-[color:var(--gold2)]" />
                        <span>{m.telefon}</span>
                      </div>
                    )}
                    {m.email && (
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="h-4 w-4 text-[color:var(--gold2)]" />
                        <span>{m.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="btn-main mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--gold1)] px-6 py-3 text-base font-semibold text-black">
                    Detail
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-black/60">
            {failed
              ? "Načítání makléřů trvá příliš dlouho. Zkuste to prosím znovu."
              : "Makléři nejsou aktuálně k dispozici."}
          </div>
        )}
      </div>
    </main>
  );
}
