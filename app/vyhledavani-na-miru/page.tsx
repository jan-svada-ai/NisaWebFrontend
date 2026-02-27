import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";
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
  title: "Vyhledávání nemovitosti na míru | Nisa Centrum Reality",
  description:
    "Najdeme nemovitost podle vašich požadavků. Jasný postup, prověření nabídek a bezpečné dotažení celého procesu.",
  alternates: {
    canonical: `${SITE_URL}/vyhledavani-na-miru`,
  },
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
    title: "Zadání požadavků",
    description:
      "Společně nastavíme parametry: lokalita, dispozice, rozpočet, termín i priority. Ujasníme, co je nutnost a co výhoda.",
    duration: "1-3 dny",
    icon: "search",
  },
  {
    id: "vyhledavani-monitoring",
    number: 2,
    title: "Aktivní monitoring",
    description:
      "Průběžně sledujeme trh, reagujeme na nové nabídky a oslovujeme i neveřejné zdroje, když to dává smysl.",
    duration: "2-4 týdny",
    icon: "users",
  },
  {
    id: "vyhledavani-predvyber",
    number: 3,
    title: "Předvýběr nabídek",
    description:
      "Vyfiltrujeme relevantní možnosti, aby šel váš čas jen do nemovitostí, které reálně odpovídají zadání.",
    duration: "3-10 dní",
    icon: "home",
  },
  {
    id: "vyhledavani-prohlidky",
    number: 4,
    title: "Prohlídky a porovnání",
    description:
      "Organizujeme prohlídky, porovnáváme plusy a mínusy a doporučíme varianty s nejlepším poměrem ceny a potenciálu.",
    duration: "1-3 týdny",
    icon: "key",
  },
  {
    id: "vyhledavani-overeni",
    number: 5,
    title: "Prověření nemovitosti",
    description:
      "Kontrolujeme právní a technická rizika ještě před finálním rozhodnutím, aby nevznikly drahé komplikace.",
    duration: "3-10 dní",
    icon: "fileCheck",
  },
  {
    id: "vyhledavani-dokonceni",
    number: 6,
    title: "Vyjednání a dokončení",
    description:
      "Pomůžeme s vyjednáním podmínek a dotažením smluvního procesu do bezpečného konce.",
    duration: "2-4 týdny",
    icon: "fileCheck",
  },
];

const benefits = [
  {
    icon: Compass,
    title: "Jasná orientace na trhu",
    text: "Nemusíte procházet stovky nabídek. Dostanete jen relevantní výběr.",
    detail:
      "Vybíráme podle priorit, ne podle množství. Šetříme čas a zvyšujeme šanci na kvalitní rozhodnutí bez zbytečného stresu.",
  },
  {
    icon: Search,
    title: "Rychlejší reakce",
    text: "Sledujeme trh průběžně a umíme reagovat hned po zveřejnění nové nabídky.",
    detail:
      "U atraktivních nemovitostí rozhodují hodiny. Díky aktivnímu monitoringu máte náskok před běžnou poptávkou.",
  },
  {
    icon: ShieldCheck,
    title: "Nižší riziko chyb",
    text: "Prověřujeme klíčové body, které často způsobují problémy až po podpisu.",
    detail:
      "Právní, technické i procesní detaily řešíme předem, aby nevznikaly drahé komplikace a zdržení.",
  },
  {
    icon: Sparkles,
    title: "Lepší vyjednávací pozice",
    text: "Pomáháme s cenou i podmínkami tak, aby výsledek odpovídal vašim cílům.",
    detail:
      "Díky datům, zkušenosti a přípravě je jednání věcné, rychlé a srozumitelné. Cílem je dobrá nemovitost za dobrých podmínek.",
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
      <h2 className="text-4xl font-semibold text-black md:text-5xl">
        <span className="inline-flex flex-col items-center">
          <span>{title}</span>
          <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
        </span>
      </h2>
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
      <section className="relative min-h-dvh">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-[1.08]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.avif"
        >
          <source src="/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/hero.mp4" type="video/mp4" media="(min-width: 768px)" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/12 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.56)_40%,rgba(0,0,0,0.26)_72%,rgba(0,0,0,0.1)_100%)]" />

        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-start pt-20 pb-6">
          <div className="w-full max-w-6xl px-5 text-center sm:px-8 md:px-12 lg:px-16">
            <p className="mb-4 text-[0.9rem] uppercase tracking-[0.2em] text-white/85">
              Liberecký, Ústecký, Královéhradecký, Středočeský kraj, Praha a okolí
            </p>

            <h1 className="mx-auto max-w-5xl text-[2.8rem] font-semibold leading-tight text-white md:text-[4rem] [text-shadow:0_2px_32px_rgba(0,0,0,0.65)]">
              <span className="inline-flex flex-col items-center">
                <span>Vyhledávání nemovitosti na míru</span>
                <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
              <span className="mt-3 block text-[0.63em] text-[color:var(--gold1)] [text-shadow:0_2px_30px_rgba(0,0,0,0.8)]">
                S důrazem na cenu, rychlost a jistotu.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              Najdeme nabídky, které odpovídají vašim prioritám. Od zadání
              požadavků až po bezpečné dotažení obchodu.
            </p>
          </div>

          <div className="mt-auto w-full pb-10">
            <div className="mx-auto mt-9 grid max-w-3xl gap-3 px-1 sm:grid-cols-2 sm:px-0">
              <a
                href="#jak-funguje-vyhledavani"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-5 py-2.5 text-base font-semibold text-black"
              >
                <Search className="h-5 w-5" />
                Jak funguje vyhledávání?
              </a>
              <Link
                href="/kontakt"
                className="btn-main inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base font-semibold text-white backdrop-blur-sm"
              >
                <Mail className="h-5 w-5" />
                Kontaktujte nás
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
            title="Jak funguje vyhledávání na míru"
            subtitle="Jasný proces, který šetří čas a drží kvalitu výběru i bezpečnost celého obchodu."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Nepracujeme stylem &quot;pošleme vše, co se objeví&quot;. Nejprve nastavíme
            kritéria, potom filtrujeme trh a až následně jdeme do prohlídek a
            ověřování. Díky tomu máte přehled i jistotu.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Naším cílem je najít nemovitost, která dává smysl dlouhodobě,
            nejen na první pohled. Proto každou variantu hodnotíme i z pohledu
            rizik, potenciálu a skutečných nákladů.
          </p>
          <StepCarousel steps={searchSteps} />
          <p className="mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-base font-medium text-black/70">
            <Hourglass className="h-4 w-4 text-[color:var(--gold2)]" />
            Celkový odhad: přibližně 1-3 měsíce podle trhu a vašich priorit.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 md:py-24 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <SectionHeading
            title="Proč hledat nemovitost s námi"
            subtitle="Vyhledávání vedeme datově a procesně. Cílem je lepší výsledek, ne více chaosu."
          />
          <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-black/70">
            Dobrá koupě není náhoda. Je to kombinace rychlé reakce, kvalitního
            výběru, prověření rizik a vyjednání podmínek, které dávají smysl.
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-base leading-relaxed text-black/70">
            U každého klienta nastavujeme individuální postup podle toho, zda
            kupuje první bydlení, investiční byt nebo větší rodinný dům.
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
            title="Začněte ještě dnes"
            subtitle="Stačí jeden kontakt a připravíme konkrétní plán vyhledávání pro vaše zadání."
          />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-black/70">
            Ať hledáte byt, dům nebo investiční nemovitost, nastavíme proces tak,
            aby byl přehledný, rychlý a bezpečný. Krok po kroku budete vědět,
            co následuje a proč.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/kontakt"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-8 py-3.5 text-base font-semibold text-black"
            >
              <Mail className="h-4 w-4" />
              Domluvit schůzku
            </Link>
            <Link
              href="/co-vse-pro-vas-udelame"
              className="btn-main inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-8 py-3.5 text-base font-semibold text-black"
            >
              <ArrowRight className="h-4 w-4" />
              Podrobný popis služeb
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}







