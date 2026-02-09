import Link from "next/link";
import type { Metadata } from "next";
import ServiceIntro from "@/components/ServiceIntro";

export const metadata: Metadata = {
  title: "Pošli tip na reality | Nisa Centrum Reality",
  description:
    "Máte tip na nemovitost k prodeji nebo pronájmu? Pošlete nám kontakt a získejte odměnu, pokud se obchod uskuteční.",
};

// Ikona komponenta
function Icon({ name, className = "" }: { name: string; className?: string }) {
  const icons: Record<string, string> = {
    gift: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z",
    check: "m4.5 12.75 6 6 9-13.5",
    hand: "M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002",
    coin: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    users:
      "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
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

export default function TipniRealituPage() {
  return (
    <main className="min-h-screen bg-white">
      <ServiceIntro
        title="Pošli tip na reality"
        subtitle="Máte tip na nemovitost k prodeji nebo pronájmu? Pošlete nám kontakt a získejte odměnu, pokud se obchod uskuteční."
        primary={{ label: "Poslat tip", href: "/kontakt" }}
        variant="light"
      />

      {/* Jak to funguje */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Jak získat odměnu
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Jednoduchý proces ve třech krocích
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Pošlete kontakt",
                desc: "Pošlete nám kontakt na majitele nemovitosti, kterou by chtěl prodat nebo pronajmout.",
              },
              {
                step: "2",
                title: "Uskutečníme obchod",
                desc: "Pokud se s majitelem domluvíme a obchod úspěšně realizujeme, máte nárok na odměnu.",
              },
              {
                step: "3",
                title: "Získáte odměnu",
                desc: "Po úspěšném dokončení obchodu vám vyplatíme odměnu podle pravidel programu.",
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

      {/* Co doporučit */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Jaké nemovitosti hledáme
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: "hand",
                title: "Nemovitosti k prodeji",
                desc: "Byty, domy, pozemky, komerční objekty - zajímá nás všechno, co majitel chce prodat.",
              },
              {
                icon: "users",
                title: "Nemovitosti k pronájmu",
                desc: "Byty a domy k dlouhodobému pronájmu v Liberci, Ústí nad Labem, Hradci Králové a okolí.",
              },
              {
                icon: "check",
                title: "Osvědčené kontakty",
                desc: "Nejvíce nás zajímají kontakty na majitele, kteří již uvažují o prodeji nebo pronájmu.",
              },
              {
                icon: "coin",
                title: "Férová odměna",
                desc: "Pokud se obchod uskuteční, vyplatíme vám odměnu dle aktuálních pravidel odměňovacího programu.",
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

      {/* Pravidla */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Pravidla programu
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                title: "Musí se jednat o váš vlastní kontakt",
                desc: "Nemovitost nesmí být již aktivně inzerovaná nebo v jednání s jinou realitní kanceláří.",
              },
              {
                title: "Obchod musí být úspěšně dokončen",
                desc: "Odměna je vyplacena až po úspěšném uzavření kupní nebo nájemní smlouvy a předání nemovitosti.",
              },
              {
                title: "Výše odměny závisí na typu obchodu",
                desc: "Konkrétní výši odměny si rádi upřesníme při osobní schůzce nebo telefonátu.",
              },
              {
                title: "Diskrétnost zaručena",
                desc: "S vašimi kontakty zacházíme diskrétně a profesionálně. Vaše jméno nezmíníme bez vašeho souhlasu.",
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
      <section className="border-t border-black/10 bg-white py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Máte tip na reality?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Ozvěte se nám a pošlete kontakt. Rádi se na to podíváme a případně
              vás odmění za úspěšný obchod.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
              >
                Kontaktovat nás
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
