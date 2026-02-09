import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vyhledávání nemovitosti na míru | Nisa Centrum Reality",
  description:
    "Hledáme nemovitost přesně podle vašich požadavků. Aktivně monitorujeme trh, spolupracujeme s makléři a najdeme i nevystavené nemovitosti.",
};

// Ikona komponenta
function Icon({ name, className = "" }: { name: string; className?: string }) {
  const icons: Record<string, string> = {
    search:
      "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
    check: "m4.5 12.75 6 6 9-13.5",
    home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    eye: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    users:
      "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    bell: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
    shield:
      "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
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

export default function VyhledavaniNaMiruPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero sekce */}
      <section className="relative overflow-hidden border-b border-black/10 bg-gradient-to-br from-[#F6E3B1]/20 via-white to-white pt-24 pb-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
              Vyhledávání nemovitosti na míru
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-black/70">
              Ušetříte čas a nenecháte si ujít tu pravou nemovitost. Aktivně
              hledáme podle vašich požadavků a najdeme i ty, co nejsou veřejně
              inzerované.
            </p>
            <div className="mt-8">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
              >
                Chci najít nemovitost
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Jak to funguje */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Jak funguje vyhledávání na míru
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Od zadání požadavků po předání klíčů - postaráme se o všechno
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Konzultace",
                desc: "Sejdeme se a podrobně probereme vaše požadavky, rozpočet, preferované lokality a časový harmonogram.",
              },
              {
                step: "2",
                title: "Aktivní hledání",
                desc: "Denně sledujeme všechny portály, komunikujeme s dalšími makléři a vyhledáváme i nevystavené nemovitosti.",
              },
              {
                step: "3",
                title: "Výběr a prohlídky",
                desc: "Předvýběr těch nejlepších nabídek podle vašich kritérií a organizace prohlídek v termínech, které vám vyhovují.",
              },
              {
                step: "4",
                title: "Dokončení",
                desc: "Vyjednávání nejlepší ceny, asistence při podpisu smlouvy a kompletní právní dohled až do předání.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--gold1)]/35 text-2xl font-bold text-black">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-black/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co zahrnuje služba */}
      <section className="border-b border-black/10 bg-[#F6E3B1]/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Co služba zahrnuje
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "search",
                title: "Aktivní monitoring trhu",
                desc: "Denně procházíme všechny realitní portály a okamžitě vás informujeme o nových nabídkách.",
              },
              {
                icon: "users",
                title: "Spolupráce s makléři",
                desc: "Využíváme naši síť kontaktů a komunikujeme s dalšími realitními kancelářemi.",
              },
              {
                icon: "home",
                title: "Nevystavené nemovitosti",
                desc: "Najdeme i nemovitosti, které nejsou veřejně inzerované, ale vlastníci je chtějí prodat.",
              },
              {
                icon: "eye",
                title: "Organizace prohlídek",
                desc: "Domluvíme a zorganizujeme všechny prohlídky v termínech, které vám vyhovují.",
              },
              {
                icon: "check",
                title: "Prověření nemovitosti",
                desc: "Zkontrolujeme právní stav, existence věcných břemen, dluhů nebo jiných závad.",
              },
              {
                icon: "shield",
                title: "Vyjednávání a asistence",
                desc: "Vyjednáme nejlepší cenu, pomůžeme se smlouvou a právním dohledem až do předání.",
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

      {/* Proč s námi */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Proč hledat nemovitost s námi
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                title: "Ušetříte čas",
                desc: "Nemusíte denně procházet desítky inzerátů. My to uděláme za vás a pošleme pouze ty, které odpovídají vašim požadavkům.",
              },
              {
                title: "Nenecháte si ujít příležitost",
                desc: "Díky dennímu monitoringu a síti kontaktů se o nových nabídkách dozvíte jako první a budete mít náskok před ostatními zájemci.",
              },
              {
                title: "Přístup k nevystaveným nemovitostem",
                desc: "Máme přístup k nemovitostem, které nejsou veřejně inzerované, ale majitelé je chtějí prodat.",
              },
              {
                title: "Bezpečnost a právní ochrana",
                desc: "Prověříme právní stav nemovitosti a zajistíme kompletní právní dohled při koupi.",
              },
              {
                title: "Lepší vyjednávací pozice",
                desc: "S naší pomocí dosáhnete lepší ceny a podmínek. Známe trh a víme, jak vyjednávat.",
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
              Začněme hledat váš nový domov
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Domluvte si schůzku a probereme vaše požadavky. Pak se pustíme do
              aktivního hledání.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
              >
                Domluvit schůzku
              </Link>
              <Link
                href="/#faq"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black transition hover:border-[color:var(--gold1)]"
              >
                Časté dotazy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
