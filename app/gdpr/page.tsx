import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Ochrana osobních údajů (GDPR) | Nisa Centrum Reality",
  description:
    "Zásady ochrany osobních údajů (GDPR) společnosti NISACENTRUM s.r.o. včetně účelu zpracování, práv subjektu údajů a kontaktních údajů.",
  alternates: {
    canonical: `${siteUrl}/gdpr/`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GdprPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 xl:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-black/60">
        Právní informace
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-black sm:text-5xl">
        <span className="inline-flex flex-col items-start">
          <span>Ochrana osobních údajů (GDPR)</span>
          <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
        </span>
      </h1>

      <div className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white/80 p-6 text-sm leading-7 text-black/75 shadow-sm sm:p-8">
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-black">
            <ShieldCheck className="h-5 w-5 text-[color:var(--gold2)]" />
            1. Správce údajů
          </h2>
          <p className="mt-2">
            Správcem osobních údajů je <strong>NISACENTRUM s.r.o.</strong>,
            IČO 27273385, se sídlem Zámečnická 563/8, Liberec IV - Perštýn,
            46001 Liberec.
          </p>
          <p>
            Kontakt:{" "}
            <a className="font-medium text-black hover:text-black/70" href="mailto:info@nisacentrum.cz">
              info@nisacentrum.cz
            </a>
            ,{" "}
            <a className="font-medium text-black hover:text-black/70" href="tel:+420721292462">
              +420 721 292 462
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">2. Jaké údaje zpracováváme</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>identifikační a kontaktní údaje z formulářů (jméno, e-mail, telefon),</li>
            <li>obsah zprávy a předmět poptávky,</li>
            <li>provozní technické údaje nutné pro bezpečný chod webu a API.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">3. Účel a právní základ</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>vyřízení poptávky a komunikace se zájemcem,</li>
            <li>plnění zákonných povinností,</li>
            <li>ochrana systému proti zneužití a bezpečnost provozu.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">4. Vaše práva</h2>
          <p className="mt-2">
            Máte právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost,
            námitku a právo podat stížnost u ÚOOÚ (
            <a
              className="font-medium text-black hover:text-black/70"
              href="https://www.uoou.cz"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.uoou.cz
            </a>
            ).
          </p>
        </section>

        <p className="text-xs text-black/55">Poslední aktualizace: 20. února 2026.</p>
      </div>
    </div>
  );
}
