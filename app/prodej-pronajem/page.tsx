
import Link from "next/link";
import ServiceIntro from "@/components/ServiceIntro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prodej a pronájem nemovitostí | Nisa Centrum Reality",
  description:
    "Kompletní servis při prodeji a pronájmu nemovitostí. Home staging, profesionální foto/video, právní dohled a asistence od začátku až do předání klíčů.",
};

// Ikona komponenta (stejná jako na homepage)
function Icon({ name, className = "" }: { name: string; className?: string }) {
  const icons: Record<string, string> = {
    key: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z",
    home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
    camera:
      "M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z",
    shield:
      "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    check: "m4.5 12.75 6 6 9-13.5",
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

export default function ProdejPronajemPage() {
  return (
    <main className="min-h-screen bg-white">
      <ServiceIntro
        title="Prodej a pronájem nemovitostí"
        subtitle="Kompletní servis od začátku až do předání klíčů. S námi prodáte nebo pronajmete rychle, bezpečně a za maximální cenu."
        primary={{
          label: "Nezávazné ocenění zdarma",
          href: "https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9",
          external: true,
        }}
        secondary={{ label: "Kontaktujte nás", href: "/kontakt" }}
        variant="light"
      />

      {/* Proč s námi - přesunuto hned pod hero, aby odpovídalo úvodu */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Proč prodat nebo pronajmout s námi
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                title: "Maximální cena",
                desc: "Díky home stagingu, profesionální prezentaci a znalosti trhu dosáhneme nejvyšší možné prodejní nebo nájemní ceny.",
              },
              {
                title: "Úspora času",
                desc: "Postaráme se o vše - od prohlídek, přes vyjednávání až po předání. Nemusíte se o nic starat.",
              },
              {
                title: "Bezpečnost",
                desc: "Advokátní dohled, prověření kupců/nájemníků a úschova peněz zajistí bezpečný převod.",
              },
              {
                title: "Osobní přístup",
                desc: "Jsme rodinná firma. Ke každému klientovi přistupujeme individuálně s maximální péčí.",
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

      {/* Co zahrnuje prodej */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Co zahrnuje prodej nemovitosti
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Komplexní služby, které vám zajistí bezproblémový a úspěšný prodej
              za nejvyšší možnou cenu
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "camera",
                title: "Home staging a profesionální foto/video",
                desc: "Připravíme vaši nemovitost tak, aby zaujala na první pohled. Kvalitní fotografie, video a 3D prohlídky.",
              },
              {
                icon: "home",
                title: "Inzerce a propagace",
                desc: "Váš inzerát umístíme na všechny hlavní portály a cíleně propagujeme na sociálních sítích.",
              },
              {
                icon: "key",
                title: "Organizace prohlídek",
                desc: "Zajistíme a zrealizujeme všechny prohlídky s potenciálními kupci podle vašeho času.",
              },
              {
                icon: "shield",
                title: "Právní dohled a advokátní servis",
                desc: "Spolupracujeme s ověřenými právníky, kteří zajistí bezpečný převod vlastnictví.",
              },
              {
                icon: "check",
                title: "Vyjednávání a uzavření smlouvy",
                desc: "Vyjednáme nejlepší podmínky, připravíme smlouvy a provedeme vás celým procesem.",
              },
              {
                icon: "key",
                title: "Předání klíčů",
                desc: "Asistujeme při předání nemovitosti, zajistíme energetické revize a přepis smluv.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm"
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

      {/* Co zahrnuje pronájem */}
      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Co zahrnuje pronájem nemovitosti
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Najdeme vám spolehlivého nájemníka a zajistíme všechny náležitosti
              pro bezproblémový pronájem
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: "camera",
                title: "Profesionální prezentace",
                desc: "Vytvoříme atraktivní inzerát s kvalitními fotografiemi a popisem, který osloví ty pravé zájemce.",
              },
              {
                icon: "home",
                title: "Prověření zájemců",
                desc: "Pečlivě prověříme všechny zájemce, ověříme jejich bonitu a reference.",
              },
              {
                icon: "check",
                title: "Rezervační a nájemní smlouva",
                desc: "Připravíme kompletní dokumentaci a zajistíme právně čisté smlouvy.",
              },
              {
                icon: "key",
                title: "Předání nemovitosti",
                desc: "Asistujeme při předání, sepíšeme protokol a zajistíme hladký přechod.",
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
              Proč prodat nebo pronajmout s námi
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                title: "Maximální cena",
                desc: "Díky home stagingu, profesionální prezentaci a znalosti trhu dosáhneme nejvyšší možné prodejní nebo nájemní ceny.",
              },
              {
                title: "Úspora času",
                desc: "Postaráme se o vše - od prohlídek, přes vyjednávání až po předání. Nemusíte se o nic starat.",
              },
              {
                title: "Bezpečnost",
                desc: "Advokátní dohled, prověření kupců/nájemníků a úschova peněz zajistí bezpečný převod.",
              },
              {
                title: "Osobní přístup",
                desc: "Jsme rodinná firma. Ke každému klientovi přistupujeme individuálně s maximální péčí.",
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
      <section className="border-t border-black/10 py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black sm:text-4xl">
              Začněte ještě dnes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/70">
              Ozvěte se nám a domluvíme si osobní schůzku nebo nezávazné ocenění
              vaší nemovitosti zdarma.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black transition hover:bg-[color:var(--gold1)]/90"
              >
                Ocenění zdarma
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black transition hover:border-[color:var(--gold1)]"
              >
                Kontaktovat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
