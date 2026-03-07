import type { Metadata } from "next";
import { Cookie } from "lucide-react";
import OpenCookieSettingsButton from "@/components/OpenCookieSettingsButton";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Zásady cookies | Nisa Centrum Reality",
  description:
    "Informace o používání cookies na webu Nisa Centrum Reality, účelech jednotlivých kategorií a možnostech správy souhlasu.",
  alternates: {
    canonical: `${siteUrl}/cookies`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 xl:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-black/60">Právní informace</p>
      <h1 className="mt-2 text-4xl font-semibold text-black sm:text-5xl">
        <span className="inline-flex flex-col items-start">
          <span>Zásady cookies</span>
          <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
        </span>
      </h1>

      <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 text-sm leading-7 text-black/75 shadow-sm sm:p-8">
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-black">
            <Cookie className="h-5 w-5 text-[color:var(--gold2)]" />
            1. Co jsou cookies
          </h2>
          <p className="mt-2">
            Cookies a obdobné technologie jsou malé datové soubory, které web ukládá do vašeho
            zařízení. Pomáhají zajistit technické fungování webu, zapamatovat si vaše nastavení a,
            pokud k tomu dáte souhlas, měřit návštěvnost a používání webu.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">2. Jaké kategorie používáme</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>Nezbytné cookies</strong> jsou nutné pro technické fungování webu, zabezpečení
              provozu a uložení vaší volby ohledně cookies. Tyto cookies nelze vypnout.
            </li>
            <li>
              <strong>Analytické cookies</strong> používáme pouze na základě vašeho souhlasu pro
              měření návštěvnosti a vyhodnocení používání webu prostřednictvím Google Analytics 4.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">3. Konkrétní nástroje a poskytovatelé</h2>
          <div className="mt-2 space-y-3">
            <p>
              <strong>Google Analytics 4</strong>
              <br />
              Poskytovatel: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irsko.
            </p>
            <p>
              Google Analytics 4 spouštíme až po udělení souhlasu s analytickými cookies. Ukládané
              cookies mohou zahrnovat např. <code>_ga</code> a <code>_ga_*</code>. Účel: statistika
              návštěvnosti, vyhodnocení výkonnosti stránek a zlepšování obsahu.
            </p>
            <p>
              Podrobnosti o zpracování dat společnosti Google:
              {" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-black hover:text-black/70"
              >
                Zásady ochrany soukromí Google
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">4. Právní základ</h2>
          <p className="mt-2">
            Nezbytné cookies používáme z důvodu zajištění technického provozu webu. Analytické
            cookies používáme pouze na základě vašeho souhlasu, který můžete kdykoliv změnit nebo
            odvolat.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">5. Jak můžete souhlas spravovat</h2>
          <p className="mt-2">
            Své nastavení můžete kdykoliv upravit přes tlačítko pro nastavení cookies, které je na
            webu stále dostupné. Cookies můžete také odstranit nebo blokovat v nastavení svého
            prohlížeče. V takovém případě ale nemusí některé části webu fungovat podle očekávání.
          </p>
          <div className="mt-4">
            <OpenCookieSettingsButton />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">6. Aktualizace tohoto dokumentu</h2>
          <p className="mt-2">
            Tento dokument můžeme přiměřeně aktualizovat podle změn používaných technologií nebo
            právních požadavků. Aktuální verze je vždy zveřejněna na této stránce.
          </p>
        </section>

        <p className="text-xs text-black/55">Poslední aktualizace: 7. března 2026.</p>
      </div>
    </div>
  );
}
