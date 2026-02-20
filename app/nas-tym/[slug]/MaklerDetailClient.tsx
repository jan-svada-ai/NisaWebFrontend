"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ListChecks, Mail, MapPin, Phone, Send, UserRound, Users } from "lucide-react";
import { fetchJsonWithRetry } from "@/lib/api";

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

function resolveCurrencyLabel(value: string | null): string {
  const normalized = (value ?? "").trim().toUpperCase();
  if (!normalized || normalized === "CZK" || normalized === "KC" || normalized === "KČ") {
    return "Kč";
  }
  return normalized;
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

  return (
    <main
      className="min-h-screen pt-20"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-12 xl:px-6 2xl:pr-28">
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

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-black">
            <span className="inline-flex flex-col items-start">
              <span className="inline-flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-[color:var(--gold2)]" />
                Aktivní inzeráty
              </span>
              <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h2>
          {makler.inzeraty.length === 0 ? (
            <p className="mt-3 text-sm text-black/60">Zatím žádné aktivní inzeráty.</p>
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

                  <h3 className="mt-3 text-lg font-semibold text-black">{i.nazev}</h3>
                  <p className="text-sm text-black/60">{i.mesto?.nazev || ""}</p>
                  <p className="mt-2 text-base font-semibold text-black">
                    {i.cena && i.cena > 0
                      ? `${i.cena.toLocaleString("cs-CZ")} ${resolveCurrencyLabel(i.mena)}`
                      : "Cena na dotaz"}
                  </p>

                  <a
                    href={`/nabidka/detail/?slug=${encodeURIComponent(i.slug)}`}
                    className="btn-main mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[color:var(--gold1)] px-5 py-2.5 text-sm font-semibold text-black"
                  >
                    Detail nabídky
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


