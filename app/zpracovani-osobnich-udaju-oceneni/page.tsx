import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Zpracování osobních údajů pro ocenění nemovitosti | Nisa Centrum Reality",
  description:
    "Podmínky zpracování osobních údajů při online ocenění nemovitosti, včetně účelu, doby uchování a práv subjektů údajů.",
  alternates: {
    canonical: `${siteUrl}/zpracovani-osobnich-udaju-oceneni`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OceneniPrivacyPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 xl:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-black/60">Právní informace</p>
      <h1 className="mt-2 text-4xl font-semibold text-black sm:text-5xl">
        <span className="inline-flex flex-col items-start">
          <span>Zpracování osobních údajů pro online ocenění</span>
          <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
        </span>
      </h1>

      <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 text-sm leading-7 text-black/75 shadow-sm sm:p-8">
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-black">
            <ShieldCheck className="h-5 w-5 text-[color:var(--gold2)]" />
            1. Jaké údaje při ocenění zpracováváme
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>jméno a příjmení, e-mail, telefon,</li>
            <li>parametry nemovitosti zadané do formuláře ocenění,</li>
            <li>technické údaje požadavku (čas, IP adresa) kvůli ochraně před zneužitím.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">2. Proč údaje zpracováváme</h2>
          <p className="mt-2">
            Údaje zpracováváme za účelem vyhotovení orientačního online odhadu ceny nemovitosti,
            předání výsledku internímu týmu a následné komunikace se zájemcem.
          </p>
          <p className="mt-2">
            Kontaktní poptávka se odesílá interně odděleně od výpočtu, aby byla doručena i při
            dočasné nedostupnosti externí oceňovací služby.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">3. Právní základ</h2>
          <p className="mt-2">
            Právním základem je souhlas subjektu údajů a dále oprávněný zájem správce na bezpečnosti
            služeb a ochraně proti zneužití.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">4. Doba uchování</h2>
          <p className="mt-2">
            Údaje uchováváme po dobu nezbytnou k vyřízení poptávky, následné obchodní komunikaci
            a ochraně právních nároků. Následně jsou údaje bezpečně odstraněny nebo anonymizovány.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">5. Předávání třetím stranám</h2>
          <p className="mt-2">
            V rozsahu nutném pro ocenění může docházet k předání technických údajů smluvnímu
            poskytovateli oceňovací technologie. Kontaktní údaje zůstávají primárně pod správou
            společnosti NISACENTRUM s.r.o.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">6. Vaše práva</h2>
          <p className="mt-2">
            Máte právo požadovat přístup, opravu, výmaz, omezení zpracování, přenositelnost a podat
            námitku. Úplný přehled práv je uveden na stránce{" "}
            <Link href="/gdpr/" className="font-medium text-black hover:text-black/70">
              GDPR
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">7. Kontakt pro uplatnění práv</h2>
          <p className="mt-2">
            E-mail:{" "}
            <a className="font-medium text-black hover:text-black/70" href="mailto:info@nisacentrum.cz">
              info@nisacentrum.cz
            </a>
            {" "} | Telefon:{" "}
            <a className="font-medium text-black hover:text-black/70" href="tel:+420721292462">
              +420 721 292 462
            </a>
          </p>
        </section>

        <p className="text-xs text-black/55">Poslední aktualizace: 25. února 2026.</p>
      </div>
    </div>
  );
}
