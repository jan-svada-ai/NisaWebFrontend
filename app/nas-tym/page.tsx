"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Mail, Phone, Users } from "lucide-react";
import { fetchJsonWithRetry } from "@/lib/api";

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

export default function NasTymPage() {
  const [makleri, setMakleri] = useState<MaklerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMakleri = async () => {
      try {
        setError(null);
        const result = await fetchJsonWithRetry<{ data?: MaklerCard[] }>(
          "/api/makleri",
          { timeoutMs: 25000, retries: 3, retryDelayMs: 900 },
        );
        setMakleri(result.data || []);
      } catch (error) {
        console.error("Failed to fetch makleri:", error);
        setError("Načítání makléřů trvá příliš dlouho. Zkuste to prosím znovu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMakleri();
  }, []);

  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-12 xl:pr-24">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Nisa Centrum Reality
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-black md:text-5xl">
            <span className="inline-flex flex-col items-center">
              <span>Náš tým</span>
              <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h1>
        </div>

        {loading ? (
          <div className="py-12 text-center text-black/60">Načítání...</div>
        ) : error ? (
          <div className="py-12 text-center text-black/60">{error}</div>
        ) : makleri.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {makleri.map((m) => (
              <a
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
              </a>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-black/60">
            Makléři nejsou k dispozici. Zkontrolujte, že je API server spuštěný.
          </div>
        )}
      </div>
    </main>
  );
}


