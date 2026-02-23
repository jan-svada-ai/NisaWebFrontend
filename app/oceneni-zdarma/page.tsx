import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Ocenění nemovitosti zdarma | Nisa Centrum Reality",
  description:
    "Nezávazné a profesionální ocenění vaší nemovitosti zdarma. Získejte reálnou tržní hodnotu na základě prohlídky a analýzy trhu.",
  alternates: {
    canonical: `${SITE_URL}/oceneni-zdarma/`,
  },
};

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
      <section className="relative overflow-hidden border-b border-black/10 bg-gradient-to-br from-[#F6E3B1]/20 via-white to-white pt-24 pb-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
              Ocenění nemovitosti zdarma
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-black/70">
              Zjistěte reálnou tržní hodnotu vaší nemovitosti. Nezávazně,
              profesionálně a bez skrytých podmínek.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-lg leading-relaxed text-black/70">
              Ocenění vychází z osobní prohlídky, aktuálních dat z trhu a
              dlouhodobé znalosti regionu. Dostanete jasný základ pro další
              rozhodnutí.
            </p>
            <div className="mt-8">
              <a
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-main inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
              >
                Získat ocenění zdarma
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black sm:text-5xl">
              Jak probíhá ocenění
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-black/70">
              Jednoduchý a srozumitelný postup od prvního kontaktu po
              orientační cenové rozpětí.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Vyplníte základní údaje",
                desc: "Zadáte informace o nemovitosti: lokalitu, typ, velikost, stav a časovou představu.",
              },
              {
                step: "2",
                title: "Proběhne prohlídka",
                desc: "Podíváme se na nemovitost osobně a zhodnotíme její skutečný stav i prezentační potenciál.",
              },
              {
                step: "3",
                title: "Dostanete odhad",
                desc: "Obdržíte orientační tržní cenu s vysvětlením, z čeho vychází a jak ji dál využít.",
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

      <section className="border-b border-black/10 bg-[#F6E3B1]/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black sm:text-5xl">
              Co zahrnuje naše ocenění
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "eye",
                title: "Osobní prohlídka",
                desc: "Navštívíme vaši nemovitost, zhodnotíme dispozici, stav i detaily, které mají vliv na cenu.",
              },
              {
                icon: "chart",
                title: "Analýza trhu",
                desc: "Porovnáme ceny srovnatelných nemovitostí v okolí a aktuální tržní situaci.",
              },
              {
                icon: "document",
                title: "Jasný výstup",
                desc: "Dostanete srozumitelný odhad ceny a doporučení, jak postupovat dál při prodeji nebo pronájmu.",
              },
              {
                icon: "check",
                title: "Nezávazný proces",
                desc: "Ocenění je nezávazné. Máte prostor se rozhodnout, jestli chcete v dalším kroku spolupracovat.",
              },
              {
                icon: "shield",
                title: "Bez skrytých poplatků",
                desc: "Opravdu zdarma, bez skrytých nákladů a bez nepříjemných překvapení.",
              },
              {
                icon: "home",
                title: "Doporučení strategie",
                desc: "Navrhneme další postup, jak nemovitost připravit na trh a jak zvýšit šanci na lepší výsledek.",
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

      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black sm:text-5xl">
              Proč si nechat nemovitost ocenit
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                title: "Reálná tržní cena",
                desc: "Získáte skutečnou představu o hodnotě nemovitosti, ne jen orientační číslo z online kalkulace.",
              },
              {
                title: "Lepší vyjednávací pozice",
                desc: "Správné nacenění je základ pro vyšší finální cenu i pro rychlejší rozhodování zájemců.",
              },
              {
                title: "Rychlejší obchod",
                desc: "Realisticky nastavená cena zkracuje dobu inzerce a omezuje zbytečná kola vyjednávání.",
              },
              {
                title: "Strategie dalších kroků",
                desc: "Dozvíte se, co před prodejem upravit, na co dát důraz v prezentaci a jak nastavit ideální postup.",
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

      <section className="border-t border-black/10 bg-gradient-to-br from-[#F6E3B1]/20 to-white py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black sm:text-5xl">
              Získejte ocenění ještě dnes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Vyplňte jednoduchý formulář a ozveme se vám s návrhem dalšího
              postupu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-main inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
              >
                Vyplnit formulář
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black"
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


