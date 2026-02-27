import type { Metadata } from "next";
import { Cookie } from "lucide-react";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Zásady cookies | Nisa Centrum Reality",
  description:
    "Informace o používání cookies na webu Nisa Centrum Reality, jejich účelu a možnostech správy souhlasu.",
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
            Cookies jsou malé textové soubory, které web ukládá do vašeho zařízení.
            Umožňují správné fungování webu, zapamatování voleb uživatele a v některých
            případech i měření návštěvnosti.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">2. Jaké cookies používáme</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Nezbytné cookies</strong> pro technické fungování webu a bezpečnost provozu.
            </li>
            <li>
              <strong>Funkční cookies</strong> pro lepší uživatelský komfort (např. preference zobrazení).
            </li>
            <li>
              <strong>Obsah třetích stran</strong> (např. mapové podklady) může nastavovat vlastní cookies
              podle podmínek příslušného poskytovatele.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">3. Právní základ</h2>
          <p className="mt-2">
            Nezbytné cookies používáme na základě oprávněného zájmu na provozu webu.
            Ostatní cookies používáme pouze na základě vašeho souhlasu, pokud je vyžadován.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">4. Jak můžete cookies spravovat</h2>
          <p className="mt-2">
            Cookies můžete kdykoliv omezit nebo smazat v nastavení prohlížeče. Po vypnutí
            nezbytných cookies nemusí některé části webu fungovat správně.
          </p>
        </section>

        <p className="text-xs text-black/55">Poslední aktualizace: 25. února 2026.</p>
      </div>
    </div>
  );
}
