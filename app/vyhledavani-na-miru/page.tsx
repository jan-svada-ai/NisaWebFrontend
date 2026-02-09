import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Compass,
  Hourglass,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import StepCarousel from "./StepCarousel";

export const metadata: Metadata = {
  title: "Vyhledavani nemovitosti na miru | Nisa Centrum Reality",
  description:
    "Najdeme nemovitost podle vasich pozadavku. Jasny postup, provereni nabidek a bezpecne dotazeni celeho procesu.",
};

type StepCard = {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: "search" | "users" | "home" | "fileCheck" | "key";
};

const searchSteps: StepCard[] = [
  {
    id: "vyhledavani-zadani",
    number: 1,
    title: "Zadani pozadavku",
    description:
      "Spolecne nastavime parametry: lokalita, dispozice, rozpocet, termin i priority. Ujasnime, co je nutnost a co vyhoda.",
    duration: "1-3 dny",
    icon: "search",
  },
  {
    id: "vyhledavani-monitoring",
    number: 2,
    title: "Aktivni monitoring",
    description:
      "Prubezne sledujeme trh, reagujeme na nove nabidky a oslovujeme i nevelejne zdroje, kdyz to dava smysl.",
    duration: "2-4 tydny",
    icon: "users",
  },
  {
    id: "vyhledavani-predvyber",
    number: 3,
    title: "Predvyber nabidek",
    description:
      "Vyfiltrujeme relevantni moznosti, aby sel vas cas jen do nemovitosti, ktere realne odpovidaji zadani.",
    duration: "3-10 dni",
    icon: "home",
  },
  {
    id: "vyhledavani-prohlidky",
    number: 4,
    title: "Prohlidky a porovnani",
    description:
      "Organizujeme prohlidky, porovnavame plusy a minusy a doporucime varianty s nejlepsim pomerem ceny a potencialu.",
    duration: "1-3 tydny",
    icon: "key",
  },
  {
    id: "vyhledavani-overeni",
    number: 5,
    title: "Provereni nemovitosti",
    description:
      "Kontrolujeme pravni a technicka rizika jeste pred finalnim rozhodnutim, aby nevznikly drahe komplikace.",
    duration: "3-10 dni",
    icon: "fileCheck",
  },
  {
    id: "vyhledavani-dokonceni",
    number: 6,
    title: "Vyjednani a dokonceni",
    description:
      "Pomuzeme s vyjednanim podminek a dotazenim smluvniho procesu do bezpecneho konce.",
    duration: "2-4 tydny",
    icon: "fileCheck",
  },
];

const benefits = [
  {
    icon: Compass,
    title: "Jasna orientace na trhu",
    text: "Nemusite prochazet stovky nabidek. Dostanete jen relevantni vyber.",
    detail:
      "Vybirame podle priorit, ne podle mnozstvi. Setrime cas a zvysujeme sanci na kvalitni rozhodnuti bez zbytecneho stresu.",
  },
  {
    icon: Search,
    title: "Rychlejsi reakce",
    text: "Sledujeme trh prubezne a umime reagovat hned po zverejneni nove nabidky.",
    detail:
      "U atraktivnich nemovitosti rozhoduji hodiny. Diky aktivnimu monitoringu mate naskok pred beznou poptavkou.",
  },
  {
    icon: ShieldCheck,
    title: "Nizsi riziko chyb",
    text: "Proverujeme klicove body, ktere casto zpusobuji problemy az po podpisu.",
    detail:
      "Pravni, technicke i procesni detaily resime predem, aby nevznikaly drahe komplikace a zdrzeni.",
  },
  {
    icon: Sparkles,
    title: "Lepci vyjednavaci pozice",
    text: "Pomahame s cenou i podminkami tak, aby vysledek odpovidal vasim cilum.",
    detail:
      "Diky datum, zkusenosti a priprave je jednani vecne, rychle a srozumitelne. Cilem je dobra nemovitost za dobre podminky.",
  },
];

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-4xl font-semibold text-black md:text-5xl">{title}</h2>
      <div className="mx-auto mt-3 h-[6px] w-64 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
      <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

export default function VyhledavaniNaMiruPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, var(--paper0), var(--paper1) 45%, var(--paper2))",
      }}
    >
      <section className="relative isolate min-h-dvh overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-[1.2] contrast-[1.05] saturate-[1.05]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/12 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.56)_40%,rgba(0,0,0,0.26)_72%,rgba(0,0,0,0.1)_100%)]" />

        <div className="relative z-10 flex min-h-dvh items-center justify-center px-6 py-20 text-center">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              Vyhledavani nemovitosti na miru
            </h1>
            <div className="mx-auto mt-3 h-[6px] w-80 [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />

            <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Najdeme nabidky, ktere odpovidaji vasim prioritam. Od zadani
              pozadavku az po bezpecne dotazeni obchodu.
            </p>

            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <a
                href="#jak-funguje-vyhledavani"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <Search className="h-5 w-5" />
                Jak funguje vyhledavani?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm lg:col-span-2"
              >
                <Mail className="h-5 w-5" />
                Kontaktujte nas
              </Link>
              <Link
                href="/co-vse-pro-vas-udelame"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-7 py-4 text-base font-semibold text-black lg:col-span-2"
              >
                <ArrowRight className="h-5 w-5" />
                Co vse pro vas udelame
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="jak-funguje-vyhledavani"
        className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center"
      >
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Jak funguje vyhledavani na miru"
            subtitle="Jasny proces, ktery setri cas a drzi kvalitu vyberu i bezpecnost celeho obchodu."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Nepracujeme stylem &quot;posleme vse, co se objevi&quot;. Nejprve nastavime
            kriteria, potom filtrujeme trh a az nasledne jdeme do prohlidek a
            overovani. Diky tomu mate prehled i jistotu.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Nasim cilem je najit nemovitost, ktera dava smysl dlouhodobe,
            nejen na prvni pohled. Proto kazdou variantu hodnotime i z pohledu
            rizik, potencialu a skutecnych nakladu.
          </p>
          <StepCarousel steps={searchSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkovy odhad: priblizne 1-3 mesice podle trhu a vasich priorit.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Proc hledat nemovitost s nami"
            subtitle="Vyhledavani vedeme datove a procesne. Cilem je lepsi vysledek, ne vice chaosu."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Dobra koupe neni nahoda. Je to kombinace rychle reakce, kvalitniho
            vyberu, provereni rizik a vyjednani podminek, ktere davaji smysl.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            U kazdeho klienta nastavujeme individualni postup podle toho, zda
            kupuje prvni bydleni, investicni byt nebo vetsi rodinny dum.
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-3">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <details
                  key={item.title}
                  className="group rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6E3B1] ring-1 ring-black/10">
                      <Icon className="h-5 w-5 text-black" />
                    </span>
                    <span className="flex-1 text-left">
                      <span className="block text-lg font-semibold text-black">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm text-black/70">
                        {item.text}
                      </span>
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black/70 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 border-l-2 border-[color:var(--gold1)]/35 pl-4 text-sm leading-relaxed text-black/65">
                    {item.detail}
                  </p>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4 text-center">
          <SectionHeading
            title="Zacnete jeste dnes"
            subtitle="Staci jeden kontakt a pripravime konkretni plan vyhledavani pro vase zadani."
          />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70">
            At hledate byt, dum nebo investicni nemovitost, nastavime proces tak,
            aby byl prehledny, rychly a bezpecny. Krok po kroku budete vedet,
            co nasleduje a proc.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
            >
              <Mail className="h-4 w-4" />
              Domluvit schuzku
            </Link>
            <Link
              href="/co-vse-pro-vas-udelame"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black"
            >
              <ArrowRight className="h-4 w-4" />
              Podrobny popis sluzeb
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

