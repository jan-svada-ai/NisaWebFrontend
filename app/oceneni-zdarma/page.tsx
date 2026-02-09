
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocenění nemovitosti zdarma | Nisa Centrum Reality",
  description:
    "Nezávazné a profesionální ocenění vaší nemovitosti zdarma. Získáte reálnou tržní hodnotu založenou na prohlídce a analýze trhu.",
};

// Ikona komponenta
function Icon({ name, className = "" }: { name: string; className?: string }) {
  const icons: Record<string, string> = {
    shield:
      "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    check: "m4.5 12.75 6 6 9-13.5",
    chart:
      "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
    eye: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    document:
      "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className || "h-6 w-6"}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
    </svg>
  );
}

export default function OceneniZdarmaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero sekce */}
      <section className="relative overflow-hidden border-b border-black/10 bg-gradient-to-br from-[#F6E3B1]/20 via-white to-white pt-24 pb-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
              Ocenění nemovitosti zdarma
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-black/70">
              Zjistěte reálnou tržní hodnotu vaší nemovitosti. Nezávazně,
              profesionálně a zcela zdarma.
            </p>
            <div className="mt-8">
              <a
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
              >
                Získat ocenění zdarma
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Jak funguje ocenění */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Jak probíhá ocenění
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Jednoduše a rychle - do 24 hodin máte orientační cenu
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Vyplňte formulář",
                desc: "Zadejte základní údaje o vaší nemovitosti - adresu, typ, velikost a stav.",
              },
              {
                step: "2",
                title: "Osobní prohlídka",
                desc: "Domluví se osobní prohlídka, při které si nemovitost pečlivě prohlédneme.",
              },
              {
                step: "3",
                title: "Získáte ocenění",
                desc: "Do 24 hodin obdržíte reálnou tržní cenu založenou na analýze trhu a srovnání.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--gold1)]/35 text-2xl font-bold text-black">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-black/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co zahrnuje ocenění */}
      <section className="border-b border-black/10 bg-[#F6E3B1]/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Co zahrnuje naše ocenění
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "eye",
                title: "Osobní prohlídka",
                desc: "Navštívíme vaši nemovitost, prohlédneme si její stav, vybavení a dispozice.",
              },
              {
                icon: "chart",
                title: "Analýza trhu",
                desc: "Porovnáme ceny srovnatelných nemovitostí v okolí a aktuální situaci na trhu.",
              },
              {
                icon: "document",
                title: "Detailní zpráva",
                desc: "Obdržíte písemné ocenění s orientačním rozpětím prodejní ceny.",
              },
              {
                icon: "check",
                title: "Nezávazné",
                desc: "Ocenění je zcela nezávazné - nemusíte s námi uzavřít smlouvu.",
              },
              {
                icon: "shield",
                title: "Bez skrytých poplatků",
                desc: "Opravdu zdarma, bez jakýchkoliv skrytých nákladů nebo závazků.",
              },
              {
                icon: "home",
                title: "Doporučení postupu",
                desc: "Poradíme vám, jak připravit nemovitost na prodej a dosáhnout nejlepší ceny.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--gold1)]/35 text-black">
                  <Icon name={item.icon} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proč si nechat ocenit */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Proč si nechat nemovitost ocenit
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                title: "Reálná tržní cena",
                desc: "Zjistíte skutečnou hodnotu vaší nemovitosti na aktuálním trhu, ne jen odhad podle internetových kalkulaček.",
              },
              {
                title: "Maximalizace zisku",
                desc: "Správné ocenění je klíčem k dosažení nejvyšší možné prodejní ceny. Příliš vysoká cena odradí kupce, příliš nízká vás připraví o peníze.",
              },
              {
                title: "Rychlejší prodej",
                desc: "Realisticky oceněná nemovitost se prodá rychleji a s menším počtem vyjednávání.",
              },
              {
                title: "Profesionální poradenství",
                desc: "Dozvíte se, jak připravit nemovitost na prodej a co můžete zlepšit pro dosažení vyšší ceny.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-black/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA sekce */}
      <section className="border-t border-black/10 bg-gradient-to-br from-[#F6E3B1]/20 to-white py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Získejte ocenění ještě dnes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Vyplňte jednoduchý formulář a do 24 hodin se vám ozveme s
              orientačním oceněním.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
              >
                Vyplnit formulář
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black transition hover:border-[color:var(--gold1)]"
              >
                Kontaktovat přímo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
