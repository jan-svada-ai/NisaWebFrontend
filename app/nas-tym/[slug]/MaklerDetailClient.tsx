"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Send, Users } from "lucide-react";
import { apiUrl } from "@/lib/api";

interface Inzerat {
  id: number;
  nazev: string;
  slug: string;
  cena: number | null;
  mena: string | null;
  mesto: { nazev: string } | null;
  obrazky: Array<{ url: string }>;
}

interface MaklerDetail {
  id: number;
  jmeno: string;
  slug: string;
  email: string | null;
  telefon: string | null;
  pozice: string;
  moto: string | null;
  popis: string | null;
  fotoUrl: string | null;
  inzeraty: Inzerat[];
}

export default function MaklerDetailClient({ slug }: { slug: string }) {
  const [makler, setMakler] = useState<MaklerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMakler = async () => {
      try {
        const response = await fetch(apiUrl(`/api/makleri/slug/${slug}`));
        const result = await response.json();
        setMakler(result.data || null);
      } catch (error) {
        console.error("Failed to fetch makler:", error);
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
        Makléř nenalezen.
      </div>
    );
  }

  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[35%_65%]">
          <div className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
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

            <h1 className="mt-4 text-2xl font-semibold text-black">
              {makler.jmeno}
            </h1>
            <p className="text-sm text-black/70">{makler.pozice}</p>

            {makler.moto && (
              <p className="mt-3 text-sm italic text-black/70">{makler.moto}</p>
            )}

            <div className="mt-4 space-y-2 text-sm text-black/70">
              {makler.telefon && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[color:var(--gold2)]" />
                  <span>{makler.telefon}</span>
                </div>
              )}
              {makler.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[color:var(--gold2)]" />
                  <span>{makler.email}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-black">O mně</h2>
              <p className="mt-3 text-sm text-black/70">{makler.popis || ""}</p>
            </div>

            <div className="mt-8 rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-black">
                Kontaktovat makléře
              </h2>
              <form
                className="mt-4 grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="text"
                  placeholder="Jméno a příjmení"
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <textarea
                  placeholder="Vaše zpráva"
                  rows={4}
                  className="w-full rounded-xl border-2 border-black/20 bg-white px-4 py-2.5 text-sm text-black shadow-sm focus:border-[color:var(--gold1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold1)]/20"
                />
                <button
                  type="submit"
                  className="btn-main inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--gold1)] px-4 py-2.5 text-sm font-semibold text-black"
                >
                  <Send className="h-4 w-4" />
                  Odeslat
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-black">Aktivní inzeráty</h2>
          {makler.inzeraty.length === 0 ? (
            <p className="mt-3 text-sm text-black/60">
              Zatím žádné aktivní inzeráty.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {makler.inzeraty.map((i) => (
                <div
                  key={i.id}
                  className="group rounded-3xl border border-black/10 bg-white/85 p-5 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/5">
                    {i.obrazky?.[0]?.url ? (
                      <Image
                        src={i.obrazky[0].url}
                        alt={i.nazev}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-black/40">
                        <MapPin className="h-10 w-10" />
                      </div>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-black">
                    {i.nazev}
                  </h3>
                  <p className="text-sm text-black/60">{i.mesto?.nazev || ""}</p>
                  {i.cena && (
                    <p className="mt-2 text-base font-semibold text-black">
                      {i.cena.toLocaleString("cs-CZ")} {i.mena || "CZK"}
                    </p>
                  )}

                  <Link
                    href={`/nabidka/detail?slug=${encodeURIComponent(i.slug)}`}
                    className="btn-main mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[color:var(--gold1)] px-5 py-2.5 text-sm font-semibold text-black"
                  >
                    Detail nabídky
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
