import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SITE_URL } from "@/lib/site-url";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Ochrana osobních údajů (GDPR) | Nisa Centrum Reality",
  description:
    "Informace o zpracování osobních údajů společností NISACENTRUM s.r.o., včetně práv subjektů údajů a kontaktů pro uplatnění práv.",
  alternates: {
    canonical: `${siteUrl}/gdpr`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GdprPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 xl:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-black/60">Právní informace</p>
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
            1. Správce osobních údajů
          </h2>
          <p className="mt-2">
            Správcem osobních údajů je <strong>NISACENTRUM s.r.o.</strong>, IČO 27273385,
            se sídlem Zámečnická 563/8, Liberec IV - Perštýn, 460 01 Liberec.
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
            <li>identifikační a kontaktní údaje (jméno, e-mail, telefon),</li>
            <li>obsah zpráv z kontaktních formulářů,</li>
            <li>údaje o poptávce (lokalita, parametry nemovitosti, účel poptávky),</li>
            <li>provozní a bezpečnostní technické údaje (např. IP adresa, čas požadavku).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">3. Účely a právní základy zpracování</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>vyřízení poptávky a komunikace se zájemcem,</li>
            <li>plnění smluvních a předsmluvních povinností,</li>
            <li>ochrana proti zneužití služeb a zajištění bezpečnosti provozu,</li>
            <li>plnění zákonných povinností správce.</li>
          </ul>
          <p className="mt-2">
            U online odhadu ceny nemovitosti platí podrobnější pravidla, která jsou uvedena na stránce{" "}
            <Link href="/zpracovani-osobnich-udaju-oceneni/" className="font-medium text-black hover:text-black/70">
              Zpracování osobních údajů pro online ocenění
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">4. Doba uchování</h2>
          <p className="mt-2">
            Osobní údaje uchováváme po dobu nezbytnou pro vyřízení poptávky a ochranu právních nároků,
            případně po dobu vyplývající z právních předpisů.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">5. Příjemci údajů</h2>
          <p className="mt-2">
            Údaje mohou být zpřístupněny našim smluvním zpracovatelům (hosting, e-mailové služby,
            technická podpora, nástroje pro oceňování), vždy pouze v rozsahu nutném k plnění účelu.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black">6. Vaše práva</h2>
          <p className="mt-2">
            Máte právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost údajů, námitku
            proti zpracování a právo podat stížnost u ÚOOÚ (
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

        <p className="text-xs text-black/55">Poslední aktualizace: 25. února 2026.</p>
      </div>
    </div>
  );
}
